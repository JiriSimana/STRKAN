import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // TODO: Replace with the actual production domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://strkan.cz';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
