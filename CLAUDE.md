# STRKAN s.r.o. — Web v2 (Premium Redesign)

Firemní web české strojírenské firmy STRKAN s.r.o. (Plzeň, založena 1993). Specializace: konstrukce, výroba a servis dopravní techniky, jednoúčelových strojů, robotických buněk, svařovaných ocelových konstrukcí a deskových polohovadel.

Tato verze je **kompletní redesign od základu**. Cílem je posunout vnímání firmy z „solidní lokální dodavatel" do polohy **premium engineering partner** s mezinárodní vizuální úrovní (referenční jména: Bühler, Trumpf, KION, Voith Engineering).

---

## Doprovodné dokumenty

Všechny musí být dodržovány. V případě konfliktu má přednost specifičtější dokument (UI > BRAND > CLAUDE.md).

| Dokument | Co řeší |
|---|---|
| [`SITEMAP.md`](./SITEMAP.md) | Informační architektura, seznam routes, struktura sekcí každé stránky, CTAs |
| [`BRAND.md`](./BRAND.md) | Vizuální identita, barvy, typografie, logo, voice & tone, fotografická směrnice |
| [`UI.md`](./UI.md) | Design systém, tokeny, komponenty, motion, breakpointy, accessibility |
| [`FEATURES.md`](./FEATURES.md) | Funkční požadavky — CMS, formuláře, i18n, SEO, analytics, výkon |

---

## Stack

**Framework:** Next.js 15 (App Router, React Server Components, Server Actions, Partial Prerendering kde dává smysl).
**Jazyk:** TypeScript 5 (strict).
**Styling:** Tailwind CSS 4 (CSS-first config, `@theme` block) + `next/font` (žádný `@fontsource/*`).
**UI primitives:** Radix UI (Dialog, Popover, Tabs, Accordion, Tooltip).
**Motion:** Framer Motion 11 + `view-transitions-api` pro page transitions.
**Forms:** React Hook Form + Zod, Server Actions pro submit, Resend pro odchozí mail.
**CMS:** Supabase (Postgres + Storage + Edge Functions) — `posts`, `references`, `vacancies`, `media`. RLS pro public anon read-only.
**Image:** `next/image` + Supabase Storage + `unsplash-like` blur placeholders.
**Analytics:** Vercel Analytics + Vercel Speed Insights (žádný GA bez explicitního souhlasu).
**Hosting:** Vercel (prod = `strkan.cz`, staging = `staging.strkan.cz`).
**i18n:** `next-intl` 4, locales `cs` (default), `en`, `de` — subpath routing `/cs`, `/en`, `/de`.

Verze knihoven se v balíčku `package.json` udržují aktuální (v prosinci 2025 platí výše uvedené major releases).

---

## Struktura repozitáře

```
strkan-web/
├── CLAUDE.md             ← tento soubor
├── SITEMAP.md
├── BRAND.md
├── UI.md
├── FEATURES.md
├── public/
│   ├── images/           ← optimalizované assety (logo, OG fallbacky)
│   └── fonts/            ← lokálně hostované fonty pokud nejsou ze Supabase
├── src/
│   ├── app/
│   │   ├── [locale]/     ← všechny veřejné stránky
│   │   ├── api/          ← jen webhooky (revalidate, formuláře už přes Server Actions)
│   │   ├── globals.css
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── primitives/   ← Button, Input, Select, Dialog … (atomic)
│   │   ├── layout/       ← Navbar, Footer, MegaMenu, MobileDrawer
│   │   ├── sections/     ← Hero, Showcase, ReferenceGrid, ContactSplit … (kompozitní)
│   │   ├── motion/       ← Reveal, ParallaxLayer, Magnetic
│   │   └── icons/        ← lokální SVG ikony (žádný icon font)
│   ├── content/          ← MDX pro statický obsah (legal, manifesto)
│   ├── lib/
│   │   ├── supabase/     ← serverové klienti, queries pro RSC
│   │   ├── seo/          ← schema.org generátory, OG image factory
│   │   └── utils/
│   ├── i18n/             ← routing, request, navigation
│   ├── messages/         ← cs.json, en.json, de.json (úplné, NE jen Navigation)
│   ├── styles/           ← tokens.css, motion.css
│   └── middleware.ts
├── supabase/
│   ├── migrations/
│   └── functions/        ← Edge Functions (např. og-image, contact-submit fallback)
├── next.config.mjs
├── tailwind.config.ts    ← minimalistický, většina tokenů v globals.css
├── tsconfig.json
└── package.json
```

---

## Pravidla práce na projektu

1. **Žádné placeholdery v produkčním kódu.** Pokud chybí asset (foto, telefon, IČO), označ ho v kódu komentářem `// TODO(content):` a v separátní `CONTENT_GAPS.md` veď seznam toho, co po klientovi chceme. Nikdy nečumákuj data jako `12345678`.

