import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { OG_LOCALES, SITE_NAME, SITE_URL } from './site';

type Args = {
  title: string;
  description: string;
  path: string;
  locale: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
};

function abs(locale: string, path: string) {
  return `${SITE_URL}/${locale}${path === '/' ? '' : path}`;
}

export function createMetadata({
  title,
  description,
  path,
  locale,
  image,
  type = 'website',
  noindex = false,
}: Args): Metadata {
  const url = abs(locale, path);
  const ogImage =
    image ?? `${SITE_URL}/api/og?title=${encodeURIComponent(title)}`;
  const fullTitle = `${title} — ${SITE_NAME}`;

  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, abs(loc, path)]),
  );
  languages['x-default'] = abs(routing.defaultLocale, path);

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url, languages },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale] ?? OG_LOCALES.cs,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
