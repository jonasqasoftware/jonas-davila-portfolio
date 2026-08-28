import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://jonasdavila.com.br"),
  title: "Jonas Dávila | Senior QA Engineer e Quality Engineer",
  description: "Portfólio de Jonas Dávila, Senior QA Engineer com 10 anos em Qualidade de Software. Estratégia de testes, automação, APIs, performance, segurança, CI/CD e IA aplicada à qualidade.",
  alternates: { canonical: "/" },
  openGraph: { title: "Jonas Dávila | Senior QA Engineer e Quality Engineer", description: "Engenharia de qualidade para produtos mais confiáveis.", images: ["/jonas-davila.jpeg"], locale: "pt_BR", type: "website" },
};

const PERSON_ID = "https://jonasdavila.com.br/#person";

const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Jonas Dávila",
      url: "https://jonasdavila.com.br/",
      jobTitle: "Senior Quality Engineer",
      description:
        "Senior QA Engineer e Quality Engineer com 18 anos em tecnologia, sendo 10 dedicados à Qualidade de Software.",
      sameAs: [
        "https://www.linkedin.com/in/jonasdavila/",
        "https://github.com/jonasqasoftware",
      ],
    },
    {
      "@type": "CreativeWork",
      name: "AIMA 2.0",
      url: "https://aima20.dev",
      creator: { "@id": PERSON_ID },
      description:
        "AIMA 2.0 é um projeto autoral por meio do qual Jonas Dávila explora indicadores, inteligência artificial e pensamento estratégico aplicados à atuação de profissionais de Quality Engineering.",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${sans.variable} ${mono.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
