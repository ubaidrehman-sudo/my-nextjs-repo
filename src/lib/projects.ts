import { projects } from './data';
import { Project, ProjectTag } from './types';

export const PROJECT_TAG_LABELS: Record<ProjectTag, string> = {
    ai: 'AI & GenAI',
    'multi-tenant': 'Multi-tenant SaaS',
    regulated: 'Regulated domains',
};

/** Lower priority number first, then featured first. */
export const sortedProjects: Project[] = [...projects].sort((a, b) => {
    if (a.priority !== b.priority) {
        return (a.priority || 999) - (b.priority || 999);
    }
    if (a.featured !== b.featured) {
        return a.featured ? -1 : 1;
    }
    return 0;
});

/** The case study after this one, looping back to the first. */
export function getNextProject(slug: string): Project | undefined {
    const index = sortedProjects.findIndex((p) => p.slug === slug);
    if (index === -1 || sortedProjects.length < 2) return undefined;
    return sortedProjects[(index + 1) % sortedProjects.length];
}
