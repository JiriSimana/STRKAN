'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
};

export function Magnetic({
  children,
  className,
  strength = 12,
  radius = 100,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const falloff = 1 - dist / radius;
        x.set((dx / radius) * strength * falloff);
        y.set((dy / radius) * strength * falloff);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [radius, shouldReduce, strength, x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  );
}
