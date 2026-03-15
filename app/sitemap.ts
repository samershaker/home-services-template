import { MetadataRoute } from 'next';
import { generateSitemapEntries } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  return generateSitemapEntries();
}
