// map.js - Node map generation and rendering

const NODE_TYPES = {
  START: 'start',
  BATTLE: 'battle',
  CATCH: 'catch',
  ITEM: 'item',
  QUESTION: 'question',
  BOSS: 'boss',
  POKECENTER: 'pokecenter',
  TRAINER: 'trainer',
  LEGENDARY: 'legendary',
  MOVE_TUTOR: 'move_tutor',
  TRADE: 'trade',
};

const NODE_WEIGHTS = [
  // L1
  { battle: 25, catch: 30, item: 15, trainer: 30, question: 0,  pokecenter: 0,  move_tutor: 0, trade: 0, legendary: 0 },
  // L2
  { battle: 20, catch: 20, item: 15, trainer: 30, question: 10, pokecenter: 0,  move_tutor: 0, trade: 5, legendary: 0 },
  // L3
  { battle: 16, catch: 14, item: 12, trainer: 27, question: 13, pokecenter: 0,  move_tutor: 9, trade: 9, legendary: 0 },
  // L4
  { battle: 13, catch: 12, item: 10, trainer: 27, question: 13, pokecenter: 0,  move_tutor: 8, trade: 8, legendary: 0 },
  // L5
  { battle: 13, catch: 10, item:  8, trainer: 27, question: 18, pokecenter: 0,  move_tutor: 8, trade: 7, legendary: 0 },
  // L6
  { battle: 20, catch:  9, item: 14, trainer: 18, question:  9, pokecenter: 0,  move_tutor: 0, trade: 0, legendary: 0 },
];

function weightedRandom(weights) {
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  let r = rng() * total;
  for (const [k, v] of Object.entries(weights)) {
    r -= v;
    if (r <= 0) return k;
  }
  return Object.keys(weights)[0];
}

const MAP_THEMES = [
  {
    name: 'verdant',
    accent: '#74e286',
    edge: '#86d695',
    glow: '#b4f6b0',
    overlay: 'linear-gradient(180deg, rgba(28, 60, 28, 0.26), rgba(10, 16, 6, 0.36))',
    filter: 'contrast(1.05) saturate(1.05)',
  },
  {
    name: 'crystal',
    accent: '#74d8ff',
    edge: '#98e9ff',
    glow: '#d4f5ff',
    overlay: 'linear-gradient(180deg, rgba(18, 30, 60, 0.2), rgba(8, 12, 26, 0.42))',
    filter: 'contrast(1.08) saturate(1.1)',
  },
  {
    name: 'ember',
    accent: '#ffb86b',
    edge: '#ffd48f',
    glow: '#ffe2b0',
    overlay: 'linear-gradient(180deg, rgba(64, 34, 14, 0.24), rgba(18, 10, 8, 0.36))',
    filter: 'contrast(1.02) saturate(1.1)',
  },
  {
    name: 'twilight',
    accent: '#b48eff',
    edge: '#d2b8ff',
    glow: '#ebdaff',
    overlay: 'linear-gradient(180deg, rgba(22, 16, 46, 0.24), rgba(10, 8, 30, 0.4))',
    filter: 'contrast(1.06) saturate(1.05)',
  },
];

function getMapTheme(mapIndex) {
  return MAP_THEMES[mapIndex % MAP_THEMES.length];
}

