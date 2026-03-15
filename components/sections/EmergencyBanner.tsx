'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, ChevronUp, ChevronDown, AlertTriangle, Clock } from 'lucide-react';
import { features, contact, business, getEmergencyServices } from '@/lib/config';
import { ease } from '@/lib/animations';

/* ═══════════════════════════════════════════════════════
   EMERGENCY BANNER — Fixed bottom CTA with expandable services
   Animated phone icon, pulsing glow, dismiss with AnimatePresence
   Shows emergency-available services from config
   ═══════════════════════════════════════════════════════ */

export function EmergencyBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (!features.emergencyBanner || dismissed) return null;

  const emergencyServices = getEmergencyServices();

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0, transition: { duration: 0.4, ease: ease.smooth as unknown as number[] } }}
          transition={{ duration: 0.6, ease: ease.smooth as unknown as number[], delay: 1.5 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          {/* Glow effect behind banner */}
          <div className="absolute inset-0 -top-4">
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-t from-red-600/20 via-red-500/10 to-transparent blur-xl"
            />
          </div>

          {/* Expandable Services Panel */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: ease.smooth as unknown as number[] }}
                className="relative overflow-hidden bg-surface/95 backdrop-blur-2xl border-t border-white/10"
              >
                <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
                  <p className="text-xs font-mono uppercase tracking-[0.15em] text-brand-accent mb-3">
                    Emergency Services Available 24/7
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {emergencyServices.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center gap-3 rounded-brand bg-white/5 border border-white/10 px-4 py-3 transition-colors hover:bg-white/10"
                      >
                        <div className="flex-shrink-0">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--color-text)]">
                            {service.name}
                          </p>
                          <p className="text-[11px] text-muted">
                            {service.price} • Same-day available
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Banner */}
          <div className="relative bg-gradient-to-r from-red-700 via-red-600 to-red-700 border-t border-red-500/30 shadow-2xl shadow-red-900/40">
            {/* Animated border shimmer */}
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '200% 0%'],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-x-0 top-0 h-px"
              style={{
                backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                backgroundSize: '50% 100%',
              }}
            />

            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
              {/* Left: Phone icon + text */}
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Animated phone icon */}
                <motion.div
                  animate={{
                    rotate: [0, -15, 15, -10, 10, -5, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'easeInOut',
                  }}
                  className="relative"
                >
                  {/* Pulse ring */}
                  <motion.div
                    animate={{
                      scale: [1, 1.6, 1.8],
                      opacity: [0.5, 0.2, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-white/30"
                  />
                  <div className="relative w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                </motion.div>

                <div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-yellow-300" />
                    </motion.div>
                    <span className="text-sm font-bold text-white sm:text-base">
                      24/7 Emergency Service
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3 text-white/60" />
                    <span className="text-xs text-white/70">
                      {business.hours.emergency || 'Available around the clock'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Center: Phone CTA */}
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.a
                  href={contact.phoneHref}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 sm:px-6 sm:py-3 font-bold text-red-700 text-sm sm:text-base shadow-lg shadow-black/20 transition-all hover:bg-gray-100"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">Call Now:</span>
                  <span>{contact.phone}</span>
                </motion.a>

                {/* Expand toggle */}
                {emergencyServices.length > 0 && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white border border-white/10"
                    aria-label={expanded ? 'Hide emergency services' : 'Show emergency services'}
                  >
                    {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  </button>
                )}

                {/* Dismiss */}
                <button
                  onClick={() => setDismissed(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white border border-white/10"
                  aria-label="Dismiss emergency banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
