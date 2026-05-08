// Legacy map implementation — unused by index.html. The active map logic is in game.js and map.js.
const player = { team: [], active: null, items: [], badges: [] };
let battleActive = false;
let currentLeaderIndex = 0;
let currentEnemy = null;
let isPlayerTurn = true;

const getSprite = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
const icons = {
  start: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
  grass: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/leaf-stone.png",
  event: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dome-fossil.png",
  trainer: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/star-piece.png",
  item: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png",
  ball: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fast-ball.png",
  swap: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/metal-coat.png",
  boss: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/shiny-stone.png",
  heal: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/full-heal.png",
  shop: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/coin-case.png",
  challenge: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/exp-share.png",
  treasure: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/chest.png"
};

const pokemonNameMap = {
  1: "Bisasam", 2: "Bisaknosp", 3: "Bisaflor", 4: "Glumanda", 5: "Glutexo", 6: "Glurak",
  7: "Shiggy", 8: "Schillok", 9: "Turtok", 10: "Raupy", 11: "Safcon", 12: "Smettbo",
  13: "Hornliu", 14: "Kokuna", 15: "Bibor", 16: "Taubsi", 17: "Tauboga", 18: "Tauboss",
  19: "Rattfratz", 20: "Rattikarl", 21: "Habitak", 22: "Ibitak", 23: "Rettan", 24: "Arbok",
  25: "Pikachu", 26: "Raichu", 27: "Sandan", 28: "Sandamer", 29: "Nidoran♀", 30: "Nidorina",
  31: "Nidoqueen", 32: "Nidoran♂", 33: "Nidorino", 34: "Nidoking", 35: "Piepi", 36: "Pixi",
  37: "Vulpix", 38: "Vulnona", 39: "Pummeluff", 40: "Knuddeluff", 41: "Zubat", 42: "Golbat",
  43: "Myrapla", 44: "Duflor", 45: "Giflor", 46: "Paras", 47: "Parasek", 48: "Bluzuk",
  49: "Omot", 50: "Digda", 51: "Digdri", 52: "Mauzi", 53: "Snobilikat", 54: "Enton",
  55: "Entoron", 56: "Menki", 57: "Rasaff", 58: "Fukano", 59: "Arkani", 60: "Quapsel",
  61: "Quaputzi", 62: "Quappo", 63: "Abra", 64: "Kadabra", 65: "Simsala", 66: "Machollo",
  67: "Maschock", 68: "Machomei", 69: "Knofensa", 70: "Ultrigaria", 71: "Sarzenia",
  72: "Tentacha", 73: "Tentoxa", 74: "Kleinstein", 75: "Georok", 76: "Geowaz", 77: "Ponita",
  78: "Gallopa", 79: "Flegmon", 80: "Lahmus", 81: "Magnetilo", 82: "Magneton", 83: "Porenta",
  84: "Doduo", 85: "Dodrio", 86: "Jurob", 87: "Jugong", 88: "Sleima", 89: "Sleimok",
  90: "Muschas", 91: "Austos", 92: "Nebulak", 93: "Alpollo", 94: "Gengar", 95: "Onix",
  96: "Traumato", 97: "Hypno", 98: "Krabby", 99: "Kingler", 100: "Voltobal", 101: "Lektrobal",
  102: "Owei", 103: "Kokowei", 104: "Tragosso", 105: "Knogga", 106: "Kicklee",
  107: "Nockchan", 108: "Schlurp", 109: "Smogon", 110: "Smogmog", 111: "Rihorn", 112: "Rizeros",
  113: "Chaneira", 114: "Tangela", 115: "Kangama", 116: "Seeper", 117: "Seemon", 118: "Goldini",
  119: "Golking", 120: "Sterndu", 121: "Starmie", 122: "Pantimos", 123: "Sichlor", 124: "Rossana",
  125: "Elektek", 126: "Magmar", 127: "Pinsir", 128: "Tauros", 129: "Karpador", 130: "Garados",
  131: "Lapras", 132: "Ditto", 133: "Evoli", 134: "Aquana", 135: "Blitza", 136: "Flamara",
  137: "Porygon", 138: "Amonitas", 139: "Amoroso", 140: "Kabuto", 141: "Kabutops", 142: "Aerodactyl",
  143: "Relaxo", 144: "Arktos", 145: "Zapdos", 146: "Lavados", 147: "Dratini", 148: "Dragonir",
  149: "Dragoran", 150: "Mewtu", 151: "Mew"
};

