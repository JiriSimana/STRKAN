import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/seo/site';

const STATIC_PATHS: { path: string; priority: number; frequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1.0, frequency: 'weekly' },
  { path: '/o-nas', priority: 0.8, frequency: 'monthly' },
  { path: '/sluzby', priority: 0.9, frequency: 'monthly' },
  { path: '/sluzby/dopravni-technika', priority: 0.8, frequency: 'monthly' },
  { path: '/sluzby/svarovane-konstrukce', priority: 0.8, frequency: 'monthly' },
  { path: '/sluzby/prumyslova-automatizace', priority: 0.8, frequency: 'monthly' },
  { path: '/sluzby/ostatni-produkty-a-sluzby', priority: 0.8, frequency: 'monthly' },
  { path: '/reference', priority: 0.9, frequency: 'weekly' },
  { path: '/novinky', priority: 0.7, frequency: 'weekly' },
  { path: '/kariera', priority: 0.7, frequency: 'weekly' },
  { path: '/kontakt', priority: 0.7, frequency: 'monthly' },
  { path: '/poptavka', priority: 0.9, frequency: 'monthly' },
  { path: '/pravni/zasady-ochrany-osobnich-udaju', priority: 0.3, frequency: 'yearly' },
  { path: '/pravni/cookies', priority: 0.3, frequency: 'yearly' },
  { path: '/pravni/vop', priority: 0.3, frequency: 'yearly' },
];

function abs(locale: string, path: string) {
  return `${SITE_URL}/${locale}${path === '/' ? '' : path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return STATIC_PATHS.flatMap(({ path, priority, frequency }) =>
    routing.locales.map((locale) => ({
      url: abs(locale, path),
      lastModified: now,
      changeFrequency: frequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => [loc, abs(loc, path)]),
        ),
      },
    })),
  );
  // TODO(supabase): once CMS is wired, append dynamic entries for posts,
  // references, vacancies. See FEATURES.md §3.3 + §4.3.
}
