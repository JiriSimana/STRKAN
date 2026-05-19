import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';

export default function HomePage() {
  const t = useTranslations('Meta');

  return (
    <main>
      <Container>
        <p className="py-24 text-sm text-fog">
          {t('siteName')} — scaffold v2 (no homepage content yet)
        </p>
      </Container>
    </main>
  );
}
