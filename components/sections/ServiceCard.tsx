'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, AlertTriangle, ChevronRight, Wrench, Settings, PlusCircle, Thermometer, Zap, Shield, HardHat, Droplets, Wind, Search } from 'lucide-react';
import { serviceUrl } from '@/lib/config';
import { scaleIn, ease } from '@/lib/animations';
import type { Service, Location } from '@/lib/types';

/* ═══════════════════════════════════════════════════════
   SERVICE CARD — Premium service display with 3 variants
   Image overlay, price badge, feature list, emergency badge
   ═══════════════════════════════════════════════════════ */

interface ServiceCardProps {
  service: Service;
  location?: Location;
  variant?: 'default' | 'compact' | 'featured';
}

// Map icon string names to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  wrench: Wrench,
  settings: Settings,
  'plus-circle': PlusCircle,
  thermometer: Thermometer,
  zap: Zap,
  shield: Shield,
  hardhat: HardHat,
  droplets: Droplets,
  wind: Wind,
  search: Search,
};

function ServiceIcon({ name, className, size = 24 }: { name: string; className?: string; size?: number }) {
  const LucideIcon = iconMap[name];
  if (LucideIcon) return <LucideIcon className={className} size={size} />;
  // Fallback
  return <Wrench className={className} size={size} />;
}

export function ServiceCard({ service, location, variant = 'default' }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const href = serviceUrl(service, location);
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';
  const hasImage = service.images && service.images.length > 0;

  const maxFeatures = isFeatured ? 4 : 3;

  return (
    <motion.div
      variants={scaleIn}
      className="h-full"
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`
          group relative h-full overflow-hidden rounded-brand border border-white/10
          bg-white/[0.03] backdrop-blur-xl shadow-lg
          transition-all duration-500
          hover:border-white/20 hover:bg-white/[0.05]
          ${isFeatured ? 'ring-2 ring-brand-accent/40 shadow-[0_0_30px_rgba(var(--color-accent-rgb,245,158,11),0.12)]' : ''}
          ${isHovered ? 'shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_40px_rgba(var(--color-accent-rgb,245,158,11),0.08)]' : ''}
        `}
      >
        {/* ── Specular Highlight ── */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-20" />

        {/* ── Image Section ── */}
        {hasImage && !isCompact && (
          <div className={`relative overflow-hidden ${isFeatured ? 'h-56' : 'h-44'}`}>
            <Image
              src={`/images/services/${service.images[0]}`}
              alt={service.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-transparent" />

            {/* Price Badge — top right corner */}
            <div className="absolute top-4 right-4 z-10">
              <div className="px-3 py-1.5 rounded-full bg-brand-accent/90 backdrop-blur-md shadow-lg shadow-brand-accent/20">
                <span className="text-sm font-bold text-black tracking-tight">
                  {service.price}
                </span>
              </div>
            </div>

            {/* Emergency Badge — top left */}
            {service.emergencyAvailable && (
              <div className="absolute top-4 left-4 z-10">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/90 backdrop-blur-md shadow-lg shadow-red-500/30"
                >
                  <motion.div
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-white"
                  />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                    24/7
                  </span>
                </motion.div>
              </div>
            )}

            {/* Icon overlay — bottom left of image */}
            <div className="absolute bottom-4 left-4 z-10">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-brand-accent">
                <ServiceIcon name={service.icon} size={20} />
              </div>
            </div>
          </div>
        )}

        {/* ── Content Section ── */}
        <div className={`relative flex flex-col ${isCompact ? 'p-5' : 'p-6'} ${hasImage && !isCompact ? '' : 'pt-6'}`}>
          {/* Compact: inline icon + emergency */}
          {(isCompact || !hasImage) && (
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-brand bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                <ServiceIcon name={service.icon} size={22} />
              </div>
              <div className="flex items-center gap-2">
                {service.emergencyAvailable && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600/20 border border-red-500/30"
                  >
                    <AlertTriangle className="w-3 h-3 text-red-400" />
                    <span className="text-[10px] font-bold text-red-400 uppercase">24/7</span>
                  </motion.div>
                )}
                {isFeatured && (
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/10 border border-brand-accent/30 rounded-full">
                    Featured
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Title */}
          <h3 className={`font-heading font-bold text-[var(--color-text)] tracking-tight mb-1 ${isFeatured ? 'text-xl' : 'text-lg'}`}>
            {service.name}
          </h3>

          {/* Description — hidden in compact */}
          {!isCompact && (
            <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4">
              {service.description}
            </p>
          )}

          {/* Price — shown inline for compact/no-image */}
          {(isCompact || !hasImage) && (
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xl font-bold text-brand-accent">{service.price}</span>
              {service.priceNote && (
                <span className="text-[11px] text-muted">{service.priceNote}</span>
              )}
            </div>
          )}

          {/* Price note — below image */}
          {hasImage && !isCompact && service.priceNote && (
            <p className="text-[11px] text-muted mb-3 -mt-2">{service.priceNote}</p>
          )}

          {/* Features List */}
          {!isCompact && service.features.length > 0 && (
            <ul className="space-y-2 mb-5">
              {service.features.slice(0, maxFeatures).map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted">
                  <svg className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{feat}</span>
                </li>
              ))}
              {service.features.length > maxFeatures && (
                <li className="text-xs text-muted/60 pl-6">
                  +{service.features.length - maxFeatures} more
                </li>
              )}
            </ul>
          )}

          {/* CTA Button */}
          <div className="mt-auto pt-2">
            <Link
              href={href}
              className={`
                group/btn flex items-center justify-center gap-2 w-full rounded-brand font-medium
                transition-all duration-300
                ${isFeatured
                  ? 'py-3.5 bg-gradient-to-r from-brand-accent to-brand-accent/80 text-black text-sm font-bold hover:from-brand-accent/90 hover:to-brand-accent/70 shadow-lg shadow-brand-accent/20 hover:shadow-brand-accent/30'
                  : 'py-3 bg-white/5 border border-white/10 text-[var(--color-text)] text-sm hover:bg-white/10 hover:border-white/20'
                }
              `}
            >
              <span>{isCompact ? 'Details' : isFeatured ? 'Get Started' : 'Learn More'}</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ── Bottom Accent Line ── */}
        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}
