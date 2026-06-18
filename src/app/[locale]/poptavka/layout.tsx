import type { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { Logo } from '@/components/layout/Logo';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function PoptavkaLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <header className="border-b border-[rgba(7,25,36,0.06)]">
        <Container className="flex h-16 lg:h-20 items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <LanguageSwitcher />
        </Container>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
    </div>
  );
}
