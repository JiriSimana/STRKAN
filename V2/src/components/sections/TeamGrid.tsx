import { Phone, Mail } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Reveal } from '@/components/motion/Reveal';

type Member = {
  name?: string;
  role: string;
  bio?: string;
  photo?: string;
  phone?: string;
  email?: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  members: Member[];
};

// Initials from a full name, ignoring academic titles (Ing., Ph.D.) and
// credentials (IWE). "Ing. Ladislav Tříska, Ph.D." -> "LT".
function initials(name: string): string {
  const words = name
    .replace(/,/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !w.includes('.') && !/^[A-ZÁ-Ž]+$/.test(w));
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export function TeamGrid({ eyebrow, title, members }: Props) {
  return (
    <section className="py-16 lg:py-24 bg-paper">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            {eyebrow && (
              <Eyebrow variant="azure" className="block mb-5">
                {eyebrow}
              </Eyebrow>
            )}
            <h2 className="type-display-lg text-ink">{title}</h2>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m, i) => (
            <li key={`${m.role}-${i}`}>
              <Reveal delay={(i % 4) * 0.06}>
                {m.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.photo}
                    alt={m.name ? `Portrét — ${m.name}` : ''}
                    loading="lazy"
                    decoding="async"
                    className="block aspect-[4/5] w-full object-cover bg-mist"
                  />
                ) : (
                  <div className="flex aspect-[4/5] w-full items-center justify-center bg-mist">
                    <span className="type-display-md text-azure-deep" aria-hidden>
                      {m.name ? initials(m.name) : ''}
                    </span>
                  </div>
                )}
                <h3 className="mt-5 type-heading-md text-ink">
                  {m.name ?? m.role}
                </h3>
                {m.name && (
                  <p className="mt-1 type-eyebrow text-steel">{m.role}</p>
                )}
                {m.bio && (
                  <p className="mt-3 type-body-sm text-steel max-w-sm">{m.bio}</p>
                )}
                {(m.phone || m.email) && (
                  <div className="mt-4 flex flex-col gap-1.5">
                    {m.phone && (
                      <a
                        href={`tel:${m.phone.replace(/\s/g, '')}`}
                        className="inline-flex items-center gap-2 type-body-sm text-steel hover:text-azure-deep transition-colors"
                      >
                        <Phone className="size-4 shrink-0" aria-hidden />
                        <span>{m.phone}</span>
                      </a>
                    )}
                    {m.email && (
                      <a
                        href={`mailto:${m.email}`}
                        className="inline-flex items-center gap-2 type-body-sm text-steel hover:text-azure-deep transition-colors"
                      >
                        <Mail className="size-4 shrink-0" aria-hidden />
                        <span className="truncate">{m.email}</span>
                      </a>
                    )}
                  </div>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