const pokemonTypeMap = {
  1: "grass", 2: "grass", 3: "grass", 4: "fire", 5: "fire", 6: "fire", 7: "water", 8: "water",
  9: "water", 10: "bug", 11: "bug", 12: "bug", 13: "bug", 14: "bug", 15: "bug", 16: "normal",
  17: "normal", 18: "normal", 19: "normal", 20: "normal", 21: "normal", 22: "normal",
  23: "poison", 24: "poison", 25: "electric", 26: "electric", 27: "ground", 28: "ground",
  29: "poison", 30: "poison", 31: "poison", 32: "poison", 33: "poison", 34: "poison",
  35: "fairy", 36: "fairy", 37: "fire", 38: "fire", 39: "fairy", 40: "fairy", 41: "poison",
  42: "poison", 43: "grass", 44: "grass", 45: "grass", 46: "bug", 47: "bug", 48: "bug",
  49: "bug", 50: "ground", 51: "ground", 52: "normal", 53: "normal", 54: "water", 55: "water",
  56: "fighting", 57: "fighting", 58: "fire", 59: "fire", 60: "water", 61: "water", 62: "water",
  63: "psychic", 64: "psychic", 65: "psychic", 66: "fighting", 67: "fighting", 68: "fighting",
  69: "grass", 70: "grass", 71: "grass", 72: "water", 73: "water", 74: "rock", 75: "rock",
  76: "rock", 77: "fire", 78: "fire", 79: "water", 80: "water", 81: "electric", 82: "electric",
  83: "normal", 84: "normal", 85: "normal", 86: "water", 87: "water", 88: "poison", 89: "poison",
  90: "water", 91: "water", 92: "ghost", 93: "ghost", 94: "ghost", 95: "rock", 96: "psychic",
  97: "psychic", 98: "water", 99: "water", 100: "electric", 101: "electric", 102: "grass",
  103: "grass", 104: "ground", 105: "ground", 106: "fighting", 107: "fighting", 108: "normal",
  109: "poison", 110: "poison", 111: "ground", 112: "ground", 113: "normal", 114: "grass",
  115: "normal", 116: "water", 117: "water", 118: "water", 119: "water", 120: "water",
  121: "water", 122: "psychic", 123: "bug", 124: "psychic", 125: "electric", 126: "fire",
  127: "bug", 128: "normal", 129: "water", 130: "water", 131: "water", 132: "normal",
  133: "normal", 134: "water", 135: "electric", 136: "fire", 137: "normal", 138: "rock",
  139: "rock", 140: "rock", 141: "rock", 142: "rock", 143: "normal", 144: "ice",
  145: "electric", 146: "fire", 147: "dragon", 148: "dragon", 149: "dragon", 150: "psychic",
  151: "psychic"
};

const typeMoves = {
  grass: ["Rasierblatt", "Säure", "Rankenhieb"],
  fire: ["Glut", "Feuerzahn", "Flammenwurf"],
  water: ["Aquaknarre", "Blubber", "Hydropumpe"],
  electric: ["Donnerschock", "Blitz", "Stromstoß"],
  bug: ["Käferbiss", "Fadenschuss", "Wickel"],
  flying: ["Windstoß", "Sturzflug", "Luftschnitt"],
  ground: ["Erdbeben", "Dirtbomb", "Sandgrab"],
  poison: ["Giftschock", "Toxin", "Matschbombe"],
  rock: ["Steinhagel", "Felswurf", "Sandsturm"],
  ghost: ["Spukball", "Schattenstoß", "Fluch"],
  psychic: ["Psychokinese", "Konfusion", "Spukball"],
  normal: ["Tackle", "Kratzfurie", "Wirbelwind"],
  fighting: ["Kraftwelle", "Wirbelhieb", "Kreuzhieb"],
  fairy: ["Mondgewalt", "Charme", "Magieschild"],
  ice: ["Eisstrahl", "Frosthauch", "Blizzard"]
};

const typeEffectiveness = {
  grass: { water: 2, ground: 2, rock: 2, fire: 0.5, grass: 0.5, poison: 0.5, flying: 0.5, bug: 0.5 },
  fire: { grass: 2, bug: 2, steel: 2, ice: 2, water: 0.5, fire: 0.5, rock: 0.5, ground: 0.5 },
  water: { fire: 2, ground: 2, rock: 2, grass: 0.5, water: 0.5, electric: 0.5 },
  electric: { water: 2, flying: 2, electric: 0.5, grass: 0.5, ground: 0 },
  bug: { grass: 2, psychic: 2, dark: 2, fire: 0.5, flying: 0.5, rock: 0.5 },
  flying: { grass: 2, fighting: 2, bug: 2, electric: 0.5, rock: 0.5, steel: 0.5 },
  ground: { fire: 2, electric: 2, poison: 2, rock: 2, steel: 2, grass: 0.5, bug: 0.5, flying: 0 },
  poison: { grass: 2, fairy: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5 },
  rock: { fire: 2, ice: 2, flying: 2, bug: 2, fighting: 0.5, ground: 0.5, steel: 0.5 },
  ghost: { psychic: 2, ghost: 2, dark: 0.5, normal: 0 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, steel: 0.5, dark: 0 },
  normal: { rock: 0.5, ghost: 0, steel: 0.5, fighting: 1 },
  fighting: { normal: 2, rock: 2, steel: 2, ice: 2, dark: 2, flying: 0.5, poison: 0.5, psychic: 0.5, bug: 0.5, fairy: 0.5 },
  fairy: { fighting: 2, dragon: 2, dark: 2, fire: 0.5, poison: 0.5, steel: 0.5 },
  ice: { grass: 2, ground: 2, flying: 2, dragon: 2, fire: 0.5, water: 0.5, ice: 0.5 }
};

function getPokemonName(id) {
  return pokemonNameMap[id] || `Pokémon #${id}`;
}

