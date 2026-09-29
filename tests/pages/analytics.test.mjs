import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { before, after, test } from "node:test";
import { chromium } from "playwright";

const outDir = fileURLToPath(new URL("../../out/", import.meta.url));
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

const ALLOWED_EVENT_NAMES = new Set([
  "cv_download",
  "case_open",
  "project_click",
  "contact_click",
  "primary_cta_click",
]);
const ALLOWED_PARAM_KEYS = new Set(["placement", "case_slug", "project_slug", "contact_method"]);
const PII_PATTERNS = [/jonas\.qa\.software@gmail\.com/i, /@/, /telefone/i, /endereço/i];

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

let html;
let server;
let baseUrl;
let browser;

before(async () => {
  html = await readFile(path.join(outDir, "index.html"), "utf8");
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

test("GA4's gtag.js is never referenced in the statically exported HTML (only injected client-side, after consent)", () => {
  assert.doesNotMatch(html, /googletagmanager\.com/);
});

test(
  "no consent UI renders in the export when NEXT_PUBLIC_GA_MEASUREMENT_ID is not configured",
  { skip: measurementId ? "a measurement id is configured for this run" : false },
  () => {
    assert.doesNotMatch(html, /consent-banner/);
  },
);

test(
  "consent banner offers explicit Accept and Reject controls when GA4 is configured",
  { skip: measurementId ? false : "no measurement id configured for this run" },
  () => {
    assert.match(html, /consent-banner/);
    assert.match(html, />Rejeitar</);
    assert.match(html, />Aceitar</);
  },
);

async function withPage(run) {
  const page = await browser.newPage();
  const gaRequests = [];
  await page.route("https://www.googletagmanager.com/**", (route) => {
    gaRequests.push(route.request().url());
    route.fulfill({ status: 200, contentType: "application/javascript", body: "/* stub gtag.js */" });
  });
  await page.goto(`${baseUrl}/`, { waitUntil: "load" });
  try {
    return await run(page, gaRequests);
  } finally {
    await page.close();
  }
}

/** Dispatches a synthetic click that still bubbles to the document (for our delegated listener)
 * but never triggers the anchor's real navigation/download side effect. */
async function fireGaEvent(page, selector) {
  await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    const preventNavigation = (event) => event.preventDefault();
    element.addEventListener("click", preventNavigation, { once: true, capture: true });
    element.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  }, selector);
}

/** Polls a condition instead of relying on Playwright's request-event ordering, which is not
 * guaranteed relative to a page.route() handler's own execution. */
