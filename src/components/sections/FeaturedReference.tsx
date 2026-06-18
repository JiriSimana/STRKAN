import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Button } from '@/components/primitives/Button';
import { Reveal } from '@/components/motion/Reveal';
import { PlaceholderImage } from '@/components/PlaceholderImage';

type Result = { label: string; value: string; unit?: string };

type Props = {
  eyebrow?: string;
  client: string;
  title: string;
  challenge: string;
  solution: string;
  results: Result[];
  href: string;
  ctaLabel: string;
  imageLabel?: string;
};

export function FeaturedReference({
  eyebrow,
  client,
  title,
  challenge,
  solution,
  results,
  href,
  ctaLabel,
  imageLabel,
}: Props) {
  return (
    <section className="py-24 lg:py-32 bg-paper">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              {/* TODO(content): real reference hero image */}
              <PlaceholderImage
                aspect="4/5"
                label={imageLabel ?? `Foto realizace — ${client}`}
              />
            </Reveal>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Reveal delay={0.1}>
              {eyebrow && (
                <Eyebrow variant="azure" className="block mb-5">
                  {eyebrow}
                </Eyebrow>
              )}
              <p className="type-eyebrow text-fog mb-3">{client}</p>
              <h2 className="type-display-md text-ink">{title}</h2>
              <p className="mt-6 type-body text-steel">{challenge}</p>
              <p className="mt-4 type-body text-steel">{solution}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-cloud pt-8">
                {results.map((r) => (
                  <div key={r.label}>
                    <dt className="type-eyebrow text-fog">{r.label}</dt>
                    <dd className="mt-2">
                      <span className="type-display-md text-ink">{r.value}</span>
                      {r.unit && (
                        <span className="type-heading-md text-steel ml-1">
                          {r.unit}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10">
                <Button
                  asChild
                  variant="secondary"
                  icon={<ArrowRight className="size-4" />}
                  iconPosition="right"
                >
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <Link href={href as any}>{ctaLabel}</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
