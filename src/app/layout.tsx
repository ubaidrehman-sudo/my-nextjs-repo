import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generatePersonSchema } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL("https://yourportfolio.com"),
  title: {
    default: "Ubaid Rehman - Lead Engineer & Solution Architect",
    template: "%s | Ubaid Rehman",
  },
  description: "Portfolio of Ubaid Rehman, a Lead Engineer & Solution Architect specializing in multi-tenant, AI-augmented platforms with React, Next.js, and NestJS.",
  keywords: ["Solution Architect", "Lead Engineer", "React", "Next.js", "TypeScript", "NestJS", "Web Development"],
  authors: [{ name: "Ubaid Rehman" }],
  creator: "Ubaid Rehman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    siteName: "Ubaid Rehman Portfolio",
    title: "Ubaid Rehman - Lead Engineer & Solution Architect",
    description: "Portfolio of Ubaid Rehman, a Lead Engineer & Solution Architect",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ubaid Rehman Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ubaid Rehman - Lead Engineer & Solution Architect",
    description: "Portfolio of Ubaid Rehman, a Lead Engineer & Solution Architect",
    creator: "@ubaidurrehmankhan",
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
