import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export function FieldError({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLParagraphElement>) {
  if (!children) return null;
  return (
    <p
      role="alert"
      className={cn('mt-2 text-sm text-error', className)}
      {...rest}
    >
      {children}
    </p>
  );
}

export function FieldHint({
  className,
  ...rest
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('mt-2 type-body-sm text-fog', className)} {...rest} />;
}
