import { ArrowRight, MapPin, Briefcase } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Vacancy } from '@/lib/supabase/types';
import { Tag } from '@/components/primitives/Tag';
import { Reveal } from '@/components/motion/Reveal';

type Props = {
  vacancies: Vacancy[];
  emptyMessage?: string;
};

const EMPLOYMENT_LABELS: Record<string, string> = {
  full_time: 'Plný úvazek',
  part_time: 'Částečný úvazek',
  contract: 'Kontrakt',
};

export function VacancyList({
  vacancies,
  emptyMessage = 'Aktuálně nemáme otevřené pozice. Můžete nám přesto poslat spontánní nabídku.',
}: Props) {
  if (vacancies.length === 0) {
    return (
      <div className="border border-dashed border-cloud bg-mist p-12 text-center type-body text-steel">
        {emptyMessage}
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {vacancies.map((v, i) => (
        <li key={v.id}>
          <Reveal delay={i * 0.05}>
            <Link
              /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
              href={`/kariera/${v.slug}` as any}
              className="group flex flex-col gap-4 border border-cloud bg-paper p-6 transition-colors hover:border-azure-deep lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-8"
            >
              <div className="flex-1">
                <h3 className="type-heading-lg text-ink group-hover:text-azure-deep transition-colors">
                  {v.title}
                </h3>
                <p className="mt-2 type-body text-steel">{v.perex}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 type-body-sm text-steel">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4 text-fog" aria-hidden />
                    {v.location}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Briefcase className="size-4 text-fog" aria-hidden />
                    {EMPLOYMENT_LABELS[v.employment_type] ?? v.employment_type}
                  </span>
                  {v.salary_range && (
                    <Tag variant="filled-azure">{v.salary_range}</Tag>
                  )}
                </div>
              </div>
              <ArrowRight
                className="size-5 text-ink shrink-0 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
