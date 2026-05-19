import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Reveal } from '@/components/motion/Reveal';
import { PlaceholderImage } from '@/components/PlaceholderImage';

type Member = {
  name: string;
  role: string;
  bio?: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  members: Member[];
};

export function TeamGrid({ eyebrow, title, members }: Props) {
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
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m, i) => (
            <li key={m.name}>
              <Reveal delay={(i % 3) * 0.08}>
                {/* TODO(content): real portrait photos */}
                <PlaceholderImage
                  aspect="4/5"
                  label={`Portrét — ${m.name}`}
                />
                <h3 className="mt-5 type-heading-md text-ink">{m.name}</h3>
                <p className="mt-1 type-eyebrow text-steel">{m.role}</p>
                {m.bio && (
                  <p className="mt-3 type-body-sm text-steel max-w-sm">
                    {m.bio}
                  </p>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
