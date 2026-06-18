# UI — Design systém

Implementační dokument pro vývojáře. Závazný, ale měl by se aktualizovat společně s Figmou.
Tokeny popsané zde se mapují 1:1 do `tailwind.config.ts` a `src/styles/tokens.css`.

---

## 1. Design tokeny

Tokeny žijí v `src/styles/tokens.css` jako CSS custom properties a propisují se do Tailwindu přes `@theme` block (Tailwind 4 CSS-first config).

### 1.1 Spacing scale

Jednotka = 4 px. Tailwind defaultní scale beze změn (`0`, `1`=4px, `2`=8px, `3`=12px, `4`=16px, `6`=24px, `8`=32px, `12`=48px, `16`=64px, `20`=80px, `24`=96px, `32`=128px, `40`=160px).

**Pravidla:**
- Section vertical padding desktop: `py-24` (96px) až `py-40` (160px) podle váhy sekce.
- Section vertical padding mobile: `py-16` (64px) až `py-24` (96px).
- Container horizontal padding: `px-6` mobile, `px-8` tablet, `px-12` desktop.
- Mezi sekcemi NE margin, jen padding na samotných sekcích (kvůli scroll-margin pro anchor links).

### 1.2 Container

Max width: `max-w-[1440px]`, žádné `max-w-7xl` (1280px je málo pro editorial layout).
Definováno v `Container` komponentě v `src/components/primitives/Container.tsx`.

```tsx
<Container size="default" />  // max-w-[1440px]
<Container size="narrow" />   // max-w-[960px], pro článkový obsah
<Container size="wide" />     // max-w-[1680px], pro full-bleed showcase
```

### 1.3 Border radius

**Globálně 0** (ostré rohy = brand prvek z původního webu, zachováno). Výjimky:

- `rounded-full` — avatary, status dots, jazykové chips, focus ring.
- `rounded-[2px]` — jen u inline tagů a badges (UPPERCASE pill labels).

Žádné `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl` v projektu.

### 1.4 Shadows

```css
--shadow-flat:    0 1px 0 0 rgba(7, 25, 36, 0.06);
--shadow-card:    0 1px 3px rgba(7, 25, 36, 0.06), 0 8px 24px rgba(7, 25, 36, 0.04);
--shadow-lift:    0 4px 16px rgba(7, 25, 36, 0.10), 0 16px 40px rgba(7, 25, 36, 0.06);
--shadow-overlay: 0 24px 64px rgba(7, 25, 36, 0.18);
```

- `flat` = subtle separator (cards v gridu, sticky navbar po scrollu).
- `card` = klidová card.
- `lift` = hover state card, modaly.
- `overlay` = drawers, dialogs.

### 1.5 Borders

```css
--border-hairline: 1px solid rgba(7, 25, 36, 0.06);
--border-soft:     1px solid rgba(7, 25, 36, 0.10);
--border-strong:   1px solid rgba(7, 25, 36, 0.18);
--border-on-ink:   1px solid rgba(255, 255, 255, 0.06);
```

`hairline` se používá pro subtle dělicí linie na světlých plochách. `on-ink` pro stejný účel na tmavých sekcích.

### 1.6 Z-index scale

```
z-0    base
z-10   sticky elements (filter bar, reading progress)
z-20   sticky navbar
z-30   mega menu, mobile drawer overlay
z-40   modals, dialogs
z-50   toasts, notifications
z-60   command palette / search overlay
```

Žádné inline `z-[999]` nebo magické konstanty.

---

## 2. Breakpointy

Mobile-first. Přesné hodnoty:

```
sm:  640px   ← větší telefony, nehlasujeme se na tom moc
md:  768px   ← tablety v portrétu, upraveni layouty z 1col na 2col
lg:  1024px  ← tablety landscape, malé laptopy, hlavní desktop layout zapíná
xl:  1280px  ← běžný laptop / desktop
2xl: 1536px  ← velké monitory, jen drobné úpravy spacing
```

**Cílové zařízení pro QA:**
- iPhone 14 Pro (393×852)
- iPad Pro 11" (834×1194)
- MacBook Pro 14" (1512×982)
- 27" 1440p externí monitor

