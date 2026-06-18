import type { ReactNode } from 'react';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Breadcrumbs } from './Breadcrumbs';
import { cn } from '@/lib/utils/cn';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  variant?: 'default' | 'dark' | 'mist';
  align?: 'start' | 'center';
  children?: ReactNode;
};

const variantClasses = {
  default: 'bg-paper text-ink',
  dark: 'bg-ink text-paper',
  mist: 'bg-mist text-ink',
};

export function HeroPage({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  variant = 'default',
  align = 'start',
  children,
}: Props) {
  const isDark = variant === 'dark';
  return (
    <section
      className={cn(
        'pt-32 pb-16 lg:pt-40 lg:pb-24',
        variantClasses[variant],
      )}
    >
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} inverse={isDark} className="mb-10" />
        )}
        <div
          className={cn(
            align === 'center'
              ? 'mx-auto max-w-3xl text-center'
              : 'max-w-4xl',
          )}
        >
          {eyebrow && (
            <Eyebrow
              variant={isDark ? 'azure' : 'azure'}
              className="mb-5 block"
            >
              {eyebrow}
            </Eyebrow>
          )}
          <h1
            className={cn(
              'type-display-xl',
              isDark ? 'text-paper' : 'text-ink',
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={cn(
                'mt-6 type-body-lg max-w-2xl',
                align === 'center' && 'mx-auto',
                isDark ? 'text-paper/70' : 'text-steel',
              )}
            >
              {subtitle}
            </p>
          )}
          {children && <div className="mt-10">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
