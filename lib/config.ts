/**
 * Config loader — single import point for all site configuration.
 * Every file imports from here, never directly from site.config.ts.
 */

import siteConfig from '../site.config';
import type { SiteConfig, Service, Location, Business, Theme, SEOConfig, Features, TrustStat, Review } from './types';

// ─── Validated Config Export ──────────────────────────

export const config: SiteConfig = siteConfig;
export const business: Business = config.business;
export const services: Service[] = config.services;
export const locations: Location[] = config.locations;
export const theme: Theme = config.theme;
export const seo: SEOConfig = config.seo;
export const features: Features = config.features;
export const trustStats: TrustStat[] = config.trustStats ?? [];
export const reviews: Review[] = config.reviews ?? [];

// ─── Lookup Helpers ───────────────────────────────────

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getServicesByCategory(category: string): Service[] {
  return services.filter((s) => s.category === category);
}

export function getEmergencyServices(): Service[] {
  return services.filter((s) => s.emergencyAvailable);
}

// ─── URL Helpers ──────────────────────────────────────

export function serviceUrl(service: Service | string, location?: Location | string): string {
  const serviceSlug = typeof service === 'string' ? service : service.slug;
  const locationSlug = location
    ? typeof location === 'string'
      ? location
      : location.slug
    : null;

  if (locationSlug) {
    return `/en/services/${serviceSlug}/${locationSlug}`;
  }
  return `/en/services/${serviceSlug}`;
}

export function locationUrl(location: Location | string): string {
  const slug = typeof location === 'string' ? location : location.slug;
  return `/en/locations/${slug}`;
}

export function absoluteUrl(path: string): string {
  const base = seo.domain.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

// ─── Page Generation ──────────────────────────────────

export function generateAllServiceLocationParams() {
  if (!features.serviceLocationPages) return [];
  return services.flatMap((service) =>
    locations.map((location) => ({
      service: service.slug,
      location: location.slug,
    }))
  );
}

export function generateServiceParams() {
  return services.map((s) => ({ service: s.slug }));
}

export function generateLocationParams() {
  if (!features.locationPages) return [];
  return locations.map((l) => ({ location: l.slug }));
}

// ─── Contact Info ─────────────────────────────────────

export const contact = {
  phone: business.phone,
  phoneHref: `tel:${business.phone.replace(/[^+\d]/g, '')}`,
  email: business.email,
  emailHref: `mailto:${business.email}`,
  fullAddress: `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}`,
  mapsQuery: encodeURIComponent(
    `${business.name} ${business.address.street} ${business.address.city} ${business.address.state}`
  ),
};
