'use client';

import { motion } from 'framer-motion';
import { business, contact } from '@/lib/config';
import { fadeUp, ease } from '@/lib/animations';

/* ═══════════════════════════════════════════
   CTA BANNER — Full-width call-to-action banner
   for placement between sections. Multiple variants.
   ═══════════════════════════════════════════ */

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  variant?: 'gradient' | 'glass' | 'solid';
  className?: string;
}

const variantStyles = {
  gradient: {
    wrapper: 'bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary',
    card: 'relative overflow-hidden',
    overlays: true,
  },
  glass: {
    wrapper: '',
    card: 'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden',
    overlays: true,
  },
  solid: {
    wrapper: 'bg-brand-primary',
    card: 'relative overflow-hidden',
    overlays: false,
  },
};

export function CTABanner({
  title,
  subtitle,
  ctaText,
  ctaHref,
  secondaryText,
  secondaryHref,
  variant = 'glass',
  className = '',
}: CTABannerProps) {
  const defaultTitle = `Ready for Professional Service?`;
  const defaultSubtitle = `Get a free estimate from ${business.name}. No pressure. No hidden fees. Satisfaction guaranteed.`;
  const defaultCtaText = `📞 Call Now: ${contact.phone}`;
  const defaultCtaHref = contact.phoneHref;

  const displayTitle = title ?? defaultTitle;
  const displaySubtitle = subtitle ?? defaultSubtitle;
  const displayCtaText = ctaText ?? defaultCtaText;
  const displayCtaHref = ctaHref ?? defaultCtaHref;

  const styles = variantStyles[variant];

  return (
    <section className={`py-16 md:py-24 px-6 ${styles.wrapper} ${className}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: ease.smooth as unknown as number[] }}
        >
          <div className={styles.card}>
            {/* Background gradients for glass/gradient variants */}
            {styles.overlays && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-surface/60 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(var(--color-accent-rgb,245_158_11)/0.15)_0%,transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_20%,rgba(var(--color-primary-rgb,37_99_235)/0.2)_0%,transparent_50%)]" />
              </>
            )}

            <div className="relative z-10 p-10 md:p-16 text-center">
              {/* Label */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xs font-mono uppercase tracking-[0.3em] text-brand-accent mb-4"
              >
                Get Started Today
              </motion.p>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-heading text-3xl sm:text-4xl font-bold mb-6 tracking-tight text-white"
              >
                {displayTitle}
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg text-muted max-w-xl mx-auto mb-10 leading-relaxed"
              >
                {displaySubtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                {/* Primary CTA */}
                <motion.a
                  href={displayCtaHref}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-brand-accent text-black font-bold rounded-full text-lg tracking-tight hover:opacity-90 transition-all shadow-lg shadow-brand-accent/20 inline-flex items-center gap-2 justify-center"
                >
                  {displayCtaText}
                </motion.a>

                {/* Secondary CTA */}
                {secondaryText && secondaryHref && (
                  <motion.a
                    href={secondaryHref}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold text-lg hover:bg-white/10 hover:border-white/30 transition-all inline-flex items-center gap-2 justify-center group"
                  >
                    <span>{secondaryText}</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
