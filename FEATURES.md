# FEATURES — Funkční požadavky

Co web musí umět technicky a procesně. Závazné pro implementaci.

---

## 1. CMS — datové modely

CMS = Supabase (Postgres + Storage + Edge Functions). Žádný vlastní admin UI v této fázi — obsah se edituje přes Supabase Studio, dlouhodobě je možné nasadit Sanity nebo Payload.

### 1.1 Tabulky

#### `posts` (novinky / blog)

```sql
create table posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  locale        text not null check (locale in ('cs', 'en', 'de')),
  title         text not null,
  perex         text not null,
  content_mdx   text not null,           -- MDX body
  category      text not null,           -- tag pro filter
  cover_url     text,                    -- Supabase Storage path
  cover_alt     text,
  author_name   text,
  reading_time  int,                     -- minutes, vypočítané při ukládání
  published_at  timestamptz,
  status        text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index posts_published_idx on posts(published_at desc) where status = 'published';
create index posts_locale_idx on posts(locale);
create index posts_category_idx on posts(category);
```

RLS: anonymous role smí `select` jen `where status = 'published' and published_at <= now()`.

#### `references` (case studies)

```sql
create table reference_projects (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  locale          text not null check (locale in ('cs', 'en', 'de')),
  client_name     text,                    -- nullable, klient může být anonymizovaný
  client_visible  boolean default true,    -- false = zobrazit jako „Globální výrobce automobilů"
  industry        text not null,           -- automotive | heavy | energy | general | other
  segment         text not null,           -- mapuje na /sluzby/[segment]
  year            int not null,
  location        text,
  duration_months int,
  title           text not null,           -- nadpis projektu
  hero_url        text not null,
  challenge_md    text not null,
  solution_md     text not null,
  results         jsonb not null,          -- [{ label, value, unit }, ...]
  client_quote    text,
  client_quote_by text,
  gallery         jsonb,                   -- [{ url, alt }, ...]
  status          text default 'draft',
  featured        boolean default false,   -- 1 nebo 2 featured projekty na homepage
  published_at    timestamptz,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);
```

#### `vacancies` (otevřené pozice)

```sql
create table vacancies (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  locale          text not null check (locale in ('cs', 'en', 'de')),
  title           text not null,
  location        text not null,           -- „Plzeň" / „Praha — remote friendly"
  employment_type text not null,           -- full_time | part_time | contract
  perex           text not null,
  description_md  text not null,
  responsibilities jsonb not null,         -- bullet list
  requirements     jsonb not null,
  benefits         jsonb not null,
  salary_range    text,                    -- volitelné, „45–65 000 Kč"
  status          text default 'open',     -- open | closed
  published_at    timestamptz,
  closes_at       timestamptz,
  created_at      timestamptz default now()
);
```

#### `applications` (přihlášky na pozici)

```sql
create table applications (
  id              uuid primary key default gen_random_uuid(),
  vacancy_id      uuid references vacancies(id) on delete set null,
  full_name       text not null,
  email           text not null,
  phone           text,
  cv_url          text not null,           -- Supabase Storage signed URL
  linkedin_url    text,
  motivation      text,
  consent_gdpr    boolean not null,
  status          text default 'new',      -- new | reviewing | rejected | hired
  created_at      timestamptz default now()
);
```

RLS: anonymous role smí `insert`, ale ne `select`. HR má service role key pro admin operace.

#### `inquiries` (poptávky z konfigurátoru)

```sql
create table inquiries (
  id              uuid primary key default gen_random_uuid(),
  reference_code  text unique not null,    -- INQ-2026-0001 formát
  segment         text not null,
  parameters      jsonb not null,          -- step 2 odpovědi
  timeline        text not null,           -- step 3
  contact         jsonb not null,          -- { company, name, role, email, phone }
  attachments     jsonb,                   -- [{ url, name, size }]
  consent_gdpr    boolean not null,
  source_url      text,                    -- referrer / kampaň
  utm             jsonb,                   -- utm parameters z URL
  status          text default 'new',
  created_at      timestamptz default now()
);
```

#### `services` (segmenty — nepovinné, stačí MDX content)

Pokud klient chce service stránky editovat bez deployu, mít tabulku `services` s polemi `slug`, `title`, `intro`, `capabilities`, `tech_specs`, `faq`. Jinak držet vše v MDX souborech v `src/content/services/`.

