'use client';

import { motion } from 'framer-motion';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassmorphicCard({
  children,
  className = '',
  hover = true,
}: GlassmorphicCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-brand border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg ${
        hover ? 'cursor-pointer hover:border-white/20 hover:shadow-xl' : ''
      } transition-shadow ${className}`}
    >
      {children}
    </motion.div>
  );
}