---

## 3. Komponenty — katalog

Strukturováno podle hierarchie `primitives → layout → sections`.

### 3.1 Primitives (`src/components/primitives/`)

#### `Button`

```tsx
<Button variant="primary" | "secondary" | "ghost" | "outline-light" | "outline-dark"
        size="sm" | "md" | "lg"
        icon={<ArrowRight />} iconPosition="left" | "right"
        loading={boolean}
        as="button" | "a" | typeof Link />
```

| Variant | Background | Text | Hover | Use |
|---|---|---|---|---|
| `primary` | `--strk-azure` | `--strk-ink` | `--strk-azure-deep` + lift | Hlavní CTA (Hero, Reference detail, Konfigurátor) |
| `secondary` | `--strk-ink` | `--strk-paper` | `--strk-graphite` | Sekundární CTA na světlém pozadí |
| `ghost` | transparent | `--strk-ink` | `--strk-clean-gray` | Tertiary actions, modal close |
| `outline-light` | transparent | `--strk-paper` border `rgba(255,255,255,0.4)` | invert (white bg, ink text) | Hero CTAs na fotkách |
| `outline-dark` | transparent | `--strk-ink` border `--strk-cloud` | filled `--strk-ink` | Sekundární CTA na světlém |

**Velikosti:**
- `sm`: height 40px, px-4, text 14px
- `md`: height 48px, px-6, text 15px (default)
- `lg`: height 56px, px-8, text 16px

**Společné:**
- Žádný border-radius (ostré rohy).
- `text-transform: none` (ne UPPERCASE u tlačítek — to je kontroverzní rozhodnutí oproti původnímu webu, ale UPPERCASE buttons jsou outdated).
- Letter-spacing: 0.01em.
- Font-weight: 600.
- Transition: `150ms ease-out` na background, color a transform.
- Hover: žádný scale animation, jen barva (na primary/secondary) nebo background fill (na outline).
- Focus visible: 2px outline `--strk-azure` + 2px offset.
- Loading: spinner v size-current na pozici ikony, button content aria-hidden.

#### `Link` (text link)

```tsx
<TextLink href="..." variant="default" | "muted" | "inverse" arrow={boolean} />
```

- Default: barva `--strk-ink`, na hover podtržení v `--strk-azure-deep`.
- Muted: barva `--strk-steel`, hover na `--strk-ink`.
- Inverse: na tmavém pozadí, bílá → `--strk-azure` na hover.
- `arrow` přidá `→` ikonu vpravo, která se na hover posune `translate-x-1`.

#### `Input`, `Textarea`, `Select`

- Height 48px (md), border `--strk-cloud`, background `--strk-paper`.
- Focus: border `--strk-azure-deep` + box-shadow ring `0 0 0 4px rgba(91,196,241,0.15)`.
- Error state: border `--strk-error`, malá hláška pod inputem v `--strk-error` text.
- Label nad inputem v `eyebrow` stylu (UPPERCASE 12px, `--strk-steel`).
- Placeholder v `--strk-fog`.
- Žádný border-radius.

#### `Checkbox`, `Radio`

- Custom design, 20×20 px box.
- Idle: border `--strk-cloud`, background `--strk-paper`.
- Checked: background `--strk-ink`, ikona v `--strk-paper`.
- Hover idle: border `--strk-fog`.
- Focus: ring jako u inputu.

#### `Tag` / `Chip`

```tsx
<Tag variant="default" | "outline" | "filled-azure" | "filled-ink">{children}</Tag>
```

- Height 28px, px-3.
- `rounded-[2px]` (jediný element s rounded > 0 mimo full).
- Eyebrow typografie (UPPERCASE 12px, weight 600, letter-spacing 0.12em).

#### `Badge` (countdowns, status)

- Stejné jako Tag, ale `rounded-full` a height 24px.

#### `Dialog` / `Modal`

- Radix UI Dialog primitive.
- Overlay: `bg-ink/60` + `backdrop-blur-sm` (jen tady backdrop blur povolen — protože je to plná překrývající vrstva, ne UI prvek).
- Content: `bg-paper`, max-width 640px, padding 48px, shadow `overlay`.
- Animace: fade overlay 200ms, slide+fade content 250ms.
- Close: `Esc` + click-outside + close button top-right (ghost icon-only).

