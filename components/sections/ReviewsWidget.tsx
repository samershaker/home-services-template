'use client';

import { motion } from 'framer-motion';
import { features, business } from '@/lib/config';
import { fadeUp, stagger, ease } from '@/lib/animations';
import { GlassmorphicCard } from '@/components/cinematic/GlassmorphicCard';
import { ScrollReveal } from '@/components/cinematic/ScrollReveal';

/* ═══════════════════════════════════════════════════════
   REVIEWS WIDGET — Google Reviews display
   Glassmorphic cards, star ratings, overall rating summary
   Config-driven, placeholder data for now
   ═══════════════════════════════════════════════════════ */

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface ReviewsWidgetProps {
  className?: string;
  averageRating?: number;
  totalReviews?: number;
}

// TODO: Replace with Google Places API integration
// Use Google Places API (New) to fetch real reviews:
// GET https://places.googleapis.com/v1/places/{placeId}?fields=reviews
const placeholderReviews: Review[] = [
  {
    author: 'Michael R.',
    rating: 5,
    text: 'Incredibly professional and responsive. Our system went down during a heat wave and they came same-day. Honest pricing, quality work. Highly recommend!',
    date: '2 weeks ago',
  },
  {
    author: 'Sarah L.',
    rating: 5,
    text: 'Best experience I\'ve ever had with a home service company. They explained everything clearly, didn\'t try to upsell, and the work was flawless. Our new system is so quiet!',
    date: '1 month ago',
  },
  {
    author: 'David K.',
    rating: 5,
    text: 'Called for an emergency repair at 9pm and they answered. Fixed everything the next morning. Fair price, great service. This is how all contractors should operate.',
    date: '3 weeks ago',
  },
  {
    author: 'Jennifer M.',
    rating: 4,
    text: 'Very thorough maintenance visit. Technician took time to explain what he found and gave honest recommendations. Will definitely use them again for our next project.',
    date: '1 month ago',
  },
];

// Star rating display
function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizes[size]} ${star <= rating ? 'text-yellow-400' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// Google logo SVG
function GoogleLogo() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

// Individual review card
function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: ease.smooth as unknown as number[],
      }}
    >
      <GlassmorphicCard variant="elevated" className="p-6 h-full flex flex-col">
        {/* Header: avatar + author + Google logo */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-accent/20 to-brand-primary/20 flex items-center justify-center text-brand-accent font-heading font-bold text-sm border border-white/10">
              {review.author.charAt(0)}
            </div>
            <div>
              <p className="font-heading font-semibold text-[var(--color-text)] text-sm">
                {review.author}
              </p>
              <p className="text-xs text-muted">{review.date}</p>
            </div>
          </div>
          <GoogleLogo />
        </div>

        {/* Stars */}
        <div className="mb-3">
          <StarRating rating={review.rating} size="sm" />
        </div>

        {/* Review text */}
        <p className="text-sm text-muted leading-relaxed flex-grow">
          &ldquo;{review.text}&rdquo;
        </p>
      </GlassmorphicCard>
    </motion.div>
  );
}

export function ReviewsWidget({
  className = '',
  averageRating = 4.8,
  totalReviews = 47,
}: ReviewsWidgetProps) {
  // Don't render if feature is disabled
  if (!features.googleReviews) return null;

  return (
    <section className={`py-24 md:py-32 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-accent mb-4">
            Customer Reviews
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-[var(--color-text)]">
            What Our Customers Say About{' '}
            <span className="text-brand-accent">{business.name}</span>
          </h2>

          {/* Rating Summary Card */}
          <div className="inline-flex items-center gap-4 rounded-brand border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-4 mt-2">
            <div className="flex items-center gap-2">
              <GoogleLogo />
              <span className="text-sm text-muted">Google Reviews</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex items-center gap-3">
              <span className="font-heading text-3xl font-bold text-[var(--color-text)]">
                {averageRating.toFixed(1)}
              </span>
              <div>
                <StarRating rating={Math.round(averageRating)} size="sm" />
                <p className="text-xs text-muted mt-1">{totalReviews} reviews</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Reviews Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {placeholderReviews.map((review, i) => (
            <ReviewCard key={i} review={review} index={i} />
          ))}
        </motion.div>

        {/* CTA */}
        <ScrollReveal direction="up" delay={0.3} className="text-center">
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-brand border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-3 text-sm font-medium text-[var(--color-text)] transition-all duration-300 hover:bg-white/10 hover:border-white/20"
          >
            <GoogleLogo />
            <span>View All Reviews on Google</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
