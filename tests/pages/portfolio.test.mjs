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

test("Cases em destaque section exists with the expected heading", () => {
  assert.match(html, /id="cases"/);
  assert.match(html, /05 — CASES EM DESTAQUE/);
});

test("Outros laboratórios técnicos section exists with the expected heading", () => {
  assert.match(html, /id="laboratorios"/);
  assert.match(html, /06 — PROJETOS TÉCNICOS/);
  assert.match(html, /Outros laboratórios técnicos/);
});

test("renders the two featured cases and the four other lab cards with title, repo identity and tags", () => {
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

test("each featured case links to its dedicated case page and to its exact GitHub repository", () => {
  const cases = [
    "expense-approval-quality-lab",
    "quality-change-intelligence-lab",
  ];
  for (const slug of cases) {
    assert.ok(
      html.includes(`href="${basePath}/cases/${slug}/"`),
      `expected a link to the dedicated case page for ${slug}`,
    );
    const repoPattern = new RegExp(
      `href="https:\\/\\/github\\.com\\/jonasqasoftware\\/${slug}"[^>]*target="_blank"[^>]*rel="noreferrer"`,
    );
    assert.match(html, repoPattern, `expected a target=_blank rel=noreferrer link to ${slug}`);
  }
});

test("does not reference the legacy reino-do-recurso-real-api identity anywhere", () => {
  assert.doesNotMatch(html, /reino-do-recurso-real-api/);
});

test("each other-lab project links to the exact GitHub repository with target=_blank and rel=noreferrer", () => {
  const repos = [
    "api-quality-engineering-lab",
    "sql-quality-checker",
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

test("Cases em destaque renders exactly two case cards", () => {
  const sectionStart = html.indexOf('id="cases"');
  const sectionEnd = html.indexOf('id="laboratorios"');
  assert.ok(sectionStart > -1, "expected id=\"cases\" to be present");
  assert.ok(sectionEnd > -1, "expected id=\"laboratorios\" to be present");
  assert.ok(sectionStart < sectionEnd, "expected #cases to appear before #laboratorios");

  const sectionHtml = html.slice(sectionStart, sectionEnd);
  const cardMatches = sectionHtml.match(/class="case-card"/g) ?? [];
  assert.equal(cardMatches.length, 2, "expected exactly two case-card elements in #cases");
});

test("Outros laboratórios técnicos renders exactly four project cards and four project links", () => {
  const sectionStart = html.indexOf('id="laboratorios"');
  const sectionEnd = html.indexOf('id="aima"');
  assert.ok(sectionStart > -1, "expected id=\"laboratorios\" to be present");
  assert.ok(sectionEnd > -1, "expected id=\"aima\" to be present");
  assert.ok(sectionStart < sectionEnd, "expected #laboratorios to appear before #aima");

  const sectionHtml = html.slice(sectionStart, sectionEnd);

  const cardMatches = sectionHtml.match(/class="expertise-card"/g) ?? [];
  assert.equal(cardMatches.length, 4, "expected exactly four expertise-card elements in #laboratorios");

  const linkMatches = sectionHtml.match(/class="project-link"/g) ?? [];
  assert.equal(linkMatches.length, 4, "expected exactly four project-link elements in #laboratorios");
});

test("Cases and Outros laboratórios appear after Competências and before AIMA 2.0 in the page flow", () => {
  const competenciasIndex = html.indexOf("Competências técnicas e estratégicas");
  const casesIndex = html.indexOf("id=\"cases\"");
  const laboratoriosIndex = html.indexOf("id=\"laboratorios\"");
  const aimaIndex = html.indexOf(">Um projeto autoral que evidencia pensamento estratégico");
  assert.ok(competenciasIndex > -1, "expected the Competências section to be present");
  assert.ok(casesIndex > -1, "expected the Cases em destaque section to be present");
  assert.ok(laboratoriosIndex > -1, "expected the Outros laboratórios section to be present");
  assert.ok(aimaIndex > -1, "expected the AIMA section heading to be present");
  assert.ok(competenciasIndex < casesIndex, "expected Cases to appear after Competências");
  assert.ok(casesIndex < laboratoriosIndex, "expected Cases to appear before Outros laboratórios");
  assert.ok(laboratoriosIndex < aimaIndex, "expected Outros laboratórios to appear before AIMA 2.0");
});

test("Autoria, Recomendações, Formação and Contato section numbers reflect the expanded editorial structure", () => {
  assert.match(html, /07 — AUTORIA/);
  assert.match(html, /08 — RECOMENDAÇÕES/);
  assert.match(html, /09 — FORMAÇÃO/);
  assert.match(html, /10 — CONTATO/);
});

test("AIMA section still uses the #aima anchor", () => {
  assert.match(html, /id="aima"/);
});

test("Como penso Quality Engineering section renders all five principles between Sobre and Competências", () => {
  assert.match(html, /id="como-penso"/);
  assert.match(html, /03 — COMO PENSO QUALITY ENGINEERING/);
  const principleTitles = [
    "Risco antes de volume",
    "Automação é uma decisão de engenharia",
    "Quality Gates precisam de evidência",
    "Qualidade vai além dos testes",
    "IA precisa de controles técnicos",
  ];
  for (const title of principleTitles) {
    assert.ok(html.includes(title), `expected principle "${title}" in exported HTML`);
  }
  const sobreIndex = html.indexOf('id="sobre"');
  const comoPensoIndex = html.indexOf('id="como-penso"');
  const competenciasIndex = html.indexOf('id="competencias"');
  assert.ok(sobreIndex < comoPensoIndex, "expected Como penso to appear after Sobre");
  assert.ok(comoPensoIndex < competenciasIndex, "expected Como penso to appear before Competências");
});

test("Autoria & Contribuições section links to the verified Thoughtworks article, AIMA and LinkedIn, and never mentions the unpublished book", () => {
  assert.match(html, /id="autoria"/);
  assert.match(
    html,
    /href="https:\/\/www\.thoughtworks\.com\/en-us\/insights\/blog\/aima-how-increase-performance-qa-analysts-through-indicators"[^>]*target="_blank"[^>]*rel="noreferrer"/,
  );
  assert.doesNotMatch(html, /Introdução à Inteligência Artificial nos Testes de Software/);
});

test("Recomendações section renders exactly three testimonials without ratings or stars, and links to LinkedIn recommendations", () => {
  assert.match(html, /id="recomendacoes"/);
  const names = ["Ellen Aquino", "Eros Luiz Garzuzi da Costa", "Thaís Ambrósio"];
  for (const name of names) {
    assert.ok(html.includes(name), `expected testimonial author "${name}" in exported HTML`);
  }
  const cardMatches = html.match(/class="expertise-card testimonial-card"/g) ?? [];
  assert.equal(cardMatches.length, 3, "expected exactly three testimonial cards");
  assert.doesNotMatch(html, /★/);
  assert.match(
    html,
    /href="https:\/\/www\.linkedin\.com\/in\/jonasdavila\/details\/recommendations\/\?detailScreenTabIndex=0"/,
  );
});
