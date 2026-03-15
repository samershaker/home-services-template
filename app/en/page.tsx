'use client';

import { Hero } from '@/components/sections/Hero';
import { ServiceGrid } from '@/components/sections/ServiceGrid';
import { LocationGrid } from '@/components/sections/LocationGrid';
import { ContactSection } from '@/components/sections/ContactSection';
import { EmergencyBanner } from '@/components/sections/EmergencyBanner';
import { ScrollReveal } from '@/components/cinematic/ScrollReveal';
import { ParallaxImage } from '@/components/cinematic/ParallaxImage';
import { business, features } from '@/lib/config';

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      <Hero />

      {/* ── Services ─────────────────────────────── */}
      <section className="section-padding">
        <ServiceGrid
          title="Our Services"
          subtitle={`Professional solutions from ${business.name}`}
        />
      </section>

      {/* ── Parallax Break ───────────────────────── */}
      {features.parallaxImages && (
        <ParallaxImage
          src="/images/generated/parallax-tools.jpg"
          alt="Professional equipment"
          intensity="medium"
          overlay
          className="h-[50vh]"
        />
      )}

      {/* ── Locations ────────────────────────────── */}
      {features.locationPages && (
        <section className="section-padding">
          <ScrollReveal>
            <LocationGrid />
          </ScrollReveal>
        </section>
      )}

      {/* ── Contact ──────────────────────────────── */}
      <section className="section-padding">
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
      </section>

      {/* ── Emergency Banner ─────────────────────── */}
      <EmergencyBanner />
    </>
  );
}
