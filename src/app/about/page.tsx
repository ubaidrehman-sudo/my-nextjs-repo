import { aboutMe } from '@/lib/data';
import { Metadata } from 'next';
import SectionHeadingWithBar from '@/components/SectionHeadingWithBar';

const socialConfig = [
    {
        key: 'github',
        name: 'GitHub',
        href: aboutMe.social.github,
        iconColor: '#181717',
        icon: (
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        ),
    },
    {
        key: 'linkedin',
        name: 'LinkedIn',
        href: aboutMe.social.linkedin,
        iconColor: '#0a66c2',
        icon: (
            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        ),
    },
    {
        key: 'twitter',
        name: 'Twitter',
        href: aboutMe.social.twitter,
        iconColor: '#1da1f2',
        icon: (
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        ),
    },
];

export const metadata: Metadata = {
    title: 'About',
    description: `Learn more about ${aboutMe.name}, a ${aboutMe.title}`,
};

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-24 pt-32">
            <SectionHeadingWithBar
                title="About"
                subtitle="A bit about who I am and how to reach me"
                level={1}
                className="mb-12"
            />

            <div className="space-y-12">
                {/* Bio */}
                <section>
                    <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl mb-6">
                        {aboutMe.bio}
                    </p>
                    <a href="/resume.pdf" className="btn-secondary inline-flex items-center gap-2">
                        Download Resume
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </a>
                </section>

                {/* Get in Touch */}
                <section className="pl-3 border-l-2 border-[var(--accent)]/40">
                    <h2 className="text-base font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">
                        Get in Touch
                    </h2>
                    <div className="space-y-3 text-[var(--text-secondary)]">
                        <p>
                            <span className="font-medium text-[var(--text-primary)]">Email:</span>{' '}
                            <a
                                href={`mailto:${aboutMe.email}`}
                                className="text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 rounded"
                            >
                                {aboutMe.email}
                            </a>
                        </p>
                        <p>
                            <span className="font-medium text-[var(--text-primary)]">Location:</span>{' '}
                            {aboutMe.location}
                        </p>
                    </div>
                </section>

                {/* Connect */}
                <section className="pl-3 border-l-2 border-[var(--accent)]/40">
                    <h2 className="text-base font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">
                        Connect
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {socialConfig.map(
                            (item) =>
                                item.href && (
                                    <a
                                        key={item.key}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-muted)] bg-[var(--bg-section)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
                                        aria-label={item.name}
                                    >
                                        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden style={{ color: item.iconColor }}>
                                            {item.icon}
                                        </svg>
                                        {item.name}
                                    </a>
                                )
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
