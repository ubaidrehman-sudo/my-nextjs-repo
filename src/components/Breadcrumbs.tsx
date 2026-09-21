'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <motion.nav
            aria-label="Breadcrumb"
            className="mb-8"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
            <ol className="flex items-center flex-wrap gap-1 text-sm text-[var(--text-secondary)]">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={index} className="flex items-center gap-1">
                            {index > 0 && (
                                <span className="text-[var(--text-muted)] select-none" aria-hidden="true">›</span>
                            )}
                            {isLast || !item.href ? (
                                <span
                                    className="text-[var(--text-primary)] font-medium"
                                    aria-current={isLast ? 'page' : undefined}
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="hover:text-[var(--accent)] transition-colors font-medium"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </motion.nav>
    );
}
