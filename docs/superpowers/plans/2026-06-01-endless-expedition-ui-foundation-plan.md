# Endless Expedition UI Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Expedition the visible Endless entry and present it as a polished standalone mode with a focused hub, navigation, squad slots, records, and an improved in-run HUD without touching Normal Mode or battle resolution.

**Architecture:** Extend the existing Expedition-only branches and reuse the current modal, roster, and HUD rendering. Add a normalized records shape to the existing meta-progress model, then expose read-only UI helpers for the hub. Keep the old Battle Tower functions intact and avoid changes to shared battle and map files.

**Tech Stack:** Static HTML, vanilla JavaScript, CSS, Node.js syntax and VM-based smoke tests.

---

## Protected Boundaries

- Do not modify `battle.js`.
- Do not modify `map.js`.
- Do not change Normal Mode handlers or shared battle calculations.
- Do not remove `showEndlessStageSelect()`, `startEndlessRun()`, or the old Tower flow.
- All new styles must be scoped to Expedition classes or the Endless title entry.

## File Structure

- Modify: `data.js`
  - Normalize persistent Expedition record fields without changing existing meta currencies.
- Modify: `game.js`
  - Keep `refreshEndlessButton()` routed to `openEndlessExpeditionModal()`.
  - Provide the hub with unlocked stage information using existing story unlocks.
- Modify: `ui.js`
  - Upgrade `openEndlessExpeditionModal()` markup into a hub with navigation, records, six squad slots, captain panel, and roster.
  - Upgrade `renderEndlessRegionPanel()` with compact Expedition run status.
- Modify: `css/style.css`
  - Add scoped retro Expedition hub and HUD styling.
- Modify: `index.html`
  - Replace the player-facing Coming Soon placeholder with an Expedition identity while preserving locked behavior before unlock.
- Create: `scripts/test-endless-expedition-ui.js`
  - Assert protected files remain untouched by the phase and verify the visible UI contract through source-level smoke checks.

### Task 1: Add UI Contract Smoke Test

**Files:**
- Create: `scripts/test-endless-expedition-ui.js`

- [ ] **Step 1: Write the failing source contract test**

Create a Node script that reads `index.html`, `ui.js`, `game.js`, and `data.js`, then asserts:

```js
assert.match(indexHtml, /Expedition Mode/);
assert.doesNotMatch(indexHtml, /Coming Soon/);
assert.match(uiJs, /expedition-hub-nav/);
assert.match(uiJs, /expedition-squad-slot/);
assert.match(uiJs, /expedition-record-grid/);
assert.match(uiJs, /expedition-run-score/);
assert.match(dataJs, /expeditionRecords/);
assert.match(gameJs, /openEndlessExpeditionModal/);
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```powershell
node .\scripts\test-endless-expedition-ui.js
```

Expected: fail because the new Expedition hub contract is not implemented yet.

### Task 2: Add Persistent Expedition Record Shape

**Files:**
- Modify: `data.js`
- Test: `scripts/test-endless-expedition-ui.js`

- [ ] **Step 1: Add a normalized read-only record shape**

Extend `normalizeMetaProgress()` with:

```js
expeditionRecords: {
  bestScore: Math.max(0, Math.floor(Number(meta.expeditionRecords?.bestScore) || 0)),
  bestWave: Math.max(0, Math.floor(Number(meta.expeditionRecords?.bestWave) || 0)),
  completedRuns: Math.max(0, Math.floor(Number(meta.expeditionRecords?.completedRuns) || 0)),
  bossVictories: Math.max(0, Math.floor(Number(meta.expeditionRecords?.bossVictories) || 0)),
},
```

Add:

```js
function getExpeditionRecords() {
  return getMetaProgress().expeditionRecords;
}
```

- [ ] **Step 2: Run the contract test**

Run:

```powershell
node .\scripts\test-endless-expedition-ui.js
```

Expected: still fail on missing hub markup, but pass the `expeditionRecords` assertion.

### Task 3: Enable The Visible Expedition Entry

**Files:**
- Modify: `index.html`
- Modify: `game.js`
- Test: `scripts/test-endless-expedition-ui.js`

- [ ] **Step 1: Update player-facing title entry**

Use `Expedition Mode` as the visible Endless label. Keep the existing lock wrapper so the game can require a completed Normal run. Remove the player-facing `Coming Soon` language and use a locked Expedition note instead.

- [ ] **Step 2: Preserve unlocked navigation**

Keep the unlocked click handler:

```js
endlessBtn.onclick = () => openEndlessExpeditionModal();
```

For locked state, set a clear prerequisite message instead of rework language.

- [ ] **Step 3: Run syntax and contract checks**

Run:

```powershell
node --check .\game.js
node .\scripts\test-endless-expedition-ui.js
```

Expected: syntax passes; contract still fails only on hub markup.

### Task 4: Upgrade Expedition Hub Markup

**Files:**
- Modify: `game.js`
- Test: `scripts/test-endless-expedition-ui.js`

- [ ] **Step 1: Add hub navigation and records**

Inside `openEndlessExpeditionModal()`, retain current selection state and event listeners. Render:

```html
<div class="expedition-hub-nav">...</div>
<div class="expedition-record-grid">...</div>
```

Use `getExpeditionRecords()` with a fallback record object.

- [ ] **Step 2: Add six squad slots**

Render exactly six `.expedition-squad-slot` elements above the roster. Selected entries show sprite, name, and captain marker. Empty slots invite selection.

- [ ] **Step 3: Improve captain panel**

Keep the existing captain-role calculation and render a dedicated captain panel with the selected captain and role label. Do not alter captain effects.

- [ ] **Step 4: Keep navigation functional**

Preserve:

```js
modal.querySelector('#btn-expedition-open-shop')?.addEventListener('click', () => openShopModal());
modal.querySelector('#btn-expedition-launch')?.addEventListener('click', async () => { ... });
```

- [ ] **Step 5: Run checks**

Run:

```powershell
node --check .\game.js
node .\scripts\test-endless-expedition-ui.js
```

Expected: fail only on missing run-HUD score markup.

### Task 5: Upgrade Expedition Run HUD

**Files:**
- Modify: `ui.js`
- Test: `scripts/test-endless-expedition-ui.js`

- [ ] **Step 1: Extend Expedition summary**

Inside `renderEndlessRegionPanel()`, preserve the old non-Expedition branch. In the Expedition-only summary render:

```html
<div class="endless-expedition-summary-row expedition-run-score">
  <span class="endless-expedition-summary-label">RUN SCORE</span>
  <strong>...</strong>
