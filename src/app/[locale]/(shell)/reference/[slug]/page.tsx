import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Tag } from '@/components/primitives/Tag';
import { Breadcrumbs, CTABand } from '@/components/sections';
import { PlaceholderImage } from '@/components/PlaceholderImage';
import { JsonLd, breadcrumbSchema, projectSchema } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/site';
import { getReferenceBySlug } from '@/lib/supabase/queries';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const ref = await getReferenceBySlug(locale as 'cs' | 'en' | 'de', slug);
  if (!ref) return {};
  return createMetadata({
    title: ref.title,
    description: ref.challenge_md.slice(0, 160),
    path: `/reference/${slug}`,
    locale,
    image: ref.hero_url,
    type: 'article',
  });
}

export default async function ReferenceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const ref = await getReferenceBySlug(locale as 'cs' | 'en' | 'de', slug);
  if (!ref) notFound();

  const clientLabel = ref.client_visible
    ? ref.client_name ?? '—'
    : 'Anonymizovaný klient';

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Reference', url: `${SITE_URL}/${locale}/reference` },
          { name: ref.title, url: `${SITE_URL}/${locale}/reference/${slug}` },
        ])}
      />
      <JsonLd
        data={projectSchema({
          name: ref.title,
          description: ref.challenge_md.slice(0, 200),
          image: ref.hero_url,
          dateCreated: `${ref.year}-01-01`,
          slug,
          locale,
        })}
      />

      <DetailHero ref={ref} clientLabel={clientLabel} />
      <DetailMeta ref={ref} clientLabel={clientLabel} />
      <DetailNarrative ref={ref} />
      {ref.gallery.length > 0 && <DetailGallery items={ref.gallery} />}
      <DetailResults results={ref.results} />
      {ref.client_quote && (
        <DetailQuote text={ref.client_quote} author={ref.client_quote_by} />
      )}
      <DetailCta />
    </>
  );
}

function DetailHero({
  ref,
  clientLabel,
}: {
  ref: Awaited<ReturnType<typeof getReferenceBySlug>>;
  clientLabel: string;
}) {
  const nav = useTranslations('Navigation');
  if (!ref) return null;
  return (
    <section className="relative h-[60vh] min-h-[480px] w-full overflow-hidden bg-ink text-paper">
      {ref.hero_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={ref.hero_url}
          alt={ref.title}
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <PlaceholderImage
          aspect="21/9"
          label={`Hero — ${ref.title}`}
          inverse
          className="absolute inset-0 size-full"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,25,36,0.4) 0%, rgba(7,25,36,0.85) 100%)',
        }}
      />
      <Container className="relative z-10 flex h-full flex-col justify-end pb-12 pt-32">
        <Breadcrumbs
          items={[
            { label: nav('references'), href: '/reference' },
            { label: ref.title },
          ]}
          inverse
          className="mb-6"
        />
        <p className="type-eyebrow text-azure mb-3">{clientLabel}</p>
        <h1 className="type-display-xl text-paper max-w-4xl">{ref.title}</h1>
      </Container>
    </section>
  );
}

function DetailMeta({
  ref,
  clientLabel,
}: {
  ref: NonNullable<Awaited<ReturnType<typeof getReferenceBySlug>>>;
  clientLabel: string;
}) {
  const t = useTranslations('ReferenceDetail.meta');
  return (
    <section className="border-y border-cloud bg-mist py-8">
      <Container>
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div>
            <dt className="type-eyebrow text-fog">{t('client')}</dt>
            <dd className="mt-2 type-body text-ink">{clientLabel}</dd>
          </div>
          <div>
            <dt className="type-eyebrow text-fog">{t('segment')}</dt>
            <dd className="mt-2 type-body text-ink">{ref.segment}</dd>
          </div>
          <div>
            <dt className="type-eyebrow text-fog">{t('year')}</dt>
            <dd className="mt-2 type-body text-ink">{ref.year}</dd>
          </div>
          <div>
            <dt className="type-eyebrow text-fog">{t('duration')}</dt>
            <dd className="mt-2 type-body text-ink">
              {ref.duration_months ? `${ref.duration_months} měs.` : '—'}
            </dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}

function DetailNarrative({
  ref,
}: {
  ref: NonNullable<Awaited<ReturnType<typeof getReferenceBySlug>>>;
}) {
  const t = useTranslations('ReferenceDetail');
  return (
    <section className="py-24 lg:py-32 bg-paper">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <Eyebrow variant="azure" className="block mb-5">
              {t('challenge')}
            </Eyebrow>
            <div className="type-body-lg text-steel whitespace-pre-line max-w-prose">
              {ref.challenge_md}
            </div>
          </div>
          <div>
            <Eyebrow variant="azure" className="block mb-5">
              {t('solution')}
            </Eyebrow>
            <div className="type-body-lg text-steel whitespace-pre-line max-w-prose">
              {ref.solution_md}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function DetailGallery({ items }: { items: { url: string; alt: string }[] }) {
  return (
    <section className="py-24 lg:py-32 bg-mist">
      <Container>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.alt}
                className="block aspect-[4/3] w-full object-cover"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function DetailResults({
  results,
}: {
  results: { label: string; value: string; unit?: string }[];
}) {
  const t = useTranslations('ReferenceDetail.results');
  return (
    <section className="py-24 lg:py-32 bg-ink text-paper">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <Eyebrow variant="azure" className="block mb-5">
            {t('eyebrow')}
          </Eyebrow>
          <h2 className="type-display-lg text-paper">{t('title')}</h2>
        </div>
        <dl className="grid gap-12 sm:grid-cols-3">
          {results.map((r) => (
            <div key={r.label} className="text-center">
              <dt className="type-eyebrow text-paper/60">{r.label}</dt>
              <dd className="mt-3">
                <span className="type-display-xl text-azure">{r.value}</span>
                {r.unit && (
                  <span className="type-heading-md text-paper/60 ml-2">
                    {r.unit}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function DetailQuote({
  text,
  author,
}: {
  text: string;
  author: string | null;
}) {
  return (
    <section className="py-24 lg:py-32 bg-paper">
      <Container>
        <blockquote className="mx-auto max-w-3xl text-center">
          <p className="type-display-md text-ink">«{text}»</p>
          {author && (
            <footer className="mt-6 type-eyebrow text-fog">— {author}</footer>
          )}
        </blockquote>
      </Container>
    </section>
  );
}

function DetailCta() {
  const t = useTranslations('ReferenceDetail.cta');
  return (
    <CTABand
      title={t('title')}
      body={t('body')}
      primary={{ label: t('primary'), href: '/poptavka' }}
      secondary={{ label: t('secondary'), href: '/reference' }}
    />
  );
}