function getStoryRegionNodeTheme(regionKey = 'kanto') {
  const themes = {
    kanto: {
      aura: '#8be8ff',
      edge: '#79d2ff',
      clickableGlowOuter: '#ffffff',
      clickableGlowInner: '#ffe066',
      clickableStroke: '#ffffff',
      bossRing: '#f4d27a',
      bossGlow: '#ffd86b',
      spriteShadow: '#ffffff',
      inactiveStroke: '#555',
      dimStroke: '#444',
      text: '#ffffff',
      dimText: '#aaa',
      colors: {
        [NODE_TYPES.START]: '#4a4a6a',
        [NODE_TYPES.BATTLE]: '#6a2a2a',
        [NODE_TYPES.CATCH]: '#2a6a2a',
        [NODE_TYPES.ITEM]: '#2a4a6a',
        [NODE_TYPES.QUESTION]: '#6a4a2a',
        [NODE_TYPES.BOSS]: '#8a2a8a',
        [NODE_TYPES.POKECENTER]: '#006666',
        [NODE_TYPES.TRAINER]: '#6a3a1a',
        [NODE_TYPES.LEGENDARY]: '#7a6a00',
        [NODE_TYPES.MOVE_TUTOR]: '#3a4a6a',
        [NODE_TYPES.TRADE]: '#1a5a5a',
      },
    },
    johto: {
      aura: '#8df0d5',
      edge: '#7de4c7',
      clickableGlowOuter: '#d7fff5',
      clickableGlowInner: '#8df0d5',
      clickableStroke: '#d7fff5',
      bossRing: '#b8f1ff',
      bossGlow: '#8edfff',
      spriteShadow: '#b6fff0',
      inactiveStroke: '#506072',
      dimStroke: '#394657',
      text: '#effbff',
      dimText: '#b6c7d8',
      colors: {
        [NODE_TYPES.START]: '#36506a',
        [NODE_TYPES.BATTLE]: '#7a3e3a',
        [NODE_TYPES.CATCH]: '#2e7355',
        [NODE_TYPES.ITEM]: '#3c577d',
        [NODE_TYPES.QUESTION]: '#7b6540',
        [NODE_TYPES.BOSS]: '#4e5f9c',
        [NODE_TYPES.POKECENTER]: '#2b7b83',
        [NODE_TYPES.TRAINER]: '#6d4f38',
        [NODE_TYPES.LEGENDARY]: '#8b7a34',
        [NODE_TYPES.MOVE_TUTOR]: '#4c5b84',
        [NODE_TYPES.TRADE]: '#2f6f73',
      },
    },
    hoenn: {
      aura: '#89e6ff',
      edge: '#6cc8ff',
      clickableGlowOuter: '#ddf8ff',
      clickableGlowInner: '#8cdfff',
      clickableStroke: '#e7fbff',
      bossRing: '#ffe2a8',
      bossGlow: '#ffbe66',
      spriteShadow: '#bfeeff',
      inactiveStroke: '#4b596d',
      dimStroke: '#394556',
      text: '#eff8ff',
      dimText: '#b9c7da',
      colors: {
        [NODE_TYPES.START]: '#34597b',
        [NODE_TYPES.BATTLE]: '#8b4a38',
        [NODE_TYPES.CATCH]: '#2f7b63',
        [NODE_TYPES.ITEM]: '#3e638d',
        [NODE_TYPES.QUESTION]: '#8b6f47',
        [NODE_TYPES.BOSS]: '#5d5d9e',
        [NODE_TYPES.POKECENTER]: '#2d848f',
        [NODE_TYPES.TRAINER]: '#7a563a',
        [NODE_TYPES.LEGENDARY]: '#9a7b35',
        [NODE_TYPES.MOVE_TUTOR]: '#506392',
        [NODE_TYPES.TRADE]: '#357786',
      },
    },
    sinnoh: {
      aura: '#b8dcff',
      edge: '#8cbcf3',
      clickableGlowOuter: '#eef7ff',
      clickableGlowInner: '#b4d9ff',
      clickableStroke: '#edf6ff',
      bossRing: '#f5d9ff',
      bossGlow: '#d2a8ff',
      spriteShadow: '#d6e9ff',
      inactiveStroke: '#525c73',
      dimStroke: '#3b4459',
      text: '#f4f8ff',
      dimText: '#c2cad9',
      colors: {
        [NODE_TYPES.START]: '#49608b',
        [NODE_TYPES.BATTLE]: '#7f4950',
        [NODE_TYPES.CATCH]: '#437a61',
        [NODE_TYPES.ITEM]: '#536fa1',
        [NODE_TYPES.QUESTION]: '#857152',
        [NODE_TYPES.BOSS]: '#6d5c9f',
        [NODE_TYPES.POKECENTER]: '#41839a',
        [NODE_TYPES.TRAINER]: '#6f5b48',
        [NODE_TYPES.LEGENDARY]: '#8e7b57',
        [NODE_TYPES.MOVE_TUTOR]: '#59679c',
        [NODE_TYPES.TRADE]: '#4a7687',
      },
    },
    unova: {
      aura: '#b6f0ef',
      edge: '#7ed3d0',
      clickableGlowOuter: '#edffff',
      clickableGlowInner: '#b0f1f0',
      clickableStroke: '#eafefe',
      bossRing: '#d9fff4',
      bossGlow: '#9ee9de',
      spriteShadow: '#d2f8ff',
      inactiveStroke: '#4d5a6d',
      dimStroke: '#374557',
      text: '#f2fdff',
      dimText: '#bed2d9',
      colors: {
        [NODE_TYPES.START]: '#3f6b7b',
        [NODE_TYPES.BATTLE]: '#7d4d44',
        [NODE_TYPES.CATCH]: '#3d8773',
        [NODE_TYPES.ITEM]: '#4d77a2',
        [NODE_TYPES.QUESTION]: '#7f7455',
        [NODE_TYPES.BOSS]: '#586b9e',
        [NODE_TYPES.POKECENTER]: '#3f8f94',
        [NODE_TYPES.TRAINER]: '#6f5a49',
        [NODE_TYPES.LEGENDARY]: '#8d7451',
        [NODE_TYPES.MOVE_TUTOR]: '#4e6894',
        [NODE_TYPES.TRADE]: '#3f7f8e',
      },
    },
    kalos: {
      aura: '#ffd7ef',
      edge: '#eab8ff',
      clickableGlowOuter: '#fff2fb',
      clickableGlowInner: '#ffd7ef',
      clickableStroke: '#fff4fd',
      bossRing: '#ffe79c',
      bossGlow: '#ffb7de',
      spriteShadow: '#ffe9f8',
      inactiveStroke: '#5f5970',
      dimStroke: '#443d55',
      text: '#fff7fe',
      dimText: '#d6c5d8',
      colors: {
        [NODE_TYPES.START]: '#6c4f8a',
        [NODE_TYPES.BATTLE]: '#88445f',
        [NODE_TYPES.CATCH]: '#4f886c',
        [NODE_TYPES.ITEM]: '#5c6fa2',
        [NODE_TYPES.QUESTION]: '#8a6a53',
        [NODE_TYPES.BOSS]: '#8b4ea0',
        [NODE_TYPES.POKECENTER]: '#4a8aa3',
        [NODE_TYPES.TRAINER]: '#7c5872',
        [NODE_TYPES.LEGENDARY]: '#9a7e4b',
        [NODE_TYPES.MOVE_TUTOR]: '#6f6ea8',
        [NODE_TYPES.TRADE]: '#4f7e93',
      },
    },
  };
  return themes[regionKey] || themes.kanto;
}

