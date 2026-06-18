'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { Button } from '@/components/primitives/Button';
import { Eyebrow } from '@/components/primitives/Eyebrow';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  const t = useTranslations('Errors.internal');

  useEffect(() => {
    console.error('App error boundary caught', error);
    // TODO(observability): forward to Sentry once configured (FEATURES.md §11)
  }, [error]);

  return (
    <section className="min-h-[80vh] flex items-center bg-ink text-paper">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="block type-display-2xl text-azure">500</span>
          <Eyebrow variant="azure" className="mt-8 block">
            {t('eyebrow')}
          </Eyebrow>
          <h1 className="mt-5 type-display-lg text-paper">{t('title')}</h1>
          <p className="mt-6 type-body-lg text-paper/70 max-w-xl mx-auto">
            {t('body')}
          </p>
          {error.digest && (
            <p className="mt-4 type-mono text-paper/40">ref: {error.digest}</p>
          )}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button onClick={() => reset()} variant="primary">
              {t('retry')}
            </Button>
            <Button asChild variant="outline-light">
              <Link href="/">{t('home')}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
