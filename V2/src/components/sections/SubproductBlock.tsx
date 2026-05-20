import { Check, Download, FileText } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Tag } from '@/components/primitives/Tag';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils/cn';

type PdfLink = { label: string; href: string };

type Props = {
  index: number;
  total: number;
  title: string;
  description: string;
  highlights?: string[];
  features?: string[];
  photos?: string[];
  docs?: PdfLink[];
  pdfHref?: string;
  pdfLabel?: string;
  reverse?: boolean;
};

export function SubproductBlock({
  index,
  total,
  title,
  description,
  highlights,
  features,
  photos,
  docs,
  pdfHref,
  pdfLabel,
  reverse,
}: Props) {
  const alt = !reverse;
  return (
    <section
      className={cn(
        'py-20 lg:py-28 border-t border-[rgba(7,25,36,0.06)]',
        index % 2 === 0 ? 'bg-paper' : 'bg-mist',
      )}
    >
      <Container>
        <div
          className={cn(
            'grid gap-12 lg:grid-cols-12 lg:gap-16',
            !alt && 'lg:flex-row-reverse',
          )}
        >
          <div
            className={cn(
              'lg:col-span-6',
              !alt && 'lg:order-2',
            )}
          >
            <Reveal>
              <Eyebrow variant="azure" className="block mb-4">
                Produkt {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </Eyebrow>
              <h3 className="type-display-md text-ink">{title}</h3>
              <p className="mt-6 type-body-lg text-steel whitespace-pre-line">
                {description}
              </p>
            </Reveal>

            {highlights && highlights.length > 0 && (
              <Reveal delay={0.1}>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {highlights.map((h) => (
                    <li key={h}>
                      <Tag variant="filled-azure">{h}</Tag>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {features && features.length > 0 && (
              <Reveal delay={0.15}>
                <ul className="mt-8 grid gap-3">
                  {features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 type-body text-ink"
                    >
                      <Check
                        className="size-5 shrink-0 text-azure-deep mt-1"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {pdfHref && (
              <Reveal delay={0.2}>
                <a
                  href={pdfHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-3 border border-cloud px-5 py-3 type-body font-semibold text-ink hover:bg-ink hover:text-paper hover:border-ink transition-colors group"
                >
                  <FileText className="size-4" aria-hidden />
                  <span>{pdfLabel ?? 'Stáhnout katalogový list (PDF)'}</span>
                  <Download
                    className="size-4 transition-transform group-hover:translate-y-0.5"
                    aria-hidden
                  />
                </a>
              </Reveal>
            )}
          </div>

          <div
            className={cn(
              'lg:col-span-6',
              !alt && 'lg:order-1',
            )}
          >
            {photos && photos.length > 0 ? (
              <Reveal delay={0.1}>
                <PhotoGrid photos={photos} alt={title} />
              </Reveal>
            ) : docs && docs.length > 0 ? (
              <Reveal delay={0.1}>
                <DocsGrid docs={docs} />
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

function PhotoGrid({ photos, alt }: { photos: string[]; alt: string }) {
  const [hero, ...rest] = photos;
  const thumbs = rest.slice(0, 4);
  return (
    <div className="flex flex-col gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block aspect-[4/3] w-full object-cover"
      />
      {thumbs.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {thumbs.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={`${alt} ${i + 2}`}
              loading="lazy"
              decoding="async"
              className="block aspect-square w-full object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DocsGrid({ docs }: { docs: PdfLink[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {docs.map((d) => (
        <li key={d.href}>
          <a
            href={d.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 border border-cloud bg-paper p-5 hover:border-azure-deep transition-colors"
          >
            <FileText
              className="size-5 shrink-0 text-azure-deep mt-0.5"
              aria-hidden
            />
            <div className="flex-1 min-w-0">
              <span className="block type-body font-semibold text-ink group-hover:text-azure-deep transition-colors line-clamp-2">
                {d.label}
              </span>
              <span className="mt-1 block type-eyebrow text-fog">PDF</span>
            </div>
            <Download
              className="size-4 text-fog shrink-0 mt-1 transition-transform group-hover:translate-y-0.5 group-hover:text-ink"
              aria-hidden
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
