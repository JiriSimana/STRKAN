# BRAND — Vizuální identita

Tento dokument je závazný pro všechny vizuální rozhodnutí. Pokud kód odporuje tomuto dokumentu, opravuje se kód.

---

## 1. Pozicování značky

**Kdo STRKAN je:** český strojírenský inženýrský partner s 32letou tradicí, který navrhuje, vyrábí a servisuje stroje pro průmyslové zákazníky. Není to subdodavatel komodity — je to konstrukční partner pro projekty na míru.

**Tonalita značky:**
- **Sebevědomá, ne arogantní.** Mluvíme o tom, co umíme, ne o tom, jak jsme „nejlepší v ČR".
- **Konkrétní, ne marketingová.** Místo „inovativní řešení šitá na míru" píšeme „svařovaná konstrukce 18 t pro montážní halu Volkswagenu".
- **Tichá kompetence.** Necháme mluvit projekty, fotky a čísla. Žádné superlativy.
- **Lidská.** Strojírenství dělají lidé. V textech zmiňujeme tým a roli řemesla.

**Co STRKAN NENÍ:**
- ❌ startup, tech-bro, AI-first cokoliv
- ❌ luxusní lifestyle značka (i když „premium", primárně B2B serióznost)
- ❌ ekologická / udržitelnostní firma jako hlavní pozice (může být jako subtéma)
- ❌ levný dodavatel — neplýtváme s cenou jako USP

---

## 2. Barevná paleta

### 2.1 Primární

| Token | HEX | RGB | Použití |
|---|---|---|---|
| `--strk-ink` | `#071924` | 7, 25, 36 | Hlavní text, tmavé sekce, header scrolled, hluboké kontrasty |
| `--strk-paper` | `#FFFFFF` | 255, 255, 255 | Hlavní pozadí světlých sekcí |
| `--strk-mist` | `#FAFAFA` | 250, 250, 250 | Sekundární světlé pozadí, tonální oddělení sekcí |

### 2.2 Akcentové

| Token | HEX | RGB | Použití |
|---|---|---|---|
| `--strk-azure` | `#5BC4F1` | 91, 196, 241 | Hlavní akcent — primary CTA, focus rings, hover linky, KPI čísla |
| `--strk-azure-deep` | `#1F8FBF` | 31, 143, 191 | Hover state primary CTA, aktivní stavy |
| `--strk-azure-faint` | `#E8F6FD` | 232, 246, 253 | Pozadí success notifications, info bloků |

### 2.3 Neutrální

| Token | HEX | RGB | Použití |
|---|---|---|---|
| `--strk-graphite` | `#2A3540` | 42, 53, 64 | Sekundární tmavé pozadí, hover na ink-elementech |
| `--strk-steel` | `#575756` | 87, 87, 86 | Body text na bílém pozadí, sekundární text |
| `--strk-fog` | `#A8A8A7` | 168, 168, 167 | Disabled stavy, tlumený text, separátory |
| `--strk-cloud` | `#E5E5E4` | 229, 229, 228 | Border default, dělicí linie |
| `--strk-clean-gray` | `#F2F2F2` | 242, 242, 242 | Pozadí neutrálních sekcí (zachováno z původního brandu) |

### 2.4 Sémantické (jen pro stavy)

| Token | HEX | Použití |
|---|---|---|
| `--strk-success` | `#16A34A` | Úspěch formuláře, validace OK |
| `--strk-warning` | `#D97706` | Upozornění |
| `--strk-error` | `#DC2626` | Chyba, validační error |

### 2.5 Pravidla použití

- **Akcent `--strk-azure` se používá střídmě** — jen na primary CTA, key čísla v KPI, focus stavy a hover linky. Ne na ikony, ne na underlines v textu, ne na velké plochy. Pravidlo „70/20/10": 70 % paper, 20 % ink, 10 % azure.
- **Tmavé sekce** používají `--strk-ink` jako základ, ne čistou černou. Důvod: čistá černá je v tištěné CMYK doméně technicky lepší, ale na obrazovce vypadá agresivně. `#071924` má modrý nádech, který drží pohromadě s azurovým akcentem.
- **Žádné gradient blobs.** Pokud potřebujeme gradient, je to lineární (135°) z ink do graphite, použitý jako pozadí hero / CTA bloku. Žádné radial gradients, žádné conic gradients.
- **Kontrast:**
  - paper text na ink: 16.5:1 ✅
  - ink text na paper: 16.5:1 ✅
  - steel na paper: 7.6:1 ✅ (AAA)
  - azure na ink: 6.8:1 ✅ (AA Large)
  - azure na paper: 2.4:1 ❌ — **azure se NIKDY nepoužívá jako text na bílém pozadí**, jen jako pozadí tlačítka nebo accent prvek; pokud chceme „azure link na bílém", používáme `--strk-azure-deep` (4.7:1 ✅).

---

## 3. Typografie

### 3.1 Fonty

**Primární — display + body:** **Söhne** (Klim Type Foundry).
- Důvod: prémiový industrial sans, výborná čitelnost na display velikostech, charakter bez teatrality. Drobně technický řez.
- Náklady: licence cca 600 € jednorázově za sadu (Web 1 domain). Klient si licenci kupuje na své jméno.
- **Pokud licence není možná (rozpočet/timing):** fallback na **Inter** (open source, free) ve variabilní variantě. Inter je vizuálně dostatečně blízko a je to industry-standard. Žádné jiné free alternativy nezvažujeme (Manrope, Plus Jakarta etc. nejsou pro tento brand vhodné).
- **Striktně NE Metropolis** — open source font s nekonzistentní kerning a slabým italic řezem. Původní web ho používal jen z legacy důvodů, v redesignu odchází.

**Mono — tech specs, čísla strojních parametrů:** **JetBrains Mono** (open source).
- Použití: tech specs tabulky (hmotnosti, rozměry, modely), čísla v KPI blocích, kódové ukázky pokud někdy budou.

**Loading strategy:** všechny fonty přes `next/font/local` se subset latin-ext (čeština + němčina), `display: swap`. Žádné `@fontsource/*` packages. Fonty self-hostované přes `public/fonts/` nebo přes `next/font/local`.

### 3.2 Type scale

Modular scale 1.250 (Major Third) na desktop, kompresnější 1.200 (Minor Third) na mobile.

| Token | Desktop | Mobile | Weight | Letter-spacing | Line-height | Použití |
|---|---|---|---|---|---|---|
| `display-2xl` | 96 px | 56 px | 600 | -0.03em | 1.0 | Hero H1 jen homepage |
| `display-xl` | 72 px | 44 px | 600 | -0.025em | 1.05 | Page headers H1 |
| `display-lg` | 56 px | 36 px | 600 | -0.02em | 1.1 | Sekční nadpisy H2 |
| `display-md` | 40 px | 28 px | 600 | -0.015em | 1.15 | Card title large, H3 |
| `heading-lg` | 28 px | 22 px | 600 | -0.01em | 1.25 | H4, hero CTA podtitulek |
| `heading-md` | 22 px | 18 px | 600 | -0.005em | 1.3 | Inline nadpis, modal title |
| `heading-sm` | 18 px | 16 px | 600 | 0 | 1.35 | Card title small |
| `body-lg` | 19 px | 17 px | 400 | 0 | 1.6 | Lead paragraf, intro odstavce |
| `body` | 17 px | 16 px | 400 | 0 | 1.65 | Default body text |
| `body-sm` | 15 px | 14 px | 400 | 0.005em | 1.55 | Caption, meta info, breadcrumbs |
| `mono-tech` | 15 px | 14 px | 500 | 0.02em | 1.4 | Tech specs, čísla parametrů (JetBrains Mono) |
| `eyebrow` | 13 px | 12 px | 600 | 0.12em | 1.4 | UPPERCASE label nad nadpisem („PŘÍPADOVÁ STUDIE") |

**Pravidla:**
- H1 jen jeden per stránka.
- Mezi H2 a následujícím odstavcem padding 32 px.
- `eyebrow` se renderuje vždy `text-transform: uppercase` a v barvě `--strk-azure` nebo `--strk-fog`.
- Žádné `text-align: justify` (vytváří řeky v textu, špatné pro screen readers).
- `font-weight: 700` (bold) se nepoužívá — značka má jen 400 a 600 řezy. 600 zvládne všechny zvýrazněné stavy.

### 3.3 Hierarchie a rytmus

- **Sekce má vždy** `eyebrow` (volitelně) + `display-lg/md` nadpis + `body-lg` perex (max 2 řádky) + obsah. Tato trojice se nikdy neporušuje.
- **Mezi sekcemi** vertical padding 96 px desktop / 64 px mobile.
- **Uvnitř sekce mezi bloky** 48 px desktop / 32 px mobile.
- **Mezi odstavci** 24 px.

---

## 4. Logo

### 4.1 Varianty

V repozitáři `public/brand/`:

- `logo-color.svg` — full color, primary varianta na světlých pozadích (paper, mist, clean-gray).
- `logo-inverse.svg` — bílá varianta na tmavých pozadích (ink, graphite, fotografiích s overlay).
- `logo-mono-ink.svg` — jednobarevná v ink barvě, pro situace kde nelze plný color (faktury, dokumenty).
- `logo-mark.svg` — jen značka bez wordmarku, pro favicon, app icony, social avatary.

### 4.2 Pravidla použití

- **Minimální velikost:** výška 24 px na obrazovce, 8 mm v tisku.
- **Clear space:** prázdná zóna kolem loga = výška „S" v wordmarku (cca 1× výška znaku).
- **Žádné modifikace:** nezkreslovat, nepřebarvovat (kromě 4 oficiálních variant), nepřidávat efekty (stín, glow, outline), nerotovat.
- **Na fotografii** logo vždy přes inverse variantu + bezpečný overlay (min 30 % ink-tint pod logem).
- **Favicon:** `logo-mark.svg` ve formátu 32×32, 192×192, 512×512 + Apple touch icon 180×180.

### 4.3 Co dodat (TODO content)

- Aktuální brand-book / ekvivalent — pokud klient má, použít ho jako master. Pokud ne, vytvoří se jako součást tohoto redesignu.
- Vektorové podklady všech 4 variant.
- Definice clear-space v px / mm.

---

## 5. Fotografická směrnice

Foto je v této značce **stejně důležité jako typografie**. Špatné fotky = celý dojem padá.

### 5.1 Žádané

- **Reálná výroba** — záběry hal, strojů, svařování, montáže. Detaily kovu, jisker, oleje na ruce.
- **Lidé v práci** — operátoři u CNC, konstruktéři u monitoru se SolidWorks, svářeč v helmě. Vždy v kontextu, vždy autenticky. Žádné fake-úsměvy do kamery.
- **Detaily** — close-upy svaru, ozubeného kola, povrchu broušeného materiálu, kabelových svazků. Tyto fotky jsou hrdinou — používáme je jako sekční breaks.
- **Reportáž z realizace** — instalace u klienta, nakládka stroje na kamion, kontrola před expedicí.
- **Architektonika hal** — širokoúhlé záběry haly z exteriéru, vstupní brány, parkoviště se zaměstnanci ráno před směnou. Buduje místně-konkrétní pocit.

### 5.2 Nežádoucí

- ❌ stock fotky obecně (kromě nutnosti — pak jen Unsplash s jasným industrial vibem, ne corporate handshake)
- ❌ AI generované fotky (ChatGPT image, Midjourney, Flux)
- ❌ posed business shots (oblek + kravata + úsměv do kamery)
- ❌ over-saturated fotky se silnou Instagram-grade gradací
- ❌ tilted angle / dutch angle (artistická křečovitost nepatří k značce)
- ❌ filtry typu „industrial Lightroom preset" se silným teal & orange — mírná korekce ano, hollywood color grade ne

### 5.3 Color grading

- **Studené světlé scény** (haly, exteriér): mírně desaturované, modrý nádech v shadows. White balance kalibrovaný neutrálně.
- **Teplé scény** (sváření, jiskry, kovárny): zvýrazněná oranžová na svaru, rest beze změny. Žádné fake exposure highlights.
- **Konzistence:** všechny fotky na webu by měly vypadat jako z jednoho photo-shootu, i když nejsou. Před nasazením celý feed projít přes 1 LUT v Lightroomu (vlastní pro značku, dodáme s brand-bookem).

### 5.4 Cropy a poměry stran

- **Hero / full-bleed:** 16:9 desktop, 4:5 mobile.
- **Card image:** 16:9 (showcase) nebo 4:5 (vertical grid).
- **Reference detail hero:** 21:9 (cinematic).
- **Detail v reportáži:** 1:1 nebo 3:4.
- Žádné vertikální 9:16 mimo mobile-only kontexty.

### 5.5 Akviziční plán (TODO production)

V první fázi po launchi je potřeba realizovat **vlastní photoshoot** ve výrobě STRKAN — ideálně 2 dny, 1 fotograf + asistent. Brief:
- Den 1: hala, stroje, výrobní procesy, detaily.
- Den 2: portréty týmu, instalace u klienta (pokud možné), exteriér.

Do té doby používáme stávající fotografie klienta (pokud má) + 6–10 dočasných stock obrázků z Unsplash s industrial vibem (oceněním, ne placeholder text).

---

## 6. Iconografie

- **Knihovna:** [Lucide](https://lucide.dev/) (open source, MIT). Žádný Material Icons, žádný Font Awesome.
- **Stroke width:** 1.5 px konzistentně.
- **Velikost:** 16, 20, 24, 32 px — ne mezi-velikosti.
- **Barva:** dědí z `currentColor`. Ne barevné ikony, ne emoji jako ikony.
- **Vlastní industrial ikony** (CNC stroj, robotická buňka, polohovadlo) — kreslíme na míru ve stejném stylu jako Lucide (1.5 px stroke, 24×24 viewbox, line-only). Ukládáme do `src/components/icons/` jako React komponenty.

---

## 7. Voice & Tone — copywriting guidelines

### 7.1 Jazykové principy

- **Krátké věty.** Ideálně do 15 slov. Pokud je věta delší než 25 slov, rozseknout.
- **Aktivní rod.** „Navrhli jsme polohovadlo" ne „Polohovadlo bylo navrženo".
- **Konkrétní čísla.** „32 let", „45 zaměstnanců", „od 1993" — ne „dlouholeté zkušenosti", „silný tým".
- **Žádné buzzwordy.** Zakázané fráze: „inovativní řešení", „synergie", „proaktivní přístup", „zákazník na prvním místě", „komplexní servis", „šité na míru" (klišé), „kvalita bez kompromisů" (klišé).
- **Žádný humor v copy.** Drobné teplo ano, vtipkování ne. (Konkrétně: na 404 stránce „Tahle stránka nás opustila" je ok, „404, jejda, něco se posralo" není.)

### 7.2 Příklady

**❌ Špatně (původní web):**
> Zakládáme si na individuálním přístupu, špičkové kvalitě zpracování a dodržování dohodnutých termínů.

**✅ Lépe:**
> Termíny dodržujeme. V 94 % zakázek z posledních pěti let jsme dodali v plánovaném týdnu.

**❌ Špatně:**
> Inovativní přístup — neustále investujeme do nových technologií.

**✅ Lépe:**
> V roce 2024 jsme zařadili 5osý CNC Mazak Variaxis i-700 a robotické svařovací pracoviště Yaskawa MA2010.

### 7.3 Mikrocopy

- **Tlačítka:** sloveso v rozkazovacím způsobu, max 3 slova. „Získat nabídku", „Číst dál", „Domluvit schůzku". Ne „Klikněte zde", ne „Více informací".
- **Formuláře:**
  - Labels nad inputy, ne placeholdery.
  - Validační hlášky konkrétní: „Email musí obsahovat @" ne „Neplatný email".
  - Success: „Vaše poptávka byla odeslána. Ozveme se do 2 pracovních dnů."
  - Error: „Odeslání selhalo. Zkuste to prosím znovu, nebo nám napište přímo na obchod@strkan.cz."
- **Empty states:**
  - „Zatím tu nic není" + 1 věta vysvětlení + CTA pokud lze. Ne „Žádné výsledky".

### 7.4 Lokalizace

- **CS** je primární. Píše se nativně, ne překladem z EN.
- **EN** je business-formal, US English (americká angličtina), oslovení „you" formální. Žádné britské „colour" / „organisation".
- **DE** je business-formal, oslovení „Sie", švýcarské/německé varianty unifikujeme na standardní DE (bez ß tam, kde je v ČSN normě nahrazeno — držíme „ß").
- Překládají rodilí mluvčí, ne strojový překlad. Glossary technických termínů (polohovadlo, jednoúčelový stroj, …) vede se v `src/messages/_glossary.md`.

---

## 8. Sound design

Žádný. Web je kompletně **silent**:
- Žádný background music v hero videu (video je always muted).
- Žádné notifikační zvuky.
- Žádné hover/click zvuky.

Důvod: B2B kontext, web se prohlíží často v open-space, zvuk je neprofesionální.

---

## 9. Brand do not list (rychlý čeck pro reviewery)

- ❌ rounded corners (mimo `rounded-full` na avatarech a malé status indikátory)
- ❌ gradient backgrounds mimo definované dva (hero ink-gradient, CTA azure-gradient)
- ❌ glassmorphism (`backdrop-blur` na bíle průhledných plochách)
- ❌ neumorfismus
- ❌ emojis v copy nebo UI (kromě 🇨🇿 🇬🇧 🇩🇪 v jazykovém switcheru — a i tam preferujeme abreviaci CS/EN/DE)
- ❌ AI obrázky
- ❌ stock business handshakes
- ❌ rotující carousel-y, autoplay s timerem
- ❌ Marquee / news ticker s textem
- ❌ Typewriter efekt v hero
- ❌ confetti animace, party cracker, sparkles
- ❌ chatbot/AI agent v rohu obrazovky
- ❌ exit-intent popupy, newsletter modal po 30 s
