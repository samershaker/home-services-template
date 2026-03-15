/**
 * JSON-LD structured data generators.
 * Outputs valid Schema.org markup for Google rich results.
 */

import { business, services, seo, contact, absoluteUrl } from '../config';
import type { Service, Location } from '../types';

export function localBusinessJsonLd(location?: Location) {
  const areaServed = location
    ? { '@type': 'City', name: location.name }
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': absoluteUrl(location ? `/en/locations/${location.slug}` : '/en'),
    name: business.name,
    description: business.description,
    url: seo.domain,
    telephone: business.phone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: 'US',
    },
    ...(areaServed && { areaServed }),
    ...(business.founded && { foundingDate: String(business.founded) }),
    sameAs: Object.values(business.social).filter(Boolean),
  };
}

export function serviceJsonLd(service: Service, location?: Location) {
  const locationText = location ? ` in ${location.name}` : '';

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': absoluteUrl(
      location
        ? `/en/services/${service.slug}/${location.slug}`
        : `/en/services/${service.slug}`
    ),
    name: `${service.name}${locationText}`,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: business.name,
      telephone: business.phone,
    },
    ...(location && {
      areaServed: { '@type': 'City', name: location.name },
    }),
    offers: {
      '@type': 'Offer',
      price: service.price.replace(/[^0-9.]/g, '') || undefined,
      priceCurrency: 'USD',
      description: service.priceNote,
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

/**
 * Renders JSON-LD as a <script> tag for embedding in pages.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
