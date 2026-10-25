# Learner Journey Map: A Graduate Student's First Weeks with Zotero

*Built 2026-10-25. Pain points link to rows in [`support-questions.csv`](support-questions.csv); each row is paraphrased from a public thread (URL included there). Emotion labels are the author's synthesis of the forum data, not first-hand interviews.*

**Personas** (from the implementation plan):

| Persona | Situation | Goal | Primary pain point |
|---|---|---|---|
| **Mei, 24**, new master's student | First literature review | Collect sources, cite correctly | Doesn't know the browser connector exists; formatting errors |
| **Tom, 31**, PhD candidate | Thesis with 400+ sources | Organize, annotate, sync | Sync storage, duplicates, group libraries |
| **Ana, 45**, returning professional | Part-time degree, Word on a work laptop | Insert citations in Word | Word plugin not showing; permissions |

The map follows the journey stage by stage. "Support data" cites example CSV row IDs (paraphrased rows with URLs); "education touchpoint" names what the academy provides.

---

## Stage 1 — Discover

| | |
|---|---|
| **User goal** | Mei hears "use a reference manager" from her supervisor and searches for what that means. |
| **Actions** | Searches; compares Zotero, Mendeley, EndNote; lands on zotero.org. |
| **Emotions** | Curious, slightly anxious ("another tool to learn?"). |
| **Pain points** | Support data is thin here — almost no day-1 questions in the forums (6 of 128; see [lifecycle chart](support-analysis.md)). The bigger discovery problem is invisible in forum data: users like Mei don't know the *browser connector* is a separate piece from the desktop app (C1 questions like [#134, save button missing](https://www.zotero.org/support/kb/no_toolbar_button) usually trace back to this). |
| **Education touchpoint** | Academy home page: choose-your-path with time-to-first-value promise ("first citation within a week"); lesson 1 explains desktop app vs. connector vs. word processor plugin as three pieces. |

## Stage 2 — Install

