// Generates the schematic SVG diagrams used by the lessons.
// Run: node docs/assets/figures/generate-schematics.mjs
//
// Every figure is a SCHEMATIC ILLUSTRATION, not a screenshot: boxes, labels and
// numbered callouts drawn from the official Zotero documentation (verified
// 2026-10-25 against Zotero 10.0.6 docs). Callouts are a number in a circle
// with a leader line - number + outline, never color alone. Each figure has
// role="img" with <title>/<desc> for assistive technology.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = join(dirname(fileURLToPath(import.meta.url)));
mkdirSync(outDir, { recursive: true });

const FONT = "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
const INK = "#1f2d3d"; // main text
const EDGE = "#5a6b7b"; // outlines
const FILL = "#f4f7fa"; // box fill
const ACCENT = "#1a4f72"; // primary boxes
const ACCENT_FILL = "#e2ebf3"; // light accent fill

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

class Canvas {
  constructor(width, height, title, desc, id) {
    this.w = width;
    this.h = height;
    this.title = title;
    this.desc = desc;
    this.id = id;
    this.parts = [];
  }
  text(x, y, s, { size = 14, weight = 400, fill = INK, anchor = "start", italic = false } = {}) {
    this.parts.push(
      `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${italic ? ' font-style="italic"' : ""}>${esc(s)}</text>`
    );
  }
  box(x, y, w, h, { label, sub, strong = false, size = 14 } = {}) {
    const stroke = strong ? ACCENT : EDGE;
    const fill = strong ? ACCENT_FILL : FILL;
    const sw = strong ? 2 : 1.5;
    this.parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"></rect>`);
    if (label) {
      const cy = sub ? y + h / 2 - 4 : y + h / 2 + 5;
      this.text(x + w / 2, cy, label, { size, weight: 600, anchor: "middle" });
      if (sub) this.text(x + w / 2, cy + 18, sub, { size: size - 2, anchor: "middle", fill: "#44566b" });
    }
  }
  line(x1, y1, x2, y2, { dash = false } = {}) {
    this.parts.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${EDGE}" stroke-width="1.5"${dash ? ' stroke-dasharray="5 4"' : ""}></line>`);
  }
  // numbered callout: circle + number, leader line to (tx, ty)
  callout(n, cx, cy, tx, ty) {
    this.parts.push(`<line x1="${cx}" y1="${cy}" x2="${tx}" y2="${ty}" stroke="${INK}" stroke-width="1.2"></line>`);
    this.parts.push(`<circle cx="${cx}" cy="${cy}" r="11" fill="#ffffff" stroke="${INK}" stroke-width="2"></circle>`);
    this.parts.push(`<text x="${cx}" y="${cy + 4.5}" font-family="${FONT}" font-size="12" font-weight="700" fill="${INK}" text-anchor="middle">${n}</text>`);
  }
  render() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.w} ${this.h}" width="${this.w}" height="${this.h}" role="img" aria-labelledby="${this.id}-t ${this.id}-d">
