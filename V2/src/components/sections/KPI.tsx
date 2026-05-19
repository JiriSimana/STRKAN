import type { ReactNode } from 'react';
import { Container } from '@/components/primitives/Container';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils/cn';

type Stat = {
  value: ReactNode;
  unit?: string;
  label: string;
};

type Props = {
  stats: Stat[];
  variant?: 'default' | 'dark';
  className?: string;
};

export function KPI({ stats, variant = 'default', className }: Props) {
  const isDark = variant === 'dark';
  return (
    <section
      className={cn(
        'py-24 lg:py-32',
        isDark ? 'bg-ink text-paper' : 'bg-mist text-ink',
        className,
      )}
    >
      <Container>
        <ul
          className={cn(
            'grid gap-12',
            stats.length === 2 && 'lg:grid-cols-2',
            stats.length === 3 && 'lg:grid-cols-3',
            stats.length === 4 && 'lg:grid-cols-4',
          )}
        >
          {stats.map((stat, i) => (
            <li key={i}>
              <Reveal delay={i * 0.1}>
                <div className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      'type-display-xl',
                      isDark ? 'text-azure' : 'text-azure-deep',
                    )}
                  >
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span
                      className={cn(
                        'type-heading-md',
                        isDark ? 'text-paper/60' : 'text-steel',
                      )}
                    >
                      {stat.unit}
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    'mt-4 type-body max-w-xs',
                    isDark ? 'text-paper/70' : 'text-steel',
                  )}
                >
                  {stat.label}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
