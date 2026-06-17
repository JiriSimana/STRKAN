import { ExternalLink } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { PlaceholderImage } from '@/components/PlaceholderImage';

type Props = {
  embedSrc?: string;
  googleMapsUrl?: string;
  mapyCzUrl?: string;
  title?: string;
};

export function MapEmbed({ embedSrc, googleMapsUrl, mapyCzUrl, title }: Props) {
  return (
    <section className="bg-paper">
      <Container className="px-0 lg:px-0 max-w-none">
        <div className="relative h-[420px] lg:h-[480px] w-full bg-clean-gray">
          {embedSrc ? (
            <iframe
              src={embedSrc}
              title={title ?? 'Mapa — provozovna STRKAN s.r.o.'}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="size-full border-0"
            />
          ) : (
            <PlaceholderImage
              aspect="21/9"
              label="Interaktivní mapa — provozovna STRKAN"
              className="size-full"
            />
          )}
          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6 sm:flex-row sm:flex-wrap sm:justify-end">
            {googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-paper px-4 py-2 type-body-sm text-ink shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)] transition-shadow"
              >
                Otevřít v Google Maps
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
            )}
            {mapyCzUrl && (
              <a
                href={mapyCzUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-paper px-4 py-2 type-body-sm text-ink shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)] transition-shadow"
              >
                Otevřít v Mapy.cz
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
