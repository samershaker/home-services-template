# Home Services Website Template

White-label, config-driven website template for home service businesses. Built with Next.js 16, Tailwind CSS, and Framer Motion.

**One config file. Unlimited businesses.**

## Quick Start

```bash
# 1. Clone/fork this repo
git clone https://github.com/samershaker/home-services-template.git my-client-site
cd my-client-site

# 2. Install dependencies
npm install

# 3. Edit site.config.ts with your client's info

# 4. Add client photos to public/images/

# 5. Run locally
npm run dev

# 6. Deploy to Vercel
vercel --prod
```

## How It Works

Everything about the business is defined in **one file**: `site.config.ts`

```typescript
// site.config.ts
const config: SiteConfig = {
  business: { name, phone, email, address, hours, social },
  services: [{ name, slug, price, features, ... }],
  locations: [{ name, slug, description, ... }],
  theme: { colors, fonts, style },
  seo: { domain, titleTemplate, ... },
  features: { heroVideo, emergencyBanner, googleReviews, ... },
};
```

The site auto-generates:
- **Service pages** for each service (`/en/services/general-repair`)
- **Location pages** for each area (`/en/locations/san-diego`)
- **Service × Location pages** for SEO (`/en/services/general-repair/san-diego`)
- **Sitemap** with all pages
- **Structured data** (JSON-LD) for Google rich results
- **robots.txt** optimized for search engines

## Architecture

```
site.config.ts              ← THE ONLY FILE YOU EDIT
├── lib/
│   ├── config.ts            ← Config loader + helpers
│   ├── types.ts             ← TypeScript interfaces
│   ├── animations.ts        ← Framer Motion presets
│   ├── utils.ts             ← cn() helper
│   └── seo/                 ← Metadata, structured data, sitemap
├── components/
│   ├── ui/                  ← Button, Container, Badge, Icon
│   ├── layout/              ← ThemeProvider, Header, Footer, PageWrapper
│   ├── sections/            ← Hero, ServiceGrid, ContactSection, etc.
│   └── cinematic/           ← ScrollReveal, ParallaxImage, GlassmorphicCard
├── app/
│   ├── layout.tsx           ← Root layout (theme + header/footer)
│   ├── en/page.tsx          ← Homepage
│   ├── en/contact/          ← Contact page
│   ├── en/services/[service]/          ← Service pages
│   ├── en/services/[service]/[location]/ ← Service+Location pages
│   └── en/locations/[location]/        ← Location pages
```

## New Client Setup

1. Fork this repo → `client-business-name`
2. Edit `site.config.ts`:
   - Business info (name, phone, email, address)
   - Services (name, price, features — as many as needed)
   - Locations (every area they serve)
   - Theme colors (3 colors transform the whole site)
   - SEO (domain, title template)
3. Replace placeholder images in `public/images/`
4. Deploy to Vercel
5. Connect custom domain
6. Submit sitemap to Google Search Console

## Feature Flags

Toggle features on/off in `site.config.ts`:

| Flag | Default | What It Does |
|------|---------|-------------|
| `heroVideo` | false | Ambient video in hero section |
| `emergencyBanner` | true | Fixed bottom emergency CTA |
| `googleReviews` | false | Google Reviews widget |
| `servicesCarousel` | true | Animated services carousel |
| `parallaxImages` | true | Parallax scroll effects |
| `contactForm` | true | Contact form on /contact |
| `locationPages` | true | Generate /locations/ pages |
| `serviceLocationPages` | true | Generate service×location matrix |
| `animations` | true | Scroll animations and reveals |

## Tech Stack

- **Next.js 16** — Static export for fast, free hosting
- **TypeScript** — Type-safe config and components
- **Tailwind CSS** — Utility-first styling with CSS variable theming
- **Framer Motion** — Cinematic animations
- **Lucide React** — Icon library
- **Vercel** — Zero-config deployment

## Industries This Works For

Any service business with services × locations:
- HVAC / Heating & Air
- Plumbing
- Electrical
- Landscaping
- Cleaning services
- Roofing
- Painting
- Pest control
- Auto repair
- And more...

---

Built by [iMakeMVPs](https://imakemvps.com)
