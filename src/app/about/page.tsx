import { aboutMe } from '@/lib/data';
import { Metadata } from 'next';
import SectionHeadingWithBar from '@/components/SectionHeadingWithBar';
import Link from 'next/link';
import { FiGlobe, FiCheckCircle, FiHeart } from 'react-icons/fi';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
    title: 'About',
    description: `Learn more about ${aboutMe.name}, a ${aboutMe.title}`,
};

export default function AboutPage() {
    return (
        <>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 pt-24 sm:pt-28 md:pt-32">
                <SectionHeadingWithBar
                    label="Who I Am"
                    title="About Me"
                    subtitle="My story, approach, and what drives my work"
                    level={1}
                    className="mb-8 sm:mb-10 md:mb-12"
                />

                <div className="space-y-10 sm:space-y-12 md:space-y-16">
                    {/* Story Section */}
                    {aboutMe.story && aboutMe.story.length > 0 && (
                        <section>
                        <div className="space-y-6">
                            {aboutMe.story.map((paragraph, index) => (
                                <p key={index} className="text-base text-[var(--text-secondary)] leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                        <div className="mt-8">
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                download="Ubaid_ur_Rehman_Resume.pdf"
                                className="btn-secondary inline-flex items-center gap-2"
                            >
                                Download Resume
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </a>
                        </div>
                    </section>
                )}

                {/* Values Grid */}
                {aboutMe.values && aboutMe.values.length > 0 && (
                    <section>
                        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-4 sm:mb-6 flex items-center gap-3">
                            <FiCheckCircle className="w-6 h-6 text-[var(--accent)]" />
                            Core Values
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {aboutMe.values.map((value, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border border-[var(--border-muted)] bg-[var(--bg-section)] hover:border-[var(--accent)] hover:shadow-[var(--shadow-surface)] transition-all"
                                >
                                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" aria-hidden />
                                    <span className="text-[var(--text-primary)] font-medium">{value}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Interests Pills */}
                {aboutMe.interests && aboutMe.interests.length > 0 && (
                    <section>
                        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-4 sm:mb-6 flex items-center gap-3">
                            <FiHeart className="w-6 h-6 text-[var(--accent)]" />
                            Interests & Focus Areas
                        </h2>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {aboutMe.interests.map((interest, index) => (
                                <span
                                    key={index}
                                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[var(--border-muted)] bg-[var(--bg-section)] text-[var(--text-secondary)] text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-default"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Work Style & Remote Framing */}
                <section className="rounded-xl border border-[var(--border-muted)] bg-[var(--bg-section-muted)] p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                        <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                            <FiGlobe className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent)]" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-1.5 sm:mb-2">
                                Work Style
                            </h2>
                            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                                {aboutMe.workStyle || `Remote-first and globally distributed. Based in ${aboutMe.location}, collaborating with teams worldwide.`}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Quick Link to Experience */}
                <section className="rounded-xl border border-[var(--border-muted)] bg-[var(--bg-section)] p-4 sm:p-6 hover:border-[var(--accent)] hover:shadow-[var(--shadow-surface)] transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-1.5 sm:mb-2">
                                Professional Timeline
                            </h2>
                            <p className="text-[var(--text-secondary)] text-sm">
                                View my complete work history, education, and certifications
                            </p>
                        </div>
                        <Link
                            href="/experience"
                            className="btn-secondary inline-flex items-center gap-2 shrink-0 self-start sm:self-auto"
                        >
                            View Experience
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </section>
                </div>
            </div>
            <ContactSection />
        </>
    );
}
