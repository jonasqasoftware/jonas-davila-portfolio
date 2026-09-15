import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { before, after, test } from "node:test";
import { chromium } from "playwright";

const outDir = fileURLToPath(new URL("../../out/", import.meta.url));

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

function contentType(filePath) {
  return MIME[path.extname(filePath)] ?? "application/octet-stream";
}

let server;
let baseUrl;
let browser;

before(async () => {
  server = createServer(async (req, res) => {
    let reqPath = decodeURIComponent(req.url.split("?")[0]);
    if (reqPath.endsWith("/")) reqPath += "index.html";
    const filePath = path.join(outDir, reqPath);
    try {
      const data = await readFile(filePath);
      res.writeHead(200, { "Content-Type": contentType(filePath) });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
});

async function measureAuthorship(width, height) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(`${baseUrl}/`, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const geometry = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll("#autoria .expertise-card"));
    return cards.map((card) => {
      const title = card.querySelector("h3");
      const cta = card.querySelector(".project-link");
      return {
        top: title.getBoundingClientRect().top,
        bottom: cta.getBoundingClientRect().bottom,
      };
    });
  });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  await page.close();
  return { geometry, overflow };
}

test("Autoria cards never cause horizontal overflow at 375/768/1024/1366", async () => {
  for (const width of [375, 768, 1024, 1366]) {
    const { overflow } = await measureAuthorship(width, 900);
    assert.equal(overflow, false, `expected no horizontal overflow in #autoria at ${width}px`);
  }
});

test("Autoria card titles align at the same top when the 3 cards share a row (1366x900)", async () => {
  const { geometry } = await measureAuthorship(1366, 900);
  assert.equal(geometry.length, 3, "expected exactly 3 authorship cards");

  const tops = geometry.map((g) => g.top);
  const topDelta = Math.max(...tops) - Math.min(...tops);

  assert.ok(
    topDelta <= 2,
    `Autoria titles are misaligned: tops=[${tops.map((t) => t.toFixed(1)).join(", ")}] max delta = ${topDelta.toFixed(1)}px; expected <= 2px`,
  );
});

test("Autoria card CTAs align at the same bottom when the 3 cards share a row (1366x900)", async () => {
  const { geometry } = await measureAuthorship(1366, 900);
  const bottoms = geometry.map((g) => g.bottom);
  const bottomDelta = Math.max(...bottoms) - Math.min(...bottoms);

  assert.ok(
    bottomDelta <= 2,
    `Autoria CTAs are misaligned: bottoms=[${bottoms.map((b) => b.toFixed(1)).join(", ")}] max delta = ${bottomDelta.toFixed(1)}px; expected <= 2px`,
  );
});

test("Autoria card titles and CTAs still align at 1024px (3 cards still share a row)", async () => {
  const { geometry } = await measureAuthorship(1024, 900);
  const tops = geometry.map((g) => g.top);
  const bottoms = geometry.map((g) => g.bottom);
  const topDelta = Math.max(...tops) - Math.min(...tops);
  const bottomDelta = Math.max(...bottoms) - Math.min(...bottoms);

  assert.ok(topDelta <= 2, `titles misaligned at 1024px: max delta = ${topDelta.toFixed(1)}px`);
  assert.ok(bottomDelta <= 2, `CTAs misaligned at 1024px: max delta = ${bottomDelta.toFixed(1)}px`);
});

function groupCardsByRow(cards, tolerance = 2) {
  const sorted = [...cards].sort((a, b) => a.cardTop - b.cardTop);
  const rows = [];
  for (const card of sorted) {
    const row = rows.find((r) => Math.abs(r[0].cardTop - card.cardTop) <= tolerance);
    if (row) row.push(card);
    else rows.push([card]);
  }
  return rows;
}

async function measureLaboratorios(width, height) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(`${baseUrl}/`, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const cards = await page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll("#laboratorios .expertise-card"));
    return nodes.map((card) => {
      const title = card.querySelector("h3");
      const cta = card.querySelector(".project-link");
      return {
        cardTop: card.getBoundingClientRect().top,
        top: title.getBoundingClientRect().top,
        bottom: cta ? cta.getBoundingClientRect().bottom : null,
      };
    });
  });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  await page.close();
  return { rows: groupCardsByRow(cards), overflow };
}

test("Laboratorios cards never cause horizontal overflow at 375/768/1024/1366", async () => {
  for (const width of [375, 768, 1024, 1366]) {
    const { overflow } = await measureLaboratorios(width, 900);
    assert.equal(overflow, false, `expected no horizontal overflow in #laboratorios at ${width}px`);
  }
});

test("Laboratorios card titles align at the same top within each row at 375/768/1024/1366", async () => {
  for (const width of [375, 768, 1024, 1366]) {
    const { rows } = await measureLaboratorios(width, 900);
    rows.forEach((row, rowIndex) => {
      if (row.length < 2) return;
      const tops = row.map((c) => c.top);
      const topDelta = Math.max(...tops) - Math.min(...tops);
      assert.ok(
        topDelta <= 2,
        `Laboratorios titles misaligned at ${width}px row ${rowIndex}: tops=[${tops.map((t) => t.toFixed(1)).join(", ")}] max delta = ${topDelta.toFixed(1)}px; expected <= 2px`,
      );
    });
  }
});

test("Laboratorios card CTAs align at the same bottom within each row at 375/768/1024/1366", async () => {
  for (const width of [375, 768, 1024, 1366]) {
    const { rows } = await measureLaboratorios(width, 900);
    rows.forEach((row, rowIndex) => {
      const bottoms = row.map((c) => c.bottom).filter((b) => b !== null);
      if (bottoms.length < 2) return;
      const bottomDelta = Math.max(...bottoms) - Math.min(...bottoms);
      assert.ok(
        bottomDelta <= 2,
        `Laboratorios CTAs misaligned at ${width}px row ${rowIndex}: bottoms=[${bottoms.map((b) => b.toFixed(1)).join(", ")}] max delta = ${bottomDelta.toFixed(1)}px; expected <= 2px`,
      );
    });
  }
});
