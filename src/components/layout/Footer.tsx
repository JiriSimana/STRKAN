import { Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { Logo } from './Logo';

const NAV = [
  { href: '/o-nas', key: 'aboutUs' },
  { href: '/sluzby', key: 'services' },
  { href: '/reference', key: 'references' },
  { href: '/novinky', key: 'news' },
  { href: '/kariera', key: 'careers' },
  { href: '/kontakt', key: 'contact' },
] as const;

const LEGAL = [
  { href: '/pravni/zasady-ochrany-osobnich-udaju', key: 'privacy' },
  { href: '/pravni/cookies', key: 'cookies' },
  { href: '/pravni/vop', key: 'terms' },
] as const;

export function Footer() {
  const t = useTranslations('Footer');
  const nav = useTranslations('Navigation');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <Container className="py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr] lg:gap-16">
          <div>
            <Logo variant="inverse" />
            <p className="mt-6 type-body-lg text-paper/80 max-w-sm">
              {t('claim')}
            </p>
            <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 type-body-sm text-paper/60">
              <dt className="type-eyebrow text-paper/40">IČO</dt>
              <dd>29157382</dd>
              <dt className="type-eyebrow text-paper/40">DIČ</dt>
              <dd>CZ29157382</dd>
              <dt className="type-eyebrow text-paper/40">{t('registered')}</dt>
              <dd>Lánská 144/5, 301 00 Plzeň</dd>
            </dl>
          </div>

          <nav aria-label={t('siteMap')}>
            <h2 className="type-eyebrow text-paper/40">{t('siteMap')}</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="type-body text-paper/80 hover:text-paper transition-colors"
                  >
                    {nav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="type-eyebrow text-paper/40">{t('contact')}</h2>
            <ul className="mt-6 flex flex-col gap-4">
              <li>
                <a
                  href="tel:+420724506929"
                  className="inline-flex items-center gap-3 type-body text-paper/80 hover:text-paper transition-colors"
                >
                  <Phone className="size-5 text-paper/40 shrink-0" aria-hidden />
                  <span>+420 724 506 929</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@strkan.cz"
                  className="inline-flex items-center gap-3 type-body text-paper/80 hover:text-paper transition-colors"
                >
                  <Mail className="size-5 text-paper/40 shrink-0" aria-hidden />
                  <span>info@strkan.cz</span>
                </a>
              </li>
              <li className="inline-flex items-start gap-3 type-body text-paper/80">
                <MapPin
                  className="size-5 text-paper/40 shrink-0 mt-0.5"
                  aria-hidden
                />
                <address className="not-italic">
                  Provozovna: Čemínská 628,
                  <br />
                  330 33 Město Touškov
                </address>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 type-body text-paper/80 hover:text-paper transition-colors"
                  aria-label="LinkedIn STRKAN"
                >
                  <Linkedin
                    className="size-5 text-paper/40 shrink-0"
                    aria-hidden
                  />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="type-body-sm text-paper/40">
            © {year} STRKAN s.r.o. {t('rightsReserved')}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="type-body-sm text-paper/60 hover:text-paper transition-colors"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
