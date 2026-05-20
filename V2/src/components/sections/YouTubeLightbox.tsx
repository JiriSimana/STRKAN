'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/primitives/Dialog';
import { cn } from '@/lib/utils/cn';

type Props = {
  videoId: string;
  label?: string;
  duration?: string;
  className?: string;
};

export function YouTubeLightbox({
  videoId,
  label = 'Sledovat firemní video',
  duration,
  className,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            'group inline-flex items-center gap-4 border border-paper/30 bg-ink/40 backdrop-blur-md px-5 py-4 text-left text-paper transition-colors hover:bg-ink/60 hover:border-paper/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
            className,
          )}
        >
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-azure text-ink transition-transform group-hover:scale-110">
            <Play className="size-5 fill-current" aria-hidden />
          </span>
          <span className="flex flex-col">
            <span className="type-body font-semibold">{label}</span>
            {duration && (
              <span className="type-eyebrow text-paper/60">{duration}</span>
            )}
          </span>
        </button>
      </DialogTrigger>

      <DialogContent
        showClose
        className="w-[95vw] max-w-[1200px] aspect-video !p-0 bg-ink overflow-hidden"
      >
        <DialogTitle className="sr-only">{label}</DialogTitle>
        {open && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={label}
            className="size-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
