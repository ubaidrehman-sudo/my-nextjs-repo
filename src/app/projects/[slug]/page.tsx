import { projects } from '@/lib/data';
import { getNextProject } from '@/lib/projects';
import { generateSEO, generateProjectSchema } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import StatTiles from '@/components/StatTiles';
import NextProjectCard from '@/components/NextProjectCard';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return {};
    const path = `/projects/${project.slug}`;
    return {
        ...generateSEO({
            title: project.title,
            description: project.description,
            url: `${SITE_URL}${path}`,
            // Use the project's cover image when it has one, else the site-wide card.
            ...(project.image && { image: project.image }),
        }),
        alternates: { canonical: path },
    };
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) notFound();

    const nextProject = getNextProject(project.slug);

    const schema = generateProjectSchema(project);

    return (
        <div className="min-h-screen pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
            />
            <div className="max-w-5xl mx-auto px-4 pt-24 sm:pt-32">

                {/* Breadcrumbs */}
                <Breadcrumbs items={[
                    { label: 'Home', href: '/' },
                    { label: 'Projects', href: '/projects' },
                    { label: project.title },
                ]} />

                {/* Header block */}
                <div className="max-w-4xl animate-fade-in-up mb-12">
                    {/* Meta chips */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.domain && (
                            <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[var(--bg-section)] border border-[var(--border-strong)] text-[var(--text-primary)] uppercase tracking-wide">
                                {project.domain}
                            </span>
                        )}
                        {project.year && (
                            <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[var(--bg-section)] border border-[var(--border-strong)] text-[var(--text-primary)] uppercase tracking-wide">
                                {project.year}
                            </span>
                        )}
                        {project.role && (
                            <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[var(--bg-section)] border border-[var(--border-strong)] text-[var(--text-primary)] uppercase tracking-wide">
                                {project.role}
                            </span>
                        )}
                    </div>

                    {/* Title with accent dot */}
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-[var(--text-primary)] leading-tight mb-6 break-words">
                        {project.title}<span className="text-[var(--accent)]">.</span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed mb-8">
                        {project.description}
                    </p>

                    {/* CTA buttons */}
                    {(project.link || project.github) && (
                        <div className="flex flex-wrap gap-3">
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary inline-flex items-center gap-2"
                                >
                                    {project.linkLabel ?? 'View Live Site'}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary inline-flex items-center gap-2"
                                >
                                    View Source
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    )}
                </div>

                {/* Cover image */}
                {project.image && (
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-[var(--shadow-hover)] border border-[var(--border-muted)] mb-12 animate-fade-in-up">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 1280px"
                        />
                    </div>
                )}

                {/* Headline numbers (only real, sourced figures) */}
                {project.stats && project.stats.length > 0 && <StatTiles stats={project.stats} />}

                {/* Content stack */}
                <div className="space-y-8 sm:space-y-10 mb-12 sm:mb-24">

                    {/* Project Statement */}
                    {project.longDescription && (
                        <div className="animate-fade-in-up bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-2xl shadow-[var(--shadow-surface)] p-5 sm:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]">
                                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-bold text-[var(--text-primary)]">Project Statement</h2>
                            </div>
                            <p className="text-[var(--text-secondary)] leading-relaxed text-lg">{project.longDescription}</p>
                        </div>
                    )}

                    {/* Two-column row: Highlights + Challenge / Outcome */}
                    {(project.highlights?.length || project.problemStatement || project.outcome) && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in-up">
                            {/* Key Highlights */}
                            {project.highlights && project.highlights.length > 0 && (
                                <div className="lg:col-span-7 bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-2xl shadow-[var(--shadow-surface)] p-5 sm:p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]">
                                            <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-lg font-bold text-[var(--text-primary)]">Key Highlights</h2>
                                    </div>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {project.highlights.map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 p-3 bg-[var(--bg-section-muted)] rounded-xl border border-[var(--border-muted)]">
                                                <svg className="w-4 h-4 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm font-medium text-[var(--text-secondary)]">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Right column: Challenge + Outcome */}
                            {(project.problemStatement || project.outcome) && (
                                <div className="lg:col-span-5 flex flex-col gap-6">
                                    {project.problemStatement && (
                                        <div className="flex-1 bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-2xl shadow-[var(--shadow-surface)] p-6">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]">
                                                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                    </svg>
                                                </div>
                                                <h2 className="text-base font-bold text-[var(--text-primary)]">The Challenge</h2>
                                            </div>
                                            <p className="text-[var(--text-secondary)] leading-relaxed text-sm">{project.problemStatement}</p>
                                        </div>
                                    )}
                                    {project.outcome && (
                                        <div className="flex-1 bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-2xl shadow-[var(--shadow-surface)] p-6">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]">
                                                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                    </svg>
                                                </div>
                                                <h2 className="text-base font-bold text-[var(--text-primary)]">The Outcome</h2>
                                            </div>
                                            <p className="text-[var(--text-secondary)] leading-relaxed text-sm">{project.outcome}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* AI approach: what the AI does here, and where it deliberately does not */}
                    {project.aiApproach && (
                        <div className="animate-fade-in-up bg-[var(--bg-section)] border border-[var(--border-muted)] border-l-4 border-l-[var(--accent)] rounded-2xl shadow-[var(--shadow-surface)] p-5 sm:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]">
                                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 7h10v10H7V7z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-bold text-[var(--text-primary)]">AI Approach</h2>
                            </div>
                            <p className="text-[var(--text-secondary)] leading-relaxed text-base sm:text-lg">{project.aiApproach}</p>
                        </div>
                    )}

                    {/* My Contribution */}
                    {project.contributions && project.contributions.length > 0 && (
                        <div className="animate-fade-in-up bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-2xl shadow-[var(--shadow-surface)] p-5 sm:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]">
                                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-bold text-[var(--text-primary)]">My Contribution</h2>
                            </div>
                            <ul className="space-y-3">
                                {project.contributions.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)]">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Architectural Decisions */}
                    {project.architecture && project.architecture.length > 0 && (
                        <div className="animate-fade-in-up bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-2xl shadow-[var(--shadow-surface)] p-5 sm:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]">
                                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-bold text-[var(--text-primary)]">Architectural Decisions</h2>
                            </div>
                            <ul className="space-y-3">
                                {project.architecture.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)]">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Tech Stack */}
                    <div className="animate-fade-in-up bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-2xl shadow-[var(--shadow-surface)] p-5 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]">
                                <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <h2 className="text-lg font-bold text-[var(--text-primary)]">Tech Stack</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <span key={tech} className="px-3 py-1.5 bg-[var(--bg-section-muted)] border border-[var(--border-muted)] text-[var(--text-secondary)] text-sm rounded-lg font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tools */}
                    {project.tools && project.tools.length > 0 && (
                        <div className="animate-fade-in-up bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-2xl shadow-[var(--shadow-surface)] p-5 sm:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]">
                                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-bold text-[var(--text-primary)]">Tools</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.tools.map((tool) => (
                                    <span key={tool} className="px-3 py-1.5 bg-[var(--bg-section-muted)] border border-[var(--border-muted)] text-[var(--text-secondary)] text-sm rounded-lg font-medium">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Next case study */}
                {nextProject && <NextProjectCard project={nextProject} />}
            </div>
        </div>
    );
}
