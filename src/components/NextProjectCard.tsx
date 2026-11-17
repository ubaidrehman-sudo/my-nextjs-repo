import Link from 'next/link';
import { Project } from '@/lib/types';
import SectionLabel from './SectionLabel';

interface NextProjectCardProps {
    project: Project;
}

export default function NextProjectCard({ project }: Readonly<NextProjectCardProps>) {
    return (
        <div className="border-t border-[var(--border-strong)] mt-16 sm:mt-24 pt-12 sm:pt-16">
            <SectionLabel text="Next case study" />
            <Link
                href={`/projects/${project.slug}`}
                className="group mt-4 block rounded-2xl border border-[var(--border-muted)] bg-[var(--bg-section)] p-5 sm:p-8 transition-base hover:border-[var(--accent)] hover:shadow-[var(--shadow-hover)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
                style={{ boxShadow: 'var(--shadow-surface)' }}
            >
                <p className="text-xs uppercase tracking-wider font-medium text-[var(--text-secondary)] mb-2">
                    {[project.domain?.split(' / ')[0].split(' (')[0], project.year].filter(Boolean).join(' · ')}
                </p>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[var(--text-primary)] leading-tight group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                    <span className="text-[var(--accent)]">.</span>
                </h2>
                <p className="mt-3 text-[var(--text-secondary)] leading-relaxed line-clamp-3 max-w-3xl">
                    {project.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
                    Read the case study
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
            </Link>
            <p className="mt-6">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-1.5 min-h-11 text-sm font-medium text-[var(--accent)] hover:underline underline-offset-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    All projects
                </Link>
            </p>
        </div>
    );
}
