import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Wrench, ShieldCheck, Users, BadgeCheck } from 'lucide-react';
import {
  HeroPage,
  Manifesto,
  BenefitsGrid,
  TeamGrid,
  CertificationStrip,
  CTABand,
} from '@/components/sections';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/primitives';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { JsonLd, breadcrumbSchema } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/site';
import { generalPhoto } from '@/content/images';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutUs' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/o-nas',
    locale,
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          {
            name: 'O nás',
            url: `${SITE_URL}/${locale}/o-nas`,
          },
        ])}
      />
      <AboutHero locale={locale} />
      <AboutStory />
      <AboutValues />
      <AboutTeam />
      <AboutCertifications />
      <AboutGrant />
      <AboutMachines />
      <AboutCta />
    </>
  );
}

function AboutHero({ locale }: { locale: string }) {
  const t = useTranslations('AboutUs.hero');
  const nav = useTranslations('Navigation');
  return (
    <HeroPage
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      variant="dark"
      breadcrumbs={[{ label: nav('aboutUs') }]}
    />
  );
}

function AboutStory() {
  const t = useTranslations('AboutUs.story');
  return (
    <Manifesto
      eyebrow={t('eyebrow')}
      title={t('title')}
      paragraphs={[t('p1'), t('p2'), t('p3')]}
      imageUrl={generalPhoto(135)}
      imageAlt="Konstrukční tým STRKAN nad 3D modelem stroje"
    />
  );
}

// NOTE: timeline removed — old site gives no milestone history beyond founding
// (22. 5. 2012). Re-add a real timeline only if the client provides dated events.
// See CONTENT_GAPS.md §2.

const VALUES = [
  { icon: Wrench, key: 'craft' },
  { icon: ShieldCheck, key: 'reliability' },
  { icon: BadgeCheck, key: 'precision' },
  { icon: Users, key: 'team' },
] as const;

function AboutValues() {
  const t = useTranslations('AboutUs.values');
  const tv = useTranslations('AboutUs.valueItems');
  return (
    <BenefitsGrid
      eyebrow={t('eyebrow')}
      title={t('title')}
      intro={t('intro')}
      benefits={VALUES.map((v) => ({
        icon: v.icon,
        title: tv(`${v.key}.title`),
        description: tv(`${v.key}.description`),
      }))}
    />
  );
}

const TEAM_ROLES = [
  'triska',
  'holubec',
  'gorschenek',
  'prokes',
  'fiala',
  'sykora',
  'augustova',
] as const;

// Real portraits from the client photo set (public/images/team/).
const TEAM_PHOTO: Partial<Record<(typeof TEAM_ROLES)[number], string>> = {
  triska: '/images/team/triska.jpg',
  holubec: '/images/team/holubec.jpg',
  gorschenek: '/images/team/gorschenek.jpg',
  prokes: '/images/team/prokes.jpg',
  fiala: '/images/team/fiala.jpg',
  sykora: '/images/team/sykora.jpg',
  augustova: '/images/team/augustova.jpg',
};

// Direct contacts (from strkan.cz). Holubec's number is also the main line.
const TEAM_CONTACT: Partial<
  Record<(typeof TEAM_ROLES)[number], { phone: string; email: string }>
> = {
  triska: { phone: '+420 774 611 493', email: 'l.triska@strkan.cz' },
  holubec: { phone: '+420 724 506 929', email: 'm.holubec@strkan.cz' },
  gorschenek: { phone: '+420 725 995 485', email: 'm.gorschenek@strkan.cz' },
  prokes: { phone: '+420 725 539 150', email: 'j.prokes@strkan.cz' },
  fiala: { phone: '+420 778 978 619', email: 'l.fiala@strkan.cz' },
  sykora: { phone: '+420 601 502 280', email: 'm.sykora@strkan.cz' },
  augustova: { phone: '+420 725 770 522', email: 'h.augustova@strkan.cz' },
};

function AboutTeam() {
  const t = useTranslations('AboutUs.team');
  const tt = useTranslations('AboutUs.teamRoles');
  return (
    <TeamGrid
      eyebrow={t('eyebrow')}
      title={t('title')}
      members={TEAM_ROLES.map((key) => ({
        name: tt(`${key}.name`),
        role: tt(`${key}.role`),
        photo: TEAM_PHOTO[key],
        phone: TEAM_CONTACT[key]?.phone,
        email: TEAM_CONTACT[key]?.email,
      }))}
    />
  );
}

// Certificate names confirmed from strkan.cz. TODO(content): add real logos + PDF scans (see CONTENT_GAPS.md §5)
const CERTS = [
  'ČSN EN ISO 9001:2016',
  'ČSN EN ISO 3834-2:2022',
  'ČSN EN 1090-2:2019',
  'ČSN EN 15085-2+A1:2024 (CL1)',
  'DIN EN 15085-2:2024',
];

function AboutCertifications() {
  const t = useTranslations('AboutUs.certifications');
  return (
    <CertificationStrip
      eyebrow={t('eyebrow')}
      title={t('title')}
      items={CERTS.map((name) => ({ name }))}
    />
  );
}

function AboutGrant() {
  const t = useTranslations('AboutUs.grant');
  return (
    <section className="py-20 lg:py-24 bg-paper border-t border-cloud">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow variant="fog" className="block mb-3">
            {t('eyebrow')}
          </Eyebrow>
          <h2 className="type-display-md text-ink">{t('title')}</h2>
          <p className="mt-6 type-body-lg text-steel">{t('body')}</p>
          {/* TODO(content): add mandatory funding logos (TAČR / MPO / EU), official project name, period and support amount — see CONTENT_GAPS.md §5 */}
        </div>
      </Container>
    </section>
  );
}

const MACHINE_GROUPS = ['cnc', 'welding', 'measurement'] as const;

function AboutMachines() {
  const t = useTranslations('AboutUs.machines');
  const tm = useTranslations('AboutUs.machineGroups');
  return (
    <section className="py-16 lg:py-24 bg-mist">
      <Container>
        <div className="max-w-3xl mb-12">
          <Eyebrow variant="azure" className="block mb-5">
            {t('eyebrow')}
          </Eyebrow>
          <h2 className="type-display-lg text-ink">{t('title')}</h2>
        </div>

        <Accordion type="single" collapsible className="max-w-3xl">
          {MACHINE_GROUPS.map((group) => (
            <AccordionItem key={group} value={group}>
              <AccordionTrigger>{tm(`${group}.title`)}</AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-2">
                  {(tm.raw(`${group}.items`) as string[]).map((item) => (
                    <li key={item} className="type-mono text-steel">
                      · {item}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}

function AboutCta() {
  const t = useTranslations('AboutUs.cta');
  return (
    <CTABand
      title={t('title')}
      body={t('body')}
      primary={{ label: t('primary'), href: '/kontakt' }}
    />
  );
}
