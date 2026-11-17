import { ImageResponse } from 'next/og';
import { aboutMe } from '@/lib/data';

// Generated at build time: the social-share card used for og:image and twitter:image.
// Colours are the site's existing theme tokens (light slate + teal accent).
export const alt = `${aboutMe.name} — ${aboutMe.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '72px 80px',
                    background: 'linear-gradient(135deg, #f0fdfa 0%, #f8fafc 100%)',
                    color: '#0f172a',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', fontSize: 34, fontWeight: 700 }}>
                    {aboutMe.name.split(' ')[0]}
                    <span style={{ color: '#0f766e' }}>.</span>
                    {aboutMe.name.split(' ').slice(1).join(' ')}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            fontSize: 76,
                            fontWeight: 800,
                            lineHeight: 1.08,
                            letterSpacing: '-0.03em',
                        }}
                    >
                        {aboutMe.tagline}&nbsp;
                        <span style={{ color: '#0f766e' }}>{aboutMe.taglineAccentWord}</span>
                    </div>
                    <div style={{ marginTop: 28, fontSize: 34, color: '#475569', fontWeight: 600 }}>
                        {aboutMe.title}
                    </div>
                </div>

                <div style={{ display: 'flex', fontSize: 26, color: '#475569' }}>
                    Multi-tenant SaaS · AWS · AI where it earns its place
                </div>
            </div>
        ),
        { ...size }
    );
}