function getPokemonType(id) {
  return pokemonTypeMap[id] || "normal";
}

function getAttackName(type) {
  const moves = typeMoves[type] || typeMoves.normal;
  return moves[Math.floor(Math.random() * moves.length)];
}

function getTypeEffectiveness(attackerType, defenderType) {
  if (!attackerType || !defenderType) return 1;
  const attacker = typeEffectiveness[attackerType] || {};
  return attacker[defenderType] || 1;
}

function capitalize(word) {
  return typeof word === "string" && word.length ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}

function getMapIcon(event) {
  if (event === "start") return icons.start;
  if (event === "grass") return icons.grass;
  if (event === "event") return icons.event;
  if (event === "trainer") return icons.trainer;
  if (event === "boss") return icons.boss;
  if (event === "heal") return icons.heal;
  if (event === "shop") return icons.shop;
  if (event === "challenge") return icons.challenge;
  if (event === "treasure") return icons.treasure;
  return icons.grass;
}


const gymLeaders = [
  { name: "Brock", badge: "Stein-Orden", pokemonId: 95, pokemonName: "Onix" },
  { name: "Misty", badge: "Quell-Orden", pokemonId: 121, pokemonName: "Starmie" },
  { name: "Lt. Surge", badge: "Blitz-Orden", pokemonId: 26, pokemonName: "Raichu" },
  { name: "Erika", badge: "Blumen-Orden", pokemonId: 45, pokemonName: "Vileplume" }
];

const wildPool = Array.from({ length: 151 }, (_, i) => i + 1);
const pokemonPool = Array.from({ length: 151 }, (_, i) => i + 1);
const trainerNames = ["Rival", "Wanderer", "Trainer", "Hiker", "Veteran"];
const starters = [
  { id: 1, name: "Bisasam", type: "grass", atk: 10, hp: 58 },
  { id: 4, name: "Glumanda", type: "fire", atk: 12, hp: 60 },
  { id: 7, name: "Shiggy", type: "water", atk: 11, hp: 62 }
];

window.onload = showTrainerScreen;

function showTrainerScreen() {
  document.getElementById("screen-content").innerHTML = `
    <div class="trainer-screen">
      <h2>Who are you?</h2>
      <div class="trainer-choices">
        <div class="trainer-card" onclick="chooseTrainer('boy')">
          <div class="trainer-icon-wrap">
            <div class="trainer-icon">👦</div>
          </div>
          <div class="trainer-label">BOY</div>
        </div>
        <div class="trainer-card" onclick="chooseTrainer('girl')">
          <div class="trainer-icon-wrap">
            <div class="trainer-icon">👧</div>
          </div>
          <div class="trainer-label">GIRL</div>
        </div>
      </div>
    </div>`;
}

function chooseTrainer(gender) {
  player.gender = gender;
  showTitleScreen();
}

function showTitleScreen() {
  const continueDisabled = player.active ? "" : "disabled";
  document.getElementById("screen-content").innerHTML = `
    <div class="title-screen">
      <div class="title-panel">
        <div class="game-logo"></div>
        <div class="game-subtitle">Realm of the Arcane</div>
        <p class="title-tagline">Explore shadowed ruins, tame relic spirits and master the astral planes.</p>
        <div class="title-actions">
          <button class="btn-primary" onclick="player.active ? showMap() : showStarterSelection()" ${continueDisabled}>Resume Expedition</button>
          <button class="btn-primary" onclick="player.active ? showMap() : showStarterSelection()" ${continueDisabled}>Resume Astral Trial</button>
        </div>
        <div class="mode-actions">
          <button class="btn-secondary btn-large" onclick="showStarterSelection()">ARCANE MODE</button>
          <button class="btn-secondary btn-large" onclick="showStarterSelection()">ROGUE TRIAL</button>
          <button class="btn-secondary btn-large" disabled>ASTRAL TOWER</button>
        </div>
        <div class="title-menu">
          <button class="btn-secondary" onclick="showPokedex()">📖 Pokédex</button>
          <button class="btn-secondary" onclick="showTitleScreen()">🏆 Achievements</button>
        </div>
        <div class="title-menu title-menu-low">
          <button class="btn-secondary" onclick="showTitleScreen()">🏛️ Hall of Fame</button>
          <button class="btn-secondary" onclick="showTitleScreen()">⚙️ Settings</button>
        </div>
      </div>
    </div>`;
}

function showStarterSelection() {
  let html = `
    <div class="starter-screen">
      <h2>Choose Your Starter!</h2>
      <div class="starter-layout">
        <div class="starter-choices">`;

  starters.forEach(starter => {
    html += `
      <div class="starter-card" onclick="chooseStarter(${starter.id})">
        <img src="${getSprite(starter.id)}" alt="${starter.name}">
        <h3>${starter.name}</h3>
        <div class="starter-stats"><span>Lv. 5</span> <span>Typ ${capitalize(starter.type)}</span> <span>HP ${starter.hp}</span></div>
      </div>`;
  });

  html += `
        </div>
        <div class="starter-region-panel">
          <p>1. Generation</p>
        </div>
      </div>
    </div>`;

  document.getElementById("screen-content").innerHTML = html;
}

