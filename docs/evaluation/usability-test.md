---
title: Usability test protocol
parent: For program owners
nav_order: 5
description: The prepared protocol for testing the academy with real graduate students — script, consent text, findings template. Not yet run.
---

# Usability test protocol (prepared, not yet run)

**Status:** the materials below are ready for sessions with 3–5 graduate students or researchers. **No sessions have been run.** This page describes what would happen; results will be documented in `CHANGELOG.md` and the README's evidence section when it does.

{: .note }
> Until then, the only evaluation evidence is: automated accessibility testing, scripted keyboard task tests, and a structured **Agent review** (a reviewer agent that did not build the repo; it may share the underlying model with the author — a stated limitation). See the repository's `evaluation/METHODS.md`.

## Goals

Watch real grad students (a) save an article and insert a citation using only the academy, and (b) fix a missing Zotero tab in Word using the [troubleshooting tool]({{ "../troubleshoot/index.html" | relative_url }}). Measure task success, time, stuck points; capture quotes.

## Materials (in `evaluation/human-protocol/` in the repository)

| File | Purpose |
|---|---|
| `usability-test-script.md` | Facilitator script with tasks and probes |
| `consent-text.md` | Plain-language informed consent (no personal data beyond session notes the participant approves) |
| `findings-template.md` | Per-session capture sheet |
| `review-form.md` | Structured expert/agent review form (the "Agent review") |
| `voiceover-manual-check.md` | Manual screen reader check protocol (see note) |

## Why the screen reader check is manual

Automated VoiceOver control (Guidepup) does not function on the build machine's OS version, so the repository uses Playwright `ariaSnapshot` output plus keyboard-only scripted tests as the automated evidence, and a **manual VoiceOver protocol** for a human to run on any Mac (Cmd+F5) — the honest substitute for claiming screen reader testing that didn't happen.

## After the sessions

Document every change made in response in the repo's changelog with the session reference that motivated it — the "≥ 3 revisions documented" requirement. Success metric: task completion without leaving the academy, not satisfaction scores.
