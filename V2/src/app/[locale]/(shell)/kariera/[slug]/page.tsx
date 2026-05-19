import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { MapPin, Briefcase, Calendar, Check } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Tag } from '@/components/primitives/Tag';
import { Breadcrumbs } from '@/components/sections';
import { JsonLd, breadcrumbSchema, jobPostingSchema } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/site';
import { getVacancyBySlug } from '@/lib/supabase/queries';
import { ApplyForm } from './ApplyForm';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const EMPLOYMENT_LABELS_CS: Record<string, string> = {
  full_time: 'Plný úvazek',
  part_time: 'Částečný úvazek',
  contract: 'Kontrakt',
};

const SCHEMA_EMPLOYMENT: Record<string, 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR'> = {
  full_time: 'FULL_TIME',
  part_time: 'PART_TIME',
  contract: 'CONTRACTOR',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const v = await getVacancyBySlug(locale as 'cs' | 'en' | 'de', slug);
  if (!v) return {};
  return createMetadata({
    title: v.title,
    description: v.perex,
    path: `/kariera/${slug}`,
    locale,
  });
}

export default async function VacancyDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const v = await getVacancyBySlug(locale as 'cs' | 'en' | 'de', slug);
  if (!v) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Kariéra', url: `${SITE_URL}/${locale}/kariera` },
          { name: v.title, url: `${SITE_URL}/${locale}/kariera/${slug}` },
        ])}
      />
      <JsonLd
        data={jobPostingSchema({
          title: v.title,
          description: v.description_md,
          location: v.location,
          employmentType: SCHEMA_EMPLOYMENT[v.employment_type] ?? 'FULL_TIME',
          datePosted: v.published_at ?? v.created_at,
          validThrough: v.closes_at ?? undefined,
          slug,
          locale,
        })}
      />

      <Header vacancy={v} />
      <Body vacancy={v} />
      <Apply vacancySlug={slug} vacancyTitle={v.title} />
    </>
  );
}

function Header({
  vacancy: v,
}: {
  vacancy: NonNullable<Awaited<ReturnType<typeof getVacancyBySlug>>>;
}) {
  const nav = useTranslations('Navigation');
  return (
    <section className="pt-32 pb-12 lg:pt-40 bg-paper">
      <Container size="narrow">
        <Breadcrumbs
          items={[
            { label: nav('careers'), href: '/kariera' },
            { label: v.title },
          ]}
          className="mb-10"
        />
        <h1 className="type-display-xl text-ink">{v.title}</h1>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 type-body text-steel">
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-4 text-fog" aria-hidden />
            {v.location}
          </span>
          <span className="inline-flex items-center gap-2">
            <Briefcase className="size-4 text-fog" aria-hidden />
            {EMPLOYMENT_LABELS_CS[v.employment_type] ?? v.employment_type}
          </span>
          {v.closes_at && (
            <span className="inline-flex items-center gap-2">
              <Calendar className="size-4 text-fog" aria-hidden />
              {new Intl.DateTimeFormat('cs', { day: 'numeric', month: 'long' }).format(new Date(v.closes_at))}
            </span>
          )}
          {v.salary_range && <Tag variant="filled-azure">{v.salary_range}</Tag>}
        </div>
      </Container>
    </section>
  );
}

function Body({
  vacancy: v,
}: {
  vacancy: NonNullable<Awaited<ReturnType<typeof getVacancyBySlug>>>;
}) {
  const t = useTranslations('VacancyDetail');

  const Section = ({
    title,
    items,
  }: {
    title: string;
    items: string[];
  }) => (
    <div>
      <Eyebrow variant="azure" className="block mb-5">
        {title}
      </Eyebrow>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 type-body text-ink">
            <Check
              className="size-5 shrink-0 text-azure-deep mt-1"
              strokeWidth={2}
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="py-12 lg:py-16 bg-paper">
      <Container size="narrow">
        <div className="type-body-lg text-steel whitespace-pre-line mb-16 max-w-prose">
          {v.description_md}
        </div>
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <Section title={t('responsibilities')} items={v.responsibilities} />
          <Section title={t('requirements')} items={v.requirements} />
          <Section title={t('benefits')} items={v.benefits} />
        </div>
      </Container>
    </section>
  );
}

function Apply({
  vacancySlug,
  vacancyTitle,
}: {
  vacancySlug: string;
  vacancyTitle: string;
}) {
  const t = useTranslations('VacancyDetail.apply');
  return (
    <section className="py-24 lg:py-32 bg-mist">
      <Container size="narrow">
        <Eyebrow variant="azure" className="block mb-5">
          {t('eyebrow')}
        </Eyebrow>
        <h2 className="type-display-md text-ink">
          {t('title', { vacancy: vacancyTitle })}
        </h2>
        <p className="mt-4 type-body text-steel">{t('body')}</p>
        <ApplyForm vacancySlug={vacancySlug} className="mt-10" />
      </Container>
    </section>
  );
}
