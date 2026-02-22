import { Review } from '@/lib/types';

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-2xl p-8 shadow-[var(--shadow-surface)] transition-base flex flex-col justify-between h-full hover:border-[var(--accent)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-0.5 group min-h-[200px]">
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
    );
}
