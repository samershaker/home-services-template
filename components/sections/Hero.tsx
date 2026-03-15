'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { business, features, contact } from '@/lib/config';
import { fadeUp, fadeDown, fadeIn, stagger } from '@/lib/animations';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import type { HeroProps } from '@/lib/types';

export function Hero({
  title,
  subtitle,
  showVideo,
  showEmergency,
}: HeroProps) {
  const displayTitle = title ?? business.name;
  const displaySubtitle = subtitle ?? business.tagline;
  const videoEnabled = showVideo ?? features.heroVideo;
  const emergencyEnabled = showEmergency ?? features.emergencyBanner;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      {videoEnabled ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero-ambient.mp4"
        />
      ) : (
        <div className="absolute inset-0 bg-brand-primary" />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Content */}
      <Container className="relative z-10 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Emergency Badge */}
          {emergencyEnabled && (
            <motion.div variants={fadeDown}>
              <Badge variant="emergency">
                🚨 24/7 Emergency Service Available
              </Badge>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            className="font-heading text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            {displayTitle}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-lg text-white/80 sm:text-xl lg:text-2xl"
          >
            {displaySubtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-4 flex flex-col gap-4 sm:flex-row"
          >
            <Button asChild variant="accent" size="lg">
              <a href={contact.phoneHref}>📞 Call Now</a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/en/services">Our Services</Link>
            </Button>
          </motion.div>

          {/* Phone number visible */}
          <motion.p variants={fadeIn} className="text-sm text-white/60">
            {contact.phone}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
