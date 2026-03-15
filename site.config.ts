import type { SiteConfig } from './lib/types';

/**
 * ============================================================
 * SITE CONFIGURATION — THE ONLY FILE YOU NEED TO EDIT
 * ============================================================
 *
 * This file defines everything about your client's business.
 * Change the values below and the entire site updates:
 * pages, SEO, sitemap, structured data, theme, and content.
 *
 * After editing, run `npm run build` to regenerate all pages.
 */

const config: SiteConfig = {
  // ─── Business Information ────────────────────────────
  business: {
    name: 'Acme Home Services',
    legalName: 'Acme Home Services LLC',
    tagline: 'Professional Home Services You Can Trust',
    description:
      'Trusted local home service professionals serving the greater metro area with reliable, affordable solutions.',
    phone: '(555) 123-4567',
    email: 'info@acmehomeservices.com',
    address: {
      street: '123 Main Street',
      city: 'San Diego',
      state: 'CA',
      zip: '92101',
    },
    hours: {
      regular: 'Mon-Fri: 8am - 6pm',
      saturday: 'Sat: 9am - 4pm',
      sunday: 'Closed',
      emergency: '24/7 Emergency Service Available',
    },
    social: {
      facebook: '',
      instagram: '',
      yelp: '',
      google: '',
      linkedin: '',
    },
    license: '', // e.g., 'CA License #12345'
    founded: 2020,
  },

  // ─── Services ────────────────────────────────────────
  services: [
    {
      id: 'service-1',
      name: 'General Repair',
      slug: 'general-repair',
      shortName: 'Repair',
      description: 'Professional repair services to keep your home systems running efficiently.',
      category: 'repair',
      price: '$150',
      priceNote: 'Starting price — final quote after inspection',
      features: [
        'Same-day service available',
        'Licensed & insured technicians',
        'Written warranty on all work',
        'Upfront transparent pricing',
      ],
      icon: 'wrench',
      emergencyAvailable: true,
      images: ['service-repair.jpg'],
    },
    {
      id: 'service-2',
      name: 'Maintenance',
      slug: 'maintenance',
      shortName: 'Maintenance',
      description: 'Preventive maintenance to extend the life of your home systems.',
      category: 'maintenance',
      price: '$120',
      priceNote: 'Annual maintenance plan available',
      features: [
        'Comprehensive system inspection',
        'Performance optimization',
        'Filter replacement included',
        'Priority scheduling for members',
      ],
      icon: 'settings',
      emergencyAvailable: false,
      images: ['service-maintenance.jpg'],
    },
    {
      id: 'service-3',
      name: 'Installation',
      slug: 'installation',
      shortName: 'Install',
      description: 'Expert installation of new equipment with full warranty coverage.',
      category: 'installation',
      price: 'Free Estimate',
      priceNote: 'Financing options available',
      features: [
        'Top-brand equipment',
        'Professional installation',
        'Extended warranty options',
        'Post-install inspection included',
      ],
      icon: 'plus-circle',
      emergencyAvailable: false,
      images: ['service-install.jpg'],
    },
  ],

  // ─── Service Locations ───────────────────────────────
  locations: [
    {
      name: 'San Diego',
      slug: 'san-diego',
      description: 'Serving San Diego with fast, reliable home services.',
      county: 'San Diego County',
      zip: '92101',
    },
    {
      name: 'La Jolla',
      slug: 'la-jolla',
      description: 'Premium home services for La Jolla residents.',
      county: 'San Diego County',
      zip: '92037',
    },
    {
      name: 'El Cajon',
      slug: 'el-cajon',
      description: 'Trusted home services in El Cajon and surrounding areas.',
      county: 'San Diego County',
      zip: '92020',
    },
  ],

  // ─── Theme & Branding ───────────────────────────────
  theme: {
    colors: {
      primary: '#2563eb',     // Main brand color (buttons, links, accents)
      secondary: '#1e40af',   // Darker shade (hover states, headers)
      accent: '#f59e0b',      // CTA / highlight color (emergency, badges)
      background: '#0a0a0a',  // Page background
      surface: '#141414',     // Card / section backgrounds
      text: '#f5f5f5',        // Primary text
      textMuted: '#a3a3a3',   // Secondary text
    },
    fonts: {
      heading: 'Geist',
      body: 'Geist',
    },
    style: 'cinematic', // 'cinematic' | 'clean' | 'bold' — controls animation intensity
    borderRadius: '0.75rem',
  },

  // ─── SEO & Meta ──────────────────────────────────────
  seo: {
    domain: 'https://acmehomeservices.com',
    titleTemplate: '%s | Acme Home Services',
    defaultTitle: 'Acme Home Services | Professional Home Services San Diego',
    defaultDescription:
      'Trusted local home service professionals. Same-day service, upfront pricing, licensed & insured.',
    ogImage: '/images/og-default.jpg',
    locale: 'en_US',
  },

  // ─── Trust Signals / Stats ───────────────────────────
  trustStats: [
    { value: '10+', label: 'Years Experience', icon: 'award' },
    { value: '500+', label: 'Jobs Completed', icon: 'check-circle' },
    { value: '4.9★', label: 'Average Rating', icon: 'star' },
    { value: '100%', label: 'Licensed & Insured', icon: 'shield' },
  ],

  // ─── Sample Reviews (replace with real ones) ────────
  reviews: [
    {
      author: 'John D.',
      rating: 5,
      text: 'Excellent service! They were on time, professional, and fixed our issue quickly. Highly recommend.',
      date: '2024-12-15',
      source: 'google' as const,
    },
    {
      author: 'Sarah M.',
      rating: 5,
      text: 'Best in the area. Fair pricing and they explained everything before starting the work.',
      date: '2024-11-20',
      source: 'google' as const,
    },
    {
      author: 'Mike R.',
      rating: 5,
      text: 'Called for an emergency and they showed up within the hour. Lifesavers!',
      date: '2024-10-08',
      source: 'yelp' as const,
    },
    {
      author: 'Lisa K.',
      rating: 4,
      text: 'Great maintenance service. Our system is running much better now. Will use again.',
      date: '2024-09-12',
      source: 'google' as const,
    },
  ],

  // ─── Feature Flags ──────────────────────────────────
  features: {
    heroVideo: false,         // Show ambient video in hero (needs /videos/hero-ambient.mp4)
    emergencyBanner: true,    // Floating emergency CTA
    googleReviews: false,     // Google Reviews widget (needs Places API key)
    servicesCarousel: true,   // Animated services carousel on homepage
    parallaxImages: true,     // Parallax scroll effects
    contactForm: true,        // Contact form on /contact
    locationPages: true,      // Generate /locations/[slug] pages
    serviceLocationPages: true, // Generate /services/[service]/[location] matrix
    animations: true,         // Scroll animations, reveals, transitions
  },
};

export default config;