#### `Tooltip`

- Radix UI Tooltip.
- Background `--strk-ink`, text `--strk-paper`, padding 8 12, font-size 13.
- Delay 200ms.
- Šipka 6px.

#### `Accordion`

- Radix UI Accordion.
- Trigger: full width, padding 24 0, border-bottom `hairline`.
- Header: heading-md, ink color, ikona `+` / `−` vpravo (rotuje 45° na open).
- Content: padding-bottom 24, body text v steel.
- Animace: height auto s framer-motion (CSS height transition není smooth).

#### `Tabs`

- Radix UI Tabs.
- TabsList: horizontal, border-bottom `hairline`, gap 0.
- TabsTrigger: padding 12 24, idle barva steel, active border-bottom 2px `--strk-azure` + ink color.
- TabsContent: padding-top 32.

### 3.2 Layout components (`src/components/layout/`)

#### `Navbar`

- Fixed top, height 80 (mobile 64).
- Dva stavy: `transparent` (top of page jen na homepage) a `solid` (vždy jinak + scrolled na homepage).
- Solid stav: `bg-paper/95 backdrop-blur-md` + `border-b border-hairline`.
- Logo vlevo, hlavní nav střed, lang switcher + CTA „Poptávka" vpravo.
- CTA „Poptávka" je button variant=`primary` size=`sm` — vždy viditelný v navbaru.
- Mega menu trigger: na hover zobrazí mega panel (viz SITEMAP.md).
- Mobile (< 1024px): hamburger → drawer.

#### `MegaMenu`

- Position: absolute pod navbarem, full-width.
- Background: `--strk-paper`, border-bottom `hairline`, shadow `lift`.
- Padding 48 0 32.
- Animace: slide-down + fade 200ms.
- Klávesnice: arrow keys mezi položkami, Esc zavře.
- ARIA: `role="menu"`, `aria-haspopup="true"`.

#### `MobileDrawer`

- Off-canvas zprava, full-height, šířka 100% (do 480px) nebo 480px (větší).
- Overlay `bg-ink/40`.
- Animace slide-in 250ms.
- Hlavní nav v `display-md` (28px), tap targets 56px.
- Quick actions footer: telefon, email jako velké buttony.

#### `Footer`

- Background `--strk-ink`, text `--strk-paper`.
- 3 sloupce desktop, accordion mobile.
- Padding-top 96, padding-bottom 32.
- Spodní lišta s copyright + legal links: padding-top 32, border-top `border-on-ink`.

### 3.3 Section komponenty (`src/components/sections/`)

Každá section komponenta = 1 sekce stránky podle SITEMAP.md. Příklady:

- `HeroHomepage` — fullscreen hero s videem (jen pro `/`).
- `HeroPage` — generic page header, props: `title`, `subtitle`, `breadcrumbs`, `image?`.
- `Manifesto` — 50/50 split text + image.
- `ServiceShowcase` — horizontal scrolling grid kartiček.
- `FeaturedReference` — 60/40 split case study spotlight.
- `ReferenceGrid` — masonry grid s filterem.
- `LogoStrip` — clients logos.
- `KPI` — 3-4 čísla v řadě s velkou typografií.
- `Timeline` — historické milestones.
- `TeamGrid` — portréty týmu.
- `BenefitsGrid` — 6 ikona+nadpis+text bloků.
- `VacancyList` — list otevřených pozic.
- `ContactSplit` — 50/50 kontakt info + formulář.
- `MapEmbed` — interaktivní mapa.
- `CTABand` — tmavý CTA blok s 2 buttony.
- `NewsletterInline` — email input + GDPR.

Každá section komponenta dostává props pro obsah, není hardcoded data.

---

## 4. Motion — animace

**Knihovna:** Framer Motion 11. Žádné Lottie, žádné GSAP.

### 4.1 Globální principy

