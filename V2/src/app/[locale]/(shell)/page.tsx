import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { TextLink } from '@/components/primitives/TextLink';
import {
  HeroHomepage,
  KPI,
  Manifesto,
  ServiceShowcase,
  Reel,
  LogoStrip,
  PostsGrid,
  CTABand,
} from '@/components/sections';
import { JsonLd } from '@/lib/seo/jsonld';
import { organizationSchema, websiteSchema } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';
import { getPublishedPosts } from '@/lib/supabase/queries';
import { SERVICE_SEGMENTS, type ServiceSegment } from '@/content/services';
import { generalPhoto, generalPhotos } from '@/content/images';

const YOUTUBE_PROMO_ID = 'lQKCzrs65do';

const SEGMENT_HERO_IMAGE: Record<ServiceSegment, string> = {
  'dopravni-technika':
    '/images/services/dopravni-technika/patkove-zvedaky/01.jpg',
  'svarovane-konstrukce': '/images/services/svarovane-konstrukce/01.jpg',
  'prumyslova-automatizace': '/images/services/prumyslova-automatizace/01.jpg',
  'ostatni-produkty-a-sluzby':
    '/images/services/ostatni-produkty-a-sluzby/01.jpg',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/',
    locale,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await getPublishedPosts(locale as 'cs' | 'en' | 'de', {
    limit: 3,
  });

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />

      <HomeHero />
      <HomeKpiBlock />
      <HomeManifesto />
      <HomeServices />
      <HomeReel />
      <HomeLogos />
      <HomeNews posts={posts} />
      <HomeCta />
    </>
  );
}

function HomeHero() {
  const t = useTranslations('Home.hero');
  return (
    <HeroHomepage
      backgroundImage={generalPhoto(1)}
      videoId={YOUTUBE_PROMO_ID}
      videoLabel={t('watchVideo')}
      videoDuration={t('watchVideoDuration')}
    />
  );
}

function HomeReel() {
  const t = useTranslations('Home.reel');
  return (
    <Reel
      eyebrow={t('eyebrow')}
      title={t('title')}
      photos={generalPhotos(3, 14, 27, 38, 49, 60, 72, 83, 95, 106, 118, 130, 142, 154)}
    />
  );
}

function HomeLogos() {
  const t = useTranslations('Home.logos');
  return <LogoStrip eyebrow={t('eyebrow')} title={t('title')} />;
}

function HomeKpiBlock() {
  const t = useTranslations('Home.kpi');
  return (
    <KPI
      stats={[
        { value: '32', unit: 'let', label: t('title1') },
        { value: '1 000+', label: t('title2') },
        { value: '70', unit: '%', label: t('title3') },
      ]}
    />
  );
}

function HomeManifesto() {
  const t = useTranslations('Home.manifesto');
  return (
    <Manifesto
      eyebrow={t('eyebrow')}
      title={t('title')}
      paragraphs={[t('p1'), t('p2')]}
      imageUrl={generalPhoto(7)}
    />
  );
}

function HomeServices() {
  const t = useTranslations('Home.services');
  const tSeg = useTranslations('ServiceSegments');
  return (
    <ServiceShowcase
      eyebrow={t('eyebrow')}
      title={t('title')}
      intro={t('intro')}
      cards={SERVICE_SEGMENTS.map((slug) => ({
        href: `/sluzby/${slug}`,
        tag: tSeg(`${slug}.tag`),
        title: tSeg(`${slug}.title`),
        perex: tSeg(`${slug}.perex`),
        imageUrl: SEGMENT_HERO_IMAGE[slug],
        imageLabel: tSeg(`${slug}.imageLabel`),
      }))}
    />
  );
}

function HomeNews({ posts }: { posts: Awaited<ReturnType<typeof getPublishedPosts>> }) {
  const t = useTranslations('Home.news');
  return (
    <section className="py-24 lg:py-32 bg-paper">
      <Container>
        <div className="flex items-end justify-between gap-8 max-w-3xl mb-16">
          <div>
            <Eyebrow variant="azure" className="block mb-5">
              {t('eyebrow')}
            </Eyebrow>
            <h2 className="type-display-lg text-ink">{t('title')}</h2>
          </div>
          <TextLink href="/novinky" arrow className="hidden md:inline-flex">
            {t('cta')}
          </TextLink>
        </div>
        <PostsGrid posts={posts} featured emptyMessage={t('empty')} />
      </Container>
    </section>
  );
}

function HomeCta() {
  const t = useTranslations('Home.cta');
  return (
    <CTABand
      eyebrow={t('eyebrow')}
      title={t('title')}
      body={t('body')}
      primary={{ label: t('primary'), href: '/poptavka' }}
      secondary={{ label: t('secondary'), href: '/kontakt' }}
    />
  );
}
