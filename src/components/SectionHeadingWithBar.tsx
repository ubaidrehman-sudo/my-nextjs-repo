'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionHeadingWithBarProps {
    title: string;
    subtitle?: string;
    level?: 1 | 2;
    className?: string;
    subtitleClassName?: string;
}

export default function SectionHeadingWithBar({
    title,
    subtitle,
    level = 2,
    className = '',
    subtitleClassName = '',
}: SectionHeadingWithBarProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });
    const Tag = level === 1 ? 'h1' : 'h2';

    return (
        <div ref={ref} className={className}>
            <Tag className={`font-bold text-[var(--text-primary)] ${level === 1 ? 'text-4xl' : 'text-3xl'}`}>
                {title}
            </Tag>
            <motion.span
                className="mt-2 block h-[2px] w-full rounded-full origin-left section-heading-underline"
                style={{ background: 'var(--gradient-primary)' }}
                initial={{ opacity: 0, scaleX: 0.5 }}
                animate={isInView ? { opacity: 0.7, scaleX: 1 } : { opacity: 0, scaleX: 0.5 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            />
            {subtitle && (
                <p className={`text-[var(--text-secondary)] mt-1 ${subtitleClassName}`}>{subtitle}</p>
            )}
        </div>
    );
}
