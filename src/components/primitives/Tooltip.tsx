'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cn } from '@/lib/utils/cn';

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(function TooltipContent({ className, sideOffset = 6, ...props }, ref) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'z-50 bg-ink text-paper px-3 py-2 text-[13px] leading-tight shadow-[var(--shadow-card)]',
          'data-[state=delayed-open]:animate-[fade-in_150ms_ease-out]',
          'data-[state=closed]:animate-[fade-out_100ms_ease-out]',
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
});
