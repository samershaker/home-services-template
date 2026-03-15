import { notFound } from 'next/navigation';
import {
  getServiceBySlug,
  generateServiceParams,
  locations,
  features,
  business,
  contact,
  serviceUrl,
} from '@/lib/config';
import { serviceMetadata, JsonLd, serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { LocationGrid } from '@/components/sections/LocationGrid';

export const dynamicParams = false;

export function generateStaticParams() {
  return generateServiceParams();
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return serviceMetadata(service);
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <PageWrapper>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/en' },
          { name: 'Services', url: '/en' },
          { name: service.name, url: `/en/services/${service.slug}` },
        ])}
      />

      {/* Service Header */}
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-brand-primary/10 text-brand-primary mb-6">
          {service.category}
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{service.name}</h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">{service.description}</p>
      </div>

      {/* Price & Features */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="glass rounded-brand p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <p className="text-3xl font-bold text-brand-primary">{service.price}</p>
              {service.priceNote && <p className="text-muted mt-1">{service.priceNote}</p>}
            </div>
            <a
              href={contact.phoneHref}
              className="mt-4 md:mt-0 inline-flex items-center justify-center px-8 py-3 rounded-brand bg-brand-accent text-black font-semibold hover:opacity-90 transition"
            >
              Call {contact.phone}
            </a>
          </div>

          <h2 className="text-xl font-semibold mb-4">What&apos;s Included</h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="text-brand-primary mt-0.5">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {service.emergencyAvailable && (
            <p className="mt-6 text-sm text-brand-accent font-medium">
              🚨 Emergency service available — call anytime
            </p>
          )}
        </div>
      </div>

      {/* Locations served */}
      {features.serviceLocationPages && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            {service.shortName} Service Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {locations.map((loc) => (
              <a
                key={loc.slug}
                href={serviceUrl(service, loc)}
                className="glass rounded-brand p-4 text-center hover:bg-white/10 transition"
              >
                <p className="font-medium">{loc.name}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
