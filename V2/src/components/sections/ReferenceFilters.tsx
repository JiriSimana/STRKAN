'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

type FilterGroup = {
  name: string;
  param: 'segment' | 'industry' | 'year';
  options: { value: string; label: string }[];
};

type Props = {
  groups: FilterGroup[];
};

export function ReferenceFilters({ groups }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  const update = (
    param: string,
    value: string | null,
  ) => {
    const next = new URLSearchParams(params.toString());
    if (value === null) next.delete(param);
    else next.set(param, value);

    startTransition(() => {
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    });
  };

  const activeFilters = groups.flatMap((g) => {
    const val = params.get(g.param);
    if (!val) return [];
    const opt = g.options.find((o) => o.value === val);
    return opt ? [{ ...g, current: opt }] : [];
  });

  return (
    <div
      data-pending={pending || undefined}
      className="sticky top-16 lg:top-20 z-10 -mx-6 lg:-mx-12 mb-12 bg-paper/95 backdrop-blur-md border-b border-[rgba(7,25,36,0.06)] px-6 lg:px-12 py-4"
    >
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        {groups.map((group) => {
          const active = params.get(group.param);
          return (
            <div key={group.param} className="flex items-center gap-2">
              <span className="type-eyebrow text-fog">{group.name}:</span>
              <div className="flex flex-wrap gap-1.5">
                {group.options.map((opt) => {
                  const isActive = active === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        update(group.param, isActive ? null : opt.value)
                      }
                      className={cn(
                        'h-7 px-3 rounded-[2px] type-eyebrow transition-colors',
                        isActive
                          ? 'bg-ink text-paper'
                          : 'bg-clean-gray text-ink hover:bg-cloud',
                      )}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {activeFilters.length > 0 && (
          <button
            type="button"
            onClick={() => {
              startTransition(() => router.replace(pathname, { scroll: false }));
            }}
            className="ml-auto inline-flex items-center gap-1 type-body-sm text-steel hover:text-ink transition-colors"
          >
            <X className="size-3.5" aria-hidden />
            <span>Vyčistit filtry</span>
          </button>
        )}
      </div>
    </div>
  );
}
