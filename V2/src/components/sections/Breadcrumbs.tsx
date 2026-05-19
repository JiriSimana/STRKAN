import { Home, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';

type Crumb = { label: string; href?: string };

type Props = {
  items: Crumb[];
  inverse?: boolean;
  className?: string;
};

export function Breadcrumbs({ items, inverse, className }: Props) {
  return (
    <nav aria-label="Drobečková navigace" className={className}>
      <ol className="flex flex-wrap items-center gap-2 type-body-sm">
        <li>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Link href={'/' as any} aria-label="Domů" className="inline-flex">
            <Home
              className={cn(
                'size-4 transition-colors',
                inverse
                  ? 'text-paper/40 hover:text-paper'
                  : 'text-fog hover:text-ink',
              )}
              aria-hidden
            />
          </Link>
        </li>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              <ChevronRight
                className={cn(
                  'size-3',
                  inverse ? 'text-paper/30' : 'text-fog',
                )}
                aria-hidden
              />
              {item.href && !last ? (
                <Link
                  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                  href={item.href as any}
                  className={cn(
                    'transition-colors',
                    inverse
                      ? 'text-paper/60 hover:text-paper'
                      : 'text-steel hover:text-ink',
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? 'page' : undefined}
                  className={cn(
                    'font-medium',
                    inverse ? 'text-paper' : 'text-ink',
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
