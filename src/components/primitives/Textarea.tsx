import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { className, error, rows = 5, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={error || undefined}
      className={cn(
        'w-full border bg-paper px-4 py-3 type-body text-ink placeholder:text-fog resize-y',
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
