# SITEMAP — Informační architektura

Cesty pro CS lokalizaci (default). EN/DE používají stejné slugy, viz sekce „Lokalizace URL" na konci.

```
/
├── /o-nas
├── /sluzby                        ← NOVÉ (rozcestník služeb, místo dosavadních „Zařízení")
│   ├── /sluzby/dopravni-technika
│   ├── /sluzby/jednoucelove-stroje
│   ├── /sluzby/svarovane-konstrukce
│   ├── /sluzby/automatizace-a-robotika
│   └── /sluzby/deskova-polohovadla
├── /reference                     ← NOVÉ (case studies, hrdina celé strategie)
│   └── /reference/[slug]
├── /novinky
│   └── /novinky/[slug]
├── /kariera
│   └── /kariera/[slug]            ← detail volné pozice (server-rendered)
├── /kontakt
├── /poptavka                      ← NOVÉ (multi-step konfigurátor poptávky)
└── /pravni
    ├── /pravni/zasady-ochrany-osobnich-udaju
    ├── /pravni/cookies
    └── /pravni/vop
```

Status komparace vs. původní web:

| Původní | Nově | Důvod |
|---|---|---|
| `/zarizeni-pro-vyrobu-a-servis-dopravni-techniky` | `/sluzby` | Příliš dlouhé, neuživatelské v navigaci, špatné pro SEO (klíčová slova rozmělněná) |
| (chybí) | `/reference` | Hlavní důkaz schopností. B2B kupující hledá projekty, ne katalog. |
| (chybí) | `/poptavka` | Strukturovaný lead-form místo volného textu = lepší kvalifikace leadů |
| `/kariera` jako jedna stránka | `/kariera` + `/kariera/[slug]` | Dlouhý popis pozice nepatří do karet |

---

## Globální layout

### Navbar (`<header>`)

- Fixed top, výška 80 px desktop / 64 px mobile.
- **Stav 1 — top of page:** transparent, světlé logo, světlé linky.
- **Stav 2 — scrolled (>10 px):** bílé pozadí + 1px bottom border `rgba(7,25,36,0.08)`, color logo, tmavé linky.
- Levá strana: logo (link na `/`).
- Střed: hlavní nav.
- Pravá strana: jazykový switcher (CS | EN | DE), na desktopu jako tři tlačítka, na mobilu jako pop-down.
- **Mega menu** pro „Služby" a „Reference":
  - Otevírá se na hover (desktop) / tap (mobile).
  - Šířka full-width pod navbarem, 4 sloupce.
  - Sloupec 1: nadpis kategorie + perex.
  - Sloupce 2–3: list odkazů na podstránky s drobnými ikonami.
  - Sloupec 4: featured projekt s obrázkem (link na konkrétní reference).
- Mobile: drawer od shora s velkou typografií (44 px), jazykový switcher na konci, telefon/email jako quick actions.

### Footer

3 sloupce na desktop, accordion na mobile.

- **Sloupec 1 — Brand:** logo (inverse), 2-řádkový claim, IČO, DIČ, sídlo (jako schema.org `LocalBusiness` JSON-LD).
- **Sloupec 2 — Navigace:** O nás, Služby, Reference, Novinky, Kariéra, Kontakt.
- **Sloupec 3 — Kontakt + sociální:** telefon, email, otevírací doba, LinkedIn (jediná sociální síť, kterou držíme).

Pod tím dělicí linka, dole copyright + odkazy na právní stránky + odkaz na VOP PDF (Supabase Storage).

---

## Stránky — kontrakt sekcí

Každá stránka je popsaná seznamem **sekcí v pořadí shora dolů**. Implementace musí toto pořadí dodržet. Pokud klient žádá změnu, mění se nejdřív tento dokument, pak kód.

### `/` Homepage