function showPokedex() {
  const pokemonIds = Array.from({ length: 151 }, (_, i) => i + 1);
  let html = `
    <div class="pokedex-screen">
      <div class="pokedex-header">
        <div>
          <h2>Pokédex</h2>
          <p class="pokedex-summary">151 Einträge der ersten Generation. Scroll nach unten für das gesamte Sortiment.</p>
        </div>
        <button class="secondary-button secondary-outline" onclick="showTitleScreen()">Zurück</button>
      </div>
      <div class="pokedex-grid">`;

  pokemonIds.forEach(id => {
    html += `
      <div class="pokedex-card">
        <div class="pokedex-card-top">
          <img src="${getSprite(id)}" alt="${getPokemonName(id)}">
          <div class="pokedex-number">#${String(id).padStart(3, '0')}</div>
        </div>
        <div class="pokedex-name">${getPokemonName(id)}</div>
        <div class="pokedex-type">Typ: ${capitalize(getPokemonType(id))}</div>
      </div>`;
  });

  html += `
      </div>
    </div>`;
  document.getElementById("screen-content").innerHTML = html;
}

function chooseStarter(id) {
  const starter = starters.find(s => s.id === id);
  if (!starter) return;
  player.active = {
    id: starter.id,
    name: starter.name,
    type: starter.type,
    hp: starter.hp,
    maxHp: starter.hp,
    atk: starter.atk,
    level: 5,
    xp: 0,
    crit: 0,
    img: getSprite(starter.id)
  };
  player.team = [player.active];
  player.badges = [];
  player.coins = 100; // Startgeld
  currentLeaderIndex = 0;
  generateMap();
  showMap();
}

function startGame() {
  showStarterSelection();
}

function startGame() {
  showStarterSelection();
}

/* LEGACY MAP CODE REMOVED
   Current map generation and rendering is implemented in map.js and game.js.
   The old map functions were left out to avoid confusion and overlap.
*/

function showPokeballChoice() {
  const choices = [];
  const copyPool = [...pokemonPool];
  while (choices.length < 3 && copyPool.length) {
    const index = Math.floor(Math.random() * copyPool.length);
    choices.push(copyPool.splice(index, 1)[0]);
  }
  let html = `
    <div class="event-screen">
      <h2>Wähle einen Pokémon-Ball</h2>
      <p>Wähle eines von drei zufälligen Pokémon, das dich bis zum Arenakampf unterstützt.</p>
      <div class="starter-grid">`;

  choices.forEach(id => {
    html += `
      <div class="starter-card" onclick="chooseBallPokemon(${id})">
        <img src="${getSprite(id)}" alt="${getPokemonName(id)}">
        <h3>${getPokemonName(id)}</h3>
        <p>Wähle dieses Pokémon</p>
      </div>`;
  });

  html += `
      </div>
      <button class="secondary-button" onclick="showMap()">Abbrechen</button>
    </div>`;

  document.getElementById("screen-content").innerHTML = html;
}

function chooseBallPokemon(id) {
  const pokemon = {
    id,
    name: getPokemonName(id),
    hp: 45,
    maxHp: 45,
    atk: 10,
    level: 5,
    xp: 0,
    crit: 0,
    img: getSprite(id)
  };

  if (player.team.length < 3) {
    pokemon.type = getPokemonType(id);
  player.team.push(pokemon);
  } else {
    const replaceIndex = Math.floor(Math.random() * player.team.length);
    player.team[replaceIndex] = pokemon;
  }

  alert("Du hast ein neues Pokémon erhalten.");
  showMap();
}s

function showItemChoice() {
  const items = [
    { name: "Protein", desc: "+3 Angriff für dein Team", effect: () => player.team.forEach(p => p.atk += 3) },
    { name: "KP-Plus", desc: "+15 Max HP für dein Team", effect: () => player.team.forEach(p => { p.maxHp += 15; p.hp = Math.min(p.hp + 15, p.maxHp); }) },
    { name: "Trank", desc: "Heile 20 KP für dein Team", effect: () => player.team.forEach(p => p.hp = Math.min(p.maxHp, p.hp + 20)) }
  ];

  let html = `
    <div class="event-screen">
      <h2>Trank gefunden</h2>
      <p>Wähle ein Item, das deine Pokémon stärkt.</p>
      <div class="starter-grid">`;

  items.forEach((item, index) => {
    html += `
      <div class="starter-card" onclick="applyItem(${index})">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
      </div>`;
  });

  html += `
      </div>
      <button class="secondary-button" onclick="showMap()">Zurück</button>
    </div>`;

  window.currentItemChoices = items;
  document.getElementById("screen-content").innerHTML = html;
}

function applyItem(index) {
  window.currentItemChoices[index].effect();
  alert(`${window.currentItemChoices[index].name} angewendet!`);
  showMap();
}

