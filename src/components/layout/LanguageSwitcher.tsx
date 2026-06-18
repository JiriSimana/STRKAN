'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';

const labels: Record<Locale, string> = {
  cs: 'CS',
  en: 'EN',
  de: 'DE',
};

type Props = {
  variant?: 'default' | 'inverse';
};

export function LanguageSwitcher({ variant = 'default' }: Props) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label="Jazyk webu"
      className="flex items-center gap-0.5 type-eyebrow"
    >
      {routing.locales.map((loc) => {
        const isActive = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => {
              if (loc === locale) return;
              startTransition(() => {
                router.replace(pathname, { locale: loc });
              });
            }}
            disabled={pending}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'px-2 py-1 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2',
              variant === 'inverse'
                ? isActive
                  ? 'text-paper'
                  : 'text-paper/60 hover:text-paper'
                : isActive
                  ? 'text-ink'
                  : 'text-fog hover:text-ink',
            )}
          >
            {labels[loc]}
          </button>
        );
      })}
    </div>
  );
}
