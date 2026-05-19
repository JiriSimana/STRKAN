import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Tag } from '@/components/primitives/Tag';
import { Reveal } from '@/components/motion/Reveal';
import { PlaceholderImage } from '@/components/PlaceholderImage';

type ServiceCard = {
  tag: string;
  title: string;
  perex: string;
  href: string;
  imageLabel?: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  cards: ServiceCard[];
};

export function ServiceShowcase({ eyebrow, title, intro, cards }: Props) {
  return (
    <section className="py-24 lg:py-32 bg-paper">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            {eyebrow && (
              <Eyebrow variant="azure" className="block mb-5">
                {eyebrow}
              </Eyebrow>
            )}
            <h2 className="type-display-lg text-ink">{title}</h2>
            {intro && (
              <p className="mt-6 type-body-lg text-steel max-w-2xl">{intro}</p>
            )}
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <li key={card.href}>
              <Reveal delay={i * 0.08}>
                <Link
                  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                  href={card.href as any}
                  className="group flex flex-col"
                >
                  <div className="relative overflow-hidden">
                    <div className="transition-transform duration-500 ease-[var(--ease-snap)] group-hover:scale-[1.04]">
                      <PlaceholderImage
                        aspect="16/9"
                        label={card.imageLabel ?? card.title}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Tag variant="outline" className="mb-3">
                      {card.tag}
                    </Tag>
                    <h3 className="type-heading-lg text-ink group-hover:text-azure-deep transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-3 type-body text-steel">{card.perex}</p>
                    <span className="mt-5 inline-flex items-center gap-2 type-body-sm font-semibold text-ink">
                      <span className="group-hover:underline underline-offset-4">
                        Detail
                      </span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
