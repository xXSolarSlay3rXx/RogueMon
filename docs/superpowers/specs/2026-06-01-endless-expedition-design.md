# Endless Expedition Design

## Scope

Expedition becomes the visible primary Endless Mode. The existing Battle Tower flow remains intact as an internal foundation for future variants. Normal Mode and the battle system are protected and must not change.

This design covers the Endless Expedition only. Shop and Game Corner redesigns are separate follow-up projects.

## Player Experience

The Expedition should feel like a complete standalone mode:

1. Open Endless Mode from the title screen.
2. Review persistent Expedition records and the selected difficulty stage.
3. Assemble a six-Pokemon roster from collected recruits.
4. Select a captain whose type grants a strategic team role.
5. Travel through route waves with battles and Endless-specific events.
6. Manage HP, fatigue, recruits, items, and boss preparation.
7. Defeat region bosses, receive rewards, and continue into harder waves.
8. Finish with a clear result screen that records score and best values.

## Architecture

The existing Expedition path is extended rather than replaced. It already provides roster selection, captains, fatigue, generated maps, route events, region bosses, and Endless-specific HUD panels.

The old Battle Tower path remains callable internally. The title screen points players to the Expedition hub. Shared battle execution remains unchanged.

## Visible Surfaces

### Title Screen Entry

- Replace the disabled Endless placeholder with an enabled Expedition entry.
- Remove player-facing rework language for Endless.
- Preserve the existing continue-run behavior for saved Expedition runs.

### Expedition Hub

The existing Expedition modal becomes the hub:

- Header with mode identity and concise explanation.
- Persistent record strip: best score, best wave, completed runs, boss victories.
- Stage selector with difficulty labels.
- Six visible squad slots.
- Captain summary with role effect.
- Roster grid with rarity, profile, fatigue, and selection state.
- Actions for Shop and Launch.

### Run HUD

The existing Endless map HUD is refined:

- Current stage, region, and wave.
- Boss progress.
- Captain and captain role.
- Highest team fatigue.
- Current run score.
- Compact route atmosphere with stronger Expedition styling.

### Events

Reuse the existing event framework:

- Camp
- Med Bay
- Scout
- Market
- Recruit
- Exchange
- Rare legendary route

Add clear presentation and controlled rewards. Events remain choices outside the battle engine.

### Results

Add an Expedition result summary:

- Score
- Furthest wave
- Bosses defeated
- Battles completed
- Coins earned
- Personal-best indicators

## Progression And Difficulty

Use a single Expedition progress model:

- `stageNumber`: selected starting difficulty.
- `regionNumber`: current region block.
- `mapIndexInRegion`: wave within the region block.
- `battleCount`: completed pressure points.
- `score`: persistent run score.
- `bossesDefeated`: bosses defeated in this run.

Difficulty scales through existing Endless level calculations and enemy archetypes. The implementation may add Expedition-specific helper functions, but must not change Normal Mode trainers or battle resolution.

Score should reward progress and strategic pressure:

- Completed battle nodes.
- Cleared waves.
- Defeated bosses.
- Rare route completion.
- Higher selected stage.

## Rewards

The first release adds controlled Expedition rewards:

- Coins after meaningful progress and on run completion.
- Boss reward feedback.
- Persistent records.

Shop economy changes, new booster categories, and Game Corner rewards belong to later projects.

## Visual Direction

- Professional retro Pokemon menu feeling.
- Pixel-art typography and existing sprite assets.
- Stronger section hierarchy and less empty space.
- Dark blue Expedition base palette with cyan route accents, warm gold record accents, and restrained rarity colors.
- Panel edges and small scanline or shimmer motion where useful.
- No overloading, no unrelated effects, and no dashboard-like filler.

## File Changes

- `index.html`: enable the visible Expedition entry and adjust Endless copy.
- `data.js`: persist Expedition records and reward totals in the existing meta-progress model.
- `endless.js`: add isolated Expedition progress, score, and difficulty helpers.
- `game.js`: wire the hub, run lifecycle, event rewards, region transitions, and result recording through Endless-only branches.
- `ui.js`: refine hub, HUD, transition, and result rendering using existing Endless entry points.
- `css/style.css`: add scoped Expedition styles and animation refinements.

Protected files:

- `battle.js`
- `map.js`

Protected behavior:

- Normal Mode flow
- Existing battle calculations and battle resolution
- Existing Battle Tower internals

## Verification

After each section:

1. Run JavaScript syntax checks for every modified JavaScript file.
2. Exercise the updated Expedition path manually.
3. Confirm the title-screen Normal Mode entry remains unchanged.
4. Run a Normal Mode smoke test without modifying battle behavior.
5. Inspect the rendered Expedition UI at desktop and narrow viewport sizes.

## Delivery Sequence

1. Add persistent Expedition records and isolated helper functions.
2. Upgrade title entry and Expedition hub.
3. Improve run HUD and region transitions.
4. Add scoring and controlled rewards.
5. Add Expedition result summary.
6. Perform Expedition and Normal Mode regression checks.