function hashStringToUnit(str) {
  let h = 0;
  for (const ch of str) h = (h * 31 + ch.charCodeAt(0)) | 0;
  return ((h >>> 0) % 1000) / 999;
}

function getNodeOffset(nodeId, mapIndex, range) {
  const h = hashStringToUnit(`${mapIndex}:${nodeId}`);
  return (h - 0.5) * range;
}

function generateMap(mapIndex, nuzlockeMode = false) {
  // Layer sizes: start(1), catch/battle(2), 3,4,3,4,3,2, boss(1)
  const CONTENT_SIZES = [3, 4, 3, 4, 3, 2]; // layers 2–7
  const bossLayerIdx  = 2 + CONTENT_SIZES.length; // = 8
  const bossId        = `n${bossLayerIdx}_0`;

  // ── Helpers ──────────────────────────────────────────────────────

  const assignTrainerSprite = (node, nodeId) => {
    const availableKeys = TRAINER_SPRITE_KEYS.filter(k => {
      if (k === 'aceTrainer' && mapIndex >= 6) return false;
      if (k === 'policeman'  && mapIndex >= 4) return false;
      return true;
    });
    let h = 0;
    for (const ch of nodeId) h = (h * 31 + ch.charCodeAt(0)) | 0;
    node.trainerSprite = availableKeys[Math.abs(h) % availableKeys.length];
  };

  const makeNode = (id, type, layer, col, extra = {}) => {
    const node = { id, type, layer, col, ...extra };
    if (type === NODE_TYPES.TRAINER) assignTrainerSprite(node, id);
    return node;
  };

  // Pick a weighted-random node type; ci = content layer index (0–5)
  const pickType = (ci) => {
    const w = { ...NODE_WEIGHTS[Math.min(ci, NODE_WEIGHTS.length - 1)] };
    if (!(typeof state !== 'undefined' && state.isEndlessMode) && ci >= 2) {
      if (mapIndex >= 6) w.legendary = 5;
      else if (mapIndex >= 4) w.legendary = 3;
    }
    if (nuzlockeMode) { w.catch = 0; w.trade = 0; }
    if (typeof state !== 'undefined' && state.isEndlessMode) { w.trade = 0; w.catch = Math.floor(w.catch / 2); }
    const type = weightedRandom(w);
    // Endless region 3: 1/6 catch nodes become legendary encounters
    if (type === NODE_TYPES.CATCH &&
        typeof state !== 'undefined' && state.isEndlessMode &&
        typeof endlessState !== 'undefined' && endlessState.regionNumber === 3 &&
        rng() < 1 / 6) {
      return NODE_TYPES.LEGENDARY;
    }
    return type;
  };

  // Each node at position i in fromLayer connects to the 2 positionally
  // nearest nodes in toLayer (like walking down-left and down-right).
  const makeLayerEdges = (fromLayer, toLayer) => {
    const N = fromLayer.length;
    const M = toLayer.length;
    if (N === 1) {
      // Single source fans out to all targets
      return toLayer.map(t => ({ from: fromLayer[0].id, to: t.id }));
    }
    const edges = [];
    for (let i = 0; i < N; i++) {
      let left, right;
      if (M === 1) {
        left = right = 0;
      } else if (M < N && i === 0) {
        // Leftmost node on a shrinking layer → only the leftmost node below
        left = right = 0;
      } else if (M < N && i === N - 1) {
        // Rightmost node on a shrinking layer → only the rightmost node below
        left = right = M - 1;
      } else {
        const pos = i * (M - 1) / (N - 1);
        left  = Math.floor(pos);
        right = left + 1;
        if (right >= M) { right = M - 1; left = M - 2; }
      }
      edges.push({ from: fromLayer[i].id, to: toLayer[left].id });
      if (left !== right) {
        edges.push({ from: fromLayer[i].id, to: toLayer[right].id });
      }
    }
    return edges;
  };

  // ── Build layers ─────────────────────────────────────────────────

  const layers = [];

  // Layer 0: Start
  layers.push([makeNode('n0_0', NODE_TYPES.START, 0, 0)]);

  // Layer 1: always Catch (left) and Battle (right); nuzlocke gets two Catch nodes
  layers.push([
    makeNode('n1_0', NODE_TYPES.CATCH,  1, 0),
    makeNode('n1_1', nuzlockeMode ? NODE_TYPES.CATCH : NODE_TYPES.BATTLE, 1, 1),
  ]);

  // Layers 2–7: random content nodes
  for (let ci = 0; ci < CONTENT_SIZES.length; ci++) {
    const l    = ci + 2;
    const size = CONTENT_SIZES[ci];
    const layer = Array.from({ length: size }, (_, c) => makeNode(`n${l}_${c}`, pickType(ci), l, c));

    // Guarantee a pokecenter in the last content layer
    if (ci === CONTENT_SIZES.length - 1 && !layer.some(n => n.type === NODE_TYPES.POKECENTER)) {
      const idx = Math.floor(rng() * size);
      layer[idx].type = NODE_TYPES.POKECENTER;
    }

    layers.push(layer);
  }

  // Boss layer
  layers.push([makeNode(bossId, NODE_TYPES.BOSS, bossLayerIdx, 0, { mapIndex })]);

  // ── Build edges ──────────────────────────────────────────────────

  const edges = [];
  for (let l = 0; l < layers.length - 1; l++) {
    edges.push(...makeLayerEdges(layers[l], layers[l + 1]));
  }

  // ── Flatten & initialise nodes ───────────────────────────────────

  const nodes = {};
  for (const layer of layers) {
    for (const n of layer) {
      n.visited    = false;
      n.accessible = false;
      n.revealed   = true;
      nodes[n.id]  = n;
    }
  }

  nodes['n0_0'].visited = true;
  edges.filter(e => e.from === 'n0_0').forEach(e => { nodes[e.to].accessible = true; });

  return { nodes, edges, layers, mapIndex };
}

