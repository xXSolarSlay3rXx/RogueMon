// game.js - Central game state and entry point

function getText(key, args = {}) {
  const text = i18n[currentLanguage]?.[key] || i18n['en'][key] || `[${key}]`;
  let result = text;
  for (const [k, v] of Object.entries(args)) {
    result = result.replace(`{${k}}`, v);
  }
  return result;
}

function setLanguage(lang) {
  currentLanguage = 'en';
  localStorage.setItem('poke_language', 'en');
  if (typeof syncStoredPokemonLocalizations === 'function') {
    syncStoredPokemonLocalizations('en');
  }
  updateUILanguage();
}

function updateUILanguage() {
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = getText(key);
  });
  
  document.querySelector('.lang-selector')?.remove();
  document.documentElement.lang = 'en';

  if (typeof renderTeamBar === 'function' && state?.team) {
    renderTeamBar(state.team);
  }
  if (document.getElementById('map-screen')?.classList.contains('active') && typeof showMapScreen === 'function') {
    showMapScreen();
  } else if (document.getElementById('starter-screen')?.classList.contains('active') && typeof showStarterSelect === 'function') {
    showStarterSelect();
  }
  refreshTitleScreenPokedexButton();
}

function refreshTitleScreenPokedexButton() {
  const titleDexBtn = document.querySelector('#title-screen .button-row .btn-secondary');
  if (!titleDexBtn) return;
  titleDexBtn.classList.add('btn-pokedex-launch');
  titleDexBtn.innerHTML = `
    <img src="ui/pokedex.png" alt="Pokedex icon" class="btn-pokedex-launch-icon">
    <span>Pokedex</span>
  `;
}

let currentMobileMapPanel = 'team';

function setMobileMapPanel(panel = 'team') {
  currentMobileMapPanel = panel;
  const mapScreen = document.getElementById('map-screen');
  if (!mapScreen) return;

  mapScreen.classList.remove('mobile-panel-team', 'mobile-panel-items', 'mobile-panel-guide');
  mapScreen.classList.add(`mobile-panel-${panel}`);

  document.querySelectorAll('.mobile-map-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mobilePanel === panel);
  });
}

function syncMobileMapPanel() {
  const mapScreen = document.getElementById('map-screen');
  if (!mapScreen) return;

  const isMobile = window.innerWidth <= 768;
  const tabs = mapScreen.querySelector('.mobile-map-tabs');
  if (tabs) {
    tabs.style.display = isMobile ? 'grid' : 'none';
  }
  if (!isMobile) return;

  const guideBtn = mapScreen.querySelector('.mobile-map-tab[data-mobile-panel="guide"]');
  const hasGuide = !!state?.isEndlessMode || !!getSettings?.().easyMode;
  if (guideBtn) guideBtn.style.display = hasGuide ? '' : 'none';
  if (currentMobileMapPanel === 'guide' && !hasGuide) {
    currentMobileMapPanel = 'team';
  }
  setMobileMapPanel(currentMobileMapPanel || 'team');
}

// Seeded PRNG (mulberry32) ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â use rng() instead of Math.random() for all game logic
let _rngSeed = 0;
function rng() {
  _rngSeed = (_rngSeed + 0x6D2B79F5) | 0;
  let t = Math.imul(_rngSeed ^ (_rngSeed >>> 15), 1 | _rngSeed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
function seedRng(seed) { _rngSeed = seed >>> 0; }
function getRngSeed() { return _rngSeed >>> 0; }

let state = {
  currentMap: 0,
  currentNode: null,
  team: [],
  items: [],
  badges: 0,
  map: null,
  eliteIndex: 0,
  storyRegionId: 1,
  trainer: 'boy',
  starterSpeciesId: null,
  maxTeamSize: 1,
  nuzlockeMode: false,
};

function getCurrentStoryRegion() {
  return getStoryRegionConfig(state.storyRegionId || 1);
}

function getCurrentGymLeaders() {
  return getCurrentStoryRegion().gyms || GYM_LEADERS;
}

function getCurrentEliteFour() {
  return getCurrentStoryRegion().eliteFour || ELITE_4;
}

function getCurrentStoryEncounterBounds() {
  const region = getCurrentStoryRegion();
  return {
    minGenId: region.encounterMinGenId || 1,
    maxGenId: region.encounterMaxGenId || 151,
  };
}

function getStoryModeMaxGenId() {
  return getCurrentStoryEncounterBounds().maxGenId;
}

function getStoryModeMinGenId() {
  return getCurrentStoryEncounterBounds().minGenId;
}

function getTrainerClassDisplayName(key) {
  const labels = {
    de: {
      bugCatcher: 'Kaefersammler',
      hiker: 'Wanderer',
      fisher: 'Angler',
      Scientist: 'Forscher',
      teamRocket: 'Rocket-Ruepel',
      policeman: 'Polizist',
      fireSpitter: 'Feuertrainer',
      aceTrainer: 'Ass-Trainer',
      oldGuy: 'Alter Mann',
    },
    en: {
      bugCatcher: 'Bug Catcher',
      hiker: 'Hiker',
      fisher: 'Fisherman',
      Scientist: 'Scientist',
      teamRocket: 'Rocket Grunt',
      policeman: 'Officer',
      fireSpitter: 'Fire Trainer',
      aceTrainer: 'Ace Trainer',
      oldGuy: 'Old Man',
    },
  };
  return labels[currentLanguage]?.[key] || labels.en[key] || key;
}

function getTeamTypeCoverage(team = state?.team || []) {
  return new Set(team.flatMap(p => p.types || []));
}

function choiceAddsNewCoverage(species, coveredTypes) {
  return (species?.types || []).some(type => !coveredTypes.has(type));
}

const EXPEDITION_ROLE_RULES = [
  {
    id: 'vanguard',
    labelKey: 'endless_expedition_role_vanguard',
    types: ['Fire', 'Fighting', 'Electric', 'Dragon', 'Dark'],
    apply(team) {
      for (const pokemon of team) {
        pokemon.tempBattleStages = pokemon.tempBattleStages || {};
        pokemon.tempBattleStages.atk = (pokemon.tempBattleStages.atk || 0) + 1;
        pokemon.tempBattleStages.special = (pokemon.tempBattleStages.special || 0) + 1;
      }
    },
  },
  {
    id: 'bulwark',
    labelKey: 'endless_expedition_role_bulwark',
    types: ['Rock', 'Ground', 'Steel', 'Ice'],
    apply(team) {
      for (const pokemon of team) {
        pokemon.tempBattleStages = pokemon.tempBattleStages || {};
        pokemon.tempBattleStages.def = (pokemon.tempBattleStages.def || 0) + 1;
        pokemon.tempBattleStages.spdef = (pokemon.tempBattleStages.spdef || 0) + 1;
      }
    },
  },
  {
    id: 'sustain',
    labelKey: 'endless_expedition_role_sustain',
    types: ['Water', 'Grass', 'Fairy', 'Normal'],
    apply(team) {
      for (const pokemon of team) {
        const heal = Math.max(1, Math.floor((pokemon.maxHp || 1) * 0.12));
        pokemon.currentHp = Math.min(pokemon.maxHp, (pokemon.currentHp || 0) + heal);
      }
    },
  },
  {
    id: 'tempo',
    labelKey: 'endless_expedition_role_tempo',
    types: ['Flying', 'Psychic', 'Ghost', 'Poison', 'Bug'],
    apply(team) {
      for (const pokemon of team) {
        pokemon.tempBattleStages = pokemon.tempBattleStages || {};
        pokemon.tempBattleStages.speed = (pokemon.tempBattleStages.speed || 0) + 1;
      }
    },
  },
];

function getHighestUnlockedStoryRegionId() {
  return Math.max(1, ...getUnlockedStoryRegionIds());
}

function hasSavedEndlessRun() {
  try {
    return !!localStorage.getItem('poke_endless_state') && !!localStorage.getItem('poke_current_run');
  } catch {
    return false;
  }
}

function getSavedEndlessRunSummary() {
  try {
    const endlessRaw = localStorage.getItem('poke_endless_state');
    if (!endlessRaw) return null;
    const saved = JSON.parse(endlessRaw);
    if (!saved?.active) return null;
    if (saved.mode === 'expedition') {
      return `Continue Expedition - ${getStageName(saved.stageNumber || 1)} R${saved.regionNumber || 1}`;
    }
    return `Continue Endless - ${getStageName(saved.stageNumber || 1)} R${saved.regionNumber || 1}`;
  } catch {
    return null;
  }
}

function getExpeditionCaptainRole(types = []) {
  const matched = EXPEDITION_ROLE_RULES.find(rule => (types || []).some(type => rule.types.includes(type)));
  const fallback = EXPEDITION_ROLE_RULES[0];
  const rule = matched || fallback;
  return {
    id: rule.id,
    label: getText(rule.labelKey),
    apply: rule.apply,
  };
}

function getExpeditionFatigue(entryId) {
  return Math.max(0, Number(endlessState?.fatigue?.[entryId]) || 0);
}

function getExpeditionFatiguePenalty(entryId) {
  const fatigue = getExpeditionFatigue(entryId);
  if (fatigue >= 4) return 2;
  if (fatigue >= 2) return 1;
  return 0;
}

function spreadExpeditionStatBuffs(species, bonusPoints) {
  const points = Math.max(0, Math.floor(Number(bonusPoints) || 0));
  const spread = { hp: 0, atk: 0, def: 0, speed: 0, spdef: 0, special: 0 };
  if (!species?.baseStats || points <= 0) return spread;

  const ranked = [
    { key: 'hp', value: species.baseStats.hp || 0 },
    { key: 'atk', value: Math.max(species.baseStats.atk || 0, species.baseStats.special || 0) },
    { key: 'def', value: species.baseStats.def || 0 },
    { key: 'speed', value: species.baseStats.speed || 0 },
    { key: 'spdef', value: species.baseStats.spdef || 0 },
  ].sort((a, b) => b.value - a.value);

  const targets = ranked.slice(0, 3);
  for (let i = 0; i < points; i++) {
    const target = targets[i % targets.length];
    spread[target.key] += 1;
    if (target.key === 'atk') spread.special += 1;
  }
  return spread;
}

async function createExpeditionPokemonFromEntry(entry, stageNum = 1) {
  const species = await fetchPokemonById(entry.speciesId);
  if (!species) return null;
  const baseLevel = Math.max(5, 8 + stageNum + (entry.levelBonus || 0));
  const pokemon = createInstance(species, baseLevel, false, 2);
  pokemon.endlessEntryId = entry.entryId;
  pokemon.endlessBaseLevel = baseLevel;
  pokemon.endlessRarity = entry.rarity;
  pokemon.endlessSourceName = entry.name;
  pokemon.statBuffs = spreadExpeditionStatBuffs(species, entry.statBonus || 0);
  const hpBuff = pokemon.statBuffs?.hp ?? 0;
  if (hpBuff > 0) {
    pokemon.maxHp = Math.floor(calcHp(pokemon.baseStats.hp, pokemon.level) * (1 + 0.1 * hpBuff));
    pokemon.currentHp = pokemon.maxHp;
  }
  return pokemon;
}

function applyExpeditionRosterState() {
  if (!state?.isEndlessMode || endlessState?.mode !== 'expedition' || !Array.isArray(state.team)) return;

  const captainId = endlessState.captainEntryId;
  const role = getExpeditionCaptainRole((state.team.find(pokemon => pokemon.endlessEntryId === captainId)?.types) || []);
  endlessState.captainRole = role.id;
  for (const pokemon of state.team) {
    const baseLevel = Math.max(5, pokemon.endlessBaseLevel || pokemon.level || 5);
    let fatiguePenalty = getExpeditionFatiguePenalty(pokemon.endlessEntryId);
    if (role.id === 'tempo') fatiguePenalty = Math.max(0, fatiguePenalty - 1);
    const captainBonus = pokemon.endlessEntryId === captainId ? 1 : 0;
    const roleLevelBonus = role.id === 'vanguard' ? 1 : 0;
    const oldMaxHp = Math.max(1, pokemon.maxHp || 1);
    const oldCurrent = Math.max(0, pokemon.currentHp || 0);
    const hpRatio = oldCurrent / oldMaxHp;
    const floorLevel = Math.max(5, baseLevel + captainBonus + roleLevelBonus);
    const fatigueHpMult = 1 - (fatiguePenalty * 0.08);

    // Fatigue should pressure the run without deleting earned levels between maps.
    pokemon.level = Math.max(floorLevel, pokemon.level || 5);
    pokemon.endlessFatiguePenalty = fatiguePenalty;

    const hpBuff = (pokemon.statBuffs?.hp ?? 0) + (role.id === 'bulwark' ? 1 : 0);
    pokemon.maxHp = Math.max(1, Math.floor(calcHp(pokemon.baseStats.hp, pokemon.level) * (1 + 0.1 * hpBuff) * fatigueHpMult));
    pokemon.currentHp = Math.max(1, Math.min(pokemon.maxHp, Math.floor(pokemon.maxHp * Math.max(0.35, hpRatio || 1))));
  }
}

function applyExpeditionPostMapWear() {
  if (!state?.isEndlessMode || endlessState?.mode !== 'expedition' || !Array.isArray(state.team)) return;
  endlessState.battleCount = (endlessState.battleCount || 0) + 1;
  endlessState.fatigue = endlessState.fatigue || {};
  for (const pokemon of state.team) {
    if (!pokemon?.endlessEntryId) continue;
    const current = getExpeditionFatigue(pokemon.endlessEntryId);
    endlessState.fatigue[pokemon.endlessEntryId] = Math.min(5, current + 1);
  }

  const captain = state.team.find(pokemon => pokemon.endlessEntryId === endlessState.captainEntryId);
  const role = getExpeditionCaptainRole(captain?.types || []);
  endlessState.captainRole = role.id;
  if (role.id === 'sustain') {
    role.apply(state.team);
  }
}

function getExpeditionReadyEntries() {
  return getEndlessCollection()
    .slice()
    .sort((a, b) => {
      const rarityRank = { mythic: 5, epic: 4, rare: 3, uncommon: 2, common: 1 };
      const rarityDiff = (rarityRank[b.rarity] || 0) - (rarityRank[a.rarity] || 0);
      if (rarityDiff !== 0) return rarityDiff;
      return (b.levelBonus + b.statBonus) - (a.levelBonus + a.statBonus);
    });
}

function openEndlessExpeditionModal() {
  const existing = document.getElementById('expedition-modal');
  if (existing) {
    existing.remove();
    return;
  }

  const modal = document.createElement('div');
  modal.id = 'expedition-modal';
  modal.className = 'shop-modal-overlay';
  const close = () => modal.remove();

  let selectedIds = [];
  let captainId = null;
  let stageNum = Math.min(getHighestUnlockedStoryRegionId(), 6);

  const render = () => {
    const collection = getExpeditionReadyEntries();
    const selectedEntries = collection.filter(entry => selectedIds.includes(entry.entryId));
    const selectedCaptain = selectedEntries.find(entry => entry.entryId === captainId) || null;
    const captainRole = selectedCaptain ? getExpeditionCaptainRole(selectedCaptain.types || []) : null;
    const stageButtons = Array.from({ length: Math.min(getHighestUnlockedStoryRegionId(), 6) }, (_, i) => i + 1)
      .map(num => `<button class="expedition-stage-btn ${stageNum === num ? 'is-active' : ''}" data-stage-num="${num}">${getText('endless_expedition_stage')} ${num}</button>`)
      .join('');

    modal.innerHTML = `
      <div class="shop-modal-box roster-modal-box expedition-modal-box">
        <div class="shop-modal-header">
          <div>
            <h2>${getText('endless_expedition_title')}</h2>
            <p>${getText('endless_expedition_subtitle')}</p>
          </div>
          <button class="ach-modal-close" id="expedition-modal-close">&times;</button>
        </div>
        <div class="shop-modal-body">
          <div class="shop-balance-row expedition-balance-row">
            <div class="shop-balance-chip"><span class="shop-balance-label">${getText('endless_expedition_stage')}</span><strong>${getStageName(stageNum)}</strong></div>
            <div class="shop-balance-chip"><span class="shop-balance-label">${getText('endless_expedition_selected')}</span><strong>${selectedEntries.length}/6</strong></div>
            <div class="shop-balance-chip"><span class="shop-balance-label">${getText('endless_expedition_captain')}</span><strong>${selectedCaptain ? selectedCaptain.name : 'None'}</strong></div>
          </div>

          <div class="expedition-stage-row">${stageButtons}</div>

          <div class="shop-status-copy expedition-status-copy">
            ${collection.length < 6 ? getText('endless_expedition_need_roster') : getText('endless_expedition_roster_tip')}
          </div>

          ${selectedCaptain && captainRole ? `
            <div class="coinflip-result double expedition-captain-banner">
              <strong>${selectedCaptain.name}</strong>
              <span>${captainRole.label}</span>
            </div>
          ` : `<div class="collection-empty expedition-captain-empty">${getText('endless_expedition_pick_captain')}</div>`}

          <div class="roster-grid expedition-grid">
            ${collection.length ? collection.map(entry => {
              const isSelected = selectedIds.includes(entry.entryId);
              const isCaptain = captainId === entry.entryId;
              const fatigue = getExpeditionFatigue(entry.entryId);
              return `
                <div class="collection-card roster-card rarity-${entry.rarity || 'common'} expedition-pick-card ${isSelected ? 'is-selected' : ''} ${isCaptain ? 'is-captain' : ''}" data-entry-id="${entry.entryId}">
                  <div class="collection-card-accent" style="--collection-accent:${entry.rarityAccent || '#7dd7ff'}"></div>
                  <img class="collection-card-sprite" src="${entry.spriteUrl}" alt="${entry.name}">
                  <div class="collection-card-name">${entry.name}</div>
                  <div class="collection-card-types">
                    ${(entry.types || []).map(type => `<span class="type-badge type-${String(type).toLowerCase()}">${type}</span>`).join('')}
                  </div>
                  <div class="collection-card-meta">
                    <span>+${entry.levelBonus || 0} Lv</span>
                    <span>+${entry.statBonus || 0} Stats</span>
                  </div>
                  <div class="collection-card-meta expedition-pick-meta">
                    <span>${getText('endless_expedition_fatigue')}: ${fatigue}</span>
                    <span>${entry.rarityLabel || entry.rarity}</span>
                  </div>
                  <div class="roster-card-footer expedition-pick-footer">
                    <button class="btn-secondary expedition-select-btn" data-entry-id="${entry.entryId}">${isSelected ? 'Remove' : 'Select'}</button>
                    <button class="btn-secondary expedition-captain-btn" data-entry-id="${entry.entryId}" ${!isSelected ? 'disabled' : ''}>${isCaptain ? 'Captain' : 'Make Captain'}</button>
                  </div>
                </div>
              `;
            }).join('') : `<div class="collection-empty">${getText('endless_expedition_need_roster')}</div>`}
          </div>

          <div class="shop-toolbar expedition-toolbar">
            <button class="btn-secondary shop-toolbar-btn" id="btn-expedition-open-shop">${getText('endless_expedition_open_shop')}</button>
            <button class="btn-primary shop-toolbar-btn" id="btn-expedition-launch" ${selectedEntries.length !== 6 || !selectedCaptain ? 'disabled' : ''}>${getText('endless_expedition_launch')}</button>
          </div>
        </div>
      </div>
    `;

    modal.querySelector('#expedition-modal-close')?.addEventListener('click', close);
    modal.querySelector('#btn-expedition-open-shop')?.addEventListener('click', () => openShopModal());
    modal.querySelector('#btn-expedition-launch')?.addEventListener('click', async () => {
      const entries = getExpeditionReadyEntries().filter(entry => selectedIds.includes(entry.entryId));
      if (entries.length !== 6 || !captainId) return;
      close();
      await startEndlessExpedition(stageNum, entries, captainId);
    });
    modal.querySelectorAll('.expedition-stage-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        stageNum = Number(btn.dataset.stageNum) || 1;
        render();
      });
    });
    modal.querySelectorAll('.expedition-select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const entryId = btn.dataset.entryId;
        const isSelected = selectedIds.includes(entryId);
        if (isSelected) {
          selectedIds = selectedIds.filter(id => id !== entryId);
          if (captainId === entryId) captainId = selectedIds[0] || null;
        } else if (selectedIds.length < 6) {
          selectedIds = [...selectedIds, entryId];
          if (!captainId) captainId = entryId;
        }
        render();
      });
    });
    modal.querySelectorAll('.expedition-captain-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const entryId = btn.dataset.entryId;
        if (!selectedIds.includes(entryId)) return;
        captainId = entryId;
        render();
      });
    });
  };

  render();
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.body.appendChild(modal);
}

