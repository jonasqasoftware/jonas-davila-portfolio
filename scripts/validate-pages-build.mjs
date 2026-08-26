import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";

const htmlPath = new URL("../out/index.html", import.meta.url);
const photoPath = new URL("../out/jonas-davila.jpeg", import.meta.url);
const chunksDirectory = new URL("../out/_next/static/chunks/", import.meta.url);

await access(htmlPath);
await access(photoPath);
await access(chunksDirectory);

const chunks = await readdir(chunksDirectory);
assert.ok(chunks.some((file) => file.endsWith(".css")), "expected an emitted CSS chunk");

const html = await readFile(htmlPath, "utf8");

assert.match(html, /<html[^>]+lang="pt-BR"/);
assert.match(html, /Engenharia de qualidade para produtos mais confiáveis./);
assert.match(html, /Senior QA Engineer e Quality Engineer/);
assert.match(html, /href="https:\/\/jonasdavila\.com\.br\/?"/);
assert.match(html, /jonas-davila\.jpeg/);
assert.doesNotMatch(html, /codex-preview/);

console.log("GitHub Pages artifact validated.");
