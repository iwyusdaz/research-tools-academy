---
title: Group libraries for research teams
parent: Power user
nav_order: 3
layout: lesson
minutes: 7
milestone: E2
description: Create a group library for your lab or reading group and set member permissions that match how you actually work.
next_path: /troubleshoot/index.html
next_text: Troubleshooting tool
official_path: https://www.zotero.org/support/groups
official_label: "Official docs: Groups"
---

## What you'll do

By the end you'll have created a **group library**, invited one teammate, and know what members can and cannot do — **extended milestone E2**.

## Why it matters

The lab spreadsheet-of-PDFs breaks the moment two people save the same paper. A group library gives every member the same collections, with Zotero resolving who saved what — and it's the standard answer to "how does our reading group share sources?" in the support data.

<figure class="svg-figure">
<img src="{{ "/assets/figures/groups-pane.svg" | relative_url }}" alt="Schematic of Zotero's left pane showing My Library with its collections, and below it a group library named Lab Reading Group with a Weekly papers collection, which appears once data syncing is enabled." width="640" />
<figcaption>Your library (1) and the group library (2) sitting alongside it. <span class="illustration-note">Illustration, not an actual screenshot.</span></figcaption>
</figure>

## Steps

1. **Create the group:** on [zotero.org/groups](https://www.zotero.org/groups/), click **Create a New Group** (or in Zotero: **File → New Library → New Group…**).
2. **Choose the type deliberately:**
   - **Private** — invisible to non-members; the right choice for an unwritten thesis chapter or a lab's internal library. Admins can enable file sharing.
   - **Public, Closed Membership** — anyone can *read* the page, joining needs an invite. Good for published reading lists.
   - **Public, Open Membership** — anyone can join, and **open public groups cannot share files** (a documented limitation worth knowing before you promise PDFs to the team).
3. **Invite members:** in the group's **Members Settings**, click **Send More Invitations**. Roles: *member*, *administrator*, *owner*.
4. **Find it in Zotero:** with data syncing on (lesson 9), the group appears under My Library in the left pane. Create collections inside it like in any library.
5. **Copy items in:** drag items from My Library onto the group. **This creates a separate copy** — editing the group copy does not change your personal item, and vice versa. That's the "where did my edit go?" trap; now you know it's a copy, not a link.
6. **Agree on team norms** — one admin curates structure; members tag rather than reorganize; annotations from teammates are visible (and removable) per item.

## Check it worked

Your invited teammate accepts, syncs, and sees the group library in their Zotero — and an item you drop into the group's collection appears for them within a minute.

## If it didn't work

- Teammate can't see the group → confirm they accepted the invite and that *their* data syncing is on, with the same account
- **Files** don't appear for members → group file sharing must be enabled by an admin (and remember: open public groups can't); see [troubleshooting: sync flow](../../troubleshoot/index.html#flow-sync-failing)
- Group vanished from the web library but shows in the desktop app (a real case in the support data, row #22) → product-side issue: check your groups page on [zotero.org](https://www.zotero.org/groups/) and post in the [forums](https://forums.zotero.org/) if it persists
