'use client';

import { HeroReveal } from '@/components/cinematic/HeroReveal';
import { ScrollReveal } from '@/components/cinematic/ScrollReveal';
import { ParallaxImage } from '@/components/cinematic/ParallaxImage';
import {
  ServiceGrid,
  ServicesCarousel,
  TrustSection,
  ReviewsWidget,
  CTABanner,
  LocationGrid,
  ContactSection,
  EmergencyBanner,
} from '@/components/sections';
import { business, features, contact } from '@/lib/config';

/**
 * Homepage — Cinematic, config-driven, section-composable.
 *
 * Every section checks its feature flag. Disable in site.config.ts
 * and the section vanishes — no code changes needed.
 */
export default function HomePage() {
  return (
    <>
      {/* ═══ Hero: Full-viewport cinematic reveal ═══ */}
      <HeroReveal
        ctaPrimary={{ label: `Call ${contact.phone}`, href: contact.phoneHref }}
        ctaSecondary={{ label: 'Our Services', href: '#services' }}
      />

      {/* ═══ Trust Signals: Stats that build credibility ═══ */}
      <section className="section-padding">
        <TrustSection />
      </section>

      {/* ═══ Services Carousel: Visual, swipeable ═══ */}
      {features.servicesCarousel && (
        <section className="py-16 md:py-24 overflow-hidden">
          <ScrollReveal>
            <div className="max-w-7xl mx-auto px-6 mb-12">
              <p className="text-sm font-medium text-brand-accent uppercase tracking-wider mb-3">
                What We Do
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
            </div>
            <ServicesCarousel />
          </ScrollReveal>
        </section>
      )}

      {/* ═══ Services Grid: Detailed cards ═══ */}
      <section id="services" className="section-padding">
        <ScrollReveal>
          <ServiceGrid
            title={features.servicesCarousel ? undefined : 'Our Services'}
            subtitle={
              features.servicesCarousel
                ? undefined
                : `Professional solutions from ${business.name}`
            }
            columns={3}
          />
        </ScrollReveal>
      </section>

      {/* ═══ Parallax Break ═══ */}
      {features.parallaxImages && (
        <ParallaxImage
          src="/images/generated/parallax-tools.jpg"
          alt="Professional equipment"
          intensity="medium"
          overlay="bottom"
          className="h-[50vh]"
        />
      )}

      {/* ═══ CTA Banner ═══ */}
      <CTABanner
        title="Ready to Get Started?"
        subtitle={`${business.name} is here to help. Same-day service available.`}
        variant="gradient"
      />

      {/* ═══ Reviews ═══ */}
      {features.googleReviews && (
        <section className="section-padding">
          <ScrollReveal>
            <ReviewsWidget />
          </ScrollReveal>
        </section>
      )}

      {/* ═══ Locations ═══ */}
      {features.locationPages && (
        <section id="areas" className="section-padding">
          <ScrollReveal>
            <div className="max-w-7xl mx-auto px-6 mb-12">
              <p className="text-sm font-medium text-brand-accent uppercase tracking-wider mb-3">
                Service Areas
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">
                Areas We Serve
              </h2>
            </div>
            <LocationGrid />
          </ScrollReveal>
        </section>
      )}

      {/* ═══ Second Parallax Break ═══ */}
      {features.parallaxImages && (
        <ParallaxImage
          src="/images/generated/parallax-duct.jpg"
          alt="Service in progress"
          intensity="subtle"
          overlay="full"
          className="h-[40vh]"
        />
      )}

      {/* ═══ Contact ═══ */}
      <section id="contact" className="section-padding">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <p className="text-sm font-medium text-brand-accent uppercase tracking-wider mb-3">
              Get In Touch
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">Contact Us</h2>
          </div>
          <ContactSection />
        </ScrollReveal>
      </section>

      {/* ═══ Emergency Banner (fixed, bottom) ═══ */}
      <EmergencyBanner />
    </>
  );
}
