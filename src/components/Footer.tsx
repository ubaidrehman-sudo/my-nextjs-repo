import Link from 'next/link';
import { aboutMe } from '@/lib/data';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Experience', href: '/experience' },
];

const socialConfig = [
  {
    key: 'github',
    href: aboutMe.social.github,
    label: 'GitHub',
    icon: (
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    ),
    defaultClass: 'text-[var(--accent)]/70 border-[var(--accent)]/20',
    hoverClass: 'group-hover:text-[var(--text-primary)] group-hover:bg-[var(--accent)]/10 group-hover:border-[var(--accent)]',
  },
  {
    key: 'linkedin',
    href: aboutMe.social.linkedin,
    label: 'LinkedIn',
    icon: (
      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
    ),
    defaultClass: 'text-[#0a66c2]/65 border-[#0a66c2]/15',
    hoverClass: 'group-hover:text-[#0a66c2] group-hover:bg-[#0a66c2]/10 group-hover:border-[var(--accent)]',
  },
  {
    key: 'twitter',
    href: aboutMe.social.twitter,
    label: 'Twitter',
    icon: (
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    ),
    defaultClass: 'text-[#1da1f2]/65 border-[#1da1f2]/15',
    hoverClass: 'group-hover:text-[#1da1f2] group-hover:bg-[#1da1f2]/10 group-hover:border-[var(--accent)]',
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden mt-0">
      {/* Subtle gradient background aligned with theme */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(165deg, var(--bg-anchor) 0%, var(--bg-section-muted) 40%, color-mix(in srgb, var(--accent) 4%, var(--bg-section-muted)) 100%)`,
        }}
      />

      {/* Accent line at top */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Name + positioning */}
          <div className="lg:col-span-1">
            <p className="font-bold text-lg text-[var(--text-primary)] relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-8 after:bg-[var(--accent)] after:rounded-full">
              {aboutMe.name}
            </p>
            <p className="text-[var(--text-secondary)] text-sm mt-2 leading-relaxed">
              <span className="text-[var(--accent)]/80 font-medium">{aboutMe.title}</span>. {aboutMe.bio}
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <p className="font-semibold text-[var(--text-primary)] text-sm uppercase tracking-wider mb-4 pl-3 border-l-2 border-[var(--accent)]/40">
              Quick Links
            </p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all text-sm group/link"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/50 group-hover/link:opacity-100 group-hover/link:bg-[var(--accent)] group-hover/link:scale-110 transition-all shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <p className="font-semibold text-[var(--text-primary)] text-sm uppercase tracking-wider mb-4 pl-3 border-l-2 border-[var(--accent)]/40">
              Contact
            </p>
            <a
              href={`mailto:${aboutMe.email}`}
              className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all text-sm group/email"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/50 group-hover/email:bg-[var(--accent)] group-hover/email:scale-110 transition-all shrink-0" />
              {aboutMe.email}
            </a>
          </div>

          {/* Column 4: Social - colorful icons */}
          <div>
            <p className="font-semibold text-[var(--text-primary)] text-sm uppercase tracking-wider mb-4 pl-3 border-l-2 border-[var(--accent)]/40">
              Connect
            </p>
            <div className="flex gap-3">
              {socialConfig.map(
                (item) =>
                  item.href && (
                    <a
                      key={item.key}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group inline-flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] ${item.defaultClass} ${item.hoverClass}`}
                      aria-label={item.label}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        {item.icon}
                      </svg>
                    </a>
                  )
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--accent)]/25 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--text-secondary)]">
            © <span className="text-[var(--accent)]/70 font-medium">{new Date().getFullYear()}</span> {aboutMe.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
