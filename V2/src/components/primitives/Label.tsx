import type { LabelHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type Props = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export function Label({ required, className, children, ...rest }: Props) {
  return (
    <label className={cn('type-eyebrow text-steel block', className)} {...rest}>
      {children}
      {required && <span className="ml-1 text-error" aria-hidden>*</span>}
    </label>
  );
}
