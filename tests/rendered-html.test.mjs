import assert from "node:assert/strict";
import { before, test } from "node:test";

let response;
let html;

before(async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  html = await response.text();
});

test("responds with a successful HTML document", () => {
  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
});

test("declares Brazilian Portuguese as the document language", () => {
  assert.match(html, /<html[^>]*\blang=["']pt-BR["']/i);
});

test("renders title, description and canonical metadata for employability", () => {
  assert.match(html, /<title>Jonas Dávila \| Senior QA Engineer e Quality Engineer<\/title>/);
  assert.match(
    html,
    /Portfólio de Jonas Dávila, Senior QA Engineer com 10 anos em Qualidade de Software\./,
  );
  assert.match(html, /<link rel="canonical" href="https:\/\/jonasdavila\.com\.br\/?"/);
});

test("renders the main heading with the professional positioning", () => {
  assert.match(html, /Qualidade de Software com estratégia, engenharia e/);
});

test("mentions 18 years in tech and 10 in Quality as Senior QA Engineer", () => {
  assert.match(
    html,
    /Sou Jonas Dávila, Senior QA Engineer e Quality Engineer com 18 anos em tecnologia, sendo 10 dedicados à Qualidade de Software/,
  );
});

test("mentions the PUC Minas postgraduate program and ISTQB certification", () => {
  assert.match(html, /PUC Minas/);
  assert.match(html, /Pós-graduação Lato Sensu em Engenharia de Qualidade e Teste de Software/);
  assert.match(html, /ISTQB CTFL/);
});

test("mentions AIMA 2.0 as an authored project, not a commercial offer", () => {
  assert.match(html, /AIMA 2\.0/);
  assert.match(html, /projeto autoral/);
});

test("mentions AI applied to Quality Engineering", () => {
  assert.match(html, /IA aplicada à Qualidade/);
});

test("shows verified company impact results", () => {
  assert.match(html, /KingHost/);
  assert.match(html, /HostGator/);
  assert.match(html, /Itaú Unibanco/);
  assert.match(html, /ThoughtWorks/);
  assert.match(html, /QualityMap/);
  assert.match(html, /SPASSU/);
  assert.match(html, /redução de 90% dos bugs em produção/);
  assert.match(html, /Redução de 20% dos bugs em produção/);
});

test("presents professional experience before the AIMA project in the page flow", () => {
  const experienceIndex = html.indexOf("Experiência e impacto");
  const aimaIndex = html.indexOf("AIMA 2.0");
  assert.ok(experienceIndex > -1, "expected the 'Experiência e impacto' section to be present");
  assert.ok(aimaIndex > -1, "expected an AIMA 2.0 mention to be present");
  assert.ok(experienceIndex < aimaIndex, "expected professional experience to appear before AIMA 2.0");
});

test("links to LinkedIn, GitHub and AIMA", () => {
  assert.match(html, /href="https:\/\/www\.linkedin\.com\/in\/jonasdavila\/"/);
  assert.match(html, /href="https:\/\/github\.com\/jonasqasoftware"/);
  assert.match(html, /href="https:\/\/aima20\.dev"/);
});

test("CTAs point to experience, LinkedIn, email and GitHub", () => {
  assert.match(html, /href="#experiencia"/);
  assert.match(html, /href="mailto:jonas\.qa\.software@gmail\.com"/);
});

test("does not use independent-consultant or agency-style commercial language", () => {
  const forbiddenPhrases = [
    "Contrate meus serviços",
    "Solicite uma consultoria",
    "Vamos trabalhar juntos",
    "Conheça minha metodologia",
    "Aplicar o AIMA na sua empresa",
    "Solicitar diagnóstico",
    "Como podemos trabalhar juntos",
  ];

  for (const phrase of forbiddenPhrases) {
    assert.doesNotMatch(html, new RegExp(phrase), `expected "${phrase}" not to appear in the page`);
  }
});
