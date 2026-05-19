import { ImageOff, Film } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

type Aspect = '16/9' | '4/5' | '1/1' | '21/9' | '3/4' | '9/16';

const aspectClasses: Record<Aspect, string> = {
  '16/9': 'aspect-[16/9]',
  '4/5': 'aspect-[4/5]',
  '1/1': 'aspect-square',
  '21/9': 'aspect-[21/9]',
  '3/4': 'aspect-[3/4]',
  '9/16': 'aspect-[9/16]',
};

type Props = {
  label?: string;
  aspect?: Aspect;
  kind?: 'image' | 'video';
  inverse?: boolean;
  className?: string;
};

export function PlaceholderImage({
  label,
  aspect = '16/9',
  kind = 'image',
  inverse = false,
  className,
}: Props) {
  const Icon = kind === 'video' ? Film : ImageOff;
  const stripe = inverse ? 'rgba(255,255,255,0.025)' : 'rgba(7,25,36,0.025)';

  return (
    <div
      role="img"
      aria-label={label ?? 'TODO content placeholder'}
      className={cn(
        'relative flex w-full items-center justify-center overflow-hidden',
        aspectClasses[aspect],
        inverse ? 'bg-graphite text-paper/40' : 'bg-clean-gray text-fog',
        className,
      )}
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent 0, transparent 10px, ${stripe} 10px, ${stripe} 20px)`,
      }}
    >
      <div className="flex flex-col items-center gap-3 px-6 py-4 text-center">
        <Icon className="size-8 shrink-0" aria-hidden />
        {label ? (
          <span className="type-eyebrow max-w-[28ch] text-balance">{label}</span>
        ) : (
          <span className="type-eyebrow">TODO(content)</span>
        )}
      </div>
    </div>
  );
}
