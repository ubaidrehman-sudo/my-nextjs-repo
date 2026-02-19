'use client';

import { Review } from '@/lib/types';

interface RecommendationTickerProps {
    reviews: Review[];
}

export default function RecommendationTicker({ reviews }: RecommendationTickerProps) {
    if (!reviews || reviews.length === 0) return null;

    // Duplicate content for seamless loop
    const displayReviews = [...reviews, ...reviews, ...reviews];

    return (
        <section className="py-20 border-t border-[var(--border)] overflow-hidden bg-[var(--background-soft)]">
            <div className="max-w-7xl mx-auto px-4 mb-10">
                <h2 className="text-3xl font-bold text-[var(--foreground)] text-center font-serif italic">
                    Kind Words
                </h2>
            </div>

            <div className="relative w-full flex overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--background-soft)] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--background-soft)] to-transparent z-10 pointer-events-none" />

                <div className="flex gap-8 animate-marquee w-max py-4 hover:[animation-play-state:paused] cursor-default">
                    {displayReviews.map((review, idx) => (
                        <div
                            key={`${review.id}-${idx}`}
                            className="bg-[var(--background-elevated)] border border-[var(--border)] p-8 rounded-xl min-w-[350px] max-w-[400px] flex flex-col justify-between hover:border-[var(--accent)] transition-colors group"
                        >
                            <p className="text-[var(--foreground-muted)] mb-6 leading-relaxed italic relative">
                                <span className="absolute -top-4 -left-2 text-4xl text-[var(--accent)] opacity-20">"</span>
                                {review.content}
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-[var(--accent)]/20">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-[var(--foreground)] font-bold">{review.name}</p>
                                    <p className="text-sm">
                                        <span className="text-[var(--accent)] font-medium">{review.role}</span>
                                        <span className="text-[var(--foreground-subtle)] mx-1">@</span>
                                        <span className="text-[var(--foreground-muted)] font-medium">{review.company}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
