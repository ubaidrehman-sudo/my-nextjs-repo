import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import { generatePersonSchema } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8fafc",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ubaid Rehman - Lead Engineer & Solution Architect",
    template: "%s | Ubaid Rehman",
  },
  description: "Ubaid Rehman is a Lead Engineer & Solution Architect who designs multi-tenant, regulated SaaS on AWS and adds AI (hybrid RAG, AWS Bedrock) only where it earns its place.",
  keywords: ["Solution Architect", "Lead Engineer", "Multi-tenant SaaS", "RAG", "AWS Bedrock", "NestJS", "PostgreSQL", "Row-Level Security", "TypeScript"],
  authors: [{ name: "Ubaid Rehman" }],
  creator: "Ubaid Rehman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Ubaid Rehman Portfolio",
    title: "Ubaid Rehman - Lead Engineer & Solution Architect",
    description: "Portfolio of Ubaid Rehman, a Lead Engineer & Solution Architect",
    // og:image comes from src/app/opengraph-image.tsx (Next file convention).
  },
  twitter: {
    card: "summary_large_image",
    title: "Ubaid Rehman - Lead Engineer & Solution Architect",
    description: "Portfolio of Ubaid Rehman, a Lead Engineer & Solution Architect",
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-[var(--accent)] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)] focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
