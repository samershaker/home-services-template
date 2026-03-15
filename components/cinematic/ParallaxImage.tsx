'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type IntensityPreset = 'subtle' | 'medium' | 'strong';
type OverlayPosition = 'top' | 'bottom' | 'full' | 'none';

interface ParallaxImageProps {
  src: string;
  alt: string;
  intensity?: IntensityPreset | number;
  className?: string;
  overlay?: boolean | OverlayPosition;
  overlayPosition?: OverlayPosition;
  blurOnScroll?: boolean;
  caption?: string;
  aspectRatio?: string;
}

const intensityMap: Record<IntensityPreset, number> = {
  subtle: 30,
  medium: 60,
  strong: 100,
};

const overlayStyles: Record<OverlayPosition, string> = {
  top: 'bg-gradient-to-b from-background/70 via-transparent to-transparent',
  bottom: 'bg-gradient-to-t from-background/70 via-transparent to-transparent',
  full: 'bg-gradient-to-b from-black/40 via-black/20 to-black/60',
  none: '',
};

function resolveIntensity(intensity: IntensityPreset | number): number {
  return typeof intensity === 'number' ? intensity : intensityMap[intensity];
}

function resolveOverlay(
  overlay: boolean | OverlayPosition | undefined,
  overlayPosition: OverlayPosition | undefined
): OverlayPosition {
  if (overlayPosition) return overlayPosition;
  if (overlay === true) return 'full';
  if (overlay === false || overlay === undefined) return 'none';
  return overlay; // it's a string OverlayPosition
}

export function ParallaxImage({
  src,
  alt,
  intensity = 'medium',
  className = '',
  overlay,
  overlayPosition,
  blurOnScroll = false,
  caption,
  aspectRatio,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const offset = resolveIntensity(intensity);
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, blurOnScroll ? 4 : 0]);
  const blurFilter = useTransform(blur, (v) => `blur(${v}px)`);

  const resolvedOverlay = resolveOverlay(overlay, overlayPosition);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Skeleton shimmer placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-surface animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite] -translate-x-full" />
        </div>
      )}

      {/* Parallax image layer */}
      <motion.div
        style={{ y, opacity: imgOpacity, filter: blurFilter }}
        className="absolute inset-[-20%] will-change-transform"
      >
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: 'var(--color-surface, #141414)' }}
        />
      </motion.div>

      {/* Overlay */}
      {resolvedOverlay !== 'none' && (
        <div className={`absolute inset-0 z-10 ${overlayStyles[resolvedOverlay]}`} />
      )}

      {/* Caption */}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
          <p className="text-white/80 text-sm font-mono">{caption}</p>
        </div>
      )}

      {/* Aspect ratio spacer */}
      <div
        className="relative z-0"
        style={{ aspectRatio: aspectRatio ?? '16/9' }}
      />
    </div>
  );
}