async function startEndlessExpedition(stageNum, selectedEntries, captainEntryId) {
  const seed = (Date.now() ^ (Math.random() * 0x100000000 | 0)) >>> 0;
  seedRng(seed);
  const savedTrainer = localStorage.getItem('poke_trainer') || 'boy';
  const builtTeam = [];
  for (const entry of selectedEntries) {
    const pokemon = await createExpeditionPokemonFromEntry(entry, stageNum);
    if (pokemon) builtTeam.push(pokemon);
  }
  if (builtTeam.length !== 6) {
    alert('The expedition could not be prepared from your roster.');
    return;
  }

  const captain = builtTeam.find(pokemon => pokemon.endlessEntryId === captainEntryId) || builtTeam[0];
  const captainRole = getExpeditionCaptainRole(captain.types || []);

  state = {
    currentMap: 0, currentNode: null, team: builtTeam, items: [], badges: 0,
    map: null, eliteIndex: 0, trainer: savedTrainer, starterSpeciesId: captain.speciesId,
    maxTeamSize: 6, nuzlockeMode: false, usedPokecenter: false, pickedUpItem: false,
    runSeed: seed, isEndlessMode: true,
  };
  endlessState = {
    active: true,
    mode: 'expedition',
    stageNumber: stageNum,
    regionNumber: 1,
    mapIndexInRegion: 0,
    currentRegion: null,
    traitTiers: {},
    captainEntryId: captain.endlessEntryId,
    captainRole: captainRole.id,
    fatigue: Object.fromEntries(selectedEntries.map(entry => [entry.entryId, getExpeditionFatigue(entry.entryId)])),
    battleCount: 0,
  };
  saveEndlessState();
  saveRun();
  startEndlessRegion();
}

function getUnlockedStoryRegionIds() {
  try {
    const raw = JSON.parse(localStorage.getItem('poke_story_regions_unlocked') || '[1]');
    const unlocked = new Set(Array.isArray(raw) ? raw : [1]);
    unlocked.add(1);
    return [...unlocked].sort((a, b) => a - b);
  } catch {
    return [1];
  }
}

function unlockStoryRegion(regionId) {
  const unlocked = new Set(getUnlockedStoryRegionIds());
  unlocked.add(regionId);
  localStorage.setItem('poke_story_regions_unlocked', JSON.stringify([...unlocked].sort((a, b) => a - b)));
}

function isStoryRegionUnlocked(regionId) {
  return getUnlockedStoryRegionIds().includes(regionId);
}

function getActiveScreenId() {
  return document.querySelector('.screen.active')?.id || 'title-screen';
}

let runPersistenceDisabled = false;
const NON_RESUMABLE_SCREENS = new Set([
  'title-screen',
  'region-screen',
  'trainer-screen',
  'starter-screen',
  'gameover-screen',
  'win-screen',
]);


function hasRenderableStoryMap(map) {
  if (!map || typeof map !== 'object') return false;
  if (!map.nodes || !map.edges || !map.layers) return false;
  if (!Array.isArray(map.edges) || !Array.isArray(map.layers)) return false;
  const nodeIds = Object.keys(map.nodes || {});
  if (!nodeIds.length || !map.edges.length || !map.layers.length) return false;
  const layeredIds = map.layers.flatMap(layer => Array.isArray(layer)
    ? layer.map(node => typeof node === 'string' ? node : node?.id).filter(Boolean)
    : []);
  if (!layeredIds.length) return false;
  if (!layeredIds.some(id => map.nodes[id])) return false;
  const hasProgressAnchor = Object.values(map.nodes).some(node => node && (node.visited || node.accessible));
  if (!hasProgressAnchor) return false;
  return true;
}

function normalizeStoryMapLayers(map) {
  if (!map || typeof map !== 'object' || !map.nodes || !Array.isArray(map.layers)) return false;
  let changed = false;
  map.layers = map.layers.map(layer => {
    if (!Array.isArray(layer)) return layer;
    return layer.map(entry => {
      if (entry && typeof entry === 'object' && entry.id && map.nodes[entry.id]) {
        if (entry !== map.nodes[entry.id]) changed = true;
        return map.nodes[entry.id];
      }
      if (typeof entry === 'string' && map.nodes[entry]) {
        changed = true;
        return map.nodes[entry];
      }
      return entry;
    });
  });
  return changed;
}

function rebuildStoryMapForCurrentState() {
  state.map = generateMap(state.currentMap || 0, !!state.nuzlockeMode);
  state.currentNode = Object.values(state.map.nodes || {}).find(node => node.accessible && !node.visited) || state.map.nodes?.['n0_0'] || null;
}

function ensureStoryMapIsRenderable() {
  if (state?.isEndlessMode) return;
  if (!hasRenderableStoryMap(state.map)) {
    rebuildStoryMapForCurrentState();
    return;
  }
  normalizeStoryMapLayers(state.map);
  if (!state.currentNode || !state.map.nodes?.[state.currentNode.id]) {
    state.currentNode = Object.values(state.map.nodes || {}).find(node => node.accessible && !node.visited) || state.map.nodes?.['n0_0'] || null;
  }
}


function hasSavedStoryRun() {
  try {
    const raw = localStorage.getItem('poke_current_run');
    if (!raw || localStorage.getItem('poke_endless_state')) return false;
    const saved = JSON.parse(raw);
    return !!saved && !saved.isEndlessMode && !NON_RESUMABLE_SCREENS.has(saved.activeScreenId || '');
  } catch {
    return false;
  }
}

function getSavedStoryRunSummary() {
  try {
    const raw = localStorage.getItem('poke_current_run');
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (!saved || saved.isEndlessMode || NON_RESUMABLE_SCREENS.has(saved.activeScreenId || '')) return null;
    const region = getStoryRegionConfig(saved.storyRegionId || 1);
    return {
      regionName: region.name,
      badges: saved.badges ?? 0,
      screenId: saved.activeScreenId || 'map-screen',
    };
  } catch {
    return null;
  }
}

function refreshContinueButtons() {
  const continueEndlessBtn = document.getElementById('btn-continue-endless');
  if (continueEndlessBtn) {
    const hasEndless = hasSavedEndlessRun();
    continueEndlessBtn.style.display = hasEndless ? '' : 'none';
    continueEndlessBtn.disabled = !hasEndless;
    continueEndlessBtn.textContent = hasEndless ? (getSavedEndlessRunSummary() || getText('btn_continue_endless')) : getText('btn_continue_endless');
    continueEndlessBtn.onclick = hasEndless ? (() => continueEndlessRun()) : null;
  }

  const continueBtn = document.getElementById('btn-continue-run');
  if (continueBtn) {
    const hasSave = hasSavedStoryRun();
    const summary = hasSave ? getSavedStoryRunSummary() : null;
    continueBtn.style.display = '';
    continueBtn.disabled = !hasSave;
    continueBtn.textContent = summary
      ? getText('continue_run_summary', { region: summary.regionName, badges: summary.badges })
      : getText('btn_continue_run');
    continueBtn.title = hasSave ? '' : getText('no_saved_run_yet');
    continueBtn.onclick = hasSave ? (() => continueStoryRun()) : null;
  }
}

function hasUnlockedEndlessMode() {
  try {
    return getHallOfFame().some(entry => !entry.endless);
  } catch {
    return false;
  }
}

function refreshEndlessButton() {
  const endlessBtn = document.getElementById('btn-endless-run');
  if (!endlessBtn) return;
  const wrap = endlessBtn.closest('.lock-wrap');
  const note = wrap?.querySelector('.locked-note');
  const overlay = wrap?.querySelector('.locked-overlay');

  if (!hasUnlockedEndlessMode()) {
    endlessBtn.onclick = null;
    endlessBtn.disabled = true;
    endlessBtn.setAttribute('disabled', '');
    endlessBtn.classList.add('btn-disabled');
    endlessBtn.style.opacity = '0.45';
    endlessBtn.style.pointerEvents = 'none';
    if (note) note.textContent = getText('endless_coming_soon_desc');
    if (overlay) overlay.style.display = '';
    return;
  }

  endlessBtn.disabled = false;
  endlessBtn.removeAttribute('disabled');
  endlessBtn.classList.remove('btn-disabled');
  endlessBtn.style.opacity = '';
  endlessBtn.style.pointerEvents = '';
  endlessBtn.onclick = () => openEndlessExpeditionModal();
  if (note) note.textContent = getText('endless_expedition_desc');
  if (overlay) overlay.style.display = 'none';
}

// ---- Run persistence ----

function saveRun() {
  if (runPersistenceDisabled) return;
  try {
    const activeScreenId = getActiveScreenId();
    if (NON_RESUMABLE_SCREENS.has(activeScreenId)) return;
    if (!state?.isEndlessMode && (!Array.isArray(state?.team) || state.team.length === 0)) return;
    const saved = {
      ...state,
      currentNodeId: state.currentNode?.id || null,
      currentNode: null,
      rngSeed: getRngSeed(),
      activeScreenId,
      savedAt: Date.now(),
    };
    localStorage.setItem('poke_current_run', JSON.stringify(saved));
  } catch {}
}

function loadRun() {
  try {
    const raw = localStorage.getItem('poke_current_run');
    if (!raw) return false;
    const saved = JSON.parse(raw);
    if (NON_RESUMABLE_SCREENS.has(saved.activeScreenId || '')) {
      clearSavedRun();
      return false;
    }
    if (!saved.isEndlessMode && (!Array.isArray(saved.team) || saved.team.length === 0)) {
      clearSavedRun();
      return false;
    }
    runPersistenceDisabled = false;
    if (saved.rngSeed) seedRng(saved.rngSeed);
    state = saved;
    if (!state.isEndlessMode) ensureStoryMapIsRenderable();
    state.currentNode = saved.currentNodeId ? (state.map?.nodes?.[saved.currentNodeId] || null) : null;
    if (!state.currentNode && state.map?.nodes) {
      state.currentNode = Object.values(state.map.nodes).find(node => node.accessible && !node.visited) || state.map.nodes['n0_0'] || null;
    }
    delete state.currentNodeId;
    delete state.rngSeed;
    return true;
  } catch { return false; }
}

function clearSavedRun() {
  runPersistenceDisabled = true;
  localStorage.removeItem('poke_current_run');
  refreshContinueButtons();
}

async function continueStoryRun() {
  if (!loadRun()) return false;

  const activeScreenId = state.activeScreenId || 'map-screen';
  delete state.activeScreenId;
  delete state.savedAt;

  const replayableNodeScreens = new Set([
    'battle-screen',
    'catch-screen',
    'swap-screen',
    'item-screen',
    'trade-screen',
    'shiny-screen',
  ]);

  if (activeScreenId === 'badge-screen') {
    const leader = getCurrentGymLeaders()[Math.max(0, (state.badges || 1) - 1)];
    if (leader) {
      showBadgeScreen(leader);
      return true;
    }
  }

  if (activeScreenId === 'win-screen') {
    showWinScreen();
    return true;
  }

  if (activeScreenId === 'transition-screen') {
    showMapScreen();
    return true;
  }

  if (replayableNodeScreens.has(activeScreenId) && state.currentNode && !state.currentNode.visited) {
    await onNodeClick(state.currentNode);
    return true;
  }

  showMapScreen();
  return true;
}

// ---- Initialization ----

async function initGame() {
  applyDarkMode();
  if (typeof syncStoredPokemonLocalizations === 'function') {
    syncStoredPokemonLocalizations(currentLanguage);
  }
  updateUILanguage();
  const storyHallOfFame = getHallOfFame().filter(entry => !entry.endless);
  const maxClearedRegion = storyHallOfFame.reduce((max, entry) => Math.max(max, entry.storyRegionId || 1), 0);
  for (let regionId = 2; regionId <= Math.min(maxClearedRegion + 1, Object.keys(STORY_REGION_CONFIGS).length); regionId++) {
    unlockStoryRegion(regionId);
  }
  showScreen('title-screen');
  if (typeof initCloudSave === 'function') initCloudSave();
  if (typeof syncToCloud === 'function') syncToCloud();
  document.getElementById('btn-new-run').onclick = () => startNewRun(false);
  document.getElementById('btn-hard-run').onclick = () => startNewRun(true);
  refreshTitleScreenPokedexButton();
  if (typeof refreshTitleMetaBar === 'function') refreshTitleMetaBar();
  refreshEndlessButton();
  refreshContinueButtons();
}

function autosaveActiveRun() {
  const activeScreen = getActiveScreenId();
  if (!state || activeScreen === 'title-screen' || activeScreen === 'region-screen' || activeScreen === 'trainer-screen' || activeScreen === 'starter-screen') return;
  try {
    saveRun();
    if (state.isEndlessMode && typeof saveEndlessState === 'function') saveEndlessState();
  } catch {}
}

async function startNewRun(nuzlockeMode = false) {
  runPersistenceDisabled = false;
  clearEndlessState();
  const savedTrainer = localStorage.getItem('poke_trainer') || null;
  const savedRegionId = parseInt(localStorage.getItem('poke_story_region') || '1', 10);
  const storyRegionId = isStoryRegionUnlocked(savedRegionId) ? savedRegionId : 1;
  const seed = (Date.now() ^ (Math.random() * 0x100000000 | 0)) >>> 0;
  seedRng(seed);
  state = { currentMap: 0, currentNode: null, team: [], items: [], badges: 0, map: null, eliteIndex: 0, storyRegionId, trainer: savedTrainer || 'boy', starterSpeciesId: null, maxTeamSize: 1, nuzlockeMode, usedPokecenter: false, pickedUpItem: false, runSeed: seed };
  const pickedRegionId = await showStoryRegionSelect();
  if (!pickedRegionId) {
    showScreen('title-screen');
    return;
  }
  state.storyRegionId = pickedRegionId;
  localStorage.setItem('poke_story_region', String(pickedRegionId));
  if (savedTrainer) {
    await showStarterSelect();
  } else {
    await showTrainerSelect();
  }
}

async function showStoryRegionSelect() {
  showScreen('region-screen');
  const container = document.getElementById('story-region-choices');
  const backBtn = document.getElementById('btn-region-back');
  if (!container) return 1;

  const regionIds = Object.keys(STORY_REGION_CONFIGS).map(Number).sort((a, b) => a - b);
  const futureRegions = [
    { regionId: 7, label: 'Gen 7', name: 'Alola', descKey: 'region_gen_7_desc' },
    { regionId: 8, label: 'Gen 8', name: 'Galar', descKey: 'region_gen_8_desc' },
    { regionId: 9, label: 'Gen 9', name: 'Paldea', descKey: 'region_gen_9_desc' },
  ];

  const storyCards = regionIds.map(regionId => {
    const region = getStoryRegionConfig(regionId);
    const unlocked = isStoryRegionUnlocked(regionId);
    const stateLabel = unlocked ? getText('region_unlocked') : getText('region_locked');
    const unlockKeyMap = { 2: 'unlock_gen_2', 3: 'unlock_gen_3', 4: 'unlock_gen_4', 5: 'unlock_gen_5', 6: 'unlock_gen_6' };
    const descKeyMap = { 1: 'region_gen_1_desc', 2: 'region_gen_2_desc', 3: 'region_gen_3_desc', 4: 'region_gen_4_desc', 5: 'region_gen_5_desc', 6: 'region_gen_6_desc' };
    const unlockKey = unlockKeyMap[regionId] || '';
    const descKey = descKeyMap[regionId] || 'region_gen_1_desc';
    const unlockText = !unlocked && unlockKey ? `<div class="story-region-card-unlock">${getText(unlockKey)}</div>` : '';
    const role = unlocked ? 'button' : 'presentation';
    const tabindex = unlocked ? '0' : '-1';
    const lockedClass = unlocked ? '' : ' locked';
    return `<div class="story-region-card${lockedClass}" data-region-id="${regionId}" role="${role}" tabindex="${tabindex}">
      <div class="story-region-card-top">
        <div>
          <div class="story-region-card-label">${region.label}</div>
          <div class="story-region-card-name">${region.name}</div>
        </div>
        <div class="story-region-card-state">${stateLabel}</div>
      </div>
      <div class="story-region-card-desc">${getText(descKey)}</div>
      ${unlockText}
    </div>`;
  });

  const teaserCards = futureRegions.map(region => `
    <div class="story-region-card coming-soon" data-region-id="${region.regionId}" role="presentation" tabindex="-1">
      <div class="story-region-card-top">
        <div>
          <div class="story-region-card-label">${region.label}</div>
          <div class="story-region-card-name">${region.name}</div>
        </div>
        <div class="story-region-card-state">${getText('coming_soon')}</div>
      </div>
      <div class="story-region-card-desc">${getText(region.descKey)}</div>
      <div class="story-region-card-unlock">${getText('coming_soon_note')}</div>
    </div>
  `);

  container.innerHTML = [...storyCards, ...teaserCards].join('');

  return await new Promise(resolve => {
    if (backBtn) backBtn.onclick = () => resolve(null);
    container.querySelectorAll('.story-region-card[role="button"]').forEach(card => {
      const pick = () => resolve(parseInt(card.dataset.regionId, 10));
      card.onclick = pick;
      card.onkeydown = e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          pick();
        }
      };
    });
  });
}

async function showTrainerSelect() {
  showScreen('trainer-screen');
  const boyCard  = document.getElementById('trainer-boy');
  const girlCard = document.getElementById('trainer-girl');
  boyCard.querySelector('.trainer-icon-wrap').innerHTML  = TRAINER_SVG.boy;
  girlCard.querySelector('.trainer-icon-wrap').innerHTML = TRAINER_SVG.girl;

  await new Promise(resolve => {
    function pick(gender) {
      state.trainer = gender;
      localStorage.setItem('poke_trainer', gender);
      resolve();
    }
    boyCard.onclick   = () => pick('boy');
    boyCard.onkeydown = e => { if (e.key==='Enter'||e.key===' ') pick('boy'); };
    girlCard.onclick   = () => pick('girl');
    girlCard.onkeydown = e => { if (e.key==='Enter'||e.key===' ') pick('girl'); };
  });
  await showStarterSelect();
}

function getStarterDescription(speciesId) {
  const descriptionKeys = {
    1: 'starter_bulbasaur',
    4: 'starter_charmander',
    7: 'starter_squirtle',
    152: 'starter_chikorita',
    155: 'starter_cyndaquil',
    158: 'starter_totodile',
    252: 'starter_treecko',
    255: 'starter_torchic',
    258: 'starter_mudkip',
    387: 'starter_turtwig',
    390: 'starter_chimchar',
    393: 'starter_piplup',
    495: 'starter_snivy',
    498: 'starter_tepig',
    501: 'starter_oshawott',
  };
  const key = descriptionKeys[speciesId];
  return key ? getText(key) : null;
}

