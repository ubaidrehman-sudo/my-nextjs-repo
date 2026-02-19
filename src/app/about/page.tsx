import { aboutMe } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
    description: `Learn more about ${aboutMe.name}, a ${aboutMe.title}`,
};

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">About Me</h1>

            <div className="prose max-w-none">
                <p className="text-lg leading-relaxed mb-6">{aboutMe.bio}</p>

                <h2 className="text-2xl font-bold mt-12 mb-4">Get in Touch</h2>
                <div className="space-y-2">
                    <p>
                        <strong>Email:</strong>{' '}
                        <a href={`mailto:${aboutMe.email}`} className="underline hover:text-gray-600">
                            {aboutMe.email}
                        </a>
                    </p>
                    <p>
                        <strong>Location:</strong> {aboutMe.location}
                    </p>
                </div>

                <h2 className="text-2xl font-bold mt-12 mb-4">Connect</h2>
                <div className="flex gap-4">
                    {aboutMe.social.github && (
                        <a
                            href={aboutMe.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-gray-600"
                        >
                            GitHub
                        </a>
                    )}
                    {aboutMe.social.linkedin && (
                        <a
                            href={aboutMe.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-gray-600"
                        >
                            LinkedIn
                        </a>
                    )}
                    {aboutMe.social.twitter && (
                        <a
                            href={aboutMe.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-gray-600"
                        >
                            Twitter
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
