'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from './SectionLabel';

interface SectionHeadingWithBarProps {
    title: string;
    subtitle?: string;
    label?: string;
    level?: 1 | 2;
    className?: string;
    subtitleClassName?: string;
    underlineWidth?: 'text' | 'full';
}

export default function SectionHeadingWithBar({
    title,
    subtitle,
    label,
    level = 2,
    className = '',
    subtitleClassName = '',
    underlineWidth = 'text',
}: SectionHeadingWithBarProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });
    const Tag = level === 1 ? 'h1' : 'h2';

    return (
        <div ref={ref} className={className}>
            {label && (
                <div className="mb-3">
                    <SectionLabel text={label} size="section" />
                </div>
            )}
            {underlineWidth === 'text' ? (
                <>
                    <div className="w-fit max-w-full">
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
                    </div>
                    {subtitle && (
                        <p className={`text-[var(--text-secondary)] mt-3 ${subtitleClassName}`}>{subtitle}</p>
                    )}
                </>
            ) : (
                <>
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
                        <p className={`text-[var(--text-secondary)] mt-3 ${subtitleClassName}`}>{subtitle}</p>
                    )}
                </>
            )}
        </div>
    );
}