async function showStarterSelect() {
  showScreen('starter-screen');
  const container = document.getElementById('starter-choices');
  container.innerHTML = '<div class="loading">Loading starters...</div>';

  if (state.isEndlessMode) {
    endlessState.currentRegion = rollRegion(endlessState.stageNumber, endlessState.regionNumber);
    endlessState._preRolled = true;
    const panel = document.getElementById('starter-region-panel');
    if (panel) {
      const region = endlessState.currentRegion;
      const header = `<div class="hud-label">Upcoming Region</div><div class="hud-label" style="font-size:7px;opacity:0.7;">${getStageName(region.stageNum)} R${region.regionNum}</div>`;
      const rows = region.trainers.map((trainer, i) => {
        const type = trainer.archetype?.type || '???';
        const name = trainer.archetype?.name || '???';
        const isBigBoss = i === 2;
        const typeClass = type.toLowerCase();
        const rowClass = isBigBoss ? 'region-stage-row boss' : 'region-stage-row';
        const speciesAttr = (trainer.speciesIds || []).join(',');
        return `<div class="${rowClass}" data-species="${speciesAttr}" style="cursor:default;">
          <span class="type-badge type-${typeClass}" style="font-size:6px;padding:1px 3px;">${type}</span>
          <span class="region-stage-name">${isBigBoss ? 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ ' : ''}${name}</span>
          <span class="region-stage-level">Lv${trainer.level}</span>
        </div>`;
      }).join('');
      panel.innerHTML = header + `<div class="region-stage-list">${rows}</div>`;
      if (typeof attachBossTeamTooltips === 'function') attachBossTeamTooltips(panel);
      panel.style.display = '';
    }
  }

  const startLevel = 5;
  const storyRegion = getCurrentStoryRegion();
  const starters = state.isEndlessMode ? [] : await Promise.all(storyRegion.starterIds.map(id => fetchPokemonById(id)));

  container.innerHTML = '';
  container.style.cssText = '';
  container.parentElement.querySelectorAll('.hof-starter-label').forEach(el => el.remove());

  if (!state.isEndlessMode) {
    const panel = document.getElementById('starter-region-panel');
    if (panel) {
      panel.innerHTML = '';
      panel.style.display = 'none';
    }
  }

  if (state.isEndlessMode) {
    const allHofEntries = getHallOfFame();
    const starterIds = REGION_STARTERS[endlessState.stageNumber] || REGION_STARTERS[1];
    const starterSpecies = (await Promise.all(starterIds.map(id => fetchPokemonById(id)))).filter(Boolean);
    const starterRow = document.createElement('div');
    starterRow.className = 'starter-card-row';
    for (const species of starterSpecies) {
      const isShiny = rng() < (hasShinyCharm() ? 0.02 : 0.01);
      const inst = createInstance(species, startLevel, isShiny, 0);
      const starterCaught = !!(getPokedex()[inst.speciesId]?.caught);
      const wrapper = document.createElement('div');
      wrapper.innerHTML = renderPokemonCard(inst, true, false, starterCaught);
      const card = wrapper.querySelector('.poke-card');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.addEventListener('click', () => selectStarter(inst));
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') selectStarter(inst); });
      starterRow.appendChild(card);
    }
    container.appendChild(starterRow);

    // --- Section 2: HoF PC (past run PokÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©mon only) ---
    const seen = new Set();
    const hofIds = [];
    for (const entry of allHofEntries) {
      for (const p of entry.team) {
        const id = getEvoLineRoot(p.speciesId);
        if (!seen.has(id) && !LEGENDARY_ID_SET.has(id)) { seen.add(id); hofIds.push(id); }
      }
    }
    hofIds.sort((a, b) => a - b);
    const hofX = hofIds.length;
    const hofY = new Set([...ALL_CATCHABLE_IDS].map(id => getEvoLineRoot(id))).size;
    const hofSpecies = hofIds.length > 0
      ? (await Promise.all(hofIds.map(id => fetchPokemonById(id)))).filter(Boolean)
      : [];

    const hofBox = document.createElement('div');
    hofBox.className = 'pc-box';
    const hasEntries = hofSpecies.length > 0;
    const sortBtnsHtml = hasEntries
      ? `<div class="hof-sort-btns"><button class="hof-sort-btn active" data-sort="stars">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ Stars</button><button class="hof-sort-btn" data-sort="type">Type</button><button class="hof-sort-btn" data-sort="id">#</button><span class="hof-sort-sep"></span><button class="hof-sort-btn hof-filter-shiny" data-filter="shiny">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ Shiny</button></div>`
      : '';
    const hofTitle = hasEntries ? `HALL OF FAME PC (${hofX}/${hofY})` : 'HALL OF FAME PC';
    hofBox.innerHTML = `<div class="pc-box-titlebar${hasEntries ? ' with-sort' : ''}"><span>${hofTitle}</span>${sortBtnsHtml}</div><div class="pc-box-body"><div class="pc-box-grid" style="grid-template-columns:repeat(6,1fr);"></div></div>`;
    const grid = hofBox.querySelector('.pc-box-grid');

    if (!hasEntries) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;opacity:0.5;padding:12px;font-size:8px;">Complete a run to unlock PokÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©mon here</div>`;
    }

    const persistBuffs = loadPersistentBuffs();
    const _hofStats = ['hp','atk','def','speed','special'];
    function hofStarScore(speciesId) {
      const b = persistBuffs[getEvoLineRoot(speciesId)] || {};
      const maxed = _hofStats.filter(k => (b[k] ?? 0) >= 10).length;
      const partial = _hofStats.filter(k => { const v = b[k] ?? 0; return v > 0 && v < 10; }).length;
      return maxed + partial * 0.5;
    }

    const shinyRoots = new Set();
    for (const entry of allHofEntries) {
      for (const p of entry.team) {
        if (p.isShiny) shinyRoots.add(getEvoLineRoot(p.speciesId));
      }
    }

    const hofInstances = hofSpecies.map(species => {
      const isShiny = shinyRoots.has(getEvoLineRoot(species.id ?? species.speciesId));
      const inst = createInstance(species, startLevel, isShiny, 0);
      loadBuffsIntoPokemon(inst);
      return inst;
    });

    function buildHofGrid(instances) {
      grid.innerHTML = '';
      for (const inst of instances) {
        const typeBadges = (inst.types || []).map(t =>
          `<span class="type-badge type-${t.toLowerCase()}" style="font-size:5px;padding:1px 2px;">${t}</span>`).join('');
        const slot = document.createElement('div');
        slot.className = 'pc-slot';
        slot.setAttribute('role', 'button');
        slot.setAttribute('tabindex', '0');
        slot.innerHTML = `
          <img src="${inst.spriteUrl}" alt="${inst.name}">
          <div class="pc-slot-name">${inst.name}</div>
          <div class="pc-slot-lv">Lv.${startLevel}</div>
          <div style="display:flex;gap:2px;flex-wrap:wrap;justify-content:center;">${typeBadges}</div>`;
        const stars = makeMaxedStarsEl(inst.speciesId);
        if (stars) slot.appendChild(stars);
        if (inst.isShiny) {
          const shinyStar = document.createElement('span');
          shinyStar.textContent = 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦';
          shinyStar.style.cssText = 'position:absolute;top:3px;left:3px;font-size:7px;color:#4af;line-height:1;';
          shinyStar.title = 'Shiny!';
          slot.appendChild(shinyStar);
        }
        slot.addEventListener('click', () => selectStarter(inst));
        slot.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') selectStarter(inst); });
        slot.addEventListener('mouseenter', () => showTeamHoverCard(inst, slot));
        slot.addEventListener('mouseleave', () => hideTeamHoverCard());
        grid.appendChild(slot);
      }
    }

    let showOnlyShiny = false;
    let currentSort = 'stars';

    function sortHof(mode) {
      const pool = showOnlyShiny ? hofInstances.filter(i => i.isShiny) : [...hofInstances];
      if (mode === 'stars') pool.sort((a, b) => { const d = hofStarScore(b.speciesId) - hofStarScore(a.speciesId); return d !== 0 ? d : a.speciesId - b.speciesId; });
      else if (mode === 'type') pool.sort((a, b) => { const ta = (a.types?.[0]||'').toLowerCase(), tb = (b.types?.[0]||'').toLowerCase(); return ta !== tb ? (ta < tb ? -1 : 1) : a.speciesId - b.speciesId; });
      else pool.sort((a, b) => a.speciesId - b.speciesId);
      buildHofGrid(pool);
    }

    if (hasEntries) {
      sortHof('stars');
      hofBox.querySelectorAll('.hof-sort-btn:not(.hof-filter-shiny)').forEach(btn => {
        btn.addEventListener('click', () => {
          hofBox.querySelectorAll('.hof-sort-btn:not(.hof-filter-shiny)').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentSort = btn.dataset.sort;
          sortHof(currentSort);
        });
      });
      const shinyFilterBtn = hofBox.querySelector('.hof-filter-shiny');
      if (shinyFilterBtn) {
        shinyFilterBtn.addEventListener('click', () => {
          showOnlyShiny = !showOnlyShiny;
          shinyFilterBtn.classList.toggle('active', showOnlyShiny);
          sortHof(currentSort);
        });
      }
    }

    container.appendChild(hofBox);
  } else {
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.flexWrap = 'wrap';
    container.style.gap = '16px';

    for (const species of starters) {
      if (!species) continue;
      const isShiny = rng() < (hasShinyCharm() ? 0.02 : 0.01);
      const inst = createInstance(species, startLevel, isShiny, 0);
      const starterCaught = !!(getPokedex()[inst.speciesId]?.caught);
      const wrapper = document.createElement('div');
      wrapper.innerHTML = renderPokemonCard(inst, true, false, starterCaught);
      const card = wrapper.querySelector('.poke-card');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.addEventListener('click', () => selectStarter(inst));
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') selectStarter(inst); });
      const cardWrapper = document.createElement('div');
      cardWrapper.className = 'starter-card-wrapper';
      cardWrapper.appendChild(card);
      const desc = getStarterDescription(inst.speciesId);
      if (desc) {
        const descEl = document.createElement('div');
        descEl.className = 'starter-description';
        descEl.textContent = desc;
        cardWrapper.appendChild(descEl);
      }
      container.appendChild(cardWrapper);
    }
  }
}

async function selectStarter(pokemon) {
  const normalUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.speciesId}.png`;
  markPokedexCaught(pokemon.speciesId, pokemon.name, pokemon.types, normalUrl, pokemon.localizedNames);
  if (pokemon.isShiny) markShinyDexCaught(pokemon.speciesId, pokemon.name, pokemon.types, pokemon.spriteUrl, pokemon.localizedNames);
  loadBuffsIntoPokemon(pokemon);
  localStorage.setItem('poke_story_region', String(state.storyRegionId || 1));
  state.team = [pokemon];
  state.starterSpeciesId = pokemon.speciesId;
  recordUsedStarter(pokemon.speciesId);
  state.maxTeamSize = 1;
  if (state.isEndlessMode) {
    startEndlessRegion();
  } else {
    startMap(0);
  }
}

async function buildConfiguredEnemyTeam(entries, defaultMoveTier = 1) {
  const team = [];
  for (const entry of entries) {
    const species = entry.baseStats && entry.types
      ? entry
      : await fetchPokemonById(entry.speciesId);
    if (!species) continue;
    const adjustedLevel = getAdjustedEnemyLevel(entry.level, true);
    const inst = createInstance({
      ...species,
      name: entry.name || species.name,
      types: entry.types || species.types,
      baseStats: entry.baseStats || species.baseStats,
    }, adjustedLevel, false, entry.moveTier ?? defaultMoveTier);
    inst.heldItem = entry.heldItem || null;
    team.push(inst);
  }
  return team;
}

function getAdjustedEnemyLevel(level, isBoss = false, encounterType = 'wild') {
  if (state?.isEndlessMode) return level;
  const safeLevel = Math.max(1, Number(level) || 1);
  const storyRegionId = state?.storyRegionId || 1;
  const progressIndex = Math.max(0, Number(state?.currentMap) || 0);

  // Keep Kanto on the old feel; later regions get smoother scaling.
  if (storyRegionId <= 1) {
    let delta;
    if (isBoss) delta = -2;
    else if (encounterType === 'trainer') delta = -1;
    else delta = -1;
    return Math.max(2, safeLevel + delta);
  }

  const teamLevels = Array.isArray(state?.team)
    ? state.team.map(p => Number(p?.level) || 0).filter(l => l > 0).sort((a, b) => b - a)
    : [];
  const anchorSlice = teamLevels.slice(0, Math.min(3, teamLevels.length));
  const anchorLevel = anchorSlice.length
    ? Math.round(anchorSlice.reduce((sum, lvl) => sum + lvl, 0) / anchorSlice.length)
    : safeLevel;
  const lateRun = progressIndex >= 6;
  const finalStretch = progressIndex >= 8;

  let adjustedLevel = safeLevel;
  let floorLevel = safeLevel;
  let ceilLevel = safeLevel;

  if (isBoss) {
    adjustedLevel = Math.max(2, safeLevel + (finalStretch ? 0 : -1));
    floorLevel = anchorLevel - (lateRun ? 1 : 2);
    ceilLevel = anchorLevel + (finalStretch ? 1 : 0);
  } else if (encounterType === 'trainer') {
    adjustedLevel = Math.max(2, safeLevel + (lateRun ? -2 : -3));
    floorLevel = anchorLevel - (lateRun ? 3 : 4);
    ceilLevel = anchorLevel - 1;
  } else {
    adjustedLevel = Math.max(2, safeLevel + (lateRun ? -3 : -4));
    floorLevel = anchorLevel - (lateRun ? 4 : 5);
    ceilLevel = anchorLevel - 2;
  }

  adjustedLevel = Math.max(adjustedLevel, Math.max(2, floorLevel));
  adjustedLevel = Math.min(adjustedLevel, Math.max(2, ceilLevel));
  return Math.max(2, adjustedLevel);
}

async function resolveConfiguredTeamPreview(teamEntries, fallbackType = 'Normal') {
  return Promise.all((teamEntries || []).map(async entry => {
    const previewLevel = getAdjustedEnemyLevel(entry.level, true);
    if (Array.isArray(entry.types) && entry.types.length) {
      return {
        name: entry.name || 'Pokemon',
        level: previewLevel || 0,
        types: entry.types,
      };
    }
    if (entry.speciesId) {
      const species = await fetchPokemonById(entry.speciesId);
      if (species) {
        return {
          name: entry.name || species.name,
          level: previewLevel || 0,
          types: species.types || [fallbackType],
        };
      }
    }
    return {
      name: entry.name || 'Pokemon',
      level: previewLevel || 0,
      types: [fallbackType],
    };
  }));
}

async function getLeaderWeaknessHints(leader) {
  const team = await resolveConfiguredTeamPreview(leader?.team || [], leader?.type || 'Normal');
  return Object.keys(TYPE_CHART || {})
    .map(type => {
      const hits = team.map(mon => getTypeEffectiveness(type, mon.types || [leader?.type || 'Normal']));
      const total = hits.reduce((sum, value) => sum + value, 0);
      return {
        type,
        average: team.length ? total / team.length : 1,
        superCount: hits.filter(value => value >= 2).length,
        resistCount: hits.filter(value => value < 1).length,
        bestHit: Math.max(...hits, 1),
      };
    })
    .filter(entry => entry.superCount > 0 || entry.average > 1)
    .sort((a, b) =>
      b.average - a.average ||
      b.superCount - a.superCount ||
      b.bestHit - a.bestHit ||
      a.resistCount - b.resistCount ||
      a.type.localeCompare(b.type)
    )
    .slice(0, 4);
}

function renderEasyModeTypeBadge(type, note = '') {
  const safeType = type || 'Normal';
  const cls = safeType.toLowerCase();
  const suffix = note ? `<span class="easy-mode-type-note">${note}</span>` : '';
  return `<span class="type-badge type-${cls}">${safeType}${suffix}</span>`;
}

async function renderDynamicEasyModeCard(indicator, region, leader) {
  indicator.classList.remove('easy-mode-indicator-image');
  indicator.classList.add('easy-mode-indicator-card');
  const team = await resolveConfiguredTeamPreview(leader?.team || [], leader?.type || 'Normal');
  const weaknessHints = await getLeaderWeaknessHints(leader);
  const badgeArt = leader?.badgeImage
    ? `<img src="${leader.badgeImage}" alt="${leader.badge || 'Badge'}" class="easy-mode-badge-art">`
    : '';
  const weaknessHtml = weaknessHints.length
    ? weaknessHints.map(entry => renderEasyModeTypeBadge(entry.type, `${entry.average.toFixed(1)}x`)).join('')
    : renderEasyModeTypeBadge(leader?.type || 'Normal');
  const teamHtml = team.map(mon => {
    const types = (mon.types || []).map(type => renderEasyModeTypeBadge(type)).join('');
    return `<div class="easy-mode-team-row"><span>${mon.name}</span><span>Lv${mon.level || '?'}</span><div class="easy-mode-team-types">${types}</div></div>`;
  }).join('');

  indicator.innerHTML = `
    <div class="easy-mode-card easy-mode-card-dynamic">
      <div class="easy-mode-card-head">
        <div>
          <div class="easy-mode-kicker">${region.name} Easy Mode</div>
          <div class="easy-mode-leader">${leader?.name || 'Gym Leader'}</div>
        </div>
        <div class="easy-mode-badge-box">
          ${badgeArt}
          <div class="easy-mode-badge-name">${leader?.badge || ''}</div>
        </div>
      </div>
      <div class="easy-mode-section">
        <div class="easy-mode-label">Main Type</div>
        <div class="easy-mode-type-row">${renderEasyModeTypeBadge(leader?.type || 'Normal')}</div>
      </div>
      <div class="easy-mode-section">
        <div class="easy-mode-label">Best Attack Types</div>
        <div class="easy-mode-type-row">${weaknessHtml}</div>
      </div>
      <div class="easy-mode-section">
        <div class="easy-mode-label">Team Preview</div>
        <div class="easy-mode-team-list">${teamHtml}</div>
      </div>
    </div>`;
  indicator.style.display = 'block';
}

function renderBadgeCollectionHtml() {
  const region = getCurrentStoryRegion();
  const leaders = getCurrentGymLeaders();
  if (region.badgeDisplay === 'sprite') {
    const base = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/';
    return Array.from({ length: 8 }, (_, i) => {
      const earned = i < state.badges;
      const label = leaders[i].badge;
      const badgeSrc = leaders[i].badgeImage || `${base}${i + 1}.png`;
      return earned
        ? `<img src="${badgeSrc}" alt="${label}" title="${label}" class="badge-icon-img">`
        : `<span class="badge-icon-empty" title="${label}"></span>`;
    }).join('');
  }
  return Array.from({ length: 8 }, (_, i) => {
    const leader = leaders[i];
    const earned = i < state.badges;
    const short = leader.badge.replace(' Badge', '').slice(0, 3).toUpperCase();
    return `<span class="story-badge-chip${earned ? ' earned' : ''}" title="${leader.badge}">${short}</span>`;
  }).join('');
}

function applyStoryRegionMapBackground(mapContainer) {
  if (!mapContainer) return;
  const region = getCurrentStoryRegion();
  const defaultBg = `ui/mapsNormalMode/map${state.currentMap + 1}.png`;
  const regionMapImages = Array.isArray(region.mapBackgroundImages) ? region.mapBackgroundImages : [];
  const backgroundImage =
    regionMapImages[state.currentMap] ||
    region.mapBackgroundImage ||
    defaultBg;
  mapContainer.dataset.storyRegion = region.key || 'kanto';
  mapContainer.style.backgroundImage = `url('${backgroundImage}')`;
  mapContainer.style.backgroundSize = region.mapBackgroundSize || 'cover';
  mapContainer.style.backgroundPosition = region.mapBackgroundPosition || 'center';
  mapContainer.style.backgroundBlendMode = 'normal';
}

// ---- Map Management ----

function startMap(mapIndex) {
  state.currentMap = mapIndex;
  state.map = generateMap(mapIndex, state.nuzlockeMode);

  // Full heal between arenas (skip the very first map)
  if (mapIndex > 0) {
    for (const p of state.team) {
      p.currentHp = p.maxHp;
    }
  }

  const startNode = state.map.nodes['n0_0'];
  state.currentNode = startNode;

  showMapScreen();
}

function showMapScreen() {
  // In endless mode, delegate to the endless map renderer (which uses the correct click handler)
  if (state.isEndlessMode) { saveRun(); showEndlessMapScreen(); return; }

  if (typeof hideEndlessTraitPanel === 'function') hideEndlessTraitPanel();
  const regionPanel = document.getElementById('endless-region-panel');
  if (regionPanel) regionPanel.style.display = 'none';
  document.querySelectorAll('.map-badges-label').forEach(el => el.style.display = '');
  showScreen('map-screen');
  const mapInfo = document.getElementById('map-info');
  const region = getCurrentStoryRegion();
  const leaders = getCurrentGymLeaders();
  if (mapInfo) {
    const isFinal = state.currentMap === 8;
    const leader = isFinal ? null : leaders[state.currentMap];
    mapInfo.innerHTML = isFinal
      ? `<span>${region.name}: Elite Four & Champion</span>`
      : `<span>${region.name} Map ${state.currentMap+1}: vs <b>${leader.name}</b> (${leader.type})</span>`;
  }
  const badgeHtml = renderBadgeCollectionHtml();
  const badgeEl = document.getElementById('badge-count');
  if (badgeEl) badgeEl.innerHTML = badgeHtml;
  const badgePanelEl = document.getElementById('badge-count-panel');
  if (badgePanelEl) badgePanelEl.innerHTML = badgeHtml;

  renderTeamBar(state.team);
  renderItemBadges(state.items);

  const mapContainer = document.getElementById('map-container');
  if (mapContainer) {
    ensureStoryMapIsRenderable();
    state.map.mapIndex = state.currentMap;
    applyStoryRegionMapBackground(mapContainer);
    renderMap(state.map, mapContainer, onNodeClick);
    if (!mapContainer.querySelector('svg path, svg circle, svg image, svg text')) {
      rebuildStoryMapForCurrentState();
      state.map.mapIndex = state.currentMap;
      applyStoryRegionMapBackground(mapContainer);
      renderMap(state.map, mapContainer, onNodeClick);
    }
  }
  saveRun();

  updateEasyModeIndicator();
  syncMobileMapPanel();

  if (!localStorage.getItem('poke_tutorial_seen')) {
    showTutorialOverlay();
  }
}

function showTutorialOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'tutorial-overlay';

  // Find positions of the settings button and team bar
  const settingsBtn = document.querySelector('#map-screen button[title="Settings"]');
  const teamBar = document.getElementById('team-bar');

  if (settingsBtn) {
    const r = settingsBtn.getBoundingClientRect();
    const callout = document.createElement('div');
    callout.className = 'tutorial-callout arrow-right';
    callout.textContent = getText('tutorial_auto_skip');
    callout.style.top = (r.top + r.height / 2 - 30) + 'px';
    callout.style.right = (window.innerWidth - r.left + 10) + 'px';
    overlay.appendChild(callout);
  }

  if (teamBar) {
    const r = teamBar.getBoundingClientRect();
    const callout = document.createElement('div');
    callout.className = 'tutorial-callout arrow-up';
    callout.textContent = getText('tutorial_swap_team');
    callout.style.top = (r.bottom + 14) + 'px';
    callout.style.left = (r.left + r.width / 2 - 90) + 'px';
    overlay.appendChild(callout);
  }

  const dismiss = document.createElement('div');
  dismiss.className = 'tutorial-dismiss';
  dismiss.textContent = getText('tutorial_dismiss');
  overlay.appendChild(dismiss);

  overlay.addEventListener('click', () => {
    localStorage.setItem('poke_tutorial_seen', '1');
    overlay.remove();
  });

  document.body.appendChild(overlay);
}

function showItemFoundToast(icon, name) {
  const toast = document.createElement('div');
  toast.className = 'item-found-toast';
  toast.innerHTML = `<span class="item-toast-icon">${icon}</span>
    <div class="ach-toast-text">
      <div class="item-toast-label">${getText('item_found_toast')}</div>
      <div class="item-toast-name">${name}</div>
    </div>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('visible'));
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

