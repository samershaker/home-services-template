'use client';

import { motion } from 'framer-motion';
import { services as allServices } from '@/lib/config';
import { stagger } from '@/lib/animations';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/cinematic/ScrollReveal';
import { ServiceCard } from './ServiceCard';
import type { Service, Location } from '@/lib/types';

interface ServiceGridProps {
  services?: Service[];
  location?: Location;
  columns?: 2 | 3;
  variant?: 'default' | 'compact' | 'featured';
  title?: string;
  subtitle?: string;
  className?: string;
}

export function ServiceGrid({
  services = allServices,
  location,
  columns = 3,
  variant = 'default',
  title,
  subtitle,
  className = '',
}: ServiceGridProps) {
  const gridCols =
    columns === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

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
          className={`grid gap-6 ${gridCols}`}
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              location={location}
              variant={variant}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
