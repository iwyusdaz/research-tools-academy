---
title: Maintenance plan
parent: For program owners
nav_order: 3
description: How the academy stays current as Zotero changes — version stamps, review triggers, quarterly audits, and a feedback channel.
---

# Maintenance plan

Outdated content erodes trust faster than no content. This plan keeps the academy current with a product that updates itself several times a year.

## 1. Version stamps on every lesson

Every lesson ends with: *"Last verified against Zotero <version> documentation on <date>."* The stamp is a promise — a reader can tell at a glance how old the verification is. The stamp lives in the [lesson layout](https://github.com/iwyusdaz/research-tools-academy/blob/main/docs/_layouts/lesson.html) so it cannot be forgotten page by page.

## 2. Review triggers (when to re-verify, without being asked)

| Trigger | What to review | Where the signal comes from |
|---|---|---|
| Zotero **major or minor release** (e.g., 10.x → 11) | All 11 lessons + both tools + job aids; re-baseline the version stamp | [Zotero version history](https://www.zotero.org/support/changelog) |
| Zotero **patch release** (10.0.x) | Skim the changelog for UI-affecting changes; update only touched lessons | Changelog |
| **Forum spike** in a category the academy covers | The related lesson and troubleshooting flow | Zotero forums; the `fix_route` categories in the [support analysis](https://github.com/iwyusdaz/research-tools-academy/blob/main/analysis/support-analysis.md) |
| "Did this solve it?" yes-rate **falls below 70%** on any flow | That flow's steps against current docs | Tool analytics (in a real deployment) |
| A **GitHub issue** from the outdated-lesson template | The reported page, within a week | Issue tracker |

## 3. Quarterly audit

Once a quarter (calendar reminder, ~30 minutes):

1. Re-verify one full learning path against the current official documentation (rotate: G1 → W1 → P1).
2. Spot-check the other two paths' steps against the changelog.
3. Re-run the link checker against the live site (`tooling/linkcheck.mjs`).
4. Confirm every lesson's version stamp is within one minor release; refresh stale ones.
5. Log the audit in `CHANGELOG.md` even when nothing changed — absence of evidence needs evidence of absence.

## 4. Feedback channel

**[Report an outdated lesson](https://github.com/iwyusdaz/research-tools-academy/issues/new?template=report-outdated-lesson.md)** — a GitHub issue template pre-filled with the questions that make a report actionable: which page, which step, what the official docs say now, your Zotero version and platform. Issues are triaged with the review triggers above; a confirmed outdated lesson gets the version stamp removed *immediately* (honesty first), then the fix.

## 5. Ownership

This is a portfolio project maintained by a sole author. The maintenance load is deliberately small: 11 lessons, two tools with data files (`flows.json`, `items.json`) that separate *content* from *code*, and job aids generated from HTML. A real team would add a named owner per path and a review SLA (one week) — the structure here anticipates that.
