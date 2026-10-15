import type { Metadata, Viewport } from "next";
import "../../globals.css";
import Analytics from "../../analytics";
import ScrollReveal from "../../scroll-reveal";
import { fontClasses } from "../../fonts";
import { personJsonLd } from "../../structured-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://jonasdavila.com.br"),
  title: "Jonas Davila | Senior QA Engineer and Quality Engineer",
  description:
    "Portfolio of Jonas Davila, Senior QA Engineer with 10 years in software quality: test strategy, automation, APIs, performance, security, CI/CD and AI in quality engineering.",
  alternates: {
    canonical: "/en/",
    languages: { "pt-BR": "/", en: "/en/" },
  },
  openGraph: {
    title: "Jonas Davila | Senior QA Engineer and Quality Engineer",
    description: "Quality engineering that makes products more reliable.",
    images: [{ url: "/og-jonas-davila.jpg", width: 1200, height: 630, alt: "Jonas Davila, Senior QA Engineer and Quality Engineer" }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F2EE" },
    { media: "(prefers-color-scheme: dark)", color: "#151719" },
  ],
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

  return (
    <html lang="en">
      <body className={fontClasses}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ScrollReveal />
        <Analytics measurementId={gaMeasurementId} lang="en" />
      </body>
    </html>
  );
}
