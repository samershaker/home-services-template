import type { Config } from 'tailwindcss';

/**
 * Tailwind config — references CSS variables set by ThemeProvider.
 * Actual color values come from site.config.ts → ThemeProvider.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          accent: 'var(--color-accent)',
        },
        surface: 'var(--color-surface)',
        background: 'var(--color-background)',
      },
      textColor: {
        DEFAULT: 'var(--color-text)',
        muted: 'var(--color-text-muted)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      borderRadius: {
        brand: 'var(--border-radius)',
      },
    },
  },
  plugins: [],
};

export default config;
