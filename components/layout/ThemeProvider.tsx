'use client';

import { theme } from '@/lib/config';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const cssVars = {
    '--color-primary': theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-accent': theme.colors.accent,
    '--color-background': theme.colors.background,
    '--color-surface': theme.colors.surface,
    '--color-text': theme.colors.text,
    '--color-text-muted': theme.colors.textMuted,
    '--font-heading': theme.fonts.heading,
    '--font-body': theme.fonts.body,
    '--border-radius': theme.borderRadius,
  } as React.CSSProperties;

  return (
    <div style={cssVars} className="min-h-screen bg-background font-body text-[var(--color-text)]">
      {children}
    </div>
  );
}
