---
title: Install the word processor plugin
parent: Writing with citations
nav_order: 1
layout: lesson
minutes: 5
milestone: M3
description: Get the Zotero tab into Word (or LibreOffice, or Google Docs) so you can cite in your document.
next_path: /paths/writing-with-citations/insert-citations.html
next_text: Insert citations and choose a style
official_path: https://www.zotero.org/support/word_processor_plugin_installation
official_label: "Official docs: Word processor plugin installation"
---
# Install the word processor plugin


## What you'll do

By the end you'll see the **Zotero tab in your word processor's ribbon** — the setup step for milestone M3, your first citation.

## Why it matters

Citing without the plugin means typing references by hand and re-formatting them at 2 a.m. before a deadline. The plugin is bundled with Zotero and installs automatically — but on managed work laptops it often needs a nudge, which is exactly what this lesson is for.

<figure class="svg-figure">
<img src="{{ "/assets/figures/word-ribbon.svg" | relative_url }}" alt="Schematic of the Word ribbon with the Zotero tab selected, showing five buttons: Add/Edit Citation, Add/Edit Bibliography, Document Preferences, Refresh, and Unlink Citations." width="640" />
<figcaption>The Zotero tab in the Word ribbon (1) and its most-used button (2). <span class="illustration-note">Illustration, not an actual screenshot.</span></figcaption>
</figure>

## Steps

1. **Open Zotero first.** The plugin needs the desktop app running to communicate with your document.
2. **Open Word** (or LibreOffice) and look for the **Zotero** tab in the ribbon. On Google Docs, the Zotero menu loads through the browser connector instead — no separate install.
3. **Tab missing? Reinstall the plugin from inside Zotero:** in Zotero's **Settings → Cite → Word Processors**, click **Install Microsoft Word Add-in** (the exact button name matches your word processor), then fully quit and reopen Word.
4. **Still missing on a Mac?** In Word, check **Tools → Templates and Add-ins…** and confirm *Zotero.dotm* is listed and ticked under **Global Templates and Add-ins**.
5. **Work laptop that blocks add-ins?** That's the macOS *permissions* case most common in the support data: Zotero needs permission to control Word. See the flow below — it walks through granting it.

## Check it worked

The **Zotero tab** (Word/LibreOffice) or **Zotero menu** (Google Docs) is visible, and clicking **Add/Edit Citation** opens a search dialog rather than an error.

## If it didn't work

- Tab still missing after reinstall → [troubleshooting: The Zotero tab is missing in Microsoft Word](../../troubleshoot/index.html#flow-word-tab-missing)
- Word says *"Word could not communicate with Zotero"* → confirm the Zotero **app** is open, then use the same flow
- On macOS, Zotero can't control Word → [troubleshooting flow 3](../../troubleshoot/index.html#flow-word-tab-missing), which covers the permission grant step by step