</div>
```

Also render wave position and captain role from existing state.

- [ ] **Step 2: Run checks**

Run:

```powershell
node --check .\ui.js
node .\scripts\test-endless-expedition-ui.js
```

Expected: pass.

### Task 6: Style The Expedition Foundation

**Files:**
- Modify: `css/style.css`
- Test: `scripts/test-endless-expedition-ui.js`

- [ ] **Step 1: Add scoped visual system**

Add scoped styles for:

```css
.expedition-modal-box
.expedition-hub-nav
.expedition-record-grid
.expedition-record-card
.expedition-squad-grid
.expedition-squad-slot
.expedition-captain-panel
.expedition-run-score
```

Use the existing dark blue base, cyan route accents, gold records, pixel typography, compact spacing, hover lift, subtle scanline shimmer, and responsive breakpoints.

- [ ] **Step 2: Run syntax checks**

Run:

```powershell
node --check .\data.js
node --check .\game.js
node --check .\ui.js
node .\scripts\test-endless-expedition-ui.js
```

Expected: all pass.

### Task 7: Verify Boundaries And Rendered UI

**Files:**
- Verify only

- [ ] **Step 1: Confirm protected files are unchanged**

Run:

```powershell
git diff --name-only
```

Expected changed files:

```text
css/style.css
data.js
game.js
index.html
scripts/test-endless-expedition-ui.js
ui.js
```

- [ ] **Step 2: Run local static server**

Run:

```powershell
python -m http.server 8000
```

- [ ] **Step 3: Verify rendered flow in Browser**

Flow:

```text
title screen -> Expedition Mode -> hub opens -> stage selection -> roster selection -> captain selection -> launch remains disabled until six recruits are selected
```

Also verify:

```text
title screen -> New Game
```

The Normal Mode entry must remain visible and responsive.

- [ ] **Step 4: Check desktop and narrow viewports**

Inspect for clipping, empty whitespace, unreadable text, broken scroll, missing assets, console errors, and accidental Normal Mode changes.

- [ ] **Step 5: Review diff**

Run:

```powershell
git diff --stat
git diff -- index.html data.js game.js ui.js css/style.css scripts/test-endless-expedition-ui.js
```

Expected: only scoped Expedition UI foundation changes.