<title id="${this.id}-t">${esc(this.title)}</title>
<desc id="${this.id}-d">${esc(this.desc)}</desc>
<rect x="0" y="0" width="${this.w}" height="${this.h}" fill="#ffffff"></rect>
${this.parts.join("\n")}
</svg>
`;
  }
}

// ---------------------------------------------------------------------------
// 01 three-pieces.svg — Zotero is three pieces (lesson 1)
// ---------------------------------------------------------------------------
{
  const c = new Canvas(720, 300,
    "Schematic: the three pieces of Zotero",
    "Three connected boxes: the Zotero desktop app where your library lives; the Zotero Connector in your browser, which sends pages you save to the app; and the word processor plugin inside Microsoft Word, LibreOffice or Google Docs, which pulls citations from the app into your document. Arrows run from the connector and the plugin to the desktop app.",
    "f-three-pieces");
  c.box(30, 60, 200, 84, { label: "Zotero desktop app", sub: "your library, on your computer", strong: true });
  c.box(30, 190, 200, 70, { label: "Zotero Connector", sub: "browser extension" });
  c.box(470, 190, 210, 70, { label: "Word processor plugin", sub: "Word · LibreOffice · Google Docs" });
  c.line(130, 188, 118, 146);
  c.line(475, 195, 230, 110, { dash: true });
  c.callout(1, 95, 22, 105, 58);
  c.callout(2, 60, 160, 95, 192);
  c.callout(3, 600, 160, 545, 190);
  c.text(40, 285, "Pieces 2 and 3 talk to piece 1 - if the app is closed, saving and citing fail.", { size: 12, italic: true, fill: "#44566b" });
  writeFileSync(join(outDir, "three-pieces.svg"), c.render());
}

// ---------------------------------------------------------------------------
// 02 save-button.svg — browser toolbar save button + popup (lesson 2)
// ---------------------------------------------------------------------------
{
  const c = new Canvas(720, 310,
    "Schematic: the browser save button and the save popup",
    "A browser toolbar containing an address bar and the Zotero save button, drawn as a letter Z in a square. Below it, the popup that appears after saving: it names the collection the item was saved to and offers a link to open the Zotero app.",
    "f-save-button");
  // toolbar
  c.box(40, 60, 640, 52, { label: "browser toolbar" });
  c.box(120, 70, 380, 32, { label: "", size: 12 });
  c.text(140, 90, "https://example-journal.org/article/1234", { size: 12, fill: "#44566b" });
  c.parts.push(`<rect x="540" y="68" width="36" height="36" rx="4" fill="#ffffff" stroke="${INK}" stroke-width="2"></rect>`);
  c.text(558, 93, "Z", { size: 20, weight: 700, anchor: "middle" });
  // popup
  c.box(180, 170, 360, 90, { label: "Saving to: Thesis chapter 2", sub: "View · Add tags   |   Open Zotero", strong: true });
  c.callout(1, 500, 45, 548, 66);
  c.callout(2, 130, 250, 178, 230);
  c.text(40, 296, "1. Save button in the toolbar   2. Popup confirms where the item went", { size: 12, italic: true, fill: "#44566b" });
  writeFileSync(join(outDir, "save-button.svg"), c.render());
}

// ---------------------------------------------------------------------------
// 03 add-pdfs.svg — metadata retrieval for a stray PDF (lesson 3)
// ---------------------------------------------------------------------------
{
  const c = new Canvas(720, 300,
    "Schematic: giving a stray PDF a parent item with metadata",
    "A three-step flow. Step one: a lone PDF file is dragged into Zotero. Step two: right-click the PDF and choose Create Parent Item. Step three: enter a DOI or ISBN and Zotero fills in the title, authors and journal automatically.",
    "f-add-pdfs");
  c.box(40, 90, 180, 64, { label: "draft.pdf", sub: "attachment, no metadata" });
  c.box(280, 90, 170, 64, { label: "Create Parent Item", sub: "right-click menu" });
  c.box(500, 90, 180, 64, { label: "Enter DOI / ISBN", sub: "metadata fills in", strong: true });
  c.line(222, 122, 278, 122);
  c.line(452, 122, 498, 122);
  c.callout(1, 60, 50, 95, 88);
  c.callout(2, 300, 200, 330, 156);
  c.callout(3, 560, 200, 555, 156);
  c.text(40, 270, "Result: the PDF becomes an item with a title, author and year - citable like any other.", { size: 12, italic: true, fill: "#44566b" });
  writeFileSync(join(outDir, "add-pdfs.svg"), c.render());
}

// ---------------------------------------------------------------------------
// 04 collections-pane.svg — three-pane window, left pane collections (lesson 4)
// ---------------------------------------------------------------------------
{
  const c = new Canvas(720, 320,
    "Schematic: the Zotero window with the collections pane on the left",
    "The Zotero window has three columns. Left: My Library with collections Thesis chapter 2 and Coursework, plus Duplicate Items. Middle: the items list for the selected collection. Right: the info panel of the selected item.",
    "f-collections");
  c.box(30, 40, 220, 230, { label: "" });
  c.box(260, 40, 220, 230, { label: "" });
  c.box(490, 40, 200, 230, { label: "" });
  c.text(40, 62, "My Library", { size: 13, weight: 700 });
  c.text(50, 88, "Thesis chapter 2", { size: 13 });
  c.text(50, 112, "Coursework", { size: 13 });
  c.text(50, 136, "Duplicate Items", { size: 13 });
  c.text(270, 62, "Items", { size: 13, weight: 700 });
  c.text(280, 88, "Nguyen 2024, wetland…", { size: 12, fill: "#44566b" });
  c.text(280, 108, "Okafor 2023, policy…", { size: 12, fill: "#44566b" });
  c.text(280, 128, "Silva 2025, carbon…", { size: 12, fill: "#44566b" });
  c.text(500, 62, "Info", { size: 13, weight: 700 });
  c.text(500, 88, "Title / Author / Year", { size: 12, fill: "#44566b" });
  c.text(500, 108, "Abstract · Attachments", { size: 12, fill: "#44566b" });
  c.callout(1, 45, 285, 55, 272);
  c.callout(2, 270, 285, 285, 272);
  c.callout(3, 490, 285, 505, 272);
  c.text(30, 306, "1. Collections (left)   2. Items list (middle)   3. Item details (right)", { size: 12, italic: true, fill: "#44566b" });
  writeFileSync(join(outDir, "collections-pane.svg"), c.render());
}

// ---------------------------------------------------------------------------
// 05 word-ribbon.svg — Word ribbon with Zotero tab (lesson 5)
// ---------------------------------------------------------------------------
{
  const c = new Canvas(720, 292,
    "Schematic: the Zotero tab in the Word ribbon",
    "The Word ribbon with a Zotero tab containing five buttons: Add/Edit Citation, Add/Edit Bibliography, Document Preferences, Refresh, and Unlink Citations.",
    "f-word-ribbon");
  c.box(40, 50, 640, 44, { label: "", size: 13 });
  c.text(70, 77, "Home", { size: 13, fill: "#44566b" });
  c.text(140, 77, "Insert", { size: 13, fill: "#44566b" });
  c.text(210, 77, "References", { size: 13, fill: "#44566b" });
  c.text(310, 77, "Mailings", { size: 13, fill: "#44566b" });
  c.parts.push(`<rect x="400" y="54" width="90" height="36" rx="4" fill="#ffffff" stroke="${ACCENT}" stroke-width="2"></rect>`);
  c.text(445, 77, "Zotero", { size: 14, weight: 700, anchor: "middle" });
  c.text(530, 77, "View", { size: 13, fill: "#44566b" });
  c.box(60, 120, 120, 60, { label: "Add/Edit Citation", size: 12, strong: true });
  c.box(196, 120, 130, 60, { label: "Add/Edit Bibliography", size: 12 });
  c.box(342, 120, 130, 60, { label: "Document Preferences", size: 12 });
  c.box(488, 120, 90, 60, { label: "Refresh", size: 12 });
  c.box(594, 120, 100, 60, { label: "Unlink Citations", size: 12 });
  c.callout(1, 620, 30, 470, 54);
  c.callout(2, 120, 210, 120, 182);
  c.text(40, 250, "1. The Zotero tab appears in the ribbon   2. Add/Edit Citation inserts a citation at the cursor", { size: 12, italic: true, fill: "#44566b" });
  c.text(40, 268, "No Zotero tab at all? Troubleshooting tool, flow: The Zotero tab is missing in Word.", { size: 12, italic: true, fill: "#44566b" });
  writeFileSync(join(outDir, "word-ribbon.svg"), c.render());
}

// ---------------------------------------------------------------------------
// 06 citation-dialog.svg — citation search dialog (lesson 6)
// ---------------------------------------------------------------------------
{
  const c = new Canvas(720, 280,
    "Schematic: the citation dialog inside a document",
    "A floating dialog over a document page. You type part of a title or author, matching items appear, and selecting one shows it as a shaded bubble. Pressing Enter inserts the citation at the cursor.",
    "f-citation-dialog");
  c.box(40, 40, 640, 200, { label: "" });
  c.text(60, 66, "Your document…", { size: 12, fill: "#44566b" });
  c.box(70, 84, 480, 44, { label: "Type title, author, or year…", size: 13 });
  c.box(70, 150, 480, 40, { label: "Okafor 2023 — wetland policy — shaded bubble", sub: "", strong: true, size: 12 });
  c.callout(1, 620, 100, 552, 106);
  c.callout(2, 620, 168, 552, 170);
  c.text(40, 264, "1. Search box   2. Selected item as a bubble; Enter inserts the citation", { size: 12, italic: true, fill: "#44566b" });
  writeFileSync(join(outDir, "citation-dialog.svg"), c.render());
}

// ---------------------------------------------------------------------------
// 07 bibliography-refresh.svg — bibliography + Refresh (lesson 7)
// ---------------------------------------------------------------------------
{
  const c = new Canvas(720, 280,
    "Schematic: a bibliography in the document and the Refresh button that keeps it current",
    "A document page ending with a Bibliography heading and entries. An arrow points from the Refresh button in the Word Zotero tab to the bibliography: refreshing updates every citation and the bibliography after you edit items in Zotero.",
    "f-bib-refresh");
  c.box(40, 40, 400, 190, { label: "" });
  c.text(60, 66, "…body of your document", { size: 12, fill: "#44566b" });
  c.text(60, 100, "Bibliography", { size: 14, weight: 700 });
  c.text(60, 126, "Nguyen, T. (2024). Wetland carbon…", { size: 12, fill: "#44566b" });
  c.text(60, 150, "Okafor, B. (2023). Policy design…", { size: 12, fill: "#44566b" });
  c.text(60, 174, "Silva, R. (2025). Carbon markets…", { size: 12, fill: "#44566b" });
  c.box(540, 60, 140, 54, { label: "Refresh", strong: true });
  c.line(540, 110, 430, 150);
  c.callout(1, 610, 170, 590, 118);
  c.callout(2, 90, 260, 100, 232);
  c.text(40, 264, "1. Refresh re-reads Zotero   2. Bibliography updates in place", { size: 12, italic: true, fill: "#44566b" });
  writeFileSync(join(outDir, "bibliography-refresh.svg"), c.render());
}

// ---------------------------------------------------------------------------
// 08 sync-prefs.svg — sync settings pane (lesson 9)
// ---------------------------------------------------------------------------
{
  const c = new Canvas(720, 300,
    "Schematic: the Sync pane of the Zotero settings",
    "The Zotero settings Sync pane. Top section: Data Syncing with a username field and Sync automatically checked. Below: File Syncing with a choice between Zotero storage and a WebDAV server. The Sync button sits on the main toolbar.",
    "f-sync-prefs");
  c.box(40, 40, 420, 90, { label: "Data Syncing", sub: "username · password · [x] Sync automatically", strong: true });
  c.box(40, 160, 420, 90, { label: "File Syncing", sub: "( ) Zotero   ( ) WebDAV: URL, username, Verify Server" });
  c.box(540, 60, 140, 60, { label: "Sync button", sub: "main toolbar" });
  c.callout(1, 520, 70, 460, 85);
  c.callout(2, 520, 200, 460, 205);
  c.callout(3, 610, 160, 590, 122);
  c.text(40, 280, "1. Data sync (free, unlimited)   2. File sync (300 MB free, or WebDAV)   3. Sync now", { size: 12, italic: true, fill: "#44566b" });
  writeFileSync(join(outDir, "sync-prefs.svg"), c.render());
}

// ---------------------------------------------------------------------------
// 09 pdf-reader.svg — reader with highlight + notes pane (lesson 10)
// ---------------------------------------------------------------------------
{
  const c = new Canvas(720, 300,
    "Schematic: the built-in PDF reader with a highlight and the notes pane",
    "The Zotero PDF reader. Center: a page with a highlighted sentence. Right: the Notes pane opened with the Notes button, where Add Item Note from Annotations collects every highlight and note with links back to the page they came from.",
    "f-pdf-reader");
  c.box(40, 40, 320, 220, { label: "PDF page" });
  c.parts.push(`<rect x="70" y="120" width="260" height="22" fill="url(#hlPat)" stroke="${INK}" stroke-width="1"></rect>`);
  c.text(70, 136, "…the highlighted sentence…", { size: 12, anchor: "start", fill: "#44566b" });
  c.box(420, 40, 260, 220, { label: "Notes pane", sub: "Add Item Note from Annotations", strong: true });
  c.text(440, 130, "• highlight → quoted + page link", { size: 12, fill: "#44566b" });
  c.callout(1, 400, 200, 332, 132);
  c.callout(2, 400, 60, 470, 90);
  c.parts.push(`<defs><pattern id="hlPat" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#fdf3d7"></rect><line x1="0" y1="0" x2="0" y2="8" stroke="#e0b400" stroke-width="2"></line></pattern></defs>`);
  c.text(40, 286, "1. Select text to highlight   2. Notes button collects annotations into one note", { size: 12, italic: true, fill: "#44566b" });
  writeFileSync(join(outDir, "pdf-reader.svg"), c.render());
}

// ---------------------------------------------------------------------------
// 10 groups-pane.svg — group libraries in the left pane (lesson 11)
// ---------------------------------------------------------------------------
{
  const c = new Canvas(720, 280,
    "Schematic: group libraries under My Library in the left pane",
    "The left pane of Zotero with My Library and its collections, and below it a Group library named Lab Reading Group that appears after syncing. Dragging an item from My Library into the group creates a separate copy.",
    "f-groups-pane");
  c.box(40, 40, 300, 190, { label: "" });
  c.text(55, 66, "My Library", { size: 13, weight: 700 });
  c.text(65, 90, "Thesis chapter 2", { size: 13 });
  c.text(55, 120, "Lab Reading Group", { size: 13, weight: 700 });
  c.text(70, 144, "Weekly papers", { size: 13 });
  c.callout(1, 390, 90, 342, 88);
  c.callout(2, 390, 150, 342, 148);
  c.text(40, 260, "1. Your library   2. Group library (appears once data syncing is on)", { size: 12, italic: true, fill: "#44566b" });
  writeFileSync(join(outDir, "groups-pane.svg"), c.render());
}

console.log("Wrote schematics to", outDir);
