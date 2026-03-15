'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { features, contact } from '@/lib/config';
import { fadeUp } from '@/lib/animations';

export function EmergencyBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (!features.emergencyBanner || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-red-600 text-white shadow-lg"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3 text-sm font-medium sm:text-base">
            <span className="animate-pulse text-lg">🚨</span>
            <span>
              24/7 Emergency Service —{' '}
              <a
                href={contact.phoneHref}
                className="underline underline-offset-2 hover:no-underline"
              >
                Call Now: {contact.phone}
              </a>
            </span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Dismiss emergency banner"
          >
            ✕
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
