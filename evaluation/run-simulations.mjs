#!/usr/bin/env node
// Simulated-learner evaluation pipeline (PENDING until API keys are added).
//
// What it does (design in evaluation/METHODS.md):
//   Phase 1 - personas: MODEL_A role-plays 9 learner runs (3 personas x
//             prior-knowledge levels) answering the 9 skills-check scenarios.
//   Phase 2 - item analysis: MODEL_B and MODEL_C independently review the
//             aggregated answers per item and flag ambiguity/quality issues;
//             agreement between the two judges is reported. A model never
//             judges its own output (A produces, B/C review).
//
// Rules (per the portfolio's shared evaluation standard):
//   - Reads .env (never committed). If a value is missing or still a
//     placeholder, exits 1 with a clear message and makes ZERO network calls.
//   - `--dry-run` runs the full pipeline with stub responses and writes to
//     dry-run/ labeled "DRY RUN - NOT REAL RESULTS". Never used as results.
//   - Real runs write to evaluation/output/simulations-<timestamp>/ and the
//     committed results placeholder stays "PENDING: requires API key" until
//     then.
//
// Usage: npm run eval:pending            (real run, needs .env)
//        npm run eval:dry-run            (--dry-run, no keys, no network)

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(join(dirname(fileURLToPath(import.meta.url)), ".."));
const DRY_RUN = process.argv.includes("--dry-run");
const OUT_DIR = DRY_RUN ? join(REPO_ROOT, "dry-run") : join(REPO_ROOT, "evaluation", `output/simulations-${stamp()}`);

const PLACEHOLDER = /^YOUR_|^PLACEHOLDER|^CHANGE_ME$/i;
const REQUIRED_KEYS = ["MODEL_A_BASE_URL", "MODEL_A_API_KEY", "MODEL_A_NAME", "MODEL_B_BASE_URL", "MODEL_B_API_KEY", "MODEL_B_NAME", "MODEL_C_BASE_URL", "MODEL_C_API_KEY", "MODEL_C_NAME"];

function stamp() {
  return new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
}

// Minimal .env parser (KEY=VALUE lines, # comments, optional quotes) - zero
// dependencies so the pipeline runs after a plain clone without npm install.
function loadEnv(path) {
  const env = {};
  if (!existsSync(path)) return env;
  for (const raw of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) env[key] = val; // real env vars win
  }
  return env;
}

function loadConfig() {
  const env = loadEnv(join(REPO_ROOT, ".env"));
  const missing = REQUIRED_KEYS.filter((k) => !env[k] || PLACEHOLDER.test(env[k]));
  if (missing.length > 0) {
    console.error(`PENDING: requires API key.

The evaluation pipeline needs all three model slots configured in a .env file
at the repository root (copy .env.example). Missing or placeholder values:

  ${missing.join("\n  ")}

No network calls were made. See evaluation/METHODS.md for what the run does
once keys are added.`);
    process.exit(1);
  }
  return Object.fromEntries(
    ["A", "B", "C"].map((slot) => [
      slot,
      {
        baseUrl: env[`MODEL_${slot}_BASE_URL`].replace(/\/+$/, ""),
        apiKey: env[`MODEL_${slot}_API_KEY`],
        name: env[`MODEL_${slot}_NAME`],
      },
    ])
  );
}

// ---------------------------------------------------------------------------
// Prompt material (loaded from the committed content, not inline)
// ---------------------------------------------------------------------------
function loadItems() {
  return JSON.parse(readFileSync(join(REPO_ROOT, "docs/skills-check/items.json"), "utf8"));
}

// 3 personas x 3 prior-knowledge levels = 9 runs (>= 8 required).
const PERSONAS = [
  {
    id: "mei",
    name: "Mei, 24, first-year master's student",
    situation: "starting her first literature review; wants to collect sources and cite correctly; has never used a reference manager",
  },
  {
    id: "tom",
    name: "Tom, 31, PhD candidate",
    situation: "writing a thesis with 400+ sources; organizes, annotates and syncs across devices",
  },
  {
    id: "ana",
    name: "Ana, 45, returning professional",
    situation: "part-time degree; uses Word on a work laptop with restricted install rights; needs to insert citations in Word",
  },
];
const LEVELS = ["none (never used a reference manager)", "some (used EndNote or Mendeley before)", "expert (daily Zotero user)"];

