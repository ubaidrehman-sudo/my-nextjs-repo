import type { MDXComponents } from 'mdx/types';

export const mdxComponents: MDXComponents = {
    h1: ({ children }) => (
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mt-10 mb-4 pb-3 border-b-2 border-[var(--accent)] flex items-center gap-3">
            <span className="w-8 h-1 bg-[var(--accent)] rounded-full shrink-0" />
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mt-8 mb-4 pb-3 border-b-2 border-[var(--accent)] flex items-center gap-3">
            <span className="w-8 h-1 bg-[var(--accent)] rounded-full shrink-0" />
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-2xl font-bold text-[var(--text-primary)] mt-6 mb-3 flex items-center gap-3">
            <span className="w-8 h-1 bg-[var(--accent)] rounded-full shrink-0" />
            {children}
        </h3>
    ),
    p: ({ children }) => (
        <p className="mb-4 leading-7 text-[var(--text-secondary)]">{children}</p>
    ),
    ul: ({ children }) => (
        <ul className="list-none mb-4 space-y-2 pl-0">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="list-none mb-4 space-y-2 pl-0">{children}</ol>
    ),
    li: ({ children }) => (
        <li className="flex items-start gap-3 text-[var(--text-secondary)] leading-7">
            <span className="w-5 h-5 rounded-full bg-[var(--accent)]/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            </span>
            {children}
        </li>
    ),
    code: ({ children, className }) => {
        const isInline = !className;

        if (isInline) {
            return (
                <code className="bg-[var(--bg-section-muted)] px-1.5 py-0.5 text-sm border border-[var(--border-muted)] rounded font-mono text-[var(--accent)]">
                    {children}
                </code>
            );
        }

        return (
            <code className={className}>
                {children}
            </code>
        );
    },
    pre: ({ children }) => (
        <pre className="bg-[var(--bg-section)] border border-[var(--border-muted)] rounded-xl p-4 overflow-x-auto mb-6 text-sm font-mono shadow-[var(--shadow-surface)]">
            {children}
        </pre>
    ),
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-[var(--accent)] pl-4 italic my-6 text-[var(--text-secondary)] bg-[var(--bg-section-muted)] py-3 pr-4 rounded-r-lg">
            {children}
        </blockquote>
    ),
    a: ({ href, children }) => (
        <a
            href={href}
            className="text-[var(--accent)] underline decoration-[var(--accent)]/40 hover:decoration-[var(--accent)] hover:text-[var(--accent-hover)] transition-all"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
            {children}
        </a>
    ),
    strong: ({ children }) => (
        <strong className="font-bold text-[var(--text-primary)]">{children}</strong>
    ),
    em: ({ children }) => (
        <em className="italic">{children}</em>
    ),
    img: ({ src, alt }) => {
        if (!src) return null;
        return (
            <span className="block my-6 rounded-xl overflow-hidden border border-[var(--border-muted)] shadow-[var(--shadow-surface)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={alt || ''}
                    className="w-full h-auto object-cover"
                />
            </span>
        );
    },
};
