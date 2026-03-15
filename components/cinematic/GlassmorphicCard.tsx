'use client';

import { forwardRef, type ElementType, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { ease } from '@/lib/animations';

type BlurIntensity = 'light' | 'medium' | 'strong';
type CardVariant = 'default' | 'elevated' | 'interactive';

interface GlassmorphicCardBaseProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  blur?: BlurIntensity;
  gradientBorder?: boolean;
  onClick?: () => void;
}

// Polymorphic "as" prop support
type GlassmorphicCardProps<T extends ElementType = 'div'> = GlassmorphicCardBaseProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof GlassmorphicCardBaseProps | 'as'>;

const blurMap: Record<BlurIntensity, string> = {
  light: 'backdrop-blur-md',
  medium: 'backdrop-blur-xl',
  strong: 'backdrop-blur-2xl',
};

const variantStyles: Record<CardVariant, {
  base: string;
  hover: { y?: number; scale?: number };
  glow: boolean;
}> = {
  default: {
    base: 'bg-white/5 border-white/10',
    hover: { y: -4 },
    glow: false,
  },
  elevated: {
    base: 'bg-white/[0.07] border-white/15 shadow-xl',
    hover: { y: -6, scale: 1.01 },
    glow: true,
  },
  interactive: {
    base: 'bg-white/5 border-white/10 cursor-pointer',
    hover: { y: -8, scale: 1.02 },
    glow: true,
  },
};

export function GlassmorphicCard<T extends ElementType = 'div'>({
  children,
  className = '',
  variant = 'default',
  blur = 'medium',
  gradientBorder = false,
  onClick,
  as,
  ...rest
}: GlassmorphicCardProps<T>) {
  const config = variantStyles[variant];
  const blurClass = blurMap[blur];

  const inner = (
    <motion.div
      whileHover={{
        ...config.hover,
        transition: { duration: 0.3, ease: ease.smooth as unknown as number[] },
      }}
      className={`
        relative rounded-brand border ${blurClass} shadow-lg
        ${config.base}
        transition-shadow duration-300
        hover:border-white/20 hover:shadow-xl
        ${config.glow ? 'hover:shadow-[0_0_30px_var(--color-accent,rgba(245,158,11,0.08))]' : ''}
        ${className}
      `}
      onClick={onClick}
      {...(rest as HTMLMotionProps<'div'>)}
    >
      {/* Specular highlight (top edge) */}
      <div className="absolute inset-x-0 top-0 h-px rounded-t-brand bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Gradient border overlay */}
      {gradientBorder && (
        <div className="absolute -inset-px rounded-brand bg-gradient-to-b from-white/10 via-transparent to-brand-accent/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-[0.5px]" />
      )}

      {/* Inner glow on hover */}
      {config.glow && (
        <div
          className="absolute inset-0 rounded-brand opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow:
              'inset 0 1px 1px rgba(255, 255, 255, 0.05), 0 0 40px var(--color-accent-glow, rgba(245, 158, 11, 0.06))',
          }}
        />
      )}

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {children}
    </motion.div>
  );

  return inner;
}
