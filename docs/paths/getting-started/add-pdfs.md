---
title: Add PDFs and retrieve metadata
parent: Getting started
nav_order: 3
layout: lesson
minutes: 5
milestone: M2
description: Turn a folder of stray PDFs into citable items with automatic metadata retrieval.
next_path: /paths/getting-started/collections-and-tags.html
next_text: Organize with collections and tags
official_path: https://www.zotero.org/support/adding_items_to_zotero
official_label: "Official docs: Adding items to Zotero"
---
# Add PDFs and retrieve metadata


## What you'll do

By the end you'll have turned at least one **stray PDF from your computer** into a proper Zotero item with title, authors and year.

## Why it matters

Papers arrive as loose PDFs — from email, a supervisor, or before you installed the connector. Until they have metadata, you can't cite them, and "cite a PDF by its filename" is exactly the habit this academy exists to prevent.

<figure class="svg-figure">
<img src="{{ "/assets/figures/add-pdfs.svg" | relative_url }}" alt="Three-step flow: a lone PDF file dragged into Zotero; right-clicking the PDF and choosing Create Parent Item; entering a DOI or ISBN so Zotero fills in the title, authors and journal automatically." width="640" />
<figcaption>Giving a stray PDF a parent item (1: drag in, 2: create parent, 3: add identifier). <span class="illustration-note">Illustration, not an actual screenshot.</span></figcaption>
</figure>

## Steps

1. **Drag the PDF into Zotero** — onto the middle column of the library. It becomes a standalone attachment (a plain file with no metadata).
2. **Right-click the PDF → Create Parent Item.** Zotero creates an empty item that the PDF is attached to.
3. **Enter an identifier.** Type the article's **DOI** (or the book's **ISBN**) into the field and press Enter. Zotero looks up the metadata and fills in title, authors, year and journal.
4. **No identifier handy?** Choose **Manual Entry** in the same dialog and fill in the essentials yourself, or drop the PDF onto the browser save button while viewing the article's page.
5. **Other quick methods** (from the official docs): the toolbar's **Add Item by Identifier** button (the magic-wand icon) creates items from pasted DOIs, ISBNs, PubMed IDs or arXiv IDs; **New Item** creates an empty item of any type for truly offline sources.

## Check it worked

The item in the middle column now shows a **title and author** (not a filename), and the PDF sits *under* the item as a child attachment. Clicking the item shows complete metadata in the right pane.

## If it didn't work

- **"Retrieving metadata…" fails** — the PDF may be a scan without embedded identifiers: create the parent item and enter metadata manually (step 4).
- Wrong metadata retrieved (rare, but happens with preprints) — edit the fields directly in the right pane; Zotero remembers your corrections.
- You'd rather import a whole folder or another reference manager's library → [official docs: importing from other tools](https://www.zotero.org/support/kb/importing_standardized_formats)