function cropWhiteBorderToTransparent(img) {
  if (!img || img.dataset.easyModeProcessed === 'true') return;

  const canvas = document.createElement('canvas');
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  if (!w || !h) return;

  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);

  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      if (r > 240 && g > 240 && b > 240) {
        data[idx + 3] = 0;
      } else {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    img.dataset.easyModeProcessed = 'true';
    return;
  }

  ctx.putImageData(imageData, 0, 0);
  const cropWidth = maxX - minX + 1;
  const cropHeight = maxY - minY + 1;
  const cropped = document.createElement('canvas');
  cropped.width = cropWidth;
  cropped.height = cropHeight;
  const croppedCtx = cropped.getContext('2d');
  croppedCtx.putImageData(ctx.getImageData(minX, minY, cropWidth, cropHeight), 0, 0);

  img.dataset.easyModeProcessed = 'true';
  img.src = cropped.toDataURL('image/png');
}

async function updateEasyModeIndicator() {
  const indicator = document.getElementById('easy-mode-indicator');
  if (!indicator) return;

  const settings = getSettings();
  const region = getCurrentStoryRegion();
  if (!settings.easyMode || state.currentMap >= 8) {
    indicator.classList.remove('easy-mode-indicator-image', 'easy-mode-indicator-card');
    indicator.innerHTML = '';
    indicator.style.display = 'none';
    return;
  }
  const leader = getCurrentGymLeaders()[state.currentMap];
  if (!leader) {
    indicator.classList.remove('easy-mode-indicator-image', 'easy-mode-indicator-card');
    indicator.innerHTML = '';
    indicator.style.display = 'none';
    return;
  }
  await renderDynamicEasyModeCard(indicator, region, leader);
}


let _nodeClickBusy = false;
async function onNodeClick(node) {
  if (_nodeClickBusy) return;
  if (!node.accessible) return;
  _nodeClickBusy = true;
  try {
  state.currentNode = node;
  // Lock sibling nodes before saving so F5 can't switch to a different path choice
  for (const n of Object.values(state.map.nodes)) {
    if (n.layer === node.layer && n.id !== node.id && n.accessible) {
      n.accessible = false;
    }
  }
  let resolvedType = node.type;

  if (node.type === NODE_TYPES.QUESTION) {
    if (state.savedQuestionResolve?.nodeId === node.id) {
      resolvedType = state.savedQuestionResolve.resolvedType;
    } else {
      resolvedType = resolveQuestionMark();
      state.savedQuestionResolve = { nodeId: node.id, resolvedType };
    }
  }
  saveRun();

  switch (resolvedType) {
    case NODE_TYPES.BATTLE:
      await doBattleNode(node);
      break;
    case NODE_TYPES.CATCH:
      await doCatchNode(node);
      break;
    case NODE_TYPES.ITEM:
      doItemNode(node);
      break;
    case NODE_TYPES.BOSS:
      await doBossNode(node);
      break;
    case NODE_TYPES.POKECENTER:
      doPokeCenterNode(node);
      break;
    case NODE_TYPES.TRAINER:
      await doTrainerNode(node);
      break;
    case NODE_TYPES.LEGENDARY:
      await doLegendaryNode(node);
      break;
    case NODE_TYPES.MOVE_TUTOR:
      await doMoveTutorNode(node);
      break;
    case NODE_TYPES.TRADE:
      if (state.isEndlessMode) { advanceFromNode(state.map, node.id); showMapScreen(); }
      else await doTradeNode(node);
      break;
    case 'shiny':
      await doShinyNode(node);
      break;
    case 'mega':
      doItemNode(node);
      break;
    default:
      await doBattleNode(node);
  }
  } finally {
    _nodeClickBusy = false;
  }
}

function resolveQuestionMark() {
  const r = rng();
  if (r < 0.22) return NODE_TYPES.BATTLE;
  if (r < 0.42) return NODE_TYPES.TRAINER;
  if (r < 0.52) return state.nuzlockeMode ? NODE_TYPES.BATTLE : NODE_TYPES.CATCH;
  if (r < 0.65) return NODE_TYPES.ITEM;
  if (r < (hasShinyCharm() ? 0.79 : 0.72)) return 'shiny';
  return 'mega';
}

// ---- Node Handlers ----

// Maps a max level to an appropriate map index for BST bucket selection.
function levelToMapIndex(maxLevel) {
  if (maxLevel <= 10) return 0;
  if (maxLevel <= 20) return 1;
  if (maxLevel <= 30) return 3;
  if (maxLevel <= 42) return 4;
  if (maxLevel <= 52) return 6;
  return 7;
}

// In endless mode, use a BST bucket matching the current level range instead of fakeMapIndex.
function getEncounterMapIndex() {
  if (state.isEndlessMode && state.endlessLevelRange) {
    return levelToMapIndex(state.endlessLevelRange[1]);
  }
  return state.currentMap;
}

// Returns a level scaled to the node's layer.
function getLevelForNode(node) {
  if (state.isEndlessMode) {
    // Endless R1M1: level exactly equals layer number (1ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ7), no spread
    if (endlessState.regionNumber === 1 && endlessState.mapIndexInRegion === 0) return node.layer;
    const [minL, maxL] = state.endlessLevelRange;
    const t = Math.min(1, Math.max(0, (node.layer - 1) / 6)); // 0.0 at layer 1, 1.0 at layer 7
    const base = Math.round(minL + t * (maxL - minL));
    const spread = Math.max(1, Math.round((maxL - minL) / 8));
    return Math.min(maxL, Math.max(minL, base + Math.floor(rng() * spread)));
  }
  // Normal mode (original behaviour)
  const [minL, maxL] = MAP_LEVEL_RANGES[state.currentMap];
  const t = Math.min(1, Math.max(0, (node.layer - 1) / 5)); // 0.0 at layer 1, 1.0 at layer 6
  const base = Math.round(minL + t * (maxL - minL));
  const spread = Math.max(1, Math.round((maxL - minL) / 8));
  return Math.min(maxL, Math.max(minL, base + Math.floor(rng() * spread)));
}

async function doBattleNode(node) {
  const level = (!state.isEndlessMode && state.currentMap >= 1) ? getLevelForNode(node) - 1 : getLevelForNode(node);
  let choices = await getCatchChoices(
    getEncounterMapIndex(),
    3,
    state.isEndlessMode ? getEndlessMaxGenId(endlessState.stageNumber) : getStoryModeMaxGenId(),
    state.isEndlessMode ? 1 : getStoryModeMinGenId()
  );
  const lvlFiltered = choices.filter(sp => minLevelForSpecies(sp.id ?? sp.speciesId) <= level);
  if (lvlFiltered.length > 0) choices = lvlFiltered;

  // On the first layer of the first map, exclude enemies super effective against the starter
  if (state.currentMap === 0 && node.layer === 1 && state.team.length > 0) {
    const starterTypes = state.team[0].types || [];
    const isSafe = sp => !(sp.types || []).some(et =>
      starterTypes.some(st => (TYPE_CHART[et]?.[st] || 1) >= 2)
    );
    const safe = choices.filter(isSafe);
    if (safe.length > 0) {
      choices = safe;
    } else {
      // Fallback: Eevee (Normal type, never super effective)
      const eevee = await fetchPokemonById(133);
      if (eevee) choices = [eevee];
    }
  }

  const rawSpecies = choices[Math.floor(rng() * choices.length)];
  if (!rawSpecies) {
    advanceFromNode(state.map, node.id);
    showMapScreen();
    return;
  }
  const rawId = rawSpecies.id ?? rawSpecies.speciesId;
  const evoId = resolveEvoForLevel(rawId, level);
  const enemySpecies = evoId !== rawId ? (await fetchPokemonById(evoId) || rawSpecies) : rawSpecies;
  const enemy = createInstance(enemySpecies, getAdjustedEnemyLevel(level, false, 'wild'), false, getMoveTierForMap(state.currentMap));
  const titleEl = document.getElementById('battle-title');
  const subEl = document.getElementById('battle-subtitle');
  if (titleEl) titleEl.textContent = getText('wild_appeared', {name: enemy.name});
  if (subEl) subEl.textContent = getText('level_label', {level: enemy.level});
  const won = await new Promise(resolve => {
    runBattleScreen([enemy], false, () => resolve(true), () => resolve(false), null, [], 1);
  });
  if (!won) { showGameOver(); return; }
  if (state.isEndlessMode) await applyEndlessBugTrait();
  advanceFromNode(state.map, node.id);
  showMapScreen();
}

async function doBossNode(node) {
  if (state.currentMap === 8) {
    await doElite4();
    return;
  }
  const leader = getCurrentGymLeaders()[state.currentMap];
  const enemyTeam = await buildConfiguredEnemyTeam(leader.team, leader.moveTier ?? 1);

  showScreen('battle-screen');
  document.getElementById('battle-title').textContent = getText('gym_battle_vs', {name: leader.name});
  document.getElementById('battle-subtitle').textContent = getText('badge_on_line', {badge: leader.badge});
  await runBattleScreen(enemyTeam, true, () => {
    state.badges++;
    const reward = STORY_COIN_REWARDS.gym;
    awardCoins(reward, `${leader.name} gym clear`);
    advanceFromNode(state.map, node.id);
    showBadgeScreen(leader, reward);
    if (typeof refreshTitleMetaBar === 'function') refreshTitleMetaBar();
    const ach = unlockAchievement(`gym_${state.currentMap}`);
    if (ach) showAchievementToast(ach);
  }, () => {
    showGameOver();
  }, leader.name);
}

async function doElite4() {
  const bosses = getCurrentEliteFour();
  let totalCoinReward = 0;
  if (state.eliteIndex === 0) {
    fullyHealTeam();
  }
  for (let i = state.eliteIndex; i < bosses.length; i++) {
    state.eliteIndex = i;
    const boss = bosses[i];
    const enemyTeam = await buildConfiguredEnemyTeam(boss.team, boss.moveTier ?? 2);

    showScreen('battle-screen');
    document.getElementById('battle-title').textContent = getText('elite_battle', {title: boss.title, name: boss.name});
    document.getElementById('battle-subtitle').textContent = i === 3 ? getText('final_battle') : getText('elite_four_battle', {num: i+1});
    const won = await new Promise(resolve => {
      runBattleScreen(enemyTeam, true, () => resolve(true), () => resolve(false), boss.name);
    });

    if (!won) { showGameOver(); return; }
    const reward = i === bosses.length - 1 ? STORY_COIN_REWARDS.champion : STORY_COIN_REWARDS.elite;
    awardCoins(reward, `${boss.name} elite clear`);
    totalCoinReward += reward;
    if (i < bosses.length - 1) {
      await showEliteTransition(boss.name, i + 1);
    }
  }
  if (typeof refreshTitleMetaBar === 'function') refreshTitleMetaBar();
  const eliteAch = unlockAchievement('elite_four');
  if (eliteAch) showAchievementToast(eliteAch);
  showWinScreen(totalCoinReward);
}

function showEliteTransition(defeatedName, nextIndex) {
  return new Promise(resolve => {
    const el = document.getElementById('transition-screen');
    if (!el) { resolve(); return; }
    const bosses = getCurrentEliteFour();
    document.getElementById('transition-msg').textContent = getText('defeated_msg', {name: defeatedName});
    document.getElementById('transition-sub').textContent =
      nextIndex < bosses.length ? getText('next_elite', {name: bosses[nextIndex].name}) : getText('champion_awaits');
    showScreen('transition-screen');
    setTimeout(() => resolve(), 2000);
  });
}




async function doCatchNode(node) {
  showScreen('catch-screen');
  renderTeamBar(state.team, document.getElementById('catch-team-bar'), true);
  const choicesEl = document.getElementById('catch-choices');

  let instances, rerollPool, level;

  if (state.savedCatch?.nodeId === node.id && Array.isArray(state.savedCatch.instances)) {
    // Restore persisted choices after a page refresh so the same Pokemon are always shown
    ({ instances, rerollPool, level } = state.savedCatch);
  } else {
    choicesEl.innerHTML = '<div class="loading">Finding Pokemon...</div>';

    let choices = await getCatchChoices(
      getEncounterMapIndex(),
      18,
      state.isEndlessMode ? getEndlessMaxGenId(endlessState.stageNumber) : getStoryModeMaxGenId(),
      state.isEndlessMode ? 1 : getStoryModeMinGenId()
    );
    const isFirstMap = state.currentMap === 0 || (state.isEndlessMode && endlessState.regionNumber === 1 && endlessState.mapIndexInRegion === 0);
    level = isFirstMap ? Math.max(4, getLevelForNode(node)) : getLevelForNode(node);
    const lvlFiltered = choices.filter(sp => minLevelForSpecies(sp.id ?? sp.speciesId) <= level);
    if (lvlFiltered.length > 0) {
      // Pad with ineligible choices if filtering drops below 3 so there are always 3 options
      choices = lvlFiltered.length < 3
        ? [...lvlFiltered, ...choices.filter(sp => !lvlFiltered.includes(sp))].slice(0, 3)
        : lvlFiltered;
    }

    // Nuzlocke map 1: restrict to curated pool
    if (state.nuzlockeMode && state.currentMap === 0) {
      const nuzlockeMap1Ids = new Set([10,11,27,54,56,60,69,72,74,79,81,86,96,98,100,102,111,116,118,120,129,133]);
      const filtered = choices.filter(sp => nuzlockeMap1Ids.has(sp.id ?? sp.speciesId));
      if (filtered.length > 0) choices = filtered;
    }

    // Map 1, layer 1: guarantee at least one Grass AND one Water Pokemon (non-nuzlocke only)
    if (!state.nuzlockeMode && state.currentMap === 0 && node.layer === 1) {
      const grassIds = [43, 69, 102]; // Oddish, Bellsprout, Exeggcute
      const waterIds = [54, 60, 72, 79, 86, 98, 116, 118, 120, 129];
      if (!choices.some(p => p.types?.includes('Grass'))) {
        const id = grassIds[Math.floor(rng() * grassIds.length)];
        const r = await fetchPokemonById(id);
        if (r) choices[0] = r;
      }
      if (!choices.some(p => p.types?.includes('Water'))) {
        const id = waterIds[Math.floor(rng() * waterIds.length)];
        const r = await fetchPokemonById(id);
        if (r) {
          const slot = choices.findIndex(p => !p.types?.includes('Grass'));
          choices[slot === -1 ? 2 : slot] = r;
        }
      }
    }

    // Save all level-filtered candidates before team-dup filters (for reroll pool variety)
    const allCandidates = [...choices];

    const teamRoots = new Set(state.team.map(p => getEvoLineRoot(p.speciesId)));
    if (state.nuzlockeMode) {
      const filtered = choices.filter(sp => !teamRoots.has(getEvoLineRoot(sp.id)));
      choices = (filtered.length > 0 ? filtered : choices).slice(0, 1);
    }
    if (state.isEndlessMode) {
      const filtered = choices.filter(sp => !teamRoots.has(getEvoLineRoot(sp.id ?? sp.speciesId)));
      if (filtered.length > 0) {
        choices = filtered;
        if (choices.length < 3) {
          const lowerIdx = Math.max(0, getEncounterMapIndex() - 1);
          if (lowerIdx < getEncounterMapIndex()) {
            const maxGen = getEndlessMaxGenId(endlessState.stageNumber);
            const lowerPool = await getCatchChoices(lowerIdx, 18, maxGen);
            const choiceRoots = new Set(choices.map(sp => getEvoLineRoot(sp.id ?? sp.speciesId)));
            const extras = lowerPool.filter(sp =>
              !teamRoots.has(getEvoLineRoot(sp.id ?? sp.speciesId)) &&
              !choiceRoots.has(getEvoLineRoot(sp.id ?? sp.speciesId))
            );
            choices = [...choices, ...extras].slice(0, 3);
          }
        }
      }
    }

    if (!state.isEndlessMode && !state.nuzlockeMode && state.currentMap >= 1 && state.team.length > 0) {
      const coveredTypes = getTeamTypeCoverage();
      const orderedCoverage = choices.filter(sp => choiceAddsNewCoverage(sp, coveredTypes));
      const orderedFallback = choices.filter(sp => !choiceAddsNewCoverage(sp, coveredTypes));
      if (orderedCoverage.length > 0) {
        choices = [...orderedCoverage, ...orderedFallback];
      } else {
        const fallbackCoverage = allCandidates.find(sp =>
          !choices.includes(sp) && choiceAddsNewCoverage(sp, coveredTypes)
        );
        if (fallbackCoverage) {
          choices = [...choices.slice(0, Math.max(0, choices.length - 1)), fallbackCoverage];
        }
      }
    }

    const displayedIds = new Set(choices.slice(0, 3).map(sp => sp.id ?? sp.speciesId));
    rerollPool = allCandidates.filter(sp => !displayedIds.has(sp.id ?? sp.speciesId));
    choices = choices.slice(0, 3);

    instances = choices.map(sp => createInstance(sp, sp._legendary ? level + 5 : level, rng() < (hasShinyCharm() ? 0.02 : 0.01), getMoveTierForMap(state.currentMap)));

    state.savedCatch = { nodeId: node.id, instances, rerollPool, level };
    saveRun();
  }

  const rerolled = new Set();

  function renderCatchSlot(inst, slotIdx) {
    const caught = inst.isShiny
      ? !!(getShinyDex()[inst.speciesId])
      : !!(getPokedex()[inst.speciesId]?.caught);
    const myRoot = getEvoLineRoot(inst.speciesId);
    const hofStarterBadge = getHallOfFame().some(e =>
      e.team?.some(p => getEvoLineRoot(p.speciesId) === myRoot)
    );
    const wrapper = document.createElement('div');
    wrapper.innerHTML = renderPokemonCard(inst, true, false, caught, hofStarterBadge);
    const card = wrapper.querySelector('.poke-card');
    card.style.cursor = 'pointer';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', () => catchPokemon(inst, node));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') catchPokemon(inst, node); });
    const wrap = document.createElement('div');
    wrap.className = 'poke-choice-wrap';
    wrap.appendChild(card);
    wrap.insertAdjacentHTML('beforeend', renderTraitPreview(inst, state.team));
    if (state.isEndlessMode && !rerolled.has(slotIdx)) {
      const btn = document.createElement('button');
      btn.className = 'btn-secondary reroll-btn';
      btn.textContent = getText('reroll');
      btn.addEventListener('click', async () => {
        rerolled.add(slotIdx);
        btn.disabled = true;
        // Exclude other displayed slots AND current team members (by evo-line root)
        const otherRoots = new Set([
          ...instances.filter((_, i) => i !== slotIdx).map(i => getEvoLineRoot(i.speciesId)),
          ...state.team.map(p => getEvoLineRoot(p.speciesId)),
        ]);
        let src = rerollPool.filter(sp => !otherRoots.has(getEvoLineRoot(sp.id ?? sp.speciesId)));
        if (src.length === 0) {
          const fresh = await getCatchChoices(
            getEncounterMapIndex(),
            6,
            state.isEndlessMode ? getEndlessMaxGenId(endlessState.stageNumber) : getStoryModeMaxGenId(),
            state.isEndlessMode ? 1 : getStoryModeMinGenId()
          );
          const otherRootsPost = new Set([
            ...instances.filter((_, i) => i !== slotIdx).map(i => getEvoLineRoot(i.speciesId)),
            ...state.team.map(p => getEvoLineRoot(p.speciesId)),
          ]);
          src = fresh.filter(sp => !otherRootsPost.has(getEvoLineRoot(sp.id ?? sp.speciesId)));
          if (src.length === 0) src = fresh;
        }
        if (src.length === 0) return;
        const pick = src[Math.floor(rng() * src.length)];
        // Remove picked from pool so subsequent rerolls can't get the same pokemon
        const pickIdx = rerollPool.indexOf(pick);
        if (pickIdx !== -1) rerollPool.splice(pickIdx, 1);
        const newInst = createInstance(pick, level, rng() < (hasShinyCharm() ? 0.02 : 0.01), getMoveTierForMap(state.currentMap));
        instances[slotIdx] = newInst;
        choicesEl.replaceChild(renderCatchSlot(newInst, slotIdx), choicesEl.children[slotIdx]);
      });
      wrap.appendChild(btn);
    }
    return wrap;
  }

  choicesEl.innerHTML = '';
  for (let i = 0; i < instances.length; i++) {
    choicesEl.appendChild(renderCatchSlot(instances[i], i));
  }

  document.getElementById('btn-skip-catch').onclick = () => {
    state.savedCatch = null;
    state.savedQuestionResolve = null;
    advanceFromNode(state.map, node.id);
    showMapScreen();
  };
}

function checkStarterCollectionAchievements() {
  const hof = getHallOfFame();
  for (let stage = 1; stage <= 5; stage++) {
    const starterIds = REGION_STARTERS[stage];
    if (!starterIds) continue;
    const used = new Set(
      hof
        .filter(e => e.endless && e.stageNumber === stage && e.starterSpeciesId)
        .map(e => e.starterSpeciesId)
    );
    if (starterIds.some(id => used.has(id))) {
      const ach = unlockAchievement(`starters_stage_${stage}`);
      if (ach) showAchievementToast(ach);
    }
  }
}

