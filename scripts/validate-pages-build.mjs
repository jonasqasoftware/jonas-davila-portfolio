import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";

const htmlPath = new URL("../out/index.html", import.meta.url);
const photoPath = new URL("../out/jonas-davila-hero.webp", import.meta.url);
const englishPath = new URL("../out/en/index.html", import.meta.url);
const chunksDirectory = new URL("../out/_next/static/chunks/", import.meta.url);

await access(htmlPath);
await access(photoPath);
await access(englishPath);
await access(chunksDirectory);

const chunks = await readdir(chunksDirectory);
assert.ok(chunks.some((file) => file.endsWith(".css")), "expected an emitted CSS chunk");

const html = await readFile(htmlPath, "utf8");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

assert.match(html, /<html[^>]+lang="pt-BR"/);
assert.match(html, /Engenharia de qualidade para produtos mais confiáveis./);
assert.match(html, /Senior QA Engineer e Quality Engineer/);
assert.match(html, /href="https:\/\/jonasdavila\.com\.br\/?"/);
assert.ok(
  html.includes(`src="${basePath}/jonas-davila-hero.webp"`),
  `expected portrait URL to use base path "${basePath}"`,
);
assert.doesNotMatch(html, /codex-preview/);

const englishHtml = await readFile(englishPath, "utf8");
assert.match(englishHtml, /<html[^>]+lang="en"/);
assert.match(englishHtml, /Quality engineering that makes products more reliable\./);

console.log("GitHub Pages artifact validated.");