function showSwapScreen() {
  let html = `
    <div class="event-screen">
      <h2>Pokémon tauschen</h2>
      <p>Wähle ein Pokémon aus deinem Team, das du gegen ein Zufalls-Pokémon tauschen möchtest.</p>
      <div class="starter-grid">`;

  player.team.forEach((pokemon, index) => {
    html += `
      <div class="starter-card" onclick="swapPokemon(${index})">
        <img src="${pokemon.img}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
        <p>Lv. ${pokemon.level}</p>
      </div>`;
  });

  html += `
      </div>
      <button class="secondary-button" onclick="showMap()">Abbrechen</button>
    </div>`;

  document.getElementById("screen-content").innerHTML = html;
}

function swapPokemon(index) {
  const pool = pokemonPool.filter(id => !player.team.some(p => p.id === id));
  const id = pool[Math.floor(Math.random() * pool.length)];
  player.team[index] = {
    id,
    name: getPokemonName(id),
    type: getPokemonType(id),
    hp: 45,
    maxHp: 45,
    atk: 10,
    level: 5,
    xp: 0,
    crit: 0,
    img: getSprite(id)
  };
  alert("Pokémon wurde getauscht.");
  showMap();
}

function triggerRandomEvent() {
  const rand = Math.random();
  let msg = "";

  if (rand < 0.35) {
    const heal = Math.floor(player.active.maxHp * 0.3);
    player.active.hp = Math.min(player.active.maxHp, player.active.hp + heal);
    msg = `Du findest ein Beerenfeld und dein Team heilt ${heal} KP.`;
  } else if (rand < 0.7) {
    player.active.atk += 2;
    msg = "Ein freundlich gesinnter Trainer hilft dir – dein Angriff steigt um 2.";
  } else {
    const damage = Math.floor(player.active.maxHp * 0.15);
    player.active.hp = Math.max(1, player.active.hp - damage);
    msg = `Du stolperst in eine Falle und verlierst ${damage} KP.`;
  }

  document.getElementById("screen-content").innerHTML = `
    <div class="event-screen">
      <h2>Zufälliges Ereignis</h2>
      <p style="padding: 20px;">${msg}</p>
      <button onclick="showMap()">Zur Karte zurückkehren</button>
    </div>`;
}

function showHealCenter() {
  document.getElementById("screen-content").innerHTML = `
    <div class="event-screen">
      <h2>Pokémon-Center</h2>
      <p>Willkommen im Pokémon-Center! Dein Team wird vollständig geheilt.</p>
      <button onclick="healTeamAtCenter()">Team heilen</button>
    </div>`;
}

function healTeamAtCenter() {
  player.team.forEach(p => p.hp = p.maxHp);
  alert("Dein Team wurde vollständig geheilt!");
  showMap();
}

function showShop() {
  const shopItems = [
    { name: "Protein", desc: "+3 Angriff für dein Team", cost: 50, effect: () => player.team.forEach(p => p.atk += 3) },
    { name: "KP-Plus", desc: "+15 Max HP für dein Team", cost: 50, effect: () => player.team.forEach(p => { p.maxHp += 15; p.hp = Math.min(p.hp + 15, p.maxHp); }) },
    { name: "Trank", desc: "Heile 20 KP für dein Team", cost: 30, effect: () => player.team.forEach(p => p.hp = Math.min(p.maxHp, p.hp + 20)) }
  ];

  let html = `
    <div class="event-screen">
      <h2>Shop</h2>
      <p>Kaufe Items für dein Team.</p>
      <div class="starter-grid">`;

  shopItems.forEach((item, index) => {
    html += `
      <div class="starter-card" onclick="buyItem(${index})">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <p>Kosten: ${item.cost} Münzen</p>
      </div>`;
  });

  html += `
      </div>
      <button class="secondary-button" onclick="showMap()">Zurück</button>
    </div>`;

  window.shopItems = shopItems;
  document.getElementById("screen-content").innerHTML = html;
}

function buyItem(index) {
  const item = window.shopItems[index];
  if (player.coins >= item.cost) {
    player.coins -= item.cost;
    item.effect();
    alert(`${item.name} gekauft!`);
  } else {
    alert("Nicht genug Münzen!");
  }
  showShop();
}

function showChallenge() {
  document.getElementById("screen-content").innerHTML = `
    <div class="event-screen">
      <h2>Challenge</h2>
      <p>Ein starker Trainer fordert dich heraus! Gewinne für eine Belohnung.</p>
      <button onclick="startChallengeBattle()">Kampf annehmen</button>
      <button class="secondary-button" onclick="showMap()">Ablehnen</button>
    </div>`;
}

function startChallengeBattle() {
  const challengeEnemy = createWildEnemy(true);
  challengeEnemy.hp += 20;
  challengeEnemy.atk += 3;
  currentEnemy = challengeEnemy;
  currentEnemy.isBoss = false;
  currentEnemy.isTrainer = true;
  currentEnemy.isChallenge = true;
  isPlayerTurn = true;
  battleActive = true;
  renderBattle("Challenge-Kampf beginnt! Automatischer Kampf startet...");
  setTimeout(() => {
    if (battleActive) playerAttack();
  }, 900);
}

