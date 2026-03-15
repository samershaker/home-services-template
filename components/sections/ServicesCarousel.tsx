'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { services, features, serviceUrl, business } from '@/lib/config';
import { fadeUp, ease } from '@/lib/animations';
import { ScrollReveal } from '@/components/cinematic/ScrollReveal';
import type { Service } from '@/lib/types';

/* ═══════════════════════════════════════════════════════
   SERVICES CAROUSEL — Auto-scrolling horizontal carousel
   Drag-to-scroll, momentum, hover pause, dot navigation
   Config-driven from @/lib/config services
   ═══════════════════════════════════════════════════════ */

interface CarouselCardProps {
  service: Service;
  index: number;
}

function CarouselCard({ service, index }: CarouselCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const href = serviceUrl(service);
  const hasImage = service.images && service.images.length > 0;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  const spotlightBg = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      rgba(var(--color-accent-rgb, 245, 158, 11), 0.15),
      transparent 80%
    )
  `;

  return (
    <Link href={href} className="block">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: index * 0.08,
          ease: ease.smooth as unknown as number[],
        }}
        onMouseMove={handleMouseMove}
        className="group relative flex-shrink-0 w-[85vw] sm:w-[380px] md:w-[420px] lg:w-[460px] snap-center"
      >
        {/* Mouse-tracking spotlight */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-brand opacity-0 transition duration-300 group-hover:opacity-100 z-10"
          style={{ background: spotlightBg }}
        />

        {/* Card */}
        <div className="relative h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-brand border border-white/10 bg-white/[0.02] backdrop-blur-2xl transition-all duration-500 group-hover:bg-white/[0.04] group-hover:border-brand-accent/20">
          {/* Top specular highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent z-20" />

          {/* Image or gradient background */}
          <div className="absolute inset-0">
            {hasImage ? (
              <Image
                src={`/images/services/${service.images[0]}`}
                alt={service.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 85vw, (max-width: 768px) 380px, (max-width: 1024px) 420px, 460px"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-primary/20 via-surface to-surface" />
            )}
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-transparent to-transparent" />
          </div>

          {/* Price badge */}
          <div className="absolute top-4 right-4 z-10">
            <div className="px-3 py-1.5 rounded-full bg-brand-accent/90 backdrop-blur-md shadow-lg">
              <span className="text-xs font-bold text-black">{service.price}</span>
            </div>
          </div>

          {/* Emergency indicator */}
          {service.emergencyAvailable && (
            <div className="absolute top-4 left-4 z-10">
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-lg shadow-red-500/50"
              />
            </div>
          )}

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
            {/* Tag line */}
            <motion.div className="mb-3 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-accent">
                {business.name}
              </span>
              <div className="h-[1px] w-8 bg-brand-accent/40" />
            </motion.div>

            {/* Title */}
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2 transition-transform duration-500 group-hover:-translate-y-1">
              {service.name}
            </h3>

            {/* Subtitle */}
            <p className="text-sm text-gray-300 line-clamp-2 transition-all duration-500 group-hover:text-gray-200">
              {service.description}
            </p>

            {/* CTA hint */}
            <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-accent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <span>Learn More</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export function ServicesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Don't render if feature flag is off
  if (!features.servicesCarousel) return null;

  const allServices = services;

  // Track scroll position for active index
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.scrollWidth / allServices.length;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(newIndex, 0), allServices.length - 1));
  }, [allServices.length]);

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const nextIndex = (activeIndex + 1) % allServices.length;
      const cardWidth = scrollRef.current.scrollWidth / allServices.length;
      scrollRef.current.scrollTo({
        left: nextIndex * cardWidth,
        behavior: 'smooth',
      });
      setActiveIndex(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, isPaused, allServices.length]);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.scrollWidth / allServices.length;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <ScrollReveal direction="up" className="text-center">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent mb-3">
            Our Expertise
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text)]">
            Services We{' '}
            <span className="text-brand-accent">Master</span>
          </h2>
        </ScrollReveal>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 md:px-12 pb-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Left spacer for centering */}
        <div className="flex-shrink-0 w-[calc((100vw-85vw)/2-1.5rem)] sm:w-[calc((100vw-380px)/2-1.5rem)] md:w-[calc((100vw-420px)/2-1.5rem)] lg:w-[calc((100vw-460px)/2-1.5rem)]" />

        {allServices.map((service, index) => (
          <CarouselCard key={service.id} service={service} index={index} />
        ))}

        {/* Right spacer */}
        <div className="flex-shrink-0 w-[calc((100vw-85vw)/2-1.5rem)] sm:w-[calc((100vw-380px)/2-1.5rem)] md:w-[calc((100vw-420px)/2-1.5rem)] lg:w-[calc((100vw-460px)/2-1.5rem)]" />
      </div>

      {/* Dot Navigation */}
      <div className="flex justify-center gap-2 mt-8">
        {allServices.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'bg-brand-accent w-6'
                : 'bg-white/20 w-2 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Hide scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
