# Activation Milestones: Defining Time-to-Value

*Built 2026-10-25 from the [journey map](journey-map.md) and [support analysis](support-analysis.md). The milestones define what "productive" means for a new Zotero user so the academy can be measured against adoption outcomes, not lesson completion.*

## Why milestones

Customer education is judged by outcomes the business already tracks — adoption, time-to-value, support load — not by quiz scores. The milestone model converts those outcomes into observable user behaviors that lessons, the troubleshooting tool and the metrics plan all align to.

**Core milestones (time-to-value):**

| Milestone | Observable behavior | Why it's the milestone | Journey stage | Data signal |
|---|---|---|---|---|
| **M1 — First capture** | Connector installed; first item saved from the browser | The first "aha": the library starts existing. Skipping the connector (the most common install gap) blocks everything downstream | Install → first capture | Day-1/week-1 C1 questions ([#134](https://www.zotero.org/support/kb/no_toolbar_button), [#135](https://www.zotero.org/support/kb/connector_zotero_unavailable)) |
| **M2 — Working collection** | 10 items in at least one collection | The library has structure; the user is committed enough to organize. Ten is the threshold where collections beat a flat list | Organize | C9/C10 organization questions ([#144 duplicates](https://www.zotero.org/support/duplicate_detection)) |
| **M3 — First citation** | First citation inserted in a document via the plugin | **Primary activation event.** This is the moment Zotero pays off for a grad student — and, per the support data, the biggest confidence cliff (C2, 15 questions) | First citation | [#46](https://forums.zotero.org/discussion/132613/), [#138](https://www.zotero.org/support/kb/mac_word_permissions_missing), [#139](https://www.zotero.org/support/kb/word_field_codes) |
| **M4 — Correct bibliography** | Bibliography generated in the required style and updating after edits | The deliverable deadline (thesis, paper) is met. "Updates after edits" separates real adoption from a one-off | Bibliography | [#140](https://www.zotero.org/support/kb/citations_not_updating), [#58](https://forums.zotero.org/discussion/133054/) |
| **M5 — Sync set up** | Data sync enabled and verified on a second device (for multi-device users) | Protects the user's investment; the scariest failure mode in the data (C5, 16 questions) is data not being where they expect it | Maintain | [#132](https://www.zotero.org/support/kb/files_not_syncing), [#133](https://www.zotero.org/support/kb/changes_not_syncing) |

**Extended milestones** (beyond first-week value; serve the Power user path):

| Milestone | Observable behavior | Journey stage |
|---|---|---|
| **E1 — Annotation workflow** | Highlights/notes extracted from a PDF into a note used for writing | Organize/maintain (C6, 16 questions) |
| **E2 — Team collaboration** | User contributes to (or administers) a group library | Collaborate (C8, 6 questions) |

## Milestone-to-lesson map

Every lesson moves at least one milestone. The map is the academy's scope contract: lessons that move no milestone were cut.

| Path | Lesson | Milestone | Path position |
|---|---|---|---|
| Getting started | 1. Install Zotero and the browser connector | M1 (setup) | /paths/getting-started/install-zotero.html |
| Getting started | 2. Save your first sources from the web | **M1** | /paths/getting-started/save-first-sources.html |
| Getting started | 3. Add PDFs and retrieve metadata | M2 | /paths/getting-started/add-pdfs.html |
| Getting started | 4. Organize with collections and tags | **M2** | /paths/getting-started/collections-and-tags.html |
| Writing with citations | 5. Install the word processor plugin | M3 (setup) | /paths/writing-with-citations/install-word-plugin.html |
| Writing with citations | 6. Insert citations and choose a style | **M3** | /paths/writing-with-citations/insert-citations.html |
| Writing with citations | 7. Generate and update your bibliography | **M4** | /paths/writing-with-citations/generate-bibliography.html |
| Writing with citations | 8. Fix common citation formatting errors | M3/M4 (retain) | /paths/writing-with-citations/fix-formatting-errors.html |
| Power user | 9. Sync your library across devices | **M5** | /paths/power-user/sync-across-devices.html |
| Power user | 10. Annotate PDFs and extract notes | E1 | /paths/power-user/annotate-and-extract.html |
| Power user | 11. Group libraries for research teams | E2 | /paths/power-user/group-libraries.html |

## Time-to-value targets (carried into the [metrics plan](../docs/strategy/metrics-plan.md))

| Measure | Definition | Target |
|---|---|---|
| Time-to-first-citation (M3) | Days from install to first inserted citation | ≤ 3 days |
| Activation rate | % of new users reaching M3 within 14 days | +15 pts vs. pre-launch cohort |
| Milestone drop-off | Largest gap between consecutive milestones | M2→M3 expected (the citation cliff); investigate if M1→M2 dominates |

**Honesty note:** this academy is not deployed, so none of these numbers exist yet. The [simulated dashboard](../docs/strategy/dashboard-simulated.md) uses clearly labeled fictional data to show how the metrics would be read, and the [metrics plan](../docs/strategy/metrics-plan.md) specifies how real numbers would be collected in a real organization (opt-in, aggregated).
