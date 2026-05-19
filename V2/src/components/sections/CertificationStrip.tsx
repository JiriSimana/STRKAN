import { Award } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';

type Cert = {
  name: string;
  pdfUrl?: string;
};

type Props = {
  eyebrow?: string;
  title?: string;
  items: Cert[];
};

export function CertificationStrip({ eyebrow, title, items }: Props) {
  return (
    <section className="py-20 lg:py-24 bg-paper">
      <Container>
        {(eyebrow || title) && (
          <div className="mb-12 max-w-2xl">
            {eyebrow && (
              <Eyebrow variant="fog" className="block mb-3">
                {eyebrow}
              </Eyebrow>
            )}
            {title && (
              <h2 className="type-display-md text-ink">{title}</h2>
            )}
          </div>
        )}

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {items.map((c) => {
            const inner = (
              <div className="flex flex-col items-center gap-4 p-6 border border-cloud transition-colors hover:border-azure-deep hover:bg-mist">
                <Award
                  className="size-10 text-steel"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span className="type-body-sm text-ink text-center">
                  {c.name}
                </span>
              </div>
            );

            return (
              <li key={c.name}>
                {/* TODO(content): replace Award icon with real certificate logos + PDF links */}
                {c.pdfUrl ? (
                  <a
                    href={c.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${c.name} (PDF)`}
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
