import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { before, test } from "node:test";

const outDir = new URL("../../out/", import.meta.url);

let html;
let manifestJson;
let robotsTxt;
let sitemapXml;

before(async () => {
  html = await readFile(new URL("index.html", outDir), "utf8");
  manifestJson = JSON.parse(await readFile(new URL("manifest.webmanifest", outDir), "utf8"));
  robotsTxt = await readFile(new URL("robots.txt", outDir), "utf8");
  sitemapXml = await readFile(new URL("sitemap.xml", outDir), "utf8");
});

/** Reads width/height from a PNG's IHDR chunk (bytes 16-23), no dependency needed. */
async function pngDimensions(relativePath) {
  const buffer = await readFile(new URL(relativePath, outDir));
  assert.equal(buffer.readUInt32BE(0), 0x89504e47, `${relativePath} is not a valid PNG (bad signature)`);
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height, size: buffer.length };
}

/** Reads the declared (width,height) pairs from an ICO's ICONDIR entries. */
async function icoSizes(relativePath) {
  const buffer = await readFile(new URL(relativePath, outDir));
  assert.equal(buffer.readUInt16LE(2), 1, `${relativePath} is not a valid ICO (bad type field)`);
  const count = buffer.readUInt16LE(4);
  const sizes = [];
  for (let i = 0; i < count; i++) {
    const offset = 6 + i * 16;
    const width = buffer[offset] === 0 ? 256 : buffer[offset];
    const height = buffer[offset + 1] === 0 ? 256 : buffer[offset + 1];
    sizes.push(`${width}x${height}`);
  }
  return { count, sizes, size: buffer.length };
}

test("favicon.ico exists with 16x16, 32x32 and 48x48 frames", async () => {
  const { count, sizes, size } = await icoSizes("favicon.ico");
  assert.ok(size > 0, "favicon.ico is empty");
  assert.equal(count, 3, `expected 3 icon frames, found ${count}`);
  assert.deepEqual(new Set(sizes), new Set(["16x16", "32x32", "48x48"]));
});

test("icon.png is a valid non-empty 512x512 square PNG", async () => {
  const { width, height, size } = await pngDimensions("icon.png");
  assert.ok(size > 0, "icon.png is empty");
  assert.equal(width, 512);
  assert.equal(height, 512);
});

test("apple-icon.png is a valid non-empty 180x180 square PNG", async () => {
  const { width, height, size } = await pngDimensions("apple-icon.png");
  assert.ok(size > 0, "apple-icon.png is empty");
  assert.equal(width, 180);
  assert.equal(height, 180);
});

test("PWA install icons (192x192, 512x512) exist with correct dimensions", async () => {
  const icon192 = await pngDimensions("icons/icon-192.png");
  assert.equal(icon192.width, 192);
  assert.equal(icon192.height, 192);
  assert.ok(icon192.size > 0);

  const icon512 = await pngDimensions("icons/icon-512.png");
  assert.equal(icon512.width, 512);
  assert.equal(icon512.height, 512);
  assert.ok(icon512.size > 0);
});

test("manifest.webmanifest declares the expected installable app identity", () => {
  assert.equal(manifestJson.name, "Jonas Dávila — Senior Quality Engineer");
  assert.equal(manifestJson.short_name, "Jonas Dávila");
  assert.doesNotMatch(manifestJson.description, /consultor|consultoria|contrate|serviços/i);
  assert.equal(manifestJson.start_url, "/");
  assert.equal(manifestJson.display, "standalone");
  assert.equal(manifestJson.background_color, "#f5f3ec");
  assert.equal(manifestJson.theme_color, "#111111");
});

test("manifest.webmanifest references the 192x192 and 512x512 icons with any+maskable purposes", () => {
  const srcs = manifestJson.icons.map((icon) => icon.src);
  assert.ok(srcs.includes("/icons/icon-192.png"));
  assert.ok(srcs.includes("/icons/icon-512.png"));
  const purposesFor = (src) => manifestJson.icons.filter((i) => i.src === src).map((i) => i.purpose);
  assert.deepEqual(new Set(purposesFor("/icons/icon-192.png")), new Set(["any", "maskable"]));
  assert.deepEqual(new Set(purposesFor("/icons/icon-512.png")), new Set(["any", "maskable"]));
});

