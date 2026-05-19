import { cn } from '@/lib/utils/cn';

type Props = {
  variant?: 'color' | 'inverse';
  className?: string;
};

export function Logo({ variant = 'color', className }: Props) {
  return (
    <span
      className={cn(
        'inline-block font-sans font-semibold tracking-tight text-[22px] lg:text-[24px] leading-none',
        variant === 'inverse' ? 'text-paper' : 'text-ink',
        className,
      )}
      aria-label="STRKAN s.r.o."
    >
      STRKAN
    </span>
  );
}
