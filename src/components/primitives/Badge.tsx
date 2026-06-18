import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'default' | 'success' | 'warning' | 'error' | 'azure' | 'ink';

const variantClasses: Record<Variant, string> = {
  default: 'bg-clean-gray text-ink',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-error/10 text-error',
  azure: 'bg-azure-faint text-azure-deep',
  ink: 'bg-ink text-paper',
};

type Props = HTMLAttributes<HTMLSpanElement> & {
  variant?: Variant;
};

export function Badge({ variant = 'default', className, ...rest }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center h-6 px-2.5 rounded-full type-eyebrow whitespace-nowrap',
        variantClasses[variant],
        className,
      )}
      {...rest}
    />
  );
}
