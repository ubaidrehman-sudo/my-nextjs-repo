'use client';

import { AboutMe } from '@/lib/types';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeroSectionProps {
    aboutMe: AboutMe;
}

export default function HeroSection({ aboutMe }: HeroSectionProps) {

    return (
        <section className="min-h-screen flex items-center pt-20 pb-4 overflow-hidden bg-[var(--bg-section-muted)]">
            <div className="max-w-7xl mx-auto px-4 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] items-center gap-8 lg:gap-14">

                    {/* ── Left column ── */}
                    <motion.div
                        className="flex flex-col items-center lg:items-start text-center lg:text-left order-1 py-2"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
                    >
                        {aboutMe.status && (
                            <div
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-strong)] bg-[var(--background-soft)] text-[var(--text-secondary)] font-medium text-xs uppercase tracking-wider mb-5"
                                aria-label={`Status: ${aboutMe.status}`}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" aria-hidden />
                                {aboutMe.status}
                            </div>
                        )}

                        {/* C1: Tagline-style headline with accent word */}
                        {aboutMe.tagline && aboutMe.taglineAccentWord ? (
                            <h1
                                className="font-sans font-extrabold text-[var(--foreground)] tracking-tight leading-tight"
                                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', letterSpacing: '-0.03em' }}
                            >
                                {aboutMe.tagline}{' '}
                                <span className="text-[var(--accent)]">{aboutMe.taglineAccentWord}</span>
                            </h1>
                        ) : (
                            <h1
                                className="font-sans font-extrabold text-[var(--foreground)] tracking-tight leading-none whitespace-nowrap"
                                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', letterSpacing: '-0.03em' }}
                            >
                                {aboutMe.name}
                            </h1>
                        )}

                        <p className="text-lg md:text-xl font-semibold text-[var(--foreground-muted)] mt-3">
                            {aboutMe.title}
                        </p>

                        {/* C2: Bio with optional emphasis */}
                        {aboutMe.bioLead && aboutMe.bioEmphasis && aboutMe.bioRest ? (
                            <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed mt-3 max-w-lg">
                                {aboutMe.bioLead}{' '}
                                <strong className="font-semibold text-[var(--text-primary)]">{aboutMe.bioEmphasis}</strong>{' '}
                                {aboutMe.bioRest}
                            </p>
                        ) : (
                            <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed mt-3 max-w-lg">
                                {aboutMe.bio}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-6">
                            <a
                                href={`mailto:${aboutMe.email}`}
                                className="btn-primary inline-flex items-center gap-2 px-6 py-3"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Let&apos;s Connect
                            </a>
                            <a
                                href="/resume.pdf"
                                className="btn-secondary inline-flex items-center gap-2 px-6 py-3"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download CV
                            </a>
                        </div>

                    </motion.div>

                    {/* ── Right column: image ── */}
                    <motion.div
                        className="flex justify-center lg:justify-end order-2"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className="relative w-72 h-80 md:w-[340px] md:h-[400px] group">
                            <div
                                className="absolute inset-0 rounded-2xl overflow-hidden border border-[var(--border-muted)] transition-all duration-300 group-hover:border-[var(--border-strong)]"
                                style={{
                                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
                                    transitionProperty: 'border-color, transform, box-shadow',
                                    transitionDuration: '300ms',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.2)';
                                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.15)';
                                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                                }}
                            >
                                {aboutMe.avatar ? (
                                    <Image
                                        src={aboutMe.avatar}
                                        alt={aboutMe.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[var(--background-elevated)] to-[var(--background-soft)]">
                                        <span className="text-9xl font-sans font-bold text-[var(--foreground-muted)] opacity-10 select-none">
                                            {aboutMe.name.substring(0, 1)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
