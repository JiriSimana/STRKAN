import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type ContainerSize = 'default' | 'narrow' | 'wide';

type Props = HTMLAttributes<HTMLDivElement> & {
  size?: ContainerSize;
};

const sizes: Record<ContainerSize, string> = {
  default: 'max-w-[1440px]',
  narrow: 'max-w-[960px]',
  wide: 'max-w-[1680px]',
};

export function Container({ size = 'default', className, ...rest }: Props) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 md:px-8 lg:px-12',
        sizes[size],
        className,
      )}
      {...rest}
    />
  );
}
