# Content gaps — STRKAN web v2

Tracked items the client must deliver. Update before each weekly stand-up. See FEATURES.md §12 for the full pre-launch list.

## Blocking — bootstrap (next ~2 weeks)

- [ ] **Söhne font files** in `public/fonts/`:
  - `sohne-buch.woff2` (weight 400)
  - `sohne-halbfett.woff2` (weight 600)
  - Subset: latin-ext (CS + DE diacritics).
  - Action on arrival: create `src/app/fonts.ts` per UI.md §9.1 and wire `sohne.variable` className into `src/app/[locale]/layout.tsx` `<html>`.
- [ ] **JetBrains Mono** in `public/fonts/jetbrains-mono.woff2` (open source, MIT — can be fetched from JetBrains directly with latin-ext subset).

## Blocking — brand assets

- [ ] Logo SVGs in `public/brand/`:
  - `logo-color.svg`
  - `logo-inverse.svg`
  - `logo-mono-ink.svg`
  - `logo-mark.svg`
- [ ] Favicon set derived from `logo-mark.svg` (32, 192, 512 px + Apple touch 180).

## Phase 2 — populated per page as we build

See the section below — captured from the client meeting on 25 May 2026.

---

# Klientská schůzka (25. 5. 2026) — feedback a chybějící obsah

Vychází z prezentace webu klientovi (STRKAN) a z pravidla v `CLAUDE.md` č. 1 — **žádné vymyšlené údaje** v produkčním kódu.

> **Princip (klient zdůraznil 2×):** v maximální míře převzít texty z původního webu **strkan.cz**, nevymýšlet nový obsah.
> Texty v `src/messages/cs.json` jsou zatím **návrh** — před spuštěním nahradit oficiálními texty klienta.

## 0. Kontext a termíny
- **Cíl:** spustit CS + EN (+ DE) **do prázdnin** (jsme ve 2. pol. května).
- **Tvrdý termín:** od **července kampaň na InnoTrans** → návštěvníci veletrhu si budou web vyhledávat, musí na něm najít info.
- Web se pak může doladit „klidně půl roku", ale musí být venku.
- Hosting: Vercel (zdarma při malém provozu) + doména (~1000 Kč/rok). Měřicí nástroje zabudovat. **Google Ads faktura na STRKAN.**

## 1. Texty
- [ ] **Import oficiálních textů z původního webu strkan.cz** pro všechny sekce (O nás, Služby, Reference, Kontakt). Aktuální texty jsou návrh.
- [x] **Tón zkonzervativnit** — ubrat „příliš sebevědomá / reklamní" tvrzení (1. iterace hotová — viz §8 changelog). Zbytek po importu reálných textů.
- [ ] **Supervize překladu** CS → EN → DE (paní Šimánková), zejména technické termíny (viz §7 glosář).

## 2. ⚠ Nepodložená / vymyšlená data — POTVRDIT nebo NAHRADIT
> Tyto hodnoty jsou v kódu jako návrhové. Dokud je klient nepotvrdí, **nejsou pravdivé** a nesmí jít do produkce. V kódu označeno `// TODO(content):`.

| Místo | Co je teď v kódu (návrh) | Akce |
|---|---|---|
| Certifikáty (`o-nas`) | ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, EN ISO 3834-2, EN 1090-1 EXC3 | Potvrdit reálné certifikáty + dodat **skeny/loga + PDF** |
| Milníky / timeline (`o-nas`) | 1993 založení, 2002 první automotive, 2010 druhá hala, 2018 ISO 3834, 2022 robotika, 2024 Mazak | Potvrdit reálnou historii a roky |
| Strojní vybavení (`o-nas`) | Mazak Variaxis i-700, DMG Mori CTX, Mikron HSM, TRUMPF TruLaser 3030, Yaskawa MA2010, Fronius TPS 320i, Kemppi, ESAB, Zeiss Contura, FARO ScanArm, Helmel | Dodat **reálný seznam strojů** |
| KPI / statistiky | „1 000+ projektů", „70 % opakovaných", „94 % včas", „45 zaměstnanců", „2 haly / 2 400 m²" | Dodat **reálná čísla** (návrhové statistiky v textu zmírněny, KPI bloky čekají na reálná čísla) |
| Tým (`o-nas`) | ředitel / hlavní konstruktér / vedoucí výroby (obecná bia) | Dodat jména, role, bia, **foto** |
| IČO / DIČ / telefon / adresa (footer, kontakt) | „—" | Dodat reálné údaje *(už `TODO(content)`)* |
| Technické parametry produktů | dopravní technika — nosnosti, zdvihy apod. | Ověřit dle **katalogových listů** (PDF už v `public/`) |

