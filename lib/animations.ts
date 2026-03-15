/**
 * Animation presets — reusable motion variants for Framer Motion.
 * All components import from here for consistent animation behavior.
 */

import type { Variants, Transition } from 'framer-motion';

// ─── Easing Curves ────────────────────────────────────

export const ease = {
  smooth: [0.16, 1, 0.3, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
  snappy: [0.25, 0.46, 0.45, 0.94] as const,
};

// ─── Transition Presets ───────────────────────────────

export const transitions: Record<string, Transition> = {
  default: { duration: 0.8, ease: ease.smooth },
  fast: { duration: 0.4, ease: ease.smooth },
  slow: { duration: 1.2, ease: ease.smooth },
  spring: { type: 'spring', stiffness: 100, damping: 15 },
};

// ─── Variant Presets ──────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: transitions.default },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: transitions.default },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.default },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: transitions.default },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: transitions.default },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: transitions.default },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

// ─── Parallax Helpers ─────────────────────────────────

export const parallaxRange = {
  subtle: { offset: ['0%', '10%'] as const },
  medium: { offset: ['0%', '25%'] as const },
  strong: { offset: ['0%', '50%'] as const },
};