async function waitUntil(conditionFn, { timeout = 5000, interval = 20 } = {}) {
  const start = Date.now();
  while (!conditionFn()) {
    if (Date.now() - start > timeout) throw new Error("waitUntil: condition not met within timeout");
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
}

/** window.gtag is assigned synchronously before the <script> tag's network request actually
 * fires, so waiting on it alone races the request — wait on the captured request list instead. */
async function acceptConsent(page, gaRequests) {
  await page.click("button:has-text('Aceitar')");
  await waitUntil(() => gaRequests.length > 0);
  await page.waitForFunction(() => typeof window.gtag === "function");
}

test("no request to Google Analytics happens before the visitor accepts", { skip: !measurementId }, async () => {
  await withPage(async (page, gaRequests) => {
    await page.waitForTimeout(200);
    assert.equal(gaRequests.length, 0, "expected zero requests to googletagmanager.com before consent");
    const gtagType = await page.evaluate(() => typeof window.gtag);
    assert.equal(gtagType, "undefined");
  });
});

test(
  "accepting consent loads GA4 exactly once and keeps ad personalization denied by default",
  { skip: !measurementId },
  async () => {
    await withPage(async (page, gaRequests) => {
      await acceptConsent(page, gaRequests);
      assert.equal(gaRequests.length, 1, "expected exactly one request to load gtag.js");

      // The tag receives a "default" call (denied, set at bootstrap) followed by an explicit
      // "update" call once consent is granted — check the resulting effective state, not the first call.
      const consentCalls = await page.evaluate(() =>
        window.dataLayer.filter((entry) => entry[0] === "consent"),
      );
      assert.ok(consentCalls.length >= 1, "expected at least one gtag('consent', ...) call");
      const effectiveConsent = consentCalls.at(-1);
      assert.equal(effectiveConsent[2].analytics_storage, "granted");
      assert.equal(effectiveConsent[2].ad_storage, "denied");
      assert.equal(effectiveConsent[2].ad_user_data, "denied");
      assert.equal(effectiveConsent[2].ad_personalization, "denied");
    });
  },
);

test(
  "rejecting consent keeps analytics disabled and does not block normal navigation",
  { skip: !measurementId },
  async () => {
    await withPage(async (page, gaRequests) => {
      await page.click("button:has-text('Rejeitar')");
      await page.waitForTimeout(200);
      assert.equal(gaRequests.length, 0);
      const gtagType = await page.evaluate(() => typeof window.gtag);
      assert.equal(gtagType, "undefined");

      await page.click('a[href="#experiencia"]');
      await page.waitForTimeout(100);
      const hash = await page.evaluate(() => window.location.hash);
      assert.equal(hash, "#experiencia");
    });
  },
);

test(
  "accepting again while already granted does not duplicate the GA4 script or send a second request",
  { skip: !measurementId },
  async () => {
    await withPage(async (page, gaRequests) => {
      await acceptConsent(page, gaRequests);
      assert.equal(gaRequests.length, 1);

      await page.click("button:has-text('Preferências de privacidade')");
      await page.click("button:has-text('Aceitar')");
      await page.waitForTimeout(200);

      assert.equal(gaRequests.length, 1, "expected no additional gtag.js request on a repeated accept");
      const scriptCount = await page.evaluate(() => document.querySelectorAll("#ga4-script").length);
      assert.equal(scriptCount, 1, "expected only one gtag.js script element in the document");
    });
  },
);

test(
  "a returning visitor with consent already granted loads GA4 exactly once on page load, with no banner shown",
  { skip: !measurementId },
  async () => {
    const context = await browser.newContext();
    await context.addInitScript(() => window.localStorage.setItem("ga-consent", "granted"));
    const page = await context.newPage();
    const gaRequests = [];
    await page.route("https://www.googletagmanager.com/**", (route) => {
      gaRequests.push(route.request().url());
      route.fulfill({ status: 200, contentType: "application/javascript", body: "/* stub gtag.js */" });
    });

    await page.goto(`${baseUrl}/`, { waitUntil: "load" });
    await waitUntil(() => gaRequests.length > 0);
    assert.equal(gaRequests.length, 1, "expected exactly one gtag.js request for a returning consenting visitor");

    const bannerVisible = await page.evaluate(() => Boolean(document.querySelector(".consent-banner")));
    assert.equal(bannerVisible, false, "expected no consent banner for a visitor who already granted consent");

    await context.close();
  },
);

test(
  "a real (non-synthetic) click on the CV link still downloads the PDF and fires cv_download exactly once",
  { skip: !measurementId },
  async () => {
    const context = await browser.newContext({ acceptDownloads: true });
    const page = await context.newPage();
    const gaRequests = [];
    await page.route("https://www.googletagmanager.com/**", (route) => {
      gaRequests.push(route.request().url());
      route.fulfill({ status: 200, contentType: "application/javascript", body: "/* stub gtag.js */" });
    });

    await page.goto(`${baseUrl}/`, { waitUntil: "load" });
    await acceptConsent(page, gaRequests);
    await page.evaluate(() => {
      window.dataLayer.length = 0;
    });

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.click('[data-ga-event="cv_download"]'),
    ]);
    assert.match(download.suggestedFilename(), /cv-jonas-davila\.pdf/);

    const events = await page.evaluate(() => window.dataLayer.filter((entry) => entry[0] === "event"));
    assert.equal(events.length, 1, "expected exactly one custom event for a single real CV click");
    assert.equal(events[0][1], "cv_download");
    assert.deepEqual(events[0][2], { placement: "hero" });

    await context.close();
  },
);

test("consent banner never causes horizontal overflow at mobile width", { skip: !measurementId }, async () => {
  const page = await browser.newPage({ viewport: { width: 375, height: 700 } });
  await page.route("https://www.googletagmanager.com/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "/* stub gtag.js */" }),
  );
  await page.goto(`${baseUrl}/`, { waitUntil: "load" });
  await page.waitForSelector(".consent-banner");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  await page.close();
  assert.equal(overflow, false, "expected the consent banner to never cause horizontal page overflow at 375px");
});

