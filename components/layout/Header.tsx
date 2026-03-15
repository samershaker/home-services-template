'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { business, contact } from '@/lib/config';
import { fadeIn, slideInRight } from '@/lib/animations';

const navLinks = [
  { label: 'Home', href: '/en' },
  { label: 'Services', href: '/en#services' },
  { label: 'Locations', href: '/en#areas' },
  { label: 'Contact', href: '/en/contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-surface)]/80 backdrop-blur-xl shadow-lg border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo / Business Name */}
          <Link href="/en" className="flex items-center gap-2">
            <span className="text-xl font-heading font-bold text-brand-primary">
              {business.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--color-text-muted)] hover:text-brand-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Phone CTA */}
          <a
            href={contact.phoneHref}
            className="hidden md:inline-flex items-center gap-2 rounded-brand bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-90 transition-opacity"
          >
            <PhoneIcon />
            {contact.phone}
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-50 flex h-10 w-10 items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-6 bg-[var(--color-text)] transition-all duration-300 ${
                  mobileOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-[var(--color-text)] transition-all duration-300 ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-[var(--color-text)] transition-all duration-300 ${
                  mobileOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed top-0 right-0 bottom-0 w-72 bg-[var(--color-surface)] z-40 flex flex-col pt-24 px-6 shadow-2xl md:hidden"
            >
              {navLinks.map((link, i) => (
                <motion.div key={link.href} variants={fadeIn} custom={i}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-lg font-medium text-[var(--color-text)] hover:text-brand-primary transition-colors border-b border-white/5"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <a
                href={contact.phoneHref}
                className="mt-8 flex items-center justify-center gap-2 rounded-brand bg-brand-primary px-5 py-3 text-base font-semibold text-white"
              >
                <PhoneIcon />
                {contact.phone}
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
