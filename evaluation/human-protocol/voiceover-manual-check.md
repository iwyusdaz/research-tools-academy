# Manual VoiceOver check protocol (macOS, ~20 minutes)

**Context:** automated VoiceOver control (Guidepup) does not function on the build machine's OS version, so no screen reader testing has been performed on this site. This protocol lets any macOS user produce that evidence. **Until someone runs it, the repo must not claim screen reader testing.**

## Setup

1. Any Mac with VoiceOver (built into macOS — no install).
2. Serve the site (`python3 -m http.server 8000` from `docs/`) or use the live URL.
3. Turn VoiceOver on: **Cmd+F5**. If the "VoiceOver Quick Start" opens, close it.
4. Recommended: Speech → Verbosity: medium; Navigation: linear is fine.
5. Have this protocol and the findings box at the bottom open in a text editor.

## A. Home page (5 min)

1. **VO+Right** from the top of the page to the end. Note: does the disclaimer appear before the content? Is the path table readable cell by cell (VO+Right / VO+Left within tables)?
2. **VO+U** (rotor): are landmarks sensible (banner, main, navigation)? Are all headings in order with no skipped levels?
3. Activate each link in the path table by keyboard (Tab) and check the link text makes sense alone (no bare "click here").

## B. One lesson with a figure (3 min)

1. Pick lesson 2 (save-first-sources). Navigate to the figure: does VoiceOver announce it as an image with the schematic description (not "image 1")?
2. Confirm the caption text ("Illustration, not an actual screenshot") is read.

## C. Troubleshooting tool (7 min)

1. Tab into the flow chooser; activate flow 1 with Enter.
2. **Does VoiceOver announce the new step heading?** (Focus moves to it — the announcement should be the heading text.)
3. Tab through options; activate one. At each new step: is the step number/status line ("step 2") perceivable?
4. Use Back, then Start over. Announcements sensible?
5. Complete a flow to the "solved" state — is the confirmation read?

## D. Skills check (5 min)

1. Answer scenario 1 entirely with keyboard (Tab to radio, arrows, Space, Enter on Check answer).
2. Is the feedback ("Correct." / "Not quite." + explanation) announced without moving focus manually?
3. Finish two scenarios; confirm "scenario 2 of 9" context is perceivable.

## Findings

```
Date: ______  macOS: ______  VoiceOver version: ______
A: ______
B: ______
C: ______
D: ______
Anything that would block a screen reader user: ______
```

Email or open a GitHub issue with the findings — anything blocking gets the same triage as the "outdated lesson" template.
