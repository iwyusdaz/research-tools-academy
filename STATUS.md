# Status

*Last updated: 2026-10-25 (build date).*

## Live

- **Repo:** https://github.com/iwyusdaz/research-tools-academy (public, branch `main`, topics: customer-education, customer-academy, research-skills, zotero, instructional-design, edtech)
- **Site:** https://iwyusdaz.github.io/research-tools-academy/ (GitHub Pages from `main` / `docs`, Just the Docs v0.12.0 pinned)

## Done

- [x] Support data: 145 rows collected/validated (≥100 required), 11 categories, lifecycle + fix-route coded, 23-URL sample verified resolving
- [x] `analysis/support-analysis.md` (method, findings, 3 SVG charts + tables + takeaways, limitations) + `generate-charts.mjs`
- [x] `analysis/journey-map.md` (8 stages, pain points linked to rows) + `analysis/activation-milestones.md` (M1–M5, E1–E2, lesson map)
- [x] 3 paths / 11 lessons, each ≤7 min, milestone-mapped, official-docs link + version stamp (Zotero 10.0.6 @ 2026-10-25)
- [x] 10 accessible schematic SVGs (generator committed); labeled "Illustration, not an actual screenshot"
- [x] Troubleshooting tool: `flows.json` (5 flows / 32 steps) + accessible engine (focus to step headings, Back/Start over, "Did this solve it?", honest forum exits, noscript fallback)
- [x] Skills check: 9 scenario items, per-option feedback → lessons, results by path, nothing stored
- [x] Job aids: 2 cards (HTML + one-page PDF each)
- [x] Strategy: metrics plan, simulated dashboard (labeled), maintenance plan, launch plan, + issue template
- [x] Evaluation: METHODS.md; axe audits; 34/34 keyboard tests; Agent review form; human protocol (5 files); pending pipeline (`run-simulations.mjs`, `.env.example` per spec, dry-run verified, no-key exit verified); output placeholder marked PENDING
- [x] Repo docs: README case study (with exact evaluation-status notice), LICENSE (CC BY 4.0), LICENSE-CODE (MIT), ATTRIBUTION.md, CHANGELOG.md, DECISIONS.md, STATUS.md, DISCLAIMER include on every page
- [x] Published: repo pushed, Pages enabled and built; live verification 2026-10-25:
  - linkcheck across the live site: 31 pages, **0 broken links**
  - axe audit of all 27 live Jekyll/standalone pages: **0 violations** (critical/serious/moderate/minor)
  - live smoke tests of both interactive tools: render, focus management, no JS errors
  - keyboard tests: 34/34 (local, served `docs/`)
  - gitleaks: working tree + full git history clean; no `.env` ever committed; no files > 50 MB
  - pipeline: `npm run eval:pending` exits 1 with "PENDING: requires API key" and zero network; `npm run eval:dry-run` writes labeled dry-run output only
- [ ] Owner: upload `docs/assets/social-preview.png` (1280×640) in repo Settings → General → Social preview (no API for that step)

## Pending (owner actions)

- [ ] Add API keys to `.env` (copy `.env.example`) and run `npm run eval:pending` — simulated learners + item analysis
- [ ] Run the usability test with 3–5 grad students (`evaluation/human-protocol/`)
- [ ] Run the manual VoiceOver check (`evaluation/human-protocol/voiceover-manual-check.md`)
- [ ] Optional: verify lessons in the real Zotero app and add annotated screenshots
- [ ] Fill [Email]/[LinkedIn] in README; upload social preview image in repo settings (no API for that step)

## Known limitations (also stated in METHODS.md)

- No screen reader testing performed (Guidepup broken on macOS 27; manual protocol provided)
- No real-user evaluation yet; simulated results must never be presented as user evidence
- Forum data is a biased sample (stated in the analysis)

## Build log (2026-10-25)

Resumed an interrupted build; kept the validated scaffold + CSV, rebuilt/extended everything else. Full commit history on `main`.
