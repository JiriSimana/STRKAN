import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Reveal } from '@/components/motion/Reveal';
import { PlaceholderImage } from '@/components/PlaceholderImage';

type Props = {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  imageUrl?: string;
  imageAlt?: string;
  imageLabel?: string;
};

export function Manifesto({
  eyebrow,
  title,
  paragraphs,
  imageUrl,
  imageAlt,
  imageLabel,
}: Props) {
  return (
    <section className="py-24 lg:py-32 bg-mist">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              {eyebrow && (
                <Eyebrow variant="azure" className="block mb-6">
                  {eyebrow}
                </Eyebrow>
              )}
              <h2 className="type-display-lg text-ink">{title}</h2>
            </Reveal>
            <div className="mt-8 flex flex-col gap-6">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <p className="type-body-lg text-steel max-w-[60ch]">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={imageAlt ?? ''}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[4/5] w-full object-cover"
                />
              ) : (
                <PlaceholderImage
                  aspect="4/5"
                  label={imageLabel ?? 'Vertikální 4:5 foto výroby'}
                />
              )}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
