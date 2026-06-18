import { SITE_NAME, SITE_URL } from './site';

type WithContext<T> = T & { '@context': 'https://schema.org' };

export const organizationSchema: WithContext<Record<string, unknown>> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo-color.svg`,
  foundingDate: '1993',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Plzeň',
    addressCountry: 'CZ',
  },
  // TODO(content): real contactPoint (phone, email), real address street + zip, sameAs (LinkedIn)
};

export const websiteSchema: WithContext<Record<string, unknown>> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ['cs', 'en', 'de'],
};

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  } as const;
}

export function articleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
  slug,
  locale,
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  slug: string;
  locale: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { '@type': 'Person', name: author },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/brand/logo-color.svg`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/${locale}/novinky/${slug}`,
  } as const;
}

export function serviceSchema({
  name,
  description,
  slug,
  locale,
}: {
  name: string;
  description: string;
  slug: string;
  locale: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    areaServed: { '@type': 'Country', name: 'Czech Republic' },
    url: `${SITE_URL}/${locale}/sluzby/${slug}`,
  } as const;
}

export function projectSchema({
  name,
  description,
  image,
  dateCreated,
  slug,
  locale,
}: {
  name: string;
  description: string;
  image: string;
  dateCreated: string;
  slug: string;
  locale: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    image,
    dateCreated,
    creator: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    url: `${SITE_URL}/${locale}/reference/${slug}`,
  } as const;
}

export function jobPostingSchema({
  title,
  description,
  location,
  employmentType,
  datePosted,
  validThrough,
  slug,
  locale,
}: {
  title: string;
  description: string;
  location: string;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR';
  datePosted: string;
  validThrough?: string;
  slug: string;
  locale: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title,
    description,
    hiringOrganization: {
      '@type': 'Organization',
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: location,
        addressCountry: 'CZ',
      },
    },
    employmentType,
    datePosted,
    validThrough,
    url: `${SITE_URL}/${locale}/kariera/${slug}`,
  } as const;
}

type JsonLdProps = {
  data: unknown;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
