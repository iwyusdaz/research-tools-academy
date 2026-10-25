---
title: Fix common citation formatting errors
parent: Writing with citations
nav_order: 4
layout: lesson
minutes: 7
milestone: M3
description: Diagnose the five citation formatting problems that fill the support forums — and the right order to fix them in.
next_path: /paths/power-user.html
next_text: Power user path
official_path: https://www.zotero.org/support/kb/citations_not_updating
official_label: "Official docs: KB — Citations not updating"
---
# Fix common citation formatting errors


## What you'll do

By the end you'll be able to diagnose the **five most common citation formatting problems** yourself — and know which ones education can fix versus which go to the [official forums](https://forums.zotero.org/).

## Why it matters

"Fix the citation" has a wrong order and a right order. Editing text in the document is the wrong order — it breaks the link between your document and Zotero. The right order: fix the *item*, refresh, and only then touch the text.

## The five, in the order to try them

| # | Symptom | Cause | Fix |
|---|---|---|---|
| 1 | Citation shows `ADDIN ZOTERO_ITEM CSL_CITATION…` | Word is displaying field codes, not a Zotero bug | Press **Alt+F9** (Windows) or **Option-Fn-F9** (Mac) to toggle field codes off. If they keep coming back: Word → Preferences/Options → Advanced/View → untick *"field codes instead of values"* |
| 2 | Citation shows "Anonymous" or a wrong year | The item's metadata is incomplete in Zotero | Fix the item in Zotero (add the author!), then click **Refresh** in the Zotero tab |
| 3 | A citation won't update after you edit the item | The document is out of sync | Click **Refresh** — it re-reads every item. If it still won't, someone edited the citation as text; select it, delete it, and re-insert from the Zotero tab |
| 4 | Wrong style (or your program rejects the punctuation) | Style set in Document Preferences isn't the required one | **Document Preferences →** pick the required style. Zotero re-formats every citation and the bibliography at once. For true style *bugs*, the [CSL styles repository](https://www.zotero.org/styles) and its editors are the route — flag it in the forums |
| 5 | Direct quote missing a page number, or "as Smith (2024) says…" rendered wrongly | Locator/omit-author options not used at insert time | Click the citation bubble: add the page in **Page**, or tick **Omit Author** for narrative citations |

## The recovery case: someone already typed over a citation

1. Select the mangled citation and delete it.
2. Re-insert it from the Zotero tab (**Add/Edit Citation**) — the underlying item is still in your library.
3. Click **Refresh**.

## Check it worked

Your document contains zero manually typed citations — every one opens the bubble dialog when clicked, and **Refresh** updates all of them.

## If it didn't work

- Field codes won't go away with Alt+F9 → [troubleshooting: Citations show as field codes or won't update](../../troubleshoot/index.html#flow-citations-field-codes)
- The *style itself* misbehaves in a way the settings can't reach → this is a genuine style/product issue: search the [Zotero forums](https://forums.zotero.org/) for the style name, and post with your document preferences. Don't hand-edit citations to compensate.
- Keep the [Fix the 5 most common citation errors job aid]({{ "/job-aids/citation-errors.html" | relative_url }}) next to you while revising.
