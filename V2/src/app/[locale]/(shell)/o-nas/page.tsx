import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Wrench, ShieldCheck, Users, BadgeCheck } from 'lucide-react';
import {
  HeroPage,
  Manifesto,
  Timeline,
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
      <AboutTimeline />
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
      imageLabel="Tým u CNC stroje"
    />
  );
}

// TODO(content): confirm real company history — years and events below are a draft (see CONTENT_GAPS.md §2)
const MILESTONES: { year: string; titleKey: string }[] = [
  { year: '1993', titleKey: 'founded' },
  { year: '2002', titleKey: 'firstAuto' },
  { year: '2010', titleKey: 'secondHall' },
  { year: '2018', titleKey: 'iso3834' },
  { year: '2022', titleKey: 'robotics' },
  { year: '2024', titleKey: 'cncMazak' },
];

function AboutTimeline() {
  const t = useTranslations('AboutUs.timeline');
  const tm = useTranslations('AboutUs.milestones');
  return (
    <Timeline
      eyebrow={t('eyebrow')}
      title={t('title')}
      milestones={MILESTONES.map((m) => ({
        year: m.year,
        title: tm(`${m.titleKey}.title`),
        description: tm(`${m.titleKey}.description`),
      }))}
    />
  );
}

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

const TEAM_ROLES = ['ceo', 'leadEngineer', 'headOfProduction'] as const;

function AboutTeam() {
  const t = useTranslations('AboutUs.team');
  const tt = useTranslations('AboutUs.teamRoles');
  return (
    <TeamGrid
      eyebrow={t('eyebrow')}
      title={t('title')}
      members={TEAM_ROLES.map((role) => ({
        role: tt(`${role}.role`),
        bio: tt(`${role}.bio`),
      }))}
    />
  );
}

// TODO(content): confirm real certificates + add logos/PDFs — list below is a draft (see CONTENT_GAPS.md §2/§5)
const CERTS = [
  'ISO 9001:2015',
  'ISO 14001:2015',
  'ISO 45001:2018',
  'EN ISO 3834-2',
  'EN 1090-1 EXC3',
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

// TODO(content): confirm real machine list — model names in messages are a draft (see CONTENT_GAPS.md §2)
const MACHINE_GROUPS = ['cnc', 'welding', 'measurement'] as const;

function AboutMachines() {
  const t = useTranslations('AboutUs.machines');
  const tm = useTranslations('AboutUs.machineGroups');
  return (
    <section className="py-24 lg:py-32 bg-mist">
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
