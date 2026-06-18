import { Link } from '@/i18n/navigation';
import { Tag } from '@/components/primitives/Tag';
import { PlaceholderImage } from '@/components/PlaceholderImage';

type Props = {
  slug: string;
  title: string;
  perex: string;
  category: string;
  publishedAt: string;
  readingTime?: number | null;
  coverUrl?: string | null;
  size?: 'default' | 'large';
};

function formatDate(iso: string, locale = 'cs') {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso));
}

export function PostCard({
  slug,
  title,
  perex,
  category,
  publishedAt,
  readingTime,
  coverUrl,
  size = 'default',
}: Props) {
  const isLarge = size === 'large';
  return (
    <Link
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      href={`/novinky/${slug}` as any}
      className="group flex flex-col"
    >
      <div className="overflow-hidden">
        {coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverUrl}
            alt=""
            className="block aspect-[16/9] w-full object-cover transition-transform duration-500 ease-[var(--ease-snap)] group-hover:scale-[1.04]"
          />
        ) : (
          <PlaceholderImage aspect="16/9" label={title} />
        )}
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <div className="flex items-center gap-3 type-eyebrow text-fog">
          <Tag variant="outline">{category}</Tag>
          <span>{formatDate(publishedAt)}</span>
          {typeof readingTime === 'number' && readingTime > 0 && (
            <span>· {readingTime} min</span>
          )}
        </div>
        <h3
          className={
            isLarge
              ? 'type-display-md text-ink group-hover:text-azure-deep transition-colors'
              : 'type-heading-lg text-ink group-hover:text-azure-deep transition-colors'
          }
        >
          {title}
        </h3>
        <p className="type-body text-steel max-w-[60ch]">{perex}</p>
      </div>
    </Link>
  );
}
