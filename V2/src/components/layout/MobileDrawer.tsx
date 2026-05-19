'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X, Phone, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ROUTES = [
  { href: '/o-nas', key: 'aboutUs' },
  { href: '/sluzby', key: 'services' },
  { href: '/reference', key: 'references' },
  { href: '/novinky', key: 'news' },
  { href: '/kariera', key: 'careers' },
  { href: '/kontakt', key: 'contact' },
] as const;

export function MobileDrawer({ open, onOpenChange }: Props) {
  const t = useTranslations('Navigation');

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-30 bg-ink/40 data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_150ms_ease-out]"
        />
        <DialogPrimitive.Content
          className="fixed right-0 top-0 z-30 flex h-full w-full max-w-[480px] flex-col bg-paper shadow-[var(--shadow-overlay)] data-[state=open]:animate-[drawer-in_250ms_ease-out] data-[state=closed]:animate-[drawer-out_200ms_ease-out]"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(7,25,36,0.06)]">
            <Link href="/" onClick={() => onOpenChange(false)}>
              <Logo />
            </Link>
            <DialogPrimitive.Close
              className="-mr-2 p-2 text-steel hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2"
              aria-label="Zavřít menu"
            >
              <X className="size-6" aria-hidden />
            </DialogPrimitive.Close>
          </div>

          <DialogPrimitive.Title className="sr-only">
            Hlavní navigace
          </DialogPrimitive.Title>

          <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Hlavní">
            <ul className="flex flex-col gap-6">
              {ROUTES.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => onOpenChange(false)}
                    className="block type-display-md text-ink hover:text-azure-deep transition-colors"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* TODO(content): real phone + email once delivered by client */}
          <div className="border-t border-[rgba(7,25,36,0.06)] px-6 py-6 space-y-4">
            <a
              href="tel:+420"
              className="flex items-center gap-3 type-body text-ink hover:text-azure-deep transition-colors"
            >
              <Phone className="size-5 text-steel" aria-hidden />
              <span>—</span>
            </a>
            <a
              href="mailto:info@strkan.cz"
              className="flex items-center gap-3 type-body text-ink hover:text-azure-deep transition-colors"
            >
              <Mail className="size-5 text-steel" aria-hidden />
              <span>info@strkan.cz</span>
            </a>
            <div className="pt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
