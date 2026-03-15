import { notFound } from 'next/navigation';
import {
  getServiceBySlug,
  getLocationBySlug,
  generateAllServiceLocationParams,
  services,
  business,
  serviceUrl,
} from '@/lib/config';
import {
  serviceMetadata,
  JsonLd,
  serviceJsonLd,
  breadcrumbJsonLd,
} from '@/lib/seo';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ScrollReveal } from '@/components/cinematic/ScrollReveal';
import { GlassmorphicCard } from '@/components/cinematic/GlassmorphicCard';
import type { Metadata } from 'next';

// ─── Static Generation ────────────────────────────────

export function generateStaticParams() {
  return generateAllServiceLocationParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; location: string }>;
}): Promise<Metadata> {
  const { service: sSlug, location: lSlug } = await params;
  const service = getServiceBySlug(sSlug);
  const location = getLocationBySlug(lSlug);
  if (!service || !location) return {};
  return serviceMetadata(service, location);
}

// ─── Page ─────────────────────────────────────────────

export default async function ServiceLocationPage({
  params,
}: {
  params: Promise<{ service: string; location: string }>;
}) {
  const { service: sSlug, location: lSlug } = await params;
  const service = getServiceBySlug(sSlug);
  const location = getLocationBySlug(lSlug);
  if (!service || !location) notFound();

  const otherServices = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <PageWrapper>
      <JsonLd data={serviceJsonLd(service, location)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/en' },
          { name: service.name, url: `/en/services/${service.slug}` },
          {
            name: `${service.shortName} in ${location.name}`,
            url: `/en/services/${service.slug}/${location.slug}`,
          },
        ])}
      />

      {/* ── Header ──────────────────────────────── */}
      <section className="section-padding">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {service.name} in {location.name}
            </h1>
            <p className="text-lg text-muted mb-4">
              {service.description} Serving {location.name}
              {location.county ? `, ${location.county}` : ''}.
            </p>
            <div className="flex items-center justify-center gap-4 text-xl font-semibold">
              <span className="text-gradient">{service.price}</span>
              {service.priceNote && (
                <span className="text-sm text-muted">— {service.priceNote}</span>
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Features ────────────────────────────── */}
      <section className="section-padding">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-10">
            What's Included
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {service.features.map((feature, i) => (
              <GlassmorphicCard key={i} hover>
                <div className="p-6 flex items-start gap-3">
                  <span className="text-brand-accent text-xl">✓</span>
                  <span className="text-lg">{feature}</span>
                </div>
              </GlassmorphicCard>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── Why Choose Us in [Location] ─────────── */}
      <section className="section-padding">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Why {location.name} Trusts {business.name}
            </h2>
            <p className="text-muted text-lg mb-8">{location.description}</p>
            <div className="grid sm:grid-cols-3 gap-6">
              <GlassmorphicCard>
                <div className="p-6 text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-semibold mb-1">Fast Response</h3>
                  <p className="text-sm text-muted">
                    Same-day service in {location.name}
                  </p>
                </div>
              </GlassmorphicCard>
              <GlassmorphicCard>
                <div className="p-6 text-center">
                  <div className="text-3xl mb-2">🛡️</div>
                  <h3 className="font-semibold mb-1">Licensed & Insured</h3>
                  <p className="text-sm text-muted">
                    Full coverage for your peace of mind
                  </p>
                </div>
              </GlassmorphicCard>
              <GlassmorphicCard>
                <div className="p-6 text-center">
                  <div className="text-3xl mb-2">💰</div>
                  <h3 className="font-semibold mb-1">Upfront Pricing</h3>
                  <p className="text-sm text-muted">
                    No surprises — know the cost before we start
                  </p>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Other Services in Location ──────────── */}
      <section className="section-padding">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-10">
            More Services in {location.name}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {otherServices.map((s) => (
              <a
                key={s.id}
                href={serviceUrl(s, location)}
                className="glass rounded-brand p-6 text-center hover:bg-white/10 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">{s.shortName}</h3>
                <p className="text-sm text-muted">{s.price}</p>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section className="section-padding text-center">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-4">
            Need {service.shortName} in {location.name}?
          </h2>
          <p className="text-muted mb-8">
            Call now for fast, professional service.
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