function checkDexAchievements() {
  if (isPokedexComplete()) {
    const ach = unlockAchievement('pokedex_complete');
    if (ach) showAchievementToast(ach);
  }
  const shinyCount = [...ALL_CATCHABLE_IDS].filter(id => getShinyDex()[id]).length;
  for (const threshold of [100, 200, 300, 400, 500, 600]) {
    if (shinyCount >= threshold) {
      const ach = unlockAchievement(`shinydex_${threshold}`);
      if (ach) showAchievementToast(ach);
    }
  }
  if (isShinyDexComplete()) {
    const ach = unlockAchievement('shinydex_complete');
    if (ach) showAchievementToast(ach);
  }
  if (isShinyGenDexComplete(1, 649)) {
    const ach = unlockAchievement('shinydex_all');
    if (ach) showAchievementToast(ach);
  }
  const genRanges = [
    ['pokedex_gen2', 152, 251],
    ['pokedex_gen3', 252, 386],
    ['pokedex_gen4', 387, 493],
    ['pokedex_gen5', 494, 649],
    ['pokedex_gen6', 650, 721],
  ];
  for (const [id, min, max] of genRanges) {
    if (isGenDexComplete(min, max)) {
      const ach = unlockAchievement(id);
      if (ach) showAchievementToast(ach);
    }
  }
}

function catchPokemon(pokemon, node) {
  const normalUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.speciesId}.png`;
  markPokedexCaught(pokemon.speciesId, pokemon.name, pokemon.types, normalUrl, pokemon.localizedNames);
  if (pokemon.isShiny) markShinyDexCaught(pokemon.speciesId, pokemon.name, pokemon.types, pokemon.spriteUrl, pokemon.localizedNames);
  checkDexAchievements();
  if (state.team.length < 6) {
    loadBuffsIntoPokemon(pokemon);
    state.team.push(pokemon);
    if (state.team.length > state.maxTeamSize) state.maxTeamSize = state.team.length;
    state.savedCatch = null;
    state.savedQuestionResolve = null;
    advanceFromNode(state.map, node.id);
    showMapScreen();
  } else {
    showSwapScreen(pokemon, node);
  }
}

function showSwapScreen(newPoke, node) {
  showScreen('swap-screen');
  const hasRoom = state.team.length < 6;
  const h2 = document.querySelector('#swap-screen h2');
  if (h2) h2.textContent = hasRoom ? getText('new_pokemon') : getText('team_full');
  const swapCaught = !!(getPokedex()[newPoke.speciesId]?.caught);
  document.getElementById('swap-incoming').innerHTML = `<div style="display:flex;justify-content:center;">${renderPokemonCard(newPoke, true, false, swapCaught)}</div>`;
  const el = document.getElementById('swap-choices');
  el.innerHTML = '';
  document.getElementById('swap-prompt').textContent = hasRoom ? getText('add_to_team') : getText('choose_release');

  // Trait overlay (endless mode only)
  let traitOverlay = document.getElementById('swap-trait-overlay');
  if (traitOverlay) traitOverlay.remove();
  if (state.isEndlessMode) {
    traitOverlay = document.createElement('div');
    traitOverlay.id = 'swap-trait-overlay';
    traitOverlay.style.cssText = [
      'position:fixed', 'right:16px', 'top:50%', 'transform:translateY(-50%)',
      'background:var(--bg-card)', 'border:2px solid var(--border)', 'border-radius:8px',
      'padding:10px 12px', 'min-width:150px', 'display:none', 'z-index:200',
      'font-family:"Press Start 2P",monospace', 'box-shadow:2px 2px 0 #000',
    ].join(';');
    document.body.appendChild(traitOverlay);
  }

  const cleanup = () => { if (traitOverlay) traitOverlay.remove(); };

  if (hasRoom) {
    const addBtn = document.createElement('button');
    addBtn.className = 'btn-primary';
    addBtn.style.cssText = 'width:100%;margin-bottom:10px;';
    addBtn.textContent = getText('add_to_team_named', { name: getPokemonDisplayName(newPoke, false) });
    addBtn.addEventListener('click', () => {
      cleanup();
      loadBuffsIntoPokemon(newPoke);
      state.team.push(newPoke);
      if (state.team.length > state.maxTeamSize) state.maxTeamSize = state.team.length;
      state.savedCatch = null;
      state.savedQuestionResolve = null;
      advanceFromNode(state.map, node.id);
      showMapNotification(getText('joined_team', { name: getPokemonDisplayName(newPoke, false) }));
      showMapScreen();
    });
    el.appendChild(addBtn);
  }

  for (let i = 0; i < state.team.length; i++) {
    if (hasRoom) break;
    const p = state.team[i];
    const wrapper = document.createElement('div');
    wrapper.innerHTML = renderPokemonCard(p, true, false);
    const card = wrapper.querySelector('.poke-card');
    card.style.cursor = 'pointer';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    const idx = i;
    card.addEventListener('click', () => {
      cleanup();
      if (newPoke.isShiny) markShinyDexCaught(newPoke.speciesId, newPoke.name, newPoke.types, newPoke.spriteUrl);
      const released = state.team[idx];
      if (released.heldItem) state.items.push(released.heldItem);
      loadBuffsIntoPokemon(newPoke);
      state.team.splice(idx, 1, newPoke);
      state.savedCatch = null;
      state.savedQuestionResolve = null;
      advanceFromNode(state.map, node.id);
      showMapScreen();
    });
    if (traitOverlay) {
      card.addEventListener('mouseenter', () => {
        const hypothetical = state.team.map((m, j) => j === idx ? newPoke : m);
        const cur  = getTraitDisplayData(state.team);
        const next = getTraitDisplayData(hypothetical);
        const curMap  = Object.fromEntries(cur.map(e  => [e.type, e]));
        const nextMap = Object.fromEntries(next.map(e => [e.type, e]));
        const allTypes = [...new Set([...cur.map(e => e.type), ...next.map(e => e.type)])];
        const rows = allTypes.map(type => {
          const c = curMap[type]  || { tier: 0, count: 0 };
          const n = nextMap[type] || { tier: 0, count: 0 };
          const diff = n.tier - c.tier;
          const diffHtml = diff > 0
            ? `<span style="color:#4f4;font-size:7px;">+${diff}</span>`
            : diff < 0
              ? `<span style="color:#f44;font-size:7px;">${diff}</span>`
              : '';
          const tierDots = (t) => 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â'.repeat(t) + 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¹'.repeat(3 - t);
          return `<div style="display:flex;align-items:center;gap:5px;margin-bottom:3px;">
            <span class="type-badge type-${type.toLowerCase()}" style="font-size:5px;padding:1px 3px;min-width:36px;text-align:center;">${type}</span>
            <span style="font-size:7px;color:var(--text-dim);">${tierDots(n.tier)}</span>
            ${diffHtml}
          </div>`;
        }).join('');
        traitOverlay.innerHTML = `
          <div style="font-size:6px;color:var(--text-dim);margin-bottom:6px;letter-spacing:1px;">${getText('traits_after')}</div>
          ${rows || `<div style="font-size:6px;color:var(--text-dim);">${getText('no_active_traits')}</div>`}`;
        traitOverlay.style.display = 'block';
      });
      card.addEventListener('mouseleave', () => { traitOverlay.style.display = 'none'; });
    }
    el.appendChild(card);
  }

  document.getElementById('btn-cancel-swap').onclick = () => {
    cleanup();
    state.savedCatch = null;
    state.savedQuestionResolve = null;
    advanceFromNode(state.map, node.id);
    showMapScreen();
  };
}

function doItemNode(node) {
  showScreen('item-screen');
  renderTeamBar(state.team, document.getElementById('item-team-bar'));
  const regionTier = state.isEndlessMode ? Number.POSITIVE_INFINITY : (state.storyRegionId || 1);

  // Exclude held-type items already in bag or on a Pokemon (usable items can stack)
  const usedIds = new Set([
    ...state.items.filter(it => !it.usable).map(it => it.id),
    ...state.team.filter(p => p.heldItem).map(p => p.heldItem.id),
  ]);
  const heldAvailable = ITEM_POOL.filter(it =>
    !usedIds.has(it.id) &&
    (it.minMap === undefined || state.currentMap >= it.minMap) &&
    (it.minRegion === undefined || regionTier >= it.minRegion)
  );

  // Usable items: filter out ones that can't be applied to current team
  const canUseMaxRevive = state.team.some(p => p.currentHp <= 0);
  const canUseBerryJuice = state.team.some(p => p.currentHp > 0 && p.currentHp < p.maxHp);
  const canUseFullRestore = state.team.some(p => p.currentHp > 0 && (p.currentHp < p.maxHp || !!p.status));
  const canUseMaxPotion = state.team.some(p => p.currentHp > 0 && p.currentHp < p.maxHp);
  const canUseEvoStone  = state.team.some(p => {
    if (p.speciesId === 133) return true;
    const evo = EVOLUTIONS[p.speciesId];
    return evo && evo.into !== p.speciesId;
  });
  const usableAvailable = USABLE_ITEM_POOL.filter(it => {
    if (it.minRegion !== undefined && regionTier < it.minRegion) return false;
    if (it.id === 'max_revive') return canUseMaxRevive;
    if (it.id === 'berry_juice') return canUseBerryJuice;
    if (it.id === 'full_restore') return canUseFullRestore;
    if (it.id === 'max_potion') return canUseMaxPotion;
    if (it.id === 'moon_stone')  return canUseEvoStone;
    return true;
  });

  const available = [...heldAvailable, ...usableAvailable];
  const shuffled = [...available].sort(() => rng() - 0.5);
  const picks = shuffled.slice(0, 3);
  const regionFresh = available.filter(item => item.minRegion === regionTier);
  if (!state.isEndlessMode && regionFresh.length > 0 && !picks.some(item => item.minRegion === regionTier)) {
    picks[Math.max(0, picks.length - 1)] = regionFresh[Math.floor(rng() * regionFresh.length)];
  }
  if (!state.isEndlessMode && state.currentMap >= 4 && usableAvailable.length > 0 && !picks.some(item => item.usable)) {
    picks[Math.max(0, picks.length - 1)] = usableAvailable[Math.floor(rng() * usableAvailable.length)];
  }

  const el = document.getElementById('item-choices');
  el.innerHTML = '';
  for (const item of picks) {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = `<div class="item-icon">${itemIconHtml(item, 36)}</div>
      <div class="item-name">${item.name}</div>
      <div class="item-desc">${item.desc}</div>
      ${item.usable ? `<div style="font-size:9px;color:#4af;margin-top:4px;">${getText('usable_item')}</div>` : ''}`;
    div.style.cursor = 'pointer';
    div.addEventListener('click', () => {
      state.pickedUpItem = true;
      if (item.usable) {
        state.items.push({ ...item });
        advanceFromNode(state.map, node.id);
        showMapScreen();
      } else {
        openItemEquipModal(item, {
          onComplete: () => { advanceFromNode(state.map, node.id); showMapScreen(); },
        });
      }
    });
    el.appendChild(div);
  }

  document.getElementById('btn-skip-item').onclick = () => {
    advanceFromNode(state.map, node.id);
    showMapScreen();
  };
}

function openItemEquipModal(item, { fromBagIdx = -1, fromPokemonIdx = -1, onComplete = null } = {}) {
  document.getElementById('item-equip-modal')?.remove();

  const done = onComplete || (() => {
    renderItemBadges(state.items);
    renderTeamBar(state.team);
  });

  const modal = document.createElement('div');
  modal.id = 'item-equip-modal';
  modal.className = 'item-equip-overlay';

  const rows = state.team.map((p, i) => {
    const isSelf = fromPokemonIdx === i;
    const hasHeld = !!p.heldItem;
    const btnLabel = isSelf ? getText('item_btn_holding') : hasHeld ? getText('item_btn_swap') : getText('item_btn_equip');
    return `<div class="equip-pokemon-row">
      <img src="${p.spriteUrl}" class="equip-poke-sprite" onerror="this.style.display='none'">
      <div class="equip-poke-info">
        <div class="equip-poke-name">${p.nickname || p.name}</div>
        <div class="equip-poke-lv">Lv${p.level}</div>
      </div>
      <div class="equip-held-slot">
        ${hasHeld
          ? `<span class="equip-held-item" title="${p.heldItem.desc}">${itemIconHtml(p.heldItem, 18)} ${p.heldItem.name}</span>`
          : `<span class="equip-empty-slot">${getText('item_slot_empty')}</span>`}
      </div>
      <div class="equip-btn-group">
        ${isSelf
          ? `<button class="equip-btn equip-btn-unequip-full" data-unequip="${i}">${getText('item_btn_unequip')}</button>`
          : `<button class="equip-btn${hasHeld ? ' equip-btn-swap' : ''}" data-idx="${i}">${btnLabel}</button>`}
        ${hasHeld && !isSelf ? `<button class="equip-btn equip-btn-unequip-icon" data-unequip="${i}" title="${getText('item_btn_unequip_title', { name: p.heldItem.name })}">&times;</button>` : ''}
      </div>
    </div>`;
  }).join('');

  modal.innerHTML = `
    <div class="item-equip-box">
      <div class="equip-item-header">
        <span class="equip-item-icon">${itemIconHtml(item, 32)}</span>
        <div>
          <div class="equip-item-name">${item.name}</div>
          <div class="equip-item-desc">${item.desc}</div>
        </div>
      </div>
      <div class="equip-pokemon-list">${rows}</div>
      <button id="btn-equip-to-bag" class="btn-secondary" style="width:100%;margin-top:8px;">
        ${fromPokemonIdx >= 0 ? getText('item_return_to_bag') : getText('item_keep_in_bag')}
      </button>
      <button id="btn-equip-cancel" class="btn-secondary" style="width:100%;margin-top:4px;">${getText('btn_cancel')}</button>
    </div>`;

  document.body.appendChild(modal);

  // Unequip buttons ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â strip item off a Pokemon and bag it, without equipping current item
  modal.querySelectorAll('[data-unequip]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.unequip);
      const pokemon = state.team[idx];
      if (pokemon.heldItem) {
        state.items.push(pokemon.heldItem);
        pokemon.heldItem = null;
      }
      modal.remove();
      done();
    });
  });

  modal.querySelectorAll('button[data-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      const pokemon = state.team[idx];
      const displaced = pokemon.heldItem;

      // Remove item from its source
      if (fromBagIdx >= 0) {
        state.items.splice(fromBagIdx, 1);
        if (displaced) state.items.push(displaced);
      } else if (fromPokemonIdx >= 0) {
        // True swap: give the displaced item back to the source Pokemon
        state.team[fromPokemonIdx].heldItem = displaced || null;
      } else {
        // Brand new item from a node ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â displaced item goes to bag
        if (displaced) state.items.push(displaced);
      }

      pokemon.heldItem = item;
      modal.remove();
      done();
    });
  });

  modal.querySelector('#btn-equip-to-bag').addEventListener('click', () => {
    if (fromPokemonIdx >= 0) {
      state.team[fromPokemonIdx].heldItem = null;
      state.items.push(item);
    } else if (fromBagIdx < 0) {
      // Brand new item ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â put in bag
      state.items.push(item);
    }
    // fromBagIdx >= 0 means it's already in bag ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â do nothing
    modal.remove();
    done();
  });

  modal.querySelector('#btn-equip-cancel').addEventListener('click', () => {
    modal.remove();
  });

}

function openUsableItemModal(item, bagIdx) {
  document.getElementById('usable-item-modal')?.remove();

  const canTarget = p => {
    if (item.id === 'max_revive') return p.currentHp <= 0;
    if (item.id === 'berry_juice') return p.currentHp > 0 && p.currentHp < p.maxHp;
    if (item.id === 'full_restore') return p.currentHp > 0 && (p.currentHp < p.maxHp || !!p.status);
    if (item.id === 'max_potion') return p.currentHp > 0 && p.currentHp < p.maxHp;
    if (item.id === 'moon_stone') {
      if (p.speciesId === 133) return true;
      const evo = EVOLUTIONS[p.speciesId];
      return !!(evo && evo.into !== p.speciesId);
    }
    return true;
  };

  const rows = state.team.map((p, i) => {
    const enabled = canTarget(p);
    const statusText = p.currentHp <= 0 ? getText('item_status_fainted') : `${p.currentHp}/${p.maxHp} HP`;
    return `<div class="equip-pokemon-row" data-idx="${i}"
        style="${enabled ? 'cursor:pointer;' : 'opacity:0.4;cursor:default;pointer-events:none;'}">
      <img src="${p.spriteUrl}" class="equip-poke-sprite" onerror="this.style.display='none'">
      <div class="equip-poke-info">
        <div class="equip-poke-name">${p.nickname || p.name}</div>
        <div class="equip-poke-lv">Lv${p.level} - ${statusText}</div>
      </div>
    </div>`;
  }).join('');

  const modal = document.createElement('div');
  modal.id = 'usable-item-modal';
  modal.className = 'item-equip-overlay';
  modal.innerHTML = `
    <div class="item-equip-box">
      <div class="equip-item-header">
        <span class="equip-item-icon">${itemIconHtml(item, 32)}</span>
        <div>
          <div class="equip-item-name">${item.name}</div>
          <div class="equip-item-desc">${item.desc}</div>
        </div>
      </div>
      <div class="equip-pokemon-list">${rows}</div>
      <button id="btn-cancel-use" class="btn-secondary" style="width:100%;margin-top:8px;">${getText('btn_cancel')}</button>
    </div>`;
  document.body.appendChild(modal);

  modal.querySelector('#btn-cancel-use').addEventListener('click', () => modal.remove());

  modal.querySelectorAll('[data-idx]').forEach(row => {
    if (row.style.pointerEvents === 'none') return;
    row.addEventListener('click', async () => {
      const idx = parseInt(row.dataset.idx);
      const pokemon = state.team[idx];
      modal.remove();
      state.items.splice(bagIdx, 1);

      if (item.id === 'max_revive') {
        pokemon.currentHp = pokemon.maxHp;
        showMapNotification(getText('revived_notification', { name: getPokemonDisplayName(pokemon) }));
        renderItemBadges(state.items);
        renderTeamBar(state.team);

      } else if (item.id === 'berry_juice') {
        pokemon.currentHp = Math.min(pokemon.maxHp, pokemon.currentHp + 20);
        showMapNotification(getText('healed_notification', { name: getPokemonDisplayName(pokemon) }));
        renderItemBadges(state.items);
        renderTeamBar(state.team);

      } else if (item.id === 'full_restore') {
        pokemon.currentHp = pokemon.maxHp;
        pokemon.status = null;
        showMapNotification(getText('restored_notification', { name: getPokemonDisplayName(pokemon) }));
        renderItemBadges(state.items);
        renderTeamBar(state.team);

      } else if (item.id === 'max_potion') {
        pokemon.currentHp = pokemon.maxHp;
        showMapNotification(getText('healed_notification', { name: getPokemonDisplayName(pokemon) }));
        renderItemBadges(state.items);
        renderTeamBar(state.team);

      } else if (item.id === 'rare_candy') {
        for (let i = 0; i < 3; i++) {
          if (pokemon.level < 100) pokemon.level++;
        }
        showMapNotification(getText('level_grew_notification', { name: getPokemonDisplayName(pokemon), level: pokemon.level }));
        renderItemBadges(state.items);
        renderTeamBar(state.team);
        await checkAndEvolveTeam();

      } else if (item.id === 'moon_stone') {
        renderItemBadges(state.items);
        await applyEvolution(pokemon);

      }
    });
  });
}

async function applyEvolution(pokemon) {
  let evo;
  const branchingChoices = BRANCHING_EVOLUTIONS[pokemon.speciesId];
  if (branchingChoices) {
    evo = await showBranchingChoice(pokemon, branchingChoices);
  } else {
    evo = EVOLUTIONS[pokemon.speciesId];
    if (!evo) return;
  }

  await playEvoAnimation(pokemon, evo);

  const oldHpRatio = pokemon.currentHp / pokemon.maxHp;
  const newSpecies = await fetchPokemonById(evo.into);

  pokemon.speciesId = evo.into;
  pokemon.spriteUrl = pokemon.isShiny
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${evo.into}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.into}.png`;

  if (newSpecies) {
    pokemon.defaultName = newSpecies.defaultName || newSpecies.name;
    pokemon.localizedNames = normalizeLocalizedPokemonNames(newSpecies.localizedNames, newSpecies.defaultName || newSpecies.name);
    if (!pokemon.nickname) pokemon.name = getPokemonLocalizedName(pokemon);
    pokemon.types     = newSpecies.types;
    pokemon.baseStats = newSpecies.baseStats;
    const hpBuff      = pokemon.statBuffs?.hp ?? 0;
    const newMax      = Math.floor(calcHp(newSpecies.baseStats.hp, pokemon.level) * (1 + 0.1 * hpBuff));
    pokemon.maxHp     = newMax;
    pokemon.currentHp = Math.max(1, Math.floor(oldHpRatio * newMax));
  } else if (!pokemon.nickname) {
    pokemon.name = evo.name;
  }

  const normalUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.speciesId}.png`;
  markPokedexCaught(pokemon.speciesId, pokemon.name, pokemon.types, normalUrl, pokemon.localizedNames);
  if (pokemon.isShiny) markShinyDexCaught(pokemon.speciesId, pokemon.name, pokemon.types, pokemon.spriteUrl, pokemon.localizedNames);
  checkDexAchievements();
  renderItemBadges(state.items);
  renderTeamBar(state.team);
  saveRun();
}

function doPokeCenterNode(node) {
  state.usedPokecenter = true;
  for (const p of state.team) p.currentHp = p.maxHp;
  advanceFromNode(state.map, node.id);
  showMapScreen();
  showMapNotification(getText('pokecenter_heal'));
}

// ---- Trainer Battle Node ----

// Species pools for each trainer archetype (Gen 1 IDs).
// null = use the map's random BST pool instead.
const TRAINER_BATTLE_CONFIG = {
  bugCatcher:  { name: 'Bug Catcher',   sprite: 'bugcatcher',
                 pool: [10,11,12,13,14,15,46,47,48,49,123,127] },
  hiker:       { name: 'Hiker',         sprite: 'hiker',
                 pool: [27,28,50,51,66,67,68,74,75,76,95,111,112] },
  fisher:      { name: 'Fisherman',     sprite: 'fisherman',
                 pool: [54,55,60,61,62,72,73,86,87,90,91,98,99,116,117,118,119,129,130] },
  Scientist:   { name: 'Scientist',     sprite: 'scientist',
                 pool: [81,82,88,89,92,93,94,100,101,137] },
  teamRocket:  { name: 'Rocket Grunt',  sprite: 'teamrocket',
                 pool: [19,20,23,24,41,42,52,53,88,89,109,110] },
  policeman:   { name: 'Officer',       sprite: 'policeman',
                 pool: [58,59] },
  fireSpitter: { name: 'Fire Trainer',  sprite: 'burglar',
                 pool: [4,5,6,37,38,58,59,77,78,126,136] },
  aceTrainer:  { name: 'Ace Trainer',   sprite: 'acetrainer', pool: null },
  oldGuy:      { name: 'Old Man',       sprite: 'gentleman',    pool: null },
};

async function doTrainerNode(node) {
  const key = node.trainerSprite || 'aceTrainer';
  const config = TRAINER_BATTLE_CONFIG[key] || TRAINER_BATTLE_CONFIG.aceTrainer;
  let teamSize;
  if (state.isEndlessMode) {
    const slot = (endlessState.regionNumber - 1) * 3 + endlessState.mapIndexInRegion;
    const bossSize = ENDLESS_TEAM_SIZES[slot] ?? 4;
    teamSize = Math.max(1, bossSize - 1);
  } else {
    teamSize = state.currentMap === 0 ? 1 : state.currentMap <= 2 ? 2 : 3;
  }
  const level = getLevelForNode(node);
  const moveTier = getMoveTierForMap(state.currentMap);

  let speciesList;
  if (config.pool) {
    // Dedupe pool, filter out evolved forms the battle level can't reach, then shuffle
    const eligible = [...new Set(config.pool)]
      .filter(id => minLevelForSpecies(id) <= level);
    const pool = eligible.length ? eligible : [...new Set(config.pool)]; // fallback: use full pool
    const shuffled = pool.sort(() => rng() - 0.5);
    const ids = Array.from({ length: teamSize }, (_, i) => resolveEvoForLevel(shuffled[i % shuffled.length], level));
    const fetched = await Promise.all(ids.map(id => fetchPokemonById(id)));
    speciesList = fetched.filter(Boolean);
  } else {
    const rawChoices = await getCatchChoices(
      getEncounterMapIndex(),
      3,
      state.isEndlessMode ? getEndlessMaxGenId(endlessState.stageNumber) : getStoryModeMaxGenId(),
      state.isEndlessMode ? 1 : getStoryModeMinGenId()
    );
    speciesList = (await Promise.all(rawChoices.slice(0, teamSize).map(async sp => {
      const rawId = sp.id ?? sp.speciesId;
      const evoId = resolveEvoForLevel(rawId, level);
      return evoId !== rawId ? (await fetchPokemonById(evoId) || sp) : sp;
    }))).filter(Boolean);
  }

  if (!speciesList.length) { advanceFromNode(state.map, node.id); showMapScreen(); return; }
  const ENDLESS_ENEMY_ITEM_POOL = [
    { id: 'choice_band',  name: 'Choice Band',  icon: 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬' },
    { id: 'choice_specs', name: 'Choice Specs', icon: 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¹Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ' },
    { id: 'choice_scarf', name: 'Choice Scarf', icon: 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£' },
    { id: 'life_orb',     name: 'Life Orb',     icon: 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â®' },
    { id: 'rocky_helmet', name: 'Rocky Helmet', icon: 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂºÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¹Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â' },
    { id: 'leftovers',    name: 'Leftovers',    icon: 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“' },
    { id: 'shell_bell',   name: 'Shell Bell',   icon: 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â' },
    { id: 'assault_vest', name: 'Assault Vest', icon: 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âº' },
    { id: 'scope_lens',   name: 'Scope Lens',   icon: 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­' },
  ];
  const enemyTeam = speciesList.map(sp => {
    const inst = createInstance(sp, getAdjustedEnemyLevel(level, false, 'trainer'), false, moveTier);
    if (state.isEndlessMode && rng() < 0.25)
      inst.heldItem = ENDLESS_ENEMY_ITEM_POOL[Math.floor(rng() * ENDLESS_ENEMY_ITEM_POOL.length)];
    return inst;
  });

  const titleEl = document.getElementById('battle-title');
  const subEl   = document.getElementById('battle-subtitle');
  const trainerName = getTrainerClassDisplayName(key);
  if (titleEl) titleEl.textContent = getText('trainer_wants_to_battle', { name: trainerName });
  if (subEl)   subEl.textContent   = getText('trainer_team_summary', { count: enemyTeam.length, level });

  const won = await new Promise(resolve => {
    runBattleScreen(enemyTeam, false, () => resolve(true), () => resolve(false), config.sprite, [], 2, true);
  });
  if (!won) { showGameOver(); return; }
  if (state.isEndlessMode) await applyEndlessBugTrait();
  advanceFromNode(state.map, node.id);
  showMapScreen();
}

// ---- Legendary Node ----

async function doLegendaryNode(node) {
  const teamLegendIds = state.team.map(p => p.speciesId);
  const maxLegendId = state.isEndlessMode ? getEndlessMaxGenId(endlessState.stageNumber) : getStoryModeMaxGenId();
  const minLegendId = state.isEndlessMode ? 1 : getStoryModeMinGenId();
  const available = LEGENDARY_IDS.filter(id => id >= minLegendId && id <= maxLegendId && !teamLegendIds.includes(id));
  if (available.length === 0) { advanceFromNode(state.map, node.id); showMapScreen(); return; }
  const legendId = available[Math.floor(rng() * available.length)];
  const species = await fetchPokemonById(legendId);
  if (!species) { advanceFromNode(state.map, node.id); showMapScreen(); return; }

  const level = state.isEndlessMode ? getLevelForNode(node) + 5 : MAP_LEVEL_RANGES[state.currentMap][1];
  const legendary = createInstance(species, level, rng() < (hasShinyCharm() ? 0.02 : 0.01), 2);

  const titleEl = document.getElementById('battle-title');
  const subEl = document.getElementById('battle-subtitle');
  if (titleEl) titleEl.textContent = getText('legendary_appeared', { name: legendary.name });
  if (subEl) subEl.textContent = getText('legendary_subtitle', { level: legendary.level });

  await runBattleScreen([legendary], false, async () => {
    // Win ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â offer to add legendary to team
    const normalUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${legendary.speciesId}.png`;
    markPokedexCaught(legendary.speciesId, legendary.name, legendary.types, normalUrl);
    if (legendary.isShiny) markShinyDexCaught(legendary.speciesId, legendary.name, legendary.types, legendary.spriteUrl);
    checkDexAchievements();
    showSwapScreen(legendary, node);
  }, () => {
    showGameOver();
  }, null, [], 0); // Legendary battles give 0 extra levels (already challenging enough)
}

