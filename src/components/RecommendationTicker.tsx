'use client';

import Link from 'next/link';
import { Review } from '@/lib/types';
import SectionHeadingWithBar from './SectionHeadingWithBar';

interface RecommendationTickerProps {
  reviews: Review[];
  /** When set, shows a link below the testimonials (e.g. home page subset → full list on Experience) */
  viewAllHref?: string;
  viewAllLabel?: string;
}

export default function RecommendationTicker({ reviews, viewAllHref, viewAllLabel }: RecommendationTickerProps) {
  if (!reviews || reviews.length === 0) return null;

  const useGrid = reviews.length < 4;

  return (
    <section className="py-24 mb-12 bg-[var(--bg-section-muted)]">
      <div className="max-w-7xl mx-auto px-4">
        {/* 6.1: Left heading, subtext - z-10 + bg so it stays visible when cards hover/lift */}
        <div className="mb-12 relative z-10 bg-[var(--bg-section-muted)]">
          <SectionHeadingWithBar
            title="Kind Words"
            subtitle="What colleagues and clients say about working together"
          />
        </div>

        {/* 6.3: Grid when <5, otherwise calm horizontal scroll */}
        {useGrid ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* 6.4: Optional large quote icon at 3–4% opacity */}
            <div
              className="absolute -top-4 -left-2 text-[10rem] text-[var(--accent)] opacity-[0.035] pointer-events-none select-none font-serif"
              aria-hidden
            >
              "
            </div>
            {reviews.map((review) => (
              <div
                key={review.id}
                className="relative bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-2xl p-8 shadow-[var(--shadow-surface)] transition-base flex flex-col justify-between hover:border-[var(--accent)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-0.5 group min-h-[200px]"
              >
                <p className="text-[var(--text-secondary)] leading-relaxed italic mb-6 relative z-10">
                  &ldquo;{review.content}&rdquo;
                </p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[var(--border-muted)]">
                  <div className="w-10 h-10 rounded-full bg-[var(--bg-section-muted)] border border-[var(--border-muted)] flex items-center justify-center font-bold text-[var(--text-primary)] group-hover:border-[var(--accent)] transition-base flex-shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">{review.name}</p>
                    <p className="text-sm text-[var(--text-muted)]">
                      {review.role} · {review.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative w-full overflow-hidden pt-2 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="flex gap-6 pb-4 animate-marquee w-max">
              {[...reviews, ...reviews].map((review, index) => (
                <div
                  key={`${review.id}-${index}`}
                  className="flex-shrink-0 w-[min(350px,85vw)] bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-2xl p-8 shadow-[var(--shadow-surface)] transition-base flex flex-col justify-between hover:border-[var(--accent)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-0.5 group min-h-[200px]"
                >
                  <p className="text-[var(--text-secondary)] leading-relaxed italic mb-6">
                    &ldquo;{review.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[var(--border-muted)]">
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-section-muted)] border border-[var(--border-muted)] flex items-center justify-center font-bold text-[var(--text-primary)] flex-shrink-0 group-hover:border-[var(--accent)] transition-base">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-[var(--text-primary)]">{review.name}</p>
                      <p className="text-sm text-[var(--text-muted)]">
                        {review.role} · {review.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewAllHref && viewAllLabel && (
          <div className="text-center mt-10">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:underline underline-offset-4"
            >
              {viewAllLabel}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
