'use client';

import { AboutMe } from '@/lib/types';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
    aboutMe: AboutMe;
}

export default function HeroSection({ aboutMe }: HeroSectionProps) {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <section className="min-h-[100vh] flex items-center pt-[calc(5rem+24px)] pb-12 overflow-hidden bg-[var(--bg-section-muted)]">
            {/* Background: slow animated gradient mesh */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="hero-bg-mesh" aria-hidden />
            </div>

            <div className="max-w-7xl mx-auto px-4 w-full">
                {/* Two-column: 40% left / 60% right; stack on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] lg:min-h-[calc(100vh-5rem-24px-3rem)] items-center gap-12 lg:gap-16">
                    {/* Left Column (40%): Image card — restored richer styling */}
                    <motion.div
                        className="flex justify-center lg:justify-start order-2 lg:order-1"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className="relative w-72 h-80 md:w-96 md:h-[420px] group">
                            <div
                                className="absolute inset-0 rounded-2xl overflow-hidden border border-[var(--border-muted)] shadow-xl transition-all duration-300 group-hover:border-[var(--accent)] group-hover:-translate-y-2 group-hover:shadow-[var(--shadow-teal)]"
                            >
                                {aboutMe.avatar ? (
                                    <>
                                        <Image
                                            src={aboutMe.avatar}
                                            alt={aboutMe.name}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                        {/* Subtle gradient overlay for warmth */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--background-elevated)]/20 via-transparent to-[var(--accent)]/5" />
                                    </>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[var(--background-elevated)] to-[var(--background-soft)] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent" />
                                        <span className="text-9xl font-serif text-[var(--foreground-muted)] opacity-20 select-none">
                                            {aboutMe.name.substring(0, 1)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            {/* Decorative outer frame */}
                            <div className="absolute -inset-4 border border-[var(--border)] rounded-3xl -z-10 bg-transparent opacity-50" />
                        </div>
                    </motion.div>

                    {/* Right Column (60%): Name, Title, Statement, Buttons — subtle teal gradient behind text */}
                    <motion.div
                        className="relative flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2 p-6 lg:p-8 rounded-2xl lg:-ml-4 pt-2"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
                    >
                        {/* Name with subtle teal glow — upper-left, shapeless, diffuses down-right like reference */}
                        <div className="relative overflow-visible">
                            <div
                                className="absolute -left-4 -top-6 -bottom-6 right-1/2 pointer-events-none overflow-visible"
                                aria-hidden
                            >
                                <div
                                    className="absolute w-full h-full"
                                    style={{
                                        background: 'radial-gradient(ellipse 120% 100% at 15% 20%, rgba(20,184,166,0.08), rgba(20,184,166,0.03) 45%, transparent 65%)',
                                        filter: 'blur(28px)',
                                    }}
                                />
                            </div>
                            <h1
                                className="relative font-bold font-serif hero-name-shimmer tracking-tight leading-tight"
                                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700 }}
                            >
                                {aboutMe.name.split(' ').map((word, i) => (
                                    <span key={i} className="block">{word}</span>
                                ))}
                            </h1>
                        </div>

                        <h2 className="text-lg md:text-xl text-[var(--foreground-muted)] font-medium mt-[12px]">
                            {aboutMe.title}
                        </h2>

                        <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mt-4 max-w-xl">
                            {aboutMe.bio}
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-6">
                            <button
                                onClick={() => setIsVideoOpen(true)}
                                className="btn-primary group/btn px-6 py-3 flex items-center gap-2"
                                aria-label="Watch intro video"
                            >
                                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover/btn:bg-white/30 transition-colors">
                                    <svg className="w-2.5 h-2.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </span>
                                Watch Video
                            </button>

                            <a
                                href="/resume.pdf"
                                className="btn-secondary inline-flex items-center gap-2 px-6 py-3"
                            >
                                Download Resume
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Video Modal Overlay */}
            {isVideoOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--foreground)]/90 backdrop-blur-sm p-4"
                    onClick={() => setIsVideoOpen(false)}
                >
                    <div
                        className="relative w-full max-w-4xl aspect-video bg-[var(--foreground)] rounded-xl overflow-hidden shadow-2xl border border-[var(--border)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute top-4 right-4 text-[var(--background)] hover:text-[var(--accent)] z-10 p-2 bg-[var(--foreground)]/50 rounded-full"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex flex-col items-center justify-center h-full text-[var(--foreground-muted)]">
                            <div className="w-20 h-20 border-2 border-[var(--border)] rounded-full flex items-center justify-center mb-4">
                                <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                            <p className="text-lg font-medium">Video Placeholder</p>
                            <p className="text-sm opacity-60">Add your video file/component here</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
