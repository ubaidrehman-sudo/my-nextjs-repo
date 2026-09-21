'use client';

import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';
import { mdxComponents } from './MDXComponents';

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <Markdown
            options={{
                overrides: mdxComponents as unknown as MarkdownToJSX.Overrides,
                wrapper: 'div',
            }}
        >
            {content}
        </Markdown>
    );
}
