import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import { aboutMe } from '@/lib/data';

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
    image = '/opengraph-image',
    url = SITE_URL,
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
                url: `${SITE_URL}/favicon.ico`,
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
        url: SITE_URL,
        email: aboutMe.email,
        worksFor: {
            '@type': 'Organization',
            name: 'VentureDive',
        },
        knowsAbout: [
            'Solution architecture',
            'Multi-tenant SaaS',
            'PostgreSQL Row-Level Security',
            'Retrieval-augmented generation',
            'AWS Bedrock',
            'NestJS',
        ],
        sameAs: [
            'https://github.com/ubaidurrehmankhan',
            'https://linkedin.com/in/ubaid-dev',
        ],
    };
}

export function generateProjectSchema(project: {
    slug: string;
    title: string;
    description: string;
    year?: number;
    domain?: string;
    technologies: string[];
}) {
    const url = `${SITE_URL}/projects/${project.slug}`;
    return [
        {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            description: project.description,
            url,
            author: { '@type': 'Person', name: 'Ubaid Rehman', url: SITE_URL },
            keywords: project.technologies.join(', '),
            ...(project.year && { dateCreated: String(project.year) }),
            ...(project.domain && { genre: project.domain }),
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
                { '@type': 'ListItem', position: 3, name: project.title, item: url },
            ],
        },
    ];
}
