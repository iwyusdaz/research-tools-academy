---
title: Simulated dashboard
parent: For program owners
nav_order: 2
description: A worked example of reading the adoption metrics — with clearly labeled SIMULATED data and a what-we'd-do-next interpretation.
---

# Dashboard (simulated data)

{: .warning }
> **All data on this page is simulated.** No version of this academy has been deployed; no real users have been measured. The numbers below are fictional placeholders chosen to exercise the interpretation workflow — nothing more.

## The story the simulated quarter tells

Scenario behind the fictional numbers: the academy "launched" (simulated) at the start of a term with a staggered rollout — cohort A in week 1, cohort B four weeks later.

| Metric | Baseline (simulated) | Cohort A (simulated) | Cohort B (simulated) | Target | Read |
|---|---:|---:|---:|---:|---|
| Time-to-first-citation (M3) | 6.2 days | 3.9 days | 3.5 days | ≤ 3 days | Big improvement, still short of target |
| Activation rate (M3 in 14 days) | 41% | 58% | 61% | ≥ 56% (+15 pts) | **Target met** |
| Support deflection, top-5 categories per 1,000 new users | 22.4 | 19.1 | 18.3 | ≤ 17.9 (−20%) | Improving; not yet at target |
| Troubleshooting "solved it" yes-rate (per flow) | — | 63–78% | 65–79% | ≥ 70% | Three flows pass; two need rework |
| Path completion (secondary) | — | 31% | 34% | — | Diagnostic only |

## Per-flow "did this solve it?" rates (simulated)

| Flow | Yes-rate (simulated) | vs. 70% target | Interpretation |
|---|---:|---|---|
| Save button missing in browser | 78% | pass | Content is carrying the fix |
| Saving fails / PDF missing | 71% | pass | Some exits correctly route to forums |
| Zotero tab missing in Word | 66% | **fail** | macOS permission step likely too compressed |
| Field codes / stale citations | 79% | pass | Pure knowledge gap — education works |
| Sync failing | 63% | **fail** | Too many branches; users bail mid-flow |

## What we'd do next (still in the simulated scenario)

1. **Rework flow 5 (sync).** The 63% yes-rate with visible mid-flow abandonment suggests the flow branches too early. Split "error icon" and "files missing" into separate entry points instead of one dropdown-of-symptoms.
2. **Expand the macOS permission step in flow 3.** 66% yes-rate concentrated on Mac users in the (simulated) segment data — the fix exists but the step needs its own screen with the exact System Settings path.
3. **Close the last 0.5 days to the M3 target.** Activation is at target but time-to-M3 isn't: the (simulated) funnel shows the delay sits between M2 and M3 — users who don't install the word processor plugin in week 1. Response: move the plugin-install lesson link into the Getting started path's closing screen.
4. **Keep watching deflection per 1,000 new users**, not raw forum volume — the simulated raw count fell 9% while new-user volume (simulated) grew 11%, which would have looked like a miss on the wrong denominator.

## What this page is for

- It demonstrates the *reading* workflow: every metric is read against its target, per cohort, with a next action attached.
- It demonstrates the *honesty* workflow: simulated data is labeled at the top, in the title, and here at the bottom. When real data exists, this page is replaced by a real dashboard with the same structure (see [metrics plan](metrics-plan.html)).

*Reminder: every number above is invented for demonstration.*
