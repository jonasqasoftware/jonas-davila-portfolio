import type { MetadataRoute } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jonas Dávila — Senior Quality Engineer",
    short_name: "Jonas Dávila",
    description:
      "Portfólio de Jonas Dávila, Senior QA Engineer com 10 anos em Qualidade de Software. Estratégia de testes, automação, APIs, performance, segurança, CI/CD e IA aplicada à qualidade.",
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#f5f3ec",
    theme_color: "#111111",
    icons: [
      { src: `${basePath}/icons/icon-192.png`, sizes: "192x192", type: "image/png", purpose: "any" },
      { src: `${basePath}/icons/icon-192.png`, sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: `${basePath}/icons/icon-512.png`, sizes: "512x512", type: "image/png", purpose: "any" },
      { src: `${basePath}/icons/icon-512.png`, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
