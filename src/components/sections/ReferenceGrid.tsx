import type { ReferenceProject } from '@/lib/supabase/types';
import { Reveal } from '@/components/motion/Reveal';
import { ReferenceCard } from './ReferenceCard';

type Props = {
  references: ReferenceProject[];
  emptyMessage?: string;
};

export function ReferenceGrid({ references, emptyMessage }: Props) {
  if (references.length === 0) {
    return (
      <div className="rounded border border-dashed border-cloud bg-mist p-12 text-center type-body text-steel">
        {emptyMessage ?? 'Žádné výsledky pro zvolený filtr.'}
      </div>
    );
  }

  return (
    <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2">
      {references.map((ref, i) => (
        <li
          key={ref.id}
          className={i % 4 === 0 || i % 4 === 3 ? 'sm:mt-0' : 'sm:mt-12'}
        >
          <Reveal delay={(i % 4) * 0.06}>
            <ReferenceCard
              slug={ref.slug}
              client={ref.client_visible ? ref.client_name ?? '' : 'Anonymizovaný klient'}
              title={ref.title}
              year={ref.year}
              segment={ref.segment}
              heroUrl={ref.hero_url}
            />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
