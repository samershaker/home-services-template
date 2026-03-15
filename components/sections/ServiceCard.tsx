'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { serviceUrl } from '@/lib/config';
import { scaleIn } from '@/lib/animations';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { GlassmorphicCard } from '@/components/cinematic/GlassmorphicCard';
import type { Service, Location } from '@/lib/types';

interface ServiceCardProps {
  service: Service;
  location?: Location;
  variant?: 'default' | 'compact' | 'featured';
}

export function ServiceCard({
  service,
  location,
  variant = 'default',
}: ServiceCardProps) {
  const href = serviceUrl(service, location);
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <GlassmorphicCard
        className={`flex h-full flex-col gap-4 p-6 transition-shadow duration-300 hover:shadow-2xl ${
          isFeatured ? 'ring-2 ring-brand-accent' : ''
        }`}
      >
        {/* Header: Icon + Badges */}
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-brand bg-brand-primary/10 text-brand-primary">
            <Icon name={service.icon} className="h-6 w-6" />
          </div>
          <div className="flex gap-2">
            {isFeatured && <Badge variant="accent">Featured</Badge>}
            {service.emergencyAvailable && (
              <Badge variant="emergency">Emergency</Badge>
            )}
          </div>
        </div>

        {/* Name + Description */}
        <div>
          <h3 className="font-heading text-lg font-semibold text-[var(--color-text)]">
            {service.name}
          </h3>
          {!isCompact && (
            <p className="mt-1 text-sm text-muted line-clamp-3">
              {service.description}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-brand-accent">
            {service.price}
          </span>
          {service.priceNote && (
            <span className="text-xs text-muted">{service.priceNote}</span>
          )}
        </div>

        {/* Features list */}
        {!isCompact && service.features.length > 0 && (
          <ul className="flex flex-col gap-1.5 text-sm text-muted">
            {service.features.slice(0, isFeatured ? 6 : 4).map((feat) => (
              <li key={feat} className="flex items-start gap-2">
                <span className="mt-0.5 text-brand-accent">✓</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        <div className="mt-auto pt-4">
          <Button asChild variant="primary" className="w-full">
            <Link href={href}>
              {isCompact ? 'Details' : 'Learn More'}
            </Link>
          </Button>
        </div>
      </GlassmorphicCard>
    </motion.div>
  );
}
