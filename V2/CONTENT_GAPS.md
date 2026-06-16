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
