import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { createMetadata } from '@/lib/seo/metadata';
import { Configurator } from './Configurator';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Configurator' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/poptavka',
    locale,
    noindex: true,
  });
}

export default async function PoptavkaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Configurator />;
}
