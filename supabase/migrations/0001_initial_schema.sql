-- STRKAN web v2 — initial schema
-- Mirrors FEATURES.md §1.1. RLS policies expose published content to the
-- anon role only; inserts (applications, inquiries, newsletter) go through
-- Server Actions using the service role key.

create extension if not exists pgcrypto;

-- =========================================================================
-- posts (news / blog)
-- =========================================================================
create table posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null,
  locale        text not null check (locale in ('cs', 'en', 'de')),
  title         text not null,
  perex         text not null,
  content_mdx   text not null,
  category      text not null,
  cover_url     text,
  cover_alt     text,
  author_name   text,
  reading_time  int,
  published_at  timestamptz,
  status        text not null default 'draft'
                check (status in ('draft', 'published', 'archived')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (slug, locale)
);

create index posts_published_idx
  on posts (published_at desc)
  where status = 'published';
create index posts_locale_idx on posts (locale);
create index posts_category_idx on posts (category);

-- =========================================================================
-- reference_projects (case studies)
-- =========================================================================
create table reference_projects (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null,
  locale          text not null check (locale in ('cs', 'en', 'de')),
  client_name     text,
  client_visible  boolean not null default true,
  industry        text not null,
  segment         text not null,
  year            int not null,
  location        text,
  duration_months int,
  title           text not null,
  hero_url        text not null,
  challenge_md    text not null,
  solution_md     text not null,
  results         jsonb not null default '[]'::jsonb,
  client_quote    text,
  client_quote_by text,
  gallery         jsonb not null default '[]'::jsonb,
  status          text not null default 'draft'
                  check (status in ('draft', 'published', 'archived')),
  featured        boolean not null default false,
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (slug, locale)
);

create index reference_projects_published_idx
  on reference_projects (published_at desc)
  where status = 'published';
create index reference_projects_industry_idx on reference_projects (industry);
create index reference_projects_segment_idx on reference_projects (segment);
create index reference_projects_year_idx on reference_projects (year desc);

-- =========================================================================
-- vacancies (open positions)
-- =========================================================================
create table vacancies (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null,
  locale           text not null check (locale in ('cs', 'en', 'de')),
  title            text not null,
  location         text not null,
  employment_type  text not null
                   check (employment_type in ('full_time', 'part_time', 'contract')),
  perex            text not null,
  description_md   text not null,
  responsibilities jsonb not null default '[]'::jsonb,
  requirements     jsonb not null default '[]'::jsonb,
  benefits         jsonb not null default '[]'::jsonb,
  salary_range     text,
  status           text not null default 'open'
                   check (status in ('open', 'closed')),
  published_at     timestamptz,
  closes_at        timestamptz,
  created_at       timestamptz not null default now(),
  unique (slug, locale)
);

create index vacancies_open_idx on vacancies (published_at desc) where status = 'open';

-- =========================================================================
-- applications (job applications) — write-only for anon
-- =========================================================================
create table applications (
  id           uuid primary key default gen_random_uuid(),
  vacancy_id   uuid references vacancies (id) on delete set null,
  full_name    text not null,
  email        text not null,
  phone        text,
  cv_url       text not null,
  linkedin_url text,
  motivation   text,
  consent_gdpr boolean not null,
  status       text not null default 'new'
               check (status in ('new', 'reviewing', 'rejected', 'hired')),
  created_at   timestamptz not null default now()
);

-- =========================================================================
-- inquiries (quote configurator submissions) — write-only for anon
-- =========================================================================
create sequence if not exists inquiry_year_seq;

create table inquiries (
  id             uuid primary key default gen_random_uuid(),
  reference_code text unique not null,
  segment        text not null,
  parameters     jsonb not null default '{}'::jsonb,
  timeline       text not null,
  contact        jsonb not null,
  attachments    jsonb not null default '[]'::jsonb,
  consent_gdpr   boolean not null,
  source_url     text,
  utm            jsonb,
  status         text not null default 'new'
                 check (status in ('new', 'reviewing', 'won', 'lost')),
  created_at     timestamptz not null default now()
);

-- =========================================================================
-- newsletter subscribers — write-only for anon, double-opt-in
-- =========================================================================
create table newsletter_subscribers (
  id            uuid primary key default gen_random_uuid(),
  email         text unique not null,
  locale        text not null check (locale in ('cs', 'en', 'de')),
  confirmed_at  timestamptz,
  confirm_token text,
  created_at    timestamptz not null default now()
);

-- =========================================================================
-- media — central index of public Storage assets with alt text and LQIP
-- =========================================================================
create table media (
  id            uuid primary key default gen_random_uuid(),
  storage_path  text unique not null,
  alt_cs        text,
  alt_en        text,
  alt_de        text,
  width         int,
  height        int,
  blur_data     text,
  uploaded_at   timestamptz not null default now()
);

-- =========================================================================
-- Row-Level Security
-- =========================================================================
alter table posts enable row level security;
alter table reference_projects enable row level security;
alter table vacancies enable row level security;
alter table applications enable row level security;
alter table inquiries enable row level security;
alter table newsletter_subscribers enable row level security;
alter table media enable row level security;

-- Public read: posts (published only)
create policy "anon read published posts" on posts for select to anon
  using (status = 'published' and published_at is not null and published_at <= now());

-- Public read: reference_projects (published only)
create policy "anon read published references" on reference_projects for select to anon
  using (status = 'published' and published_at is not null and published_at <= now());

-- Public read: vacancies (open only)
create policy "anon read open vacancies" on vacancies for select to anon
  using (status = 'open' and (closes_at is null or closes_at > now()));

-- Public read: media (all entries — they're already in a public bucket)
create policy "anon read media" on media for select to anon using (true);

-- Public write-only: applications, inquiries, newsletter_subscribers
create policy "anon insert applications" on applications for insert to anon
  with check (true);
create policy "anon insert inquiries" on inquiries for insert to anon
  with check (true);
create policy "anon insert newsletter" on newsletter_subscribers for insert to anon
  with check (true);
