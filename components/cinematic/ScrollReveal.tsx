'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { fadeUp } from '@/lib/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: Variants;
  delay?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  variant = fadeUp,
  delay = 0,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
