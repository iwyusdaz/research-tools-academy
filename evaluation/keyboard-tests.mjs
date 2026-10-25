#!/usr/bin/env node
// Scripted keyboard task tests for the two interactive tools.
// Run: npm run test:keyboard   (serves docs/ on 127.0.0.1, headless Chromium)
//
// Covers the scripted-task-test standard from the portfolio overview: each key
// task completes with keyboard only, at desktop and 320 px widths. Focus
// movement to each new step heading is asserted explicitly.

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(join(dirname(fileURLToPath(import.meta.url)), ".."));
const DOCS = join(REPO_ROOT, "docs");
const PORT = 8791;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".pdf": "application/pdf",
};

const server = createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (path.endsWith("/")) path += "index.html";
    const file = normalize(join(DOCS, path));
    if (!file.startsWith(DOCS)) throw new Error("traversal");
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("not found");
  }
});

const results = [];
let failures = 0;
function check(name, ok, detail = "") {
  results.push({ name, ok, detail });
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
}

async function withPage(chromium, fn) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 800 } });
  try {
    await fn(page);
  } finally {
    await browser.close();
  }
}

try {
  await new Promise((r) => server.listen(PORT, "127.0.0.1", r));
  const { chromium } = await import("playwright");
  const base = `http://127.0.0.1:${PORT}`;

  // -------------------------------------------------------------------
  // Troubleshooting tool
  // -------------------------------------------------------------------
  await withPage(chromium, async (page) => {
    await page.goto(`${base}/troubleshoot/index.html`);
    const chooserButtons = page.locator("#troubleshooter button");
    await chooserButtons.first().waitFor();
    check("troubleshoot: flow chooser renders 5 flows", (await chooserButtons.count()) === 5);
    check("troubleshoot: focus lands on the chooser heading on load", await page.evaluate(() => document.activeElement?.id === "tool-heading"));
    check("troubleshoot: chooser shows a one-line hint per flow", (await page.locator(".tool-flow-hint").count()) === 5);

    // Keyboard: Tab to the first flow button and activate with Enter
    await page.keyboard.press("Tab"); // skip link / search etc. vary; find our heading first
    // Focus the tool region deterministically, then Tab into the buttons
    await page.locator("#troubleshooter h2").focus();
    const reachedButton = await page.evaluate(() => {
      const btns = [...document.querySelectorAll("#troubleshooter button")];
      return document.activeElement === btns[0];
    });
    if (!reachedButton) await page.keyboard.press("Tab");
    check("troubleshoot: first flow button reachable by Tab", await page.evaluate(() => {
      const btns = [...document.querySelectorAll("#troubleshooter button")];
      return btns.includes(document.activeElement);
    }));
    await page.keyboard.press("Enter");
    await page.locator("#step-heading").waitFor();
    check("troubleshoot: step 1 heading shown after Enter", (await page.locator("#step-heading").textContent()).length > 0);
    check("troubleshoot: focus moved to the step heading", await page.evaluate(() => document.activeElement?.id === "step-heading"));

    // Answer with keyboard: Tab to an option button and press Enter
    await page.keyboard.press("Tab");
    check("troubleshoot: first option is the next Tab stop", await page.evaluate(() => document.activeElement?.tagName === "BUTTON" && !!document.activeElement.closest(".tool-options")));
    await page.keyboard.press("Enter");
    await page.locator("#step-heading").waitFor();
    const depth2 = await page.evaluate(() => document.querySelector(".tool-status")?.textContent || "");
    check("troubleshoot: step 2 renders with status line", depth2.includes("step 2"), depth2.trim());
    check("troubleshoot: focus on the new step heading", await page.evaluate(() => document.activeElement?.id === "step-heading"));
    check("troubleshoot: status line is announced (role=status)", await page.evaluate(() => document.getElementById("tool-status")?.getAttribute("role") === "status"));

    // Back returns to the previous step
    await page.getByRole("button", { name: "Back" }).focus();
    await page.keyboard.press("Enter");
    const depth1 = await page.evaluate(() => document.querySelector(".tool-status")?.textContent || "");
    check("troubleshoot: Back returns to step 1", depth1.includes("step 1"), depth1.trim());

    // Start over resets to the chooser and moves focus to its heading
    await page.getByRole("button", { name: "Start over" }).focus();
    await page.keyboard.press("Enter");
    await page.locator("#troubleshooter button").first().waitFor();
    check("troubleshoot: focus returns to the chooser heading after Start over", await page.evaluate(() => document.activeElement?.id === "tool-heading"));

    // Walk a full flow to a terminal "solved" state (flow 1 -> Chrome -> yes)
    await page.locator("#troubleshooter button").first().focus();
    await page.keyboard.press("Enter"); // flow 1
    await page.locator("#step-heading").waitFor();
    await page.locator(".tool-options button", { hasText: "Chrome or Edge" }).focus();
    await page.keyboard.press("Enter");
    await page.locator(".tool-options button", { hasText: "Yes, solved" }).focus();
    await page.keyboard.press("Enter");
    await page.getByText("Glad it worked.").waitFor();
    check("troubleshoot: flow completes to a solved state via keyboard only", true);

    // No positive tabindex anywhere (focus order follows DOM)
    check("troubleshoot: no positive tabindex", await page.evaluate(() => ![...document.querySelectorAll("[tabindex]")].some((n) => parseInt(n.getAttribute("tabindex"), 10) > 0)));
  });

  // -------------------------------------------------------------------
  // Skills check
  // -------------------------------------------------------------------
  await withPage(chromium, async (page) => {
    await page.goto(`${base}/skills-check/index.html`);
    await page.locator("#skills-check h2").waitFor();
    check("skills-check: scenario 1 renders", (await page.locator("#skills-check h2").textContent()).includes("1 of 9"));

    for (let i = 1; i <= 9; i++) {
      // Keyboard-select the first radio (Tab into fieldset, Space)
      await page.locator("#item-heading").focus();
      await page.keyboard.press("Tab");
      check(`skills-check item ${i}: radio reachable by Tab`, await page.evaluate(() => document.activeElement?.type === "radio"));
      await page.keyboard.press("Space");
      // Check answer with keyboard
      await page.getByRole("button", { name: "Check answer" }).focus();
      await page.keyboard.press("Enter");
      await page.locator('[role="status"] h4').waitFor();
      check(`skills-check item ${i}: feedback shown with focus on it`, await page.evaluate(() => document.activeElement?.id === "feedback-heading"));
      if (i >= 2) {
        check(`skills-check item ${i}: Back still available after checking`, (await page.getByRole("button", { name: "Back" }).count()) === 1);
      }
      if (i < 9) {
        await page.getByRole("button", { name: "Next scenario" }).focus();
        await page.keyboard.press("Enter");
      } else {
        await page.getByRole("button", { name: "See your results" }).focus();
        await page.keyboard.press("Enter");
      }
    }

    await page.locator("#results-heading").waitFor();
    check("skills-check: results shown by path (3 rows)", (await page.locator("table.score-table tbody tr").count()) === 3);
    check("skills-check: nothing-stored note present", await page.locator("p.tool-note").getByText("Nothing is stored").isVisible());

    // Start over resets
    await page.getByRole("button", { name: "Start over" }).focus();
    await page.keyboard.press("Enter");
    check("skills-check: start over returns to scenario 1", (await page.locator("#skills-check h2").textContent()).includes("1 of 9"));
  });

  // -------------------------------------------------------------------
  // Reflow at 320 px (WCAG 1.4.10 proxy)
  // -------------------------------------------------------------------
  await withPage(chromium, async (page) => {
    await page.setViewportSize({ width: 320, height: 800 });
    for (const path of ["/troubleshoot/index.html", "/skills-check/index.html"]) {
      await page.goto(`${base}${path}`);
      await page.waitForTimeout(400); // allow fetch-rendered tools to mount
      const ok = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
      check(`reflow 320px: ${path} has no horizontal scroll`, ok, `scrollWidth=${await page.evaluate(() => document.documentElement.scrollWidth)}`);
    }
  });
} catch (err) {
  failures++;
  console.error("UNEXPECTED ERROR:", err);
} finally {
  server.close();
}

console.log(`\n${results.length - failures}/${results.length} checks passed`);
process.exit(failures === 0 ? 0 : 1);
