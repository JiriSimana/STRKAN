'use client';

import type { ComponentProps } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';

type Props = ComponentProps<typeof Link> & {
  segment: string;
  inverse?: boolean;
};

export function NavLink({ segment, inverse, className, ...rest }: Props) {
  const active = useSelectedLayoutSegment() === segment;

  return (
    <Link
      aria-current={active ? 'page' : undefined}
      className={cn(
        'type-body-sm font-semibold transition-colors',
        inverse
          ? active
            ? 'text-paper'
            : 'text-paper/70 hover:text-paper'
          : active
            ? 'text-ink'
            : 'text-steel hover:text-ink',
        className,
      )}
      {...rest}
    />
  );
}