function getAccessibleNodes(map) {
  return Object.values(map.nodes).filter(n => n.accessible && !n.visited);
}

function advanceFromNode(map, nodeId) {
  const node = map.nodes[nodeId];
  if (!node) return;
  node.visited = true;
  node.accessible = false;

  // Lock sibling nodes in the same layer — the unchosen branches are gone
  for (const n of Object.values(map.nodes)) {
    if (n.layer === node.layer && n.id !== nodeId && n.accessible) {
      n.accessible = false;
    }
  }

  // Make next layer nodes accessible
  for (const edge of map.edges) {
    if (edge.from === nodeId) {
      const target = map.nodes[edge.to];
      if (target) {
        target.revealed = true;
        target.accessible = true;
      }
    }
  }
}

// ---- Sprite helpers ----

// Keys must match the filename stems in /sprites/ exactly (case-sensitive)
const TRAINER_SPRITE_KEYS = [
  'aceTrainer', 'bugCatcher', 'fireSpitter', 'fisher',
  'hiker', 'oldGuy', 'policeman', 'Scientist', 'teamRocket',
];

const TRAINER_SPRITE_NAMES = {
  aceTrainer:  'Ace Trainer',
  bugCatcher:  'Bug Catcher',
  fireSpitter: 'Fire Breather',
  fisher:      'Fisher',
  hiker:       'Hiker',
  oldGuy:      'Old Man',
  policeman:   'Policeman',
  Scientist:   'Scientist',
  teamRocket:  'Team Rocket Grunt',
};

const RANDOM_TRAINER_SPRITES = TRAINER_SPRITE_KEYS.map(k => `sprites/${k}.png`);

const GYM_LEADER_SPRITES = [
  'sprites/brock.png',
  'sprites/misty.png',
  'sprites/lt. surge.png',
  'sprites/erika.png',
  'sprites/koga.png',
  'sprites/sabrina.png',
  'sprites/blaine.png',
  'sprites/giovanni.png',
];

