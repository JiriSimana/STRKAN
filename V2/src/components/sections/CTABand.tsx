import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { Button } from '@/components/primitives/Button';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Reveal } from '@/components/motion/Reveal';

type Cta = { label: string; href: string };

type Props = {
  eyebrow?: string;
  title: string;
  body?: string;
  primary?: Cta;
  secondary?: Cta;
};

export function CTABand({ eyebrow, title, body, primary, secondary }: Props) {
  return (
    <section className="relative overflow-hidden bg-ink py-16 lg:py-24 text-paper">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, var(--color-ink) 0%, var(--color-graphite) 100%)',
          opacity: 0.6,
        }}
      />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            {eyebrow && (
              <Eyebrow variant="azure" className="block mb-5">
                {eyebrow}
              </Eyebrow>
            )}
            <h2 className="type-display-lg text-paper">{title}</h2>
            {body && (
              <p className="mt-6 type-body-lg text-paper/70">{body}</p>
            )}
            {(primary || secondary) && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                {primary && (
                  <Button asChild variant="primary" size="lg">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <Link href={primary.href as any}>{primary.label}</Link>
                  </Button>
                )}
                {secondary && (
                  <Button asChild variant="outline-light" size="lg">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <Link href={secondary.href as any}>{secondary.label}</Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