const RUNS = [];
for (const p of PERSONAS) {
  for (let l = 0; l < LEVELS.length; l++) {
    RUNS.push({ persona: p.id, personaName: p.name, situation: p.situation, level: LEVELS[l], levelIndex: l });
  }
}

function personaPrompt(run, items) {
  const scenarios = items.items
    .map(
      (it, i) =>
        `Item ${i + 1} (id ${it.id}): ${it.scenario}\nOptions:\n` +
        it.options.map((o, j) => `  ${String.fromCharCode(65 + j)}) ${o.text}`).join("\n")
    )
    .join("\n\n");
  return `You are simulating a learner for a usability study of a Zotero learning site. Persona: ${run.personaName}. Situation: ${run.situation}. Prior knowledge with reference managers: ${run.level}.

Answer the following 9 scenario questions AS THIS PERSONA would - including making the mistakes this person would realistically make. For each item output exactly:

ITEM <number>: <letter of chosen option>
REASON: <one sentence in the persona's voice>

${scenarios}`;
}

const JUDGE_SYSTEM = `You are an independent reviewer of assessment items for a customer-education academy about Zotero. You did not write the items and must not role-play learners. Judge item quality only: clarity of the scenario, whether exactly one option is defensibly correct, whether distractors are plausible but clearly wrong for a real user, and whether feedback text would teach. Flag problems; do not rewrite items wholesale.`;

function judgePrompt(item, distribution) {
  return `Item id ${item.id} (path ${item.path}):
Scenario: ${item.scenario}
Options:
${item.options.map((o, j) => `  ${String.fromCharCode(65 + j)}) ${o.text}${o.correct ? "  [KEYED CORRECT]" : ""}`).join("\n")}

Simulated learner answer distribution across 9 persona runs (9 runs, answers may repeat):
${JSON.stringify(distribution, null, 2)}

Assess this item. Output exactly:
VERDICT: keep | revise | replace
ISSUES: <semicolon-separated list, or "none">
NOTES: <two sentences max>`;
}

// ---------------------------------------------------------------------------
// Network (zero calls unless fully configured and not a dry run)
// ---------------------------------------------------------------------------
async function callModel(config, system, user) {
  const res = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.name,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.4,
    }),
  });
  if (!res.ok) throw new Error(`${config.name} HTTP ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

function stubReply(kind, ctx) {
  // Deterministic stubs so the pipeline can be tested end to end with no keys.
  if (kind === "persona") {
    return ctx.items.items
      .map((it, i) => {
        const wrong = it.options.findIndex((o) => !o.correct);
        const letter = String.fromCharCode(65 + (i % 2 === 0 ? 0 : wrong));
        return `ITEM ${i + 1}: ${letter}\nREASON: (stub) as a ${ctx.run.level.split(" ")[0]}-knowledge ${ctx.run.persona}, I'd pick what looks familiar.`;
      })
      .join("\n\n");
  }
  return `VERDICT: ${ctx.i % 3 === 0 ? "revise" : "keep"}\nISSUES: (stub) distractor B reads as plausible to novices\nNOTES: (stub) stub judge output for pipeline verification only.`;
}

function parsePersonaRun(text, items) {
  const answers = {};
  for (const m of text.matchAll(/ITEM\s*(\d+)\s*:\s*([A-C])/gi)) {
    const idx = parseInt(m[1], 10) - 1;
    if (idx >= 0 && idx < items.items.length) answers[items.items[idx].id] = m[2];
  }
  return answers;
}

