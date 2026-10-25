---
title: Generate and update your bibliography
parent: Writing with citations
nav_order: 3
layout: lesson
minutes: 6
milestone: M4
description: Insert a bibliography that builds itself from your citations and stays correct as you edit — milestone M4.
next_path: /paths/writing-with-citations/fix-formatting-errors.html
next_text: Fix common citation formatting errors
official_path: https://www.zotero.org/support/creating_bibliographies
official_label: "Official docs: Creating bibliographies"
---

## What you'll do

By the end you'll have a **bibliography at the end of your document** that updates automatically — **milestone M4**.

## Why it matters

The bibliography is the deliverable your program actually checks. Zotero builds it from the citations you inserted — so it can't forget a source you cited, and it re-formats itself when your style changes.

<figure class="svg-figure">
<img src="{{ "/assets/figures/bibliography-refresh.svg" | relative_url }}" alt="Schematic of a document ending with a Bibliography heading and three entries, with an arrow from the Refresh button in the Word Zotero tab to the bibliography, showing that refreshing updates every citation and the bibliography after you edit items in Zotero." width="640" />
<figcaption>Refresh re-reads Zotero (1) and the bibliography updates in place (2). <span class="illustration-note">Illustration, not an actual screenshot.</span></figcaption>
</figure>

## Steps

1. **Place the cursor** where the bibliography should start — usually the end of the document.
2. **Click Add/Edit Bibliography** in the Zotero tab. Zotero inserts a bibliography from every citation in the document, in the style set in Document Preferences.
3. **Edit an item? Do it in Zotero, then click Refresh.** The Refresh button updates all citations and the bibliography with the item's new metadata. This is the habit that prevents the most common late-stage crisis in the support data.
4. **Never edit the bibliography text directly.** Manual edits block automatic updates for that entry. If your program demands a tweak the style can't express, do it as the *last* step (next lesson).
5. **Need a standalone bibliography** (no document, e.g. for a reading list): select the items in Zotero, right-click → **Create Bibliography from Items…**, choose a style and **Copy to Clipboard**, then paste.

## Check it worked

- Every item you cited appears in the bibliography — and nothing you didn't cite does (with default document preferences).
- Delete one citation from the document, click **Refresh**, and the bibliography entry disappears. Undo the deletion, Refresh again: it's back.

## If it didn't work

- Bibliography **doesn't change** after you edited an item in Zotero → [troubleshooting: Citations show as field codes or won't update](../../troubleshoot/index.html#flow-citations-field-codes)
- You (or a co-author) already edited citations as text → [Fix common citation formatting errors](fix-formatting-errors.html) covers the recovery
- Bibliography missing entries you cited in a *different* document — bibliographies are per-document; use the standalone method in step 5
