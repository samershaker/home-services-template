'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { business } from '@/lib/config';
import { fadeUp, stagger, ease } from '@/lib/animations';

/* ═══════════════════════════════════════════
   TRUST SECTION — "Why Choose Us" with animated
   stats, glass cards, and optional certifications.
   ═══════════════════════════════════════════ */

export interface TrustStat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: string;
}

interface TrustSectionProps {
  title?: string;
  subtitle?: string;
  stats?: TrustStat[];
  showLicense?: boolean;
  className?: string;
}

// ─── Default Stats ────────────────────────────────────

const defaultStats: TrustStat[] = [
  { value: 15, suffix: '+', label: 'Years Experience', icon: '🏆' },
  { value: 500, suffix: '+', label: 'Jobs Completed', icon: '✅' },
  { value: 5, label: 'Star Rated', icon: '⭐' },
  { value: 100, suffix: '%', label: 'Licensed & Insured', icon: '🛡️' },
];

// ─── Animated Counter ─────────────────────────────────

function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * value));

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      }
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}{displayed}{suffix}
    </span>
  );
}

// ─── Stat Card ────────────────────────────────────────

function StatCard({ stat, index }: { stat: TrustStat; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-xl hover:-translate-y-1"
    >
      {/* Glow on hover */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-brand-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      <div className="relative z-10">
        {/* Icon */}
        {stat.icon && (
          <div className="text-3xl mb-4">{stat.icon}</div>
        )}

        {/* Animated number */}
        <div className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
          <AnimatedCounter
            value={stat.value}
            suffix={stat.suffix}
            prefix={stat.prefix}
          />
        </div>

        {/* Label */}
        <p className="text-sm font-medium uppercase tracking-widest text-muted">
          {stat.label}
        </p>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────

export function TrustSection({
  title = 'Why Choose Us',
  subtitle,
  stats = defaultStats,
  showLicense = true,
  className = '',
}: TrustSectionProps) {
  const defaultSubtitle = `${business.name} delivers professional results backed by experience, certifications, and a commitment to quality.`;

  return (
    <section className={`py-24 md:py-32 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: ease.smooth as unknown as number[] }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-brand-accent mb-4">
            Trusted Professionals
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
            {title}
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            {subtitle ?? defaultSubtitle}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </motion.div>

        {/* License / Certifications Bar */}
        {showLicense && business.license && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-3">
              <svg className="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium text-white">{business.license}</span>
              <span className="text-xs text-muted">• Licensed &amp; Insured</span>
            </div>
          </motion.div>
        )}

        {/* Founded year */}
        {business.founded && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-sm text-muted mt-6"
          >
            Proudly serving our community since {business.founded}
          </motion.p>
        )}
      </div>
    </section>
  );
}
