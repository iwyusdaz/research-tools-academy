---
title: Metrics plan
parent: For program owners
nav_order: 1
description: How adoption of the academy would be measured — activation, time-to-value, support deflection — with comparison approach, confounders and privacy.
---

# Metrics plan

**Principle:** customer education is judged by outcomes the business already tracks — adoption, time-to-value, support load — not by lesson completion or quiz scores. Engagement metrics are secondary and never targets.

## The metric set

| Metric | Definition | Data source (in a real org) | Target |
|---|---|---|---|
| **Time-to-first-citation (M3)** | Days from app install to first citation inserted via the plugin | Product telemetry (opt-in) | ≤ 3 days |
| **Activation rate** | % of new users reaching M3 within 14 days | Product telemetry (opt-in) | +15 pts vs. baseline cohort |
| **Support deflection** | Change in forum/helpdesk question volume in the five troubleshooting-tool categories, per 1,000 new users | Forum + helpdesk tag counts | −20% in the top-5 categories |
| **Content effectiveness** | "Did this solve it?" yes-rate per troubleshooting flow | Tool analytics (opt-in, aggregated) | ≥ 70% per flow |
| **Content freshness** | % of lessons whose version stamp is within one minor Zotero release | Maintenance audit (manual) | 100% |
| *(secondary)* Engagement | Path completion, skills-check completion | Academy analytics | Never a target; diagnostic only |

Milestone definitions (M1–M5, E1–E2) live in [`analysis/activation-milestones.md`](https://github.com/iwyusdaz/research-tools-academy/blob/main/analysis/activation-milestones.md). Time-to-value is anchored to M3 because the support data shows the first-citation stage is the confidence cliff.

## Comparison approach

A before/after comparison is the minimum; a staggered rollout is better because it controls for seasonality.

1. **Preferred — staggered rollout (difference-in-differences):** launch the academy to, e.g., two university library cohorts a month apart. Compare each cohort's activation curve to its own pre-launch baseline, then difference the two. The staggered design cancels semester-cycle effects that hit both cohorts.
2. **Fallback — cohort before/after:** compare a pre-launch cohort (support-forum-era onboarding) against post-launch cohorts, matched on start month. Report with the confounders below.
3. **What we would *not* do:** compare users who chose to use the academy against those who didn't (self-selection bias would swamp the effect).

## Confounders to state in any readout

- **Product releases.** A Zotero release that fixes a top bug (e.g., a connector regression) moves deflection numbers on its own. Record release dates against the metric timeline.
- **Semester cycles.** Activation timing shifts at term starts; compare like-for-like weeks relative to term start, not calendar weeks.
- **Forums are a biased denominator** (see the [support analysis limitations](https://github.com/iwyusdaz/research-tools-academy/blob/main/analysis/support-analysis.md#4-limitations)): fewer forum posts can mean better deflection — or a worse forum. That's why deflection is read *per 1,000 new users* and alongside activation, never alone.
- **Novelty effects** on tool yes-rates in the first weeks; read effectiveness after the launch spike settles.

## Privacy

- **Opt-in telemetry only**, with a plain-language notice at first run; no telemetry without consent.
- **Aggregated data only** in dashboards: counts and medians per cohort, never individual trajectories.
- **No personal data collected by this academy.** The troubleshooting tool and skills check run entirely in the browser and store/send nothing (verified in the source: [tool.js](https://github.com/iwyusdaz/research-tools-academy/blob/main/docs/troubleshoot/tool.js), [check.js](https://github.com/iwyusdaz/research-tools-academy/blob/main/docs/skills-check/check.js)).
- A real deployment would minimze retention (aggregate rollups, no event-level history beyond 90 days).

## Honest status

This academy is not deployed; none of these numbers exist. The [simulated dashboard](dashboard-simulated.html) shows how the metrics would be read, using clearly labeled fictional data.
