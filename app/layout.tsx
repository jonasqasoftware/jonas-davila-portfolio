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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jonas Dávila",
  url: "https://jonasdavila.com.br/",
  jobTitle: "Senior Quality Engineer",
  description:
    "Senior QA Engineer e Quality Engineer com 18 anos em tecnologia, sendo 10 dedicados à Qualidade de Software. Autor do projeto autoral AIMA 2.0.",
  sameAs: [
    "https://www.linkedin.com/in/jonasdavila/",
    "https://github.com/jonasqasoftware",
    "https://aima20.dev",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${sans.variable} ${mono.variable}`}>
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
