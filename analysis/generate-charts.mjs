// Generates the SVG charts used in analysis/support-analysis.md.
// Run: node analysis/generate-charts.mjs   (writes analysis/figures/*.svg)
// Charts are hand-scaled SVG so they stay accessible (text labels + values,
// no meaning carried by color alone) and reproducible from the data below.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "figures");
mkdirSync(outDir, { recursive: true });

const FONT = 'font-family="-apple-system, \'Segoe UI\', Helvetica, Arial, sans-serif"';

// Escape text content so ampersands in labels stay valid XML.
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ---------------------------------------------------------------------------
// Chart 1: frequency by category (questions + bug reports; feature requests
// excluded). Counts from analysis/support-questions.csv, 2026-10-25.
// ---------------------------------------------------------------------------
const categories = [
  ["Browser connector & saving from the web (C1)", 20],
  ["PDF reader, annotations & notes (C6)", 16],
  ["Sync, storage & accounts (C5)", 16],
  ["Word processor plugin (C2)", 15],
  ["Citations & citation styles (C3)", 13],
  ["Installation, updates & stability (C11)", 13],
  ["Mobile apps, iOS/Android (C7)", 12],
  ["Import, export, metadata & duplicates (C9)", 9],
  ["Groups & collaboration (C8)", 6],
  ["Search, collections, tags & organization (C10)", 6],
  ["Bibliography generation & formatting (C4)", 2],
];

