// Hand-written until `supabase gen types typescript` runs against a real DB.
// Mirror src/../supabase/migrations/0001_initial_schema.sql.

export type Locale = 'cs' | 'en' | 'de';

export type PostStatus = 'draft' | 'published' | 'archived';

export type Post = {
  id: string;
  slug: string;
  locale: Locale;
  title: string;
  perex: string;
  content_mdx: string;
  category: string;
  cover_url: string | null;
  cover_alt: string | null;
  author_name: string | null;
  reading_time: number | null;
  published_at: string | null;
  status: PostStatus;
  created_at: string;
  updated_at: string;
};

export type ReferenceResult = {
  label: string;
  value: string;
  unit?: string;
};

export type GalleryImage = {
  url: string;
  alt: string;
};

export type ReferenceProject = {
  id: string;
  slug: string;
  locale: Locale;
  client_name: string | null;
  client_visible: boolean;
  industry: string;
  segment: string;
  year: number;
  location: string | null;
  duration_months: number | null;
  title: string;
  hero_url: string;
  challenge_md: string;
  solution_md: string;
  results: ReferenceResult[];
  client_quote: string | null;
  client_quote_by: string | null;
  gallery: GalleryImage[];
  status: PostStatus;
  featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type EmploymentType = 'full_time' | 'part_time' | 'contract';

export type Vacancy = {
  id: string;
  slug: string;
  locale: Locale;
  title: string;
  location: string;
  employment_type: EmploymentType;
  perex: string;
  description_md: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  salary_range: string | null;
  status: 'open' | 'closed';
  published_at: string | null;
  closes_at: string | null;
  created_at: string;
};

export type MediaRecord = {
  id: string;
  storage_path: string;
  alt_cs: string | null;
  alt_en: string | null;
  alt_de: string | null;
  width: number | null;
  height: number | null;
  blur_data: string | null;
  uploaded_at: string;
};