function parseJudge(text) {
  const verdict = text.match(/VERDICT\s*:\s*(keep|revise|replace)/i);
  const issues = text.match(/ISSUES\s*:\s*(.+)/i);
  return {
    verdict: verdict ? verdict[1].toLowerCase() : "unparsed",
    issues: issues ? issues[1].trim() : "unparsed",
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const config = DRY_RUN
  ? Object.fromEntries(["A", "B", "C"].map((s) => [s, { baseUrl: "stub://dry-run", apiKey: "stub", name: `stub-model-${s.toLowerCase()}` }]))
  : loadConfig(); // exits 1 with no network if not configured (real runs only)
const items = loadItems();
mkdirSync(OUT_DIR, { recursive: true });

console.log(DRY_RUN
  ? `DRY RUN - NOT REAL RESULTS. Stub responses only; writing to ${OUT_DIR}`
  : `Real simulated-learner run starting; models: A=${config.A.name} (personas), B=${config.B.name} + C=${config.C.name} (item review)`);

const raw = { meta: { date: new Date().toISOString(), dry_run: DRY_RUN, runs: RUNS.length, models: { A: config.A.name, B: config.B.name, C: config.C.name } }, runs: [], item_analysis: {} };

// Phase 1: 9 persona runs
const tally = {}; // itemId -> { A: n, B: n, C: n }
for (const it of items.items) tally[it.id] = { A: 0, B: 0, C: 0 };

for (const run of RUNS) {
  const prompt = personaPrompt(run, items);
  const text = DRY_RUN ? stubReply("persona", { run, items }) : await callModel(config.A, "You are role-playing a learner in a simulated usability study. Stay in character.", prompt);
  const answers = parsePersonaRun(text, items);
  for (const [id, letter] of Object.entries(answers)) {
    if (tally[id] && /^[ABC]$/.test(letter)) tally[id][letter] += 1;
  }
  raw.runs.push({ persona: run.persona, level: run.level, prompt, response: text, answers });
  console.log(`  run ${raw.runs.length}/9: ${run.persona} @ ${run.level.split(" ")[0]} -> ${Object.keys(answers).length}/9 answered`);
}

// Phase 2: item analysis by two independent judges
const judges = {};
for (const [slot, cfg] of [["B", config.B], ["C", config.C]]) {
  judges[slot] = [];
  let i = 0;
  for (const item of items.items) {
    const prompt = judgePrompt(item, tally[item.id]);
    const text = DRY_RUN ? stubReply("judge", { i }) : await callModel(cfg, JUDGE_SYSTEM, prompt);
    judges[slot].push({ item: item.id, prompt, response: text, ...parseJudge(text) });
    i++;
  }
}
raw.item_analysis = judges;

// Agreement between the two judges
let agree = 0;
const perItemAgreement = [];
for (let i = 0; i < items.items.length; i++) {
  const same = judges.B[i].verdict === judges.C[i].verdict;
  if (same) agree++;
  perItemAgreement.push({ item: items.items[i].id, B: judges.B[i].verdict, C: judges.C[i].verdict, agree: same });
}
const agreementPct = Math.round((agree / items.items.length) * 100);

// ---------------------------------------------------------------------------
// Outputs
// ---------------------------------------------------------------------------
writeFileSync(join(OUT_DIR, "raw.json"), JSON.stringify(raw, null, 2));

const label = DRY_RUN
  ? "> **DRY RUN - NOT REAL RESULTS.** Stub responses exercised the pipeline only; every value below is a canned stub."
  : "> Simulated-learner run (label: AI-simulated personas, method and models recorded in raw.json). This can surface item-quality and clarity problems only - it **cannot** show learning gains.";

const summary = `# Simulated-learner evaluation ${DRY_RUN ? "(DRY RUN)" : ""}

${label}

- Date: ${raw.meta.date}
- Runs: ${raw.meta.runs} (3 personas x 3 prior-knowledge levels)
- Personas: Mei (new master's student), Tom (PhD candidate), Ana (returning professional)
- Models: personas ${config.A.name}; item review ${config.B.name} + ${config.C.name} (independent, agreement reported)

## Per-item answer distribution (9 runs)

| Item | A | B | C | Keyed correct |
|---|---:|---:|---:|---|
${items.items.map((it) => {
  const key = it.options.findIndex((o) => o.correct);
  const t = tally[it.id];
  return `| ${it.id} | ${t.A} | ${t.B} | ${t.C} | ${String.fromCharCode(65 + key)} |`;
}).join("\n")}

## Item analysis (two independent judges)

| Item | Judge B verdict | Judge C verdict | Agree |
|---|---|---|---|
${perItemAgreement.map((r) => `| ${r.item} | ${r.B} | ${r.C} | ${r.agree ? "yes" : "no"} |`).join("\n")}

**Judge agreement: ${agreementPct}% (${agree}/${items.items.length})**

## What this can and cannot show

- CAN: ambiguous items, distractors real users would pick, confusing scenario wording - each flagged item should be reviewed against the linked lesson.
- CANNOT: learning gains, statistical significance, or "validated with users". No real learners have taken this check.
`;
writeFileSync(join(OUT_DIR, "summary.md"), summary);

console.log(`\nWrote ${OUT_DIR}/raw.json and summary.md`);
console.log(`Judge agreement: ${agreementPct}%`);
console.log(DRY_RUN ? "DRY RUN - NOT REAL RESULTS (safe to delete dry-run/)" : "Done. Copy the relevant tables into evaluation/output/ summaries and update METHODS.md.");
