import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { PlaceholderImage } from '@/components/PlaceholderImage';

type Props = {
  eyebrow?: string;
  title?: string;
  count?: number;
};

export function Reel({ eyebrow, title, count = 10 }: Props) {
  const items = Array.from({ length: count });

  return (
    <section className="py-24 lg:py-32 bg-paper overflow-hidden">
      {(eyebrow || title) && (
        <Container className="mb-12">
          <div className="max-w-2xl">
            {eyebrow && (
              <Eyebrow variant="azure" className="block mb-5">
                {eyebrow}
              </Eyebrow>
            )}
            {title && (
              <h2 className="type-display-lg text-ink">{title}</h2>
            )}
          </div>
        </Container>
      )}

      <div
        className="group relative w-full overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <ul
          className="flex w-max gap-6 will-change-transform"
          style={{
            animation: 'marquee 60s linear infinite',
            animationPlayState: 'running',
          }}
        >
          {[...items, ...items].map((_, i) => (
            <li key={i} className="w-[360px] shrink-0">
              {/* TODO(content): real production photos pulled from Supabase media */}
              <PlaceholderImage
                aspect="4/5"
                label={`Foto ${(i % count) + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
