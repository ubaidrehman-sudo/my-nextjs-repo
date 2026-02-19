import { experiences, education, reviews } from '@/lib/data';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import ReviewCard from '@/components/ReviewCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Experience',
    description: 'My professional experience, education, and recommendations',
};

export default function ExperiencePage() {
    const educationItems = education.filter((e) => e.type === 'education');
    const certifications = education.filter((e) => e.type === 'certification');

    return (
        <div className="max-w-4xl mx-auto px-4 py-16 pt-32">
            <h1 className="text-4xl font-bold mb-12">Experience</h1>

            {/* Work Experience */}
            <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                    <span className="h-px bg-gradient-to-r from-transparent to-[var(--border)] flex-grow reverse"></span>
                    <h2 className="text-3xl font-bold text-[var(--foreground)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] bg-clip-text text-transparent">
                        Work Experience
                    </h2>
                    <span className="h-px bg-gradient-to-r from-[var(--border)] to-transparent flex-grow"></span>
                </div>
                <ExperienceTimeline experiences={experiences} />
            </section>

            {/* Education */}
            <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                    <span className="h-px bg-gradient-to-r from-transparent to-[var(--border)] flex-grow reverse"></span>
                    <h2 className="text-3xl font-bold text-[var(--foreground)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] bg-clip-text text-transparent">
                        Education
                    </h2>
                    <span className="h-px bg-gradient-to-r from-[var(--border)] to-transparent flex-grow"></span>
                </div>
                <div className="space-y-8 relative pl-4">
                    {/* Timeline Line */}
                    <div className="absolute left-[27px] top-2 bottom-2 w-px bg-[var(--border)]" />

                    {educationItems.map((edu, index) => (
                        <div
                            key={edu.id}
                            className="relative pl-12 group"
                            style={{ animation: `fadeIn 0.5s ease-out ${index * 0.1}s both` }}
                        >
                            <span className="absolute left-[23px] top-2 w-[9px] h-[9px] rounded-full bg-[var(--background)] border-2 border-[var(--accent)] group-hover:bg-[var(--accent)] transition-colors duration-300 z-10" />

                            <div className="bg-[var(--background-elevated)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300">
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
                <section className="mb-16">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="h-px bg-gradient-to-r from-transparent to-[var(--border)] flex-grow reverse"></span>
                        <h2 className="text-3xl font-bold text-[var(--foreground)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] bg-clip-text text-transparent">
                            Certifications
                        </h2>
                        <span className="h-px bg-gradient-to-r from-[var(--border)] to-transparent flex-grow"></span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {certifications.map((cert) => (
                            <div
                                key={cert.id}
                                className="bg-[var(--background-elevated)] border border-[var(--border)] p-5 rounded-xl hover:border-[var(--accent)] transition-all duration-300 group flex justify-between items-center"
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
                <div className="flex items-center gap-4 mb-8">
                    <span className="h-px bg-gradient-to-r from-transparent to-[var(--border)] flex-grow reverse"></span>
                    <h2 className="text-3xl font-bold text-[var(--foreground)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] bg-clip-text text-transparent">
                        Recommendations
                    </h2>
                    <span className="h-px bg-gradient-to-r from-[var(--border)] to-transparent flex-grow"></span>
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
