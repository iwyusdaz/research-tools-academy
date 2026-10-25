# Evaluation methods

*Evaluation date basis: 2026-10-25. This document states what was evaluated, how, by what method, and what each piece of evidence can and cannot show.*

## Evaluation status at a glance

| Evaluation | Method label | Status | Evidence location |
|---|---|---|---|
| Support-needs analysis | Real public data (forum + KB), single coder | **Complete** | [`analysis/support-analysis.md`](../analysis/support-analysis.md) |
| Accessibility audit (automated) | axe-core 4.11.1, WCAG 2.1 A/AA + best practice, per page + both tools | **Complete** | summary below; raw JSON via the audit script |
| Keyboard task tests | Playwright 1.57 scripted keyboard-only task completion + 320 px reflow | **Complete** (46/46) | `evaluation/keyboard-tests.mjs` |
| Design review | **Agent review** — structured heuristic + cognitive-walkthrough review by a reviewer agent that did not build the repo | **Complete** — artifact committed 2026-10-26; findings triaged and fixes applied | [`evaluation/agent-review.md`](agent-review.md) |
| Simulated learners + item analysis | AI-simulated personas (3 personas × 3 levels, 9 runs) + two-model item review | **PENDING: requires API key** | `evaluation/run-simulations.mjs`; outputs placeholder in `evaluation/output/` |
| Usability test with real users | 3–5 grad students, scripted tasks, consented | **Not run** — protocol prepared | `evaluation/human-protocol/` |
| Screen reader review | Manual VoiceOver protocol (automation unavailable — see Limitations) | **Not run** — protocol prepared | `evaluation/human-protocol/voiceover-manual-check.md` |

**Plain-language status (also stated in the README):** automated accessibility testing and agent-based design reviews are complete. AI-simulated learner and review-panel evaluations are pending. No real learners have tested this yet.

## 1. Support-needs analysis (real data)

145 public support questions and knowledge-base topics, collected 2026-10-25, paraphrased, no usernames, every row carrying its source URL and access date. Coded into 11 categories × lifecycle stage × fix route (education / both / product). Method, findings and limitations (forum-poster bias, single coder, volume ≠ incidence) are documented in the analysis document itself. A 23-row URL sample was re-verified as resolving.

**Can show:** what people actually ask for help with, and which of those problems education can address. **Cannot show:** the true incidence of problems (volume ≠ incidence) or the experience of users who never post.

## 2. Automated accessibility audit

- Tool: axe-core 4.11.1 via the shared audit script, WCAG 2.1 A/AA + best-practice rules.
- Scope: every published page of the site (home, 3 path indexes, 11 lessons, both tools, 2 job aid cards + index, 5 strategy pages, method page, usability protocol page).
- Acceptance: **zero critical or serious violations** on every page. Any remaining moderate/minor findings are listed with a rationale below.
- The two interactive tools were additionally exercised functionally (see §3), because axe checks DOM state, not task flows.

## 3. Scripted keyboard task tests (Playwright)

`evaluation/keyboard-tests.mjs` serves the built site locally and drives headless Chromium with keyboard only:

- **Troubleshooting tool:** chooser reachable by Tab; Enter starts a flow; **the chooser heading receives focus on load and after Start over** (asserted via `document.activeElement`); **focus moves to each new step heading** (asserted the same way); the "flow — step N" status line is a live region (`role="status"`); options activate by keyboard; Back returns to the previous step; Start over resets; a full flow completes to a solved state; no positive `tabindex` anywhere.
- **Skills check:** all 9 scenarios answered keyboard-only; feedback panel receives focus; **Back remains available after checking an answer**; results render per path; Start over resets.
- **Reflow:** both tools at 320 px width produce no horizontal scroll (WCAG 1.4.10 proxy).
- Result: **46/46 checks pass** (34 checks at the 2026-10-25 build; extended with the focus, live-region and Back assertions added in the 2026-10-26 agent-review revision round).

**Can show:** the task flows are keyboard-operable and focus is managed. **Cannot show:** screen reader output quality or real-user experience.

## 4. Agent review (complete, with stated limitation)

A structured review of every lesson, both tools and the strategy documents, performed by a reviewer agent **that did not build the repository**, using the review form in `evaluation/human-protocol/review-form.md` (heuristic evaluation + cognitive walkthrough). The full report — 13 findings (4 P2, 9 P3), verified probes and limitations — is at [`evaluation/agent-review.md`](agent-review.md) (2026-10-26). All 13 findings were triaged and accepted; fixes are recorded in `CHANGELOG.md` (1.0.1).

**Limitation, stated plainly:** the reviewer agent may run on the same underlying model family as the authoring agent, so this is *not* an independent expert review. It is labeled "Agent review" everywhere it appears. It cannot substitute for the usability test or an expert (Zotero-experienced) review, both of which remain open to the owner.

## 5. Simulated learners + item analysis (pipeline ready, pending)

`evaluation/run-simulations.mjs` (run with `npm run eval:pending`):

- **Phase 1 — 9 simulated runs:** MODEL_A role-plays 3 personas (Mei/Tom/Ana from the design plan) × 3 prior-knowledge levels (none / some / expert), answering the 9 skills-check scenarios.
- **Phase 2 — item analysis:** MODEL_B and MODEL_C independently review each item's answer distribution against the key and flag ambiguity or quality problems; agreement between the two judges is reported per item and overall. A model never reviews its own output (A produces; B and C review).
- **Reproducibility:** every prompt, persona spec, response and setting is saved to `evaluation/output/simulations-<timestamp>/raw.json`; `summary.md` carries the human-readable tables. Models are whatever the three `.env` slots name; ideally from different providers.
- **Safety rails:** missing or placeholder `.env` values → exit 1, **zero network calls**; `--dry-run` exercises the full pipeline with stub responses into `dry-run/` labeled **DRY RUN – NOT REAL RESULTS** (never cited as results).

**Can show:** ambiguous items, distractors real users would pick, confusing wording — inputs to item revision. **Cannot show:** learning gains, statistical significance, or "validated with users." AI personas already know the content; the check measures item behavior, not learning. Per the shared standard, results are never described as user validation.

## 6. Usability test with real users (not run)

Script, consent text and findings template are prepared in `evaluation/human-protocol/` for 3–5 graduate students: two tasks (save + cite using only the academy; fix a missing Word tab using the tool), measuring task success, time and stuck points, with ≥ 3 documented revisions to follow. **No sessions have been run and no claims of user testing are made.**

## 7. Screen reader testing (manual protocol only)

Automated VoiceOver control (Guidepup) does not function on the build machine's OS (macOS 27), so **no screen reader testing has been performed** — by automation or by a human. The substitutes, stated honestly:

- axe-core automated rules + keyboard task tests + focus-management assertions (§2–3);
- Playwright `ariaSnapshot` output for both tools, checked for sensible names/roles at every step;
- a **manual VoiceOver check protocol** (`evaluation/human-protocol/voiceover-manual-check.md`) that any macOS user can run in ~20 minutes.

The absence of review by a screen reader user is a standing limitation.

## Known accessibility gaps (documented, not hidden)

- Interactive tools rely on standard controls (buttons, radios, headings); they have **not** been verified with a screen reader (§7).
- Schematic SVG figures carry `role="img"` + `<title>/<desc>`; color never carries meaning alone (numbered callouts + text labels), but contrast of diagram text against the white canvas has been reviewed only by automated tooling, not by low-vision users.

## Changes made in response to evaluation (so far)

Recorded in `CHANGELOG.md` as they occur. The agent review's accepted findings are the first entries.
