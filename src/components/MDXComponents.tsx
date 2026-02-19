import type { MDXComponents } from 'mdx/types';

export const mdxComponents: MDXComponents = {
    h1: ({ children }) => (
        <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-2xl font-bold mt-4 mb-2">{children}</h3>
    ),
    p: ({ children }) => (
        <p className="mb-4 leading-7">{children}</p>
    ),
    ul: ({ children }) => (
        <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
    li: ({ children }) => (
        <li className="leading-7">{children}</li>
    ),
    code: ({ children, className }) => {
        const isInline = !className;

        if (isInline) {
            return (
                <code className="bg-[var(--background-elevated)] px-1.5 py-0.5 text-sm border border-[var(--border)] rounded font-mono text-[var(--accent)]">
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
        <pre className="bg-[var(--background-elevated)] border border-[var(--border)] rounded-lg p-4 overflow-x-auto mb-4 text-sm font-mono text-[var(--foreground)]">
            {children}
        </pre>
    ),
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-[var(--accent)] pl-4 italic my-4 text-[var(--foreground-muted)] bg-[var(--background-soft)] py-2 pr-2 rounded-r">
            {children}
        </blockquote>
    ),
    a: ({ href, children }) => (
        <a
            href={href}
            className="text-[var(--accent)] underline decoration-[var(--accent)]/30 hover:decoration-[var(--accent)] hover:text-[var(--accent-hover)] transition-all"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
            {children}
        </a>
    ),
    strong: ({ children }) => (
        <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }) => (
        <em className="italic">{children}</em>
    ),
};
