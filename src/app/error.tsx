'use client';

import Link from 'next/link';
import SectionLabel from '@/components/SectionLabel';

export default function Error({
    reset,
}: Readonly<{
    error: Error & { digest?: string };
    reset: () => void;
}>) {
    return (
        <div className="max-w-3xl mx-auto px-4 pt-32 pb-24 text-center">
            <SectionLabel text="Something went wrong" />
            <h1 className="mt-6 font-serif text-4xl sm:text-6xl font-bold text-[var(--text-primary)] leading-tight">
                That didn&apos;t load<span className="text-[var(--accent)]">.</span>
            </h1>
            <p className="mt-5 text-lg text-[var(--text-secondary)] leading-relaxed">
                An unexpected error stopped this page from rendering. You can try again, or head back home.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button type="button" onClick={reset} className="btn-primary inline-flex items-center justify-center px-6 py-3 min-h-11">
                    Try again
                </button>
                <Link href="/" className="btn-secondary inline-flex items-center justify-center px-6 py-3 min-h-11">
                    Back to home
                </Link>
            </div>
        </div>
    );
}
