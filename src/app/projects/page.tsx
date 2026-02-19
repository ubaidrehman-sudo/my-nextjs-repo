import { projects } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';
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
            <div className="mb-12">
                <h1 className="text-5xl font-bold mb-4 text-[var(--foreground)]">Projects</h1>
                <p className="text-lg text-[var(--foreground-muted)] max-w-2xl">
                    A collection of my work, ranging from full-stack applications to experimental UI designs.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProjects.map((project, index) => (
                    <div
                        key={project.id}
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
