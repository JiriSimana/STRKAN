import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Reveal } from '@/components/motion/Reveal';

type Milestone = {
  year: string;
  title: string;
  description?: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  milestones: Milestone[];
};

export function Timeline({ eyebrow, title, milestones }: Props) {
  return (
    <section className="py-24 lg:py-32 bg-paper">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            {eyebrow && (
              <Eyebrow variant="azure" className="block mb-5">
                {eyebrow}
              </Eyebrow>
            )}
            <h2 className="type-display-lg text-ink">{title}</h2>
          </Reveal>
        </div>

        <ol className="mt-16 relative">
          <span
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-cloud lg:block"
          />
          <div className="grid gap-12 lg:grid-cols-6 lg:gap-8">
            {milestones.map((m, i) => (
              <li key={m.year} className="relative">
                <Reveal delay={i * 0.08}>
                  <span
                    aria-hidden
                    className="hidden lg:block size-3 rounded-full bg-azure border-4 border-paper relative z-10 -mt-1.5 mb-6"
                  />
                  <div className="lg:mt-0 type-mono text-azure-deep">
                    {m.year}
                  </div>
                  <h3 className="mt-2 type-heading-md text-ink">{m.title}</h3>
                  {m.description && (
                    <p className="mt-2 type-body-sm text-steel">
                      {m.description}
                    </p>
                  )}
                </Reveal>
              </li>
            ))}
          </div>
        </ol>
      </Container>
    </section>
  );
}
