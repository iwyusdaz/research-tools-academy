---
title: Sync your library across devices
parent: Power user
nav_order: 1
layout: lesson
minutes: 7
milestone: M5
description: Turn on sync, understand data vs. file syncing, and choose the right storage for your library size — milestone M5.
next_path: /paths/power-user/annotate-and-extract.html
next_text: Annotate PDFs and extract notes
official_path: https://www.zotero.org/support/sync
official_label: "Official docs: Syncing"
---
# Sync your library across devices


## What you'll do

By the end you'll have **sync enabled and verified on a second device** — **milestone M5** — and know exactly what the free storage quota does and doesn't cover.

## Why it matters

Sync failures are the scariest problems in the support data ("are my files gone?"). Nearly all of them reduce to one of three causes: sync never actually uploaded the file, the quota is full, or devices use different storage settings. Ten minutes of setup prevents all three.

<figure class="svg-figure">
<img src="{{ "/assets/figures/sync-prefs.svg" | relative_url }}" alt="Schematic of the Zotero settings Sync pane. Top: Data Syncing with a username field and Sync automatically checked. Below: File Syncing with a choice between Zotero storage and a WebDAV server. The Sync button sits on the main toolbar." width="640" />
<figcaption>The Sync pane: data syncing (1), file syncing (2), Sync now (3). <span class="illustration-note">Illustration, not an actual screenshot.</span></figcaption>
</figure>

## Steps

1. **Create a free Zotero account** at [zotero.org](https://www.zotero.org/user/register) if you don't have one. It's also your forum login.
2. **Enter it in Zotero:** **Settings → Sync → Data Syncing**, enter your username and password, and leave **Sync automatically** ticked.
3. **Understand the split — this is the whole lesson:**
   - **Data syncing** (items, notes, tags, collections) is **free and unlimited**.
   - **File syncing** (the PDFs themselves) needs storage: **300 MB free** on Zotero storage, paid plans beyond that, or your own **WebDAV** server (personal libraries only — groups can't use WebDAV).
4. **Choose your file storage:** for a typical first-year library, the free 300 MB is enough; enable **File Syncing → Zotero**. Have hundreds of PDFs? Compare [storage plans](https://www.zotero.org/storage) or configure WebDAV and click **Verify Server**.
5. **Sync, then verify on device 2.** Click the circular **Sync** button in Zotero's toolbar, then open zotero.org in a browser and sign in — your items should be there. On your second device, install Zotero, sign in with the same account, and sync.
6. **Never put the Zotero data folder in Dropbox/Drive/iCloud.** The official docs are blunt: it is "extremely likely to corrupt your Zotero database". Sync *or* a linked-files workflow — not a cloud folder on the data directory.

## Check it worked

An item you save on device 1 appears on device 2 within a minute (or after clicking Sync), PDF included — and the **sync error icon** (next to the Sync button) never appears.

## If it didn't work

- Items sync but **PDFs don't** → [troubleshooting: PDFs or changes won't sync across devices](../../troubleshoot/index.html#flow-sync-failing)
- **Storage quota warnings** keep appearing → same flow, which covers quota and the reset-file-sync-history fix
- Zotero **repeatedly asks to resolve the same conflicts** → the flow covers the repeated-conflicts case; if it persists, the [official forums](https://forums.zotero.org/) with a Debug ID are the right route
