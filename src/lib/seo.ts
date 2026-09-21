import { Metadata } from 'next';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    tags?: string[];
}

export function generateSEO({
    title,
    description,
    image = '/og-image.png',
    url = 'https://yourportfolio.com',
    type = 'website',
    publishedTime,
    tags,
}: SEOProps): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            type,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            ...(publishedTime && { publishedTime }),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
        ...(tags && { keywords: tags }),
    };
}

export function generateBlogPostSchema(post: {
    title: string;
    description: string;
    date: string;
    image?: string;
    url: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: post.image,
        datePublished: post.date,
        author: {
            '@type': 'Person',
            name: 'Ubaid Rehman',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Ubaid Rehman Portfolio',
            logo: {
                '@type': 'ImageObject',
                url: '/logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': post.url,
        },
    };
}

export function generatePersonSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Ubaid Rehman',
        jobTitle: 'Lead Engineer & Solution Architect',
        url: 'https://yourportfolio.com',
        sameAs: [
            'https://github.com/ubaidurrehmankhan',
            'https://linkedin.com/in/ubaid-dev',
        ],
    };
}
