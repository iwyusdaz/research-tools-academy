# Structured review form — "Agent review"

*Method label that must appear wherever these findings are cited: **Agent review**. The reviewer agent did not build the repository and worked from the built site + sources only. Stated limitation: the reviewer may share the underlying model family with the authoring agent, so this is not an independent expert review and must never be presented as "expert feedback" or "educator feedback".*

## Reviewer instructions

1. You are reviewing a customer-education site about Zotero for graduate students. You did not build it.
2. Do a **cognitive walkthrough** of each learning path for the persona it claims to serve (Getting started → new master's student; Writing with citations → returning professional on a restricted Word laptop; Power user → PhD candidate with 400+ sources): at each step ask "does the learner know what to do next, and will they notice the outcome?"
3. Do a **heuristic evaluation** (Nielsen's 10) of both interactive tools and the home page.
4. Check claims: every lesson links to official docs and carries a version stamp; every chart has a data table + alt text + takeaway; simulated data is labeled; nothing claims learning gains, user validation, or affiliation with Zotero.
5. Rate findings: **P1 = blocks a learner**, P2 = costs time or trust, P3 = polish.

## Findings (reviewer fills)

| # | Severity | Where (page/step) | Finding | Suggested fix | Accepted? (author triage) |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| … | | | | | |

## Sign-off checklist (reviewer)

- [ ] Walked all 3 paths end-to-end against the stated personas
- [ ] Exercised both tools with keyboard only
- [ ] Verified every lesson has: outcome → why → steps → "check it worked" → "if it didn't work" → next step → official docs link → version stamp
- [ ] Verified no copied official-doc text (spot-compare 3 lessons against zotero.org/support)
- [ ] Verified honesty labels: simulated data, AI authorship disclosure, evaluation status notice, no VoiceOver claims
- [ ] Verified disclaimers render on every page (site pages *and* standalone job aids)

## Author triage record

Each accepted finding becomes a `CHANGELOG.md` entry referencing the finding number. Rejected findings get a one-line reason here, so the review is auditable:

- (none yet — to be filled at review time)
