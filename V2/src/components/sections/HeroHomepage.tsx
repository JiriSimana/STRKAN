import { useTranslations } from 'next-intl';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { Button } from '@/components/primitives/Button';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { YouTubeLightbox } from './YouTubeLightbox';

type Props = {
  backgroundImage: string;
  videoId?: string;
  videoLabel?: string;
  videoDuration?: string;
};

export function HeroHomepage({
  backgroundImage,
  videoId,
  videoLabel,
  videoDuration,
}: Props) {
  const t = useTranslations('Home.hero');

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(110deg, rgba(7,25,36,0.85) 0%, rgba(7,25,36,0.6) 45%, rgba(7,25,36,0.15) 100%)',
          }}
        />
      </div>

      <Container className="relative z-10 flex h-full flex-col justify-end pb-16 pt-32 lg:pb-24">
        <div className="max-w-3xl">
          <Eyebrow variant="azure" className="block">
            {t('eyebrow')}
          </Eyebrow>
          <h1 className="mt-6 type-display-2xl text-paper">{t('title')}</h1>
          <p className="mt-8 type-body-lg text-paper/70 max-w-2xl">
            {t('subtitle')}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              asChild
              variant="primary"
              size="lg"
              icon={<ArrowRight className="size-4" />}
              iconPosition="right"
            >
              <Link href="/reference">{t('primaryCta')}</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link href="/poptavka">{t('secondaryCta')}</Link>
            </Button>
            {videoId && (
              <YouTubeLightbox
                videoId={videoId}
                label={videoLabel ?? 'Sledovat firemní video'}
                duration={videoDuration}
              />
            )}
          </div>
        </div>

        <div className="mt-12 flex items-center gap-3 type-eyebrow text-paper/50">
          <ArrowDown className="size-4 animate-bounce" aria-hidden />
          <span>{t('scrollCue')}</span>
        </div>
      </Container>
    </section>
  );
}
