import 'server-only';

import { createServerClient } from './server';
import { hasSupabaseEnv } from './env';
import type {
  Post,
  ReferenceProject,
  Vacancy,
} from './types';

type Locale = 'cs' | 'en' | 'de';

export async function getPublishedPosts(
  locale: Locale,
  options: { limit?: number; category?: string } = {},
): Promise<Post[]> {
  if (!hasSupabaseEnv()) return [];

  const supabase = await createServerClient();
  let query = supabase
    .from('posts')
    .select('*')
    .eq('locale', locale)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false });

  if (options.category) query = query.eq('category', options.category);
  if (options.limit) query = query.limit(options.limit);

  const { data, error } = await query;
  if (error) {
    console.error('getPublishedPosts failed', error);
    return [];
  }
  return (data ?? []) as Post[];
}

export async function getPostBySlug(
  locale: Locale,
  slug: string,
): Promise<Post | null> {
  if (!hasSupabaseEnv()) return null;
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('locale', locale)
    .eq('slug', slug)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .maybeSingle();
  if (error) {
    console.error('getPostBySlug failed', error);
    return null;
  }
  return (data as Post | null) ?? null;
}

export async function getPublishedReferences(
  locale: Locale,
  options: {
    limit?: number;
    industry?: string;
    segment?: string;
    featured?: boolean;
  } = {},
): Promise<ReferenceProject[]> {
  if (!hasSupabaseEnv()) return [];
  const supabase = await createServerClient();
  let query = supabase
    .from('reference_projects')
    .select('*')
    .eq('locale', locale)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('year', { ascending: false });

  if (options.industry) query = query.eq('industry', options.industry);
  if (options.segment) query = query.eq('segment', options.segment);
  if (options.featured) query = query.eq('featured', true);
  if (options.limit) query = query.limit(options.limit);

  const { data, error } = await query;
  if (error) {
    console.error('getPublishedReferences failed', error);
    return [];
  }
  return (data ?? []) as ReferenceProject[];
}

export async function getReferenceBySlug(
  locale: Locale,
  slug: string,
): Promise<ReferenceProject | null> {
  if (!hasSupabaseEnv()) return null;
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('reference_projects')
    .select('*')
    .eq('locale', locale)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  if (error) {
    console.error('getReferenceBySlug failed', error);
    return null;
  }
  return (data as ReferenceProject | null) ?? null;
}

export async function getOpenVacancies(locale: Locale): Promise<Vacancy[]> {
  if (!hasSupabaseEnv()) return [];
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('vacancies')
    .select('*')
    .eq('locale', locale)
    .eq('status', 'open')
    .order('published_at', { ascending: false });
  if (error) {
    console.error('getOpenVacancies failed', error);
    return [];
  }
  return (data ?? []) as Vacancy[];
}

export async function getVacancyBySlug(
  locale: Locale,
  slug: string,
): Promise<Vacancy | null> {
  if (!hasSupabaseEnv()) return null;
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('vacancies')
    .select('*')
    .eq('locale', locale)
    .eq('slug', slug)
    .eq('status', 'open')
    .maybeSingle();
  if (error) {
    console.error('getVacancyBySlug failed', error);
    return null;
  }
  return (data as Vacancy | null) ?? null;
}
