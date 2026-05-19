import { useId, type ReactNode } from 'react';
import { Label } from '@/components/primitives/Label';
import { FieldError, FieldHint } from '@/components/primitives/FieldError';
import { cn } from '@/lib/utils/cn';

type Props = {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: (props: { id: string; 'aria-describedby'?: string }) => ReactNode;
};

export function FormField({
  label,
  required,
  error,
  hint,
  className,
  children,
}: Props) {
  const fieldId = useId();
  const errorId = error ? `${fieldId}-error` : undefined;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={fieldId} required={required}>
        {label}
      </Label>
      {children({ id: fieldId, 'aria-describedby': describedBy })}
      {hint && <FieldHint id={hintId}>{hint}</FieldHint>}
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}
