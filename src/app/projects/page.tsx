import { projects } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';
import SectionHeadingWithBar from '@/components/SectionHeadingWithBar';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Showcase of my web development projects and experiments.',
};

export default function ProjectsPage() {
    // Sort projects by priority (lower number = higher priority), then by featured status
    const sortedProjects = [...projects].sort((a, b) => {
        if (a.priority !== b.priority) {
            return (a.priority || 999) - (b.priority || 999);
        }
        // If priorities are equal (or undefined), featured ones come first
        if (a.featured !== b.featured) {
            return a.featured ? -1 : 1;
        }
        return 0;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 pt-32">
            <div className="flex justify-between items-end mb-12">
                <SectionHeadingWithBar
                    title="Projects"
                    subtitle="A collection of my work, ranging from full-stack applications to experimental UI designs."
                    level={1}
                    subtitleClassName="max-w-2xl"
                />
                <Link
                    href="/"
                    className="btn-secondary group px-5 py-2.5 hidden md:inline-flex"
                >
                    Back to Home
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProjects.map((project, index) => (
                    <div
                        key={project.slug}
                        className="min-w-0"
                        style={{
                            animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`
                        }}
                    >
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>
        </div>
    );
}
