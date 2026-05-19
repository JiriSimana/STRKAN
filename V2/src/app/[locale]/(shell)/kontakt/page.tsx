import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Clock, Car, Train, Bus } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { HeroPage, MapEmbed } from '@/components/sections';
import { ContactForm } from '@/components/forms/ContactForm';
import { JsonLd, breadcrumbSchema, organizationSchema } from '@/lib/seo/jsonld';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/site';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return createMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/kontakt',
    locale,
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Kontakt', url: `${SITE_URL}/${locale}/kontakt` },
        ])}
      />
      <JsonLd data={organizationSchema} />
      <ContactHero />
      <ContactBody />
      <MapEmbed />
      <TransportInfo />
    </>
  );
}

function ContactHero() {
  const t = useTranslations('Contact.hero');
  const nav = useTranslations('Navigation');
  return (
    <HeroPage
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      breadcrumbs={[{ label: nav('contact') }]}
    />
  );
}

function ContactBody() {
  const t = useTranslations('Contact');
  const td = useTranslations('Contact.details');
  return (
    <section className="py-24 lg:py-32 bg-paper">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Eyebrow variant="azure" className="block mb-5">
              {td('eyebrow')}
            </Eyebrow>
            <h2 className="type-display-md text-ink">{td('title')}</h2>

            {/* TODO(content): real phone, IČO, DIČ, full street address once delivered */}
            <dl className="mt-10 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <Phone className="size-5 text-steel mt-0.5 shrink-0" aria-hidden />
                <div>
                  <dt className="type-eyebrow text-fog mb-1">{td('phone')}</dt>
                  <dd>
                    <a
                      href="tel:+420"
                      className="type-body-lg text-ink hover:text-azure-deep transition-colors"
                    >
                      —
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="size-5 text-steel mt-0.5 shrink-0" aria-hidden />
                <div>
                  <dt className="type-eyebrow text-fog mb-1">{td('email')}</dt>
                  <dd>
                    <a
                      href="mailto:info@strkan.cz"
                      className="type-body-lg text-ink hover:text-azure-deep transition-colors"
                    >
                      info@strkan.cz
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="size-5 text-steel mt-0.5 shrink-0" aria-hidden />
                <div>
                  <dt className="type-eyebrow text-fog mb-1">{td('address')}</dt>
                  <dd>
                    <address className="not-italic type-body text-ink">
                      Plzeň, Česká republika
                      <br />
                      <span className="type-body-sm text-steel">
                        IČO: — · DIČ: —
                      </span>
                    </address>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="size-5 text-steel mt-0.5 shrink-0" aria-hidden />
                <div>
                  <dt className="type-eyebrow text-fog mb-1">{td('hours')}</dt>
                  <dd>
                    <p className="type-body text-ink">{td('hoursValue')}</p>
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <Eyebrow variant="azure" className="block mb-5">
              {t('form.eyebrow')}
            </Eyebrow>
            <h2 className="type-display-md text-ink mb-8">{t('form.title')}</h2>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}

function TransportInfo() {
  const t = useTranslations('Contact.transport');
  return (
    <section className="py-24 lg:py-32 bg-mist">
      <Container>
        <Eyebrow variant="azure" className="block mb-5">
          {t('eyebrow')}
        </Eyebrow>
        <h2 className="type-display-md text-ink mb-12">{t('title')}</h2>

        <ul className="grid gap-8 md:grid-cols-3">
          <li className="bg-paper p-8 border border-cloud">
            <Car className="size-8 text-azure-deep mb-5" strokeWidth={1.5} aria-hidden />
            <h3 className="type-heading-md text-ink">{t('car.title')}</h3>
            <p className="mt-3 type-body text-steel">{t('car.description')}</p>
          </li>
          <li className="bg-paper p-8 border border-cloud">
            <Train className="size-8 text-azure-deep mb-5" strokeWidth={1.5} aria-hidden />
            <h3 className="type-heading-md text-ink">{t('train.title')}</h3>
            <p className="mt-3 type-body text-steel">{t('train.description')}</p>
          </li>
          <li className="bg-paper p-8 border border-cloud">
            <Bus className="size-8 text-azure-deep mb-5" strokeWidth={1.5} aria-hidden />
            <h3 className="type-heading-md text-ink">{t('mhd.title')}</h3>
            <p className="mt-3 type-body text-steel">{t('mhd.description')}</p>
          </li>
        </ul>
      </Container>
    </section>
  );
}