// ---- Move Tutor Node ----

function doMoveTutorNode(node) {
  document.getElementById('item-equip-modal')?.remove();

  const modal = document.createElement('div');
  modal.id = 'item-equip-modal';
  modal.className = 'item-equip-overlay';

  const rows = state.team.map((p, i) => {
    const tier = p.moveTier ?? 1;
    const maxed = tier >= 2;
    const currentMove = getBestMove(p.types || ['Normal'], p.baseStats, p.speciesId, tier);
    const nextMove = !maxed ? getBestMove(p.types || ['Normal'], p.baseStats, p.speciesId, tier + 1) : null;
    const tierLabel = ['Tier 1', 'Tier 2', 'Mastered'][tier];
    return `<div class="equip-pokemon-row" style="${maxed ? 'opacity:0.45;' : ''}">
      <img src="${p.spriteUrl}" class="equip-poke-sprite" onerror="this.style.display='none'">
      <div class="equip-poke-info">
        <div class="equip-poke-name">${p.nickname || p.name}</div>
        <div class="equip-poke-lv">Lv${p.level} &bull; ${currentMove.name} (${tierLabel})</div>
      </div>
      <div class="equip-btn-group">
        ${maxed
          ? `<span style="font-size:10px;color:#888;">Mastered</span>`
          : `<button class="equip-btn" data-tutor="${i}">Learn ${nextMove.name}</button>`}
      </div>
    </div>`;
  }).join('');

  modal.innerHTML = `
    <div class="item-equip-box">
      <div class="equip-item-header">
        <span class="equip-item-icon" style="font-size:24px;letter-spacing:1px;">MT</span>
        <div>
          <div class="equip-item-name">Move Tutor</div>
          <div class="equip-item-desc">Teach one Pokemon a more powerful move.</div>
        </div>
      </div>
      <div class="equip-pokemon-list">${rows}</div>
      <button id="btn-skip-tutor" class="btn-secondary" style="width:100%;margin-top:8px;">${getText('skip')}</button>
    </div>`;

  document.body.appendChild(modal);

  const finish = () => {
    modal.remove();
    advanceFromNode(state.map, node.id);
    showMapScreen();
  };

  modal.querySelectorAll('button[data-tutor]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.tutor);
      const pokemon = state.team[idx];
      pokemon.moveTier = Math.min(2, (pokemon.moveTier ?? 1) + 1);
      const newMove = getBestMove(pokemon.types || ['Normal'], pokemon.baseStats, pokemon.speciesId, pokemon.moveTier);
      modal.remove();
      advanceFromNode(state.map, node.id);
      showMapScreen();
      showMapNotification(getText('learned_move_notification', { name: getPokemonDisplayName(pokemon), move: newMove.name }));
    });
  });

  modal.querySelector('#btn-skip-tutor').addEventListener('click', finish);
}

// ---- Trade Node ----

async function doTradeNode(node) {
  showScreen('trade-screen');
  document.getElementById('trade-desc').textContent = "Trade one of your Pokemon for a random Pokemon 3 levels higher.";

  const listEl = document.getElementById('trade-team-list');
  listEl.innerHTML = '';

  for (let i = 0; i < state.team.length; i++) {
    const mine = state.team[i];
    const li = document.createElement('li');
    li.className = 'trade-member-row';
    li.innerHTML = `
      <div class="trade-member-card-wrap">
        ${renderPokemonCard(mine, false, false, false)}
      </div>
      <div class="trade-member-action">Trade for +3 Lv</div>
    `;

    const idx = i;
    const doTrade = async () => {
      let pool = await getCatchChoices(
        getEncounterMapIndex(),
        3,
        state.isEndlessMode ? getEndlessMaxGenId(endlessState.stageNumber) : getStoryModeMaxGenId(),
        state.isEndlessMode ? 1 : getStoryModeMinGenId()
      );
      const species = pool[Math.floor(rng() * pool.length)];
      if (!species) { advanceFromNode(state.map, node.id); showMapScreen(); return; }
      const offerLevel = Math.min(100, mine.level + 3);
      const offer = createInstance(species, offerLevel, rng() < (hasShinyCharm() ? 0.02 : 0.01), Math.max(getMoveTierForMap(state.currentMap), mine.moveTier ?? 0));
      const released = state.team[idx];
      if (released.heldItem) state.items.push(released.heldItem);
      loadBuffsIntoPokemon(offer);
      state.team.splice(idx, 1, offer);
      const normalUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offer.speciesId}.png`;
      markPokedexCaught(offer.speciesId, offer.name, offer.types, normalUrl);
      if (offer.isShiny) markShinyDexCaught(offer.speciesId, offer.name, offer.types, offer.spriteUrl);
      checkDexAchievements();
      advanceFromNode(state.map, node.id);

      // Show full-screen reveal
      showScreen('shiny-screen');
      document.getElementById('shiny-content').innerHTML = `
        <div class="shiny-title">${getText('trade_received', { name: offer.name })}</div>
        <div style="color:var(--text-dim);font-size:10px;margin-bottom:8px;">
          ${getText('trade_sent_away', { name: getPokemonDisplayName(released) })}</div>
        ${renderPokemonCard(offer, false, false, false)}
        <button id="btn-trade-continue" class="btn-primary" style="margin-top:12px;">${getText('continue')}</button>
      `;
      document.getElementById('btn-trade-continue').onclick = () => showMapScreen();
    };

    li.addEventListener('click', doTrade);
    listEl.appendChild(li);
  }

  document.getElementById('btn-skip-trade').onclick = () => {
    advanceFromNode(state.map, node.id);
    showMapScreen();
  };
}

async function doShinyNode(node) {
  let choices = await getCatchChoices(
    getEncounterMapIndex(),
    3,
    state.isEndlessMode ? getEndlessMaxGenId(endlessState.stageNumber) : getStoryModeMaxGenId(),
    state.isEndlessMode ? 1 : getStoryModeMinGenId()
  );
  const level = getLevelForNode(node);
  const species = choices[0];
  if (!species) { advanceFromNode(state.map, node.id); showMapScreen(); return; }

  const shiny = createInstance(species, level, true, getMoveTierForMap(state.currentMap));

  const shinyCaught = !!(getShinyDex()[shiny.speciesId]);
  showScreen('shiny-screen');
  document.getElementById('shiny-content').innerHTML = `
    <div class="shiny-title">${getText('shiny_appeared', { name: shiny.name })}</div>
    <div class="poke-choice-wrap">
      ${renderPokemonCard(shiny, false, false, shinyCaught)}
      ${renderTraitPreview(shiny, state.team)}
    </div>
    <button id="btn-take-shiny" class="btn-primary">${getText('add_to_team_named', { name: shiny.name })}</button>
    <button id="btn-skip-shiny" class="btn-secondary" style="margin-top:6px;">${getText('skip')}</button>
  `;
  document.getElementById('btn-take-shiny').onclick = () => {
    if (state.team.length < 6) {
      const normalUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${shiny.speciesId}.png`;
      markPokedexCaught(shiny.speciesId, shiny.name, shiny.types, normalUrl);
      markShinyDexCaught(shiny.speciesId, shiny.name, shiny.types, shiny.spriteUrl);
      checkDexAchievements();
      loadBuffsIntoPokemon(shiny);
      state.team.push(shiny);
      if (state.team.length > state.maxTeamSize) state.maxTeamSize = state.team.length;
      advanceFromNode(state.map, node.id);
      showMapScreen();
    } else {
      showSwapScreen(shiny, node);
    }
  };
  document.getElementById('btn-skip-shiny').onclick = () => {
    advanceFromNode(state.map, node.id);
    showMapScreen();
  };
}


// ---- Battle Screen ----

function runBattleScreen(enemyTeam, isBoss, onWin, onLose, enemyName = null, enemyItems = [], baseGainOverride = null, showPlayerPortrait = null, traitsConfig = null) {
  // In endless mode, always apply traits ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â compute them if not pre-computed by the caller
  if (state.isEndlessMode && traitsConfig === null) {
    const tiers = computeTraitTiers(state.team);
    traitsConfig = buildTraitsConfig(tiers, {});
    renderBattleTraitBars(tiers, null);
  }

  return new Promise(async resolve => {
    // Clean up trait bars when the battle resolves (works for both win and loss paths)
    const _origResolve = resolve;
    resolve = (val) => { if (state.isEndlessMode) clearBattleTraitBars(); _origResolve(val); };
    showScreen('battle-screen');
    const showPlayer = showPlayerPortrait !== null ? showPlayerPortrait : !!(isBoss || enemyName);
    renderTrainerIcons(state.trainer, enemyName || null, showPlayer);

    const pTeamCopy = state.team.map(p => ({ ...p }));
    // enemyTeam HP init (runBattle will deep-copy, but we need initial state for animation)
    const eTeamInit = enemyTeam.map(p => ({
      ...p,
      currentHp: p.currentHp !== undefined ? p.currentHp : calcHp(p.baseStats.hp, p.level),
      maxHp: p.maxHp !== undefined ? p.maxHp : calcHp(p.baseStats.hp, p.level),
    }));

    renderBattleField(pTeamCopy, eTeamInit);

    // Pre-compute the full battle result
    const { playerWon, detailedLog, pTeam: resultP, eTeam: resultE, playerParticipants } = runBattle(
      pTeamCopy, enemyTeam, state.items, enemyItems, null, traitsConfig
    );

    // Read auto-skip settings
    const settings = getSettings();
    const autoSkip = settings.autoSkipAllBattles || (!isBoss && settings.autoSkipBattles);

    // Set up Skip button
    const skipBtn = document.getElementById('btn-auto-battle');
    skipBtn.disabled = false;
    skipBtn.textContent = getText('skip');
    battleSpeedMultiplier = autoSkip ? SKIP_SPEED : 1;
    skipBtn.style.display = autoSkip ? 'none' : 'block';
    let manuallySkipped = false;
    if (!autoSkip) {
      skipBtn.onclick = () => { battleSpeedMultiplier = SKIP_SPEED; skipBtn.disabled = true; manuallySkipped = true; };
    }

    const continueEl = document.getElementById('btn-continue-battle');
    continueEl.style.display = 'none';
    continueEl.textContent = getText('continue');
    continueEl.disabled = false;

    // Auto-start visual animation
    await animateBattleVisually(detailedLog, pTeamCopy, eTeamInit);

    // Show final HP state after animation
    renderBattleField(resultP, resultE);

    if (playerWon) {
      // Sync battle-result HP onto state team, then apply level gains
      for (let i = 0; i < state.team.length; i++) {
        if (resultP[i]) state.team[i].currentHp = resultP[i].currentHp;
      }
      const maxEnemyLevel = Math.max(...resultE.map(p => p.level));
      const levelUps = applyLevelGain(state.team, state.nuzlockeMode ? [] : state.items, playerParticipants, maxEnemyLevel, state.nuzlockeMode, baseGainOverride);
      const skipAll = autoSkip || manuallySkipped;
      battleSpeedMultiplier = skipAll ? SKIP_SPEED : 1;
      skipBtn.textContent = getText('skip');
      skipBtn.style.display = skipAll ? 'none' : 'block';
      if (!skipAll) {
        skipBtn.disabled = false;
        skipBtn.onclick = () => { battleSpeedMultiplier = SKIP_SPEED; skipBtn.disabled = true; manuallySkipped = true; };
      }

      const continueBtn = document.getElementById('btn-continue-battle');
      if (!skipAll) {
        continueBtn.style.display = 'block';
        continueBtn.onclick = () => { battleSpeedMultiplier = 1000; manuallySkipped = true; continueBtn.disabled = true; };
      }

      await animateLevelUp(levelUps);
      skipBtn.style.display = 'none';
      await checkAndEvolveTeam();

      // Nuzlocke: remove fainted Pokemon permanently, return their items to bag
      if (state.nuzlockeMode) {
        const fainted = state.team.filter(p => p.currentHp <= 0);
        for (const p of fainted) {
          if (p.heldItem) state.items.push(p.heldItem);
        }
        state.team = state.team.filter(p => p.currentHp > 0);
        if (fainted.length > 0) { renderTeamBar(state.team); renderItemBadges(state.items); }
        if (state.team.length === 0) {
          showGameOver();
          resolve(false);
          return;
        }
      }

      if (skipAll || manuallySkipped) {
        if (onWin) onWin();
        resolve(true);
      } else {
        continueBtn.disabled = false;
        continueBtn.onclick = () => { if (onWin) onWin(); resolve(true); };
      }
    } else {
      skipBtn.style.display = 'none';
      document.getElementById('btn-continue-battle').style.display = 'block';
      document.getElementById('btn-continue-battle').textContent = getText('continue_ellipsis');
      document.getElementById('btn-continue-battle').onclick = () => {
        if (onLose) onLose();
        resolve(false);
      };
    }
  });
}

// ---- End Screens ----

function fullyHealTeam() {
  for (const pokemon of state.team || []) {
    pokemon.currentHp = pokemon.maxHp;
    pokemon.status = null;
  }
}

