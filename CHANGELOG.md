# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/) loosely; versions mark portfolio milestones.

## [1.0.0] — 2026-10-25

### Added
- Support-needs analysis: 145 real public support questions (paraphrased, no usernames) coded into 11 categories × lifecycle × fix route, with three reproducible SVG charts (`analysis/`).
- Learner journey map (8 stages) and activation milestones M1–M5 + E1–E2.
- Academy site (Jekyll + Just the Docs v0.12.0 on GitHub Pages, `/docs`):
  - 3 learning paths / 11 lessons, each ≤ 7 minutes, milestone-mapped, version-stamped against Zotero 10.0.6 documentation, linked to official docs.
  - Interactive troubleshooting tool for the top-5 support issues, data-driven from `flows.json`, keyboard-operable with focus management.
  - Scenario-based skills check (9 items, per-option feedback, results by path, nothing stored).
  - 2 one-page job aids (HTML + single-page PDF).
  - Strategy layer: metrics plan, clearly-labeled simulated dashboard, maintenance plan, launch plan.
  - Method page summarizing the analysis for site visitors.
- Evaluation layer: automated axe audits (0 critical/serious), 34 scripted keyboard checks (all passing), structured Agent review, pending simulated-learner pipeline (`npm run eval:pending`, `.env.example` with three model slots, `--dry-run` support), prepared human protocol (script, consent, findings template, review form, manual VoiceOver check).
- Licenses: CC BY 4.0 for content, MIT for code; ATTRIBUTION.md.
- GitHub issue template "Report an outdated lesson".

### Fixed (during live verification)
- 13 broken relative links found by live linkcheck (path-index child links, job-aid cross-links, an over-broad Jekyll exclude that dropped `docs/evaluation/` from the build).
- Scrollable table wrappers not keyboard-accessible (theme behavior); fixed via the `table-focus` include — with a block comment, because the theme's HTML minification turns line comments into parse errors.
- Missing `<h1>` on all 11 lesson pages (the theme does not inject one).

### Evaluation-driven changes
- Fulfilled in [1.0.1]: the Agent review triage (13 findings, all accepted, fixes logged above).

## [1.0.1] — 2026-10-26

### Revisions from agent review, 2026-10-26

The full review is [`evaluation/agent-review.md`](evaluation/agent-review.md) (method label: **Agent review**). All 13 findings were triaged; none was rejected. Fixes by finding number:

- **1 (P2)** README "The problem": the fix-route sentence summed to 109% and mislabeled the 40% figure. Rewritten to the coded data: **40% education-fixable (31% knowledge gaps + 9% documented-but-avoidable behavior, 51/128); 60% product/bug** — consistent with `analysis/support-analysis.md` and the site's data page.
- **2 (P2)** "12 of 13 were knowledge gaps" conflated the two education routes (actual: 7 education + 5 both + 1 product). Reworded to "12 of 13 education-fixable (7 knowledge gaps + 5 documented-but-avoidable behaviors)" in README, the analysis headline, and the regenerated fix-route chart's alt/desc text (`analysis/generate-charts.mjs` → `figures/fix-route.svg`).
- **3 (P2)** Lesson 5 step 5 (install word processor plugin) mislabeled a blocked add-in on a work laptop as the macOS permissions case. Step now splits by platform: macOS → permissions grant (flow 3 Mac branch); Windows → Disabled Items / Trust Center / IT policy (flow 3 Windows branch).
- **4 (P2)** Troubleshoot chooser heading was unfillable (`h2#tool-heading` had no `tabindex="-1"`), so focus on load and after "Start over" landed on `<body>`. Fixed; keyboard suite extended (now 46/46) with assertions for chooser focus on load and after Start over.
- **5 (P3)** Skills check kept Back available after checking an answer (it was removed); keyboard suite asserts it.
- **6 (P3)** Troubleshoot "Flow — step N" status line given `role="status"` so it is announced; keyboard suite asserts the live region.
- **7 (P3)** Lesson 8 badge now reads M3/M4 (`milestone: M3/M4`, label "supports milestones M3/M4 (retain)") matching the milestone map; setup lessons (1, 3, 5) render "supports milestone Mx (setup)" instead of overstating "moves".
- **8 (P3)** Lesson 3 (add PDFs) now states that Zotero usually auto-retrieves metadata after a PDF drag.
- **9 (P3)** Flow 5's HTTP 429 advice now includes the cited thread's sign-out/sign-in-after-deleted-key resolution.
- **10 (P3)** Power user path index cross-links the duplicates/merge guidance in lesson 4 (Tom's path previously never reached it).
- **11 (P3)** Troubleshoot chooser buttons now carry a one-line hint per flow (`hint` field in `flows.json`).
- **12 (P3)** M1–M5/E1–E2 milestone definitions published on-site — a summary table in the [metrics plan](docs/strategy/metrics-plan.md); the GitHub link remains for the full definitions.
- **13 (P3)** Status corrected: the Agent review artifact is committed and linked from `evaluation/METHODS.md`; keyboard-test count updated to 46/46.

**Deferred (noted, not fixed):** flow 3's macOS fix step bundles four sub-steps — the simulated dashboard recommends giving the permission grant its own screen; deferred as a content-density improvement (recorded in DECISIONS.md D12).

## Unreleased
- Pending: AI-simulated learner runs + item analysis (requires API keys; `npm run eval:pending`).
- Pending: usability test with 3–5 graduate students (protocol prepared).
- Pending: manual VoiceOver check (protocol prepared; automation unavailable on the build OS).
