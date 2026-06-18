import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { PlaceholderImage } from '@/components/PlaceholderImage';

type Props = {
  eyebrow?: string;
  title?: string;
  photos?: string[];
};

export function Reel({ eyebrow, title, photos }: Props) {
  const hasPhotos = photos && photos.length > 0;
  const items = hasPhotos ? photos : Array.from({ length: 10 });

  return (
    <section className="py-16 lg:py-24 bg-paper overflow-hidden">
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
          {[...items, ...items].map((item, i) => (
            <li key={i} className="w-[360px] shrink-0">
              {hasPhotos ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item as string}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[4/5] w-full object-cover"
                />
              ) : (
                <PlaceholderImage
                  aspect="4/5"
                  label={`Foto ${(i % items.length) + 1}`}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