function showBadgeScreen(leader, coinReward = 0) {
  fullyHealTeam();
  showScreen('badge-screen');
  const region = getCurrentStoryRegion();
  document.getElementById('badge-msg').textContent = getText('badge_earned', { badge: leader.badge });
  document.getElementById('badge-leader').textContent = getText('region_gym_progress', { region: region.name, count: state.badges });
  document.getElementById('badge-count-display').textContent = getText('badges_progress', { count: state.badges }) + (coinReward > 0 ? ' - +' + coinReward + ' Coins' : '');
  const badgeImg = document.getElementById('badge-icon-img');
  if (badgeImg) {
    if (region.badgeDisplay === 'sprite') {
      badgeImg.style.display = '';
      badgeImg.src = leader.badgeImage || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/${state.badges}.png`;
      badgeImg.alt = leader.badge;
    } else {
      badgeImg.style.display = 'none';
      badgeImg.removeAttribute('src');
    }
  }

  document.getElementById('btn-next-map').onclick = () => {
    if (state.currentMap >= 7) {
      state.eliteIndex = 0;
      startMap(8);
    } else {
      startMap(state.currentMap + 1);
    }
  };
}

async function showGameOver() {
  localStorage.setItem('poke_win_streak', '0');
  clearSavedRun();
  clearEndlessState();
  if (typeof syncToCloud === 'function') {
    await Promise.race([syncToCloud(), new Promise(r => setTimeout(r, 3000))]);
  }
  initGame();
}

function showWinScreen(coinReward = 0) {
  clearSavedRun();
  showScreen('win-screen');
  const region = getCurrentStoryRegion();
  document.getElementById('win-team').innerHTML = state.team.map(p => {
    const itemHtml = p.heldItem
      ? `<div class="win-team-item">${itemIconHtml(p.heldItem, 14)}<span>${p.heldItem.name}</span></div>`
      : '';
    return `<div class="win-team-entry">${renderPokemonCard(p, false, false)}${itemHtml}</div>`;
  }).join('');
  document.getElementById('btn-play-again').onclick = () => startNewRun(state.nuzlockeMode);

  // Track elite four wins
  const wins = incrementEliteWins();
  if (getStoryRegionConfig(region.id + 1)?.id === region.id + 1) {
    unlockStoryRegion(region.id + 1);
  }
  saveHallOfFameEntry(state.team, wins, state.nuzlockeMode, false, null, state.starterSpeciesId, state.storyRegionId || 1);
  refreshEndlessButton();
  const winsEl = document.getElementById('win-run-count');
  if (winsEl) winsEl.textContent = getText('win_run_count', { region: region.name, num: wins }) + (coinReward > 0 ? ' - +' + coinReward + ' Coins' : '');
  if (wins === 10) {
    const ach = unlockAchievement('elite_10');
    if (ach) setTimeout(() => showAchievementToast(ach), 3000);
  }
  if (wins === 100) {
    const ach = unlockAchievement('elite_100');
    if (ach) setTimeout(() => showAchievementToast(ach), 3000);
  }

  // Starter line achievement
  const sid = state.starterSpeciesId;
  const STARTER_RUN_ACHIEVEMENTS = {
    1: 'starter_1', 4: 'starter_4', 7: 'starter_7',
    152: 'starter_152', 155: 'starter_155', 158: 'starter_158',
    252: 'starter_252', 255: 'starter_255', 258: 'starter_258',
    387: 'starter_387', 390: 'starter_390', 393: 'starter_393',
    495: 'starter_495', 498: 'starter_498', 501: 'starter_501',
    650: 'starter_650', 653: 'starter_653', 656: 'starter_656',
  };
  const starterAchId = STARTER_RUN_ACHIEVEMENTS[sid] || null;
  if (starterAchId) {
    const ach = unlockAchievement(starterAchId);
    if (ach) setTimeout(() => showAchievementToast(ach), 600);
  }

  const regionAch = unlockAchievement(`story_region_${region.id}`);
  if (regionAch) setTimeout(() => showAchievementToast(regionAch), 900);

  const regionStarterIds = Array.isArray(region.starterIds) ? region.starterIds : [];
  if (regionStarterIds.length === 3) {
    const clearedStarters = new Set(
      getHallOfFame()
        .filter(entry => !entry.endless && (entry.storyRegionId || 1) === region.id && entry.starterSpeciesId)
        .map(entry => entry.starterSpeciesId)
    );
    if (regionStarterIds.every(id => clearedStarters.has(id))) {
      const trioAch = unlockAchievement(`story_trio_${region.id}`);
      if (trioAch) setTimeout(() => showAchievementToast(trioAch), 1100);
    }
  }

  // Solo run achievement
  if (state.maxTeamSize === 1) {
    const ach = unlockAchievement('solo_run');
    if (ach) setTimeout(() => showAchievementToast(ach), 1400);
  }

  // Hard mode win achievement
  if (state.nuzlockeMode) {
    const ach = unlockAchievement('nuzlocke_win');
    if (ach) setTimeout(() => showAchievementToast(ach), 2200);
  }

  // All 3 legendary birds on team
  const birdIds = [144, 145, 146];
  if (birdIds.every(id => state.team.some(p => p.speciesId === id))) {
    const ach = unlockAchievement('three_birds');
    if (ach) setTimeout(() => showAchievementToast(ach), 800);
  }

  // No PokÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©mon Center used
  if (!state.usedPokecenter) {
    const ach = unlockAchievement('no_pokecenter');
    if (ach) setTimeout(() => showAchievementToast(ach), 1000);
  }

  // No items picked up
  if (!state.pickedUpItem) {
    const ach = unlockAchievement('no_items');
    if (ach) setTimeout(() => showAchievementToast(ach), 1200);
  }

  // 4 of 6 PokÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©mon share a type
  if (state.team.length === 6) {
    const typeCounts = {};
    for (const p of state.team) {
      for (const t of p.types) {
        typeCounts[t] = (typeCounts[t] || 0) + 1;
      }
    }
    if (Object.values(typeCounts).some(c => c >= 4)) {
      const ach = unlockAchievement('type_quartet');
      if (ach) setTimeout(() => showAchievementToast(ach), 1600);
    }
  }

  // Full team of shinies
  if (state.team.length >= 3 && state.team.every(p => p.isShiny)) {
    const ach = unlockAchievement('all_shiny_win');
    if (ach) setTimeout(() => showAchievementToast(ach), 2000);
  }

  // Consecutive win streak
  const streak = (parseInt(localStorage.getItem('poke_win_streak') || '0', 10)) + 1;
  localStorage.setItem('poke_win_streak', String(streak));
  if (streak >= 2) {
    const ach = unlockAchievement('back_to_back');
    if (ach) setTimeout(() => showAchievementToast(ach), 2400);
  }
  if (streak >= 3) {
    const ach = unlockAchievement('back_3_back');
    if (ach) setTimeout(() => showAchievementToast(ach), 2800);
  }

  clearSavedRun();
  if (typeof syncToCloud === 'function') syncToCloud();
}

function shareEndlessRun(stageNum, team) {
  const stageName = typeof getStageName === 'function' ? getStageName(stageNum) : `Stage ${stageNum}`;
  const teamLines = team.map(p => {
    const shiny = p.isShiny ? ' ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨' : '';
    return `${p.nickname || p.name} Lv.${p.level}${shiny}`;
  }).join('\n');
  const text = `ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â  Cleared ${stageName} in RogueMon Battle Tower!\n\nMy team:\n${teamLines}\n\n${window.location.href}`;

  if (navigator.share) {
    navigator.share({ title: 'RogueMon', text }).catch(() => {});
  } else {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }
}

function shareRun() {
  const wins = getEliteWins();
  const teamLines = state.team.map(p => {
    const shiny = p.isShiny ? ' ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨' : '';
    return `${p.nickname || p.name} Lv.${p.level}${shiny}`;
  }).join('\n');
  const modeTag = state.nuzlockeMode ? ' (Nuzlocke)' : '';
  const text = `ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â  Championship #${wins}${modeTag} on RogueMon!\n\nMy team:\n${teamLines}\n\n${window.location.href}`;

  if (navigator.share) {
    navigator.share({ title: 'RogueMon', text }).catch(() => {});
  } else {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }
}

// ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ Endless Mode ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬

function getUnlockedStageCount() {
  const hof = getHallOfFame();
  const maxCompleted = hof
    .filter(e => e.endless && e.stageNumber)
    .reduce((max, e) => Math.max(max, e.stageNumber), 0);
  const maxStoryRegion = hof
    .filter(e => !e.endless)
    .reduce((max, e) => Math.max(max, e.storyRegionId || 1), 0);
  return Math.max(1, maxCompleted + 1, Math.min(maxStoryRegion, MAX_ACCESSIBLE_STAGE));
}

function unlockNextStage(_completedStage) {
  // Unlock is now derived from Hall of Fame entries ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â no localStorage needed.
}

const MAX_ACCESSIBLE_STAGE = 5;

const STAGE_META = [
  null,
  { label: 'Kanto',  gens: 'Gen 1',   color: '#e8503a' },
  { label: 'Johto',  gens: 'Gen 1-2', color: '#c0a050' },
  { label: 'Hoenn',  gens: 'Gen 1-3', color: '#60a878' },
  { label: 'Sinnoh', gens: 'Gen 1-4', color: '#7878c8' },
  { label: 'Unova',  gens: 'Gen 1-5', color: '#808080' },
];

const STAGE_REGION_BG = [
  null,
  'ui/regions/HGSS_Kanto.jpg',
  'ui/regions/Johtoart.jpg',
  'ui/regions/ORAS_Hoenn_Map.jpg',
  'ui/regions/Sinnoh-Region_Platinum.png.webp',
  'ui/regions/Einall_S2W2.png',
];

function getStageName(n) { return STAGE_META[n]?.label || `Stage ${n}`; }

// Starter PokÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©mon for each endless stage (base forms)
const REGION_STARTERS = [
  null,
  [1,   4,   7],   // Kanto
  [152, 155, 158], // Johto
  [252, 255, 258], // Hoenn
  [387, 390, 393], // Sinnoh
  [495, 498, 501], // Unova
];

function fullyRestoreEndlessTeam() {
  for (const p of state.team) {
    p.currentHp = p.maxHp;
    p.status = null;
  }
}

function grantEndlessTrainingBoost() {
  for (const p of state.team) {
    p.level += 1;
    const hpBuff = p.statBuffs?.hp ?? 0;
    const buffMult = 1 + 0.1 * hpBuff;
    p.maxHp = Math.floor(calcHp(p.baseStats.hp, p.level) * buffMult);
    p.currentHp = p.maxHp;
    p.status = null;
  }
}

function getEndlessArmoryChoices(count = 3) {
  const usedIds = new Set([
    ...state.items.filter(it => !it.usable).map(it => it.id),
    ...state.team.filter(p => p.heldItem).map(p => p.heldItem.id),
  ]);
  const pool = ITEM_POOL.filter(it =>
    !usedIds.has(it.id) &&
    (it.minRegion === undefined || endlessState.stageNumber >= it.minRegion) &&
    (it.minMap === undefined || state.currentMap >= it.minMap)
  );
  return [...pool].sort(() => rng() - 0.5).slice(0, count);
}

async function showEndlessBoonScreen() {
  return new Promise(resolve => {
    const titleEl = document.getElementById('stat-buff-title');
    const subEl = document.getElementById('stat-buff-subtitle');
    const choicesEl = document.getElementById('stat-buff-choices');
    if (!titleEl || !subEl || !choicesEl) {
      resolve();
      return;
    }

    showScreen('stat-buff-screen');
    titleEl.textContent = getText('endless_boon_title');
    subEl.textContent = getText('endless_boon_subtitle');
    choicesEl.innerHTML = '';

    const boons = [
      {
        icon: '<span class="endless-boon-glyph">HP</span>',
        name: getText('endless_boon_recovery'),
        desc: getText('endless_boon_recovery_desc'),
        apply: async () => {
          fullyRestoreEndlessTeam();
          const berryJuice = USABLE_ITEM_POOL.find((item) => item.id === 'berry_juice');
          if (berryJuice) state.items.push({ ...berryJuice });
          renderTeamBar(state.team);
          renderItemBadges(state.items);
          resolve();
        },
      },
      {
        icon: '<span class="endless-boon-glyph">KIT</span>',
        name: getText('endless_boon_armory'),
        desc: getText('endless_boon_armory_desc'),
        apply: async () => {
          const choices = getEndlessArmoryChoices(3);
          if (!choices.length) {
            resolve();
            return;
          }
          showScreen('item-screen');
          renderTeamBar(state.team, document.getElementById('item-team-bar'));
          const el = document.getElementById('item-choices');
          if (el) {
            el.innerHTML = '';
            for (const item of choices) {
              const div = document.createElement('div');
              div.className = 'item-card endless-boon-card';
              div.style.cursor = 'pointer';
              div.innerHTML = `<div class="item-icon">${itemIconHtml(item, 36)}</div>
                <div class="item-name">${item.name}</div>
                <div class="item-desc">${item.desc}</div>`;
              div.addEventListener('click', () => {
                openItemEquipModal(item, {
                  onComplete: () => {
                    renderItemBadges(state.items);
                    resolve();
                  },
                });
              });
              el.appendChild(div);
            }
          }
          const skipBtn = document.getElementById('btn-skip-item');
          if (skipBtn) {
            skipBtn.textContent = getText('skip');
            skipBtn.onclick = () => resolve();
          }
        },
      },
      {
        icon: '<span class="endless-boon-glyph">LV+</span>',
        name: getText('endless_boon_training'),
        desc: getText('endless_boon_training_desc'),
        apply: async () => {
          grantEndlessTrainingBoost();
          renderTeamBar(state.team);
          resolve();
        },
      },
    ];

    for (const boon of boons) {
      const card = document.createElement('div');
      card.className = 'item-card endless-boon-card';
      card.style.cursor = 'pointer';
      card.innerHTML = `
        <div class="item-icon">${boon.icon}</div>
        <div class="item-name">${boon.name}</div>
        <div class="item-desc">${boon.desc}</div>`;
      card.addEventListener('click', () => {
        Promise.resolve(boon.apply()).catch(() => resolve());
      });
      choicesEl.appendChild(card);
    }
  });
}

function showEndlessStageSelect() {
  const unlocked = Math.min(getUnlockedStageCount(), MAX_ACCESSIBLE_STAGE);
  const list = document.getElementById('stage-select-list');
  if (!list) return;
  list.innerHTML = '';
  const maxShow = Math.min(unlocked + 1, MAX_ACCESSIBLE_STAGE); // one locked preview, but never beyond the last defined stage
  for (let s = 1; s <= maxShow; s++) {
    const isLocked = s > unlocked;
    const meta = STAGE_META[Math.min(s, 5)];
    const btn = document.createElement('button');
    btn.className = isLocked ? 'btn-secondary' : 'btn-primary';
    const borderColor = (!isLocked && meta) ? meta.color : '';
    const bg = STAGE_REGION_BG[s];
    const bgStyle = bg
      ? `background-image:url('${bg}');background-size:cover;background-position:center;`
      : `background:linear-gradient(135deg,#1a0a3e,#3a0a6e);`;
    btn.style.cssText = `width:200px;${isLocked ? `opacity:0.45;cursor:not-allowed;${bgStyle}` : `${bgStyle}${borderColor ? `border-color:${borderColor};box-shadow:0 0 6px ${borderColor}55;` : ''}`}`;
    if (isLocked) {
      btn.innerHTML = `<div style="background:rgba(0,0,0,0.55);padding:4px 8px;border-radius:4px;color:#fff;">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ ${getStageName(s)}</div>`;
    } else if (meta) {
      btn.innerHTML = `<div style="background:rgba(0,0,0,0.5);padding:4px 8px;border-radius:4px;color:#fff;"><div>ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶ ${meta.label}</div><div style="font-size:5px;opacity:0.85;margin-top:2px;">${meta.gens}</div></div>`;
    } else {
      btn.innerHTML = `<div style="background:rgba(0,0,0,0.5);padding:4px 8px;border-radius:4px;color:#fff;"><div>ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶ ${getStageName(s)}</div><div style="font-size:5px;opacity:0.85;margin-top:2px;">All Gens</div></div>`;
    }
    if (!isLocked) btn.addEventListener('click', () => startEndlessRun(s));
    list.appendChild(btn);
  }
  showScreen('endless-stage-select');
}

async function startEndlessRun(stageNum = 1) {
  const seed = (Date.now() ^ (Math.random() * 0x100000000 | 0)) >>> 0;
  seedRng(seed);
  const savedTrainer = localStorage.getItem('poke_trainer') || 'boy';
  state = {
    currentMap: 0, currentNode: null, team: [], items: [], badges: 0,
    map: null, eliteIndex: 0, trainer: savedTrainer, starterSpeciesId: null,
    maxTeamSize: 1, nuzlockeMode: false, usedPokecenter: false, pickedUpItem: false,
    runSeed: seed, isEndlessMode: true,
  };
  endlessState = {
    active: true, stageNumber: stageNum, regionNumber: 1, mapIndexInRegion: 0,
    currentRegion: null, traitTiers: {},
  };
  clearEndlessState();
  if (!localStorage.getItem('poke_trainer')) {
    await showTrainerSelect();
  } else {
    await showStarterSelect();
  }
}

async function continueEndlessRun() {
  try {
    if (!loadRun()) return;
    if (!loadEndlessState()) return;
    if (!endlessState.active) { initGame(); return; }
    if (!state.map) {
      const isFirstMap = endlessState.regionNumber === 1 && endlessState.mapIndexInRegion === 0;
      const fakeMapIndex = isFirstMap ? 2 : Math.min(7, endlessState.stageNumber + endlessState.regionNumber);
      state.map = generateMap(fakeMapIndex, false);
    }
    if (endlessState.currentRegion) {
      if (state.currentNode && !state.currentNode.visited) {
        await onEndlessNodeClick(state.currentNode);
      } else {
        showEndlessMapScreen();
      }
    } else {
      startEndlessRegion();
    }
  } catch (e) {
    console.error('continueEndlessRun failed:', e);
    initGame();
  }
}

async function startEndlessRegion() {
  if (!endlessState._preRolled) {
    endlessState.currentRegion = rollRegion(endlessState.stageNumber, endlessState.regionNumber);
  }
  endlessState._preRolled = false;
  endlessState.mapIndexInRegion = 0;
  saveEndlessState();

  startEndlessMap();
}

function buildEndlessExpeditionMap(regionNumber = 1, mapIndexInRegion = 0) {
  const routeTemplates = [
    [
      [NODE_TYPES.CATCH, NODE_TYPES.ITEM],
      [NODE_TYPES.TRAINER, NODE_TYPES.QUESTION],
      [NODE_TYPES.MOVE_TUTOR, NODE_TYPES.POKECENTER],
    ],
    [
      [NODE_TYPES.TRAINER, NODE_TYPES.CATCH],
      [NODE_TYPES.ITEM, NODE_TYPES.QUESTION],
      [NODE_TYPES.TRADE, NODE_TYPES.POKECENTER],
    ],
    [
      [NODE_TYPES.ITEM, NODE_TYPES.TRAINER],
      [NODE_TYPES.QUESTION, NODE_TYPES.MOVE_TUTOR],
      [NODE_TYPES.POKECENTER, NODE_TYPES.TRADE],
    ],
  ];
  const route = routeTemplates[Math.min(mapIndexInRegion, routeTemplates.length - 1)];

  const makeNode = (id, type, layer, col, extra = {}) => ({
    id,
    type,
    layer,
    col,
    visited: false,
    accessible: false,
    revealed: true,
    ...extra,
  });

  const layers = [
    [makeNode('n0_0', NODE_TYPES.START, 0, 0)],
    route[0].map((type, idx) => makeNode(`n1_${idx}`, type, 1, idx)),
    route[1].map((type, idx) => makeNode(`n2_${idx}`, type, 2, idx)),
    route[2].map((type, idx) => makeNode(`n3_${idx}`, type, 3, idx)),
    [makeNode('n4_0', NODE_TYPES.BOSS, 4, 0, { mapIndex: (regionNumber - 1) * 3 + mapIndexInRegion })],
  ];

  const connectLayers = (fromLayer, toLayer) => {
    const edges = [];
    if (fromLayer.length === 1) {
      for (const target of toLayer) edges.push({ from: fromLayer[0].id, to: target.id });
      return edges;
    }
    for (let i = 0; i < fromLayer.length; i++) {
      const left = Math.max(0, Math.min(toLayer.length - 1, i));
      const right = Math.max(0, Math.min(toLayer.length - 1, i + 1));
      edges.push({ from: fromLayer[i].id, to: toLayer[left].id });
      if (right !== left) edges.push({ from: fromLayer[i].id, to: toLayer[right].id });
    }
    return edges;
  };

  const edges = [];
  for (let i = 0; i < layers.length - 1; i++) {
    edges.push(...connectLayers(layers[i], layers[i + 1]));
  }

  const nodes = {};
  for (const layer of layers) {
    for (const node of layer) nodes[node.id] = node;
  }
  nodes['n0_0'].visited = true;
  for (const edge of edges) {
    if (edge.from === 'n0_0' && nodes[edge.to]) nodes[edge.to].accessible = true;
  }

  return {
    nodes,
    edges,
    layers,
    mapIndex: 90 + (regionNumber - 1) * 3 + mapIndexInRegion,
  };
}

function startEndlessMap() {
  // Full heal at the start of every gauntlet in endless mode
  fullyRestoreEndlessTeam();

  const isFirstMap = endlessState.regionNumber === 1 && endlessState.mapIndexInRegion === 0;
  const fakeMapIndex = isFirstMap ? 2 : Math.min(7, endlessState.stageNumber + endlessState.regionNumber);
  state.currentMap = fakeMapIndex;
  state.map = endlessState.mode === 'expedition'
    ? buildEndlessExpeditionMap(endlessState.regionNumber, endlessState.mapIndexInRegion)
    : generateMap(fakeMapIndex, false);
  state.currentNode = state.map.nodes['n0_0'] || null;
  state.usedPokecenter = false;
  state.pickedUpItem = false;
  state.endlessLevelRange = getEndlessLevelRange(endlessState.stageNumber, endlessState.regionNumber, endlessState.mapIndexInRegion);
  applyExpeditionRosterState();

  // Pick map background based on trainer type; finalBoss for stage final boss
  const _btTrainer    = endlessState.currentRegion?.trainers[endlessState.mapIndexInRegion];
  const _btType       = (_btTrainer?.archetype?.type || '').split('/')[0].toLowerCase() || 'normal';
  const _isFinalBoss  = endlessState.mapIndexInRegion === 2 && endlessState.regionNumber === 3;
  endlessState.currentMapBg = _isFinalBoss
    ? 'ui/mapsBattleTower/finalBoss.png'
    : `ui/mapsBattleTower/${_btType}.png`;

  saveEndlessState();
  saveRun();
  showEndlessMapScreen();
}

function showEndlessMapScreen() {
  showScreen('map-screen');
  const region = endlessState.currentRegion;
  const mapNum = endlessState.mapIndexInRegion + 1;
  const isBoss = endlessState.mapIndexInRegion === 2;
  const isFinalBoss = isBoss && endlessState.regionNumber === 3;
  const trainerName = region.trainers[endlessState.mapIndexInRegion]?.archetype?.name || '???';

  const mapInfo = document.getElementById('map-info');
  if (mapInfo) {
    const label = isFinalBoss ? 'FINAL TRIAL' : isBoss ? 'REGION BOSS' : `GAUNTLET ${mapNum}/3`;
    mapInfo.innerHTML = `<span style="font-size:9px">${getStageName(endlessState.stageNumber)} R${endlessState.regionNumber} - ${label}: <b>${trainerName}</b></span>`;
  }

  const badgeCountEl = document.getElementById('badge-count');
  if (badgeCountEl) badgeCountEl.innerHTML = '';
  const badgePanelEndless = document.getElementById('badge-count-panel');
  if (badgePanelEndless) badgePanelEndless.innerHTML = '';
  document.querySelectorAll('.map-badges-label').forEach(el => el.style.display = 'none');

  renderTeamBar(state.team);
  renderItemBadges(state.items);
  renderEndlessTraitPanel(state.team);
  renderEndlessRegionPanel(endlessState.currentRegion, endlessState.mapIndexInRegion);

  const mapContainer = document.getElementById('map-container');
  const bg = endlessState.currentMapBg || 'ui/mapsNormalMode/map1.png';
  mapContainer.style.backgroundImage = `url('${bg}')`;
  renderMap(state.map, mapContainer, onEndlessNodeClick);
  syncMobileMapPanel();
}

async function onEndlessNodeClick(node) {
  if (!node.accessible) return;
  state.currentNode = node;
  // Lock sibling nodes before saving so F5 can't switch to a different path choice
  for (const n of Object.values(state.map.nodes)) {
    if (n.layer === node.layer && n.id !== node.id && n.accessible) {
      n.accessible = false;
    }
  }
  if (node.type === NODE_TYPES.BOSS) {
    saveRun();
    saveEndlessState();
    await doEndlessBossNode();
    return;
  }
  // Non-boss nodes use the standard handler. showMapScreen() auto-delegates to showEndlessMapScreen().
  await onNodeClick(node);
}

async function applyEndlessBugTrait() {
  endlessState.traitTiers = computeTraitTiers(state.team);
  const bugBonus = getBugLevelBonus(endlessState.traitTiers);
  if (bugBonus <= 0) return;
  const leveled = [];
  for (const p of state.team) {
    if (p.currentHp > 0) {
      const oldLevel = p.level;
      p.level = p.level + bugBonus;
      const hpBuff = p.statBuffs?.hp ?? 0;
      const buffMult = 1 + 0.1 * hpBuff;
      p.maxHp = Math.floor(calcHp(p.baseStats.hp, p.level) * buffMult);
      p.currentHp = Math.min(p.currentHp + (p.maxHp - Math.floor(calcHp(p.baseStats.hp, oldLevel) * buffMult)), p.maxHp);
      leveled.push({ name: p.nickname || p.name, spriteUrl: p.spriteUrl, level: p.level });
    }
  }
  const { autoSkipAllBattles, autoSkipBattles } = getSettings();
  const skipFast = autoSkipAllBattles || autoSkipBattles;
  if (leveled.length) showBugLevelUpBanner(leveled, skipFast ? 250 : 1500);
  await new Promise(r => setTimeout(r, skipFast ? 400 : 1600));
}

async function doEndlessBossNode() {
  const region = endlessState.currentRegion;
  const trainerData = region.trainers[endlessState.mapIndexInRegion];
  const isBigBoss = endlessState.mapIndexInRegion === 2;

  // Fetch all species ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â use fetchIds when available (supports form slugs like 'deoxys-attack')
  const fetchIds = trainerData.fetchIds || trainerData.speciesIds;
  const speciesArr = await Promise.all(fetchIds.map(id => fetchPokemonById(id)));
  const enemyTeam = speciesArr
    .map((sp, i) => ({ sp, i }))
    .filter(({ sp }) => sp != null)
    .map(({ sp, i }) => {
      const offset = trainerData.levelOffsets ? (trainerData.levelOffsets[i] ?? i) : i;
      return createInstance(sp, trainerData.level + offset, false, Math.min(2, trainerData.moveTier));
    });

  if (enemyTeam.length === 0) {
    // Fallback if fetching fails
    advanceEndless();
    return;
  }

  // Compute traits right before the fight (enemy bosses also get type trait benefits)
  endlessState.traitTiers = computeTraitTiers(state.team);
  const enemyTiers = trainerData.allTraits != null
    ? Object.fromEntries(Object.keys(TRAIT_DESCRIPTIONS).map(t => [t, trainerData.allTraits]))
    : trainerData.specificTraits
      ? trainerData.specificTraits
      : trainerData.copyPlayerTraits
        ? computeMirroredTraits(endlessState.traitTiers, computeTraitTiers(enemyTeam, 0))
        : computeTraitTiers(enemyTeam, trainerData.traitBonus ?? 0);
  const traitsConfig = buildTraitsConfig(endlessState.traitTiers, enemyTiers);
  renderBattleTraitBars(endlessState.traitTiers, enemyTiers);

  const isStageFinal = isBigBoss && endlessState.regionNumber === 3;
  const title = isStageFinal
    ? `${getStageName(endlessState.stageNumber)} Final Boss: ${trainerData.archetype.name}!`
    : isBigBoss ? `Big Boss: ${trainerData.archetype.name}!`
    : `Trainer: ${trainerData.archetype.name}!`;
  const battleInfoEl = document.getElementById('battle-title');
  if (battleInfoEl) battleInfoEl.textContent = title;
  const battleSubEl = document.getElementById('battle-subtitle');
  if (battleSubEl) battleSubEl.textContent = '';
  const enemySideLabel = document.getElementById('enemy-side-label');
  if (enemySideLabel) enemySideLabel.textContent = trainerData.archetype.name;

  const won = await runBattleScreen(
    enemyTeam, true, null, null,
    trainerData.archetype.sprite,
    [],
    null, // baseGainOverride ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â use default level gain
    true, // showPlayerPortrait
    traitsConfig
  );
  // clearTraitBar() is handled automatically by runBattleScreen in endless mode

  if (!won) {
    clearEndlessState();
    clearSavedRun();
    showGameOver();
    return;
  }

  await applyEndlessBugTrait();
  if (!isStageFinal) {
    await showEndlessBoonScreen();
  }

  if (isBigBoss) await showStatBuffScreen();

  advanceEndless();
}

async function showStatBuffScreen() {
  return new Promise(resolve => {
    const titleEl  = document.getElementById('stat-buff-title');
    const subEl    = document.getElementById('stat-buff-subtitle');
    const choicesEl = document.getElementById('stat-buff-choices');

    const STATS = [
      ['hp',      'HP',  'stat-hp'],
      ['atk',     'ATK', 'stat-atk'],
      ['def',     'DEF', 'stat-def'],
      ['speed',   'SPD', 'stat-spe'],
      ['special', 'SP.A', 'stat-spa'],
      ['spdef',   'SP.D', 'stat-spd'],
    ];

    function showPhase1() {
      showScreen('stat-buff-screen');
      titleEl.textContent = getText('region_cleared');
      const maxPts = getMaxBuffPoints();
      subEl.textContent = maxPts > 0 ? getText('choose_power_up', { cap: maxPts }) : getText('unlock_buffs');
      choicesEl.innerHTML = '';
      for (const p of state.team) {
        const totalPts = getTotalBuffPoints(p.statBuffs || {});
        const capped = totalPts >= maxPts;
        const wrap = document.createElement('div');
        wrap.className = 'stat-buff-poke-wrap';
        wrap.innerHTML = renderPokemonCard(p, false, false);
        const label = document.createElement('div');
        label.style.cssText = 'font-size:8px;text-align:center;margin-top:2px;color:' + (capped ? '#888' : '#c8a0ff') + ';';
        label.textContent = maxPts > 0 ? `${totalPts}/${maxPts} pts` : 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â';
        wrap.appendChild(label);
        const card = wrap.querySelector('.poke-card');
        if (capped || maxPts === 0) {
          card.style.opacity = '0.45';
          card.style.cursor = 'default';
        } else {
          card.style.cursor = 'pointer';
          card.addEventListener('click', () => showPhase2(p));
        }
        choicesEl.appendChild(wrap);
      }

      const skip = document.createElement('button');
      skip.className = 'btn-secondary';
      skip.style.cssText = 'margin-top:12px;width:100%;';
      skip.textContent = getText('skip');
      skip.addEventListener('click', () => resolve());
      choicesEl.appendChild(skip);
    }

    function showPhase2(pokemon) {
      titleEl.textContent = pokemon.nickname || pokemon.name;
      const maxPts = getMaxBuffPoints();
      const totalPts = getTotalBuffPoints(pokemon.statBuffs || {});
      const atCap = totalPts >= maxPts;
      subEl.textContent = atCap
        ? `Fully buffed (${totalPts}/${maxPts} pts)`
        : `Choose a stat to boost (+10%) ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ${totalPts}/${maxPts} pts used`;
      choicesEl.innerHTML = '';

      const isSpecialAttacker = (pokemon.baseStats?.special ?? 0) >= (pokemon.baseStats?.atk ?? 0);
      const hiddenAttackStat = isSpecialAttacker ? 'atk' : 'special';

      for (const [key, lbl, cls] of STATS) {
        if (key === hiddenAttackStat) continue;
        if (!pokemon.statBuffs) pokemon.statBuffs = {};
        const buffCount = pokemon.statBuffs[key] ?? 0;
        const maxed = buffCount >= 10 || atCap;
        const rawVal = key === 'spdef'
          ? (pokemon.baseStats?.spdef ?? pokemon.baseStats?.special ?? 0)
          : (pokemon.baseStats?.[key] ?? 0);
        const grayPct = Math.round((rawVal / 255) * 100);
        const bluePct = Math.round((buffCount / 10) * grayPct);

        const row = document.createElement('div');
        row.className = `stat-buff-row${maxed ? ' maxed' : ''}`;
        row.innerHTML = `
          <span class="stat-buff-lbl">${lbl}</span>
          <div class="stat-buff-bar-wrap">
            <div class="stat-bar-bg">
              <div class="stat-bar-fill ${cls}" style="width:${grayPct}%"></div>
              ${buffCount > 0 ? `<div class="stat-buff-overlay" style="width:${bluePct}%"></div>` : ''}
            </div>
          </div>
          <span class="stat-buff-count">${buffCount}/10</span>
        `;
        if (!maxed) {
          row.addEventListener('click', () => {
            applyStatBuff(pokemon, key);
            checkMaxStatAchievements(pokemon);
            resolve();
          });
        }
        choicesEl.appendChild(row);
      }

      const back = document.createElement('button');
      back.className = 'btn-secondary';
      back.style.cssText = 'margin-top:12px;width:100%;';
      back.textContent = 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â Back';
      back.addEventListener('click', showPhase1);
      choicesEl.appendChild(back);
    }

    showPhase1();
  });
}

function loadPersistentBuffs() {
  try {
    const store = JSON.parse(localStorage.getItem('poke_stat_buffs') || '{}');
    // Migrate old evo-line root IDs whenever a baby-form pre-evolution is added
    const migrations = [
      [143, 446],  // Snorlax  ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ Munchlax
      [122, 439],  // Mr. Mime ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ Mime Jr.
      [113, 440],  // Chansey  ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ Happiny
      [185, 438],  // Sudowoodo ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ Bonsly
      [226, 458],  // Mantine  ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ Mantyke
    ];
    let dirty = false;
    for (const [oldKey, newKey] of migrations) {
      if (store[oldKey] !== undefined && store[newKey] === undefined) {
        store[newKey] = store[oldKey];
        delete store[oldKey];
        dirty = true;
      }
    }
    if (dirty) savePersistentBuffs(store);
    return store;
  } catch { return {}; }
}
function savePersistentBuffs(store) {
  try { localStorage.setItem('poke_stat_buffs', JSON.stringify(store)); } catch {}
}

function getMaxBuffPoints() {
  return Math.min((endlessState?.stageNumber ?? 1) * 10, 50);
}

function getTotalBuffPoints(buffs) {
  // atk and special always mirror each other, so count only the higher of the two
  const atkPts = Math.max(buffs.atk ?? 0, buffs.special ?? 0);
  return atkPts + (buffs.hp ?? 0) + (buffs.def ?? 0) + (buffs.speed ?? 0) + (buffs.spdef ?? 0);
}

// Returns the base-form species ID for any member of an evolution line.
function getEvoLineRoot(speciesId) {
  const parentOf = {};
  for (const [from, evo] of Object.entries(EVOLUTIONS)) {
    parentOf[evo.into] = Number(from);
  }
  for (const [fromId, choices] of Object.entries(BRANCHING_EVOLUTIONS)) {
    for (const evo of choices) parentOf[evo.into] = Number(fromId);
  }
  let id = speciesId;
  while (parentOf[id] !== undefined) id = parentOf[id];
  return id;
}

function loadBuffsIntoPokemon(p) {
  if (!state.isEndlessMode) return;
  const store = loadPersistentBuffs();
  const buffs = store[getEvoLineRoot(p.speciesId)];
  if (!buffs) return;
  p.statBuffs = { ...buffs };
  const hpBuff = buffs.hp ?? 0;
  if (hpBuff > 0) {
    const buffedMaxHp = Math.floor(calcHp(p.baseStats.hp, p.level) * (1 + 0.1 * hpBuff));
    const diff = buffedMaxHp - p.maxHp;
    p.maxHp = buffedMaxHp;
    p.currentHp = Math.min(p.currentHp + diff, p.maxHp);
  }
}

function checkMaxStatAchievements(pokemon) {
  const BUFF_KEYS = ['hp', 'atk', 'def', 'speed', 'special', 'spdef'];
  const maxedCount = BUFF_KEYS.filter(k => (pokemon.statBuffs?.[k] ?? 0) >= 10).length;
  for (const threshold of [1, 2, 3, 4]) {
    if (maxedCount >= threshold) {
      const ach = unlockAchievement(`max_stats_${threshold}`);
      if (ach) showAchievementToast(ach);
    }
  }
  if (maxedCount >= 6) {
    const ach = unlockAchievement('max_stats_all');
    if (ach) showAchievementToast(ach);
  }
}

function applyStatBuff(pokemon, statKey) {
  if (!pokemon.statBuffs) pokemon.statBuffs = {};
  pokemon.statBuffs[statKey] = Math.min(10, (pokemon.statBuffs[statKey] ?? 0) + 1);
  // Mirror attack buffs so physical/special evolution switches don't lose progress
  if (statKey === 'atk')     pokemon.statBuffs.special = Math.min(10, (pokemon.statBuffs.special ?? 0) + 1);
  if (statKey === 'special') pokemon.statBuffs.atk     = Math.min(10, (pokemon.statBuffs.atk     ?? 0) + 1);
  if (statKey === 'hp') {
    const hpGain = Math.floor(calcHp(pokemon.baseStats.hp, pokemon.level) * 0.1);
    pokemon.maxHp += hpGain;
    pokemon.currentHp = Math.min(pokemon.currentHp + hpGain, pokemon.maxHp);
  }
  // Persist buffs by evo line root so they apply to the whole evolution line
  const store = loadPersistentBuffs();
  store[getEvoLineRoot(pokemon.speciesId)] = { ...pokemon.statBuffs };
  savePersistentBuffs(store);
  saveRun();
  saveEndlessState();
  if (typeof syncToCloud === 'function') syncToCloud();
}

function advanceEndless() {
  const endlessModeType = endlessState.mode || 'legacy';
  if (endlessModeType === 'expedition') {
    applyExpeditionPostMapWear();
  }
  endlessState.mapIndexInRegion++;
  saveEndlessState();

  if (endlessState.mapIndexInRegion >= 3) {
    endlessState.regionNumber++;
    if (endlessState.regionNumber > 3) {
      // All 3 regions cleared ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â the stage final boss was the last big boss, so go to next stage
      const completedStage = endlessState.stageNumber;
      saveHallOfFameEntry(state.team, completedStage, false, true, completedStage, state.starterSpeciesId);
      unlockNextStage(completedStage);
      [1, 2, 3, 4, 5].forEach(threshold => {
        if (completedStage === threshold) {
          const ach = unlockAchievement(`endless_stage_${threshold}`);
          if (ach) showAchievementToast(ach);
        }
      });
      checkStarterCollectionAchievements();
      clearEndlessState();
      clearSavedRun();
      if (typeof syncToCloud === 'function') syncToCloud();
      renderStageComplete(completedStage, state.team, () => {
        if (endlessModeType === 'expedition') {
          initGame();
        } else {
          showEndlessStageSelect();
        }
      });
    } else {
      startEndlessRegion();
    }
  } else {
    startEndlessMap();
  }
}

// ---- Keyboard shortcuts ----
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
  const activeScreen = document.querySelector('.screen.active')?.id;

  // Space = skip/cancel on any screen that has such a button
  if (e.code === 'Space' && !e.shiftKey) {
    const skipMap = {
      'battle-screen': 'btn-auto-battle',
      'catch-screen':  'btn-skip-catch',
      'item-screen':   'btn-skip-item',
      'swap-screen':   'btn-cancel-swap',
      'trade-screen':  'btn-skip-trade',
    };
    const btnId = skipMap[activeScreen];
    if (btnId) {
      const btn = document.getElementById(btnId);
      if (btn && !btn.disabled) { e.preventDefault(); btn.click(); }
      return;
    }
  }

  if (activeScreen === 'catch-screen') {
    const idx = ['Digit1', 'Digit2', 'Digit3'].indexOf(e.code);
    if (idx === -1) return;
    const slot = document.getElementById('catch-choices')?.children[idx];
    if (!slot) return;
    e.preventDefault();
    if (e.shiftKey) {
      slot.querySelector('.reroll-btn')?.click();
    } else {
      slot.querySelector('.poke-card')?.click();
    }
    return;
  }

  if (activeScreen === 'item-screen' && !e.shiftKey) {
    const idx = ['Digit1', 'Digit2', 'Digit3'].indexOf(e.code);
    if (idx === -1) return;
    const slot = document.getElementById('item-choices')?.children[idx];
    if (!slot) return;
    e.preventDefault();
    slot.click();
    return;
  }

  if (activeScreen === 'swap-screen' && !e.shiftKey) {
    const idx = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6'].indexOf(e.code);
    if (idx === -1) return;
    const slot = document.getElementById('swap-choices')?.children[idx];
    if (!slot) return;
    e.preventDefault();
    slot.click();
    return;
  }

  if (activeScreen === 'map-screen' && !e.shiftKey) {
    const idx = ['Digit1', 'Digit2'].indexOf(e.code);
    if (idx === -1) return;
    if (!state?.map) return;
    const accessible = Object.values(state.map.nodes)
      .filter(n => n.accessible && !n.visited)
      .sort((a, b) => a.layer !== b.layer ? a.layer - b.layer : a.col - b.col);
    const node = accessible[idx];
    if (!node) return;
    e.preventDefault();
    if (state.isEndlessMode) onEndlessNodeClick(node);
    else onNodeClick(node);
  }
});

// ---- Boot ----
window.addEventListener('DOMContentLoaded', initGame);
window.addEventListener('pagehide', autosaveActiveRun);
window.addEventListener('beforeunload', autosaveActiveRun);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) autosaveActiveRun();
});

