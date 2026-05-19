'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  amount?: number;
};

export function Reveal({ children, delay = 0, amount = 0.2, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: shouldReduce ? 0.05 : 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: shouldReduce ? 0 : delay,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
