import { Archivo, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";

/** Display face: Archivo with the width axis, used condensed (wdth 62) for the name and headings. */
export const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

export const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const fontClasses = `${display.variable} ${sans.variable} ${mono.variable}`;
