import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { HeroPage, ServiceShowcase, ServiceProcess, CTABand } from '@/components/sections';
import { JsonLd, breadcrumbSchema } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/site';
import { SERVICE_SEGMENTS } from '@/content/services';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Services' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/sluzby',
    locale,
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Služby', url: `${SITE_URL}/${locale}/sluzby` },
        ])}
      />
      <ServicesHero />
      <ServicesShowcase />
      <ServicesProcess />
      <ServicesCta />
    </>
  );
}

function ServicesHero() {
  const t = useTranslations('Services.hero');
  const nav = useTranslations('Navigation');
  return (
    <HeroPage
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      breadcrumbs={[{ label: nav('services') }]}
    />
  );
}

function ServicesShowcase() {
  const tSeg = useTranslations('ServiceSegments');
  return (
    <ServiceShowcase
      title=""
      cards={SERVICE_SEGMENTS.map((slug) => ({
        href: `/sluzby/${slug}`,
        tag: tSeg(`${slug}.tag`),
        title: tSeg(`${slug}.title`),
        perex: tSeg(`${slug}.perex`),
        imageLabel: tSeg(`${slug}.imageLabel`),
      }))}
    />
  );
}

const STEPS = ['consultation', 'design', 'production', 'installation', 'service'] as const;

function ServicesProcess() {
  const t = useTranslations('Services.process');
  const ts = useTranslations('Services.process.steps');
  return (
    <ServiceProcess
      eyebrow={t('eyebrow')}
      title={t('title')}
      steps={STEPS.map((s) => ({
        title: ts(`${s}.title`),
        description: ts(`${s}.description`),
      }))}
    />
  );
}

function ServicesCta() {
  const t = useTranslations('Services.cta');
  return (
    <CTABand
      title={t('title')}
      body={t('body')}
      primary={{ label: t('primary'), href: '/poptavka' }}
    />
  );
}
