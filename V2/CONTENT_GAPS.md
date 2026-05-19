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

(empty — added when first real page lands)
