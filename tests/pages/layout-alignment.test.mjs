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

async function measureComoPenso(width, height) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(`${baseUrl}/`, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const { cards, container } = await page.evaluate(() => {
    const grid = document.querySelector("#como-penso .expertise-grid");
    const nodes = Array.from(grid.querySelectorAll(".expertise-card"));
    const gr = grid.getBoundingClientRect();
    return {
      container: { left: gr.left, right: gr.right },
      cards: nodes.map((card) => {
        const title = card.querySelector("h3");
        const rect = card.getBoundingClientRect();
        return {
          cardTop: rect.top,
          cardLeft: rect.left,
          cardRight: rect.right,
          cardWidth: rect.width,
          bottom: rect.bottom,
          top: title.getBoundingClientRect().top,
        };
      }),
    };
  });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  await page.close();
  return { cards, container, rows: groupCardsByRow(cards), overflow };
}

test("Como penso cards never cause horizontal overflow at 375/768/1024/1366", async () => {
  for (const width of [375, 768, 1024, 1366]) {
    const { overflow } = await measureComoPenso(width, 900);
    assert.equal(overflow, false, `expected no horizontal overflow in #como-penso at ${width}px`);
  }
});

test("Como penso: exactly 5 principle cards are rendered", async () => {
  const { cards } = await measureComoPenso(1366, 900);
  assert.equal(cards.length, 5, "expected exactly 5 principle cards in #como-penso");
});

test("Como penso card titles align at the same top within each row at 375/768/1024/1366", async () => {
  for (const width of [375, 768, 1024, 1366]) {
    const { rows } = await measureComoPenso(width, 900);
    rows.forEach((row, rowIndex) => {
      if (row.length < 2) return;
      const tops = row.map((c) => c.top);
      const topDelta = Math.max(...tops) - Math.min(...tops);
      assert.ok(
        topDelta <= 2,
        `Como penso titles misaligned at ${width}px row ${rowIndex}: tops=[${tops.map((t) => t.toFixed(1)).join(", ")}] max delta = ${topDelta.toFixed(1)}px; expected <= 2px`,
      );
    });
  }
});

test("Como penso card bottoms align within each row at 375/768/1024/1366", async () => {
  for (const width of [375, 768, 1024, 1366]) {
    const { rows } = await measureComoPenso(width, 900);
    rows.forEach((row, rowIndex) => {
      if (row.length < 2) return;
      const bottoms = row.map((c) => c.bottom);
      const bottomDelta = Math.max(...bottoms) - Math.min(...bottoms);
      assert.ok(
        bottomDelta <= 2,
        `Como penso card bottoms misaligned at ${width}px row ${rowIndex}: bottoms=[${bottoms.map((b) => b.toFixed(1)).join(", ")}] max delta = ${bottomDelta.toFixed(1)}px; expected <= 2px`,
      );
    });
  }
});

test("Como penso: on desktop (1024/1366), cards 4 and 5 are geometrically centered as a group within the grid, with equal card widths", async () => {
  for (const width of [1024, 1366]) {
    const { rows, container } = await measureComoPenso(width, 900);
    assert.equal(rows.length, 2, `expected 2 rows of principle cards at ${width}px`);
    const [row0, row1] = rows;
    assert.equal(row0.length, 3, `expected 3 cards in the first row at ${width}px`);
    assert.equal(row1.length, 2, `expected 2 cards in the second row at ${width}px`);

    const groupLeft = Math.min(row1[0].cardLeft, row1[1].cardLeft);
    const groupRight = Math.max(row1[0].cardRight, row1[1].cardRight);
    const leftSpace = groupLeft - container.left;
    const rightSpace = container.right - groupRight;
    const lateralDelta = Math.abs(leftSpace - rightSpace);

    assert.ok(
      lateralDelta <= 2,
      `expected cards 4/5 to be centered as a group at ${width}px: leftSpace=${leftSpace.toFixed(1)} rightSpace=${rightSpace.toFixed(1)} delta=${lateralDelta.toFixed(1)}px; expected <= 2px`,
    );

    const referenceWidth = row0[0].cardWidth;
    for (const [label, card] of [["card 4", row1[0]], ["card 5", row1[1]]]) {
      const widthDelta = Math.abs(card.cardWidth - referenceWidth);
      assert.ok(
        widthDelta <= 2,
        `expected ${label} width (${card.cardWidth.toFixed(1)}px) to match row-1 card width (${referenceWidth.toFixed(1)}px) at ${width}px; delta=${widthDelta.toFixed(1)}px`,
      );
    }
  }
});