#### `media`

```sql
create table media (
  id           uuid primary key default gen_random_uuid(),
  storage_path text unique not null,       -- v Supabase Storage
  alt_cs       text,
  alt_en       text,
  alt_de       text,
  width        int,
  height       int,
  blur_data    text,                       -- base64 LQIP
  uploaded_at  timestamptz default now()
);
```

### 1.2 Storage buckety

- `public-media` — všechny veřejné obrázky (hero, reference fotky, post covery). Public read.
- `documents` — VOP PDF, certifikáty, brand-book PDF. Public read.
- `cv-uploads` — CV z `/kariera/[slug]` apply form. Private, signed URL na 7 dní pro HR.

### 1.3 ISR / revalidation

- `posts` listing a detail: revalidate 600s (10 min).
- `references` listing a detail: revalidate 1800s (30 min).
- `vacancies`: revalidate 600s.
- `services`: build-time generated (žádný ISR), revalidate jen na deploy.

On-demand revalidation přes webhook `POST /api/revalidate?secret=...&path=/cs/novinky` — Supabase Edge Function trigger po každém update v dané tabulce.

---

## 2. Formuláře

### 2.1 Stack

- **React Hook Form** pro client state.
- **Zod** pro validační schémata, sdílená mezi clientem a serverem.
- **Server Actions** (Next 15) pro submit — žádné `/api/contact` route handlery.
- **Resend** pro odchozí maily.
- **Cloudflare Turnstile** jako captcha (free, lepší než reCAPTCHA UX-wise).

### 2.2 Konfigurátor poptávky (`/poptavka`)

- Multi-step state v URL search params (`?step=2&segment=...&...`) — umožňuje sdílení rozdělaného formuláře a back/forward navigaci.
- Validation per step + na finálním kroku celý souhrn znova.
- Po odeslání:
  1. Insert do `inquiries` tabulky.
  2. Generování `reference_code` `INQ-{YYYY}-{NNNN}` (sekvence per rok).
  3. Email klientovi (Resend template `inquiry-confirmation-{locale}`) s reference code.
  4. Email obchodnímu týmu (`obchod@strkan.cz`) s plnou tabulkou + odkaz na admin (Supabase Studio).
  5. Webhook do CRM (Pipedrive nebo HubSpot — viz sekce 6).
  6. Server-side analytics event `inquiry_submitted` s metadaty.
- Anti-spam: Cloudflare Turnstile token validovaný server-side + rate limit 3 submission per IP per hour.

### 2.3 Kontaktní formulář (`/kontakt`)

Jednoduchý: jméno, email, předmět, zpráva. Stejný backend pipeline (Resend + Supabase insert do `inquiries` s `segment='contact'`).

### 2.4 Aplikace na pozici (`/kariera/[slug]`)

- CV upload: max 5 MB, jen PDF/DOC/DOCX.
- Server Action streamuje soubor do Supabase Storage `cv-uploads`, vrací signed URL.
- Po insert pošle email HR (`hr@strkan.cz`) s odkazem na CV (signed URL na 7 dní) a všemi daty kandidáta.
- Žádný confirmation email kandidátovi — místo toho thank-you screen s ujištěním, že se ozveme.

### 2.5 Newsletter (`/novinky` block)

- Pole: email + GDPR souhlas.
- Backend: insert do tabulky `newsletter_subscribers` + double-opt-in mail z Resend (link s tokenem na potvrzení).
- Žádné autorespondery, jen jednoduchá databáze emailů.
- Klient sám exportuje seznam pro mailing kampaně (řešíme později, ne v scope launch).

---

## 3. Internacionalizace (i18n)

### 3.1 Lokalizace obsahu

- 3 locales: `cs` (default), `en`, `de`.
- Vše viditelné v UI je v `src/messages/{locale}.json`.
- CMS obsah (posts, references, vacancies) má `locale` column; per-locale records v DB.
- **Žádné automatické překlady.** Pokud `en` verze článku neexistuje, na `/en/novinky/[slug]` se ukáže 404 + redirect na `/cs/novinky/[slug]` s hláškou „Tento obsah není zatím přeložený do angličtiny."

### 3.2 Glossary

`src/messages/_glossary.md` udržuje překlady technických termínů:

