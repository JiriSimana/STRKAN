# STRKAN s.r.o. — Corporate Website

## Phase 1: Project Setup
- [ ] Scaffold Next.js 14 (App Router) with TypeScript + Tailwind CSS
- [ ] Install dependencies (Supabase client, markdown rendering, schema.org)
- [ ] Configure Tailwind theme (colors, fonts, breakpoints)
- [ ] Set up project structure (`src/`, i18n-ready layout)
- [ ] Configure Supabase client ([lib/supabase.ts](file:///Users/jirisimana/Desktop/Webov%C3%A9%20str%C3%A1nky%20-%20kodov%C3%A1n%C3%AD/STRKAN_redesing/src/lib/supabase.ts))

## Phase 2: Design System & Shared Components
- [ ] Global CSS / design tokens (Metropolis font, strict brand colors)
- [ ] `Navbar` — flat nav, sky-blue #5bc4f1 hover, two logo variants (color on light, inverse on dark), no border radius, CS|EN|DE switcher
- [ ] `Footer` — contact info, links, VOP PDF link
- [ ] `Breadcrumbs` component + schema.org BreadcrumbList
- [ ] Reusable UI: `Button` (sharp corners, flat UI), `Card`, `SectionHeading`, `Container`

## Phase 3: Pages
- [ ] `/` — Homepage (Hero without video bg, Video Action section with autoplay, 4 segment cards, Specializace, Novinky, Certifikace, Masonry Fotogalerie, CTA)
- [ ] `/o-nas` — About page
- [ ] `/zarizeni-pro-vyrobu-a-servis-dopravni-techniky` — Products overview + subpages
- [ ] `/novinky` — Blog listing (SSG + ISR from Supabase)
- [ ] `/novinky/[slug]` — Blog detail page
- [ ] `/kontakt` — Contact page + segmented form
- [ ] `/kariera` — Careers page

## Phase 4: SEO & Structured Data
- [ ] Per-page `metadata` exports (title, description, OG tags)
- [ ] schema.org `Organization` (layout level)
- [ ] schema.org `Product`, `Article`, `BreadcrumbList` on relevant pages
- [ ] `robots.ts` + `sitemap.ts`

## Phase 5: Blog / Novinky CMS
- [ ] Supabase table schema (id, slug, title, perex, content_md, published_at, category)
- [ ] ISR with `revalidate` for listing + detail
- [ ] Markdown rendering (content_md → HTML)

## Phase 6: Contact Form
- [ ] Form UI with segment selection (oblast zájmu)
- [ ] Server action / API route → Supabase Edge Function / Resend

## Phase 7: Final Polish
- [ ] WCAG 2.1 AA audit (alt texts, contrast, focus management)
- [ ] Performance: next/image everywhere, font optimization, lazy loading
- [ ] i18n subpath routing (next-intl middleware, `[locale]` segment, CS/EN/DE messages)
- [ ] `LanguageSwitcher` component (CS | EN | DE) in Navbar
- [ ] VOP PDF link from Supabase Storage

## Phase 8: Verification
- [ ] `next build` succeeds without errors
- [ ] Visual check of all pages in browser
- [ ] Lighthouse audit (Performance, SEO, Accessibility)
