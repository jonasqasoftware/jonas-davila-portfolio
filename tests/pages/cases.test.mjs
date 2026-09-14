import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { before, describe, test } from "node:test";

const outDir = new URL("../../out/", import.meta.url);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const cases = [
  {
    slug: "expense-approval-quality-lab",
    repo: "expense-approval-quality-lab",
    title: "Expense Approval Quality Lab",
  },
  {
    slug: "quality-change-intelligence-lab",
    repo: "quality-change-intelligence-lab",
    title: "Quality Change Intelligence Lab",
  },
];

for (const { slug, repo, title } of cases) {
  describe(`/cases/${slug}/`, () => {
    let html;

    before(async () => {
      html = await readFile(new URL(`cases/${slug}/index.html`, outDir), "utf8");
    });

    test("renders the case title as an h1", () => {
      assert.match(html, new RegExp(`<h1[^>]*>${title}</h1>`));
    });

    test("declares pt-BR and a canonical URL for the case page", () => {
      assert.match(html, /<html[^>]+lang="pt-BR"/);
      assert.match(html, new RegExp(`<link rel="canonical" href="https:\\/\\/jonasdavila\\.com\\.br\\/cases\\/${slug}\\/?"`));
    });

    test("links back to the portfolio and to the exact GitHub repository", () => {
      assert.ok(
        html.includes(`href="${basePath}/#cases"`),
        "expected a link back to the #cases section of the portfolio",
      );
      const repoPattern = new RegExp(
        `href="https:\\/\\/github\\.com\\/jonasqasoftware\\/${repo}"[^>]*target="_blank"[^>]*rel="noreferrer"`,
      );
      assert.match(html, repoPattern, `expected a target=_blank rel=noreferrer link to ${repo}`);
    });

    test("does not invent metrics, clients or results not present in the source repository", () => {
      const forbidden = [/lorem/i, /TODO/, /placeholder/i, /example\.com/i, /machine learning/i];
      for (const pattern of forbidden) {
        assert.doesNotMatch(html, pattern);
      }
    });
  });
}

test("Quality Change Intelligence Lab case page never claims the tool is AI-based", () => {
  return readFile(new URL("cases/quality-change-intelligence-lab/index.html", outDir), "utf8").then((html) => {
    assert.doesNotMatch(html, /machine learning/i);
    assert.doesNotMatch(html, /modelo de linguagem/i);
    assert.match(html, /sem inteligência artificial/i, "expected the page to explicitly state the tool has no AI component");
  });
});