function showTreasure() {
  const reward = Math.random();
  let msg = "";
  let effect = () => {};

  if (reward < 0.4) {
    player.coins += 50;
    msg = "Du findest 50 Münzen!";
  } else if (reward < 0.7) {
    player.team.forEach(p => p.hp = Math.min(p.maxHp, p.hp + 15));
    msg = "Du findest Heilbeeren! Team heilt 15 KP.";
  } else {
    player.team.forEach(p => p.atk += 1);
    msg = "Du findest ein Kraftband! Angriff +1 für alle.";
  }

  document.getElementById("screen-content").innerHTML = `
    <div class="event-screen">
      <h2>Schatztruhe</h2>
      <p>${msg}</p>
      <button onclick="showMap()">Weiter</button>
    </div>`;
}

function showGymPrep() {
  const leader = gymLeaders[currentLeaderIndex];
  document.getElementById("screen-content").innerHTML = `
    <div class="event-screen">
      <h2>Vor dem Arenakampf</h2>
      <p>Vor dem Kampf gegen ${leader.name} kannst du dein Team heilen oder ein letztes Event wählen.</p>
      <button onclick="healTeam()">Team vollständig heilen</button>
      <button onclick="triggerBossPrepEvent()">Ein letztes Ereignis wählen</button>
      <button onclick="startBattle(true, true)">Jetzt gegen ${leader.name} kämpfen</button>
    </div>`;
}

function healTeam() {
  player.team.forEach(p => p.hp = p.maxHp);
  alert("Dein Team wurde vollständig geheilt.");
  showGymPrep();
}

function triggerBossPrepEvent() {
  const option = Math.random();
  let msg = "";

  if (option < 0.4) {
    player.team.forEach(p => p.hp = Math.min(p.maxHp, p.hp + 20));
    msg = "Du findest einen Heilbrunnen und dein Team gewinnt 20 KP zurück.";
  } else if (option < 0.75) {
    player.team.forEach(p => p.atk += 1);
    msg = "Ein befreundeter Trainer motiviert euch – alle Pokémon erhalten +1 Angriff.";
  } else {
    player.active.xp = (player.active.xp || 0) + 20;
    msg = "Du trainierst im hohen Gras und sammelst etwas Erfahrung.";
  }

  document.getElementById("screen-content").innerHTML = `
    <div class="event-screen">
      <h2>Vorbereitungs-Ereignis</h2>
      <p style="padding: 20px;">${msg}</p>
      <button onclick="showGymPrep()">Zurück zur Arena-Vorbereitung</button>
    </div>`;
}

function startBattle(isBoss, isTrainer) {
  currentEnemy = isBoss ? createBossEnemy() : createWildEnemy(isTrainer);
  currentEnemy.isBoss = !!isBoss;
  currentEnemy.isTrainer = !!isTrainer;
  isPlayerTurn = true;
  battleActive = true;
  renderBattle("Der Kampf beginnt! Automatischer Kampf startet...");
  setTimeout(() => {
    if (battleActive) playerAttack();
  }, 900);
}

function getNextAlivePokemon() {
  return player.team.find(p => p.hp > 0);
}

function continueWithNextPokemon() {
  const next = getNextAlivePokemon();
  if (!next) return false;
  player.active = next;
  updateSidebars();
  renderBattle(`${next.name} übernimmt den Kampf!`);
  setTimeout(() => {
    if (!battleActive) return;
    isPlayerTurn = true;
    playerAttack();
  }, 1200);
  return true;
}

function playerAttack() {
  if (!battleActive || !currentEnemy || !isPlayerTurn) return;
  isPlayerTurn = false;
  animateBattleUnit("player", "enemy");
  const move = getAttackName(player.active.type);
  const variance = Math.floor(Math.random() * 5) - 2;
  const base = player.active.atk + variance;
  const effectiveness = getTypeEffectiveness(player.active.type, currentEnemy.type);
  let damage = Math.max(1, Math.round(base * effectiveness));
  if (currentEnemy.isBoss) damage += 2;
  currentEnemy.hp = Math.max(0, currentEnemy.hp - damage);
  showDamage(`-${damage}`, "enemy");
  const effectText = effectiveness > 1 ? "Es ist sehr effektiv!" : effectiveness < 1 ? "Nicht sehr effektiv..." : "";
  renderBattle(`${player.active.name} setzt ${move} ein! ${effectText}`);

  setTimeout(() => {
    if (!battleActive) return;
    if (currentEnemy.hp <= 0) {
      handleVictory(currentEnemy.isBoss, currentEnemy.isTrainer);
      return;
    }
    enemyAttack();
  }, 700);
}