| | |
|---|---|
| **User goal** | Get Zotero and the connector installed and running. |
| **Actions** | Downloads from zotero.org, drags to Applications (macOS), installs connector for their browser. |
| **Emotions** | Confident at first… until something silently fails. |
| **Pain points** | C11 (13 questions): app won't open ([#48](https://forums.zotero.org/discussion/132628/)), crash at startup ([#54](https://forums.zotero.org/discussion/132834/)), macOS pinwheel hang ([#96](https://forums.zotero.org/discussion/134044/)); connector missing from Safari's extensions after registration ([#73](https://forums.zotero.org/discussion/133445/)). |
| **Education touchpoint** | Lesson [Install Zotero and the browser connector](../docs/paths/getting-started/install-zotero.html) with "check it worked" steps; troubleshooting flows 1–2 cover connector invisibility and "Zotero is unavailable". |

## Stage 3 — First capture

| | |
|---|---|
| **User goal** | Save the first handful of papers from the web or a database. **Milestone M1.** |
| **Actions** | Clicks the save button on a journal page; saves from Google Scholar / JSTOR; expects the PDF to come along. |
| **Emotions** | Relief when it works; distrust when the PDF is missing or the record is wrong. |
| **Pain points** | C1 is the largest category (20 questions): records save but items never appear ([#86](https://forums.zotero.org/discussion/133695/)); JSTOR saves the record but not the PDF ([#91](https://forums.zotero.org/discussion/133925/)); "Zotero is unavailable" when saving ([#135](https://www.zotero.org/support/kb/connector_zotero_unavailable)). |
| **Education touchpoint** | Lesson [Save your first sources](../docs/paths/getting-started/save-first-sources.html); troubleshooting flow 2; job aid 1 sets the 5-step capture routine. |

## Stage 4 — Organize

| | |
|---|---|
| **User goal** | Bring order: collections for the thesis chapter, tags for status. **Milestone M2** (10 items in a collection). |
| **Actions** | Creates collections, drags items, adds PDFs from disk, retrieves metadata for stray PDFs, merges duplicates. |
| **Emotions** | Growing ownership; irritation at clutter. |
| **Pain points** | C9 (9 questions): moving libraries in ([#4 SciWheel migration](https://forums.zotero.org/discussion/93805/)), "how do I find and merge duplicates?" ([#144](https://www.zotero.org/support/duplicate_detection)); C10 (6 questions): search and organization workflows. |
| **Education touchpoint** | Lesson [Add PDFs and retrieve metadata](../docs/paths/getting-started/add-pdfs.html); lesson [Organize with collections and tags](../docs/paths/getting-started/collections-and-tags.html) (includes a dedupe step). |

## Stage 5 — First citation

| | |
|---|---|
| **User goal** | Cite something in a real document without breaking it. **Milestone M3** — the academy's headline activation event. |
| **Actions** | Opens Word (or LibreOffice/Google Docs), looks for the Zotero tab, inserts a citation, picks a style. |
| **Emotions** | This is where confidence breaks. The citation feels like the "real" test. |
| **Pain points** | C2 (15 questions): Zotero tab missing in Word ([#46](https://forums.zotero.org/discussion/132613/)); macOS permissions ([#138](https://www.zotero.org/support/kb/mac_word_permissions_missing)); field codes showing ([#139](https://www.zotero.org/support/kb/word_field_codes)). C3 (13 questions): style behaves unexpectedly ([#68 MLA shows year](https://forums.zotero.org/discussion/133290/), [#118 APA editors](https://forums.zotero.org/discussion/134371/)). |
| **Education touchpoint** | Lessons [Install the word processor plugin](../docs/paths/writing-with-citations/install-word-plugin.html) and [Insert citations and choose a style](../docs/paths/writing-with-citations/insert-citations.html); troubleshooting flows 3–4; job aids 1–2. |

## Stage 6 — Bibliography

| | |
|---|---|
| **User goal** | Produce the reference list in the required style and keep it in sync with edits. **Milestone M4.** |
| **Actions** | Clicks Add/Edit Bibliography; later edits items in Zotero and expects the document to update. |
| **Emotions** | Trust when Refresh "just works"; panic when the bibliography goes stale or a manual edit silently breaks it. |
| **Pain points** | The biggest *teachable* trap in the data: editing citation text directly in Word blocks updates ([#140, citation does not update](https://www.zotero.org/support/kb/citations_not_updating), [#58, bibliography editing fails](https://forums.zotero.org/discussion/133054/)). C4 volume is small (2) because the KB absorbs the common cases. |
| **Education touchpoint** | Lesson [Generate and update your bibliography](../docs/paths/writing-with-citations/generate-bibliography.html); lesson [Fix common citation formatting errors](../docs/paths/writing-with-citations/fix-formatting-errors.html); troubleshooting flow 4. |

## Stage 7 — Collaborate

| | |
|---|---|
| **User goal** | Share a library with a lab or reading group (Tom's thesis team; Ana's cohort). |
| **Actions** | Creates/joins a group, drags items in, deals with members' annotations, syncs group files. |
| **Emotions** | Pragmatic; occasionally confused about "where did my item go?" (copies vs. links). |
| **Pain points** | C8 (6 questions): adding members fails ([#77](https://forums.zotero.org/discussion/133557/)), sharing across personal and group libraries ([#18](https://forums.zotero.org/discussion/130682/)), seeing teammates' annotations ([#120](https://forums.zotero.org/discussion/134382/)). Group file sync is blocked for open public groups — a documented limitation the academy should teach around, not complain about. |
| **Education touchpoint** | Lesson [Group libraries for research teams](../docs/paths/power-user/group-libraries.html). |

## Stage 8 — Maintain

| | |
|---|---|
| **User goal** | Keep the tool working across devices and versions over months (Tom: 400+ sources). **Milestone M5** (sync set up) and beyond. |
| **Actions** | Sets up sync, hits the storage quota, upgrades or cleans up, updates the app, re-learns after big updates. |
| **Emotions** | Settled but watchful; sync errors feel scary ("is my data safe?"). |
| **Pain points** | C5 (16 questions): files not syncing ([#132](https://www.zotero.org/support/kb/files_not_syncing)), quota warnings that persist after upgrading ([#142](https://www.zotero.org/support/kb/storage_quota_and_local_storage)), repeated conflict prompts ([#143](https://www.zotero.org/support/kb/repeated_conflicts)). C6 (16): annotation workflows ([#82 highlights misbehaving](https://forums.zotero.org/discussion/133667/), [#126 annotation-note cursor bug](https://forums.zotero.org/discussion/134409/)). |
| **Education touchpoint** | Lesson [Sync your library across devices](../docs/paths/power-user/sync-across-devices.html); lesson [Annotate PDFs and extract notes](../docs/paths/power-user/annotate-and-extract.html); troubleshooting flow 5; academy maintenance plan (version stamps, quarterly audit) keeps the content trustworthy at this stage. |

---

## Emotional arc summary

```
Discover   Install    Capture    Organize   Citation   Bibliog.   Collaborate Maintain
  curious → frustrated → relieved → settled → PANIC   → trust    → pragmatic → wary
                      (M1, M2)              (M3)      (M4)                  (M5)
```

The two confidence cliffs are **Stage 5 (first citation)** and the moment sync first *fails*. The academy's troubleshooting tool and the Writing path exist for exactly those two cliffs; the metrics plan measures time-to-M3 as the primary activation outcome.
