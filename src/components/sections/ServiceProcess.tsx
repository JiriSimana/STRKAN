import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Reveal } from '@/components/motion/Reveal';

type Step = {
  title: string;
  description: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  steps: Step[];
};

export function ServiceProcess({ eyebrow, title, steps }: Props) {
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
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="border-t border-cloud pt-6 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0"
            >
              <Reveal delay={i * 0.08}>
                <span className="type-mono text-azure-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 type-heading-md text-ink">{step.title}</h3>
                <p className="mt-3 type-body-sm text-steel">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
