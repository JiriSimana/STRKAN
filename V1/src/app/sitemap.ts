import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

// Helper to get dynamic blog slugs for sitemap
async function getBlogSlugs() {
  try {
    const { data } = await supabase
      .from('posts')
      .select('slug, updated_at')
      .order('published_at', { ascending: false });
    
    return data || [];
  } catch (error) {
    console.error('Sitemap Error fetching posts:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://strkan.cz';

  // Common static routes
  const routes = [
    '',
    '/o-nas',
    '/zarizeni-pro-vyrobu-a-servis-dopravni-techniky',
    '/novinky',
    '/kariera',
    '/kontakt',
  ];

  // Specific product category routes
  const productRoutes = [
    '/zarizeni-pro-vyrobu-a-servis-dopravni-techniky/dopravni-technika',
    '/zarizeni-pro-vyrobu-a-servis-dopravni-techniky/prumyslova-automatizace',
    '/zarizeni-pro-vyrobu-a-servis-dopravni-techniky/svarovane-konstrukce',
    '/zarizeni-pro-vyrobu-a-servis-dopravni-techniky/deskova-polohovadla',
  ];

  // Map static routes
  const sitemapRoutes: MetadataRoute.Sitemap = [...routes, ...productRoutes].map((route) => ({
    url: `${baseUrl}/cs${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/novinky' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Map dynamic blog posts (if Supabase is configured)
  const posts = await getBlogSlugs();
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/cs/novinky/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...sitemapRoutes, ...postRoutes];
}
