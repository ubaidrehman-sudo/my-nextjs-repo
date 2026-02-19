import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generatePersonSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: "John Doe - Full Stack Developer",
    template: "%s | John Doe",
  },
  description: "Portfolio of John Doe, a passionate Full Stack Developer specializing in modern web applications with React, Next.js, and Node.js.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "Web Development"],
  authors: [{ name: "John Doe" }],
  creator: "John Doe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    siteName: "John Doe Portfolio",
    title: "John Doe - Full Stack Developer",
    description: "Portfolio of John Doe, a passionate Full Stack Developer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "John Doe Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "John Doe - Full Stack Developer",
    description: "Portfolio of John Doe, a passionate Full Stack Developer",
    creator: "@johndoe",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = generatePersonSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className={`font-sans antialiased text-[var(--foreground)] bg-[var(--background)]`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