1. **Hero — „Stroje, které posouvají průmysl"**
   - Full-bleed (100vh − 80px navbar) tmavé pozadí.
   - Vrstvy: muted autoplay video (loop, no controls) → grain overlay → tmavý gradient zleva (`rgba(7,25,36,0.7)` → transparent vpravo).
   - Vlevo: H1 96 px, slogan, dvě CTA — primary „Prozkoumat reference", secondary „Získat nabídku".
   - Vpravo dole: animovaný KPI strip (3 čísla: roky působení, dokončené projekty, % opakovaných zákazníků) — fade-in při loadu.
   - Pod hero malá scroll-cue animace.

2. **Manifesto — „32 let strojírenského řemesla"**
   - Editorial sekce: levá kolona velký nadpis + 2 odstavce, pravá kolona vertikální obrázek 4:5 výroby.
   - Tlumené světlé pozadí (`#FAFAFA`).

3. **Showcase služeb — 5 segmentů**
   - Velký horizontal scroll-snap nebo statický grid 5 kartiček s velkými fotografiemi (16:9).
   - Každá karta: foto → tag (kategorie) → název → 1 věta perex → šipka.
   - Hover: foto se mírně zvětší, šipka posune doprava, tag se podtrhne.

4. **Featured reference — 1 hero case study**
   - Velkoformátový blok, 60/40 split: foto realizace + textová strana s názvem klienta, výzvou, řešením, 3 KPI metrikami a CTA „Číst případovku".
   - Pod blokem 3 menší reference karty + odkaz „Všechny reference".

5. **Reel — výroba v akci**
   - Pruh fotografií z výroby v marquee/track formátu, pomalu posouvající se vlevo (CSS animation 60 s loop).
   - Klik na obrázek → otevře lightbox s touto fotkou v plné kvalitě.
   - Důvod: rychlý vizuální feed bez nutnosti scrolovat 60 obrázků.

6. **Logos / clients strip**
   - „Vybraní zákazníci" — řádek 6–8 logotypů v grayscale, kolorují se na hover.
   - Klient potvrdí, čí loga lze veřejně zobrazit (TODO content).

7. **Novinky — poslední 3**
   - Tři karty z `posts` tabulky, layout 1+2 (velká vlevo, dvě menší vpravo).
   - Pod CTA „Všechny novinky".

8. **CTA blok — „Máte projekt?"**
   - Tmavé pozadí, centrovaný text, dvě CTA — „Nezávazná poptávka" (primary) a „Domluvit schůzku" (secondary, otevře Cal.com / Calendly modal).

9. **Footer.**

### `/o-nas`

1. **Page header** — tmavý, jen nadpis + 1 věta.
2. **Hero foto** — vertikální 16:9 přes celou šíři, tým nebo hala.
3. **Příběh** — dvě kolony: vlevo nadpis „Od roku 1993", vpravo 3–4 odstavce historie.
4. **Časová osa** — horizontální milestones (1993, 2002, 2010, 2018, 2024, …) s ikonkami, hover ukáže detail.
5. **Hodnoty** — 3 nebo 4 hodnoty v grid layoutu, ne číslované, ale s velkou typografií + 1 obrázek na hodnotu.
6. **Tým** — galerie portrétů klíčových lidí (CEO, hlavní konstruktér, vedoucí výroby) — jméno, role, krátký bio (2 věty).
7. **Certifikace** — strip log certifikátů (ISO 9001, ISO 14001, EN ISO 3834-2 …) s linkem na PDF každého certifikátu.
8. **Strojní vybavení** — accordion nebo katalog: CNC, svařovací pracoviště, měřicí technika.
9. **CTA** — „Pojďte se podívat" — pozvánka na osobní návštěvu výroby.
10. **Footer.**

### `/sluzby` (rozcestník)

1. **Page header.**
2. **Intro odstavec** — co STRKAN dělá a co nedělá (důležité pro filtraci leadů).
3. **5 segment cards** — jeden per segment, full-width 16:9 obrázek + popis 2 odstavce + bullet list klíčových schopností + CTA na detail.
4. **Process — „Od poptávky po dodávku"** — 5 kroků v horizontálním stepperu (Konzultace → Návrh → Výroba → Instalace → Servis), každý krok klikatelný a otevírá modal s detailem.
5. **CTA na poptávku.**
6. **Footer.**

