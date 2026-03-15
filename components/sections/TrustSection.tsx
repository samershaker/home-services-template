'use client';

import { motion } from 'framer-motion';
import { Shield, Clock, DollarSign, Award, BadgeCheck, Star, Users, Wrench } from 'lucide-react';
import { business } from '@/lib/config';
import { stagger, fadeUp, ease } from '@/lib/animations';
import { GlassmorphicCard } from '@/components/cinematic/GlassmorphicCard';
import { ScrollReveal } from '@/components/cinematic/ScrollReveal';

/* ═══════════════════════════════════════════════════════
   TRUST SECTION — Social proof & credibility signals
   Business founding year, license, trust badges, certifications
   All data from config — no hardcoded business info
   ═══════════════════════════════════════════════════════ */

interface TrustSectionProps {
  className?: string;
  customerCount?: string;
  certifications?: string[];
}

const trustSignals = [
  {
    icon: Shield,
    title: 'Licensed & Insured',
    description: 'Fully licensed and insured for your protection. Every job backed by comprehensive coverage.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
  },
  {
    icon: Clock,
    title: 'Same-Day Service',
    description: 'Emergency? We respond fast. Same-day service available for urgent repairs and critical issues.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  {
    icon: DollarSign,
    title: 'Upfront Pricing',
    description: 'No hidden fees, no surprises. You get a written quote before any work begins. Period.',
    color: 'text-brand-accent',
    bgColor: 'bg-brand-accent/10',
  },
  {
    icon: Award,
    title: 'Warranty Guaranteed',
    description: 'Every job comes with a written warranty. We stand behind our work — if it\'s not right, we fix it.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
  },
];

export function TrustSection({
  className = '',
  customerCount = '500+',
  certifications,
}: TrustSectionProps) {
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = business.founded
    ? currentYear - business.founded
    : null;

  return (
    <section className={`py-24 md:py-32 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent mb-4">
            Why Choose Us
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-6 tracking-tight">
            Trusted by{' '}
            <span className="text-brand-accent">{customerCount} Customers</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto leading-relaxed">
            {business.name} has been serving the community
            {yearsInBusiness ? ` for ${yearsInBusiness}+ years` : ''} with
            honest, reliable service. Here&apos;s what sets us apart.
          </p>
        </ScrollReveal>

        {/* Stats Band */}
        <ScrollReveal direction="up" delay={0.1} className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Users,
                value: customerCount,
                label: 'Happy Customers',
              },
              {
                icon: Star,
                value: yearsInBusiness ? `${yearsInBusiness}+` : '—',
                label: 'Years Experience',
              },
              {
                icon: BadgeCheck,
                value: business.license ? '✓' : '—',
                label: business.license || 'Licensed',
              },
              {
                icon: Wrench,
                value: '24/7',
                label: 'Emergency Service',
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: ease.smooth as unknown as number[] }}
                className="text-center"
              >
                <GlassmorphicCard className="p-5 flex flex-col items-center gap-2">
                  <stat.icon className="w-5 h-5 text-brand-accent mb-1" />
                  <span className="text-2xl md:text-3xl font-bold text-[var(--color-text)] font-heading tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted uppercase tracking-wider">
                    {stat.label}
                  </span>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Trust Signal Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {trustSignals.map((signal, i) => (
            <motion.div key={i} variants={fadeUp}>
              <GlassmorphicCard variant="interactive" className="p-6 h-full group">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-brand ${signal.bgColor} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}>
                  <signal.icon className={`w-6 h-6 ${signal.color}`} />
                </div>

                {/* Content */}
                <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-2 tracking-tight">
                  {signal.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {signal.description}
                </p>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <ScrollReveal direction="up" delay={0.2} className="text-center">
            <p className="text-xs font-mono uppercase tracking-[0.15em] text-muted mb-4">
              Certifications & Affiliations
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {certifications.map((cert, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-brand border border-white/10 bg-white/5 backdrop-blur-md text-xs text-muted font-medium"
                >
                  {cert}
                </span>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* License info */}
        {business.license && (
          <ScrollReveal direction="up" delay={0.3} className="text-center mt-8">
            <div className="inline-flex items-center gap-2 text-xs text-muted">
              <BadgeCheck className="w-4 h-4 text-brand-accent" />
              <span>{business.license}</span>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