| CS | EN | DE |
|---|---|---|
| jednoúčelový stroj | special-purpose machine | Sondermaschine |
| svařovaná konstrukce | welded structure | Schweißkonstruktion |
| desková polohovadla | plate positioners | Blechpositionierer |
| dopravní technika | conveyor systems | Fördertechnik |
| jednorázová zakázka | one-off order | Einzelauftrag |
| ... | ... | ... |

Glossary závazné pro překladatele.

### 3.3 hreflang & sitemap

- Každá lokalizovaná stránka má `<link rel="alternate" hreflang="cs|en|de" href="..." />` + `<link rel="alternate" hreflang="x-default" href="/cs/..." />`.
- `sitemap.xml` obsahuje všechny tři jazyky s `<xhtml:link>` u každé URL.

---

## 4. SEO

### 4.1 Per-page metadata

- `generateMetadata()` v každé stránce vrací `title`, `description`, `openGraph`, `twitter`, `alternates`.
- `title` formát: `{Page Title} — STRKAN s.r.o.` (s pomlčkou em-dash, ne pipe).
- Description: 140–160 znaků.
- OG image: dynamická generace přes Next.js `ImageResponse` v `app/api/og/route.tsx` — bere `?title=...&category=...` query params, generuje 1200×630 px brand-konzistentní obrázek.
- Per-stránka customní OG fallback: `public/og/{page}.jpg`.

### 4.2 Strukturovaná data

JSON-LD inject přes `<script type="application/ld+json">` v layoutu nebo per-page:

- **Layout level (každá stránka):**
  - `Organization` schema (název, URL, logo, contactPoint, address).
  - `WebSite` schema (url, name, potentialAction.SearchAction pokud bude search).
- **`/o-nas`:** `LocalBusiness` (rozšířené Organization s otevírací dobou, geo).
- **`/sluzby/[segment]`:** `Service` schema (provider, areaServed, serviceType).
- **`/reference/[slug]`:** `CreativeWork` nebo `Project` (name, dateCreated, creator, description, image).
- **`/novinky/[slug]`:** `Article` (headline, image, datePublished, dateModified, author, publisher).
- **Všechny stránky kromě `/`:** `BreadcrumbList`.
- **`/kariera/[slug]`:** `JobPosting` (title, description, hiringOrganization, jobLocation, employmentType, datePosted, validThrough, baseSalary).

### 4.3 robots.txt + sitemap

```ts
// src/app/robots.ts
export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/poptavka/thank-you'] },
    ],
    sitemap: 'https://strkan.cz/sitemap.xml',
    host: 'https://strkan.cz',
  };
}
```

`src/app/sitemap.ts` generuje URL ze všech statických tras + dynamicky z `posts`, `references`, `vacancies`.

### 4.4 Performance budget pro SEO

- LCP ≤ 2.0 s na 4G (cílení Core Web Vitals).
- INP ≤ 100 ms.
- CLS ≤ 0.05.

### 4.5 Canonical

- Default canonical = current URL bez query params (kromě search/filter pages).
- Filter pages na `/reference?segment=...` mají canonical na čistou `/reference`.

---

## 5. Analytics

### 5.1 Stack

- **Vercel Analytics** (page views, top pages) — pro tým.
- **Vercel Speed Insights** (Core Web Vitals z reálného trafficu).
- **Plausible** (self-hosted nebo cloud) — pro klienta jako jeho marketing dashboard. Žádný GA4.

### 5.2 Custom events

- `cta_click` — klik na primární CTA, props: `{ location: 'hero' | 'cta_band' | 'navbar', label }`.
- `inquiry_started` — vstup na `/poptavka`.
- `inquiry_step_completed` — props: `{ step }`.
- `inquiry_submitted` — props: `{ segment, timeline, has_attachments }`.
- `vacancy_apply_clicked` — props: `{ vacancy_slug }`.
- `application_submitted` — props: `{ vacancy_slug }`.
- `language_switched` — props: `{ from, to }`.
- `reference_filter_used` — props: `{ filter_type, filter_value }`.

### 5.3 GDPR / cookies

