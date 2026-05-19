import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';

type Props = {
  eyebrow?: string;
  title?: string;
  count?: number;
};

export function LogoStrip({ eyebrow, title, count = 8 }: Props) {
  return (
    <section className="py-20 lg:py-24 bg-paper border-y border-[rgba(7,25,36,0.06)]">
      <Container>
        {(eyebrow || title) && (
          <div className="mb-12 text-center">
            {eyebrow && (
              <Eyebrow variant="fog" className="block mb-3">
                {eyebrow}
              </Eyebrow>
            )}
            {title && (
              <p className="type-heading-md text-ink max-w-2xl mx-auto">
                {title}
              </p>
            )}
          </div>
        )}
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
          {Array.from({ length: count }).map((_, i) => (
            <li key={i} className="flex justify-center">
              {/* TODO(content): real client logos (with usage consent — FEATURES.md §12) */}
              <div
                aria-label={`Logo zákazníka ${i + 1} — TODO`}
                role="img"
                className="h-12 w-32 bg-clean-gray text-fog grayscale opacity-60 hover:opacity-100 transition-opacity flex items-center justify-center type-eyebrow"
              >
                LOGO
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