test("robots.txt allows public crawling and points to the correct sitemap", () => {
  assert.match(robotsTxt, /User-Agent:\s*\*/i);
  assert.match(robotsTxt, /Allow:\s*\//i);
  assert.doesNotMatch(robotsTxt, /Disallow:\s*\/\s*$/im);
  assert.match(robotsTxt, /Sitemap:\s*https:\/\/jonasdavila\.com\.br\/sitemap\.xml/);
});

test("sitemap.xml contains only the canonical homepage URL (no anchors, no extra pages)", () => {
  const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.deepEqual(locs, ["https://jonasdavila.com.br/"]);
  assert.doesNotMatch(sitemapXml, /#/, "sitemap must not contain in-page anchors");
});

test("index.html declares the canonical homepage URL on the official domain", () => {
  assert.match(html, /<link rel="canonical" href="https:\/\/jonasdavila\.com\.br\/?"\/>/);
});

test("index.html declares pt-BR as the document language", () => {
  assert.match(html, /<html[^>]*\blang="pt-BR"/);
});

test("index.html has no noindex/nofollow directives", () => {
  assert.doesNotMatch(html, /name="robots"[^>]*content="[^"]*noindex/i);
  assert.doesNotMatch(html, /name="googlebot"[^>]*content="[^"]*noindex/i);
});

test("index.html links favicon, icon and apple-touch-icon without repo-name or host prefixes", () => {
  assert.match(html, /<link rel="icon" href="\/favicon\.ico/);
  assert.match(html, /<link rel="icon" href="\/icon\.png/);
  assert.match(html, /<link rel="apple-touch-icon" href="\/apple-icon\.png/);
  assert.match(html, /<link rel="manifest" href="\/manifest\.webmanifest"\/>/);
});

test("index.html Open Graph/Twitter image uses an absolute URL on the official domain", () => {
  assert.match(html, /property="og:image" content="https:\/\/jonasdavila\.com\.br\/jonas-davila\.jpeg"/);
});

test("index.html embeds a truthful Person + CreativeWork JSON-LD graph without invented facts", () => {
  const match = html.match(/<script type="application\/ld\+json">(\{.*?\})<\/script>/s);
  assert.ok(match, "expected a JSON-LD script tag");
  const jsonLd = JSON.parse(match[1]);
  assert.equal(jsonLd["@context"], "https://schema.org");
  assert.ok(Array.isArray(jsonLd["@graph"]), "expected a @graph array");

  const person = jsonLd["@graph"].find((node) => node["@type"] === "Person");
  assert.ok(person, "expected a Person node in the graph");
  assert.equal(person.name, "Jonas Dávila");
  assert.equal(person.url, "https://jonasdavila.com.br/");
  assert.match(person.jobTitle, /Quality Engineer/);
  assert.ok(person.sameAs.includes("https://www.linkedin.com/in/jonasdavila/"));
  assert.ok(person.sameAs.includes("https://github.com/jonasqasoftware"));
  assert.ok(
    !person.sameAs.includes("https://aima20.dev"),
    "AIMA 2.0 is a project, not an identity-equivalent profile — it must not be in sameAs",
  );

  const creativeWork = jsonLd["@graph"].find((node) => node["@type"] === "CreativeWork");
  assert.ok(creativeWork, "expected a CreativeWork node for AIMA 2.0");
  assert.equal(creativeWork.name, "AIMA 2.0");
  assert.equal(creativeWork.url, "https://aima20.dev");
  assert.equal(creativeWork.creator["@id"], person["@id"]);

  for (const node of [person, creativeWork]) {
    for (const forbidden of ["telefone", "endereço", "salário", "R$", "avaliaç"]) {
      assert.doesNotMatch(node.description ?? "", new RegExp(forbidden, "i"));
    }
  }
});

test("no output file references localhost, chatgpt.site or the old repo-name base path", async () => {
  const haystacks = [html, JSON.stringify(manifestJson), robotsTxt, sitemapXml];
  const forbidden = [/localhost/i, /chatgpt\.site/i, /\/jonas-davila-portfolio\//];
  for (const text of haystacks) {
    for (const pattern of forbidden) {
      assert.doesNotMatch(text, pattern);
    }
  }
});

test("all generated asset files referenced by index.html actually exist in the export", async () => {
  for (const file of ["favicon.ico", "icon.png", "apple-icon.png", "icons/icon-192.png", "icons/icon-512.png", "manifest.webmanifest", "robots.txt", "sitemap.xml"]) {
    const st = await stat(new URL(file, outDir));
    assert.ok(st.isFile() && st.size > 0, `${file} should exist and be non-empty`);
  }
});
