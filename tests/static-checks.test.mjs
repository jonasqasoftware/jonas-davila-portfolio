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

test("globals.css keeps fixed-size type tokens at or above the 12px metadata floor", async () => {
  const css = await readFile(cssUrl, "utf8");
  const rootBlock = css.match(/:root\s*{[^}]*}/)[0];
  const fixedTokens = rootBlock.matchAll(/--text-(2xs|xs|sm|md|lg|xl|3xl):\s*(\d+)px/g);
  const offenders = [];
  for (const [, name, value] of fixedTokens) {
    if (Number(value) < 12) offenders.push(`--text-${name}: ${value}px`);
  }
  assert.deepEqual(offenders, [], `expected no fixed type token below 12px, found: ${offenders.join(", ")}`);
});

test("globals.css keeps the h1 fluid clamp from flooring back to an oversized mobile heading", async () => {
  const css = await readFile(cssUrl, "utf8");
  const match = css.match(/--text-6xl:\s*clamp\((\d+)px/);
  assert.ok(match, "expected --text-6xl to be defined as a clamp()");
  assert.ok(
    Number(match[1]) <= 40,
    `expected the h1 clamp() floor to stay <=40px for narrow phones, found ${match[1]}px`,
  );
});

test("globals.css keeps the mobile hero heading softened (letter-spacing and line-height overrides)", async () => {
  const css = await readFile(cssUrl, "utf8");
  const mobileBlock = css.match(/@media\(max-width:600px\)\s*{([\s\S]*?)}\s*@media\(prefers-reduced-motion/);
  assert.ok(mobileBlock, "expected the <=600px media query block to be present");
  assert.match(mobileBlock[1], /h1\s*{[^}]*letter-spacing/, "expected a mobile h1 letter-spacing override");
  assert.match(mobileBlock[1], /h1\s*{[^}]*line-height/, "expected a mobile h1 line-height override");
});

test("globals.css keeps the mobile hero single-column layout", async () => {
  const css = await readFile(cssUrl, "utf8");
  const tabletBlock = css.match(/@media\(max-width:900px\)\s*{([\s\S]*?)}\s*@media\(max-width:600px\)/);
  assert.ok(tabletBlock, "expected the <=900px media query block to be present");
  assert.match(tabletBlock[1], /\.hero\s*{[^}]*grid-template-columns:1fr/);
});

test("globals.css no longer collapses small labels to line-height:1", async () => {
  const css = await readFile(cssUrl, "utf8");
  const flaggedSelectors = [
    /\.portrait-frame figcaption\s*{[^}]*}/,
    /\.contact-links span\s*{[^}]*}/,
    /footer \.container\s*{[^}]*}/,
    /\.profile-tags span\s*{[^}]*}/,
  ];
  for (const selectorPattern of flaggedSelectors) {
    const rule = css.match(selectorPattern);
    assert.ok(rule, `expected to find rule matching ${selectorPattern}`);
    assert.doesNotMatch(rule[0], /\/1 var\(--font-mono\)/, `expected ${rule[0]} not to use line-height:1`);
  }
});

test("globals.css keeps nav CTA and body copy off the old 12px/14px mobile floor", async () => {
  const css = await readFile(cssUrl, "utf8");
  assert.doesNotMatch(css, /\.nav-cta\s*{\s*font-size:\s*12px/, "expected no mobile .nav-cta font-size regression back to 12px");
  assert.doesNotMatch(css, /\.hero-lead\s*{\s*font-size:\s*18px/, "expected mobile .hero-lead to use the text-lg token, not a loose 18px value");
});
