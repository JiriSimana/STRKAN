import { ExternalLink } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { PlaceholderImage } from '@/components/PlaceholderImage';

type Props = {
  googleMapsUrl?: string;
  mapyCzUrl?: string;
};

export function MapEmbed({ googleMapsUrl, mapyCzUrl }: Props) {
  return (
    <section className="bg-paper">
      <Container className="px-0 lg:px-0 max-w-none">
        <div className="relative h-[420px] lg:h-[480px] w-full bg-clean-gray">
          {/* TODO(content): real interactive map (Mapy.cz embed or Mapbox) once
              GPS coordinates and tile provider are confirmed. */}
          <PlaceholderImage
            aspect="21/9"
            label="Interaktivní mapa — sídlo STRKAN, Plzeň"
            className="size-full"
          />
          <div className="absolute bottom-6 right-6 flex flex-wrap gap-2">
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
