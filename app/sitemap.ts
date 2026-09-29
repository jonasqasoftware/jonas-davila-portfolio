import type { MetadataRoute } from "next";
import { execFileSync } from "node:child_process";

export const dynamic = "force-static";

/**
 * Truthful last-modified date for a tracked file, taken from its last git commit.
 * Returns undefined (never "now") when git history isn't available — e.g. a shallow
 * checkout that doesn't include the commit that last touched this file.
 */
function lastCommitDate(relativeFilePath: string): Date | undefined {
  try {
    const output = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", relativeFilePath],
      { cwd: process.cwd(), stdio: ["ignore", "pipe", "ignore"] },
    )
      .toString()
      .trim();
    return output ? new Date(output) : undefined;
  } catch {
    return undefined;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const homepageModified = lastCommitDate("app/page.tsx");
  const expenseApprovalModified = lastCommitDate("app/cases/expense-approval-quality-lab/page.tsx");
  const qualityChangeModified = lastCommitDate("app/cases/quality-change-intelligence-lab/page.tsx");

  return [
    {
      url: "https://jonasdavila.com.br/",
      ...(homepageModified && { lastModified: homepageModified }),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://jonasdavila.com.br/cases/expense-approval-quality-lab/",
      ...(expenseApprovalModified && { lastModified: expenseApprovalModified }),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://jonasdavila.com.br/cases/quality-change-intelligence-lab/",
      ...(qualityChangeModified && { lastModified: qualityChangeModified }),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
