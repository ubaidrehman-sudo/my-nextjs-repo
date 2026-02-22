import { experiences, education, reviews } from '@/lib/data';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import ReviewCard from '@/components/ReviewCard';
import SectionHeadingWithBar from '@/components/SectionHeadingWithBar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Experience',
    description: 'My professional experience, education, and recommendations',
};

export default function ExperiencePage() {
    const educationItems = education.filter((e) => e.type === 'education');
    const certifications = education.filter((e) => e.type === 'certification');

    return (
        <div className="max-w-4xl mx-auto px-4 py-24 pt-32">
            <SectionHeadingWithBar title="Experience" level={1} className="mb-12" />

            {/* Work Experience */}
            <section className="mb-12">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-[var(--text-primary)]">Work Experience</h2>
                    <p className="text-[var(--text-secondary)] mt-1">Professional journey and roles</p>
                </div>
                <ExperienceTimeline experiences={experiences} />
            </section>

            {/* Education */}
            <section className="mb-12">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-[var(--text-primary)]">Education</h2>
                    <p className="text-[var(--text-secondary)] mt-1">Academic background and credentials</p>
                </div>
                <div className="space-y-6">
                    {educationItems.map((edu, index) => (
                        <div
                            key={edu.id}
                            className="group relative pl-8 border-l-2 border-[color-mix(in_srgb,var(--accent)_15%,var(--border))] hover:border-[var(--accent)] transition-colors duration-300"
                            style={{ animation: `fadeIn 0.5s ease-out ${index * 0.1}s both` }}
                        >
                            <span className="absolute -left-[5px] top-6 w-[9px] h-[9px] rounded-full bg-[var(--accent)]/40 group-hover:bg-[var(--accent)] transition-colors duration-300 z-10" />

                            <div className="bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-xl p-6 shadow-[var(--shadow-surface)] hover:border-[var(--accent)] hover:shadow-[var(--shadow-hover)] transition-base">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-[var(--foreground)]">{edu.degree}</h3>
                                    <span className="text-sm font-mono text-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1 rounded-full">
                                        {edu.startDate} — {edu.endDate}
                                    </span>
                                </div>
                                <div className="text-[var(--foreground-muted)] text-lg mb-4 font-medium">{edu.institution}</div>
                                {edu.description && (
                                    <p className="text-[var(--foreground-subtle)] leading-relaxed">{edu.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Certifications */}
            {certifications.length > 0 && (
                <section className="mb-12">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-[var(--text-primary)]">Certifications</h2>
                        <p className="text-[var(--text-secondary)] mt-1">Industry certifications</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {certifications.map((cert) => (
                            <div
                                key={cert.id}
                                className="bg-[var(--bg-section)] border border-[var(--border-muted)] p-5 rounded-xl shadow-[var(--shadow-surface)] hover:border-[var(--accent)] hover:shadow-[var(--shadow-hover)] transition-base group flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">{cert.degree}</h3>
                                    <div className="text-sm text-[var(--foreground-muted)]">{cert.institution}</div>
                                </div>
                                <div className="text-xs font-mono text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-1 rounded-md border border-[var(--accent)]/20 whitespace-nowrap ml-4">
                                    {cert.startDate} {cert.endDate ? `- ${cert.endDate}` : ''}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Recommendations */}
            <section className="pb-8">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-[var(--text-primary)]">Recommendations</h2>
                    <p className="text-[var(--text-secondary)] mt-1">What colleagues and clients say about working together</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            </section>
        </div>
    );
}
