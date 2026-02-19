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
        <section className="min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-20 right-20 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl animate-pulse-glow" />
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Column: Portrait + Name */}
                    <motion.div
                        className="lg:col-span-5 flex flex-col items-center lg:items-start"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="relative w-72 h-80 md:w-96 md:h-[500px] mb-8 group">
                            {/* Abstract/Image Container */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--background-elevated)] to-[var(--background-soft)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                                {aboutMe.avatar ? (
                                    <Image
                                        src={aboutMe.avatar}
                                        alt={aboutMe.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--background-elevated)] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent" />
                                        <span className="text-9xl font-serif text-[var(--foreground-muted)] opacity-20 select-none">
                                            {aboutMe.name.substring(0, 1)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            {/* Decorative border frame */}
                            <div className="absolute -inset-4 border border-[var(--border)] rounded-3xl -z-10 bg-transparent opacity-50" />
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold font-serif text-[var(--foreground)] tracking-tight leading-none text-center lg:text-left">
                            {aboutMe.name.split(' ').map((word, i) => (
                                <span key={i} className="block">{word}</span>
                            ))}
                        </h1>
                    </motion.div>

                    {/* Right Column: Bio + Actions */}
                    <motion.div
                        className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <h2 className="text-xl md:text-2xl text-[var(--accent)] font-medium mb-6 uppercase tracking-widest">
                            {aboutMe.title}
                        </h2>

                        <p className="text-lg md:text-xl text-[var(--foreground-muted)] leading-relaxed mb-10 max-w-2xl">
                            {aboutMe.bio}
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <button
                                onClick={() => setIsVideoOpen(true)}
                                className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-bold rounded-full hover:bg-[var(--accent)] transition-all duration-300 flex items-center gap-3 group shadow-lg shadow-[var(--foreground)]/10 hover:shadow-[var(--accent)]/20"
                            >
                                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                    <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                                Intro Video
                            </button>

                            <a
                                href="/resume.pdf" // Placeholder path
                                className="px-8 py-4 border border-[var(--border)] bg-[var(--background-elevated)] text-[var(--foreground)] font-medium rounded-full hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 shadow-sm hover:shadow-[var(--accent)]/10"
                            >
                                Download Resume
                            </a>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Video Modal Overlay */}
            {isVideoOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    onClick={() => setIsVideoOpen(false)}
                >
                    <div
                        className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-[var(--border)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute top-4 right-4 text-white hover:text-[var(--accent)] z-10 p-2 bg-black/50 rounded-full"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Placeholder for Video Player */}
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
