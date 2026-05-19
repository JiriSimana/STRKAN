'use client';

import { useEffect, useState } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { Button } from '@/components/primitives/Button';
import { Logo } from './Logo';
import { NavLink } from './NavLink';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileDrawer } from './MobileDrawer';
import { cn } from '@/lib/utils/cn';

const NAV_ITEMS = [
  { segment: 'o-nas', href: '/o-nas', key: 'aboutUs' },
  { segment: 'sluzby', href: '/sluzby', key: 'services' },
  { segment: 'reference', href: '/reference', key: 'references' },
  { segment: 'novinky', href: '/novinky', key: 'news' },
  { segment: 'kariera', href: '/kariera', key: 'careers' },
  { segment: 'kontakt', href: '/kontakt', key: 'contact' },
] as const;

export function Navbar() {
  const t = useTranslations('Navigation');
  const segment = useSelectedLayoutSegment();
  const isHome = segment === null;

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-20 transition-colors duration-300',
          transparent
            ? 'bg-transparent'
            : 'bg-paper/95 backdrop-blur-md border-b border-[rgba(7,25,36,0.08)]',
        )}
      >
        <Container className="flex h-16 lg:h-20 items-center justify-between gap-6">
          <Link
            href="/"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2"
          >
            <Logo variant={transparent ? 'inverse' : 'color'} />
          </Link>

          <nav
            aria-label={t('mainNav')}
            className="hidden lg:flex items-center gap-8"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.segment}
                href={item.href}
                segment={item.segment}
                inverse={transparent}
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 lg:gap-5">
            <LanguageSwitcher variant={transparent ? 'inverse' : 'default'} />

            <div className="hidden md:block">
              <Button
                asChild
                variant={transparent ? 'outline-light' : 'primary'}
                size="sm"
              >
                <Link href="/poptavka">{t('getQuote')}</Link>
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label={t('openMenu')}
              className={cn(
                'lg:hidden -mr-2 p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2',
                transparent ? 'text-paper' : 'text-ink',
              )}
            >
              <Menu className="size-6" aria-hidden />
            </button>
          </div>
        </Container>
      </header>

      <MobileDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
}