2. **Server Components default.** `'use client'` jen tam, kde je to nutné (interaktivita, hooks). Sekce typu Hero, Reference grid, Footer = server.

3. **Žádné CSS-in-JS.** Všechno v Tailwindu nebo v `globals.css` přes `@layer`. Nepoužívat styled-components, emotion ani vanilla-extract.

4. **i18n je first-class.** Veškeré viditelné texty jsou v `src/messages/{locale}.json`. Hardcoded čeština v JSX není přijatelná. Cestám se nepřekládá segment URL — používáme stejné slugy ve všech jazycích kromě stávajícího `/zarizeni-pro-vyrobu-a-servis-dopravni-techniky` (viz SITEMAP.md, sekce „Lokalizace URL").

5. **A11y je požadavek, ne nice-to-have.** Cíl: WCAG 2.1 AA + lokálně dosáhnout AAA na kontrast. Klávesnice musí projít celým webem. Focus styly viditelné a v brand stylu.

6. **Performance budget:**
   - LCP ≤ 2.0 s na 4G simulaci
   - CLS ≤ 0.05
   - Total JS na homepage ≤ 180 kB gzipped
   - První obrázek hero = `priority` + AVIF/WebP přes `next/image`

7. **Žádné transactional CTAs na webu.** Web je marketingový + lead-gen. Vše, co vyžaduje obchodní akci, končí v kontaktním konfigurátoru nebo v kalendáři pro schůzku — netlačit na okamžitý nákup, B2B cyklus to nedává.

8. **Czech first.** Veškerý uživatelský text je primárně v češtině. EN a DE překlady jsou doslovné, ne lokalizované marketing-pitchem (cílovka EN/DE jsou zahraniční zákazníci a partneři, ne česká diaspora).

9. **Kód, komentáře, commit messages, branch names = anglicky.** PR descriptions klidně bilingvně.

10. **Commit konvence:** Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`). Každý PR musí projít typecheckem, lintem a buildem v CI.

---

## Co je „prémiové" pro tento projekt

Aby nedošlo k nedorozumění při review designu, prémiovost u STRKAN znamená:

- **Velkorysý whitespace** — sekce dýchají, padding 96–160 px na desktop
- **Jeden hrdina na pohled** — ne 4 sloupcové grids hned v hero, ale staged reveal
- **Reálná fotografie nad ilustracemi** — výroba, lidé, detaily strojů, vždy ostře a v barevné gradaci ladící s brand paletou
- **Pohyb je kontextový** — reveal on scroll, hover-state lift, ale žádné autoplay carousel-y, žádné rotující odznaky
- **Tichý zvukově** — žádné zvuky, žádné notifikační animace
- **Materialita** — subtle grain/noise overlay na tmavých plochách, micro-borders 1 px v `rgba(255,255,255,0.06)` na dělicích liniích
- **Hutná, ne plochá hierarchie** — H1 96 px, H2 56 px, body 17 px, monospace pro tech specs (model čísla, rozměry)

Co prémiovost **není**:

- ❌ glasmorphism, neumorphism, gradient blobs
- ❌ rounded-2xl všude (zachováváme ostré rohy — viz BRAND.md)
- ❌ AI generated obrázky (B2B kupující to pozná)
- ❌ animace pro animace (loading spinners na statickém obsahu, parallax na všem)
- ❌ stock fotky lidí v oblecích co si potřásají rukama

---

## Workflow při změně obsahu / schématu

1. Změna struktury obsahu (nový typ článku, nové pole) → migrace v `supabase/migrations/` → regenerace TS typů (`pnpm gen:types`).
2. Změna textu na stránce → upravit `src/messages/{locale}.json` ve všech třech jazycích současně. Pokud ještě nemáme překlad, zkopíruj český řetězec a přidej `// TODO(translate)` do komentáře PR.
3. Nový asset → uploadnout do Supabase Storage bucketu `public-media`, přidat record do tabulky `media`, odkazovat přes utility `getPublicMedia(slug)` ne natvrdo URL.
4. Nový segment / case study → MDX ve `src/content/references/` nebo entry v Supabase tabulce `references` (viz FEATURES.md → Reference CMS).

---

## Co se NEDĚLÁ v tomto repozitáři

- Žádný e-shop, žádný checkout, žádný uživatelský účet pro koncové zákazníky.
- Žádné napojení na ERP/CRM přímo z webu — jen webhook z formuláře do Pipedrive/HubSpot (řeší FEATURES.md).
- Žádný admin panel — obsah se edituje přes Supabase Studio nebo (v budoucnu) přes headless CMS, ne přes vlastní UI v `app/admin/`.

---

## Kontakt na produktový tým

(content TBD — vyplní se při onboardingu)

- Product owner: TBD
- Lead designer: TBD
- Tech lead: TBD
- Klient (STRKAN side): TBD

Repozitář je single-tenant a obsahuje jen tento jeden web.
