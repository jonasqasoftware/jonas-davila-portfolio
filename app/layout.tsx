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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
