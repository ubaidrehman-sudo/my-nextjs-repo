import { sortedProjects } from '@/lib/projects';
import ProjectsExplorer from '@/components/ProjectsExplorer';
import SectionHeadingWithBar from '@/components/SectionHeadingWithBar';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects',
    description:
        'Case studies in multi-tenant SaaS, AI-augmented platforms and regulated-domain systems, each with the architecture decisions behind it.',
    alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 pb-16 pt-24 sm:pt-32">
            <div className="flex justify-between items-end mb-8 sm:mb-12 gap-4">
                <SectionHeadingWithBar
                    title="Projects"
                    subtitle="Case studies in multi-tenant SaaS, AI-augmented platforms, and regulated-domain systems — with the architecture decisions behind each."
                    level={1}
                    subtitleClassName="max-w-2xl"
                />
                {/* Wrapper does the hiding: .btn-secondary sets its own display, which would override `hidden`. */}
                <div className="hidden md:block shrink-0">
                    <Link
                        href="/"
                        className="btn-secondary group items-center gap-2 px-5 py-2.5 whitespace-nowrap"
                    >
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </div>

            <ProjectsExplorer projects={sortedProjects} />
        </div>
    );
}
