import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const cssUrl = new URL("../app/globals.css", import.meta.url);
const navUrl = new URL("../app/site-nav.tsx", import.meta.url);

const REMOVED_DECORATIVE_COLORS = [
  "#2868d8", // old blue
  "#18865d", // old green
  "#df6556", // old coral
  "#7651c8", // old violet
  "#33363b",
  "#3c3f44",
  "#7ea3e7",
  "#8b8e94",
  "#9a9ca1",
  "#c7c8c9",
  "#bfc1c4",
  "#e8e3d8",
  "#dbe7ff",
  "#cddcff",
  "#ebe7dc",
  "#d8d3c7", // old --line
  "#f6f3ea", // old --cream
  "#fffdf7", // old --paper
  "#0f1115", // old --graphite
];

test("globals.css keeps hex colors confined to the :root token block", async () => {
  const css = await readFile(cssUrl, "utf8");
  const rootBlock = css.match(/:root\s*{[^}]*}/);
  assert.ok(rootBlock, "expected a :root token block in globals.css");

  const withoutRoot = css.replace(rootBlock[0], "");
  const looseHex = withoutRoot.match(/#[0-9a-fA-F]{3,8}\b/g);
  assert.equal(looseHex, null, `found hex colors outside :root: ${looseHex}`);
});

test("globals.css defines :focus-visible styling", async () => {
  const css = await readFile(cssUrl, "utf8");
  assert.match(css, /:focus-visible/);
});

test("globals.css no longer uses the old decorative color palette", async () => {
  const css = await readFile(cssUrl, "utf8");
  const lower = css.toLowerCase();
  for (const color of REMOVED_DECORATIVE_COLORS) {
    assert.ok(!lower.includes(color), `expected ${color} to be removed from globals.css`);
  }
});

test("mobile navigation exposes accessible disclosure state", async () => {
  const nav = await readFile(navUrl, "utf8");
  assert.match(nav, /aria-expanded/);
  assert.match(nav, /aria-controls/);
  assert.match(nav, /type="button"/);
});
