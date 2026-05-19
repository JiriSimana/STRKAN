import { Link } from '@/i18n/navigation';
import { Tag } from '@/components/primitives/Tag';
import { PlaceholderImage } from '@/components/PlaceholderImage';

type Props = {
  slug: string;
  client: string;
  title: string;
  year: number;
  segment: string;
  heroUrl?: string;
};

const SEGMENT_LABELS: Record<string, string> = {
  'dopravni-technika': 'Dopravní technika',
  'jednoucelove-stroje': 'Jednoúčelové stroje',
  'svarovane-konstrukce': 'Svařované konstrukce',
  'automatizace-a-robotika': 'Automatizace & robotika',
  'deskova-polohovadla': 'Desková polohovadla',
};

export function ReferenceCard({
  slug,
  client,
  title,
  year,
  segment,
  heroUrl,
}: Props) {
  return (
    <Link
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      href={`/reference/${slug}` as any}
      className="group flex flex-col"
    >
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-500 ease-[var(--ease-snap)] group-hover:scale-[1.04]">
          {heroUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroUrl}
              alt={`${client} — ${title}`}
              className="block aspect-[16/9] w-full object-cover"
            />
          ) : (
            <PlaceholderImage
              aspect="16/9"
              label={`Foto realizace — ${client}`}
            />
          )}
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Tag variant="outline">{SEGMENT_LABELS[segment] ?? segment}</Tag>
          <span className="type-eyebrow text-fog">{year}</span>
        </div>
        <h3 className="type-heading-lg text-ink group-hover:text-azure-deep transition-colors">
          {title}
        </h3>
        <p className="type-body-sm text-steel">{client}</p>
      </div>
    </Link>
  );
}
