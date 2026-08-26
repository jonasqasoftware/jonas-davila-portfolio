import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://jonasdavila.com.br"),
  title: "Jonas Dávila | Engenharia de Qualidade",
  description: "Senior Quality Engineer, autor do AIMA 2.0. Estratégia, automação, métricas e IA aplicadas à Qualidade de Software.",
  alternates: { canonical: "/" },
  openGraph: { title: "Jonas Dávila | Engenharia de Qualidade", description: "Engenharia de Qualidade que transforma evidências em decisões.", images: ["/jonas-davila.jpeg"], locale: "pt_BR", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
