import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { before, test } from "node:test";

const outDir = new URL("../../out/", import.meta.url);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

let html;

before(async () => {
  html = await readFile(new URL("index.html", outDir), "utf8");
});

test("exports a non-empty CV PDF into the static artifact", async () => {
  const cvPath = new URL("cv-jonas-davila.pdf", outDir);
  const st = await stat(cvPath);
  assert.ok(st.isFile() && st.size > 0, "expected cv-jonas-davila.pdf to exist and be non-empty in out/");

  const buffer = await readFile(cvPath);
  assert.equal(buffer.subarray(0, 4).toString("latin1"), "%PDF", "expected a valid PDF signature");
});

test("hero exposes a CV download CTA with the correct base path and download attribute", () => {
  const expectedHref = `${basePath}/cv-jonas-davila.pdf`;
  assert.ok(
    html.includes(`href="${expectedHref}"`),
    `expected CV link to use base path "${basePath}"`,
  );
  assert.match(html, new RegExp(`href="${expectedHref.replace(/\//g, "\\/")}"[^>]*download`));
  assert.match(html, /Baixar currículo/);
});

test("experience section renders role and period for every company", () => {
  const pairs = [
    ["Analista de Testes e Qualidade de Software", "07/2025 — 07/2026"],
    ["Engenheiro de Qualidade de Software — Processos e Estratégia", "10/2024 — 05/2025"],
    ["Senior Software Quality Assurance Engineer", "04/2024 — 08/2024"],
    ["Senior Quality Analyst", "05/2021 — 08/2023"],
    ["Quality Analyst Consultant (Trainee)", "04/2020 — 05/2021"],
    ["Analista de Qualidade Júnior", "09/2019 — 04/2020"],
  ];
  for (const [role, period] of pairs) {
    assert.ok(html.includes(role), `expected role "${role}" in exported HTML`);
    assert.ok(html.includes(period), `expected period "${period}" in exported HTML`);
  }
});

test("AIMA 2.0 section links to the product site and to the source code as secondary evidence", () => {
  assert.match(html, /href="https:\/\/aima20\.dev"[^>]*target="_blank"[^>]*rel="noreferrer"/);
  assert.match(
    html,
    /href="https:\/\/github\.com\/jonasqasoftware\/aima-agentic-qe"[^>]*target="_blank"[^>]*rel="noreferrer"/,
  );
});

test("Projetos selecionados section exists with the expected heading", () => {
  assert.match(html, /id="projetos"/);
  assert.match(html, /04 — PROJETOS/);
  assert.match(html, /Projetos selecionados/);
});

test("renders the six selected project cards with title, repo identity, description and tags", () => {
  const titles = [
    "API Quality Engineering Lab",
    "SQL Quality Checker",
    "Quality Change Intelligence Lab",
    "Expense Approval Quality Lab",
    "Subscription Change Quality Lab",
    "Inventory Reservation Quality Lab",
  ];
  for (const title of titles) {
    assert.ok(html.includes(title), `expected project title "${title}" in exported HTML`);
  }

  const repoSlugs = [
    "api-quality-engineering-lab",
    "sql-quality-checker",
    "quality-change-intelligence-lab",
    "expense-approval-quality-lab",
    "subscription-change-quality-lab",
    "inventory-reservation-quality-lab",
  ];
  for (const repo of repoSlugs) {
    assert.ok(html.includes(repo), `expected repo slug "${repo}" in exported HTML`);
  }

  const expectedTags = [
    "API Testing", "OpenAPI", "k6", "Segurança", "Acessibilidade", "CI/CD",
    "SQL", "Python", "SQLite", "Qualidade de Dados",
    "Go", "Risk-Based Testing", "Test Strategy", "GitHub Actions",
    "Playwright", "TypeScript", "E2E",
    "Cypress", "JavaScript", "Network Testing",
    "Selenium 4", "Java", "JUnit 5", "Page Objects",
  ];
  for (const tag of expectedTags) {
    assert.ok(html.includes(tag), `expected tag "${tag}" to be present in the exported HTML`);
  }
});

test("does not reference the legacy reino-do-recurso-real-api identity anywhere", () => {
  assert.doesNotMatch(html, /reino-do-recurso-real-api/);
});

test("each selected project links to the exact GitHub repository with target=_blank and rel=noreferrer", () => {
  const repos = [
    "api-quality-engineering-lab",
    "sql-quality-checker",
    "quality-change-intelligence-lab",
    "expense-approval-quality-lab",
    "subscription-change-quality-lab",
    "inventory-reservation-quality-lab",
  ];
  for (const repo of repos) {
    const pattern = new RegExp(
      `href="https:\\/\\/github\\.com\\/jonasqasoftware\\/${repo}"[^>]*target="_blank"[^>]*rel="noreferrer"`,
    );
    assert.match(html, pattern, `expected a target=_blank rel=noreferrer link to ${repo}`);
  }
});

test("Projetos selecionados section renders exactly six project cards and six project links", () => {
  const sectionStart = html.indexOf('id="projetos"');
  const sectionEnd = html.indexOf('id="aima"');
  assert.ok(sectionStart > -1, "expected id=\"projetos\" to be present");
  assert.ok(sectionEnd > -1, "expected id=\"aima\" to be present");
  assert.ok(sectionStart < sectionEnd, "expected #projetos to appear before #aima");

  const sectionHtml = html.slice(sectionStart, sectionEnd);

  const cardMatches = sectionHtml.match(/class="expertise-card"/g) ?? [];
  assert.equal(cardMatches.length, 6, "expected exactly six expertise-card elements in #projetos");

  const linkMatches = sectionHtml.match(/class="project-link"/g) ?? [];
  assert.equal(linkMatches.length, 6, "expected exactly six project-link elements in #projetos");
});

test("Projetos selecionados appears after Competências and before AIMA 2.0 in the page flow", () => {
  const competenciasIndex = html.indexOf("Competências técnicas e estratégicas");
  const projetosIndex = html.indexOf("Projetos selecionados");
  const aimaIndex = html.indexOf(">Um projeto autoral que evidencia pensamento estratégico");
  assert.ok(competenciasIndex > -1, "expected the Competências section to be present");
  assert.ok(projetosIndex > -1, "expected the Projetos selecionados section to be present");
  assert.ok(aimaIndex > -1, "expected the AIMA section heading to be present");
  assert.ok(competenciasIndex < projetosIndex, "expected Projetos to appear after Competências");
  assert.ok(projetosIndex < aimaIndex, "expected Projetos to appear before AIMA 2.0");
});

test("Formação and Contato section numbers were renumbered after inserting Projetos", () => {
  assert.match(html, /05 — FORMAÇÃO/);
  assert.match(html, /06 — CONTATO/);
});

test("AIMA section now uses the #aima anchor, freeing #projetos for the new section", () => {
  assert.match(html, /id="aima"/);
});
