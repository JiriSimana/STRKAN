'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

export default function LanguageSwitcher({ variant = 'colored' }: { variant?: 'colored' | 'inverse' }) {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const textClass = variant === 'inverse' ? 'text-white' : 'text-brand-dark-blue';

  return (
    <div className={`flex items-center space-x-2 text-sm font-semibold uppercase ${textClass}`}>
      {['cs', 'en', 'de'].map((l) => (
        <button
          key={l}
          onClick={() => changeLocale(l)}
          disabled={isPending}
          className={`px-1 py-1 transition-colors duration-200 
            ${locale === l ? 'border-b-2 border-brand-sky-blue' : 'border-b-2 border-transparent hover:text-brand-sky-blue'}
            ${isPending ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
