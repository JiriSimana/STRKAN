import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { HeroPage, ReferenceGrid, ReferenceFilters, CTABand } from '@/components/sections';
import { JsonLd, breadcrumbSchema } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/site';
import { getPublishedReferences } from '@/lib/supabase/queries';
import { SERVICE_SEGMENTS } from '@/content/services';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ segment?: string; industry?: string; year?: string }>;
};

const INDUSTRIES = ['automotive', 'heavy', 'energy', 'general'] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'References' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/reference',
    locale,
  });
}

export default async function ReferencesPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  const references = await getPublishedReferences(locale as 'cs' | 'en' | 'de', {
    segment: sp.segment,
    industry: sp.industry,
  });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Reference', url: `${SITE_URL}/${locale}/reference` },
        ])}
      />
      <ReferencesHero />
      <ReferencesBody references={references} />
      <ReferencesCta />
    </>
  );
}

function ReferencesHero() {
  const t = useTranslations('References.hero');
  const nav = useTranslations('Navigation');
  return (
    <HeroPage
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      breadcrumbs={[{ label: nav('references') }]}
    />
  );
}

function ReferencesBody({
  references,
}: {
  references: Awaited<ReturnType<typeof getPublishedReferences>>;
}) {
  const tSeg = useTranslations('ServiceSegments');
  const t = useTranslations('References');
  const tInd = useTranslations('References.industries');

  return (
    <section className="pt-8 pb-24 lg:pb-32 bg-paper">
      <Container>
        <ReferenceFilters
          groups={[
            {
              name: t('filterLabels.segment'),
              param: 'segment',
              options: SERVICE_SEGMENTS.map((s) => ({
                value: s,
                label: tSeg(`${s}.tag`),
              })),
            },
            {
              name: t('filterLabels.industry'),
              param: 'industry',
              options: INDUSTRIES.map((i) => ({
                value: i,
                label: tInd(i),
              })),
            },
          ]}
        />
        <ReferenceGrid
          references={references}
          emptyMessage={t('empty')}
        />
      </Container>
    </section>
  );
}

function ReferencesCta() {
  const t = useTranslations('References.cta');
  return (
    <CTABand
      title={t('title')}
      body={t('body')}
      primary={{ label: t('primary'), href: '/poptavka' }}
    />
  );
}