test("consent preference can be changed later via the reopen control", { skip: !measurementId }, async () => {
  await withPage(async (page, gaRequests) => {
    await page.click("button:has-text('Rejeitar')");
    await page.click("button:has-text('Preferências de privacidade')");
    await page.waitForSelector("button:has-text('Aceitar')");
    await acceptConsent(page, gaRequests);
    assert.equal(gaRequests.length, 1, "expected GA4 to load once the preference was changed to accept");
  });
});

async function withdrawConsent(page) {
  await page.click("button:has-text('Preferências de privacidade')");
  await page.click("button:has-text('Rejeitar')");
}

test(
  "withdrawing consent after accepting sends an explicit consent update to the already-loaded tag and stops forwarding new events",
  { skip: !measurementId },
  async () => {
    await withPage(async (page, gaRequests) => {
      await acceptConsent(page, gaRequests);

      const initialConsentCalls = await page.evaluate(() =>
        window.dataLayer.filter((entry) => entry[0] === "consent"),
      );
      assert.ok(initialConsentCalls.length >= 1, "expected the tag to have received at least one consent call on load");

      await withdrawConsent(page);

      const storedConsent = await page.evaluate(() => window.localStorage.getItem("ga-consent"));
      assert.equal(storedConsent, "denied", "expected the withdrawal to persist as denied");

      const updateCalls = await page.evaluate(() =>
        window.dataLayer.filter((entry) => entry[0] === "consent" && entry[1] === "update"),
      );
      assert.ok(
        updateCalls.length >= 1,
        "expected an explicit gtag('consent', 'update', ...) call to the already-loaded tag after withdrawal",
      );
      assert.equal(updateCalls.at(-1)[2].analytics_storage, "denied");

      await page.evaluate(() => {
        window.dataLayer.length = 0;
      });
      await fireGaEvent(page, '[data-ga-event="cv_download"]');
      const eventsAfterWithdrawal = await page.evaluate(() =>
        window.dataLayer.filter((entry) => entry[0] === "event"),
      );
      assert.equal(
        eventsAfterWithdrawal.length,
        0,
        "expected no custom events to be forwarded after consent withdrawal, even though window.gtag still exists",
      );
    });
  },
);

test(
  "a reload after withdrawing consent does not reactivate analytics",
  { skip: !measurementId },
  async () => {
    await withPage(async (page, gaRequests) => {
      await acceptConsent(page, gaRequests);
      await withdrawConsent(page);
      assert.equal(gaRequests.length, 1, "sanity: exactly one gtag.js request before the reload");

      await page.reload({ waitUntil: "load" });
      await page.waitForTimeout(300);

      assert.equal(gaRequests.length, 1, "expected no additional gtag.js request after reloading with denied consent");
      const gtagType = await page.evaluate(() => typeof window.gtag);
      assert.equal(gtagType, "undefined", "expected GA4 to remain unloaded on a fresh page instance with denied consent");

      const bannerVisible = await page.evaluate(() => Boolean(document.querySelector(".consent-banner")));
      assert.equal(bannerVisible, false, "expected no banner to reappear — a decision was already made");

      await fireGaEvent(page, '[data-ga-event="cv_download"]');
      const gtagTypeAfterClick = await page.evaluate(() => typeof window.gtag);
      assert.equal(gtagTypeAfterClick, "undefined", "expected the click to have no tracking side effect at all");
    });
  },
);

test(
  "the visitor can grant consent again after withdrawing it, and tracking resumes",
  { skip: !measurementId },
  async () => {
    await withPage(async (page, gaRequests) => {
      await acceptConsent(page, gaRequests);
      await withdrawConsent(page);

      await page.click("button:has-text('Preferências de privacidade')");
      await page.click("button:has-text('Aceitar')");
      await page.waitForFunction(() => typeof window.gtag === "function");

      const updateCalls = await page.evaluate(() =>
        window.dataLayer.filter((entry) => entry[0] === "consent" && entry[1] === "update"),
      );
      assert.ok(updateCalls.length >= 1, "expected an explicit re-grant consent update");
      assert.equal(updateCalls.at(-1)[2].analytics_storage, "granted");

      await page.evaluate(() => {
        window.dataLayer.length = 0;
      });
      await fireGaEvent(page, '[data-ga-event="cv_download"]');
      const events = await page.evaluate(() => window.dataLayer.filter((entry) => entry[0] === "event"));
      assert.equal(events.length, 1, "expected tracking to resume after re-granting consent");
    });
  },
);

