import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, error, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={error || undefined}
      className={cn(
        'h-12 w-full border bg-paper px-4 type-body text-ink placeholder:text-fog',
        'border-cloud',
        'focus:outline-none focus:border-azure-deep focus:ring-4 focus:ring-azure/15',
        'disabled:bg-clean-gray disabled:cursor-not-allowed',
        error && 'border-error focus:border-error focus:ring-error/15',
        className,
      )}
      {...rest}
    />
  );
});
