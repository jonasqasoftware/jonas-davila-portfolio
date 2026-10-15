import localFont from "next/font/local";

/*
 * Fonts are self-hosted from app/_fonts (variable WOFF2, Latin subset, SIL OFL —
 * licenses alongside). next/font/google downloaded them from Google at build time,
 * which made CI builds fail whenever that request flaked; local files make the
 * build fully offline and deterministic. Regenerate from github.com/google/fonts.
 */

/** Display face: Archivo with the width axis, used condensed (wdth 62) for the name and headings. */
export const display = localFont({
  src: "./_fonts/archivo-latin-var.woff2",
  weight: "400 900",
  style: "normal",
  declarations: [{ prop: "font-stretch", value: "62% 100%" }],
  variable: "--font-display",
  display: "swap",
});

export const sans = localFont({
  src: "./_fonts/ibm-plex-sans-latin-var.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
});

export const mono = localFont({
  src: "./_fonts/jetbrains-mono-latin-var.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-mono",
  display: "swap",
});

export const fontClasses = `${display.variable} ${sans.variable} ${mono.variable}`;
