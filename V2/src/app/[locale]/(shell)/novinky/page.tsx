import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { HeroPage, PostsGrid, NewsletterInline } from '@/components/sections';
import { JsonLd, breadcrumbSchema } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/site';
import { getPublishedPosts } from '@/lib/supabase/queries';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'News' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/novinky',
    locale,
  });
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = await getPublishedPosts(locale as 'cs' | 'en' | 'de');

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Novinky', url: `${SITE_URL}/${locale}/novinky` },
        ])}
      />
      <NewsHero />
      <NewsBody posts={posts} />
      <NewsletterInline />
    </>
  );
}

function NewsHero() {
  const t = useTranslations('News.hero');
  const nav = useTranslations('Navigation');
  return (
    <HeroPage
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      breadcrumbs={[{ label: nav('news') }]}
    />
  );
}

function NewsBody({
  posts,
}: {
  posts: Awaited<ReturnType<typeof getPublishedPosts>>;
}) {
  const t = useTranslations('News');
  return (
    <section className="pb-24 lg:pb-32 bg-paper">
      <Container>
        <PostsGrid posts={posts} featured emptyMessage={t('empty')} />
      </Container>
    </section>
  );
}