function getNodeSprite(node) {
  const regionKey = (typeof state !== 'undefined' && !state.isEndlessMode && typeof getCurrentStoryRegion === 'function')
    ? (getCurrentStoryRegion()?.key || 'kanto')
    : 'kanto';
  const spriteRoot = regionKey === 'johto'
    ? 'sprites/johto'
    : regionKey === 'hoenn'
      ? 'sprites/Hoeen'
      : regionKey === 'sinnoh'
        ? 'sprites/Sinnoh'
        : regionKey === 'unova'
          ? 'sprites/Einall'
          : regionKey === 'kalos'
            ? 'sprites/Kalos'
        : 'sprites';
  const ICON_SPRITES = {
    [NODE_TYPES.BATTLE]:    `${spriteRoot}/grass.png`,
    [NODE_TYPES.CATCH]:     `${spriteRoot}/catchPokemon.png`,
    [NODE_TYPES.ITEM]:      `${spriteRoot}/itemIcon.png`,
    [NODE_TYPES.TRADE]:     `${spriteRoot}/tradeIcon.png`,
    [NODE_TYPES.LEGENDARY]: `${spriteRoot}/legendaryEncounter.png`,
    [NODE_TYPES.QUESTION]:  `${spriteRoot}/questionMark.png`,
    [NODE_TYPES.POKECENTER]: `${spriteRoot}/Poke Center.png`,
    [NODE_TYPES.MOVE_TUTOR]: `${spriteRoot}/moveTutor.png`,
  };
  if (ICON_SPRITES[node.type]) return ICON_SPRITES[node.type];
  if (node.type === NODE_TYPES.TRAINER) {
    const key = node.trainerSprite || (() => {
      let h = 0;
      for (const c of node.id) h = (h * 31 + c.charCodeAt(0)) | 0;
      return TRAINER_SPRITE_KEYS[Math.abs(h) % TRAINER_SPRITE_KEYS.length];
    })();
    return spriteRoot === 'sprites' ? `sprites/${key}.png` : `${spriteRoot}/${key}.png`;
  }
  if (node.type === NODE_TYPES.BOSS) {
    if (typeof state !== 'undefined' && state.isEndlessMode) {
      const endlessRegionId = typeof endlessState !== 'undefined' ? endlessState.stageNumber : null;
      const endlessRegionConfig = (typeof STORY_REGION_CONFIGS !== 'undefined' && endlessRegionId)
        ? STORY_REGION_CONFIGS[endlessRegionId]
        : null;
      if (endlessRegionConfig?.mysteryTrainerSprite) return endlessRegionConfig.mysteryTrainerSprite;

      const trainerSprite = typeof endlessState !== 'undefined' && endlessState.currentRegion
        ? endlessState.currentRegion.trainers[endlessState.mapIndexInRegion]?.archetype?.sprite
        : null;
      const endlessSpriteMap = {
        acetrainer: 'sprites/aceTrainer.png',
        aceTrainer: 'sprites/aceTrainer.png',
        bugcatcher: 'sprites/bugCatcher.png',
        bugCatcher: 'sprites/bugCatcher.png',
        hiker: 'sprites/hiker.png',
        scientist: 'sprites/Scientist.png',
        fisher: 'sprites/fisher.png',
        fisherman: 'sprites/fisher.png',
        teamrocket: 'sprites/teamRocket.png',
        policeman: 'sprites/policeman.png',
        oldguy: 'sprites/oldGuy.png',
        gentleman: 'sprites/oldGuy.png',
        burglar: 'sprites/fireSpitter.png',
        firespitter: 'sprites/fireSpitter.png',
      };
      if (trainerSprite?.startsWith('sprites/') || trainerSprite?.startsWith('http')) return trainerSprite;
      if (trainerSprite && endlessSpriteMap[trainerSprite]) return endlessSpriteMap[trainerSprite];
      return 'sprites/aceTrainer.png';
    }
    const mi = node.mapIndex ?? -1;
    if (typeof getCurrentGymLeaders === 'function') {
      const leaders = getCurrentGymLeaders();
      if (mi >= 0 && mi < leaders.length && leaders[mi]?.sprite) return leaders[mi].sprite;
    }
    if (mi === 8 && typeof getCurrentEliteFour === 'function') {
      const bosses = getCurrentEliteFour();
      const idx = typeof state !== 'undefined' ? Math.max(0, state.eliteIndex || 0) : 0;
      if (bosses[idx]?.sprite) return bosses[idx].sprite;
    }
    if (mi >= 0 && mi < GYM_LEADER_SPRITES.length) return GYM_LEADER_SPRITES[mi];
    return 'sprites/champ.png';
  }
  return null;
}

// Rendering — top-to-bottom layout
const _mapTooltip = (() => {
  let el = null;
  return {
    show(label, x, y) {
      if (!document.getElementById('map-screen')?.classList.contains('active')) return;
      if (!el) el = document.getElementById('map-node-tooltip');
      if (!el) return;
      el.innerHTML = label;
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.classList.add('visible');
    },
    move(x, y) {
      if (!el) return;
      el.style.left = x + 'px';
      el.style.top = y + 'px';
    },
    hide() {
      if (!el) el = document.getElementById('map-node-tooltip');
      if (el) el.classList.remove('visible');
    },
  };
})();

function getPreviewAdjustedLevel(level, isBoss = false) {
  if (typeof getAdjustedEnemyLevel === 'function') {
    return getAdjustedEnemyLevel(level, isBoss);
  }
  const safeLevel = Math.max(1, Number(level) || 1);
  return Math.max(2, safeLevel + (isBoss ? -2 : -1));
}

