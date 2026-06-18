import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'default' | 'outline' | 'filled-azure' | 'filled-ink';

const variantClasses: Record<Variant, string> = {
  default: 'bg-clean-gray text-ink',
  outline: 'bg-transparent text-ink border border-cloud',
  'filled-azure': 'bg-azure-faint text-azure-deep',
  'filled-ink': 'bg-ink text-paper',
};

type Props = HTMLAttributes<HTMLSpanElement> & {
  variant?: Variant;
};

export function Tag({ variant = 'default', className, ...rest }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center h-7 px-3 rounded-[2px] type-eyebrow whitespace-nowrap',
        variantClasses[variant],
        className,
      )}
      {...rest}
    />
  );
}
