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
