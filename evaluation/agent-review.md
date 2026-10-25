# Agent review — research-tools-academy

**Reviewer:** separate AI reviewer agent (fresh context), 2026-10-26. Limitation: the reviewer may share the same underlying model as the author. This is not human or educator review.

Method label for citing these findings anywhere: **Agent review**.

---

## 0. What this review did

1. **Cognitive walkthrough** of all three learning paths against their stated personas (Mei / Tom / Ana), including completing one lesson end-to-end, walking the "Zotero tab is missing in Word" troubleshooting flow, and answering 4 skills-check scenarios.
2. **Heuristic evaluation** (Nielsen's 10) of the live home page and both interactive tools, severity 0–4.
3. **Structured review** using the repo's own form (`evaluation/human-protocol/review-form.md`) — completed in §4 below.
4. **Repo-specific probes:** lesson steps checked against the *current live* official documentation at zotero.org/support (fetched 2026-10-26); 10 CSV rows sampled against their sources (6 fetched); all headline statistics recomputed from `support-questions.csv`; `flows.json` diagnosis-order audit; simulated-data labeling; disclaimer sampling on 8 pages; milestone mapping; honesty sweep.
5. **Accessibility spot-check:** axe-core 4.11.1 on 4 live URLs (both tools, one lesson, one job aid) and an independent Playwright keyboard pass over both tools (not a re-run of the repo's own script).

The review was performed against the live site (https://iwyusdaz.github.io/research-tools-academy/) and the repo at commit state 2026-10-26.

**Reviewer's version caveat, stated up front:** the lessons are stamped *"Last verified against Zotero 10.0.6 documentation on 2026-10-25."* I could not independently confirm that "Zotero 10.0.6" is the current release from the official docs themselves (zotero.org/support pages are version-agnostic); the version number is the author's assertion. What I *could* do — and did — is check every spot-checked step against the **current** official documentation (fetched 2026-10-26). Every checked step matched. I found **no step that contradicts current documented Zotero behavior**, and no schematic that misrepresents the UI it illustrates.

---

## 1. Headline findings (ranked)

| # | Severity (P1 blocks / P2 costs time or trust / P3 polish) | Where | Finding | Suggested fix |
|---|---|---|---|---|
| 1 | **P2 (trust)** | `README.md` § "The problem" | The fix-route sentence is arithmetically inconsistent and mislabels the headline figure: *"40% were knowledge gaps (education), 9% documented-but-avoidable behavior (both), and 60% product or bug issues."* Per the coded data: education = 40/128 = **31%**, both = 11/128 = **9%**, product = 77/128 = **60%**. The 40% figure is education **+ both** (51/128). As written the three shares sum to 109% and attribute the 40% to education alone. This is the portfolio's headline evidence, on the first screen. | Rewrite: *"40% were education-fixable (31% pure knowledge gaps + 9% documented-but-avoidable behavior); 60% were product or bug issues (77 questions routed to diagnosis-and-forum, not fake fixes)."* |
| 2 | **P2 (trust)** | `README.md` (last sentence of "The problem"), `analysis/support-analysis.md` (headline bullet + §2.2 takeaway), `analysis/generate-charts.mjs` (fix-route alt text, line 164) | *"Citations & citation styles … 12 of its 13 questions were knowledge gaps"* / *"12 of its 13 non-feature questions (92%) were knowledge gaps"* — conflates the two fix routes. Per the CSV, C3 has **7 `education`** rows, **5 `both`**, 1 `product`. "Knowledge gap" is defined in §1.3 as the `education` route only, so the claim is false as worded; it is true as *"12 of 13 were education-fixable (7 knowledge gaps + 5 documented-behavior workarounds)"*. The substantive claim ("most education-fixable category", 12/13 = 92% under education+both) **does hold** — only the wording is wrong. | Replace "were knowledge gaps" with "were education-fixable (7 knowledge gaps + 5 avoidable documented behaviors)" in all three locations. |
| 3 | **P2 (costs Ana time — her exact pain point)** | `docs/paths/writing-with-citations/install-word-plugin.md`, step 5 | *"Work laptop that blocks add-ins? That's the macOS permissions case most common in the support data: Zotero needs permission to control Word."* This mislabels the Windows case. A work laptop that blocks add-ins is most commonly the **Windows Trust Center / IT-policy** case, which flow 3's Windows branch handles correctly (Disabled Items, Trust Center). Ana on Windows is sent down a macOS-specific path at the step written for her. | Split step 5 by platform: *"Work laptop? **macOS:** the common case is a missing Automation permission — the flow's Mac branch walks the System Settings grant. **Windows:** the add-in may be disabled by the Trust Center or IT policy — the flow's Windows branch covers both; if IT policy blocks it, only IT can whitelist Zotero."* |
| 4 | **P2 (a11y contract gap)** | `docs/troubleshoot/tool.js`, `renderChooser()` | The chooser heading (`h2#tool-heading`) is created **without `tabindex="-1"`, so `h.focus()` is a no-op**. Verified by Playwright: on initial load and after **Start over**, `document.activeElement` is `<body>`. A keyboard user pressing "Start over" mid-flow is dumped to the top of the document and must re-Tab through the skip link and nav. The tool's own a11y contract comment promises focus management; the step headings keep it, the chooser doesn't. | Add `tabindex: "-1"` to the chooser `h2` (one-line fix). |
| 5 | P3 | `docs/skills-check/check.js`, `checkAnswer()` | After checking an answer, `controls.innerHTML = ""` wipes **both** buttons and re-adds only "Next scenario" — the **Back button disappears** exactly when a learner might want to re-read the previous scenario. Pre-check, Back exists; post-check, it doesn't. | Keep Back in the post-check controls (or label answers as final). |
| 6 | P3 | `docs/troubleshoot/tool.js`, `showStep()` | The status line *"Flow title — step N"* is a plain `<p>` rendered **before** the section; when focus jumps to the step heading, a screen reader user hears the heading only, not which flow or step they are on. The done-state already uses `role="status"`. | Give the status line `role="status"`/`aria-live="polite"` so it is announced on each render. |
| 7 | P3 | Lesson 8 badge vs map; setup lessons | `activation-milestones.md` and the path table say lesson 8 moves "M3/M4 (retain)", but the front matter is `milestone: M3`, so the lesson badge shows only "M3". Also, lessons 1/3/5 render the badge "moves milestone M1/M2/M3" while their own text correctly calls it "the setup step for" the milestone — the badge slightly overstates for setup lessons. | Either allow "M3/M4" in front matter or annotate the path table; consider badge text "prepares M1" for setup lessons. |
| 8 | P3 | `docs/paths/getting-started/add-pdfs.md`, step 1 | *"Drag the PDF into Zotero … It becomes a standalone attachment (a plain file with no metadata)."* Current Zotero **automatically attempts metadata retrieval** after a PDF is dragged in (per the official *Adding items to Zotero* page). A learner who drags and sees metadata appear may be confused by the lesson's claim. | Add one clause: "Zotero will usually try to retrieve metadata on its own; if it can't, the PDF stays a standalone attachment — continue with step 2." |
| 9 | P3 | `docs/troubleshoot/flows.json`, flow 5 `fix-sync-error` (HTTP 429) | The flow says *"you're rate-limited … wait a few minutes and sync once (row #99)"*. The cited thread's actual full resolution also included **signing out and back in** after a deleted API key kept re-authenticating. The "re-enter credentials" advice partially covers it but doesn't name the key case. | Add: "if the error mentions API keys, sign out of Sync and back in." |
| 10 | P3 | Power user path (Tom) | Duplicate-merging guidance exists **only in lesson 4** (Getting started). Tom — 400+ sources, the persona most likely to hit duplicates, and C9 being a month-1+ category — never encounters it from the Power user path. | Add a "See also: merging duplicates (lesson 4)" line to the Power user path index or the sync lesson. |
| 11 | P3 | `docs/troubleshoot/index.html` / chooser | The 5 flow buttons show bare titles with no length/description hint; a user can't tell whether they're committing to a 2-step or 6-screen diagnosis. | Add a one-line description per flow (each `flows.json` flow already has `based_on`; a short `hint` field would do). |
| 12 | P3 | Home page / method page milestone links | "activation milestone" links to `strategy/metrics-plan.html`, and the metrics plan points to `analysis/activation-milestones.md` **in the GitHub repo** — the M1–M5 definitions are never actually on the published site. | Add a short M1–M5 definition table to the metrics plan page (or a small site page) so the milestone model is readable on-site. |
| 13 | P3 (sequencing note) | `evaluation/METHODS.md` table / `README.md` status line | At review time, METHODS listed the design review as **Complete** with evidence location = `review-form.md`, but the form's findings table was empty and no review artifact existed. This document is that artifact; once triaged (findings logged in `CHANGELOG.md`), the claim becomes true. Until then the "complete" status ran slightly ahead of the evidence. | Log triage results in `CHANGELOG.md` and link this file from METHODS. |

No P1 (learner-blocking) findings. No lesson step contradicts current official Zotero documentation (probe §5.1).

---

## 2. Cognitive walkthrough

### 2.1 Mei — new master's student, first literature review (Getting started)

- **Finding the academy and choosing:** the home page's "Choose your path" table is unambiguous (audience, lesson count, time). A first-week student lands on Getting started without hesitation. "In a hurry?" links to job aids and the troubleshooting tool — good moment-of-need design.
- **Lesson 1 (Install):** 5 steps, each short. "Check it worked" is genuinely verifiable (three-column window; Z button; Safari's Settings → Extensions fallback — which matches the official no_toolbar_button guidance to check the extension is enabled). The explicit "you do not need an account for steps 1–4" preempts a common stall.
- **Lesson 2 (Save first sources):** 6 steps. The "check the popup" and "verify metadata before moving on" steps are the best pedagogy in the path — they prevent the exact downstream citation problems the support data documents. One small stumble: step 3 assumes the reader knows a *collection* gets selected in the desktop app; a brand-new user has no collections yet. Minor.
- **Lesson 3 (Add PDFs):** the flow is right; see finding 8 (Zotero auto-retrieves metadata on drag, which the lesson doesn't mention).
- **Lesson 4 (Organize):** the "collections behave like playlists, not folders" line is excellent. The dedupe step matches the official docs exactly (merge retains collections/tags; can't mark false positives yet — both verified).
- **End-to-end verdict:** Mei can complete the path without leaving the academy; every "If it didn't work" hop lands on a real flow or official page.

### 2.2 Tom — PhD candidate, 400+ sources (Power user)

- **Sync lesson:** the strongest lesson. Data-vs-file syncing as "the whole lesson," 300 MB free, WebDAV-not-for-groups, the Dropbox-corruption warning, and "verify on device 2" all match the official sync docs. The "check it worked" (item on device 2 within a minute; no sync error icon) is observable.
- **Annotate lesson:** verified against the official PDF reader docs — the Notes button **is** in the top-right corner of the reader, "+ → Add Item Note from Annotations" is the documented path, and the "annotations live in the database, not the PDF" rule matches. The schematic's right-side Notes pane is faithful.
- **Group lesson:** group types, "open public groups cannot share files," "Send More Invitations," and "File → New Library → New Group…" all match the official groups page, including the storage-counts-against-owner nuance that appears in the skills check.
- **Gap:** duplicates (Tom's stated pain, C9) are only taught in lesson 4 — see finding 10.

### 2.3 Ana — returning professional, Word on a work laptop (Writing with citations)

- **Lesson 5:** steps 1–4 are correct (reinstall from Settings → Cite → Word Processors; macOS Templates and Add-ins check verified against the official troubleshooting page). **Step 5 is the stumble** (finding 3): Ana on Windows is told her blocked add-in is "the macOS permissions case."
- **Recovery via flow 3 works:** the flow's first screen asks macOS vs Windows; the Windows branch's Add-ins/Disabled Items/Trust Center steps match the official page nearly verbatim, including "neither program should run as administrator." The exit is honest: "If your organization's IT policy blocks it, IT needs to whitelist Zotero — education can't override an MDM policy, and this tool won't pretend otherwise." That is exactly the right posture for the persona.
- **Lesson 6 (Insert citations):** all four mechanics verified against the official plugin-usage docs — page locator by typing "p. 34"/"34" before Enter ✓, multi-item citations by continuing to type ✓, Omit Author ✓, Document Preferences ✓. "Check it worked" gives style-specific observable output (`(Nguyen, 2024)` vs `[1]`).
- **Word-tab flow step count:** 2 screens to a fix (1 triage question + 1 fix step bundling 4 sub-steps). The bundled macOS step is dense; notably, the builder's *own simulated dashboard* flags exactly this ("macOS permission step likely too compressed"). The simulated recommendation (give the permission grant its own screen) is sound and unimplemented — reasonable to defer, but worth doing.
- **Skills check (4 items taken: g1, g2, w2, p1):** feedback is specific and teaches on wrong answers (e.g., w2's "the data is intact — you're seeing the machinery" reframes panic correctly). Results table per path works. See findings 4–5 for the tool nits.

---

## 3. Heuristic evaluation (Nielsen's 10) — live site, both tools

| # | Heuristic | Severity 0–4 | Evidence |
|---|---|---|---|
| 1 | Visibility of system status | **1** | "Flow title — step N" status line and "Scenario X of 9" progress exist, but the status line is not announced when focus moves to the step heading (finding 6); done-state uses `role="status"` correctly. |
| 2 | Match between system and real world | **0** | Symptom-first language throughout ("The Zotero tab doesn't appear in Word", "Saving fails…"). No jargon without explanation. |
| 3 | User control and freedom | **1** | Back/Start over in both tools; skills check removes Back after checking (finding 5); Start over drops focus to `<body>` (finding 4). |
| 4 | Consistency and standards | **1** | Uniform lesson pattern across all 11 lessons; "Did this solve it?" legend consistent; milestone badge vs map inconsistency (finding 7). |
| 5 | Error prevention | **1** | Skills-check no-selection guard (verified: "Choose an answer first, then check it."); Unlink Citations framed as backup-first, irreversible; dead-end fail-safe exists in tool.js. Deduction for the add-pdfs drag-retrieval omission (finding 8). |
| 6 | Recognition over recall | **1** | Flow chooser shows bare titles without descriptions (finding 11). |
| 7 | Flexibility and efficiency of use | **0** | "In a hurry?" shortcuts, path tables with times, job aids for the moment of need. |
| 8 | Aesthetic and minimalist design | **0** | Lessons are lean; dialogs and diagrams carry no decoration. |
| 9 | Help users recognize, diagnose, recover from errors | **1** | Every lesson has "If it didn't work"; the field-codes flow's "Nothing was broken" reframe is exemplary. Flow 5's 429 advice is thinner than its cited source (finding 9). |
| 10 | Help and documentation | **0** | Official docs link on every lesson; version stamps; honest forum exits with Debug ID guidance matching official practice. |

Nothing at severity 2+ in the heuristic pass; the P2s live in the content claims (findings 1–3) and one focus-management defect (finding 4).

---

## 4. Structured review form (completed)

Form: `evaluation/human-protocol/review-form.md`. Findings table reproduced here (the form file itself was left untouched per review constraints).

| # | Severity | Where (page/step) | Finding | Suggested fix | Accepted? (author triage) |
|---|---|---|---|---|---|
| 1 | P2 | README "The problem" | 40/9/60 fix-route shares mislabeled; sum to 109%; 40% is education+both (31%+9%) | Reword to "40% education-fixable (31% + 9%)" | — |
| 2 | P2 | README; support-analysis headline + §2.2; generate-charts.mjs alt text | C3 "12 of 13 were knowledge gaps" conflates education (7) with education+both (12) | Say "12 of 13 education-fixable (7 knowledge gaps + 5 documented behaviors)" | — |
| 3 | P2 | install-word-plugin.md step 5 | Windows blocked-add-in case mislabeled as "the macOS permissions case" | Platform-split step 5 | — |
| 4 | P2 | troubleshoot/tool.js renderChooser | Chooser heading has no tabindex; focus() no-op on load and after Start over | Add tabindex="-1" to h2#tool-heading | — |
| 5 | P3 | skills-check/check.js checkAnswer | Back button removed after checking an answer | Keep Back in post-check controls | — |
| 6 | P3 | troubleshoot/tool.js showStep | "Flow — step N" status not announced on focus | role="status" / aria-live on the status line | — |
| 7 | P3 | Lesson 8 badge; setup-lesson badges | Badge says M3 where map says M3/M4; "moves milestone" overstates for setup lessons | Allow "M3/M4"; "prepares" wording for setup lessons | — |
| 8 | P3 | add-pdfs.md step 1 | Omits that Zotero auto-retrieves metadata on PDF drag | Add the auto-retrieval clause | — |
| 9 | P3 | flows.json flow 5 (HTTP 429) | Omits the sign-out/in-after-deleted-key resolution from the cited thread | Add the API-key sign-out/in line | — |
| 10 | P3 | Power user path | Duplicates guidance unreachable from Tom's path | Cross-link lesson 4's dedupe step | — |
| 11 | P3 | Troubleshoot chooser | Bare flow titles; no length/description hint | Add one-line hints | — |
| 12 | P3 | Home/method milestone links | M1–M5 definitions not on the published site (GitHub link only) | Add a milestone definition table on-site | — |
| 13 | P3 | METHODS.md status table | "Agent review Complete" preceded the artifact (empty form at review time) | Link this review; log triage in CHANGELOG | — |

### Sign-off checklist (reviewer)

- [x] Walked all 3 paths end-to-end against the stated personas
- [x] Exercised both tools with keyboard only (independent Playwright pass, not a re-run of the repo's script)
- [x] Verified every lesson has: outcome → why → steps → "check it worked" → "if it didn't work" → next step → official docs link → version stamp (all 11; the stamp is layout-driven so it cannot be forgotten page-by-page — good mechanism)
- [x] Verified no copied official-doc text (spot-compared 7 lessons + both flows against zotero.org/support; content is original paraphrase with correct links)
- [x] Verified honesty labels: simulated data, AI authorship disclosure, evaluation status notice, no VoiceOver claims
- [x] Verified disclaimers render on every page sampled (8 pages incl. standalone job aids — see §5.5)

---

## 5. Repo-specific probes

### 5.1 Lesson accuracy vs official Zotero documentation (current docs, fetched 2026-10-26)

Five lessons plus both tools' content spot-checked against the live official pages. **Every checked step matched. No contradictions found.**

| Claim under test | Source page | Verdict |
|---|---|---|
| Page locator: type `p. 34`/`34` in the citation search box before Enter | word_processor_plugin_usage | ✓ docs quote "p.34", "p34", or "34" before Enter |
| Multi-item citation: keep typing the next author without pressing Enter | word_processor_plugin_usage | ✓ |
| Omit Author → write the author into sentence text | word_processor_plugin_usage | ✓ |
| Mac: Tools → Templates and Add-ins → Zotero.dotm under Global Templates and Add-ins | word_processor_plugin_troubleshooting | ✓ |
| Windows: Add-ins → Inactive/Disabled handling; Trust Center boxes; no run-as-administrator | word_processor_plugin_troubleshooting | ✓ (flow 3 matches nearly verbatim) |
| Alt+F9 / Option-Fn-F9 toggle; LibreOffice Ctrl+F9; Word Options→Advanced (Win) / Preferences→View (Mac) | kb/word_field_codes | ✓ |
| `http://127.0.0.1:23119/connector/ping` → "Zotero is running"; blocker extensions; 127.0.0.1 proxy exclusion | kb/connector_zotero_unavailable | ✓ |
| Chrome/Edge pin → reinstall → reset browser; Firefox overflow menu/gear-pin/new profile; Safari → dedicated guide | kb/no_toolbar_button | ✓ (flow 1's Safari exit correctly defers to the official Safari page, mirroring the KB's own structure) |
| Reset File Sync History + "do not use any other options in the Reset pane" | kb/files_not_syncing | ✓ |
| Linked files don't sync (chain icon); Tools → Manage Attachments → Convert Linked Files to Stored Files | kb/files_not_syncing | ✓ |
| 300 MB free; data unlimited; groups can't use WebDAV; storage settings page | sync / storage docs | ✓ |
| Notes button top-right → + → Add Item Note from Annotations; annotations in DB, not the PDF | pdf_reader | ✓ (schematic faithful) |
| Duplicate merge retains collections/tags; can't mark false positives yet | duplicate_detection | ✓ (lesson 4 matches, including the honest "leave them" advice) |
| Add Item by Identifier accepts DOI/ISBN/PMID/arXiv; Create Parent Item + identifier; Manual Entry | adding_items_to_zotero | ✓ (with finding 8's omission) |
| File → New Library → New Group…; group types; open public groups can't share files; Send More Invitations | groups | ✓ |
| Colored tags: up to 9, number-key shortcuts | collections_and_tags | ✓ |

**Version stamps:** present on all 11 lessons (layout-driven), the troubleshooting page ("Zotero 10.0.6, released October 7, 2026"), the skills-check page, and both job aids. The specific version number 10.0.6 could not be independently confirmed from the docs (they are version-agnostic); forum evidence in the dataset (threads referencing "Zotero 10 beta", "Zotero 9.04", "z11") is consistent with a Zotero 10 existing, but the exact version is the author's assertion. Flagged as a limitation, not a defect.

### 5.2 Support-data analysis

- **Paraphrase fidelity:** 6 sources fetched and compared against rows — #46 (Word "error updating your document" after successful install ✓), #73 (Safari connector registered but missing from extensions ✓; actual root cause Safari < 18, correctly routed by flow 1's exit to the official Safari guide), #86 (connector saves, items never appear ✓), #99 (HTTP 429 sync ✓ — with the finding-9 nuance), plus KB pages #134 and #144 (✓ and consistent with lesson 4). All paraphrases preserve the problem faithfully; no wording copied.
- **Category coding consistency (10-row sample):** consistent — C1 rows are all connector/saving, C5 all sync/storage, features uniformly `product`, no duplicate URLs, all 145 rows carry URL + access date.
- **Statistics recomputed from the CSV:** n=145 ✓; question 57 / bug 71 / feature 17 ✓; non-feature n=128 ✓; education 40 / both 11 / product 77 ✓; top-5 = 80/128 = 62.5% ✓; lifecycle 6/24/98 ✓; C3 education+both = 12/13 ✓ (but see finding 2); C2 education+both = 5 ✓; §2.5 cluster counts all ✓.
- **The 40/60 split follows from the coded data** — 51/128 ≈ 40% education-fixable vs 77/128 ≈ 60% product — **as long as "education-fixable" means education + both.** The two wording defects (findings 1–2) are the only places where the prose diverges from the coding scheme.
- **Single-coder limitation:** stated in §1.3, §4, the method page, and METHODS.md ✓. Forum-bias and volume≠incidence limitations stated and honest (the "only 6 of 128 were day-1 problems" observation is used well — it argues *against* over-trusting the data, which is a good sign).

### 5.3 Troubleshooting flows (diagnosis order and honest exits)

- **Flow 1 (save button):** browser triage → cheapest fix first (pin the button) → reinstall → reset → exit. ✓
- **Flow 2 (saving fails):** symptom triage; the unavailable branch starts with "is the desktop app open?" — the most likely and cheapest cause — then restart, ping test, blocker check. ✓ Good teaching order.
- **Flow 3 (Word tab):** platform triage; each branch runs reinstall → structural check → permissions/Trust Center → environment caveat. Order matches the official page. The 4-sub-step macOS bundle is dense (see §2.3). ✓
- **Flow 4 (field codes/stale):** explicitly splits the 5-second display fix from the data-staleness case and says which is which. ✓ Best flow of the five.
- **Flow 5 (sync):** four-way symptom triage; each branch starts with the cheapest check (read the error icon; check zotero.org; check usage page; sync one device at a time). The "Reset File Sync History — *only* that option" warning matches the KB. ✓ (minor: finding 9).
- **No-exit honesty:** all five flows' "no" exits go to **official KB pages + the forums**, several with Debug ID instructions that match the official reporting workflow (Help → Debug Output Logging → Restart with Logging Enabled). No fabricated fixes found anywhere. The IT-policy exit ("education can't override an MDM policy") is a model of honest scope.

### 5.4 Simulated dashboard labeling

`dashboard-simulated.md` labels simulated data **five ways**: warning callout at top ("All data on this page is simulated"), "(simulated)" in table headers and column labels, per-flow table column "Yes-rate (simulated)", a "What this page is for" section re-stating the labeling workflow, and a closing reminder. Unmistakable in every chart/table. The metrics plan cross-references the honesty status ("none of these numbers exist"). ✓

### 5.5 Disclaimer sampling (8 pages)

Sampled: home, lesson 6 (insert-citations), lesson 9 (sync, via layout), troubleshoot tool, skills check, about/method, simulated dashboard, and the standalone job aids (both HTML files carry their own inline disclaimer + version stamp + CC BY 4.0 line; the PDFs are generated from the same HTML). The disclaimer include (`role="note"`) renders at the top of every Jekyll page via the overridden default layout and again in the footer. Exact wording matches the plan's required sentence. Job aids carry the disclaimer outside the Jekyll context too. ✓ No page found without it.

### 5.6 Milestone mapping

All 11 lessons map to a milestone: M1 ×2 (one flagged setup), M2 ×2 (one setup), M3 ×3 (lesson 8 as retain), M4 ×1, M5 ×1, E1, E2. Every lesson's front matter carries `milestone`, rendered as a badge; both path tables and the milestones doc agree — except lesson 8's badge (M3 vs "M3/M4 (retain)", finding 7). No unmapped lesson. The extended-milestone design (E1–E2) is a defensible, documented alternative to cutting the power-user path (D5).

### 5.7 Honesty sweep

- **Schematics:** all 10 SVGs carry `role="img"` + `<title>`/`<desc>` wired via `aria-labelledby` (verified in source); every lesson figcaption includes "Illustration, not an actual screenshot". The label lives in the page caption, not inside the SVG files themselves — fine in context, since the figures are never shown captionless. Schematics were checked against the official UI descriptions and none misrepresents the UI (see §5.1).
- **AI disclosure:** README "Tools used" states "Claude (ZCode) for AI-assisted drafting, with all steps verified against the official Zotero documentation." ✓
- **[Email]/[LinkedIn]:** untouched placeholders in README; STATUS lists them as owner actions. ✓
- **README evaluation-status line:** matches METHODS.md (axe + keyboard + agent review complete; simulations pending; no real learners; no screen reader testing). One sequencing caveat (finding 13): the "Agent review complete" claim referenced an empty form until this document filled it.
- **PENDING markers:** `evaluation/output/README.md` = "PENDING: requires API key"; `.env.example` placeholders only; `dry-run/summary.md` labeled "DRY RUN - NOT REAL RESULTS". ✓ Nothing faked.
- **No learning-gain or validation claims** found anywhere on the site or in the docs. ✓

---

## 6. Accessibility spot-check

- **axe-core 4.11.1 on 4 live URLs** (troubleshoot, skills-check, lesson 1, job aid 1): **0 violations** on all four (0 critical/serious/moderate/minor; 1 incomplete on two pages — not a violation). Consistent with the repo's own claim of 0 critical/serious across all pages.
- **Independent keyboard pass (Playwright, both tools):**
  - ✓ Step headings receive focus (`tabindex="-1"` asserted); options are real buttons (troubleshoot) and real radios in a `fieldset` with legend "Choose one answer" (skills check); Back/Start over present on fix steps; no positive `tabindex`; feedback and results headings receive focus; no-selection alert fires; results table renders per path.
  - ✗ Two defects: chooser focus no-op (finding 4) and Back removed post-check (finding 5).
- **320 px reflow:** checked on the live troubleshoot, skills-check, and a lesson page — no horizontal scroll. ✓
- **Screen reader:** not tested (per the honest disclosure; the manual VoiceOver protocol exists and is sensibly written). The status-line announcement gap (finding 6) is the one issue a VoiceOver pass would likely catch.

---

## 7. What is genuinely good

- **The evidence chain is real and reproducible.** CSV → committed chart generator → claims that recompute exactly; forum threads that actually say what the rows say; flows traceable to row IDs and KB pages. For a portfolio, this is the differentiator, and it holds up under adversarial checking.
- **Honesty as a design feature.** The 60% "education can't fix this" finding is used rather than buried; the troubleshooting tool routes failures to official forums with Debug IDs instead of inventing fixes; the IT-policy exit refuses to pretend; the dashboard screams "simulated"; the screen-reader gap is disclosed with a runnable protocol.
- **Lesson craft.** The uniform 7-part pattern is executed consistently; "check it worked" steps are genuinely observable; lesson 2's "verify metadata now" and lesson 8's "wrong order vs right order" teach judgment, not just clicks.
- **The milestone model is load-bearing.** Every lesson maps to an observable behavior; the milestone-to-lesson map reads like a scope contract, and the metrics plan resists vanity metrics explicitly.
- **Flow 4 and the recovery cases** ("someone already typed over a citation") show real empathy with how documents actually break.

## 8. Limitations of this review

- The reviewer may share the underlying model family with the authoring agent (stated above).
- No screen reader, no assistive-technology user, no real learner was involved; keyboard and axe checks are proxies.
- "Zotero 10.0.6" could not be independently confirmed as the current release; accuracy was checked against the current live documentation instead, which is the stronger check for step correctness but cannot confirm the stamp's version number.
- CSV verification sampled 10 of 145 rows (6 sources fetched); category coding was checked for consistency on the sample, not re-coded in full.
