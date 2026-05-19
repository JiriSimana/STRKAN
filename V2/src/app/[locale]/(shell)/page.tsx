import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomePageContent />;
}

function HomePageContent() {
  const t = useTranslations('Meta');
  return (
    <Container className="pt-32 pb-24">
      {/* TODO(content): real homepage sections land in feat(pages): marketing */}
      <p className="type-body-sm text-fog">
        {t('siteName')} — scaffold v2 (homepage sections land in the marketing-pages commit)
      </p>
    </Container>
  );
}