function enemyAttack() {
  if (!battleActive || !currentEnemy) return;
  animateBattleUnit("enemy", "player");
  const move = getAttackName(currentEnemy.type);
  const variance = Math.floor(Math.random() * 5) - 2;
  const base = currentEnemy.atk + variance;
  const effectiveness = getTypeEffectiveness(currentEnemy.type, player.active.type);
  let damage = Math.max(1, Math.round(base * effectiveness));
  if (currentEnemy.isBoss) damage += 2;
  if (currentEnemy.isTrainer && !currentEnemy.isBoss) damage += 1;
  player.active.hp = Math.max(0, player.active.hp - damage);
  showDamage(`-${damage}`, "player");
  const effectText = effectiveness > 1 ? "Es ist sehr effektiv!" : effectiveness < 1 ? "Nicht sehr effektiv..." : "";
  renderBattle(`${currentEnemy.name} nutzt ${move}! ${effectText}`);

  if (player.active.hp <= 0) {
    player.active.hp = 0;
    if (!continueWithNextPokemon()) {
      battleActive = false;
      alert("Dein Team wurde besiegt. Run endet.");
      location.reload();
      return;
    }
    return;
  }

  setTimeout(() => {
    if (!battleActive) return;
    isPlayerTurn = true;
    renderBattle("Automatischer Kampf läuft...");
    setTimeout(() => {
      if (battleActive) playerAttack();
    }, 900);
  }, 700);
}

function animateBattleUnit(unit, target) {
  const element = document.querySelector(`.battle-unit.${unit}`);
  const targetElement = target ? document.querySelector(`.battle-unit.${target}`) : null;
  if (!element) return;
  element.classList.add("attack-flash", "attack-swing");
  if (targetElement) targetElement.classList.add("hit-target");
  setTimeout(() => {
    element.classList.remove("attack-flash", "attack-swing");
    if (targetElement) targetElement.classList.remove("hit-target");
  }, 400);
}

function createWildEnemy(isTrainer) {
  const id = wildPool[Math.floor(Math.random() * wildPool.length)];
  const type = getPokemonType(id);
  if (isTrainer) {
    const trainer = trainerNames[Math.floor(Math.random() * trainerNames.length)];
    return {
      id,
      type,
      name: `${trainer}’s ${getPokemonName(id)}`,
      hp: 50 + player.active.level * 3,
      maxHp: 50 + player.active.level * 3,
      atk: 8 + Math.floor(player.active.level / 2),
      img: getSprite(id),
      xpReward: 0
    };
  }

  const level = Math.max(3, player.active.level - 1 + Math.floor(Math.random() * 3));
  return {
    id,
    type,
    name: `Wildes ${getPokemonName(id)}`,
    hp: 40 + level * 5,
    maxHp: 40 + level * 5,
    atk: 6 + Math.floor(level / 2),
    img: getSprite(id),
    xpReward: 0
  };
}

function createBossEnemy() {
  const leader = gymLeaders[currentLeaderIndex];
  return {
    id: leader.pokemonId,
    type: getPokemonType(leader.pokemonId),
    name: `${leader.name}’s ${leader.pokemonName}`,
    hp: 120 + player.active.level * 6,
    maxHp: 120 + player.active.level * 6,
    atk: 12 + Math.floor(player.active.level / 2),
    img: getSprite(leader.pokemonId),
    xpReward: 0
  };
}

function handleVictory(isBoss, isTrainer) {
  let gainedLevels = 0;
  if (isBoss || isTrainer) {
    gainedLevels = 2;
  } else {
    gainedLevels = 1;
  }
  levelUpTeam(gainedLevels);

  if (isBoss) {
    awardBadge();
    return;
  }

  if (currentEnemy.isChallenge) {
    player.coins += 75;
    alert(`Challenge gewonnen! Du erhältst 75 Münzen und dein Team steigt ${gainedLevels} Level auf.`);
  } else {
    alert(`Sieg! Dein Team steigt ${gainedLevels} Level auf.`);
  }
  showMap();
}

function levelUpTeam(amount) {
  player.team.forEach(pok => {
    pok.level += amount;
    pok.maxHp += 10 * amount;
    pok.hp = pok.maxHp;
    pok.atk += 3 * amount;
  });
}

function awardBadge() {
  const leader = gymLeaders[currentLeaderIndex];
  player.badges.push(leader.badge);
  const nextIndex = currentLeaderIndex + 1;

  if (nextIndex >= gymLeaders.length) {
    document.getElementById("screen-content").innerHTML = `
      <div class="event-screen">
        <h2>Herzlichen Glückwunsch!</h2>
        <p>Du hast den letzten Arenaleiter besiegt und alle Orden gesammelt.</p>
        <p>Ordner: ${player.badges.join(", ")}</p>
        <button onclick="startGame()">Neuer Run</button>
      </div>`;
    return;
  }

  currentLeaderIndex = nextIndex;
  generateMap();
  document.getElementById("screen-content").innerHTML = `
    <div class="event-screen">
      <h2>${leader.badge} gewonnen!</h2>
      <p>Du besiegst ${leader.name} und erhältst den ${leader.badge}.</p>
      <p>Neue Karte für den nächsten Arenaleiter wird erstellt.</p>
      <button onclick="showMap()">Weiter zur nächsten Karte</button>
    </div>`;
}

