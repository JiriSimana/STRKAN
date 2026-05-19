import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'azure' | 'fog' | 'steel';

const colorClasses: Record<Variant, string> = {
  azure: 'text-azure',
  fog: 'text-fog',
  steel: 'text-steel',
};

type Props = HTMLAttributes<HTMLSpanElement> & {
  variant?: Variant;
};

export function Eyebrow({ variant = 'azure', className, ...rest }: Props) {
  return (
    <span className={cn('type-eyebrow', colorClasses[variant], className)} {...rest} />
  );
}