- **Žádný cookie banner při prvním návštěvě**, dokud používáme jen first-party essentials (Plausible je cookie-less).
- Pokud později zapneme remarketing pixely (LinkedIn Insight Tag, Meta Pixel) — cookie banner je povinný, implementuje se přes [klaro!](https://klaro.org/) nebo vlastní řešení.
- Privacy policy stránka popisuje, co se ukládá, jak dlouho, jak smazat data.

---

## 6. CRM integrace

### 6.1 Pipedrive (preferováno)

- Lead z konfigurátoru → POST do Pipedrive Persons + Deals API přes server-side webhook.
- Mapping:
  - `inquiries.contact.name` → Person `name`.
  - `inquiries.contact.email` → Person `email`.
  - `inquiries.contact.company` → Organization (auto-created if not exists).
  - `inquiries.segment` → Deal `pipeline` (každý segment může být separate pipeline).
  - `inquiries.parameters` → Deal `note` v JSON formátu.
  - `inquiries.reference_code` → Deal `title` prefix.

### 6.2 Fallback

Pokud klient Pipedrive nemá, posílá se jen email a data zůstávají v Supabase. Migrace do CRM později.

### 6.3 Konfigurace

- Webhook URL + API token v env vars (`PIPEDRIVE_API_TOKEN`, `PIPEDRIVE_BASE_URL`).
- Toggle: `ENABLE_PIPEDRIVE_SYNC=true|false`.

---

## 7. Performance

### 7.1 Cíle (na production na 4G simulaci)

| Metric | Target | Stretch |
|---|---|---|
| LCP | ≤ 2.0 s | ≤ 1.5 s |
| INP | ≤ 100 ms | ≤ 50 ms |
| CLS | ≤ 0.05 | ≤ 0.02 |
| TTFB | ≤ 400 ms | ≤ 200 ms |
| Total JS (homepage) | ≤ 180 kB gzip | ≤ 120 kB |
| First image (LCP) | AVIF, ≤ 80 kB | AVIF, ≤ 50 kB |

### 7.2 Strategie

- **RSC default**, client komponenty jen tam, kde je nutná interaktivita.
- **Streaming** přes Suspense — hero render hned, sekce hluboko ve stránce streamují.
- **Image optimization** — `next/image` všude, AVIF + WebP source set, blur placeholder z Supabase media metadata.
- **Font loading** — `next/font/local` s `display: swap`, preconnect ne-needed (lokální).
- **Prefetch** — Next.js automaticky prefetch viditelných linků; pro mega menu links manuálně `<Link prefetch={true}>`.
- **Bundle splitting** — Framer Motion komponenty dynamic import, jen když jsou v viewportu (např. magnetic button only loads after hero).
- **Žádné polyfilly pro IE.** Browserlist: `defaults, not IE 11`.
- **Žádný jQuery, žádné moment.js, žádný lodash celý.** Tree-shaken utility (`lodash-es/debounce` ano, celé `lodash` ne).

### 7.3 CI checks

- Každý PR spouští Lighthouse CI v GitHub Actions na náhled deploy URL z Vercelu.
- Failing budget = blokující status check.

---

## 8. Bezpečnost

### 8.1 Headers

V `next.config.mjs`:

```js
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Content-Security-Policy', value: "..." },  // viz níže
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];
```

CSP konfigurace (template, ladí se s konkrétními third-party):
- `default-src 'self'`
- `script-src 'self' 'unsafe-inline' va.vercel-scripts.com plausible.io challenges.cloudflare.com`
- `style-src 'self' 'unsafe-inline'`
- `img-src 'self' data: blob: *.supabase.co`
- `media-src 'self' *.supabase.co`
- `connect-src 'self' *.supabase.co va.vercel-scripts.com plausible.io api.pipedrive.com`
- `frame-src 'self' challenges.cloudflare.com www.youtube.com player.vimeo.com mapy.cz`
- `font-src 'self' data:`
- `object-src 'none'`
- `base-uri 'self'`
- `form-action 'self'`

### 8.2 Rate limiting

- Server Actions pro formuláře: rate limit 3 requests per IP per 10 minutes (přes Upstash Redis nebo Vercel KV).
- API revalidate endpoint: secret token check, 60 req/min.

### 8.3 Secrets management

- `.env.local` (gitignored).
- Production secrets v Vercel env vars, separate scope pro `production` / `preview` / `development`.
- Žádné secrets v `NEXT_PUBLIC_*` kromě Supabase anon key (který je public-by-design).

---

## 9. Testing

### 9.1 Unit / component

- **Vitest** pro utility funkce a logiku v `lib/`.
- **React Testing Library** pro komponenty kritické pro byznys (formuláře, jazykový switcher, reference filter).
- Coverage cíl: 60 % pro `lib/`, 30 % pro komponenty.

### 9.2 E2E

- **Playwright** pro happy paths:
  - Otevření homepage v CS, EN, DE.
  - Konfigurátor poptávky end-to-end (mock Resend a Pipedrive).
  - Aplikace na pozici end-to-end.
  - Detail reference přístupný přes link z homepage.
  - Mobile drawer otevření a navigace.
- Spustí se v CI na každý PR.

### 9.3 Visual regression

- **Chromatic** nebo **Percy** přes Storybook (Storybook pro design system komponenty z `primitives/`).
- Cíl: zachytit vizuální regrese v Buttonu, Card, Heros mezi PRs.

### 9.4 Accessibility

- **axe-core** přes `@axe-core/playwright` jako součást E2E testů — fail při serious nebo critical violation.
- Manuální audit s screen readerem (VoiceOver / NVDA) jednou před launchem a pak před každou významnou release.

---

## 10. Deployment & environments

### 10.1 Environments

| Env | Domain | Branch | Auto deploy |
|---|---|---|---|
| Production | `strkan.cz` | `main` | Yes (po merge) |
| Staging | `staging.strkan.cz` | `staging` | Yes (po push) |
| Preview | `*.vercel.app` | per-PR | Yes |

### 10.2 Procedury

- Klient potvrzuje obsahové změny na **staging** před merge do `main`.
- Schema migrace v Supabase: ručně spuštěné přes Supabase CLI, ne automaticky. Po spuštění `pnpm gen:types` v repu.
- Rollback: Vercel instant rollback na poslední úspěšný deploy. Schema rollback ručně přes opačnou migraci (nikdy `drop` na produkci bez backupu).

### 10.3 Backups

- Supabase Pro plan: daily backups (retention 7 dní). PITR enabled.
- Storage buckety: žádné automatické backups — důležité assety mít kopii v `documents` bucketu lokálně před uploadem.

---

## 11. Monitoring & observability

- **Vercel logs** pro runtime chyby.
- **Sentry** (free tier — 5k errors/mo) pro client + server error tracking. Source maps uploaded v build pipeline.
- **Uptime monitoring:** Better Stack nebo UptimeRobot, ping `strkan.cz` každých 5 minut, alert na email pokud > 1 min downtime.
- **Slack channel** `#strkan-web-alerts` pro Sentry + Vercel deploy notifications (pokud klient Slack používá).

---

## 12. Content gaps na vstup od klienta

Před launch je potřeba od klienta získat:

- [ ] Aktuální brand assets (logo varianty ve vector, font licence pokud existuje, color codes).
- [ ] Skutečné kontaktní údaje (telefon, email, IČO, DIČ, kontaktní osoby s fotkami).
- [ ] **Případové studie** — minimálně 6, ideálně 12 dokončených projektů s:
  - názvem klienta (anebo souhlas s anonymizací),
  - 3–5 fotografiemi z realizace,
  - 1–2 odstavci popisu výzvy a řešení,
  - 2–3 měřitelnými výsledky.
- [ ] **Photoshoot ve výrobě** — 2 dny, viz BRAND.md sekce 5.5.
- [ ] **Hero video** — 30–60 s b-roll z výroby, bez zvuku, bez popisků.
- [ ] **Loga klientů** pro „Vybraní zákazníci" strip (s explicitním souhlasem k veřejnému zobrazení).
- [ ] **Texty** — Manifesto, hodnoty firmy, „o nás" příběh — drafty od klienta, doladí copywriter.
- [ ] **Otevřené pozice** — minimálně 2–3 pozice s plnými detaily.
- [ ] **VOP PDF** + privacy policy texty + cookies politika.
- [ ] **Certifikáty** — PDF skeny + jejich loga.
- [ ] **GPS souřadnice** sídla pro mapu.
- [ ] **Pipedrive credentials** + mapping CRM polí (pokud existuje).
- [ ] **Resend API key** + ověřená doména pro odchozí maily (`*@strkan.cz`).
- [ ] **Cloudflare Turnstile** site key + secret.

Tracker stavu: `CONTENT_GAPS.md` v rootu repo, aktualizovaný před každým týdenním stand-upem s klientem.
