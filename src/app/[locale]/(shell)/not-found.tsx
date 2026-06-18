import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { Button } from '@/components/primitives/Button';
import { Eyebrow } from '@/components/primitives/Eyebrow';

export default function NotFound() {
  const t = useTranslations('Errors.notFound');
  return (
    <section className="min-h-[80vh] flex items-center bg-ink text-paper">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="block type-display-2xl text-azure">404</span>
          <Eyebrow variant="azure" className="mt-8 block">
            {t('eyebrow')}
          </Eyebrow>
          <h1 className="mt-5 type-display-lg text-paper">{t('title')}</h1>
          <p className="mt-6 type-body-lg text-paper/70 max-w-xl mx-auto">
            {t('body')}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="primary">
              <Link href="/">{t('home')}</Link>
            </Button>
            <Button asChild variant="outline-light">
              <Link href="/sluzby">{t('services')}</Link>
            </Button>
            <Button asChild variant="outline-light">
              <Link href="/reference">{t('references')}</Link>
            </Button>
            <Button asChild variant="outline-light">
              <Link href="/kontakt">{t('contact')}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
