import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { GraduationCap, Wrench, Coffee, Heart, MapPin, Clock } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { HeroPage, BenefitsGrid, VacancyList, CTABand } from '@/components/sections';
import { generalPhoto } from '@/content/images';
import { Reveal } from '@/components/motion/Reveal';
import { JsonLd, breadcrumbSchema } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/site';
import { getOpenVacancies } from '@/lib/supabase/queries';

type Props = {
  params: Promise<{ locale: string }>;
};

const BENEFITS = [
  { icon: GraduationCap, key: 'training' },
  { icon: Wrench, key: 'tools' },
  { icon: Clock, key: 'flex' },
  { icon: Coffee, key: 'culture' },
  { icon: Heart, key: 'health' },
  { icon: MapPin, key: 'parking' },
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Careers' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/kariera',
    locale,
  });
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const vacancies = await getOpenVacancies(locale as 'cs' | 'en' | 'de');

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Kariéra', url: `${SITE_URL}/${locale}/kariera` },
        ])}
      />
      <CareersHero />
      <CareersWhy />
      <CareersBenefits />
      <CareersOpenings vacancies={vacancies} />
      <CareersCta />
    </>
  );
}

function CareersHero() {
  const t = useTranslations('Careers.hero');
  const nav = useTranslations('Navigation');
  return (
    <HeroPage
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      variant="dark"
      breadcrumbs={[{ label: nav('careers') }]}
    />
  );
}

function CareersWhy() {
  const t = useTranslations('Careers.why');
  return (
    <section className="py-24 lg:py-32 bg-paper">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <Reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={generalPhoto(30)}
                alt="Svářeč STRKAN při práci v hale"
                loading="lazy"
                decoding="async"
                className="block aspect-[4/5] w-full object-cover"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <Eyebrow variant="azure" className="block mb-5">
                {t('eyebrow')}
              </Eyebrow>
              <h2 className="type-display-lg text-ink">{t('title')}</h2>
              <p className="mt-6 type-body-lg text-steel">{t('p1')}</p>
              <p className="mt-4 type-body-lg text-steel">{t('p2')}</p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CareersBenefits() {
  const t = useTranslations('Careers.benefits');
  const tb = useTranslations('Careers.benefitItems');
  return (
    <BenefitsGrid
      eyebrow={t('eyebrow')}
      title={t('title')}
      benefits={BENEFITS.map((b) => ({
        icon: b.icon,
        title: tb(`${b.key}.title`),
        description: tb(`${b.key}.description`),
      }))}
    />
  );
}

function CareersOpenings({
  vacancies,
}: {
  vacancies: Awaited<ReturnType<typeof getOpenVacancies>>;
}) {
  const t = useTranslations('Careers.openings');
  return (
    <section className="py-24 lg:py-32 bg-paper">
      <Container>
        <div className="max-w-3xl mb-12">
          <Eyebrow variant="azure" className="block mb-5">
            {t('eyebrow')}
          </Eyebrow>
          <h2 className="type-display-lg text-ink">{t('title')}</h2>
        </div>
        <VacancyList vacancies={vacancies} emptyMessage={t('empty')} />
      </Container>
    </section>
  );
}

function CareersCta() {
  const t = useTranslations('Careers.cta');
  return (
    <CTABand
      title={t('title')}
      body={t('body')}
      primary={{ label: t('primary'), href: '/kontakt' }}
    />
  );
}
