import type { Metadata, Viewport } from "next";
import "../globals.css";
import Analytics from "../analytics";
import ScrollReveal from "../scroll-reveal";
import { fontClasses } from "../fonts";
import { personJsonLd } from "../structured-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://jonasdavila.com.br"),
  title: "Jonas Davila | Senior QA Engineer e Quality Engineer",
  description:
    "Portfólio de Jonas Davila, Senior QA Engineer com 10 anos em Qualidade de Software. Estratégia de testes, automação, APIs, performance, segurança, CI/CD e IA aplicada à qualidade.",
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/", en: "/en/" },
  },
  openGraph: {
    title: "Jonas Davila | Senior QA Engineer e Quality Engineer",
    description: "Engenharia de qualidade para produtos mais confiáveis.",
    images: [{ url: "/og-jonas-davila.jpg", width: 1200, height: 630, alt: "Jonas Davila, Senior QA Engineer e Quality Engineer" }],
    locale: "pt_BR",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

  return (
    <html lang="pt-BR">
      <body className={fontClasses}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ScrollReveal />
        <Analytics measurementId={gaMeasurementId} lang="pt" />
      </body>
    </html>
  );
}
