import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | STRKAN s.r.o.',
    default: 'STRKAN s.r.o. | Zařízení pro výrobu a servis dopravní techniky',
  },
  description: 'Česká strojírenská firma z Plzně specializující se na konstrukci, výrobu a servis dopravní techniky, jednoúčelových strojů a ocelových konstrukcí.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://strkan.cz'),
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: '/',
    siteName: 'STRKAN s.r.o.',
  },
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'cs' | 'en' | 'de')) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1 mt-20">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
