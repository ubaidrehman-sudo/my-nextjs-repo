import { Review } from '@/lib/types';

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="bg-[var(--background-elevated)] border border-[var(--border)] p-8 rounded-xl hover:border-[var(--accent)] transition-all duration-300 group h-full flex flex-col justify-between">
            <div className="relative">
                <span className="absolute -top-4 -left-2 text-4xl text-[var(--accent)] opacity-20">"</span>
                <p className="text-[var(--foreground-muted)] mb-6 leading-relaxed italic relative z-10 pl-4">
                    {review.content}
                </p>
            </div>

            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[var(--border)]">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-[var(--accent)]/20 flex-shrink-0">
                    {review.name.charAt(0)}
                </div>
                <div>
                    <div className="font-bold text-[var(--foreground)]">{review.name}</div>
                    <div className="text-sm text-[var(--foreground-subtle)]">
                        <span className="text-[var(--accent)]">{review.role}</span> at {review.company}
                    </div>
                </div>
            </div>
        </div>
    );
}
