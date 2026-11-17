interface SectionLabelProps {
    text: string;
    size?: 'hero' | 'section';
    showDot?: boolean;
    className?: string;
}

export default function SectionLabel({ 
    text, 
    size = 'section', 
    showDot = true,
    className = '' 
}: SectionLabelProps) {
    const isHero = size === 'hero';
    
    return (
        <div
            className={`inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--background-soft)] text-[var(--text-secondary)] font-medium uppercase tracking-wider ${
                isHero ? 'px-3 py-1 text-xs' : 'px-2.5 py-0.5 text-xs'
            } ${className}`}
        >
            {showDot && (
                <span 
                    className={`rounded-full bg-[var(--accent)] shrink-0 ${
                        isHero ? 'w-1.5 h-1.5' : 'w-1 h-1'
                    }`} 
                    aria-hidden 
                />
            )}
            {text}
        </div>
    );
}
