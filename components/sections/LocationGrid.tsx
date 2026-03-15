'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { locations as allLocations, locationUrl } from '@/lib/config';
import { fadeUp, stagger } from '@/lib/animations';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/cinematic/ScrollReveal';
import { GlassmorphicCard } from '@/components/cinematic/GlassmorphicCard';
import type { Location } from '@/lib/types';

interface LocationGridProps {
  locations?: Location[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function LocationGrid({
  locations = allLocations,
  title,
  subtitle,
  className = '',
}: LocationGridProps) {
  return (
    <section className={`py-20 ${className}`}>
      <Container>
        {(title || subtitle) && (
          <ScrollReveal className="mb-12 text-center">
            {title && (
              <h2 className="font-heading text-3xl font-bold sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-lg text-muted">{subtitle}</p>
            )}
          </ScrollReveal>
        )}

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {locations.map((location) => (
            <motion.div key={location.slug} variants={fadeUp}>
              <GlassmorphicCard className="flex h-full flex-col gap-4 p-6">
                <h3 className="font-heading text-xl font-semibold text-[var(--color-text)]">
                  {location.name}
                </h3>
                <p className="flex-1 text-sm text-muted line-clamp-3">
                  {location.description}
                </p>
                {location.county && (
                  <p className="text-xs text-muted">
                    {location.county} County
                  </p>
                )}
                <div className="mt-auto pt-2">
                  <Button asChild variant="primary" className="w-full">
                    <Link href={locationUrl(location)}>View Services</Link>
                  </Button>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
