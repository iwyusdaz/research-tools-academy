# Agent-simulated learner runs and item review (2026-11-11)

> **Agent-simulated. Not human or real-learner data.** One AI agent (Claude, run inside the build environment with no API key) role-played every learner and then reviewed every item. No real learners have taken this skills check.

Raw answers, one-sentence persona reasons and the per-item review are in [`runs.json`](runs.json).

## What was run

- **Phase 1, 9 simulated runs:** 3 personas (Mei, new master's student; Tom, PhD candidate; Ana, returning professional on a locked-down work laptop) × 3 prior-knowledge levels (none / some, meaning EndNote or Mendeley before / expert daily Zotero user). Each run answered the 9 skills-check items in [`docs/skills-check/items.json`](../../docs/skills-check/items.json).
- **Phase 2, item review:** the same agent reviewed each item's answer distribution against the key and gave a keep / revise / replace verdict.
- **Structural checks:** key position and option length were checked directly in `items.json` and `docs/skills-check/check.js`. These results do not depend on the simulation.

## Limitations

- **Single agent, single model.** The original design used three separately configured models (one for personas, two independent judges, with agreement reported). That cross-model blind design was not reproduced. There is no second judge, so there is no agreement figure.
- **Not blind.** The agent read `items.json`, including the answer key and feedback, before role-playing. The persona answers are a judgment of how such a learner would plausibly answer.
- The agent may share a model family with the agent that wrote the items.
- Nine runs cannot show learning gains, difficulty in a real population, or statistical significance.

## Per-item answer distribution (9 runs)

| Item | A | B | C | Keyed correct |
|---|---:|---:|---:|---|
| g1 | 8 | 1 | 0 | A |
| g2 | 4 | 2 | 3 | A |
| g3 | 6 | 3 | 0 | A |
| w1 | 3 | 4 | 2 | A |
| w2 | 5 | 4 | 0 | A |
| w3 | 6 | 3 | 0 | A |
| p1 | 4 | 3 | 2 | A |
| p2 | 4 | 5 | 0 | A |
| p3 | 2 | 3 | 4 | A |

Correct answers per run (out of 9): Mei 1 / 4 / 8, Tom 1 / 7 / 9, Ana 0 / 4 / 8 (none / some / expert).

## Structural findings (deterministic)

- **The keyed answer is option A in all 9 items**, and `check.js` shows options in file order. A test-wise learner who notices this can score 9/9 without knowing Zotero.
- **The keyed answer is the longest option in 7 of 9 items** (all except p2 and p3), a second answer cue.

## Item review (same agent)

| Item | Verdict | Issue |
|---|---|---|
| g1 | revise | Option A includes the explanation, which cues the answer; even no-prior runs chose it |
| g2 | revise | Option C's own feedback says it can work, so two options are defensible as the stem is worded |
| g3 | keep | none |
| w1 | keep | none; the Word add-in store distractor drew the runs with Mendeley experience |
| w2 | keep | none |
| w3 | keep | none |
| p1 | revise | Option A bundles three causes and is about twice as long as the distractors |
| p2 | keep | none; the direct-edit distractor drew 5 of 9 runs |
| p3 | keep | Hardest item (2 of 3 expert runs chose the open group); the limitation is real and stated in the group-libraries lesson |

## What this can and cannot show

- **Can show:** answer cues and wording problems worth fixing before real learners take the check (the key-position and length cues above, plus g1, g2 and p1).
- **Cannot show:** learning gains, real item difficulty, or that the check is "validated with users". The items have not been changed in response yet; the suggested revisions are listed as next steps in the README.
