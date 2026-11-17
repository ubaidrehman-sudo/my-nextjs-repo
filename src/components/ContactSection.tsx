import { aboutMe, contactChannels, contactFAQ } from '@/lib/data';

/**
 * Pre-footer contact block: intro CTAs, channel cards, and FAQs (replaces standalone /contact).
 */
export default function ContactSection() {
    return (
        <section className="py-16 bg-[var(--bg-section)]">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
                        Let&apos;s Build Something Great Together
                    </h2>
                    <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-6">
                        Available for consulting, architecture reviews, and advisory roles. I&apos;d love to hear about your technical challenges.
                    </p>

                    <div className="flex flex-wrap gap-2 justify-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--background-soft)] text-[var(--text-secondary)] font-medium text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
                            {aboutMe.status || 'Available for engagements'}
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-muted)] bg-[var(--background-elevated)] text-[var(--text-muted)] font-medium text-xs">
                            Usually responds within 24-48 hours
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <a
                            href={`mailto:${aboutMe.email}`}
                            className="btn-primary inline-flex items-center gap-2 px-6 py-3"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Get in Touch
                        </a>
                        {aboutMe.social.linkedin && (
                            <a
                                href={aboutMe.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary inline-flex items-center gap-2 px-6 py-3"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                </svg>
                                Connect on LinkedIn
                            </a>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {contactChannels.map((channel) => {
                        const isEmail = channel.type === 'email';
                        const isLinkedIn = channel.type === 'linkedin';

                        return (
                            <a
                                key={channel.id}
                                href={channel.href}
                                target={isEmail ? undefined : '_blank'}
                                rel={isEmail ? undefined : 'noopener noreferrer'}
                                className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
                                    isLinkedIn
                                        ? 'border-[#0a66c2]/20 bg-[var(--background-elevated)] hover:border-[#0a66c2]/40'
                                        : 'border-[var(--border-muted)] bg-[var(--background-elevated)] hover:border-[var(--border-strong)]'
                                }`}
                            >
                                <div className="p-5 sm:p-6">
                                    <div className="flex items-start gap-4 mb-3">
                                        <div
                                            className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                                isLinkedIn
                                                    ? 'bg-[#0a66c2]/10 text-[#0a66c2] group-hover:bg-[#0a66c2] group-hover:text-white'
                                                    : 'bg-[var(--accent)]/10 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white'
                                            }`}
                                        >
                                            {isEmail ? (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                                                {channel.label}
                                            </p>
                                            <p
                                                className={`font-medium mb-2 transition-colors ${
                                                    isLinkedIn ? 'text-[#0a66c2] group-hover:text-[#0a66c2]' : 'text-[var(--text-primary)] group-hover:text-[var(--accent)]'
                                                } break-words [overflow-wrap:anywhere]`}
                                            >
                                                {channel.value}
                                            </p>
                                        </div>
                                    </div>
                                    {channel.description && (
                                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{channel.description}</p>
                                    )}
                                </div>

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg aria-hidden
                                        className={`w-5 h-5 ${isLinkedIn ? 'text-[#0a66c2]' : 'text-[var(--accent)]'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </div>
                            </a>
                        );
                    })}
                </div>

                <div className="mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-8 text-center">
                        Frequently Asked Questions
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {contactFAQ.map((faq) => (
                            <div
                                key={faq.id}
                                className="p-6 rounded-xl border border-[var(--border-muted)] bg-[var(--background-elevated)] hover:border-[var(--border-strong)] transition-all duration-300"
                            >
                                <h4 className="text-base font-semibold text-[var(--text-primary)] mb-3 leading-snug">
                                    {faq.question}
                                </h4>
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
