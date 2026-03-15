'use client';

import { useRef, Children, type ReactNode } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { fadeUp, fadeDown, slideInLeft, slideInRight, scaleIn, fadeIn, ease } from '@/lib/animations';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: Variants;
  direction?: RevealDirection;
  delay?: number;
  className?: string;
  stagger?: boolean;
  threshold?: number;
  once?: boolean;
}

const directionVariants: Record<RevealDirection, Variants> = {
  up: fadeUp,
  down: fadeDown,
  left: slideInLeft,
  right: slideInRight,
  scale: scaleIn,
  none: fadeIn,
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function ScrollReveal({
  children,
  variant,
  direction = 'up',
  delay = 0,
  className,
  stagger: enableStagger = false,
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once,
    amount: threshold,
    margin: '-40px',
  });

  const resolvedVariant = variant ?? directionVariants[direction];

  // Stagger mode: wrap each child in its own animated element
  if (enableStagger) {
    const items = Children.toArray(children);
    return (
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className={className}
      >
        {items.map((child, i) => (
          <motion.div
            key={i}
            variants={resolvedVariant}
            transition={{ delay: delay + i * 0.1 }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      variants={resolvedVariant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
