'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);
    const pathname = usePathname();
    const isHome = pathname === '/';

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isDetailPage = (pathname.startsWith('/blog/') && pathname !== '/blog') ||
        (pathname.startsWith('/projects/') && pathname !== '/projects');
    const isTransparent = !isScrolled && isDetailPage;

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Skills', href: '/#skills' },
        { name: 'Experience', href: '/#experience' },
        { name: 'Work', href: '/projects' },
        { name: 'Blog', href: '/blog' },
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!isHome || !href.startsWith('/#')) return;

        e.preventDefault();
        const id = href.replace('/#', '');
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)] py-4'
                : isDetailPage
                    ? 'bg-gradient-to-b from-black/60 to-transparent py-6'
                    : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center relative">
                <Link href="/" className={`text-xl font-bold font-serif tracking-tight group ${isTransparent ? 'text-white' : 'text-[var(--foreground)]'}`}>
                    John<span className={`transition-colors ${isTransparent ? 'text-[var(--accent)]' : 'text-[var(--accent)] group-hover:text-[var(--foreground)]'}`}>.</span>Doe
                </Link>

                <ul className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <li key={link.name} className="relative">
                                <Link
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    onMouseEnter={() => setHoveredPath(link.href)}
                                    onMouseLeave={() => setHoveredPath(null)}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors z-10 block ${isActive
                                        ? 'text-[var(--accent)]'
                                        : isTransparent
                                            ? 'text-white/80 hover:text-white'
                                            : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                                        }`}
                                >
                                    {link.name}

                                    {/* Active Dot */}
                                    {isActive && (
                                        <motion.span
                                            layoutId="active-dot"
                                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--accent)] rounded-full"
                                        />
                                    )}

                                    {/* Hover Pill Background */}
                                    {hoveredPath === link.href && (
                                        <motion.span
                                            layoutId="hover-pill"
                                            className="absolute inset-0 bg-[var(--accent)]/10 rounded-full -z-10"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                    {/* GitHub Icon */}
                    <li className="relative ml-2">
                        <a
                            href="https://github.com/johndoe" // Replace with actual GitHub URL from data if available, or keep generic for now
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${isTransparent ? 'text-white/80 hover:text-white' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'} transition-colors p-2 block`}
                            aria-label="GitHub Profile"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </li>
                </ul>

                {/* Mobile Menu Button (Placeholder) */}
                <button className={`md:hidden ${isTransparent ? 'text-white' : 'text-[var(--foreground)]'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            {/* Scroll Progress Bar */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)] origin-left z-50"
                style={{ scaleX }}
            />
        </nav>
    );
}
