import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Reveal } from '@/components/motion/Reveal';

type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  benefits: Benefit[];
};

export function BenefitsGrid({ eyebrow, title, intro, benefits }: Props) {
  return (
    <section className="py-24 lg:py-32 bg-mist">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            {eyebrow && (
              <Eyebrow variant="azure" className="block mb-5">
                {eyebrow}
              </Eyebrow>
            )}
            <h2 className="type-display-lg text-ink">{title}</h2>
            {intro && (
              <p className="mt-6 type-body-lg text-steel max-w-2xl">{intro}</p>
            )}
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <li key={b.title}>
                <Reveal delay={(i % 3) * 0.1}>
                  <Icon
                    className="size-8 text-azure-deep"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <h3 className="mt-5 type-heading-md text-ink">{b.title}</h3>
                  <p className="mt-3 type-body text-steel max-w-md">
                    {b.description}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
