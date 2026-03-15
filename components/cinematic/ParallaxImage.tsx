'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
  overlay?: boolean;
}

const intensityMap = {
  subtle: 30,
  medium: 60,
  strong: 100,
};

export function ParallaxImage({
  src,
  alt,
  intensity = 'medium',
  className = '',
  overlay = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const offset = intensityMap[intensity];
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="absolute inset-0 h-[120%] w-full object-cover -top-[10%]"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      )}
    </div>
  );
}
