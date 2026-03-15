# Home Services Website Template

White-label, config-driven website template for home service businesses. Built with Next.js 16, Tailwind CSS, and Framer Motion.

**One config file. Unlimited businesses.**

## Quick Start

```bash
# 1. Clone/fork this template
gh repo fork samershaker/home-services-template --clone

# 2. Install dependencies
npm install

# 3. Edit site.config.ts with your client's info
#    - Business name, phone, email, address
#    - Services (name, price, features)
#    - Locations (service areas)
#    - Theme colors
#    - Feature flags

# 4. Add client photos to public/images/

# 5. Run locally
npm run dev

# 6. Deploy to Vercel
vercel
```

## Architecture

```
site.config.ts              ← THE ONLY FILE YOU EDIT PER CLIENT
├── business info, services, locations, theme, SEO, features

lib/
├── types.ts                ← TypeScript interfaces
├── config.ts               ← Config loader + URL/lookup helpers
├── animations.ts           ← Framer Motion presets
└── seo/
    ├── metadata.ts         ← Page meta generation
    ├── structured-data.ts  ← JSON-LD (LocalBusiness, Service, Breadcrumb)
    └── sitemap.ts          ← Auto-generated from services × locations

components/
├── ui/                     ← Design system (Button, Badge, Container, Icon)
├── layout/                 ← ThemeProvider, Header, Footer, PageWrapper
├── sections/               ← Hero, ServiceGrid, ServiceCard, LocationGrid,
│                              EmergencyBanner, ContactSection
└── cinematic/              ← ScrollReveal, ParallaxImage, GlassmorphicCard

app/
├── page.tsx                ← Root redirect → /en
├── en/page.tsx             ← Homepage
├── en/contact/page.tsx     ← Contact
├── en/services/[service]/  ← Service pages
├── en/services/[service]/[location]/ ← Service × Location matrix
└── en/locations/[location]/ ← Location pages
```

## Auto-Generated Pages

With 3 services and 3 locations in config, you get:
- 1 homepage
- 3 service pages
- 3 location pages
- 9 service×location pages (3×3)
- 1 contact page
- **= 17 SEO-optimized pages**

Scale it: 7 services × 15 locations = **122 pages** automatically.

## Feature Flags

Toggle features on/off in `site.config.ts`:

```typescript
features: {
  heroVideo: false,           // Ambient video background
  emergencyBanner: true,      // Floating "Call Now" banner
  googleReviews: false,       // Google Reviews widget
  servicesCarousel: true,     // Animated carousel
  parallaxImages: true,       // Scroll parallax effects
  contactForm: true,          // Contact form
  locationPages: true,        // /locations/[slug] pages
  serviceLocationPages: true, // /services/[service]/[location] matrix
  animations: true,           // Scroll animations
}
```

## Theming

Colors and fonts are driven by CSS variables, set via `site.config.ts`:

```typescript
theme: {
  colors: {
    primary: '#2563eb',    // Buttons, links
    secondary: '#1e40af',  // Hover states
    accent: '#f59e0b',     // CTAs, emergency
    background: '#0a0a0a', // Page bg
    surface: '#141414',    // Card bg
    text: '#f5f5f5',       // Body text
    textMuted: '#a3a3a3',  // Secondary text
  },
  style: 'cinematic',     // 'cinematic' | 'clean' | 'bold'
}
```

## New Client Workflow

1. Fork this repo → `client-name`
2. Edit `site.config.ts`
3. Drop photos in `public/images/`
4. `npm run build` (verify all pages generate)
5. Deploy to Vercel
6. Connect domain (see website-launch playbook)
7. Submit sitemap to Google Search Console

## Tech Stack

- **Next.js 16** — Static export, App Router
- **TypeScript** — Full type safety
- **Tailwind CSS** — Utility-first styling with CSS variable theme
- **Framer Motion** — Cinematic scroll animations
- **Lucide React** — Icon library
- **Vercel** — Zero-config deployment

## License

Private template — iMakeMVPs agency use.
