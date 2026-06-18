import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/primitives/Container';
import { HeroPage } from '@/components/sections';
import { JsonLd, breadcrumbSchema } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/site';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Legal.terms' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/pravni/vop',
    locale,
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Legal.terms' });
  const tNav = await getTranslations({ locale, namespace: 'Footer' });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: tNav('terms'), url: `${SITE_URL}/${locale}/pravni/vop` },
        ])}
      />
      <HeroPage
        eyebrow={t('eyebrow')}
        title={t('title')}
        breadcrumbs={[{ label: tNav('terms') }]}
      />
      <article className="py-16 lg:py-24 bg-paper">
        <Container size="narrow">
          <p className="type-body-lg text-steel whitespace-pre-line max-w-prose">
            {t('body')}
          </p>
        </Container>
      </article>
    </>
  );
}