function renderBattle(message = "") {
  const enemy = currentEnemy;
  const enemyHpRatio = Math.max(0, Math.min(100, (enemy.hp / enemy.maxHp) * 100));
  const playerHpRatio = Math.max(0, Math.min(100, (player.active.hp / player.active.maxHp) * 100));

  document.getElementById("screen-content").innerHTML = `
    <div class="battle-scene">
      <div class="battle-unit player">
        <div class="battle-unit-header">
          <span class="battle-unit-label">DEIN TEAM</span>
          <span class="battle-unit-status">Lvl. ${player.active.level}</span>
        </div>
        <div class="battle-unit-body">
          <img src="${player.active.img}" class="sprite player-sprite">
          <div class="battle-unit-info">
            <div class="hp-text">${player.active.name}</div>
            <div class="hp-type">Typ: ${capitalize(player.active.type)}</div>
            <div class="hp-bar"><div class="hp-fill ${playerHpRatio <= 30 ? 'low' : ''}" style="width:${playerHpRatio}%"></div></div>
            <div class="hp-value">HP ${player.active.hp} / ${player.active.maxHp}</div>
          </div>
        </div>
        <div id="damage-player" class="damage-popup"></div>
      </div>
      <div class="battle-unit enemy">
        <div class="battle-unit-header">
          <span class="battle-unit-label">GEGNER</span>
          <span class="battle-unit-status">Lvl. ${enemy.level || '?'} </span>
        </div>
        <div class="battle-unit-body">
          <div class="battle-unit-info">
            <div class="hp-text">${enemy.name}</div>
            <div class="hp-type">Typ: ${capitalize(enemy.type)}</div>
            <div class="hp-bar"><div class="hp-fill ${enemyHpRatio <= 30 ? 'low' : ''}" style="width:${enemyHpRatio}%"></div></div>
            <div class="hp-value">HP ${enemy.hp} / ${enemy.maxHp}</div>
          </div>
          <img src="${enemy.img}" class="sprite">
        </div>
        <div id="damage-enemy" class="damage-popup"></div>
      </div>
      <div class="battle-action-panel">
        <div class="battle-message">${message}</div>
        <div class="battle-status">Automatischer Kampf...</div>
        <div class="battle-buttons">
          <button class="battle-button" onclick="skipBattle()">Skip</button>
          <button class="battle-button" onclick="continueBattle()">Continue</button>
        </div>
      </div>
    </div>`;
}

function showDamage(amount, target) {
  const el = document.getElementById("damage-" + target);
  if (!el) return;
  el.innerText = amount;
  el.classList.remove("damage-active", "damage-heal", "damage-hit");
  void el.offsetWidth;
  if (amount.startsWith("-")) {
    el.classList.add("damage-hit");
  } else {
    el.classList.add("damage-heal");
  }
  el.classList.add("damage-active");
  setTimeout(() => el.classList.remove("damage-active", "damage-heal", "damage-hit"), 800);
}

function skipBattle() {
  if (battleActive) {
    battleActive = false;
    showMap();
  }
}

function continueBattle() {
  // Vielleicht pausieren oder etwas, aber für jetzt skip
  skipBattle();
}

function updateSidebars() {
  const teamHtml = player.team.map(p => `
    <div class="card">
      <img src="${p.img}" width="60"><br>
      <strong>${p.name}</strong> (Lv. ${p.level})
      <div class="hp-bar"><div class="hp-fill" style="width:${(p.hp/p.maxHp)*100}%"></div></div>
      <div class="xp-bar"><div class="xp-fill" style="width:${((p.xp || 0)/ (p.level*50))*100}%"></div></div>
    </div>`).join("");

  document.getElementById("team-list").innerHTML = teamHtml;
  document.getElementById("item-list").innerHTML = `
    <div class="card">
      <p>⚔️ Atk: ${player.active.atk}</p>
      <p>❤️ Max HP: ${player.active.maxHp}</p>
      <p>🎯 Krit: ${player.active.crit || 0}%</p>
    </div>`;
  document.getElementById("badge-list").innerHTML = player.badges.length ? player.badges.map(badge => `<div class="badge-item">${badge}</div>`).join("") : "<p>Keine Orden</p>";
}

function showRewards() {
  const rewards = [
    { name: "Protein", desc: "+3 Angriff", effect: () => player.active.atk += 3 },
    { name: "KP-Plus", desc: "+15 Max HP", effect: () => { player.active.maxHp += 15; player.active.hp += 15; } },
    { name: "Trank", desc: "Heile 30 HP", effect: () => player.active.hp = Math.min(player.active.maxHp, player.active.hp + 30) },
    { name: "Fokus-Band", desc: "+5% Krit-Chance", effect: () => player.active.crit = (player.active.crit || 0) + 5 },
    { name: "Beere", desc: "Heile 10 HP & +2 Atk", effect: () => { player.active.hp = Math.min(player.active.maxHp, player.active.hp + 10); player.active.atk += 2; } }
  ];

  const selection = rewards.sort(() => 0.5 - Math.random()).slice(0, 3);

  let html = `
    <div class="reward-screen">
      <h2>Wähle eine Belohnung!</h2>
      <div class="reward-container">`;
  selection.forEach((r, index) => {
    html += `
      <div class="reward-card" onclick="applyReward(${index}, '${r.name}')">
        <h3>${r.name}</h3>
        <p>${r.desc}</p>
      </div>`;
  });

  window.currentRewards = selection;
  document.getElementById("screen-content").innerHTML = html + `</div></div>`;
}

function applyReward(index, name) {
  window.currentRewards[index].effect();
  alert(`${name} wurde angewendet!`);
  showMap();
}