function barChart(rows, title, desc, id) {
  const rowH = 34;
  const labelW = 330;
  const plotW = 330;
  const top = 58;
  const width = 760;
  const height = top + rows.length * rowH + 26;
  const max = Math.max(...rows.map((r) => r[1]));
  const scale = (v) => (v / max) * plotW;
  let y = top;
  let bars = "";
  let axis = "";
  for (const [label, value] of rows) {
    const w = Math.max(scale(value), 2);
    bars += `<text x="${labelW - 12}" y="${y + 15}" text-anchor="end" ${FONT} font-size="13" fill="#1f2d3d">${esc(label)}</text>`;
    bars += `<rect x="${labelW}" y="${y + 4}" width="${w.toFixed(1)}" height="20" fill="#1a4f72" rx="2"></rect>`;
    bars += `<text x="${labelW + w + 8}" y="${y + 19}" ${FONT} font-size="13" font-weight="600" fill="#1f2d3d">${value}</text>`;
    y += rowH;
  }
  // gridlines every 5 units
  for (let v = 0; v <= max; v += 5) {
    const gx = labelW + scale(v);
    axis += `<line x1="${gx}" y1="${top - 6}" x2="${gx}" y2="${y - rowH + 28}" stroke="#d3dce6" stroke-width="1"></line>`;
    axis += `<text x="${gx}" y="${top - 12}" text-anchor="middle" ${FONT} font-size="11" fill="#5a6b7b">${v}</text>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="${id}-t ${id}-d">
<title id="${id}-t">${esc(title)}</title>
<desc id="${id}-d">${esc(desc)}</desc>
${axis}${bars}
<text x="8" y="${height - 8}" ${FONT} font-size="11" fill="#5a6b7b">Source: 128 questions and bug reports from the Zotero forums and knowledge base, collected 2026-10-25.</text>
</svg>
`;
}

// ---------------------------------------------------------------------------
// Chart 2: fix route per category (education / both / product), stacked.
// ---------------------------------------------------------------------------
const fixSplit = [
  ["Browser connector & saving (C1)", 4, 3, 13],
  ["PDF reader & annotations (C6)", 1, 1, 14],
  ["Sync, storage & accounts (C5)", 6, 1, 9],
  ["Word processor plugin (C2)", 5, 0, 10],
  ["Citations & citation styles (C3)", 7, 5, 1],
  ["Installation & stability (C11)", 2, 0, 11],
  ["Mobile apps (C7)", 1, 0, 11],
  ["Import/export & duplicates (C9)", 6, 1, 2],
  ["Groups & collaboration (C8)", 4, 0, 2],
  ["Search & organization (C10)", 3, 0, 3],
  ["Bibliography formatting (C4)", 1, 0, 1],
];

function stackedChart(rows, title, desc, id) {
  const rowH = 38;
  const labelW = 300;
  const plotW = 360;
  const top = 92;
  const width = 760;
  const height = top + rows.length * rowH + 30;
  const max = Math.max(...rows.map((r) => r[1] + r[2] + r[3]));
  const scale = (v) => (v / max) * plotW;
  const colors = { edu: "#1a4f72", both: "#7fa6c9", product: "#c4d6e5" };
  let body = "";
  let y = top;
  for (const [label, edu, both, product] of rows) {
    const total = edu + both + product;
    let x = labelW;
    let seg = "";
    const parts = [
      ["edu", edu], ["both", both], ["product", product],
    ];
    for (const [kind, v] of parts) {
      if (v === 0) continue;
      const w = Math.max(scale(v), 2);
      const fill = kind === "both" ? "url(#hatchBoth)" : colors[kind];
      const txtColor = kind === "edu" ? "#ffffff" : "#1f2d3d";
      seg += `<rect x="${x.toFixed(1)}" y="${y + 4}" width="${w.toFixed(1)}" height="22" fill="${fill}" stroke="#ffffff" stroke-width="1"></rect>`;
      if (v >= 2) {
        seg += `<text x="${(x + w / 2).toFixed(1)}" y="${y + 19}" text-anchor="middle" ${FONT} font-size="11" font-weight="600" fill="${txtColor}">${v}</text>`;
      }
      x += w;
    }
    body += `<text x="${labelW - 12}" y="${y + 19}" text-anchor="end" ${FONT} font-size="13" fill="#1f2d3d">${esc(label)}</text>`;
    body += seg;
    body += `<text x="${labelW + scale(total) + 8}" y="${y + 19}" ${FONT} font-size="12" fill="#5a6b7b">total ${total}</text>`;
    y += rowH;
  }
  const legend = `
<rect x="8" y="30" width="14" height="14" fill="#1a4f72"></rect>
<text x="27" y="42" ${FONT} font-size="12" fill="#1f2d3d">Education (knowledge gap)</text>
<rect x="228" y="30" width="14" height="14" fill="url(#hatchBoth)" stroke="#7fa6c9"></rect>
<text x="247" y="42" ${FONT} font-size="12" fill="#1f2d3d">Both (documented behavior, avoidable)</text>
<rect x="510" y="30" width="14" height="14" fill="#c4d6e5"></rect>
<text x="529" y="42" ${FONT} font-size="12" fill="#1f2d3d">Product / bug</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="${id}-t ${id}-d">
<defs>
<pattern id="hatchBoth" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
<rect width="6" height="6" fill="#7fa6c9"></rect>
<line x1="0" y1="0" x2="0" y2="6" stroke="#1a4f72" stroke-width="2"></line>
</pattern>
</defs>
<title id="${id}-t">${esc(title)}</title>
<desc id="${id}-d">${esc(desc)}</desc>
${legend}
${body}
<text x="8" y="${height - 8}" ${FONT} font-size="11" fill="#5a6b7b">Source: 128 questions and bug reports; feature requests (17) excluded. Collected 2026-10-25.</text>
</svg>
`;
}

// ---------------------------------------------------------------------------
// Chart 3: lifecycle stage of the question (non-feature rows).
// ---------------------------------------------------------------------------
const lifecycle = [
  ["Day 1 (install / first run)", 6],
  ["Week 1 (first capture / first citation)", 24],
  ["Month 1+ (organize, sync, collaborate)", 98],
];

writeFileSync(join(outDir, "category-frequency.svg"), barChart(
  categories,
  "Support questions by category (feature requests excluded)",
  "Horizontal bar chart of 128 Zotero support questions and bug reports by category. Browser connector and saving from the web is largest with 20, followed by PDF reader and annotations with 16, sync and storage with 16, word processor plugin with 15, citations and citation styles and installation and stability with 13 each, mobile apps with 12, import export and duplicates with 9, groups and search and organization with 6 each, and bibliography formatting with 2.",
  "ch-freq"
));

writeFileSync(join(outDir, "fix-route.svg"), stackedChart(
  fixSplit,
  "Fix route by category: education vs product",
  "Stacked horizontal bar chart splitting 128 Zotero support questions by category into education-fixable knowledge gaps, avoidable documented behavior, and product or bug issues. Overall 40 questions were education-fixable, 11 avoidable documented behavior, and 77 product or bug issues. Citations and citation styles is the most education-heavy category with 12 of its 13 questions education-related, while PDF reader, installation and mobile app categories are mostly product issues.",
  "ch-fix"
));

writeFileSync(join(outDir, "lifecycle.svg"), barChart(
  lifecycle,
  "When users hit the problem (lifecycle stage)",
  "Horizontal bar chart of 128 support questions by lifecycle stage. Day 1 installation problems: 6. Week 1 first capture and first citation problems: 24. Month 1 or later organizing, syncing and collaborating problems: 98.",
  "ch-life"
));

console.log("Wrote", outDir);
console.log("category-frequency.svg, fix-route.svg, lifecycle.svg");
