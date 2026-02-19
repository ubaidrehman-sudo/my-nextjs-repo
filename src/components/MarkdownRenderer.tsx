'use client';

import Markdown from 'markdown-to-jsx';
import { mdxComponents } from './MDXComponents';

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <Markdown
            options={{
                overrides: mdxComponents as any,
                wrapper: 'div',
            }}
        >
            {content}
        </Markdown>
    );
}
