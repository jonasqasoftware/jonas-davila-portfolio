import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://jonasdavila.com.br/",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://jonasdavila.com.br/cases/expense-approval-quality-lab/",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://jonasdavila.com.br/cases/quality-change-intelligence-lab/",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
