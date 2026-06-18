import { ArrowRight } from 'lucide-react';
import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';

type Variant = 'default' | 'muted' | 'inverse';

const variantClasses: Record<Variant, string> = {
  default:
    'text-ink hover:text-azure-deep decoration-azure-deep underline-offset-4 hover:underline',
  muted:
    'text-steel hover:text-ink underline-offset-4 hover:underline decoration-current',
  inverse:
    'text-paper hover:text-azure underline-offset-4 hover:underline decoration-azure',
};

type Props = ComponentProps<typeof Link> & {
  variant?: Variant;
  arrow?: boolean;
};

export function TextLink({
  variant = 'default',
  arrow,
  className,
  children,
  ...rest
}: Props) {
  return (
    <Link
      className={cn(
        'group inline-flex items-center gap-1 transition-colors',
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="size-4 shrink-0 transition-transform group-hover:translate-x-1"
          aria-hidden
        />
      )}
    </Link>
  );
}