- **Přirozenost přes spectacle.** Animace existují, aby vedly oko, ne aby uchvátily.
- **Rychlost:** většina animací 200–400ms. Page transitions max 500ms.
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (Wouter's easing — sharp out, soft in) jako default. Pro mikro-interakce `cubic-bezier(0.4, 0, 0.2, 1)` (material standard).
- **Žádné bouncy easings** (spring s vysokým bounce).
- **Reduced motion:** všechny animace respect `prefers-reduced-motion: reduce` — pokud uživatel žádá redukci, animace se zkrátí na 50ms a vypustí transform efekty.

### 4.2 Konkrétní vzory

#### Reveal on scroll
- Komponenta `<Reveal>` ve `src/components/motion/Reveal.tsx`.
- Použití: H2, lead odstavce, image cards, KPI čísla.
- Transform: `translateY(24px) → 0`, `opacity: 0 → 1`.
- Duration: 600ms, easing default.
- Stagger: pokud je více Reveal v containeru s `<Reveal.Group>`, každý další +100ms delay.
- Trigger: jakmile je 20% prvku viditelné v viewportu.
- Animation runs **once** (no replay on scroll back).

#### Hero text mask reveal
- Jen pro hero H1 na homepage.
- Slovo po slovu (split text), `clipPath: inset(100% 0 0 0)` → `inset(0 0 0 0)`.
- Stagger 60ms mezi slovy.
- Duration per word: 700ms.

#### Image hover lift (showcase cards)
- Idle: image scale 1.
- Hover: image scale 1.04 + translateY -4px na celé kartě.
- Duration 300ms.

#### Magnetic CTAs (jen primary buttons na hero)
- Implementace ve `src/components/motion/Magnetic.tsx`.
- Tlačítko sleduje kurzor v poloměru 100px s tlumícím efektem.
- Vypnuto na touch devices.

#### Page transitions
- Použít View Transitions API přes `next/navigation` (Next 15).
- Default: cross-fade 250ms.
- Speciální transition: na detail reference click → hero image se „rozprostře" (FLIP animation).

#### Marquee fotek (homepage Reel)
- CSS `@keyframes marquee` — `translate3d(0, 0, 0) → translate3d(-50%, 0, 0)`, 60s linear infinite.
- Pause on hover.
- Render content 2× za sebou pro seamless loop.

### 4.3 Co animovat NEsmíme

- Logo (žádné rotace, glitch efekty).
- Body text (kromě reveal on scroll).
- Cena / čísla počítané kalkulačkou.
- Toasty (jen jednoduchý slide-in z dolního rohu).
- Loading spinners — jeden globální (rotující ring) pro celý web.

---

## 5. Accessibility

**Cíl:** WCAG 2.1 AA pro všechno, AAA pro kontrast.

### 5.1 Klávesnice

- Každý interaktivní prvek dostupný přes Tab.
- Tab order = vizuální order (žádné `tabindex="1"` triky).
- Focus visible: 2px outline `--strk-azure` + 2px offset, ne `outline: none` bez náhrady.
- Skip link „Přeskočit na obsah" jako první focusable, viditelný jen na focus.
- Modaly trap focus (Radix to dělá automaticky).
- Mega menu navigace: ↑↓ mezi sekcemi, ←→ mezi sloupci, Esc zavře.

### 5.2 Screen readers

- Sémantický HTML (`<header>`, `<main>`, `<nav>`, `<article>`, `<section>` s `aria-labelledby`).
- Obrázky: `alt` text vždy popisný. Dekorativní obrázky `alt=""` + `aria-hidden="true"`.
- Ikony bez textu: `aria-label`.
- Formuláře: `<label>` pro každý input (ne placeholder jako label), `aria-describedby` pro hints, `aria-invalid` při validační chybě.
- Loading stavy: `aria-busy="true"` + `aria-live="polite"` pro updates.
- Toasts: `role="status"` (info) nebo `role="alert"` (error).

### 5.3 Kontrast

- Body text na pozadí: min 7:1 (AAA).
- UI controls (buttons, inputs): min 3:1.
- Decorative borders: žádný požadavek, ale doporučeno 2:1.

### 5.4 Pohyb a videa

- Hero video: vždy muted, autoplay povolen, `playsinline`, dostupný „Pause" button v rohu.
- Při `prefers-reduced-motion: reduce`: video se nahradí static frame (poster).
- Žádný auto-scrolling carousel.
- Marquee: pause on hover + pause on focus.

### 5.5 Forms

- Errors specifické a konkrétní.
- Required fields označené hvězdičkou *  + `aria-required="true"`.
- Submit button disabled jen během loadingu, ne kvůli validaci (validuje se on blur, error inline).

---

## 6. Theming

Jen **light theme**. Dark mode není v scope této verze.

Důvod: B2B web s vysokým kontrastem žádá konzistentní brand vystoupení. Dark mode by zdvojnásobil QA práci a nepřinesl business value pro 90 % návštěvníků (B2B traffic v pracovních hodinách v kanceláři).

Pokud klient později požádá o dark mode, tokenization je už připravená (CSS custom properties), je to ~3 dny práce.

---

## 7. Density / Komfort

Web je **comfortable density** — generózní whitespace, velká typografie. Ne kompaktní, ne data-dense. Žádné tabulky s 20 řádky, žádné dashboardy.

Jediné místo s vyšší hustotou: `tech specs` tabulka v detailu služby a v detailu reference. Tam je density `compact`, mono font, řádky 32px.

---

## 8. Loading & Error states

### Loading
- **Initial page load:** žádný spinner — Next.js 15 streaming + Suspense pro async sekce. Nahoře navbar a hero render hned, sekce hluboko ve stránce mají skeleton placeholder.
- **Skeleton design:** šedá `--strk-clean-gray` pulzující 1.5s, žádné shimmer animace.
- **In-page actions** (form submit, filter change): button loading state + optimistic UI kde to dává smysl.

### Error
- **Network error:** toast vpravo dole „Nepodařilo se načíst data. Zkuste to prosím znovu." + button „Zkusit znovu".
- **404:** custom stránka (viz SITEMAP.md).
- **500:** custom stránka v `app/[locale]/error.tsx` se stejným feel jako 404.
- **Form validation:** inline error pod inputem v `--strk-error`, celkový summary nad formem při submit attempt s erroramy.

---

## 9. Konkrétní implementační detaily

### `next/font` setup

```ts
// src/app/fonts.ts
import localFont from 'next/font/local';

export const sohne = localFont({
  src: [
    { path: '../../public/fonts/sohne-buch.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/sohne-halbfett.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-sohne',
  display: 'swap',
});

export const jetbrains = localFont({
  src: '../../public/fonts/jetbrains-mono.woff2',
  variable: '--font-mono',
  display: 'swap',
});
```

### Tailwind 4 config

```css
/* src/styles/tokens.css */
@import "tailwindcss";

@theme {
  --color-ink: #071924;
  --color-paper: #ffffff;
  --color-mist: #fafafa;
  --color-azure: #5bc4f1;
  --color-azure-deep: #1f8fbf;
  --color-azure-faint: #e8f6fd;
  --color-graphite: #2a3540;
  --color-steel: #575756;
  --color-fog: #a8a8a7;
  --color-cloud: #e5e5e4;
  --color-clean-gray: #f2f2f2;

  --font-sans: var(--font-sohne);
  --font-mono: var(--font-mono);

  --radius-default: 0;
  --radius-pill: 2px;

  --container-default: 1440px;
  --container-narrow: 960px;
  --container-wide: 1680px;

  --ease-snap: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Naming convention

- Komponenty: PascalCase (`Button.tsx`, `HeroHomepage.tsx`).
- Hooks: camelCase s `use` prefix (`useScrollDirection`).
- Utility funkce: camelCase (`formatDate`).
- Tailwind layers: `@layer base | components | utilities` v `globals.css`.
- CSS custom props: `--strk-*` prefix pro brand tokens, `--ui-*` pro UI utility (např. `--ui-radius-default`).

### File-per-export

Každá komponenta v samostatném souboru. Žádné `index.tsx` re-exporty mimo úroveň directory (např. `src/components/primitives/index.ts` je OK pro DX, ale interně každý komponent v `Button.tsx`).
