import { notFound } from 'next/navigation';
import {
  getLocationBySlug,
  generateLocationParams,
  services,
  business,
  serviceUrl,
} from '@/lib/config';
import {
  locationMetadata,
  JsonLd,
  localBusinessJsonLd,
  breadcrumbJsonLd,
} from '@/lib/seo';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ScrollReveal } from '@/components/cinematic/ScrollReveal';
import { GlassmorphicCard } from '@/components/cinematic/GlassmorphicCard';
import type { Metadata } from 'next';

// ─── Static Generation ────────────────────────────────

export function generateStaticParams() {
  return generateLocationParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location: slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};
  return locationMetadata(location);
}

// ─── Page ─────────────────────────────────────────────

export default async function LocationPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  return (
    <PageWrapper>
      <JsonLd data={localBusinessJsonLd(location)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/en' },
          { name: 'Locations', url: '/en' },
          { name: location.name, url: `/en/locations/${location.slug}` },
        ])}
      />

      {/* ── Header ──────────────────────────────── */}
      <section className="section-padding">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {business.name} in {location.name}
            </h1>
            <p className="text-lg text-muted">{location.description}</p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── All Services in Location ────────────── */}
      <section className="section-padding">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-10">
            Services in {location.name}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service) => (
              <a key={service.id} href={serviceUrl(service, location)}>
                <GlassmorphicCard hover>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {service.shortName}
                    </h3>
                    <p className="text-sm text-muted mb-3 line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-brand-accent font-semibold">
                        {service.price}
                      </span>
                      {service.emergencyAvailable && (
                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                          Emergency
                        </span>
                      )}
                    </div>
                  </div>
                </GlassmorphicCard>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section className="section-padding text-center">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-4">
            Serving {location.name} &amp; Surrounding Areas
          </h2>
          <p className="text-muted mb-8">
            Fast, reliable service from licensed professionals.
          </p>
          <a
            href={`tel:${business.phone.replace(/[^+\d]/g, '')}`}
            className="inline-flex items-center gap-2 bg-brand-accent text-black font-bold px-8 py-4 rounded-brand text-lg hover:brightness-110 transition"
          >
            📞 Call {business.phone}
          </a>
        </ScrollReveal>
      </section>
    </PageWrapper>
  );
}
