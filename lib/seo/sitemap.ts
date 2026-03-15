/**
 * Sitemap generation from config.
 * Automatically creates entries for all pages based on services × locations.
 */

import type { MetadataRoute } from 'next';
import {
  services,
  locations,
  features,
  absoluteUrl,
} from '../config';

export function generateSitemapEntries(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Homepage
  entries.push({
    url: absoluteUrl('/en'),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1,
  });

  // Service pages
  for (const service of services) {
    entries.push({
      url: absoluteUrl(`/en/services/${service.slug}`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  }

  // Location pages
  if (features.locationPages) {
    for (const location of locations) {
      entries.push({
        url: absoluteUrl(`/en/locations/${location.slug}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  // Service × Location matrix pages
  if (features.serviceLocationPages) {
    for (const service of services) {
      for (const location of locations) {
        entries.push({
          url: absoluteUrl(`/en/services/${service.slug}/${location.slug}`),
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    }
  }

  // Contact page
  entries.push({
    url: absoluteUrl('/en/contact'),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  });

  return entries;
}
