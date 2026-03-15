'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { business, features, contact } from '@/lib/config';
import { ease } from '@/lib/animations';

interface HeroRevealProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

export function HeroReveal({
  title,
  subtitle,
  tagline,
  backgroundImage,
  backgroundVideo,
  ctaPrimary,
  ctaSecondary,
}: HeroRevealProps) {
  const displayTitle = title ?? business.name;
  const displaySubtitle = subtitle ?? business.tagline;
  const videoEnabled = backgroundVideo ?? (features.heroVideo ? '/videos/hero-ambient.mp4' : undefined);

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '15%']);

  const words = displayTitle.split(' ');

  return (
    <section
      ref={containerRef}
      className="relative h-[120vh] flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        {videoEnabled ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoEnabled} type="video/mp4" />
          </video>
        ) : backgroundImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-brand-secondary via-background to-background" />
        )}
        {/* Rich cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,var(--color-accent-glow,rgba(245,158,11,0.08))_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_20%_30%,var(--color-primary-glow,rgba(37,99,235,0.15))_0%,transparent_50%)]" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ opacity, scale, y: textY }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Tagline */}
        {tagline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-brand-accent font-mono text-sm md:text-base tracking-[0.3em] uppercase mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_0_2px_8px_rgb(0_0_0_/_80%)]"
          >
            {tagline}
          </motion.p>
        )}

        {/* Title with word-by-word reveal */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter leading-[0.95] mb-8">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3 + i * 0.12,
                  ease: ease.smooth as unknown as number[],
                }}
                className="inline-block bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: ease.smooth as unknown as number[] }}
          className="text-lg md:text-xl lg:text-2xl text-muted max-w-2xl mx-auto leading-relaxed text-balance"
        >
          {displaySubtitle}
        </motion.p>

        {/* CTA Buttons */}
        {(ctaPrimary || ctaSecondary) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: ease.smooth as unknown as number[] }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            {ctaPrimary && (
              <motion.a
                href={ctaPrimary.href}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-brand-accent to-brand-accent/80 text-background font-bold rounded-brand text-lg tracking-tight hover:from-brand-accent/90 hover:to-brand-accent/70 transition-all shadow-lg shadow-brand-accent/20 inline-flex items-center gap-2 justify-center"
              >
                {ctaPrimary.label}
              </motion.a>
            )}
            {ctaSecondary && (
              <motion.a
                href={ctaSecondary.href}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-brand text-lg tracking-tight hover:from-brand-secondary hover:to-brand-primary transition-all shadow-lg shadow-brand-primary/20 inline-flex items-center gap-2 justify-center"
              >
                {ctaSecondary.label}
              </motion.a>
            )}
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-6 h-10 rounded-full border-2 border-white/20 mx-auto flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 rounded-full bg-brand-accent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
