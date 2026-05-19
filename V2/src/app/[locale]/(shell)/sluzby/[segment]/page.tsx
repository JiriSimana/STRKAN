import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { HeroPage, TechSpecs, CTABand } from '@/components/sections';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/primitives';
import { Reveal } from '@/components/motion/Reveal';
import { JsonLd, breadcrumbSchema, serviceSchema } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/site';
import {
  SERVICE_SEGMENTS,
  isServiceSegment,
  type ServiceSegment,
} from '@/content/services';

type Props = {
  params: Promise<{ locale: string; segment: string }>;
};

export function generateStaticParams() {
  return SERVICE_SEGMENTS.map((segment) => ({ segment }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, segment } = await params;
  if (!isServiceSegment(segment)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: 'ServiceSegments' });
  return createMetadata({
    title: t(`${segment}.title`),
    description: t(`${segment}.perex`),
    path: `/sluzby/${segment}`,
    locale,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, segment } = await params;
  if (!isServiceSegment(segment)) notFound();
  setRequestLocale(locale);

  const tSeg = await getTranslations({ locale, namespace: 'ServiceSegments' });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Služby', url: `${SITE_URL}/${locale}/sluzby` },
          {
            name: tSeg(`${segment}.title`),
            url: `${SITE_URL}/${locale}/sluzby/${segment}`,
          },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: tSeg(`${segment}.title`),
          description: tSeg(`${segment}.perex`),
          slug: segment,
          locale,
        })}
      />
      <DetailHero segment={segment} />
      <DetailCapabilities segment={segment} />
      <DetailTechSpecs segment={segment} />
      <DetailFaq segment={segment} />
      <DetailCta />
    </>
  );
}

function DetailHero({ segment }: { segment: ServiceSegment }) {
  const tSeg = useTranslations('ServiceSegments');
  const nav = useTranslations('Navigation');
  return (
    <HeroPage
      eyebrow={tSeg(`${segment}.tag`)}
      title={tSeg(`${segment}.title`)}
      subtitle={tSeg(`${segment}.perex`)}
      breadcrumbs={[
        { label: nav('services'), href: '/sluzby' },
        { label: tSeg(`${segment}.title`) },
      ]}
    />
  );
}

function DetailCapabilities({ segment }: { segment: ServiceSegment }) {
  const t = useTranslations('ServiceDetail.capabilities');
  const tContent = useTranslations(`ServiceContent.${segment}`);
  const capabilities = tContent.raw('capabilities') as string[];

  return (
    <section className="py-24 lg:py-32 bg-paper">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow variant="azure" className="block mb-5">
              {t('eyebrow')}
            </Eyebrow>
            <h2 className="type-display-md text-ink">{t('title')}</h2>
          </div>
          <div className="lg:col-span-8">
            <ul className="grid gap-4 sm:grid-cols-2">
              {capabilities.map((item, i) => (
                <li key={item} className="flex items-start gap-3">
                  <Reveal delay={(i % 4) * 0.06}>
                    <span className="flex items-start gap-3">
                      <Check
                        className="size-5 shrink-0 text-azure-deep mt-1"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span className="type-body text-ink">{item}</span>
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function DetailTechSpecs({ segment }: { segment: ServiceSegment }) {
  const t = useTranslations('ServiceDetail.techSpecs');
  const tContent = useTranslations(`ServiceContent.${segment}`);
  const specs = tContent.raw('specs') as { label: string; value: string }[];
  return <TechSpecs eyebrow={t('eyebrow')} title={t('title')} specs={specs} />;
}

function DetailFaq({ segment }: { segment: ServiceSegment }) {
  const t = useTranslations('ServiceDetail.faq');
  const tContent = useTranslations(`ServiceContent.${segment}`);
  const faqs = tContent.raw('faq') as { q: string; a: string }[];

  return (
    <section className="py-24 lg:py-32 bg-mist">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow variant="azure" className="block mb-5">
              {t('eyebrow')}
            </Eyebrow>
            <h2 className="type-display-md text-ink">{t('title')}</h2>
          </div>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`q${i}`}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </section>
  );
}

function DetailCta() {
  const t = useTranslations('ServiceDetail.cta');
  return (
    <CTABand
      title={t('title')}
      body={t('body')}
      primary={{ label: t('primary'), href: '/poptavka' }}
    />
  );
}