function renderMapTooltipTeam(entries, isBoss = false) {
  return (entries || []).map(p => {
    const previewLevel = getPreviewAdjustedLevel(p.level, isBoss);
    return `<div class="map-tooltip-team-row"><span class="map-tooltip-mon-name">${p.name}</span><span class="map-tooltip-mon-level">Lv${previewLevel}</span></div>`;
  }).join('');
}

function renderMap(map, container, onNodeClick) {
  container.innerHTML = '';
  const theme = getMapTheme(map.mapIndex ?? 0);
  const storyTheme = getStoryRegionNodeTheme(container.dataset.storyRegion || 'kanto');
  container.dataset.mapTheme = theme.name;
  const W = container.clientWidth || 600;
  const H = container.clientHeight || 500;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', W);
  svg.setAttribute('height', H);
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.borderRadius = '26px';
  svg.style.overflow = 'hidden';

  const layerCount = map.layers.length;
  // Keep tall trainer/boss sprites away from the clipped top/bottom edge
  // when the map viewport is compressed by side panels or mobile chrome.
  const padY = Math.max(56, Math.min(76, Math.round(H * 0.11)));

  const positions = {};
  for (let l = 0; l < map.layers.length; l++) {
    const layer = map.layers[l];
    const y = layerCount > 1 ? padY + (l / (layerCount - 1)) * (H - 2 * padY) : H / 2;
    const nodeGap = W / (layer.length + 0.2);
    for (let c = 0; c < layer.length; c++) {
      const baseX = layer.length === 1 ? W / 2 : W / 2 + (c - (layer.length - 1) / 2) * nodeGap;
      const jitterX = getNodeOffset(layer[c].id, map.mapIndex ?? 0, Math.min(nodeGap * 0.18, 28));
      const jitterY = getNodeOffset(`${layer[c].id}-y`, map.mapIndex ?? 0, Math.min(padY * 0.3, 14));
      positions[layer[c].id] = { x: baseX + jitterX, y: y + jitterY };
    }
  }

  const bgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  bgGroup.setAttribute('opacity', '0.12');
  for (let l = 0; l < map.layers.length; l++) {
    const ids = map.layers[l].map(n => positions[n.id]);
    if (!ids.length) continue;
    const rowY = ids[0].y;
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', W / 2);
    circle.setAttribute('cy', rowY);
    circle.setAttribute('r', Math.max(28, Math.min(70, H / (map.layers.length * 1.5))));
    circle.setAttribute('fill', storyTheme.aura || theme.accent);
    circle.setAttribute('filter', 'url(#mapGlow)');
    bgGroup.appendChild(circle);
  }
  svg.appendChild(bgGroup);

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const glowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  glowFilter.setAttribute('id', 'mapGlow');
  glowFilter.innerHTML = '<feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>';
  defs.appendChild(glowFilter);
  svg.appendChild(defs);

  // Draw ALL edges
  for (const edge of map.edges) {
    const from = positions[edge.from];
    const to = positions[edge.to];
    if (!from || !to) continue;
    const fromNode = map.nodes[edge.from];
    const toNode   = map.nodes[edge.to];
    const travelled = fromNode.visited && toNode.visited;
    const onPath = (fromNode.visited || fromNode.accessible) && (toNode.visited || toNode.accessible);

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const cp1x = from.x + dx * 0.18;
    const cp1y = from.y + dy * 0.35;
    const cp2x = to.x - dx * 0.18;
    const cp2y = to.y - dy * 0.35;
    path.setAttribute('d', `M${from.x} ${from.y} C${cp1x} ${cp1y} ${cp2x} ${cp2y} ${to.x} ${to.y}`);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', travelled ? '#333' : onPath ? (storyTheme.edge || theme.edge) : '#2a2a35');
    path.setAttribute('stroke-width', onPath ? '3' : '2');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    if (!onPath) path.setAttribute('stroke-dasharray', '5,7');
    svg.appendChild(path);
  }


  // Draw ALL nodes (all are revealed)
  for (const [id, node] of Object.entries(map.nodes)) {
    const pos = positions[id];
    if (!pos) continue;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${pos.x},${pos.y})`);

    const isClickable = node.accessible && !node.visited;
    const isInaccessible = !node.accessible && !node.visited;
    const isCurrent = state.currentNode && node.id === state.currentNode.id;

    g.style.cursor = isClickable ? 'pointer' : 'default';
    if (isInaccessible) { g.style.opacity = '0.75'; }
    if (node.visited) g.style.filter = 'grayscale(0.5) brightness(0.62)';
    if (isClickable) {
      g.style.filter = `drop-shadow(0 0 6px ${storyTheme.clickableGlowOuter}) drop-shadow(0 0 3px ${storyTheme.clickableGlowInner})`;
    }

    const isBossNode = node.type === NODE_TYPES.BOSS;
    const sprite = getNodeSprite(node);

    if (isBossNode) {
      const bossHalo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      bossHalo.setAttribute('r', isClickable ? '28' : '26');
      bossHalo.setAttribute('fill', 'none');
      bossHalo.setAttribute('stroke', storyTheme.bossRing);
      bossHalo.setAttribute('stroke-width', isClickable ? '3' : '2');
      bossHalo.setAttribute('opacity', isClickable ? '0.95' : '0.72');
      bossHalo.setAttribute('filter', 'url(#mapGlow)');
      g.appendChild(bossHalo);
    }

    if (sprite) {
      // ---- Sprite-based node ----

      // Sprite image, no circle background
      // Human figures (trainer/boss) are taller than wide; icons are square
      const isHumanFigure = node.type === NODE_TYPES.TRAINER || node.type === NODE_TYPES.BOSS;
      const iw = isHumanFigure ? (isBossNode ? 52 : 38) : (isBossNode ? 52 : 40);
      const ih = isHumanFigure ? (isBossNode ? 52 : 52) : (isBossNode ? 52 : 40);

      const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      img.setAttribute('href', sprite.replace(/ /g, '%20'));
      img.setAttribute('x', -(iw / 2));
      img.setAttribute('y', -(ih / 2));
      img.setAttribute('width', iw);
      img.setAttribute('height', ih);
      img.setAttribute('image-rendering', 'pixelated');
      img.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      g.appendChild(img);

      // Accessible: pulsing pixelated shadow under the sprite
      if (isClickable) {
        const px = 4; // pixel grid size
        const shadowY = ih / 2 - 2;
        const shadow = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        shadow.setAttribute('fill', storyTheme.spriteShadow);

        const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        anim.setAttribute('attributeName', 'opacity');
        anim.setAttribute('values', '0.55;0.1;0.55');
        anim.setAttribute('dur', '1.5s');
        anim.setAttribute('repeatCount', 'indefinite');
        shadow.appendChild(anim);

        // Three rows of rectangles snapped to px grid — narrow/wide/narrow
        const rows = [
          Math.round(iw * 0.35 / px) * px,
          Math.round(iw * 0.55 / px) * px,
          Math.round(iw * 0.35 / px) * px,
        ];
        rows.forEach((w, i) => {
          const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rect.setAttribute('x', -(w / 2));
          rect.setAttribute('y', shadowY + (i - 1) * px - px / 2);
          rect.setAttribute('width', w);
          rect.setAttribute('height', px);
          shadow.appendChild(rect);
        });

        g.insertBefore(shadow, img); // behind sprite
      }

      if (isCurrent) {
        const check = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        check.setAttribute('text-anchor', 'middle');
        check.setAttribute('dominant-baseline', 'central');
        check.setAttribute('font-size', '16');
        check.setAttribute('fill', '#fff');
        check.textContent = '✓';
        g.appendChild(check);
      }

    } else {
      // ---- Circle-based node ----
      const r = isBossNode ? 22 : 18;
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('r', r);
      circle.setAttribute('fill', isInaccessible ? '#2a2a3a' : getNodeColor(node, storyTheme));
      circle.setAttribute('stroke', isClickable ? storyTheme.clickableStroke : (isInaccessible ? storyTheme.dimStroke : storyTheme.inactiveStroke));
      circle.setAttribute('stroke-width', isClickable ? '3' : '1');

      if (isClickable) {
        const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        anim.setAttribute('attributeName', 'stroke-opacity');
        anim.setAttribute('values', '1;0.3;1');
        anim.setAttribute('dur', '1.5s');
        anim.setAttribute('repeatCount', 'indefinite');
        circle.appendChild(anim);
      }
      g.appendChild(circle);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'central');
      text.setAttribute('font-size', '14');
      text.setAttribute('fill', isInaccessible ? storyTheme.dimText : storyTheme.text);
      text.textContent = isCurrent ? '✓' : getNodeIcon(node);
      g.appendChild(text);
    }

    const label = getNodeLabel(node);
    let hoverLabel = label;
    if (node.type === NODE_TYPES.BOSS && typeof state !== 'undefined' && state.isEndlessMode) {
      const trainerData = typeof endlessState !== 'undefined' && endlessState.currentRegion
        ? endlessState.currentRegion.trainers[endlessState.mapIndexInRegion]
        : null;
      if (trainerData?.speciesIds?.length) {
        const BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
        const imgs = trainerData.speciesIds.map(id =>
          `<img src="${BASE}${id}.png" class="map-tooltip-sprite" onerror="this.style.display='none'">`
        ).join('');
        const name = trainerData.archetype?.name || '???';
        hoverLabel = `<div class="map-tooltip-title">${name}</div><div class="map-tooltip-sprite-row">${imgs}</div>`;
      }
    }
    g.addEventListener('mouseenter', e => { if (_hoverEnabled) _mapTooltip.show(hoverLabel, e.clientX, e.clientY); });
    g.addEventListener('mousemove',  e => { _mapTooltip.move(e.clientX, e.clientY); if (_hoverEnabled) _mapTooltip.show(hoverLabel, e.clientX, e.clientY); });
    g.addEventListener('mouseleave', () => _mapTooltip.hide());

    // Prevent native long-press image menu on mobile
    g.addEventListener('contextmenu', e => e.preventDefault());

    // Touch: long press shows tooltip, short tap enters node
    let _lpTimer = null;
    let _lpFired = false;
    g.addEventListener('touchstart', e => {
      _lpFired = false;
      const touch = e.touches[0];
      _lpTimer = setTimeout(() => {
        _lpFired = true;
        _mapTooltip.show(label, touch.clientX, touch.clientY);
      }, 400);
    }, { passive: true });
    g.addEventListener('touchmove', () => {
      clearTimeout(_lpTimer);
      _mapTooltip.hide();
    }, { passive: true });
    g.addEventListener('touchend', e => {
      clearTimeout(_lpTimer);
      if (_lpFired) {
        _mapTooltip.hide();
      } else if (isClickable) {
        onNodeClick(node);
      }
      e.preventDefault();
    });

    if (isClickable) {
      g.addEventListener('click', () => onNodeClick(node));
    }

    svg.appendChild(g);
  }

  container.appendChild(svg);
}

function getNodeColor(node, storyTheme = null) {
  if (node.visited) return '#333';
  const colors = storyTheme?.colors || {
    [NODE_TYPES.START]:      '#4a4a6a',
    [NODE_TYPES.BATTLE]:     '#6a2a2a',
    [NODE_TYPES.CATCH]:      '#2a6a2a',
    [NODE_TYPES.ITEM]:       '#2a4a6a',
    [NODE_TYPES.QUESTION]:   '#6a4a2a',
    [NODE_TYPES.BOSS]:       '#8a2a8a',
    [NODE_TYPES.POKECENTER]: '#006666',
    [NODE_TYPES.TRAINER]:    '#6a3a1a',
    [NODE_TYPES.LEGENDARY]:  '#7a6a00',
    [NODE_TYPES.MOVE_TUTOR]: '#3a4a6a',
    [NODE_TYPES.TRADE]:      '#1a5a5a',
  };
  return colors[node.type] || '#444';
}

function getNodeIcon(node) {
  if (node.visited) return '✓';
  const icons = {
    [NODE_TYPES.START]:      '★',
    [NODE_TYPES.BATTLE]:     '⚔',
    [NODE_TYPES.CATCH]:      '⬟',
    [NODE_TYPES.ITEM]:       '✦',
    [NODE_TYPES.QUESTION]:   '?',
    [NODE_TYPES.BOSS]:       '♛',
    [NODE_TYPES.POKECENTER]: '+',
    [NODE_TYPES.TRAINER]:    '⚑',
    [NODE_TYPES.LEGENDARY]:  '⚝',
    [NODE_TYPES.MOVE_TUTOR]: '♪',
    [NODE_TYPES.TRADE]:      '⇄',
  };
  return icons[node.type] || '●';
}

function getNodeLabel(node) {
  if (node.visited) return 'Visited';
  if (node.type === NODE_TYPES.BOSS) {
    const mi = node.mapIndex ?? -1;
    const leaders = typeof getCurrentGymLeaders === 'function'
      ? getCurrentGymLeaders()
      : (typeof GYM_LEADERS !== 'undefined' ? GYM_LEADERS : []);
    if (mi >= 0 && mi < leaders.length) {
      const leader = leaders[mi];
      const teamHtml = renderMapTooltipTeam(leader.team, true);
      return `<div class="map-tooltip-title">${leader.name} - ${leader.type} Gym</div><div class="map-tooltip-team">${teamHtml}</div>`;
    }
    if (mi === 8) {
      return '<div class="map-tooltip-title">Elite Four &amp; Champion</div>';
    }
    return 'Gym Leader';
  }
  const labels = {
    [NODE_TYPES.START]:      'Start',
    [NODE_TYPES.BATTLE]:     'Wild Battle — +1 level',
    [NODE_TYPES.CATCH]:      'Catch Pokemon',
    [NODE_TYPES.ITEM]:       'Item',
    [NODE_TYPES.QUESTION]:   'Random Event',
    [NODE_TYPES.POKECENTER]: 'Pokemon Center',
    [NODE_TYPES.TRAINER]:    `Trainer Battle — +2 levels${node.trainerSprite && TRAINER_SPRITE_NAMES[node.trainerSprite] ? ' — ' + TRAINER_SPRITE_NAMES[node.trainerSprite] : ''}`,
    [NODE_TYPES.LEGENDARY]:  'Legendary Pokemon',
    [NODE_TYPES.MOVE_TUTOR]: 'Move Tutor',
    [NODE_TYPES.TRADE]:      'Trade — swap a Pokémon for one 3 levels higher',
  };
  return labels[node.type] || node.type;
}

