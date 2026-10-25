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
- (reserved for the Agent review triage and future usability sessions — each accepted finding will be logged here with its finding number or session reference)

## Unreleased
- Pending: AI-simulated learner runs + item analysis (requires API keys; `npm run eval:pending`).
- Pending: usability test with 3–5 graduate students (protocol prepared).
- Pending: manual VoiceOver check (protocol prepared; automation unavailable on the build OS).
