/**
 * Centralized metadata generation.
 * Every page calls these helpers — no hardcoded titles or descriptions anywhere.
 */

import type { Metadata } from 'next';
import { business, seo, absoluteUrl } from '../config';
import type { Service, Location } from '../types';

export function baseMetadata(): Metadata {
  return {
    metadataBase: new URL(seo.domain),
    title: {
      default: seo.defaultTitle,
      template: seo.titleTemplate,
    },
    description: seo.defaultDescription,
    authors: [{ name: business.name }],
    creator: business.name,
    publisher: business.name,
    openGraph: {
      type: 'website',
      locale: seo.locale,
      url: seo.domain,
      siteName: business.name,
      title: seo.defaultTitle,
      description: seo.defaultDescription,
      images: [{ url: seo.ogImage, width: 1200, height: 630, alt: business.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.defaultTitle,
      description: seo.defaultDescription,
    },
    alternates: {
      canonical: seo.domain,
    },
  };
}

export function serviceMetadata(service: Service, location?: Location): Metadata {
  const locationText = location ? ` in ${location.name}` : '';
  const title = `${service.name}${locationText}`;
  const description = `${service.description}${locationText}. ${business.tagline}. Call ${business.phone} today.`;
  const url = location
    ? absoluteUrl(`/en/services/${service.slug}/${location.slug}`)
    : absoluteUrl(`/en/services/${service.slug}`);

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${business.name}`,
      description,
      url,
      type: 'website',
    },
    alternates: {
      canonical: url,
    },
  };
}

export function locationMetadata(location: Location): Metadata {
  const title = `${business.name} in ${location.name}`;
  const description = `${location.description} Call ${business.phone} for service in ${location.name}.`;
  const url = absoluteUrl(`/en/locations/${location.slug}`);

  return {
    title,
    description,
    openGraph: {
      title: `${title}`,
      description,
      url,
      type: 'website',
    },
    alternates: {
      canonical: url,
    },
  };
}

export function contactMetadata(): Metadata {
  const title = `Contact ${business.name}`;
  const description = `Get in touch with ${business.name}. Call ${business.phone} or visit us at ${business.address.city}, ${business.address.state}.`;
  const url = absoluteUrl('/en/contact');

  return {
    title,
    description,
    openGraph: { title, description, url, type: 'website' },
    alternates: { canonical: url },
  };
}
