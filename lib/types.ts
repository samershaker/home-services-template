/**
 * Core type definitions for the Home Services Template.
 * All config, components, and utilities reference these types.
 */

// ─── Business ─────────────────────────────────────────

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface BusinessHours {
  regular: string;
  saturday: string;
  sunday: string;
  emergency?: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  yelp?: string;
  google?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  nextdoor?: string;
}

export interface Business {
  name: string;
  legalName?: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: Address;
  hours: BusinessHours;
  social: SocialLinks;
  license?: string;
  founded?: number;
}

// ─── Services ─────────────────────────────────────────

export type ServiceCategory =
  | 'repair'
  | 'maintenance'
  | 'installation'
  | 'diagnostic'
  | 'emergency'
  | 'consultation'
  | 'other';

export interface Service {
  id: string;
  name: string;
  slug: string;
  shortName: string;
  description: string;
  category: ServiceCategory;
  price: string;
  priceNote?: string;
  features: string[];
  icon: string;
  emergencyAvailable: boolean;
  images: string[];
}

// ─── Locations ────────────────────────────────────────

export interface Location {
  name: string;
  slug: string;
  description: string;
  county?: string;
  zip?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// ─── Theme ────────────────────────────────────────────

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
}

export type StyleVariant = 'cinematic' | 'clean' | 'bold';

export interface Theme {
  colors: ThemeColors;
  fonts: {
    heading: string;
    body: string;
  };
  style: StyleVariant;
  borderRadius: string;
}

// ─── SEO ──────────────────────────────────────────────

export interface SEOConfig {
  domain: string;
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  ogImage: string;
  locale: string;
}

// ─── Feature Flags ────────────────────────────────────

export interface Features {
  heroVideo: boolean;
  emergencyBanner: boolean;
  googleReviews: boolean;
  servicesCarousel: boolean;
  parallaxImages: boolean;
  contactForm: boolean;
  locationPages: boolean;
  serviceLocationPages: boolean;
  animations: boolean;
}

// ─── Site Config (root) ───────────────────────────────

export interface SiteConfig {
  business: Business;
  services: Service[];
  locations: Location[];
  theme: Theme;
  seo: SEOConfig;
  features: Features;
}

// ─── Page Generation ──────────────────────────────────

export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface PageParams {
  service?: string;
  location?: string;
}

// ─── Component Props ──────────────────────────────────

export interface SectionProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ServiceCardProps {
  service: Service;
  location?: Location;
  variant?: 'default' | 'compact' | 'featured';
}

export interface HeroProps {
  title?: string;
  subtitle?: string;
  showVideo?: boolean;
  showEmergency?: boolean;
}