## 3. Fotografie
- [ ] **Vyměnit fotky, které AI natáhlo špatně** — někde lidé / kameramani / nesouvisející záběry (klient).
- [ ] **Přiřadit fotku ke konkrétnímu produktu / tématu** (hero homepage, 4 segmenty, reel, manifest, tým, kariéra).
- [ ] Žádný stock ani AI lidé (viz `BRAND.md`) — reálná výroba, detaily strojů, lidé z provozu.

## 4. Video
- [ ] **Hero promo video** (homepage, YouTube `lQKCzrs65do`) — klient: „data jsou špatně". Nahradit správným videem / ID.
- [ ] **Videobanka strojů** (samostatné záběry pro videohovory / videolekce) — natáčí Ondra Málek, ~3–4 videa.

## 5. Certifikáty & publicita dotace (povinný obsah)
- [ ] **Certifikáty:** reálná loga + PDF + přesné názvy a platnost (viz §2).
- [ ] **Publicita dotačního projektu** — máme: **TAČR, program TREND, reg. č. FW01010553** (projekt URS — univerzální robotický systém, 2020–2024).
  Dodat: oficiální **název projektu**, **povinná loga** (TAČR / MPO / EU dle pravidel publicity), **období**, **výši podpory**, povinný **text publicity**.
  *(Přidán blok „Publicita projektu" na `/o-nas` — zatím s `TODO(content)` na loga a částky.)*

## 6. Poptávkový formulář / konfigurátor
- [ ] Společně s klientem **doladit sadu otázek** (segment → parametry → termín → kontakt). Klient chce komplexní formulář ve všech jazycích.

## 7. Překladový glosář — technické termíny (pro supervizi EN/DE)
> EN i DE verze `ServiceSegments` a `ServiceContent` jsou zatím **česky (nepřeloženo)** — přeložit + supervize.

| CS | EN | DE | Pozn. |
|---|---|---|---|
| patkový zvedák | **toe jack** | Achshebebock | ❗ NE doslovné „heel jack" (klient) |
| jámový zvedák | pit jack / pit lift | Grubenheber | |
| montážní lávka | access / work platform | Montagebühne | |
| podvozkový stand / lis | bogie press / stand | Drehgestellpresse | |
| (deskové) polohovadlo | (plate) positioner | Drehkipppositionierer | |
| svařovaná konstrukce | welded structure | Schweißkonstruktion | |
| kolejové vozidlo | rail vehicle | Schienenfahrzeug | |

## 8. Hotovo v této iteraci (changelog)
- **Oprava názvu segmentu:** „Výroba a servis dopravní techniky" → **„Stroje a zařízení pro výrobu a servis dopravní techniky"** (klient: STRKAN dopravní techniku nevyrábí ani neservisuje — vyrábí pro to stroje).
- **Počet segmentů:** „pět / five / fünf" → **„čtyři / four / vier"** (reálně 4 segmenty).
- **Zmírnění tónu** (CS/EN/DE): homepage hero + manifest, Hodnoty (O nás), Kariéra („nadšenci na 6 měsíců", „není to náhoda", „žádný corporate").
- **Nepodložená procenta** odstraněna z běžícího textu (přesunuto do §2 k doplnění reálných čísel).
- **Přidán blok publicity dotačního projektu** na `/o-nas`.

---

# Redesign / import textů ze strkan.cz (2. iterace)

Reálné texty převzaty z živého webu **strkan.cz** (homepage, /o-nas, podstránky služeb).

## A. Opraveno na reálná data (CS hotovo, kód hotový)
- ⚠️ **Datum založení: 1993 → 22. 5. 2012** (firma je STRojní KANcelář, ne „od 1993"). Promítnuto do homepage, /o-nas, KPI.
- **Sídlo/výroba:** „2 haly v Plzni" → **Město Touškov u Plzně, 2 500 m²**.
- **Hlavní claim** homepage: → „Návrh, konstrukce a výroba strojů".
- **Tým (/o-nas):** 3 vymyšlené role → **7 reálných lidí se jmény** (Tříska, Holubec, Gorschenek, Prokeš, Fiala, Sýkora, Augustová).
- **Certifikáty:** ISO 14001/45001 (vymyšlené) → **ČSN EN ISO 9001:2016, 3834-2:2022, ČSN EN 1090-2:2019, ČSN EN 15085-2+A1:2024 (CL1), DIN EN 15085-2:2024**.
- **Vybavení:** Mazak/TRUMPF/Zeiss (vymyšlené) → **SolidWorks/Siemens NX/CATIA, svařování 135/141, roboti Fanuc/ABB/Staubli, zkušebna Rockwell/Vickers/Brinell + Charpy**.
- **Identifikace (footer):** doplněno **IČO 29157382, DIČ CZ29157382, sídlo Lánská 144/5 Plzeň, provozovna Čemínská 628 Město Touškov**.
- **Specifikace služeb** (svařované konstrukce, automatizace, ostatní) opraveny na reálné (10 t / 8 000 × 3 000 mm / EXC2 / CL1; 318 projektů; URS).
- **Odstraněn vymyšlený timeline** (/o-nas) — starý web nemá milníky kromě založení 2012.
- **Mezery sekcí zkráceny** (`py-24 lg:py-32` → `py-16 lg:py-24`) — main page působila dlouze.

## B. Stále chybí / dořešit
- [ ] **EN/DE retranslace** z opravené češtiny (workflow: CS → překlad → supervize paní Šimánková). Zatím synchronizovány jen názvy, KPI popisky a tým; běžné texty O nás / Home / služby v EN/DE jsou ještě staré.
- [ ] **Telefon** na firmu (footer/kontakt) — na strkan.cz/kontakt jsem zatím nestáhl, doplnit. Datová schránka: 8ytdikc, banka: 2925498399/0800 (k dispozici).
- [ ] **Plocha výroby — nesoulad na starém webu:** /o-nas uvádí „2 500 m²", podstránka svařování „3 000 m²". Potvrdit správné číslo.
- [ ] **Certifikáty — loga + PDF** stále chybí (názvy už reálné).
- [ ] **Fotky:** přiřadit ke správným sekcím/produktům (viz §3 a otázka v chatu — dělení „podle jmen lidí" na starém webu).
- [ ] **Katalogové listy:** 5 PDF je v `public/documents/katalogove-listy/` a renderují se u dopravní techniky; starý web má i 1 souhrnný PDF katalog (`_files/ugd/59c1fd_…pdf`) — případně doplnit.
- [ ] **Podstránky služeb — sub-produkty** (patkové zvedáky, montážní lávky, jámové zvedáky, podvozkové standy a lisy, desková polohovadla): doladit texty/parametry dle starého webu (rozsahy zdvihu, nosnosti, síly).
- [ ] **Kontakt / Kariéra / Novinky** — projít a sladit se starým webem.

---

# Placeholdery / fotky (3. iterace)

Cíl: žádný placeholder na statických stránkách. **Ověřeno — 0 placeholderů** na /cs, /o-nas, /kontakt, /kariera, /sluzby, /reference, /novinky.

## Hotovo
- **Mapa (/kontakt):** placeholder → **reálný Google Maps embed** (provozovna Čemínská 628, Město Touškov) + odkazy Google/Mapy.cz.
- **/o-nas příběh:** reálná fotka (tým u 3D modelu, `strkan-135`).
- **/kariera:** reálná fotka (svářeč, `strkan-030`).
- **Tým (/o-nas):** **všech 7 reálných portrétů** zapojeno (`public/images/team/`): Tříska (022), Holubec (106), Gorschenek (073), Prokeš (017), Fiala (151), Sýkora (150), Augustová (153). Portrét Holubce (106) byl zároveň odebrán z homepage reelu (nahrazen produkčním 070). U každého doplněn **přímý telefon + e-mail** (klikací, ze strkan.cz).
- **Telefon doplněn** (footer + kontakt): **+420 724 506 929**. Otevírací doba opravena na **Po–pá 7:00–17:00**.
- **Adresa + IČO/DIČ** doplněny i na /kontakt.

## Dořešit
- [x] **Portréty týmu** — hotovo, všech 7 reálných portrétů zapojeno (viz výše).
- [ ] **Mapa** běží přes Google embed (načítá Google cookies). Volitelně přepnout na Mapy.cz embed / Mapbox.
- [ ] ⚠️ **Doprava (/kontakt) — text je VYMYŠLENÝ a špatný:** zmiňuje „Plzeň-Doubravka", „zastávka Doubravka — STRKAN", „trolejbus č. 12", „D5 8 min" — to je jiná lokalita. Provozovna je **Město Touškov**. Doplnit reálné spojení (auto/vlak/bus) nebo sekci dopravy zjednodušit.
- [ ] Fotky u referencí/novinek se naplní z CMS (zatím prázdné).
