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

test("renders title, description and canonical metadata", () => {
  assert.match(html, /<title>Jonas Dávila \| Engenharia de Qualidade<\/title>/);
  assert.match(
    html,
    /Senior Quality Engineer, autor do AIMA 2\.0\. Estratégia, automação, métricas e IA aplicadas à Qualidade de Software\./,
  );
  assert.match(html, /<link rel="canonical" href="https:\/\/jonasdavila\.com\.br\/?"/);
});

test("renders the main heading", () => {
  assert.match(html, /Engenharia de Qualidade que transforma/);
});

test("mentions 18 years in tech and 10 in Quality", () => {
  assert.match(html, /Atuo há 18 anos em tecnologia, sendo 10 dedicados à Qualidade de Software/);
});

test("mentions the PUC Minas postgraduate program", () => {
  assert.match(html, /PUC Minas/);
  assert.match(html, /Pós-graduação Lato Sensu em Engenharia de Qualidade e Teste de Software/);
});

test("mentions AIMA 2.0", () => {
  assert.match(html, /AIMA 2\.0/);
});

test("mentions AI applied to Quality Engineering", () => {
  assert.match(html, /IA aplicada à Qualidade de Software/);
});

test("links to LinkedIn, GitHub and AIMA", () => {
  assert.match(html, /href="https:\/\/www\.linkedin\.com\/in\/jonasdavila\/"/);
  assert.match(html, /href="https:\/\/github\.com\/jonasqasoftware"/);
  assert.match(html, /href="https:\/\/aima20\.dev"/);
});
