'use client';

import dynamic from 'next/dynamic';
import { HeroReveal } from '@/components/cinematic/HeroReveal';
import { ParallaxImage } from '@/components/cinematic/ParallaxImage';
import { ScrollReveal } from '@/components/cinematic/ScrollReveal';
import { TrustSection } from '@/components/sections/TrustSection';
import { ServiceGrid } from '@/components/sections/ServiceGrid';
import { CTABanner } from '@/components/sections/CTABanner';
import { LocationGrid } from '@/components/sections/LocationGrid';
import { EmergencyBanner } from '@/components/sections/EmergencyBanner';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { business, features, contact } from '@/lib/config';

// Lazy-load below-fold heavy components
const ServicesCarousel = dynamic(
  () => import('@/components/sections/ServicesCarousel').then((mod) => mod.ServicesCarousel),
  { ssr: true }
);
const ReviewsWidget = dynamic(
  () => import('@/components/sections/ReviewsWidget').then((mod) => mod.ReviewsWidget),
  { ssr: true }
);

/* ═══════════════════════════════════════════════════════
   HOME PAGE — Cinematic, scroll-driven experience.
   12 sections with parallax breaks, staggered reveals,
   and feature-flag gating for optional modules.
   ═══════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          1. HERO — Full viewport cinematic reveal
          ═══════════════════════════════════════════ */}
      <HeroReveal
        tagline={`${business.address.city}'s Trusted Home Service Professionals`}
        title={business.name}
        subtitle={business.description}
        ctaPrimary={{
          label: `📞 Call Now: ${contact.phone}`,
          href: contact.phoneHref,
        }}
        ctaSecondary={{
          label: 'View Our Services →',
          href: '#services',
        }}
      />

      {/* ═══════════════════════════════════════════
          2. TRUST SIGNALS — Stats strip below hero
          ═══════════════════════════════════════════ */}
      <div className="relative z-10 -mt-20">
        <TrustSection
          className="bg-gradient-to-b from-transparent to-background/50"
        />
      </div>

      {/* ═══════════════════════════════════════════
          3. SERVICES CAROUSEL — Auto-scrolling showcase
          (feature-flagged: servicesCarousel)
          ═══════════════════════════════════════════ */}
      {features.servicesCarousel && (
        <ScrollReveal direction="up" className="section-padding">
          <ServicesCarousel />
        </ScrollReveal>
      )}

      {/* ═══════════════════════════════════════════
          4. PARALLAX BREAK — Atmospheric divider
          ═══════════════════════════════════════════ */}
      {features.parallaxImages && (
        <div className="py-4 px-6">
          <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden">
            <ParallaxImage
              src="/images/generated/parallax-tools.jpg"
              alt="Professional equipment and tools"
              intensity="medium"
              overlay="bottom"
              blurOnScroll
              className="h-[40vh] md:h-[50vh]"
            />
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          5. SERVICE GRID — Full cards grid
          ═══════════════════════════════════════════ */}
      <section id="services" className="section-padding bg-gradient-to-b from-transparent via-surface/30 to-transparent">
        <ScrollReveal direction="up">
          <ServiceGrid
            title="Our Services"
            subtitle={`Professional solutions from ${business.name} — quality workmanship, every time.`}
          />
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════
          6. CTA BANNER — "Call us today" divider
          ═══════════════════════════════════════════ */}
      <CTABanner
        title="Ready to Get Started?"
        subtitle={`${business.name} is here for you — from routine maintenance to urgent repairs. No hidden fees. Satisfaction guaranteed.`}
        ctaText={`📞 Call Now: ${contact.phone}`}
        ctaHref={contact.phoneHref}
        secondaryText="Request Free Estimate"
        secondaryHref="#contact"
        variant="glass"
      />

      {/* ═══════════════════════════════════════════
          7. LOCATIONS — Service areas grid
          (feature-flagged: locationPages)
          ═══════════════════════════════════════════ */}
      {features.locationPages && (
        <section className="section-padding bg-gradient-to-b from-transparent via-brand-primary/[0.03] to-transparent">
          <ScrollReveal direction="up">
            <LocationGrid
              title="Areas We Serve"
              subtitle={`${business.name} proudly serves these communities and surrounding areas.`}
            />
          </ScrollReveal>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          8. REVIEWS — Google reviews widget
          (feature-flagged: googleReviews)
          ═══════════════════════════════════════════ */}
      {features.googleReviews && (
        <ScrollReveal direction="up" className="section-padding">
          <ReviewsWidget />
        </ScrollReveal>
      )}

      {/* ═══════════════════════════════════════════
          9. PARALLAX BREAK 2 — Second atmospheric divider
          ═══════════════════════════════════════════ */}
      {features.parallaxImages && (
        <div className="py-4 px-6">
          <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden">
            <ParallaxImage
              src="/images/generated/parallax-work.jpg"
              alt={`${business.name} professionals at work`}
              intensity="subtle"
              overlay="full"
              caption={`Serving ${business.address.city} since ${business.founded ?? 'day one'}`}
              className="h-[35vh] md:h-[45vh]"
            />
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          10. FAQ — Common questions accordion
          ═══════════════════════════════════════════ */}
      <section className="section-padding bg-gradient-to-b from-transparent via-surface/20 to-transparent">
        <ScrollReveal direction="up">
          <FAQSection />
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════
          11. CONTACT — Form + business info
          ═══════════════════════════════════════════ */}
      <section id="contact" className="section-padding">
        <ScrollReveal direction="up">
          <ContactSection />
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════
          12. EMERGENCY BANNER — Fixed bottom CTA
          ═══════════════════════════════════════════ */}
      <EmergencyBanner />
    </>
  );
}
