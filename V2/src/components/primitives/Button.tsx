import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

type Variant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline-light'
  | 'outline-dark';

type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-azure text-ink hover:bg-azure-deep',
  secondary: 'bg-ink text-paper hover:bg-graphite',
  ghost: 'bg-transparent text-ink hover:bg-clean-gray',
  'outline-light':
    'bg-transparent text-paper border border-paper/40 hover:bg-paper hover:text-ink hover:border-paper',
  'outline-dark':
    'bg-transparent text-ink border border-cloud hover:bg-ink hover:text-paper hover:border-ink',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base',
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  loading = false,
  disabled,
  className,
  children,
  ...rest
}: Props) {
  const isDisabled = disabled || loading;
  const showLeftIcon = !loading && icon && iconPosition === 'left';
  const showRightIcon = !loading && icon && iconPosition === 'right';

  return (
    <button
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'font-semibold tracking-[0.01em]',
        'transition-[background-color,color,border-color] duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-azure',
        'disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
      {showLeftIcon && <span aria-hidden>{icon}</span>}
      <span className={loading ? 'opacity-70' : undefined}>{children}</span>
      {showRightIcon && <span aria-hidden>{icon}</span>}
    </button>
  );
}