### `/sluzby/[segment]` (detail služby)

Jednotná šablona pro všech 5 segmentů, obsah z `services` tabulky nebo MDX:

1. **Page header** s breadcrumbs.
2. **Hero** — velký obrázek konkrétní služby + nadpis + 2 věty.
3. **Co umíme** — bullet list capabilities.
4. **Tech specs** — tabulka technických parametrů v monospace fontu (rozměry, nosnosti, materiály).
5. **Příklady aplikací** — 3 mini-cards s odkazem na reference, které tuto službu obsahují.
6. **FAQ** — 5–8 otázek, accordion.
7. **CTA** — „Poptat tuto službu" (pre-fill konfigurátoru segmentem).
8. **Footer.**

### `/reference`

1. **Page header.**
2. **Filter bar** — sticky pod navbarem: filtr podle segmentu, podle roku, podle průmyslu (automotive / heavy / energy / general). Active filtry jako chips.
3. **Grid** — masonry 2 kolony desktop / 1 mobile. Každá karta má large image, název projektu, klienta (může být anonymizovaný „Globální výrobce automobilů"), rok, kategorii.
4. **Pagination** nebo „Načíst další" (preferovaně cursor-based).
5. **Footer.**

### `/reference/[slug]` (detail case study)

1. **Hero** — full-bleed obrázek projektu + overlay s názvem.
2. **Project meta strip** — klient, segment, rok, lokace, doba realizace (4 columns na desktop).
3. **Výzva** — 2–3 odstavce, co klient potřeboval.
4. **Řešení** — text + technické bullet pointy + diagram nebo CAD render.
5. **Galerie z realizace** — 6–12 fotek v gridu, lightbox.
6. **Výsledky** — 3 KPI bloky s velkými čísly (např. „−35 % cyklus", „24/7 provoz", „2× kapacita").
7. **Citace klienta** (pokud máme) — velký pull-quote s atribucí.
8. **Související služby** — 2–3 chips s odkazem na `/sluzby/[segment]`.
9. **Další reference** — „Mohlo by vás zajímat" 3 karty.
10. **CTA na poptávku.**
11. **Footer.**

### `/novinky`

1. **Page header.**
2. **Filter** — kategorie chips, search input.
3. **Featured článek** — nejnovější jako hero karta (2/3 šířky).
4. **Grid** — 3 sloupce karet, paginace.
5. **Newsletter blok** — „Odebírat novinky" inline form (email only, GDPR checkbox).
6. **Footer.**

### `/novinky/[slug]`

1. **Sticky reading progress bar** pod navbarem.
2. **Hero** — obrázek článku + meta (kategorie, datum, autor, čas čtení).
3. **Article body** — MDX render, max-width 720 px, typografie optimalizovaná pro čtení (line-height 1.7, paragraf gap 24 px).
4. **Sdílení** — sticky vlevo na desktop (Twitter, LinkedIn, copy link).
5. **Související články** — 3 karty.
6. **CTA „Máte projekt?"**
7. **Footer.**

### `/kariera`

1. **Page header.**
2. **Why STRKAN** — emocionální blok, foto týmu na hale + 3 věty.
3. **Benefity** — 6 položek, ikona + nadpis + 1 věta.
4. **Otevřené pozice** — list, každá pozice = card s názvem, lokací, typem úvazku, krátkým perexem, CTA „Detail pozice".
5. **Spontaneous application** — block s textem a tlačítkem otevírajícím form (jméno, email, CV upload).
6. **Footer.**

### `/kariera/[slug]` (detail pozice)

1. **Header** s názvem pozice, lokací, typem úvazku, deadlinem.
2. **O pozici** — 2–3 odstavce.
3. **Co budete dělat** — bullet list.
4. **Co od vás čekáme** — bullet list.
5. **Co nabízíme** — bullet list (nevypisovat duplicitně k benefity stránky, ale specifika k pozici).
6. **Apply form** — jméno, email, telefon, CV (PDF upload), volitelně LinkedIn URL, motivační text. Server Action → ukládá do Supabase tabulky `applications` + posílá email HR.
7. **Footer.**

### `/kontakt`

1. **Page header.**
2. **Split layout:**
   - Vlevo: kontaktní údaje (sídlo, IČO, DIČ, telefon, email, kontaktní osoby s rolemi a fotkami), otevírací doba, GPS souřadnice.
   - Vpravo: krátký kontaktní formulář (jméno, email, předmět, zpráva). Ne konfigurátor — ten je `/poptavka`.
3. **Mapa** — interaktivní mapa (Mapbox nebo Mapy.cz) s pinem, full-width, výška 480 px. Tlačítka „Otevřít v Google Maps" / „Otevřít v Mapy.cz".
4. **Doprava k nám** — 3 boxy: autem (parkování), vlakem (vzdálenost od nádraží), MHD (linka, zastávka).
5. **Footer.**

### `/poptavka` (multi-step konfigurátor)

Hostovaný na samostatné stránce, **bez Footer/Navbar** v plné velikosti — minimalistický layout (jen logo top-left a progress bar).

**Krok 1 — Typ projektu:** velké čtverce (5×) — jeden per segment + „Něco jiného". Klik = výběr.

**Krok 2 — Parametry projektu:** dynamický formulář podle vybraného segmentu (např. dopravní technika → délka, nosnost, prostředí; svařovaná konstrukce → materiál, hmotnost, rozměr).

**Krok 3 — Časový rámec:** 4 chips (do 1 měsíce, 1–3 měsíce, 3–6 měsíců, 6+ měsíců).

**Krok 4 — Kontakt:** firma, jméno, role, email, telefon, GDPR souhlas. Volitelně upload souborů (CAD, PDF specifikace).

**Krok 5 — Souhrn + odeslání:** přehled všeho, edit linky pro každý krok, tlačítko „Odeslat poptávku".

**Po odeslání:** thank-you screen s reference číslem poptávky a info „Ozveme se do 2 pracovních dnů". Backend pošle:
- Email klientovi (potvrzení),
- Email obchodnímu týmu (`obchod@strkan.cz`) s přehlednou tabulkou,
- Webhook do CRM (Pipedrive) — viz FEATURES.md.

### `/pravni/*`

Jednoduché MDX stránky, max-width 720 px, jen typografie. Obsah dodá klient (TODO content).

---

## Lokalizace URL

- **Strategie:** stejné slugy ve všech jazycích (`/sluzby`, `/reference`) — žádné `/services`, `/leistungen`. Důvod: jednodušší údržba, jasná IA, SEO se řeší přes `hreflang` tagy a překládaný obsah.
- **Výjimka:** `/o-nas` zůstává `/o-nas` ve všech jazycích — přijatelné, protože ostatní marketing weby v ČR drží podobnou konvenci a EN/DE klientela pochází z B2B kontextu, kde slugy nejsou marketingová zbraň.
- **Locale prefix:** vždy povinný (`/cs/...`, `/en/...`, `/de/...`). Root `/` redirectuje na `/cs/` na základě `Accept-Language` headeru, ale s fallbackem na CS.
- **Sitemap.xml** generuje všechny tři jazyky s `<xhtml:link rel="alternate" hreflang="…">` u každé URL.

---

## Breadcrumbs

Povinné na všech podstránkách kromě `/` a `/poptavka`. Schema.org `BreadcrumbList` JSON-LD na každé stránce, vizuálně subtle (text-sm, gray) pod navbarem v Container.

Příklad:
```
Domů › Reference › Linka pro montáž rotorů — ŠKODA Plzeň
```

---

## 404 / 500 stránky

- Custom design v duchu brandu: tmavé pozadí, velký „404" v display fontu, malá zpráva, CTA zpět na homepage + 4 odkazy na hlavní sekce.
- Žádné meme animace, žádný přehnaný humor — B2B kontext.
