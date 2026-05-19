import { supabase } from './supabase';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  perex: string;
  content_md: string;
  published_at: string;
  category: string;
}

/**
 * Returns all published blog posts ordered by most recent first.
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching ALL posts from Supabase:', error.message);
    return [];
  }

  return (data as BlogPost[]) || [];
}

/**
 * Returns a specific post by its slug.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching post [${slug}] from Supabase:`, error.message);
    return null;
  }

  return data as BlogPost;
}

/**
 * Returns the latest N posts for the homepage or sidebar.
 */
export async function getLatestPosts(limit: number = 3): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching LATEST posts from Supabase:', error.message);
    return [];
  }

  return (data as BlogPost[]) || [];
}
