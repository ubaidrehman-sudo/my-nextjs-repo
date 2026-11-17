import Link from 'next/link';
import SectionLabel from '@/components/SectionLabel';

export default function NotFound() {
    return (
        <div className="max-w-3xl mx-auto px-4 pt-32 pb-24 text-center">
            <SectionLabel text="404 · Not found" />
            <h1 className="mt-6 font-serif text-4xl sm:text-6xl font-bold text-[var(--text-primary)] leading-tight">
                This page isn&apos;t here<span className="text-[var(--accent)]">.</span>
            </h1>
            <p className="mt-5 text-lg text-[var(--text-secondary)] leading-relaxed">
                The link may be old, or the page may have moved. Start from the home page or browse the case studies.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link href="/" className="btn-primary inline-flex items-center justify-center px-6 py-3 min-h-11">
                    Back to home
                </Link>
                <Link href="/projects" className="btn-secondary inline-flex items-center justify-center px-6 py-3 min-h-11">
                    View projects
                </Link>
            </div>
        </div>
    );
}