test(
  "rejecting on first visit (no prior accept) blocks all custom events, covered separately from withdrawal",
  { skip: !measurementId },
  async () => {
    await withPage(async (page, gaRequests) => {
      await page.click("button:has-text('Rejeitar')");
      await fireGaEvent(page, '[data-ga-event="cv_download"]');
      const gtagType = await page.evaluate(() => typeof window.gtag);
      assert.equal(gtagType, "undefined");
      assert.equal(gaRequests.length, 0);
    });
  },
);

test(
  "CV download click emits exactly one cv_download event with only the controlled placement parameter",
  { skip: !measurementId },
  async () => {
    await withPage(async (page, gaRequests) => {
      await acceptConsent(page, gaRequests);
      await page.evaluate(() => {
        window.dataLayer.length = 0;
      });
      await fireGaEvent(page, '[data-ga-event="cv_download"]');
      const events = await page.evaluate(() => window.dataLayer.filter((entry) => entry[0] === "event"));
      assert.equal(events.length, 1, "expected exactly one custom event for a single CV click");
      assert.equal(events[0][1], "cv_download");
      assert.deepEqual(events[0][2], { placement: "hero" });
    });
  },
);

test(
  "case and project interactions send the correct controlled identifiers",
  { skip: !measurementId },
  async () => {
    await withPage(async (page, gaRequests) => {
      await acceptConsent(page, gaRequests);

      await page.evaluate(() => {
        window.dataLayer.length = 0;
      });
      await fireGaEvent(
        page,
        '[data-ga-event="case_open"][data-case-slug="expense-approval-quality-lab"]',
      );
      const caseEvents = await page.evaluate(() => window.dataLayer.filter((entry) => entry[0] === "event"));
      assert.equal(caseEvents.length, 1);
      assert.equal(caseEvents[0][1], "case_open");
      assert.equal(caseEvents[0][2].case_slug, "expense-approval-quality-lab");

      await page.evaluate(() => {
        window.dataLayer.length = 0;
      });
      await fireGaEvent(page, '[data-ga-event="project_click"][data-project-slug="sql-quality-checker"]');
      const projectEvents = await page.evaluate(() =>
        window.dataLayer.filter((entry) => entry[0] === "event"),
      );
      assert.equal(projectEvents.length, 1);
      assert.equal(projectEvents[0][1], "project_click");
      assert.equal(projectEvents[0][2].project_slug, "sql-quality-checker");

      await page.evaluate(() => {
        window.dataLayer.length = 0;
      });
      await fireGaEvent(page, '[data-ga-event="contact_click"][data-contact-method="email"]');
      const contactEvents = await page.evaluate(() =>
        window.dataLayer.filter((entry) => entry[0] === "event"),
      );
      assert.equal(contactEvents.length, 1);
      assert.equal(contactEvents[0][1], "contact_click");
      assert.equal(contactEvents[0][2].contact_method, "email");
    });
  },
);

test(
  "every trackable interaction on the page only ever sends allow-listed event names, allow-listed parameter keys, and never personal information",
  { skip: !measurementId },
  async () => {
    await withPage(async (page, gaRequests) => {
      await acceptConsent(page, gaRequests);

      const selectors = await page.evaluate(() =>
        Array.from(document.querySelectorAll("[data-ga-event]")).map((element, index) => {
          element.setAttribute("data-ga-test-index", String(index));
          return `[data-ga-test-index="${index}"]`;
        }),
      );
      assert.ok(selectors.length > 0, "expected at least one trackable element on the page");

      await page.evaluate(() => {
        window.dataLayer.length = 0;
      });
      for (const selector of selectors) {
        await fireGaEvent(page, selector);
      }

      const events = await page.evaluate(() => window.dataLayer.filter((entry) => entry[0] === "event"));
      assert.equal(events.length, selectors.length, "expected exactly one event per trackable element");

      for (const [, name, params] of events) {
        assert.ok(ALLOWED_EVENT_NAMES.has(name), `unexpected event name "${name}"`);
        for (const [key, value] of Object.entries(params)) {
          assert.ok(ALLOWED_PARAM_KEYS.has(key), `unexpected event parameter "${key}"`);
          for (const pattern of PII_PATTERNS) {
            assert.doesNotMatch(String(value), pattern, `event parameter "${key}" looks like personal information`);
          }
        }
      }
    });
  },
);
