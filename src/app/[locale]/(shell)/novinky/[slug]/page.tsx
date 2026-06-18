import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { Tag } from '@/components/primitives/Tag';
import { Breadcrumbs, CTABand } from '@/components/sections';
import { PlaceholderImage } from '@/components/PlaceholderImage';
import { JsonLd, breadcrumbSchema, articleSchema } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/site';
import { getPostBySlug } from '@/lib/supabase/queries';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale as 'cs' | 'en' | 'de', slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.perex,
    path: `/novinky/${slug}`,
    locale,
    image: post.cover_url ?? undefined,
    type: 'article',
  });
}

export default async function PostDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(locale as 'cs' | 'en' | 'de', slug);
  if (!post) notFound();

  const publishedAt = post.published_at ?? post.created_at;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Novinky', url: `${SITE_URL}/${locale}/novinky` },
          { name: post.title, url: `${SITE_URL}/${locale}/novinky/${slug}` },
        ])}
      />
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.perex,
          image: post.cover_url ?? `${SITE_URL}/og-default.jpg`,
          datePublished: publishedAt,
          dateModified: post.updated_at,
          author: post.author_name ?? 'STRKAN s.r.o.',
          slug,
          locale,
        })}
      />

      <DetailHero post={post} formattedDate={formatDate(publishedAt, locale)} />
      <article className="py-16 lg:py-24 bg-paper">
        <Container size="narrow">
          <div className="prose prose-lg max-w-none type-body-lg text-steel whitespace-pre-line">
            {post.content_mdx}
            {/* TODO(content): once posts are real, render content_mdx via @next/mdx or next-mdx-remote with the brand prose styles */}
          </div>
        </Container>
      </article>
      <CTABand
        title="Máte projekt v podobném segmentu?"
        body="Pojďte si o něm popovídat — krátký hovor stačí na první kalkulaci."
        primary={{ label: 'Získat nabídku', href: '/poptavka' }}
      />
    </>
  );
}

function DetailHero({
  post,
  formattedDate,
}: {
  post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>;
  formattedDate: string;
}) {
  const nav = useTranslations('Navigation');
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-paper">
      <Container size="narrow">
        <Breadcrumbs
          items={[
            { label: nav('news'), href: '/novinky' },
            { label: post.title },
          ]}
          className="mb-10"
        />
        <Tag variant="outline" className="mb-6">
          {post.category}
        </Tag>
        <h1 className="type-display-xl text-ink">{post.title}</h1>
        <p className="mt-6 type-body-lg text-steel">{post.perex}</p>
        <p className="mt-8 type-eyebrow text-fog">
          {formattedDate}
          {post.author_name && ` · ${post.author_name}`}
          {post.reading_time ? ` · ${post.reading_time} min` : null}
        </p>
      </Container>

      {post.cover_url ? (
        <div className="mt-16 max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover_url}
            alt={post.cover_alt ?? ''}
            className="block aspect-[16/9] w-full object-cover"
          />
        </div>
      ) : (
        <div className="mt-16 max-w-[1440px] mx-auto px-6 lg:px-12">
          <PlaceholderImage aspect="16/9" label={`Hero — ${post.title}`} />
        </div>
      )}
    </section>
  );
}
