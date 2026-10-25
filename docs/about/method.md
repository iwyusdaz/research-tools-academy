---
title: The data behind this academy
nav_order: 9
description: How 145 real public support questions were collected, coded, and turned into the curriculum — and the limitations of that data.
---

# The data behind this academy

Every path, lesson and troubleshooting flow here traces back to an analysis of **145 real, public Zotero support questions** — collected from the [Zotero forums](https://forums.zotero.org/) and the [official knowledge base](https://www.zotero.org/support/kb/) on **2026-10-25**. This page summarizes the method; the full analysis lives in the repository ([analysis/support-analysis.md](https://github.com/iwyusdaz/research-tools-academy/blob/main/analysis/support-analysis.md), with the row-level data in [analysis/support-questions.csv](https://github.com/iwyusdaz/research-tools-academy/blob/main/analysis/support-questions.csv)).

## What was collected

- 131 public forum threads and 14 official knowledge-base topics — **145 rows**
- Every question **paraphrased** (never copied), **no usernames** collected, thread URL and access date recorded for every row
- A 23-row URL sample re-verified: all resolve

## How it was coded

Each row was coded three ways: by **category** (11 categories, from browser connector to groups), by **lifecycle stage** (day 1 / week 1 / month 1+), and by **fix route** — the customer-education version of "is it training?":

| Fix route | Meaning | Share of 128 questions+bugs |
|---|---|---:|
| Education | A knowledge or workflow gap the academy can fix | 31% |
| Both | Documented behavior education can help users avoid | 9% |
| Product / bug | Needs the product team or a genuine bug report | 60% |

*(17 feature requests were logged but excluded from the knowledge-gap analysis.)*

## Headline findings

1. **Five categories hold 62% of the questions**: browser connector & saving (20), PDF reader & annotations (16), sync & storage (16), word processor plugin (15), citations & styles (13).
2. **40% of questions (51 of 128) were education-fixable** — and citations & citation styles is the most education-heavy category of all (12 of its 13 questions: 7 knowledge gaps + 5 documented-but-avoidable behaviors).
3. **Problems skew late**: 77% of forum questions came from month-1+ users. Week-1 questions cluster on the connector and the Word plugin — exactly where the academy front-loads its two main paths.

## What the academy does with it

- The **top 5 issues** → the [troubleshooting tool]({{ "../troubleshoot/" | relative_url }}), one flow each
- The **top knowledge gaps** → the [three learning paths]({{ "../index.html" | relative_url }}) and the two [job aids]({{ "../job-aids/index.html" | relative_url }})
- The **lifecycle distribution** → the [activation milestone model]({{ "../strategy/metrics-plan.html" | relative_url }}) (M1 first capture → M3 first citation → M5 sync)

## Limitations — read before citing

- **Forum posters are a biased sample**: people with problems, motivated enough to post, mostly established users (76.6% of questions came from month-1+ users), skewing English-speaking. Day-1 difficulty is almost certainly understated.
- **Volume is not incidence.**
- **One coder, one pass** — no inter-rater reliability was computed.
- **A snapshot** (collected 2026-10-25), not a census of a defined period.

The full statement is in the [analysis document](https://github.com/iwyusdaz/research-tools-academy/blob/main/analysis/support-analysis.md#4-limitations).
