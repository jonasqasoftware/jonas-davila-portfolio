import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { before, test } from "node:test";

const outDir = new URL("../../out/", import.meta.url);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

let html;

before(async () => {
  html = await readFile(new URL("en/index.html", outDir), "utf8");
});

test("the English page declares lang=en and its own canonical URL", () => {
  assert.match(html, /<html[^>]*\blang="en"/);
  assert.match(html, /<link rel="canonical" href="https:\/\/jonasdavila\.com\.br\/en\/"\/>/);
});

test("the English page renders the full experience, not only translated navigation", () => {
  for (const text of [
    "Experience and impact",
    "Quality engineering that makes products more reliable.",
    "How I think about Quality Engineering",
    "Applied quality strategy, not just automation",
    "Other technical labs",
    "What people say about working with me",
    "Education and continuous learning",
    "Need senior expertise in",
  ]) {
    assert.ok(html.includes(text), `expected "${text}" on the English page`);
  }
});

test("the English page carries no leftover Portuguese interface copy", () => {
  for (const text of ["Experiência e impacto", "Falar comigo", "Baixar currículo", "Ver código", "Enviar e-mail", "Formação e evolução contínua"]) {
    assert.ok(!html.includes(text), `expected no Portuguese "${text}" on the English page`);
  }
});

test("the English page offers the English CV for download", async () => {
  assert.match(html, new RegExp(`href="${basePath}/cv-jonas-davila-en\\.pdf"[^>]*download`));
  assert.match(html, /Download CV \(PDF\)/);
  assert.doesNotMatch(html, /href="[^"]*\/cv-jonas-davila\.pdf"/, "the English page must not link the Portuguese CV");
  const pdf = await readFile(new URL("cv-jonas-davila-en.pdf", outDir));
  assert.equal(pdf.subarray(0, 4).toString("latin1"), "%PDF", "expected a valid English CV PDF in out/");
});

test("the English page is honest about Portuguese-only resources and translated testimonials", () => {
  assert.match(html, /Read the case study \(PT\)/);
  assert.match(html, /Translated from Portuguese\./);
});

test("the language switch links both versions and marks the current one", () => {
  assert.match(html, new RegExp(`<a(?=[^>]*href="${basePath}/")(?=[^>]*hreflang="pt-BR")[^>]*>PT</a>`, "i"));
  assert.match(html, new RegExp(`<a(?=[^>]*href="${basePath}/en/")(?=[^>]*hreflang="en")(?=[^>]*aria-current="page")[^>]*>EN</a>`, "i"));
});

test("the English WhatsApp link carries the English prefilled message", () => {
  assert.match(html, /href="https:\/\/wa\.me\/5551992632426\?text=Hi%20Jonas!/);
});
