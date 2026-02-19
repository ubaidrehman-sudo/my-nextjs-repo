import { projects } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return {};
    }

    return {
        title: project.title,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: Props) {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen pb-20">
            {/* Header Image or Gradient */}
            <div className="relative w-full h-[400px] mb-12 bg-[var(--background-elevated)] border-b border-[var(--border)] overflow-hidden">
                {project.image ? (
                    <>
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent opacity-50" />
                    </>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--background-elevated)] to-[var(--background)] flex items-center justify-center p-6">
                        <div className="text-center">
                            <span className="text-9xl font-bold text-[var(--foreground-muted)] opacity-10">
                                {project.title.substring(0, 2).toUpperCase()}
                            </span>
                        </div>
                        {/* Decorative accent lines */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 blur-3xl rounded-full translate-x-20 -translate-y-20" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--accent)]/5 blur-3xl rounded-full -translate-x-20 translate-y-20" />
                    </div>
                )}
            </div>

            {/* Header Content */}
            <div className="max-w-7xl mx-auto px-4 mb-16">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--foreground-muted)] bg-[var(--background-elevated)] border border-[var(--border)] rounded-full hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 group shadow-sm hover:shadow-md"
                >
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Projects
                </Link>

                <div className="max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-[var(--foreground)] mb-6 leading-tight">
                        {project.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-[var(--foreground-muted)] leading-relaxed">
                        {project.description}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Problem Statement */}
                    {project.problemStatement && (
                        <section className="animate-fade-in-up">
                            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 flex items-center gap-3">
                                <span className="w-8 h-1 bg-[var(--accent)] rounded-full"></span>
                                The Challenge
                            </h2>
                            <div className="prose prose-invert prose-lg text-[var(--foreground-muted)] leading-relaxed">
                                <p>{project.problemStatement}</p>
                            </div>
                        </section>
                    )}

                    {/* Long Description (if available) */}
                    {project.longDescription && (
                        <section className="animate-fade-in-up delay-100">
                            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 flex items-center gap-3">
                                <span className="w-8 h-1 bg-[var(--accent)] rounded-full"></span>
                                Overview
                            </h2>
                            <div className="prose prose-invert prose-lg text-[var(--foreground-muted)] leading-relaxed">
                                <p>{project.longDescription}</p>
                            </div>
                        </section>
                    )}

                    {/* Highlights used as a generic features list if available */}
                    {project.highlights && project.highlights.length > 0 && (
                        <section className="animate-fade-in-up delay-200">
                            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-[var(--accent)] rounded-full"></span>
                                Key Features
                            </h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.highlights.map((highlight, index) => (
                                    <li key={index} className="flex items-start gap-3 p-4 bg-[var(--background-soft)] border border-[var(--border)] rounded-lg">
                                        <svg className="w-6 h-6 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-[var(--foreground-muted)]">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Role & Metadata */}
                    <div className="p-6 bg-[var(--background-soft)] border border-[var(--border)] rounded-xl space-y-6">
                        {project.role && (
                            <div>
                                <h3 className="text-sm font-medium text-[var(--foreground-muted)] uppercase tracking-wider mb-2">My Role</h3>
                                <p className="text-lg font-semibold text-[var(--foreground)]">{project.role}</p>
                            </div>
                        )}

                        <div>
                            <h3 className="text-sm font-medium text-[var(--foreground-muted)] uppercase tracking-wider mb-3">Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span key={tech} className="px-3 py-1 bg-[var(--background-elevated)] border border-[var(--border)] text-[var(--foreground)] text-sm rounded-md">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-[var(--border)] flex flex-col gap-3">
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--accent)] text-black font-semibold rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
                                >
                                    Visit Live Site
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
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--background-elevated)] text-[var(--foreground)] border border-[var(--border)] font-medium rounded-lg hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                                >
                                    View Source Code
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
