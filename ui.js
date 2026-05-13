// ui.js - Screen transitions and UI helpers

// ---- Language System ----
let currentLanguage = 'en';
localStorage.setItem('poke_language', 'en');

const i18n = {
  de: {},
  en: {
    // Title Screen
    game_title: 'RogueMon',
    game_subtitle: 'Roguelike Pokemon Adventure',
    game_tagline: 'Catch, battle and become the Champion!',
    btn_new_run: 'New Game',
    btn_hard_run: 'Nuzlocke Mode',
    btn_endless_run: 'Endless Mode',
    btn_continue_run: 'Continue Run',
    btn_continue_endless: 'Continue Endless',
    btn_back_title: 'Back',

    // Region Select
    choose_region: 'Choose Your Generation',
    choose_region_description: 'Pick the region for your next run. Clear the current league to unlock the next generation.',
    region_unlocked: 'Open',
    region_locked: 'Locked',
    unlock_gen_2: 'Defeat the Gen 1 Elite Four and Champion to unlock Gen 2.',
    unlock_gen_3: 'Defeat the Gen 2 Elite Four and Champion to unlock Gen 3.',
    unlock_gen_4: 'Defeat the Gen 3 Elite Four and Champion to unlock Gen 4.',
    unlock_gen_5: 'Defeat the Gen 4 Elite Four and Champion to unlock Gen 5.',
    coming_soon: 'Coming Soon',
    coming_soon_note: 'This generation is planned for a future update.',
    endless_coming_soon_desc: 'A reworked version of this mode is on the way.',
    region_gen_1_desc: '8 Gym Leaders, Elite Four and Champion.',
    region_gen_2_desc: 'New starters, new gyms and a new league.',
    region_gen_3_desc: 'Hoenn starters, 8 new badges and the Hoenn League.',
    region_gen_4_desc: 'Sinnoh starters, 8 new badges and the Sinnoh League.',
    region_gen_5_desc: 'Unova starters, 8 new badges and the Unova League.',
    unlock_gen_6: 'Beat the Gen 5 Elite Four and Champion to unlock Gen 6.',
    region_gen_6_desc: 'Kalos starters, 8 new badges and the Kalos League.',
    region_gen_7_desc: 'Alola-inspired progression and new regional content are on the way.',
    region_gen_8_desc: 'Galar-themed badges, battles and league content are on the way.',
    region_gen_9_desc: 'Paldea content and a future generation expansion are on the way.',
    
    // Trainer Select
    choose_trainer: 'Choose your Trainer',
    trainer_boy: 'Boy',
    trainer_girl: 'Girl',
    
    // Starter Select
    choose_starter: 'Choose your Starter',
    starter_intro: 'Begin your adventure with one of these Pokemon!',
    starter_description: 'Pick your partner for this run. Each champion has a different element and battle style - choose the one that fits your strategy.',
    starter_bulbasaur: 'Bulbasaur - Grass/Poison - The mysterious bulb on its back stores energy, making it a perfect ally for growth and balance.',
    starter_charmander: 'Charmander - Fire - A loyal fire-type with a burning passion. It fights with determination and grows into a mighty dragon.',
    starter_squirtle: 'Squirtle - Water - Protected by its tough shell, this water-type is reliable and adaptable in any challenge.',
    starter_chikorita: 'Chikorita - Grass - Calm, steady and resilient. A strong start for trainers who like control and staying power.',
    starter_cyndaquil: 'Cyndaquil - Fire - Small, fast and explosive. Great for aggressive runs built on speed and pressure.',
    starter_totodile: 'Totodile - Water - Wild, tough and offense-first. It bites through hard fights and stays dangerous deep into the run.',
    
    // Battle
    starter_treecko: 'Treecko - Grass - Fast, precise and graceful. Great for sharp runs built on speed and clean pressure.',
    starter_torchic: 'Torchic - Fire - Small at first, but it scales hard. Perfect for offensive runs that snowball quickly.',
    starter_mudkip: 'Mudkip - Water - Tough, flexible and extremely reliable. A starter that can carry almost any matchup cleanly.',
    
    starter_turtwig: 'Turtwig - Grass - Sturdy and patient. A strong defensive starter that scales nicely through a long run.',
    starter_chimchar: 'Chimchar - Fire - Fast, cheeky and aggressive. Great if you want to pressure fights from the opening turns.',
    starter_piplup: 'Piplup - Water - Elegant, safe and reliable. A balanced starter with a very smooth progression curve.',
    starter_snivy: 'Snivy - Grass. Elegant, quick and technical. Great for precise runs built on speed and control.',
    starter_tepig: 'Tepig - Fire. Strong, direct and sturdy. Great for offensive runs with steady pressure.',
    starter_oshawott: 'Oshawott - Water. Flexible, clean and reliable. A balanced starter for almost any matchup.',
    wild_appeared: 'Wild {name} appeared!',
    level_label: 'Level {level}',
    gym_battle_vs: 'Gym Battle vs {name}!',
    badge_on_line: '{badge} is on the line!',
    elite_battle: '{title}: {name}!',
    final_battle: 'Final Battle!',
    elite_four_battle: 'Elite Four - Battle {num}/4',
    defeated_msg: '{name} defeated!',
    next_elite: 'Next: {name}...',
    champion_awaits: 'The Champion awaits!',
    new_pokemon: 'New Pokemon!',
    team_full: 'Team Full!',
    add_to_team: 'Add to team or keep team as-is:',
    choose_release: 'Choose a Pokemon to release:',
    continue: 'Continue',
    skip: 'Skip',
    
    // Languages
    lang_de: 'Deutsch',
    lang_en: 'English',
    gen_1: 'Generation I',
    gen_2: 'Generation II',
    gen_3: 'Generation III',
    gen_4: 'Generation IV',
    gen_5: 'Generation V',
    gen_6: 'Generation VI',
    gen_7: 'Generation VII',
    gen_8: 'Generation VIII',
    gen_9: 'Generation IX',
    all_gens_label: 'All Gens',
    gen_1_progress: 'Gen 1 - {pct}%',
    all_gens_progress: 'All Gens - {pct}%',
    pokedex_count: '{count} / {total}',
    team_label: 'TEAM',
    items_label: 'ITEMS',
    badges_label: 'BADGES',
    catch_title: 'Wild Pokemon Appeared!',
    catch_subtitle: 'Choose one Pokemon to add to your team',
    item_title: 'Item Found!',
    item_subtitle: 'Choose one item to keep',
    btn_retry: 'Try Again',
    win_caption: 'Congratulations! You defeated the Elite Four!',
    btn_play_again: 'Play Again',
    battle_tower_title: 'Endless Mode',
    battle_tower_subtitle: 'Choose a stage for your gauntlet run',
    endless_boon_title: 'Endless Boon',
    endless_boon_subtitle: 'Choose a reward for the next fight',
    endless_boon_recovery: 'Supply Cache',
    endless_boon_recovery_desc: 'Revives your team, fully heals it, and removes status problems.',
    endless_boon_training: 'Training Surge',
    endless_boon_training_desc: 'Your whole team gains +1 level and is fully healed.',
    endless_boon_armory: 'Armory Drop',
    endless_boon_armory_desc: 'Choose 1 of 3 real Pokemon items for this run.',
    btn_back_arrow: 'Back',
    enemy_label: 'Enemy',
    evo_what: 'What? {name} is evolving!',
    evo_into: '{name} evolved into {into}!',
    evo_choose: '{name} is evolving!<br>Choose its evolution:',
    bug_trait_level_up: 'Bug Trait - Level Up!',
    achievement_unlocked: 'Achievement Unlocked!',
    item_found_toast: 'Item Found!',
    popup_dodge: 'Dodge!',
    popup_struggle: 'Struggle!',
    popup_critical: 'Critical!',
    popup_confusion: 'Confusion!',
    popup_thawed: 'Thawed!',
    tutorial_auto_skip: 'Open settings and turn on Auto Skip!',
    tutorial_swap_team: 'Click a Pokemon to swap positions in your team',
    tutorial_dismiss: 'Click anywhere to dismiss',
    reroll: 'Reroll',
    joined_team: '{name} joined your team!',
    add_to_team_named: 'Add {name} to team!',
    revived_notification: '{name} was revived!',
    healed_notification: '{name} was healed!',
    restored_notification: '{name} was fully restored!',
    level_grew_notification: '{name} grew to Lv {level}!',
    pokecenter_heal: 'Your team was fully healed!',
    learned_move_notification: '{name} learned {move}!',
    continue_ellipsis: 'Continue...',
    region_cleared: 'Region Cleared!',
    choose_power_up: 'Choose a Pokemon to power up (cap: {cap} pts)',
    unlock_buffs: 'Beat a stage to unlock buffs',
    dex_not_found_battle_tower: 'Not found in Battle Tower',
    dex_battle_tower_label: 'Battle Tower:',
    shiny_charm_locked: 'Shiny Charm - complete the Gen 1 Pokedex to unlock. Doubles all shiny rates.',
    shiny_charm_active: 'Shiny Charm active! Doubles all shiny rates.',
    hof_battle_tower: 'Endless Mode: {stage}',
    hof_championship: 'Championship #{num}',
    win_run_count: '{region} Championship #{num}',
    badge_earned: 'You earned the {badge}!',
    region_gym_progress: '{region} Gym {count}/8',
    badges_progress: 'Badges: {count}/8',
    unlock_after_win: 'Beat the game first to unlock',
    no_saved_run_yet: 'No saved run yet',
    continue_run_summary: 'Continue Run - {region} {badges}/8',
    your_team: 'Your Team',
    btn_skip_flee: 'Skip (flee)',
    keep_team_as_is: 'Keep team as-is',
    trade_offer: 'Trade Offer',
    btn_decline: 'Decline',
    evo_choice_static: 'Choose its evolution:',
    traits_after: 'TRAITS AFTER',
    no_active_traits: 'No active traits',
    usable_item: 'USABLE ITEM',
    item_btn_holding: 'Holding',
    item_btn_swap: 'Swap',
    item_btn_equip: 'Equip',
    item_slot_empty: '- empty -',
    item_btn_unequip: 'Unequip',
    item_btn_unequip_title: 'Unequip {name}',
    item_return_to_bag: 'Unequip (return to bag)',
    item_keep_in_bag: 'Keep in Bag',
    btn_cancel: 'Cancel',
    item_status_fainted: 'Fainted',
    trainer_wants_to_battle: '{name} wants to battle!',
    trainer_team_summary: '{count} Pokemon - Lv ~{level}',
    legendary_appeared: 'A legendary {name} appeared!',
    legendary_subtitle: 'Lv {level} - Defeat it to add it to your team!',
    move_tutor_title: 'Move Tutor',
    move_tutor_desc: 'Teach one Pokemon a more powerful move.',
    move_tutor_mastered: 'Already mastered!',
    bag_empty: 'Bag empty',
    sent_out: '{name} was sent out!',
    trade_received: 'You received {name}!',
    trade_sent_away: '{name} was traded away.',
    shiny_appeared: 'A shiny {name} appeared!',
    hall_of_fame_title: 'Hall of Fame',
    hall_of_fame_empty: 'No championships saved yet.',
    hall_of_fame_empty_sub: 'Defeat the Elite Four and Champion to be remembered here!',
    hall_of_fame_story: 'Regions',
    hall_of_fame_tower: 'Endless Mode',
    hall_of_fame_legacy: 'Legacy Runs',
    hall_of_fame_no_entries: 'No entries yet',
    hall_of_fame_run_count: '{count} wins',
    dex_empty_shiny: 'No shiny Pokemon caught yet. Regular Pokemon do not count here.',
    dex_not_found_regular: 'Not found in regular mode',
    dex_not_available: 'Not available',
    loading: 'Loading...',
    dex_toggle_shiny: 'Toggle shiny',
    dex_evolution_chain: 'Evolution Chain',
    dex_where_to_find: 'Where to Find',
    dex_regular_label: 'Regular:',
  }
};

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

  if (typeof renderTeamBar === 'function' && typeof state !== 'undefined' && state?.team) {
    renderTeamBar(state.team);
  }
  if (document.getElementById('map-screen')?.classList.contains('active') && typeof showMapScreen === 'function') {
    showMapScreen();
  } else if (document.getElementById('starter-screen')?.classList.contains('active') && typeof showStarterSelect === 'function') {
    showStarterSelect();
  }
  if (typeof refreshTitleMetaBar === 'function') {
    refreshTitleMetaBar();
  }
}

function refreshTitleMetaBar() {
  const bar = document.getElementById('title-meta-bar');
  if (!bar) return;

  const coins = typeof getCoinBalance === 'function' ? getCoinBalance() : 0;
  const collection = typeof getEndlessCollection === 'function' ? getEndlessCollection() : [];
  const meta = typeof getMetaProgress === 'function' ? getMetaProgress() : { openedBoosters: 0 };

  bar.innerHTML = `
    <div class="title-meta-chip">
      <span class="title-meta-label">Coins</span>
      <span class="title-meta-value">${coins}</span>
    </div>
    <div class="title-meta-chip">
      <span class="title-meta-label">Endless Roster</span>
      <span class="title-meta-value">${collection.length}</span>
    </div>
    <div class="title-meta-chip">
      <span class="title-meta-label">Boosters Opened</span>
      <span class="title-meta-value">${meta.openedBoosters || 0}</span>
    </div>
  `;
}

// Speed multiplier for battle animation (1 = normal, SKIP_SPEED = fast/skip)
const SKIP_SPEED = 3;
let battleSpeedMultiplier = 1;

let _hoverEnabled = true;
document.addEventListener('mousemove',   () => { _hoverEnabled = true; }, { capture: true, passive: true });
document.addEventListener('touchstart',  () => { _hoverEnabled = true; }, { capture: true, passive: true });

const _itemTooltip = (() => {
  let el = null;
  const get = () => el || (el = document.getElementById('item-tooltip'));
  return {
    show(text, x, y) { const t = get(); if (!t) return; t.textContent = text; t.style.left = x + 'px'; t.style.top = y + 'px'; t.classList.add('visible'); },
    hide() { const t = get(); if (t) t.classList.remove('visible'); },
  };
})();

const _traitTooltip = (() => {
  let el = null;
  const get = () => el || (el = document.getElementById('trait-tooltip'));
  document.addEventListener('click', () => { const t = get(); if (t) t.classList.remove('visible'); });
  return {
    show(desc, anchorRect) {
      const t = get();
      if (!t) return;
      t.textContent = desc;
      t.classList.add('visible');
      // Position below the tapped trait, clamped so it stays on screen
      const left = Math.max(8, Math.min(anchorRect.left, window.innerWidth - 210));
      t.style.left = left + 'px';
      t.style.top = (anchorRect.bottom + 6) + 'px';
    },
    hide() { const t = get(); if (t) t.classList.remove('visible'); },
  };
})();

document.addEventListener('mouseover', e => {
  if (!_hoverEnabled || !state?.isEndlessMode) return;
  const badge = e.target.closest('.type-badge');
  if (!badge) return;
  const tc = [...badge.classList].find(c => c !== 'type-badge' && c.startsWith('type-'));
  if (!tc) return;
  const type = tc.replace('type-', '').replace(/^./, c => c.toUpperCase());
  if (!TRAIT_DESCRIPTIONS?.[type]) return;
  const counts = {};
  for (const p of state.team) { const m = p.isShiny ? 2 : 1; for (const t of (p.types || [])) counts[t] = (counts[t] || 0) + m; }
  const count = counts[type] ?? 0;
  const maxTier = TRAIT_DESCRIPTIONS[type].length;
  const tier = Math.min(maxTier, Math.floor(count / 2));
  const next = tier < maxTier ? (tier + 1) * 2 : null;
  const progress = next != null ? ` (${count}/${next})` : ' (maxed)';
  const desc = TRAIT_DESCRIPTIONS[type][0];
  _itemTooltip.show(`${type}: ${desc}${progress}`, e.clientX + 14, e.clientY - 8);
});
document.addEventListener('mouseout', e => {
  if (e.target.classList?.contains('type-badge')) _itemTooltip.hide();
});

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const s = document.getElementById(id);
  if (s) s.classList.add('active');
  const tt = document.getElementById('map-node-tooltip');
  if (tt) tt.classList.remove('visible');
  _itemTooltip.hide();
  _hoverEnabled = false;
}

function hpBarColor(pct) {
  if (pct > 0.5) return '#00FF4A';
  if (pct > 0.1) return '#EAFF00';
  return '#FF0000';
}

function renderHpBar(current, max) {
  const pct = Math.min(1, Math.max(0, current / max));
  const color = hpBarColor(pct);
  return `<div class="hp-bar-bg"><div class="hp-bar-fill" style="width:${Math.floor(pct*100)}%;background:${color}"><div class="hp-bar-shadow"></div></div></div>
          <span class="hp-text">${Math.max(0,current)}/${max}</span>`;
}

function renderPokemonCard(pokemon, onClick, selected, dexCaught = false, hofStarterBadge = false) {
  const pct = pokemon.currentHp / pokemon.maxHp;
  const displayName = getPokemonDisplayName(pokemon);
  const typeHtml = (pokemon.types || ['???']).map(t =>
    `<span class="type-badge type-${t.toLowerCase()}">${t}</span>`
  ).join('');
  const move = getMoveForPokemon(pokemon);
  const catClass = move.isSpecial ? 'move-cat-special' : 'move-cat-physical';
  const catLabel = move.isSpecial ? 'Special' : 'Physical';
  const moveTypeClass = move.type ? `type-${move.type.toLowerCase()}` : '';
  const primaryType = (pokemon.types || ['normal'])[0].toLowerCase();
  return `<div class="poke-card${selected?' selected':''}" data-type="${primaryType}" ${onClick?`role="button" tabindex="0"`:''}">
    <div class="poke-sprite-wrap">
      <img src="${pokemon.spriteUrl || ''}" alt="${displayName}" class="poke-sprite${pokemon.isShiny?' shiny':''}"
           onerror="this.src='';this.style.display='none'">
      ${pokemon.isShiny ? '<span class="shiny-badge">Shiny</span>' : ''}
      ${hofStarterBadge
        ? '<img class="dex-caught-badge" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png" alt="HoF Starter" title="Already in your Hall of Fame PC">'
        : dexCaught
          ? '<img class="dex-caught-badge" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="Caught" title="Already in Pokedex">'
          : ''}
    </div>
    <div class="poke-name">${displayName}</div>
    <div class="poke-level">Lv. ${pokemon.level}</div>
    <div class="poke-types">${typeHtml}</div>
    <div class="poke-stats-bars">${((() => {
      const isSpecialAttacker = (pokemon.baseStats?.special ?? 0) >= (pokemon.baseStats?.atk ?? 0);
      const hiddenAttackStat = isSpecialAttacker ? 'atk' : 'special';
      return [
        ['ATK', pokemon.baseStats.atk,     'stat-atk', 'atk'],
        ['SP.A', pokemon.baseStats.special ?? 0, 'stat-spa', 'special'],
        ['SPD', pokemon.baseStats.speed,   'stat-spe', 'speed'],
        ['HP',  pokemon.baseStats.hp,      'stat-hp',  'hp'],
        ['DEF', pokemon.baseStats.def,     'stat-def', 'def'],
        ['SP.D', pokemon.baseStats.spdef ?? pokemon.baseStats.special ?? 0, 'stat-spd', 'spdef'],
      ].filter(([,,,key]) => key !== hiddenAttackStat);
    })()).map(([lbl, val, cls, key]) => {
      const buffCount = pokemon.statBuffs?.[key] ?? 0;
      const grayPct = Math.round((val / 255) * 100);
      const bluePct = Math.round((buffCount / 10) * grayPct);
      const baseVal = key === 'hp'
        ? (pokemon.maxHp ?? Math.floor(val * pokemon.level / 50) + pokemon.level + 10)
        : Math.floor(val * pokemon.level / 50) + 5;
      const effectiveVal = (key !== 'hp' && buffCount > 0)
        ? Math.floor(baseVal * (1 + 0.1 * buffCount))
        : baseVal;
      return `<div class="stat-row" data-tooltip="${lbl}: ${effectiveVal}${buffCount > 0 ? ` (+${buffCount*10}%)` : ''}">
        <span class="stat-lbl">${lbl}</span>
        <div class="stat-bar-bg">
          <div class="stat-bar-fill ${cls}" style="width:${grayPct}%"></div>
          ${buffCount > 0 ? `<div class="stat-buff-overlay" style="width:${bluePct}%"></div>` : ''}
        </div>
        <span class="stat-val">${effectiveVal}</span>
      </div>`;
    }).join('')}</div>
    <div class="poke-hp">${renderHpBar(pokemon.currentHp, pokemon.maxHp)}</div>
    <div class="poke-move">
      <div class="move-name">${move.name}</div>
      <div class="move-header">
        <span class="move-cat-badge ${catClass}">${catLabel}</span>
        <span class="type-badge ${moveTypeClass}">${move.type}</span>
        ${!move.noDamage ? `<span class="move-power-badge">${move.power} PWR</span>` : ''}
      </div>
    </div>
  </div>`;
}

// ---- Trait preview below pick options ----
function renderTraitPreview(pokemon, currentTeam) {
  if (!state.isEndlessMode) return '';

  // Count all types across team + this pokemon (shiny = 2)
  const countAfter = {};
  for (const p of [...currentTeam, pokemon]) {
    const mult = p.isShiny ? 2 : 1;
    for (const t of (p.types || [])) countAfter[t] = (countAfter[t] || 0) + mult;
  }
  const countBefore = {};
  for (const p of currentTeam) {
    const mult = p.isShiny ? 2 : 1;
    for (const t of (p.types || [])) countBefore[t] = (countBefore[t] || 0) + mult;
  }

  const tierOf = n => n >= 6 ? 3 : n >= 4 ? 2 : n >= 2 ? 1 : 0;
  const nextOf  = n => n < 2 ? 2 : n < 4 ? 4 : 6;

  const myTypes = pokemon.types || [];
  if (myTypes.length === 0) return '';

  const rows = myTypes.map(type => {
    const count    = countAfter[type] || 0;
    const prevTier = tierOf(countBefore[type] || 0);
    const newTier  = tierOf(count);
    const tierUp   = newTier > prevTier;
    const isNew    = prevTier === 0 && newTier > 0;
    const next     = nextOf(count);

    const traitEntry = getTraitDisplayData([...currentTeam, pokemon]).find(e => e.type === type);
    const desc = traitEntry?.description ?? null;

    let tierLabel = newTier > 0 ? ` T${newTier}` : '';
    if (tierUp) tierLabel += ' ÃƒÂ¢Ã¢â‚¬â€œÃ‚Â²';
    const newBadge = isNew ? `<span class="trait-preview-new-tag">NEW</span>` : '';

    return `<div class="trait-preview-row${tierUp ? ' trait-preview-row-up' : ''}">
      <div class="trait-preview-row-header">
        <span class="trait-preview-count">${count}/${next}</span>
        <span class="type-badge type-${type.toLowerCase()}" style="font-size:7px;padding:2px 5px;">${type}${tierLabel}</span>
        ${newBadge}
      </div>
      ${desc ? `<div class="trait-preview-desc">${desc}</div>` : `<div class="trait-preview-desc" style="font-style:italic;">No trait</div>`}
    </div>`;
  }).join('');

  return `<div class="poke-trait-preview">${rows}</div>`;
}

// ---- Team hover card popup ----
function showTeamHoverCard(pokemon, anchorEl) {
  const popup = document.getElementById('team-hover-card');
  if (!popup) return;
  popup.innerHTML = renderPokemonCard(pokemon, false, false);
  popup.style.display = 'block';

  const rect = anchorEl.getBoundingClientRect();
  const popupW = popup.offsetWidth || 200;
  const popupH = popup.offsetHeight || 300;

  // Prefer below, fall back to above
  let top = rect.bottom + 6;
  if (top + popupH > window.innerHeight - 8) top = rect.top - popupH - 6;

  // Clamp horizontally
  let left = rect.left;
  if (left + popupW > window.innerWidth - 8) left = window.innerWidth - popupW - 8;
  if (left < 8) left = 8;

  popup.style.left = left + 'px';
  popup.style.top  = top + 'px';
}

function hideTeamHoverCard() {
  const popup = document.getElementById('team-hover-card');
  if (popup) popup.style.display = 'none';
}

function getMoveForPokemon(pokemon) {
  return getBestMove(pokemon.types || ['Normal'], pokemon.baseStats, pokemon.speciesId, pokemon.moveTier ?? 1);
}

let _dragIdx = null;
let _teamHoverCardDismissListener = null;

function renderTeamBar(team, el, showTypes = false) {
  const isMain = !el;
  if (!el) el = document.getElementById('team-bar');
  if (!el) return;
  el.innerHTML = '';

  // On mobile, mouseenter/mouseleave never fire for "leave", so tapping outside
  // the team bar should dismiss the hover card.
  if (isMain && !_teamHoverCardDismissListener) {
    _teamHoverCardDismissListener = (e) => {
      const popup  = document.getElementById('team-hover-card');
      const teamBar = document.getElementById('team-bar');
      if (!popup || popup.style.display === 'none') return;
      if (!popup.contains(e.target) && !teamBar?.contains(e.target)) {
        hideTeamHoverCard();
      }
    };
    document.addEventListener('touchstart', _teamHoverCardDismissListener, { passive: true });
    document.addEventListener('click',      _teamHoverCardDismissListener);
  }

  team.forEach((p, i) => {
    const pct = p.currentHp / p.maxHp;
    const color = hpBarColor(pct);
    const displayName = getPokemonDisplayName(p);
    const typeClass = p.types?.[0]?.toLowerCase().replace(/\s+/g, '-') || '';
    const slot = document.createElement('div');
    slot.className = `team-slot${typeClass ? ' type-' + typeClass : ''}`;
    slot.style.cursor = isMain ? 'grab' : 'default';
    slot.innerHTML = `
      <img src="${p.spriteUrl||''}" alt="${displayName}" class="team-sprite" onerror="this.src='';this.style.display='none'">
      <div class="team-slot-name">${displayName}</div>
      <div class="team-slot-lv">Lv${p.level}</div>
      ${showTypes ? `<div style="display:flex;gap:2px;flex-wrap:wrap;justify-content:center;margin:1px 0;">${(p.types||[]).map(t=>`<span class="type-badge type-${t.toLowerCase()}" style="font-size:5px;padding:1px 2px;">${t}</span>`).join('')}</div>` : ''}
      <div class="hp-bar-bg sm"><div class="hp-bar-fill" style="width:${Math.floor(pct*100)}%;background:${color}"></div></div>
      ${p.heldItem ? `<div class="team-slot-item">${itemIconHtml(p.heldItem, 16)}</div>` : ''}`;
    slot.addEventListener('mouseenter', () => { if (_hoverEnabled) showTeamHoverCard(p, slot); });
    slot.addEventListener('mousemove',  () => { if (_hoverEnabled) showTeamHoverCard(p, slot); });
    slot.addEventListener('mouseleave', () => hideTeamHoverCard());
    if (isMain && p.heldItem) {
      const itemEl = slot.querySelector('.team-slot-item');
      itemEl?.addEventListener('mousemove', e => { if (_hoverEnabled) _itemTooltip.show(`${p.heldItem.name}: ${p.heldItem.desc}`, e.clientX, e.clientY); });
      itemEl?.addEventListener('mouseleave', () => _itemTooltip.hide());
      itemEl?.addEventListener('click', e => {
        e.stopPropagation();
        hideTeamHoverCard();
        openItemEquipModal(p.heldItem, {
          fromPokemonIdx: i,
          onComplete: () => { renderItemBadges(state.items); renderTeamBar(state.team); },
        });
      });
    }
    if (isMain) {
      slot.style.touchAction = 'none';
      slot.addEventListener('pointerdown', (e) => {
        if (e.button !== undefined && e.button !== 0) return;
        if (e.target.closest('.team-slot-item')) return;
        e.preventDefault();
        slot.setPointerCapture(e.pointerId);
        _dragIdx = i;

        const rect = slot.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        const ghost = slot.cloneNode(true);
        ghost.style.cssText = `position:fixed;pointer-events:none;z-index:9999;width:${rect.width}px;opacity:0.85;left:${e.clientX - offsetX}px;top:${e.clientY - offsetY}px;transform:scale(1.05);transition:none;`;
        document.body.appendChild(ghost);
        slot.style.opacity = '0.3';

        let _didDrag = false;
        const _downX = e.clientX, _downY = e.clientY;
        const onMove = (ev) => {
          if (!_didDrag && (Math.abs(ev.clientX - _downX) > 6 || Math.abs(ev.clientY - _downY) > 6)) _didDrag = true;
          ghost.style.left = (ev.clientX - offsetX) + 'px';
          ghost.style.top  = (ev.clientY - offsetY) + 'px';
          document.querySelectorAll('.team-slot-dragover').forEach(s => s.classList.remove('team-slot-dragover'));
          const target = document.elementFromPoint(ev.clientX, ev.clientY)?.closest('.team-slot');
          if (target && target !== slot) target.classList.add('team-slot-dragover');
        };

        const cleanup = () => {
          ghost.remove();
          slot.style.opacity = '';
          document.querySelectorAll('.team-slot-dragover').forEach(s => s.classList.remove('team-slot-dragover'));
          _dragIdx = null;
          slot.removeEventListener('pointermove', onMove);
          slot.removeEventListener('pointerup', onUp);
          slot.removeEventListener('pointercancel', cleanup);
        };

        const onUp = (ev) => {
          const target = document.elementFromPoint(ev.clientX, ev.clientY)?.closest('.team-slot');
          if (target && target !== slot) {
            const slots = [...el.querySelectorAll('.team-slot')];
            const targetIdx = slots.indexOf(target);
            if (_dragIdx !== null && targetIdx !== -1 && targetIdx !== _dragIdx) {
              [team[_dragIdx], team[targetIdx]] = [team[targetIdx], team[_dragIdx]];
              cleanup();
              renderTeamBar(team);
              return;
            }
          }
          if (!_didDrag) showTeamHoverCard(p, slot);
          cleanup();
        };

        slot.addEventListener('pointermove', onMove);
        slot.addEventListener('pointerup', onUp);
        slot.addEventListener('pointercancel', cleanup);
      });
    }
    el.appendChild(slot);
  });
}

function renderItemBadges(items) {
  const el = document.getElementById('item-bar');
  if (!el) return;
  el.innerHTML = '';
  if (items.length === 0) {
    el.innerHTML = `<span style="color:var(--text-dim);font-size:10px;">${getText('bag_empty')}</span>`;
    return;
  }
  items.forEach((it, idx) => {
    const span = document.createElement('span');
    span.className = 'item-badge';
    span.innerHTML = `${itemIconHtml(it, 18)} ${it.name}`;
    span.style.cursor = 'pointer';
    span.addEventListener('mousemove', e => { if (_hoverEnabled) _itemTooltip.show(it.desc, e.clientX, e.clientY); });
    span.addEventListener('mouseleave', () => _itemTooltip.hide());

    span.addEventListener('click', () => {
      if (it.usable) {
        openUsableItemModal(it, idx);
      } else {
        openItemEquipModal(it, {
          fromBagIdx: idx,
          onComplete: () => { renderItemBadges(state.items); renderTeamBar(state.team); },
        });
      }
    });

    el.appendChild(span);
  });
}


// Render battlefield ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â first alive pokemon on each side starts as active
function renderBattleField(pTeam, eTeam) {
  const pEl = document.getElementById('player-side');
  const eEl = document.getElementById('enemy-side');
  const pActiveIdx = pTeam.findIndex(p => p.currentHp > 0);
  const eActiveIdx = eTeam.findIndex(p => p.currentHp > 0);

  if (pEl) {
    pEl.innerHTML = pTeam.map((p, i) => {
      const fainted = p.currentHp <= 0;
      const active  = i === pActiveIdx;
      const displayName = getPokemonDisplayName(p);
      return `<div class="battle-pokemon ${fainted?'fainted':''} ${active?'active-pokemon':''}" data-idx="${i}">
        <div class="battle-poke-visual">
          <img src="ui/battleBase.png" class="battle-base" alt="">
          <img src="${p.spriteUrl||''}" alt="${displayName}" class="battle-sprite" onerror="this.src=''">
        </div>
        <div class="battle-poke-meta">
          <div class="battle-poke-name">
            <span class="battle-poke-name-text">${displayName}</span>
            <span class="battle-poke-level">Lv${p.level}</span>
          </div>
          <div class="poke-hp">${renderHpBar(p.currentHp, p.maxHp)}</div>
          <div class="battle-stages"></div>
        </div>
      </div>`;
    }).join('');
  }
  if (eEl) {
    eEl.innerHTML = eTeam.map((p, i) => {
      const fainted = p.currentHp <= 0;
      const active  = i === eActiveIdx;
      const displayName = getPokemonDisplayName(p, false);
      return `<div class="battle-pokemon ${fainted?'fainted':''} ${active?'active-pokemon':''}" data-idx="${i}">
        <div class="battle-poke-visual">
          <img src="ui/battleBase.png" class="battle-base" alt="">
          <img src="${p.spriteUrl||''}" alt="${displayName}" class="battle-sprite" onerror="this.src=''">
        </div>
        <div class="battle-poke-meta">
          <div class="battle-poke-name">
            <span class="battle-poke-name-text">${displayName}</span>
            <span class="battle-poke-level">Lv${p.level}</span>
          </div>
          <div class="poke-hp">${renderHpBar(p.currentHp, p.maxHp)}</div>
          <div class="battle-stages"></div>
        </div>
      </div>`;
    }).join('');
  }
}

// Animate HP bar from fromHp to toHp smoothly
function animateHpBar(containerEl, fromHp, toHp, maxHp, duration = 250) {
  return new Promise(resolve => {
    const fillEl = containerEl.querySelector('.hp-bar-fill');
    const textEl = containerEl.querySelector('.hp-text');
    if (!fillEl) { resolve(); return; }

    const fromPct = Math.min(1, Math.max(0, fromHp / maxHp));
    const toPct = Math.min(1, Math.max(0, toHp / maxHp));
    const scaledDuration = duration / battleSpeedMultiplier;
    const start = performance.now();

    function frame(now) {
      const elapsed = now - start;
      const t = Math.min(elapsed / scaledDuration, 1);
      const curPct = fromPct + (toPct - fromPct) * t;
      const curHp = Math.round(fromHp + (toHp - fromHp) * t);

      fillEl.style.width = `${Math.floor(curPct * 100)}%`;
      fillEl.style.background = hpBarColor(curPct);
      if (textEl) textEl.textContent = `${Math.max(0, curHp)}/${maxHp}`;

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(frame);
  });
}

// ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Attack particle animations ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬

// ---- Move Animations ----

const TYPE_COLORS_RGB = {
  normal:'200,200,200', fire:'255,120,30', water:'60,140,255',
  electric:'255,220,0', grass:'50,200,50', ice:'150,220,255',
  fighting:'220,60,30', poison:'160,60,220', ground:'180,140,60',
  flying:'130,180,255', psychic:'255,80,180', bug:'100,200,50',
  rock:'160,130,80', ghost:'100,60,180', dragon:'60,80,220',
  dark:'80,60,80', steel:'160,160,180', fairy:'255,140,200',
};

function resizeCanvasIfNeeded(canvas) {
  if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

function animCanvas(attackerEl, targetEl) {
  const canvas = document.getElementById('battle-anim-canvas');
  if (!canvas) return null;
  resizeCanvasIfNeeded(canvas);
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  const aR = attackerEl.getBoundingClientRect();
  const tR = targetEl.getBoundingClientRect();
  const from = { x: aR.left + aR.width/2,  y: aR.top  + aR.height/2 };
  const to   = { x: tR.left + tR.width/2,  y: tR.top  + tR.height/2 };
  return { canvas, ctx, from, to };
}

function runCanvas(canvas, ctx, duration, drawFn) {
  return new Promise(resolve => {
    const scaledDuration = duration / battleSpeedMultiplier;
    const start = performance.now();
    function frame(now) {
      const t = Math.min((now - start) / scaledDuration, 1);
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFn(ctx, t);
      } catch(e) {
        canvas.style.display = 'none';
        resolve();
        return;
      }
      if (t < 1) requestAnimationFrame(frame);
      else { ctx.clearRect(0, 0, canvas.width, canvas.height); canvas.style.display = 'none'; resolve(); }
    }
    requestAnimationFrame(frame);
  });
}

function runParticleCanvas(canvas, ctx, particles, duration) {
  return new Promise(resolve => {
    const scaledDuration = duration / battleSpeedMultiplier;
    const start = performance.now();
    function frame(now) {
      const elapsed = now - start;
      const scaledElapsed = elapsed * battleSpeedMultiplier;
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let anyAlive = false;
        for (const p of particles) { p.tick(scaledElapsed); if (p.alive) { p.draw(ctx); anyAlive = true; } }
        if (elapsed < scaledDuration || anyAlive) requestAnimationFrame(frame);
        else { ctx.clearRect(0, 0, canvas.width, canvas.height); canvas.style.display = 'none'; resolve(); }
      } catch(e) {
        canvas.style.display = 'none';
        resolve();
      }
    }
    requestAnimationFrame(frame);
  });
}

// --- Physical move animations ---

function animBodySlam(canvas, ctx, from, to) {
  return runCanvas(canvas, ctx, 400, (ctx, t) => {
    // Rush streak
    if (t < 0.4) {
      const st = t / 0.4;
      const ex = lerp(from.x, to.x, st), ey = lerp(from.y, to.y, st);
      const g = ctx.createLinearGradient(from.x, from.y, ex, ey);
      g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(255,255,255,0.7)');
      ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(ex, ey);
      ctx.strokeStyle = g; ctx.lineWidth = 8; ctx.stroke();
    } else {
      // Squish oval impact
      const it = (t - 0.4) / 0.6;
      const a = 1 - it;
      ctx.save(); ctx.translate(to.x, to.y);
      ctx.scale(1 + it * 0.8, 1 - it * 0.5);
      ctx.beginPath(); ctx.arc(0, 0, 30 * (1 - it * 0.3), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220,220,220,${a * 0.5})`; ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${a})`; ctx.lineWidth = 3; ctx.stroke();
      ctx.restore();
      // Stars
      for (let i = 0; i < 6; i++) {
        const ang = (i / 6) * Math.PI * 2; const r = it * 40;
        ctx.beginPath(); ctx.arc(to.x + Math.cos(ang)*r, to.y + Math.sin(ang)*r, 3*(1-it), 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fill();
      }
    }
  });
}

function animFirePunch(canvas, ctx, from, to) {
  return runCanvas(canvas, ctx, 380, (ctx, t) => {
    if (t < 0.35) {
      const st = t / 0.35;
      const ex = lerp(from.x, to.x, st), ey = lerp(from.y, to.y, st);
      // Fiery fist trail
      for (let i = 0; i < 5; i++) {
        const bt = Math.max(0, st - i*0.06);
        const bx = lerp(from.x, to.x, bt), by = lerp(from.y, to.y, bt);
        const a = (1 - i/5) * st;
        ctx.beginPath(); ctx.arc(bx, by, 8 - i, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,${120-i*20},0,${a})`; ctx.fill();
      }
    } else {
      const it = (t - 0.35) / 0.65;
      const a = 1 - it;
      // Fire burst
      for (let i = 0; i < 8; i++) {
        const ang = (i/8)*Math.PI*2; const r = it * 55;
        const px = to.x + Math.cos(ang)*r, py = to.y + Math.sin(ang)*r;
        const g = ctx.createRadialGradient(px, py, 0, px, py, 12*(1-it*0.5));
        g.addColorStop(0, `rgba(255,240,100,${a})`);
        g.addColorStop(0.5, `rgba(255,120,0,${a*0.8})`);
        g.addColorStop(1, `rgba(200,30,0,0)`);
        ctx.beginPath(); ctx.arc(px, py, 12*(1-it*0.5), 0, Math.PI*2);
        ctx.fillStyle = g; ctx.fill();
      }
      ctx.beginPath(); ctx.arc(to.x, to.y, 25*(1-it*0.7), 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,200,50,${a*0.6})`; ctx.fill();
    }
  });
}

function animWaterfall(canvas, ctx, from, to) {
  return runCanvas(canvas, ctx, 500, (ctx, t) => {
    if (t < 0.5) {
      // Water column falling from above onto target
      const st = t / 0.5;
      const startY = to.y - 100;
      const curY = lerp(startY, to.y, st);
      const w = 20 + st * 10;
      const g = ctx.createLinearGradient(to.x, startY, to.x, curY);
      g.addColorStop(0, 'rgba(200,230,255,0.9)');
      g.addColorStop(0.6, 'rgba(100,180,255,0.7)');
      g.addColorStop(1, 'rgba(60,140,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(to.x - w/2, startY, w, curY - startY);
      // Foam at the falling tip
      ctx.beginPath(); ctx.ellipse(to.x, curY, w/2+5, 8, 0, 0, Math.PI*2);
      ctx.fillStyle = `rgba(220,240,255,${st*0.9})`; ctx.fill();
    } else {
      const it = (t - 0.5) / 0.5;
      const a = 1 - it;
      // Splash at target
      for (let i = 0; i < 8; i++) {
        const ang = (i/8)*Math.PI*2 - Math.PI/2; const r = it * 45;
        ctx.beginPath(); ctx.moveTo(to.x, to.y);
        ctx.lineTo(to.x + Math.cos(ang)*r, to.y + Math.sin(ang)*r*0.7);
        ctx.strokeStyle = `rgba(100,180,255,${a})`; ctx.lineWidth = 3; ctx.stroke();
      }
      ctx.beginPath(); ctx.ellipse(to.x, to.y, it*35, it*15, 0, 0, Math.PI*2);
      ctx.strokeStyle = `rgba(60,140,255,${a})`; ctx.lineWidth = 2; ctx.stroke();
    }
  });
}

function animThunderPunch(canvas, ctx, from, to) {
  return runCanvas(canvas, ctx, 350, (ctx, t) => {
    if (t < 0.35) {
      const st = t / 0.35;
      const ex = lerp(from.x, to.x, st), ey = lerp(from.y, to.y, st);
      // Electric trail
      const segs = 8; const pts = [{x:from.x,y:from.y}];
      for (let i=1; i<segs; i++) {
        const bt = i/segs * st;
        pts.push({x:lerp(from.x,to.x,bt)+rnd(-8,8), y:lerp(from.y,to.y,bt)+rnd(-8,8)});
      }
      pts.push({x:ex,y:ey});
      ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
      for (const p of pts.slice(1)) ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = `rgba(255,240,50,${st*0.9})`; ctx.lineWidth = 3;
      ctx.shadowColor='rgba(255,255,0,0.8)'; ctx.shadowBlur=10; ctx.stroke(); ctx.shadowBlur=0;
    } else {
      const it = (t-0.35)/0.65; const a = 1-it;
      // Star burst
      for (let i=0; i<8; i++) {
        const ang = i/8*Math.PI*2; const r = it*50;
        ctx.beginPath(); ctx.moveTo(to.x,to.y); ctx.lineTo(to.x+Math.cos(ang)*r, to.y+Math.sin(ang)*r);
        ctx.strokeStyle=`rgba(255,255,100,${a})`; ctx.lineWidth=2+a*2; ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(to.x,to.y,20*(1-it),0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,200,${a*0.7})`; ctx.fill();
    }
  });
}

function animRazorLeaf(canvas, ctx, from, to) {
  // 3 leaves flying to target in spread
  const leaves = [-15, 0, 15].map(offset => ({
    ox: offset, oy: rnd(-5,5),
    alive: true, age: 0,
    tick(ms) { this.age = ms; this.alive = ms < 500; },
    draw(ctx) {
      const t = Math.min(this.age/500, 1);
      const px = lerp(from.x, to.x+this.ox, t);
      const py = lerp(from.y, to.y+this.oy, t) - Math.sin(t*Math.PI)*20;
      const ang = Math.atan2(to.y+this.oy-from.y, to.x+this.ox-from.x) + Math.sin(t*Math.PI*4)*0.3;
      const a = t < 0.8 ? 1 : 1-(t-0.8)/0.2;
      ctx.save(); ctx.translate(px,py); ctx.rotate(ang);
      ctx.beginPath();
      ctx.ellipse(0,0,10,4,0,0,Math.PI*2);
      ctx.fillStyle=`rgba(80,200,40,${a})`; ctx.fill();
      ctx.beginPath(); ctx.moveTo(-10,0); ctx.lineTo(10,0);
      ctx.strokeStyle=`rgba(40,120,20,${a})`; ctx.lineWidth=1; ctx.stroke();
      ctx.restore();
    }
  }));
  return runParticleCanvas(canvas, ctx, leaves, 520);
}

function animIcePunch(canvas, ctx, from, to) {
  return runCanvas(canvas, ctx, 380, (ctx, t) => {
    if (t < 0.35) {
      const st = t/0.35;
      const ex=lerp(from.x,to.x,st), ey=lerp(from.y,to.y,st);
      const g=ctx.createLinearGradient(from.x,from.y,ex,ey);
      g.addColorStop(0,'rgba(150,220,255,0)'); g.addColorStop(1,'rgba(200,240,255,0.8)');
      ctx.beginPath(); ctx.moveTo(from.x,from.y); ctx.lineTo(ex,ey);
      ctx.strokeStyle=g; ctx.lineWidth=6; ctx.stroke();
    } else {
      const it=(t-0.35)/0.65; const a=1-it;
      // Ice crystal shards
      for (let i=0; i<8; i++) {
        const ang=i/8*Math.PI*2; const r=it*45;
        const px=to.x+Math.cos(ang)*r, py=to.y+Math.sin(ang)*r;
        ctx.save(); ctx.translate(px,py); ctx.rotate(ang);
        ctx.beginPath(); ctx.moveTo(0,-6*(1-it*0.5)); ctx.lineTo(4,0); ctx.lineTo(0,6*(1-it*0.5)); ctx.lineTo(-4,0); ctx.closePath();
        ctx.fillStyle=`rgba(180,230,255,${a})`; ctx.fill();
        ctx.restore();
      }
      ctx.beginPath(); ctx.arc(to.x,to.y,20*(1-it*0.5),0,Math.PI*2);
      ctx.strokeStyle=`rgba(200,240,255,${a})`; ctx.lineWidth=2; ctx.stroke();
    }
  });
}

function animCloseCombat(canvas, ctx, from, to) {
  // 3 rapid hits
  return runCanvas(canvas, ctx, 450, (ctx, t) => {
    const hit = Math.min(Math.floor(t * 3), 2); // clamp to 0,1,2
    const ht = (t * 3) % 1;
    const a = ht < 0.5 ? ht*2 : 2-ht*2;
    const offsets = [{x:-12,y:-8},{x:12,y:0},{x:0,y:10}];
    const o = offsets[hit] || offsets[2];
    ctx.beginPath(); ctx.arc(to.x+o.x, to.y+o.y, 18*a, 0, Math.PI*2);
    ctx.fillStyle=`rgba(220,60,30,${a*0.6})`; ctx.fill();
    // Impact lines
    for (let i=0; i<4; i++) {
      const ang=i/4*Math.PI*2; const r=a*25;
      ctx.beginPath(); ctx.moveTo(to.x+o.x, to.y+o.y);
      ctx.lineTo(to.x+o.x+Math.cos(ang)*r, to.y+o.y+Math.sin(ang)*r);
      ctx.strokeStyle=`rgba(255,200,100,${a})`; ctx.lineWidth=2; ctx.stroke();
    }
  });
}

function animPoisonJab(canvas, ctx, from, to) {
  return runCanvas(canvas, ctx, 380, (ctx, t) => {
    if (t < 0.4) {
      const st=t/0.4;
      const ex=lerp(from.x,to.x,st), ey=lerp(from.y,to.y,st);
      const g=ctx.createLinearGradient(from.x,from.y,ex,ey);
      g.addColorStop(0,'rgba(160,60,220,0)'); g.addColorStop(1,'rgba(200,100,255,0.8)');
      ctx.beginPath(); ctx.moveTo(from.x,from.y); ctx.lineTo(ex,ey);
      ctx.strokeStyle=g; ctx.lineWidth=5; ctx.stroke();
    } else {
      const it=(t-0.4)/0.6; const a=1-it;
      // Spike
      const sLen=40*(1-it*0.7);
      ctx.beginPath(); ctx.moveTo(to.x, to.y-sLen); ctx.lineTo(to.x+8,to.y+10); ctx.lineTo(to.x-8,to.y+10); ctx.closePath();
      ctx.fillStyle=`rgba(160,60,220,${a*0.8})`; ctx.fill();
      ctx.strokeStyle=`rgba(220,100,255,${a})`; ctx.lineWidth=1.5; ctx.stroke();
      // Poison drips
      for(let i=0;i<4;i++){
        ctx.beginPath(); ctx.arc(to.x+rnd(-15,15),to.y+it*20+i*8,3*(1-it),0,Math.PI*2);
        ctx.fillStyle=`rgba(160,60,220,${a*0.7})`; ctx.fill();
      }
    }
  });
}

function animEarthquake(canvas, ctx, from, to) {
  // Ground shockwave rings spreading from attacker through target
  return runCanvas(canvas, ctx, 700, (ctx, t) => {
    const rgb='180,140,60';
    // Three rings spreading out
    for(let r=0;r<3;r++) {
      const rt = Math.max(0, t - r*0.15);
      if(rt<=0) continue;
      const radius = rt * 120;
      const a = Math.max(0, 1-rt)*0.7;
      ctx.beginPath(); ctx.ellipse(from.x, from.y+20, radius, radius*0.3, 0, 0, Math.PI*2);
      ctx.strokeStyle=`rgba(${rgb},${a})`; ctx.lineWidth=3-r; ctx.stroke();
    }
    // Ground crack at target
    if(t>0.3) {
      const ct=(t-0.3)/0.7; const a=Math.min(ct*2,1)*(1-ct*0.5);
      ctx.beginPath(); ctx.moveTo(to.x-30*ct,to.y+15); ctx.lineTo(to.x,to.y);ctx.lineTo(to.x+25*ct,to.y+12);
      ctx.strokeStyle=`rgba(120,90,30,${a})`; ctx.lineWidth=3; ctx.stroke();
      // Debris
      for(let i=0;i<5;i++){
        const ang=-Math.PI/2+rnd(-0.8,0.8); const r=ct*30+i*5;
        ctx.beginPath(); ctx.arc(to.x+Math.cos(ang)*r, to.y+Math.sin(ang)*r-ct*15, 3, 0, Math.PI*2);
        ctx.fillStyle=`rgba(160,120,50,${a})`; ctx.fill();
      }
    }
  });
}

function animAerialAce(canvas, ctx, from, to) {
  return runCanvas(canvas, ctx, 300, (ctx, t) => {
    if(t<0.5) {
      // Lightning fast streak
      const st=t/0.5;
      ctx.beginPath(); ctx.moveTo(from.x,from.y);
      ctx.lineTo(lerp(from.x,to.x,st), lerp(from.y,to.y,st));
      ctx.strokeStyle=`rgba(255,255,255,${st*0.9})`; ctx.lineWidth=4; ctx.stroke();
    } else {
      // Three parallel slashes at target
      const it=(t-0.5)/0.5; const a=1-it;
      const ang=Math.atan2(to.y-from.y,to.x-from.x)+Math.PI/2;
      for(let i=-1;i<=1;i++){
        const ox=Math.cos(ang)*i*8, oy=Math.sin(ang)*i*8;
        const d=Math.atan2(to.y-from.y,to.x-from.x);
        ctx.beginPath();
        ctx.moveTo(to.x+ox+Math.cos(d)*-20, to.y+oy+Math.sin(d)*-20);
        ctx.lineTo(to.x+ox+Math.cos(d)*20, to.y+oy+Math.sin(d)*20);
        ctx.strokeStyle=`rgba(255,255,255,${a})`; ctx.lineWidth=2; ctx.stroke();
      }
    }
  });
}

function animZenHeadbut(canvas, ctx, from, to) {
  return runCanvas(canvas, ctx, 420, (ctx, t) => {
    if(t<0.45) {
      // Pink aura charging then rushing
      const st=t/0.45;
      // Glow at attacker fading out
      const ga=Math.max(0,1-st*1.5);
      ctx.beginPath(); ctx.arc(from.x,from.y,20+st*5,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,80,180,${ga*0.4})`; ctx.fill();
      // Rush streak
      const ex=lerp(from.x,to.x,st*0.8), ey=lerp(from.y,to.y,st*0.8);
      const g=ctx.createLinearGradient(from.x,from.y,ex,ey);
      g.addColorStop(0,'rgba(255,80,180,0)'); g.addColorStop(1,`rgba(255,80,180,${st*0.8})`);
      ctx.beginPath(); ctx.moveTo(from.x,from.y); ctx.lineTo(ex,ey);
      ctx.strokeStyle=g; ctx.lineWidth=7; ctx.stroke();
    } else {
      const it=(t-0.45)/0.55; const a=1-it;
      // Pink ring expansion
      ctx.beginPath(); ctx.arc(to.x,to.y,it*50,0,Math.PI*2);
      ctx.strokeStyle=`rgba(255,80,180,${a})`; ctx.lineWidth=4; ctx.stroke();
      ctx.beginPath(); ctx.arc(to.x,to.y,it*30,0,Math.PI*2);
      ctx.strokeStyle=`rgba(255,150,220,${a*0.6})`; ctx.lineWidth=2; ctx.stroke();
    }
  });
}

function animXScissor(canvas, ctx, from, to) {
  return runCanvas(canvas, ctx, 350, (ctx, t) => {
    if(t<0.4) {
      const st=t/0.4;
      const ex=lerp(from.x,to.x,st), ey=lerp(from.y,to.y,st);
      const g=ctx.createLinearGradient(from.x,from.y,ex,ey);
      g.addColorStop(0,'rgba(100,200,50,0)'); g.addColorStop(1,'rgba(100,200,50,0.8)');
      ctx.beginPath(); ctx.moveTo(from.x,from.y); ctx.lineTo(ex,ey);
      ctx.strokeStyle=g; ctx.lineWidth=5; ctx.stroke();
    } else {
      const it=(t-0.4)/0.6; const a=1-it;
      // X slash marks
      const s=30*(1-it*0.3);
      ctx.lineWidth=3; ctx.strokeStyle=`rgba(80,200,40,${a})`;
      ctx.beginPath(); ctx.moveTo(to.x-s,to.y-s); ctx.lineTo(to.x+s,to.y+s); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(to.x+s,to.y-s); ctx.lineTo(to.x-s,to.y+s); ctx.stroke();
      ctx.strokeStyle=`rgba(200,255,100,${a*0.5})`;
      ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(to.x-s+2,to.y-s); ctx.lineTo(to.x+s+2,to.y+s); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(to.x+s+2,to.y-s); ctx.lineTo(to.x-s+2,to.y+s); ctx.stroke();
    }
  });
}

function animRockSlide(canvas, ctx, from, to) {
  // 3 rocks falling from above target
  const rocks = [
    {ox:-20, delay:0,   size:12},
    {ox: 15, delay:60,  size:10},
    {ox:-5,  delay:120, size:14},
  ].map(r => ({
    ...r, alive:true, age:0,
    tick(ms){this.age=ms; this.alive=ms<600;},
    draw(ctx){
      const t=Math.max(0,(this.age-this.delay)/400);
      if(t<=0) return;
      const py=lerp(to.y-120, to.y, Math.min(t,1));
      const a=t<0.9?1:(1-t)/0.1;
      ctx.save(); ctx.translate(to.x+this.ox, py);
      ctx.rotate(t*2);
      ctx.beginPath();
      ctx.moveTo(0,-this.size); ctx.lineTo(this.size*0.7,this.size*0.5);
      ctx.lineTo(-this.size*0.7,this.size*0.5); ctx.closePath();
      ctx.fillStyle=`rgba(160,130,80,${a})`; ctx.fill();
      ctx.strokeStyle=`rgba(120,90,50,${a})`; ctx.lineWidth=1.5; ctx.stroke();
      ctx.restore();
      // Impact dust
      if(t>=1){
        const dt=Math.min(this.age-this.delay-400,200)/200;
        for(let i=0;i<4;i++){
          ctx.beginPath(); ctx.arc(to.x+this.ox+rnd(-15,15), to.y+rnd(0,10), 4*(1-dt), 0, Math.PI*2);
          ctx.fillStyle=`rgba(160,130,80,${(1-dt)*0.6})`; ctx.fill();
        }
      }
    }
  }));
  return runParticleCanvas(canvas, ctx, rocks, 650);
}

function animShadowClaw(canvas, ctx, from, to) {
  return runCanvas(canvas, ctx, 380, (ctx, t) => {
    if(t<0.4) {
      const st=t/0.4;
      const ex=lerp(from.x,to.x,st), ey=lerp(from.y,to.y,st);
      const g=ctx.createLinearGradient(from.x,from.y,ex,ey);
      g.addColorStop(0,'rgba(100,60,180,0)'); g.addColorStop(1,'rgba(160,100,255,0.7)');
      ctx.beginPath(); ctx.moveTo(from.x,from.y); ctx.lineTo(ex,ey);
      ctx.strokeStyle=g; ctx.lineWidth=5; ctx.stroke();
    } else {
      const it=(t-0.4)/0.6; const a=1-it;
      // 3 curved claw marks
      const s=35*(1-it*0.2);
      for(let i=0;i<3;i++){
        const oy=(i-1)*14;
        ctx.beginPath();
        ctx.moveTo(to.x-s, to.y+oy-s*0.3);
        ctx.quadraticCurveTo(to.x, to.y+oy, to.x+s, to.y+oy+s*0.3);
        ctx.strokeStyle=`rgba(${i===1?'180,120,255':'120,60,200'},${a})`; ctx.lineWidth=2.5; ctx.stroke();
      }
      // Dark aura
      ctx.beginPath(); ctx.arc(to.x,to.y,25*(1-it),0,Math.PI*2);
      ctx.fillStyle=`rgba(60,0,120,${a*0.3})`; ctx.fill();
    }
  });
}

function animDragonClaw(canvas, ctx, from, to) {
  return runCanvas(canvas, ctx, 400, (ctx, t) => {
    if(t<0.4) {
      const st=t/0.4;
      const ex=lerp(from.x,to.x,st), ey=lerp(from.y,to.y,st);
      const g=ctx.createLinearGradient(from.x,from.y,ex,ey);
      g.addColorStop(0,'rgba(60,80,220,0)'); g.addColorStop(1,'rgba(100,140,255,0.9)');
      ctx.beginPath(); ctx.moveTo(from.x,from.y); ctx.lineTo(ex,ey);
      ctx.strokeStyle=g; ctx.lineWidth=7; ctx.stroke();
      ctx.shadowColor='rgba(80,100,255,0.8)'; ctx.shadowBlur=12; ctx.stroke(); ctx.shadowBlur=0;
    } else {
      const it=(t-0.4)/0.6; const a=1-it;
      const s=40*(1-it*0.2);
      // 3 diagonal dragon claw marks
      for(let i=0;i<3;i++){
        const oy=(i-1)*12; const ox=(i-1)*5;
        ctx.beginPath();
        ctx.moveTo(to.x-s+ox,to.y+oy-s*0.5);
        ctx.lineTo(to.x+ox,to.y+oy);
        ctx.lineTo(to.x+s*0.6+ox,to.y+oy+s*0.4);
        ctx.strokeStyle=`rgba(80,120,255,${a})`; ctx.lineWidth=2.5;
        ctx.shadowColor='rgba(60,80,220,0.6)'; ctx.shadowBlur=6; ctx.stroke(); ctx.shadowBlur=0;
      }
      ctx.beginPath(); ctx.arc(to.x,to.y,30*(1-it),0,Math.PI*2);
      ctx.fillStyle=`rgba(60,80,220,${a*0.2})`; ctx.fill();
    }
  });
}

// --- Special move animations ---

function animHyperVoice(canvas, ctx, from, to) {
  // Sound wave rings traveling from attacker to target
  return runCanvas(canvas, ctx, 600, (ctx, t) => {
    const dx=to.x-from.x, dy=to.y-from.y;
    const dist=Math.hypot(dx,dy);
    for(let w=0;w<3;w++) {
      const wt=Math.max(0,t-w*0.15);
      if(wt<=0) continue;
      const progress=wt;
      const cx=from.x+dx*progress, cy=from.y+dy*progress;
      const r=20+wt*10;
      const a=Math.max(0,(1-wt)*0.8);
      ctx.beginPath(); ctx.ellipse(cx,cy,r,r*0.6,Math.atan2(dy,dx),0,Math.PI*2);
      ctx.strokeStyle=`rgba(220,220,220,${a})`; ctx.lineWidth=2+a*2; ctx.stroke();
    }
  });
}

function animSolarBeam(canvas, ctx, from, to) {
  // Phase 1: charge up (golden orb at attacker) | Phase 2: beam fires
  return runCanvas(canvas, ctx, 800, (ctx, t) => {
    if(t<0.5) {
      // Charge orb
      const ct=t/0.5;
      const r=5+ct*20;
      const g=ctx.createRadialGradient(from.x,from.y,0,from.x,from.y,r);
      g.addColorStop(0,'rgba(255,255,200,0.9)');
      g.addColorStop(0.5,'rgba(255,220,0,0.7)');
      g.addColorStop(1,'rgba(255,180,0,0)');
      ctx.beginPath(); ctx.arc(from.x,from.y,r,0,Math.PI*2);
      ctx.fillStyle=g; ctx.fill();
      // Particles gathering
      for(let i=0;i<8;i++){
        const ang=i/8*Math.PI*2+t*3; const r2=30*(1-ct);
        const px=from.x+Math.cos(ang)*r2, py=from.y+Math.sin(ang)*r2;
        ctx.beginPath(); ctx.arc(px,py,2,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,220,50,${ct})`; ctx.fill();
      }
    } else {
      // Fire beam
      const bt=(t-0.5)/0.5;
      const ang=Math.atan2(to.y-from.y,to.x-from.x);
      const bLen=bt*Math.hypot(to.x-from.x,to.y-from.y);
      const bW=12-bt*4;
      ctx.save(); ctx.translate(from.x,from.y); ctx.rotate(ang);
      // Outer glow
      const g=ctx.createLinearGradient(0,0,bLen,0);
      g.addColorStop(0,'rgba(255,255,200,0.9)');
      g.addColorStop(0.7,'rgba(255,220,0,0.7)');
      g.addColorStop(1,'rgba(255,200,0,0)');
      ctx.fillStyle=g;
      ctx.fillRect(0,-bW,bLen,bW*2);
      // Core
      ctx.fillStyle=`rgba(255,255,240,0.95)`;
      ctx.fillRect(0,-bW/3,bLen,bW/1.5);
      ctx.restore();
    }
  });
}

function animAuraSphere(canvas, ctx, from, to) {
  // Pulsing blue orb traveling from attacker to target
  const dx=to.x-from.x, dy=to.y-from.y;
  return runCanvas(canvas, ctx, 550, (ctx, t) => {
    const px=from.x+dx*t, py=from.y+dy*t;
    // Outer aura
    const r=16+Math.sin(t*Math.PI*6)*3;
    const g=ctx.createRadialGradient(px,py,0,px,py,r*1.8);
    g.addColorStop(0,'rgba(100,160,255,0.9)');
    g.addColorStop(0.5,'rgba(60,100,220,0.5)');
    g.addColorStop(1,'rgba(40,60,200,0)');
    ctx.beginPath(); ctx.arc(px,py,r*1.8,0,Math.PI*2);
    ctx.fillStyle=g; ctx.fill();
    // Core
    ctx.beginPath(); ctx.arc(px,py,r*0.6,0,Math.PI*2);
    ctx.fillStyle='rgba(200,230,255,0.95)'; ctx.fill();
    // Trail
    const tLen=Math.min(t,0.3);
    for(let i=0;i<5;i++){
      const tr=i/5*tLen;
      const tx=from.x+dx*(t-tr), ty=from.y+dy*(t-tr);
      const ta=(1-i/5)*0.4;
      ctx.beginPath(); ctx.arc(tx,ty,r*(1-i/5)*0.5,0,Math.PI*2);
      ctx.fillStyle=`rgba(80,130,255,${ta})`; ctx.fill();
    }
    // Impact at end
    if(t>0.85) {
      const it=(t-0.85)/0.15;
      ctx.beginPath(); ctx.arc(to.x,to.y,it*40,0,Math.PI*2);
      ctx.strokeStyle=`rgba(100,160,255,${1-it})`; ctx.lineWidth=3; ctx.stroke();
    }
  });
}

function animSludgeBomb(canvas, ctx, from, to) {
  const dx=to.x-from.x, dy=to.y-from.y;
  return runCanvas(canvas, ctx, 550, (ctx, t) => {
    if(t<0.65) {
      // Blob arc trajectory
      const bt=t/0.65;
      const px=from.x+dx*bt, py=from.y+dy*bt - Math.sin(bt*Math.PI)*50;
      // Wobbling blob
      ctx.save(); ctx.translate(px,py);
      const wobble=Math.sin(bt*Math.PI*8)*0.15;
      ctx.scale(1+wobble, 1-wobble);
      const g=ctx.createRadialGradient(0,0,0,0,0,14);
      g.addColorStop(0,'rgba(180,80,240,0.9)');
      g.addColorStop(0.6,'rgba(140,50,200,0.8)');
      g.addColorStop(1,'rgba(100,20,160,0)');
      ctx.beginPath(); ctx.arc(0,0,14,0,Math.PI*2);
      ctx.fillStyle=g; ctx.fill();
      ctx.restore();
      // Drip trail
      for(let i=1;i<4;i++){
        const tr=i*0.06; const tbt=Math.max(0,bt-tr);
        const tx=from.x+dx*tbt, ty=from.y+dy*tbt-Math.sin(tbt*Math.PI)*50;
        ctx.beginPath(); ctx.arc(tx,ty,6-i,0,Math.PI*2);
        ctx.fillStyle=`rgba(160,60,220,${0.5-i*0.1})`; ctx.fill();
      }
    } else {
      // Splatter
      const it=(t-0.65)/0.35; const a=1-it;
      for(let i=0;i<8;i++){
        const ang=i/8*Math.PI*2; const r=it*40;
        ctx.beginPath(); ctx.ellipse(to.x+Math.cos(ang)*r, to.y+Math.sin(ang)*r*0.6, 5*(1-it*0.5), 3*(1-it*0.5), ang, 0, Math.PI*2);
        ctx.fillStyle=`rgba(160,60,220,${a*0.8})`; ctx.fill();
      }
      ctx.beginPath(); ctx.arc(to.x,to.y,20*(1-it*0.5),0,Math.PI*2);
      ctx.fillStyle=`rgba(140,50,200,${a*0.4})`; ctx.fill();
    }
  });
}

function animEarthPower(canvas, ctx, from, to) {
  return runCanvas(canvas, ctx, 650, (ctx, t) => {
    // Ground cracks at target
    const rgb='180,140,60';
    if(t>0.1) {
      const ct=Math.min((t-0.1)/0.4,1);
      // Radiating cracks
      for(let i=0;i<6;i++){
        const ang=i/6*Math.PI*2; const len=ct*35;
        ctx.beginPath(); ctx.moveTo(to.x,to.y+10);
        ctx.lineTo(to.x+Math.cos(ang)*len, to.y+10+Math.sin(ang)*len*0.5);
        ctx.strokeStyle=`rgba(${rgb},${ct*0.8})`; ctx.lineWidth=2; ctx.stroke();
      }
    }
    // Earth pillars erupting
    if(t>0.3) {
      const pt=(t-0.3)/0.4;
      const pProgress=Math.min(pt,1);
      const pA=pt>0.7?(1-(pt-0.7)/0.3):1;
      // Center pillar
      const pH=50*pProgress;
      const g=ctx.createLinearGradient(to.x,to.y+10,to.x,to.y+10-pH);
      g.addColorStop(0,`rgba(${rgb},0)`);
      g.addColorStop(0.3,`rgba(${rgb},0.8)`);
      g.addColorStop(1,`rgba(200,180,80,${pA*0.9})`);
      ctx.fillStyle=g;
      ctx.fillRect(to.x-8,to.y+10-pH,16,pH);
      // Side pillars
      for(let s=-1;s<=1;s+=2){
        const sH=pH*0.7;
        const sg=ctx.createLinearGradient(to.x+s*20,to.y+10,to.x+s*20,to.y+10-sH);
        sg.addColorStop(0,`rgba(${rgb},0)`); sg.addColorStop(1,`rgba(${rgb},${pA*0.7})`);
        ctx.fillStyle=sg; ctx.fillRect(to.x+s*20-5,to.y+10-sH,10,sH);
      }
    }
  });
}

function animAirSlash(canvas, ctx, from, to) {
  const dx=to.x-from.x, dy=to.y-from.y;
  const ang=Math.atan2(dy,dx);
  return runCanvas(canvas, ctx, 450, (ctx, t) => {
    if(t<0.6) {
      // Crescent shape traveling
      const bt=t/0.6;
      const px=from.x+dx*bt, py=from.y+dy*bt;
      ctx.save(); ctx.translate(px,py); ctx.rotate(ang);
      ctx.beginPath();
      ctx.arc(0,0,18,0.4*Math.PI,1.6*Math.PI);
      ctx.arc(0,-5,14,1.6*Math.PI,0.4*Math.PI,true);
      ctx.closePath();
      ctx.fillStyle=`rgba(130,200,255,${bt*0.8})`;
      ctx.strokeStyle=`rgba(200,240,255,${bt})`;
      ctx.lineWidth=2; ctx.fill(); ctx.stroke();
      ctx.restore();
    } else {
      const it=(t-0.6)/0.4; const a=1-it;
      // Slash at target
      ctx.save(); ctx.translate(to.x,to.y); ctx.rotate(ang);
      for(let i=-1;i<=1;i++){
        ctx.beginPath();
        ctx.moveTo(-25, i*8); ctx.lineTo(25, i*8);
        ctx.strokeStyle=`rgba(180,230,255,${a})`; ctx.lineWidth=2; ctx.stroke();
      }
      ctx.restore();
    }
  });
}

function animBugBuzz(canvas, ctx, from, to) {
  const dx=to.x-from.x, dy=to.y-from.y;
  return runCanvas(canvas, ctx, 600, (ctx, t) => {
    // Vibration rings spreading from attacker, reaching target
    for(let w=0;w<4;w++){
      const wt=Math.max(0,t-w*0.12);
      if(wt<=0) continue;
      const px=from.x+dx*Math.min(wt,1), py=from.y+dy*Math.min(wt,1);
      const r=8+wt*15;
      const a=Math.max(0,(1-wt)*0.7);
      ctx.beginPath(); ctx.arc(px,py,r,0,Math.PI*2);
      ctx.strokeStyle=`rgba(100,200,50,${a})`; ctx.lineWidth=2; ctx.stroke();
      ctx.beginPath(); ctx.arc(px,py,r*0.6,0,Math.PI*2);
      ctx.strokeStyle=`rgba(150,220,80,${a*0.5})`; ctx.lineWidth=1; ctx.stroke();
    }
  });
}

function animPowerGem(canvas, ctx, from, to) {
  // Gem shards converging at target from different directions
  const shards = Array.from({length:6}, (_, i) => {
    const ang=i/6*Math.PI*2;
    const startR=80;
    return {
      startX:to.x+Math.cos(ang)*startR, startY:to.y+Math.sin(ang)*startR,
      alive:true, age:0,
      tick(ms){this.age=ms; this.alive=ms<550;},
      draw(ctx){
        const t=Math.min(this.age/400,1);
        const px=lerp(this.startX,to.x,t), py=lerp(this.startY,to.y,t);
        const a=t<0.8?1:1-(t-0.8)/0.2;
        ctx.save(); ctx.translate(px,py); ctx.rotate(this.age*0.01);
        ctx.beginPath();
        ctx.moveTo(0,-8); ctx.lineTo(5,0); ctx.lineTo(0,8); ctx.lineTo(-5,0); ctx.closePath();
        ctx.fillStyle=`rgba(220,200,255,${a})`;
        ctx.strokeStyle=`rgba(255,255,255,${a})`; ctx.lineWidth=1;
        ctx.fill(); ctx.stroke();
        ctx.restore();
        // Impact flash
        if(t>=1){
          const dt=Math.min((this.age-400)/150,1);
          ctx.beginPath(); ctx.arc(to.x,to.y,dt*25*(1-dt)*4,0,Math.PI*2);
          ctx.fillStyle=`rgba(255,255,255,${(1-dt)*0.5})`; ctx.fill();
        }
      }
    };
  });
  return runParticleCanvas(canvas, ctx, shards, 580);
}

function animShadowBall(canvas, ctx, from, to) {
  const dx=to.x-from.x, dy=to.y-from.y;
  return runCanvas(canvas, ctx, 650, (ctx, t) => {
    const px=from.x+dx*t, py=from.y+dy*t;
    // Dark swirling orb
    const r=14+Math.sin(t*Math.PI*5)*2;
    const g=ctx.createRadialGradient(px,py,0,px,py,r*2);
    g.addColorStop(0,'rgba(60,0,100,0.9)');
    g.addColorStop(0.4,'rgba(100,20,160,0.7)');
    g.addColorStop(1,'rgba(60,0,120,0)');
    ctx.beginPath(); ctx.arc(px,py,r*2,0,Math.PI*2);
    ctx.fillStyle=g; ctx.fill();
    // Dark core
    ctx.beginPath(); ctx.arc(px,py,r*0.7,0,Math.PI*2);
    ctx.fillStyle='rgba(20,0,40,0.95)'; ctx.fill();
    // Void trail
    for(let i=1;i<=4;i++){
      const tr=i*0.05;
      const tx=from.x+dx*(t-tr), ty=from.y+dy*(t-tr);
      if(t-tr<0) continue;
      ctx.beginPath(); ctx.arc(tx,ty,r*(1-i/5),0,Math.PI*2);
      ctx.fillStyle=`rgba(80,20,140,${0.3-i*0.06})`; ctx.fill();
    }
    // Impact
    if(t>0.85){
      const it=(t-0.85)/0.15;
      ctx.beginPath(); ctx.arc(to.x,to.y,it*35,0,Math.PI*2);
      ctx.fillStyle=`rgba(40,0,80,${(1-it)*0.5})`; ctx.fill();
    }
  });
}

function animDragonPulse(canvas, ctx, from, to) {
  const dx=to.x-from.x, dy=to.y-from.y;
  const dist=Math.hypot(dx,dy);
  const ang=Math.atan2(dy,dx);
  return runCanvas(canvas, ctx, 600, (ctx, t) => {
    // Dragon-shaped energy wave
    const progress=t;
    const cx=from.x+dx*progress, cy=from.y+dy*progress;
    // Main wave
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(ang);
    const wW=12+Math.sin(t*Math.PI*3)*4;
    const g=ctx.createRadialGradient(0,0,0,0,0,wW*2);
    g.addColorStop(0,'rgba(80,200,255,0.9)');
    g.addColorStop(0.5,'rgba(60,80,220,0.6)');
    g.addColorStop(1,'rgba(40,60,200,0)');
    ctx.beginPath(); ctx.arc(0,0,wW*2,0,Math.PI*2);
    ctx.fillStyle=g; ctx.fill();
    // Dragon scales pattern
    for(let s=-2;s<=2;s++){
      ctx.beginPath(); ctx.ellipse(s*8,-wW*0.3,4,wW*0.6,0,0,Math.PI*2);
      ctx.fillStyle=`rgba(100,200,255,0.4)`; ctx.fill();
    }
    ctx.restore();
    // Teal trail
    for(let i=1;i<=5;i++){
      const tr=i*0.06; const tp=Math.max(0,t-tr);
      const tx=from.x+dx*tp, ty=from.y+dy*tp;
      ctx.beginPath(); ctx.arc(tx,ty,8*(1-i/6),0,Math.PI*2);
      ctx.fillStyle=`rgba(60,180,220,${0.4-i*0.07})`; ctx.fill();
    }
    if(t>0.85){
      const it=(t-0.85)/0.15;
      ctx.beginPath(); ctx.arc(to.x,to.y,it*40,0,Math.PI*2);
      ctx.strokeStyle=`rgba(60,120,255,${1-it})`; ctx.lineWidth=3; ctx.stroke();
    }
  });
}

function animSplash(canvas, ctx, from, to) {
  // Water droplets arc up from the attacker and fall back down
  return runCanvas(canvas, ctx, 700, (ctx, t) => {
    const drops = [
      { ox: -18, delay: 0.0, height: 55 },
      { ox:   0, delay: 0.1, height: 75 },
      { ox:  18, delay: 0.2, height: 55 },
      { ox:  -9, delay: 0.3, height: 40 },
      { ox:   9, delay: 0.35, height: 40 },
    ];
    for (const d of drops) {
      const lt = Math.max(0, (t - d.delay) / (1 - d.delay));
      if (lt <= 0) continue;
      const a = lt < 0.8 ? 1 : 1 - (lt - 0.8) / 0.2;
      // parabolic arc: up then down
      const x = from.x + d.ox;
      const y = from.y - Math.sin(lt * Math.PI) * d.height;
      ctx.beginPath();
      ctx.arc(x, y, 5 * (1 - lt * 0.4), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(80,160,255,${a * 0.85})`;
      ctx.fill();
      // small ripple at the bottom when drop falls back
      if (lt > 0.7) {
        const rt = (lt - 0.7) / 0.3;
        ctx.beginPath();
        ctx.arc(x, from.y, rt * 14, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(80,200,255,${(1 - rt) * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }
  });
}

function animTeleport(canvas, ctx, from, to) {
  // Expanding psychic rings burst from the attacker, then a quick flash
  return runCanvas(canvas, ctx, 500, (ctx, t) => {
    // Three rings expanding outward
    for (let i = 0; i < 3; i++) {
      const delay = i * 0.12;
      const rt = Math.max(0, (t - delay) / (1 - delay));
      const a = (1 - rt) * 0.8;
      if (a <= 0) continue;
      ctx.beginPath();
      ctx.arc(from.x, from.y, rt * 45 * (1 + i * 0.25), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(200,120,255,${a})`;
      ctx.lineWidth = 3 - i * 0.8;
      ctx.stroke();
    }
    // Central flash that peaks at t=0.25 then fades
    const flash = t < 0.25 ? t / 0.25 : 1 - (t - 0.25) / 0.75;
    if (flash > 0) {
      ctx.beginPath();
      ctx.arc(from.x, from.y, flash * 20, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230,180,255,${flash * 0.6})`;
      ctx.fill();
    }
  });
}

function animPlayRough(canvas, ctx, from, to) {
  // Playful sparkle-charged tackle: attacker rushes to target, pink sparkles burst on impact
  return runCanvas(canvas, ctx, 420, (ctx, t) => {
    const dx = to.x - from.x, dy = to.y - from.y;
    if (t < 0.45) {
      const st = t / 0.45;
      const px = lerp(from.x, to.x, st), py = lerp(from.y, to.y, st);
      // Trail of pink sparkles
      for (let i = 0; i < 4; i++) {
        const bt = Math.max(0, st - i * 0.07);
        const bx = lerp(from.x, to.x, bt) + (Math.random() - 0.5) * 12;
        const by = lerp(from.y, to.y, bt) + (Math.random() - 0.5) * 12;
        ctx.beginPath(); ctx.arc(bx, by, 4 * (1 - i * 0.2), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,160,210,${0.7 - i * 0.15})`; ctx.fill();
      }
      // Attacker indicator
      ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,100,180,0.5)'; ctx.fill();
    } else {
      // Impact burst
      const it = (t - 0.45) / 0.55;
      const a = 1 - it;
      // 5-point star burst
      for (let s = 0; s < 5; s++) {
        const ang = (s / 5) * Math.PI * 2 - Math.PI / 2;
        const r = it * 55;
        const ex = to.x + Math.cos(ang) * r, ey = to.y + Math.sin(ang) * r;
        ctx.beginPath(); ctx.moveTo(to.x, to.y); ctx.lineTo(ex, ey);
        ctx.strokeStyle = `rgba(255,140,210,${a * 0.9})`; ctx.lineWidth = 3 - it * 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(ex, ey, 5 * (1 - it), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,200,230,${a})`; ctx.fill();
      }
      // Pink shockwave ring
      ctx.beginPath(); ctx.arc(to.x, to.y, it * 45, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,120,200,${a * 0.8})`; ctx.lineWidth = 4 * (1 - it) + 1; ctx.stroke();
    }
  });
}

function animSpiritBreak(canvas, ctx, from, to) {
  // Fairy energy spirals inward from all directions, then explodes through the target
  return runCanvas(canvas, ctx, 600, (ctx, t) => {
    if (t < 0.5) {
      // Phase 1: 8 glowing orbs spiral in toward target
      const st = t / 0.5;
      for (let i = 0; i < 8; i++) {
        const baseAng = (i / 8) * Math.PI * 2;
        const ang = baseAng - st * Math.PI * 1.5;
        const dist = lerp(120, 0, st * st);
        const ox = to.x + Math.cos(ang) * dist, oy = to.y + Math.sin(ang) * dist;
        const size = lerp(8, 3, st);
        ctx.beginPath(); ctx.arc(ox, oy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,${Math.floor(lerp(100,220,st))},240,${0.8 - st * 0.2})`; ctx.fill();
        // Glow
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, size * 2.5);
        grad.addColorStop(0, `rgba(255,160,255,0.4)`);
        grad.addColorStop(1, `rgba(255,160,255,0)`);
        ctx.beginPath(); ctx.arc(ox, oy, size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
      }
    } else {
      // Phase 2: spirit shatter explosion
      const it = (t - 0.5) / 0.5;
      const a = 1 - it;
      // Large expanding rings
      for (let r = 0; r < 3; r++) {
        const rp = Math.min(1, it + r * 0.15);
        ctx.beginPath(); ctx.arc(to.x, to.y, rp * 80, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,${Math.floor(180 - r * 40)},255,${a * (0.9 - r * 0.2)})`; ctx.lineWidth = 5 - r * 1.5; ctx.stroke();
      }
      // Radial sparkle burst
      for (let s = 0; s < 12; s++) {
        const ang = (s / 12) * Math.PI * 2;
        const r = it * 90;
        ctx.beginPath(); ctx.moveTo(to.x + Math.cos(ang) * r * 0.3, to.y + Math.sin(ang) * r * 0.3);
        ctx.lineTo(to.x + Math.cos(ang) * r, to.y + Math.sin(ang) * r);
        ctx.strokeStyle = `rgba(255,200,255,${a * 0.8})`; ctx.lineWidth = 2; ctx.stroke();
      }
      // Central flash
      const flash = Math.max(0, 1 - it * 3);
      if (flash > 0) {
        const g = ctx.createRadialGradient(to.x, to.y, 0, to.x, to.y, 40);
        g.addColorStop(0, `rgba(255,255,255,${flash})`);
        g.addColorStop(1, `rgba(255,160,255,0)`);
        ctx.beginPath(); ctx.arc(to.x, to.y, 40, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      }
    }
  });
}

function animDazzlingGleam(canvas, ctx, from, to) {
  // Brilliant light rays radiate forward from attacker and wash over target
  return runCanvas(canvas, ctx, 550, (ctx, t) => {
    const dx = to.x - from.x, dy = to.y - from.y;
    const dist = Math.hypot(dx, dy);
    const nx = dx / dist, ny = dy / dist;
    // Phase 1 (0ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“0.4): rays of light shoot forward
    if (t < 0.55) {
      const st = t / 0.55;
      const reach = lerp(0, dist + 30, st);
      for (let r = 0; r < 7; r++) {
        const spread = (r - 3) * 18 * (Math.PI / 180);
        const cos = Math.cos(spread), sin = Math.sin(spread);
        const rvx = nx * cos - ny * sin, rvy = ny * cos + nx * sin;
        const ex = from.x + rvx * reach, ey = from.y + rvy * reach;
        const a = r === 3 ? 0.9 : 0.6 - Math.abs(r - 3) * 0.12;
        const w = r === 3 ? 5 : 3 - Math.abs(r - 3) * 0.5;
        const grad = ctx.createLinearGradient(from.x, from.y, ex, ey);
        grad.addColorStop(0, `rgba(255,255,200,0)`);
        grad.addColorStop(0.3, `rgba(255,240,160,${a})`);
        grad.addColorStop(1, `rgba(255,255,255,${a * 0.6})`);
        ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(ex, ey);
        ctx.strokeStyle = grad; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.stroke();
      }
    }
    // Phase 2 (0.45ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“1): golden flash at target
    if (t > 0.4) {
      const it = (t - 0.4) / 0.6;
      const a = it < 0.4 ? it / 0.4 : 1 - (it - 0.4) / 0.6;
      for (let r = 0; r < 3; r++) {
        ctx.beginPath(); ctx.arc(to.x, to.y, (it * 60 + r * 10), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,230,100,${a * (0.8 - r * 0.25)})`; ctx.lineWidth = 4 - r; ctx.stroke();
      }
      // Radial gleam lines
      for (let s = 0; s < 8; s++) {
        const ang = (s / 8) * Math.PI * 2 + it;
        ctx.beginPath();
        ctx.moveTo(to.x + Math.cos(ang) * 8, to.y + Math.sin(ang) * 8);
        ctx.lineTo(to.x + Math.cos(ang) * (20 + it * 30), to.y + Math.sin(ang) * (20 + it * 30));
        ctx.strokeStyle = `rgba(255,255,180,${a * 0.7})`; ctx.lineWidth = 1.5; ctx.stroke();
      }
    }
  });
}

function animMoonblast(canvas, ctx, from, to) {
  // Crescent moon orb travels to target, explodes into massive pink/white starburst
  return runCanvas(canvas, ctx, 700, (ctx, t) => {
    if (t < 0.5) {
      // Phase 1: glowing orb travels to target
      const st = t / 0.5;
      const px = lerp(from.x, to.x, st), py = lerp(from.y, to.y, st);
      // Glow aura
      const grad = ctx.createRadialGradient(px, py, 0, px, py, 28);
      grad.addColorStop(0, `rgba(255,180,255,0.9)`);
      grad.addColorStop(0.5, `rgba(200,100,255,0.5)`);
      grad.addColorStop(1, `rgba(180,80,255,0)`);
      ctx.beginPath(); ctx.arc(px, py, 28, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();
      // Moon crescent (circle with overlapping darker circle)
      ctx.save(); ctx.translate(px, py); ctx.rotate(st * Math.PI * 0.5 - Math.PI * 0.25);
      ctx.beginPath(); ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,220,255,0.95)'; ctx.fill();
      ctx.beginPath(); ctx.arc(5, -3, 9, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(120,40,180,0.85)'; ctx.fill();
      ctx.restore();
      // Trailing sparkles
      for (let i = 1; i <= 4; i++) {
        const bt = Math.max(0, st - i * 0.08);
        const bx = lerp(from.x, to.x, bt), by = lerp(from.y, to.y, bt);
        ctx.beginPath(); ctx.arc(bx + (Math.random()-0.5)*10, by + (Math.random()-0.5)*10, 3*(5-i)/5, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,180,255,${0.6 - i*0.12})`; ctx.fill();
      }
    } else {
      // Phase 2: explosion
      const it = (t - 0.5) / 0.5;
      const a = 1 - it;
      // Large expanding rings
      for (let r = 0; r < 4; r++) {
        const rp = Math.min(1, it + r * 0.1);
        ctx.beginPath(); ctx.arc(to.x, to.y, rp * 90, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${255},${Math.floor(150 + r*20)},255,${a*(0.9-r*0.18)})`; ctx.lineWidth = 5-r; ctx.stroke();
      }
      // 16 starburst rays
      for (let s = 0; s < 16; s++) {
        const ang = (s / 16) * Math.PI * 2;
        const inner = it * 20, outer = it * 100;
        ctx.beginPath();
        ctx.moveTo(to.x + Math.cos(ang) * inner, to.y + Math.sin(ang) * inner);
        ctx.lineTo(to.x + Math.cos(ang) * outer, to.y + Math.sin(ang) * outer);
        ctx.strokeStyle = `rgba(255,160,255,${a * 0.7})`; ctx.lineWidth = s % 2 === 0 ? 2.5 : 1.5; ctx.stroke();
      }
      // Central white flash
      const flash = Math.max(0, 1 - it * 2.5);
      if (flash > 0) {
        const g = ctx.createRadialGradient(to.x, to.y, 0, to.x, to.y, 50);
        g.addColorStop(0, `rgba(255,255,255,${flash})`);
        g.addColorStop(0.5, `rgba(255,200,255,${flash * 0.6})`);
        g.addColorStop(1, `rgba(200,100,255,0)`);
        ctx.beginPath(); ctx.arc(to.x, to.y, 50, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      }
    }
  });
}

function playAttackAnimation(moveType, attackerEl, targetEl, isSpecial = true, moveName = '') {
  if (!attackerEl || !targetEl) return Promise.resolve();
  const ac = animCanvas(attackerEl, targetEl);
  if (!ac) return Promise.resolve();
  const { canvas, ctx, from, to } = ac;

  // Useless move animations (attacker-centered, no damage)
  if (moveName === 'Splash')   return animSplash(canvas, ctx, from, to);
  if (moveName === 'Teleport') return animTeleport(canvas, ctx, from, to);

  if (!isSpecial) {
    // Physical move animations
    switch(moveName) {
      case 'Body Slam':    return animBodySlam(canvas, ctx, from, to);
      case 'Fire Punch':   return animFirePunch(canvas, ctx, from, to);
      case 'Waterfall':    return animWaterfall(canvas, ctx, from, to);
      case 'Thunder Punch':return animThunderPunch(canvas, ctx, from, to);
      case 'Razor Leaf':   return runParticleCanvas(canvas, ctx, buildParticles('grass', from, to), 650);
      case 'Ice Punch':    return animIcePunch(canvas, ctx, from, to);
      case 'Close Combat': return animCloseCombat(canvas, ctx, from, to);
      case 'Poison Jab':   return animPoisonJab(canvas, ctx, from, to);
      case 'Earthquake':   return animEarthquake(canvas, ctx, from, to);
      case 'Aerial Ace':   return animAerialAce(canvas, ctx, from, to);
      case 'Zen Headbutt': return animZenHeadbut(canvas, ctx, from, to);
      case 'X-Scissor':    return animXScissor(canvas, ctx, from, to);
      case 'Rock Slide':   return animRockSlide(canvas, ctx, from, to);
      case 'Shadow Claw':  return animShadowClaw(canvas, ctx, from, to);
      case 'Dragon Claw':  return animDragonClaw(canvas, ctx, from, to);
      case 'Play Rough':   return animPlayRough(canvas, ctx, from, to);
      case 'Spirit Break': return animSpiritBreak(canvas, ctx, from, to);
      default: {
        // Generic physical fallback
        const rgb = TYPE_COLORS_RGB[moveType.toLowerCase()] || '200,200,200';
        return runCanvas(canvas, ctx, 350, (ctx, t) => {
          if(t<0.4){
            const st=t/0.4; const ex=lerp(from.x,to.x,st), ey=lerp(from.y,to.y,st);
            const g=ctx.createLinearGradient(from.x,from.y,ex,ey);
            g.addColorStop(0,`rgba(${rgb},0)`); g.addColorStop(1,`rgba(${rgb},0.8)`);
            ctx.beginPath(); ctx.moveTo(from.x,from.y); ctx.lineTo(ex,ey);
            ctx.strokeStyle=g; ctx.lineWidth=6; ctx.lineCap='round'; ctx.stroke();
          } else {
            const it=(t-0.4)/0.6; const a=1-it;
            for(let r=0;r<3;r++){
              ctx.beginPath(); ctx.arc(to.x,to.y,it*40*(r+1)/3,0,Math.PI*2);
              ctx.strokeStyle=`rgba(${rgb},${a*0.8/(r+1)})`; ctx.lineWidth=3-r; ctx.stroke();
            }
          }
        });
      }
    }
  } else {
    // Special move animations
    switch(moveName) {
      case 'Hyper Voice':  return animHyperVoice(canvas, ctx, from, to);
      case 'Magical Leaf': return animRazorLeaf(canvas, ctx, from, to);
      // Surf, Thunderbolt use the existing buildParticles animations (water/electric are great)
      case 'Aura Sphere':  return animAuraSphere(canvas, ctx, from, to);
      case 'Sludge Bomb':  return animSludgeBomb(canvas, ctx, from, to);
      case 'Earth Power':  return animEarthPower(canvas, ctx, from, to);
      case 'Air Slash':    return animAirSlash(canvas, ctx, from, to);
      case 'Bug Buzz':     return animBugBuzz(canvas, ctx, from, to);
      case 'Power Gem':    return animPowerGem(canvas, ctx, from, to);
      case 'Shadow Ball':  return animShadowBall(canvas, ctx, from, to);
      case 'Dragon Pulse':    return animDragonPulse(canvas, ctx, from, to);
      case 'Dazzling Gleam':  return animDazzlingGleam(canvas, ctx, from, to);
      case 'Moonblast':       return animMoonblast(canvas, ctx, from, to);
      default: {
        // Use existing buildParticles for remaining special moves (Flamethrower, Surf, Thunderbolt, Ice Beam, Psychic)
        const type = (moveType || 'normal').toLowerCase();
        const particles = buildParticles(type, from, to);
        const duration = type === 'electric' ? 550 : type === 'psychic' ? 700 : type === 'fire' ? 800 : 650;
        return runParticleCanvas(canvas, ctx, particles, duration);
      }
    }
  }
}

/* ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ particle factories ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ */
function rnd(a, b) { return a + Math.random() * (b - a); }
function lerp(a, b, t) { return a + (b - a) * t; }

function buildParticles(type, from, to) {
  const dx = to.x - from.x, dy = to.y - from.y;
  const dist = Math.hypot(dx, dy);
  const nx = dx / dist, ny = dy / dist; // normalised direction

  const ps = [];

  if (type === 'fire') {
    // Fireball: glowing orb travels from attacker to target with ember trail, then explodes
    const TRAVEL = 400;

    // Main fireball orb
    let fbx = from.x, fby = from.y, fbAge = 0;
    ps.push({ alive: true,
      tick(ms) { fbAge = ms;
        const t = Math.min(ms / TRAVEL, 1);
        fbx = lerp(from.x, to.x, t); fby = lerp(from.y, to.y, t);
        this.alive = ms < TRAVEL + 80; },
      draw(ctx) {
        const a = Math.max(0, 1 - Math.max(0, fbAge - TRAVEL) / 80);
        // outer heat glow
        const glow = ctx.createRadialGradient(fbx, fby, 0, fbx, fby, 26);
        glow.addColorStop(0, `rgba(255,120,0,${a * 0.35})`);
        glow.addColorStop(1, `rgba(180,30,0,0)`);
        ctx.beginPath(); ctx.arc(fbx, fby, 26, 0, Math.PI * 2);
        ctx.fillStyle = glow; ctx.fill();
        // inner fireball
        const core = ctx.createRadialGradient(fbx, fby, 0, fbx, fby, 13);
        core.addColorStop(0,   `rgba(255,255,200,${a})`);
        core.addColorStop(0.3, `rgba(255,160,20,${a})`);
        core.addColorStop(0.7, `rgba(220,50,0,${a * 0.85})`);
        core.addColorStop(1,   `rgba(80,0,0,0)`);
        ctx.beginPath(); ctx.arc(fbx, fby, 13, 0, Math.PI * 2);
        ctx.fillStyle = core; ctx.fill();
      }
    });

    // Ember trail ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â particles spawned at positions along the fireball's path
    for (let i = 0; i < 38; i++) {
      const spawnFrac = i / 38;
      const spawnMs   = spawnFrac * TRAVEL;
      const spawnX    = lerp(from.x, to.x, spawnFrac);
      const spawnY    = lerp(from.y, to.y, spawnFrac);
      const evx = rnd(-0.5, 0.5);
      const evy = rnd(-1.4, 0.2); // hot air rises
      const life = rnd(180, 340);
      const startSize = rnd(3, 8);
      let age = -spawnMs;
      ps.push({ alive: true,
        tick(ms) { age = ms - spawnMs; this.alive = age < life; },
        draw(ctx) {
          if (age < 0) return;
          const t = age / life;
          const a = Math.max(0, t < 0.12 ? t / 0.12 : 1 - (t - 0.12) / 0.88);
          const ex = spawnX + evx * age * 0.05;
          const ey = spawnY + evy * age * 0.05;
          const s  = lerp(startSize, startSize * 2.8, t);
          const grad = ctx.createRadialGradient(ex, ey, 0, ex, ey, s);
          grad.addColorStop(0,   `rgba(255,230,120,${a * 0.95})`);
          grad.addColorStop(0.4, `rgba(240,90,10,${a * 0.75})`);
          grad.addColorStop(1,   `rgba(120,20,0,0)`);
          ctx.beginPath(); ctx.arc(ex, ey, s, 0, Math.PI * 2);
          ctx.fillStyle = grad; ctx.fill();
        }
      });
    }

    // Impact explosion burst
    for (let i = 0; i < 20; i++) {
      const delay = TRAVEL + i * 10;
      const angle = rnd(0, Math.PI * 2);
      const speed = rnd(1.0, 2.4);
      const life  = rnd(220, 380);
      const size  = rnd(5, 12);
      let px = to.x, py = to.y, age = -delay;
      ps.push({ alive: true,
        tick(ms) { age = ms - delay; if (age < 0) { this.alive = true; return; }
          px += Math.cos(angle) * speed * 1.6;
          py += Math.sin(angle) * speed * 1.6 - age * 0.0012;
          this.alive = age < life; },
        draw(ctx) {
          if (age < 0) return;
          const t = age / life;
          const a = Math.max(0, t < 0.1 ? t / 0.1 : 1 - (t - 0.1) / 0.9);
          const s = lerp(size, size * 2.4, t);
          const grad = ctx.createRadialGradient(px, py, 0, px, py, s);
          grad.addColorStop(0,   `rgba(255,240,160,${a})`);
          grad.addColorStop(0.3, `rgba(255,110,15,${a * 0.9})`);
          grad.addColorStop(0.7, `rgba(180,35,0,${a * 0.5})`);
          grad.addColorStop(1,   `rgba(60,0,0,0)`);
          ctx.beginPath(); ctx.arc(px, py, s, 0, Math.PI * 2);
          ctx.fillStyle = grad; ctx.fill();
        }
      });
    }

    // Impact shockwave ring
    let impactAge = -TRAVEL;
    ps.push({ alive: true,
      tick(ms) { impactAge = ms - TRAVEL; this.alive = impactAge < 360; },
      draw(ctx) {
        if (impactAge < 0) return;
        const t = impactAge / 360;
        ctx.beginPath(); ctx.arc(to.x, to.y, t * 40, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,110,0,${(1 - t) * 0.6})`; ctx.lineWidth = 3 * (1 - t) + 1; ctx.stroke();
      }
    });

  } else if (type === 'water') {
    // Water Gun: a coherent pressurised stream (grows like the ice beam but wavy+blue)
    let streamAge = 0;
    ps.push({
      alive: true,
      tick(ms) { streamAge = ms; this.alive = ms < 680; },
      draw(ctx) {
        const growT = Math.min(streamAge / 300, 1);
        const fadeA = Math.max(0, 1 - Math.max(0, streamAge - 420) / 260);
        // Draw the stream as a series of short segments with a sine-wave wobble
        const segs = 40;
        const drawSegs = Math.ceil(growT * segs);
        const waveFreq = 3.5; // oscillations along the stream
        const waveAmp  = 5;   // perpendicular pixels
        const phase = streamAge * 0.012; // scrolling phase = water flowing
        // Compute wave points once, reuse for all three strokes
        const pts = [];
        for (let s = 0; s <= drawSegs; s++) {
          const t = s / segs;
          const bx = lerp(from.x, to.x, t), by = lerp(from.y, to.y, t);
          const wave = Math.sin(t * Math.PI * 2 * waveFreq - phase) * waveAmp;
          pts.push(bx - ny * wave, by + nx * wave);
        }
        const strokePath = () => {
          ctx.beginPath();
          for (let s = 0; s < pts.length; s += 2)
            s === 0 ? ctx.moveTo(pts[s], pts[s+1]) : ctx.lineTo(pts[s], pts[s+1]);
        };
        strokePath(); ctx.strokeStyle = `rgba(60,140,255,${fadeA * 0.45})`;
        ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.stroke();
        strokePath(); ctx.strokeStyle = `rgba(100,190,255,${fadeA * 0.85})`;
        ctx.lineWidth = 5; ctx.stroke();
        strokePath(); ctx.strokeStyle = `rgba(220,240,255,${fadeA * 0.7})`;
        ctx.lineWidth = 1.5; ctx.stroke();
      }
    });
    // Foam bubbles riding the stream tip
    for (let i = 0; i < 12; i++) {
      const delay = i * 22;
      const life  = rnd(200, 320);
      const perpOff = rnd(-6, 6);
      let age = -delay;
      ps.push({
        alive: true,
        tick(ms) { age = ms - delay; this.alive = age < life; },
        draw(ctx) {
          if (age < 0) return;
          const t = Math.min(age / 260, 1) * Math.min((delay / (12 * 22)), 1);
          const bx = lerp(from.x, to.x, t) - ny * perpOff;
          const by = lerp(from.y, to.y, t) + nx * perpOff;
          const a  = Math.max(0, 1 - age / life);
          ctx.beginPath(); ctx.arc(bx, by, rnd(2, 4), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(190,225,255,${a * 0.75})`; ctx.fill();
        }
      });
    }
    // Splash at impact
    let splashAge = -1;
    ps.push({
      alive: true,
      tick(ms) { splashAge = ms - 280; this.alive = splashAge < 420; },
      draw(ctx) {
        if (splashAge < 0) return;
        const t = splashAge / 420;
        for (let r = 1; r <= 3; r++) {
          ctx.beginPath(); ctx.arc(to.x, to.y, Math.max(0, t * 38 * r / 3), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(80,180,255,${(1 - t) * 0.6 / r})`;
          ctx.lineWidth = 3 * (1 - t) + 0.5; ctx.stroke();
        }
      }
    });

  } else if (type === 'electric') {
    // Thunderbolt: animated zigzag bolt
    let bolts = [];
    function makeBolt(ox, oy) {
      const segs = 10;
      const pts = [{ x: from.x + ox, y: from.y + oy }];
      for (let i = 1; i < segs; i++) {
        const t = i / segs;
        const bx = lerp(from.x + ox, to.x + ox, t) + rnd(-18, 18);
        const by = lerp(from.y + oy, to.y + oy, t) + rnd(-18, 18);
        pts.push({ x: bx, y: by });
      }
      pts.push({ x: to.x + ox, y: to.y + oy });
      return pts;
    }
    for (let b = 0; b < 3; b++) bolts.push(makeBolt(rnd(-6, 6), rnd(-6, 6)));
    let boltAge = 0;
    ps.push({
      alive: true,
      tick(ms) { boltAge = ms; if (ms % 80 < 40) bolts = bolts.map(() => makeBolt(rnd(-6,6), rnd(-6,6))); this.alive = ms < 500; },
      draw(ctx) {
        const growT = Math.min(boltAge / 200, 1);
        for (const bolt of bolts) {
          const showSegs = Math.ceil(growT * bolt.length);
          ctx.beginPath();
          ctx.moveTo(bolt[0].x, bolt[0].y);
          for (let i = 1; i < showSegs; i++) ctx.lineTo(bolt[i].x, bolt[i].y);
          const a = Math.max(0, 1 - Math.max(0, boltAge - 350) / 150);
          ctx.strokeStyle = `rgba(255,255,80,${a * 0.9})`;
          ctx.lineWidth = 2.5;
          ctx.shadowColor = 'rgba(255,255,0,0.8)'; ctx.shadowBlur = 10;
          ctx.stroke();
          ctx.shadowBlur = 0;
          // core white line
          ctx.beginPath(); ctx.moveTo(bolt[0].x, bolt[0].y);
          for (let i = 1; i < showSegs; i++) ctx.lineTo(bolt[i].x, bolt[i].y);
          ctx.strokeStyle = `rgba(255,255,255,${a * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });

  } else if (type === 'grass') {
    // Vine Whip: two bezier vines that grow from attacker and lash the target
    const midX = (from.x + to.x) / 2, midY = (from.y + to.y) / 2;
    // Perpendicular offset for each vine's control point (one curves up, one down)
    for (let v = 0; v < 2; v++) {
      const sign   = v === 0 ? 1 : -1;
      const curveMag = dist * 0.30 * sign;
      const cpx = midX - ny * curveMag + rnd(-10, 10);
      const cpy = midY + nx * curveMag + rnd(-10, 10);
      const totalLife = 580;
      const growEnd   = 320; // ms until vine fully extended
      const fadeStart = 400;
      const delay = v * 60;
      let age = -delay;

      // helper: point on quadratic bezier at t
      function bpx(t) { return (1-t)*(1-t)*from.x + 2*(1-t)*t*cpx + t*t*to.x; }
      function bpy(t) { return (1-t)*(1-t)*from.y + 2*(1-t)*t*cpy + t*t*to.y; }

      ps.push({
        alive: true,
        tick(ms) { age = ms - delay; this.alive = age < totalLife; },
        draw(ctx) {
          if (age < 0) return;
          const growT = Math.min(age / growEnd, 1);
          const fadeA = Math.max(0, 1 - Math.max(0, age - fadeStart) / (totalLife - fadeStart));
          const segs  = 30;
          const drawSegs = Math.ceil(growT * segs);

          // Vine body (3 passes: glow, main, highlight)
          const passes = [
            { lw: 7,   color: `rgba(30,90,10,${fadeA * 0.4})` },
            { lw: 3.5, color: `rgba(50,140,20,${fadeA * 0.9})` },
            { lw: 1.2, color: `rgba(130,210,70,${fadeA * 0.55})` },
          ];
          for (const { lw, color } of passes) {
            ctx.beginPath();
            for (let s = 0; s <= drawSegs; s++) {
              const t = s / segs;
              s === 0 ? ctx.moveTo(bpx(t), bpy(t)) : ctx.lineTo(bpx(t), bpy(t));
            }
            ctx.strokeStyle = color; ctx.lineWidth = lw;
            ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
          }

          // Leaves every ~5 segments
          for (let s = 4; s < drawSegs; s += 5) {
            const t = s / segs;
            const lx = bpx(t), ly = bpy(t);
            // tangent direction
            const t2 = Math.min(t + 0.02, 1);
            const tang = Math.atan2(bpy(t2) - ly, bpx(t2) - lx);
            const leafSide = s % 10 < 5 ? 1 : -1;
            ctx.save();
            ctx.translate(lx, ly);
            ctx.rotate(tang + leafSide * Math.PI / 3.5);
            ctx.beginPath();
            ctx.ellipse(4, 0, 7, 3, 0, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(70,170,35,${fadeA * 0.85})`; ctx.fill();
            ctx.restore();
          }

          // Whip-tip flash when vine is fully extended
          if (growT >= 1) {
            const flashA = Math.max(0, 1 - Math.max(0, age - growEnd) / 120) * fadeA;
            ctx.beginPath(); ctx.arc(to.x, to.y, Math.max(0, 10 * flashA), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(150,255,80,${flashA * 0.6})`; ctx.fill();
          }
        }
      });
    }

  } else if (type === 'ice') {
    // Freeze: spinning snowflake orb travels to target, then shatters into crystal shards
    const TRAVEL = 370;
    let orbX = from.x, orbY = from.y, orbAge = 0;
    ps.push({ alive: true,
      tick(ms) { orbAge = ms;
        const t = Math.min(ms / TRAVEL, 1);
        orbX = lerp(from.x, to.x, t); orbY = lerp(from.y, to.y, t);
        this.alive = ms < TRAVEL + 80; },
      draw(ctx) {
        const a = Math.max(0, 1 - Math.max(0, orbAge - TRAVEL) / 80);
        // outer glow
        const glow = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, 22);
        glow.addColorStop(0, `rgba(200,245,255,${a * 0.45})`);
        glow.addColorStop(1, `rgba(100,200,255,0)`);
        ctx.beginPath(); ctx.arc(orbX, orbY, 22, 0, Math.PI * 2);
        ctx.fillStyle = glow; ctx.fill();
        // spinning snowflake
        ctx.save(); ctx.translate(orbX, orbY); ctx.rotate(orbAge * 0.005);
        for (let s = 0; s < 6; s++) {
          const ang = (s / 6) * Math.PI * 2;
          const ex = Math.cos(ang) * 10, ey = Math.sin(ang) * 10;
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(ex, ey);
          ctx.strokeStyle = `rgba(215,248,255,${a})`; ctx.lineWidth = 2; ctx.stroke();
          // branch arms
          const perp = ang + Math.PI / 2;
          const bx = Math.cos(ang) * 6, by = Math.sin(ang) * 6;
          ctx.beginPath();
          ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(perp) * 3.5, by + Math.sin(perp) * 3.5);
          ctx.moveTo(bx, by); ctx.lineTo(bx - Math.cos(perp) * 3.5, by - Math.sin(perp) * 3.5);
          ctx.strokeStyle = `rgba(180,235,255,${a * 0.85})`; ctx.lineWidth = 1.2; ctx.stroke();
        }
        // center dot
        ctx.beginPath(); ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,252,255,${a})`; ctx.fill();
        ctx.restore();
      }
    });
    // Crystal shard burst at impact
    for (let i = 0; i < 12; i++) {
      const delay = TRAVEL + i * 12;
      const angle = rnd(0, Math.PI * 2);
      const speed = rnd(0.8, 2.0);
      const life  = rnd(260, 440);
      const size  = rnd(4, 10);
      let px = to.x, py = to.y, age = -delay;
      ps.push({ alive: true,
        tick(ms) { age = ms - delay; if (age < 0) { this.alive = true; return; }
          px += Math.cos(angle) * speed * 1.4;
          py += Math.sin(angle) * speed * 1.4;
          this.alive = age < life; },
        draw(ctx) {
          if (age < 0) return;
          const a = Math.max(0, 1 - age / life);
          const s = size * (1 - age / life * 0.5);
          ctx.save(); ctx.translate(px, py); ctx.rotate(angle + age * 0.004);
          ctx.beginPath();
          ctx.moveTo(0, -s); ctx.lineTo(s * 0.4, 0); ctx.lineTo(0, s); ctx.lineTo(-s * 0.4, 0); ctx.closePath();
          ctx.fillStyle = `rgba(175,232,255,${a * 0.9})`; ctx.fill();
          ctx.strokeStyle = `rgba(230,250,255,${a})`; ctx.lineWidth = 1; ctx.stroke();
          ctx.restore();
        }
      });
    }
    // Shockwave ring
    let iceRingAge = -TRAVEL;
    ps.push({ alive: true,
      tick(ms) { iceRingAge = ms - TRAVEL; this.alive = iceRingAge < 380; },
      draw(ctx) {
        if (iceRingAge < 0) return;
        const t = iceRingAge / 380;
        ctx.beginPath(); ctx.arc(to.x, to.y, t * 48, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(150,225,255,${(1 - t) * 0.65})`; ctx.lineWidth = 2.5 * (1 - t) + 0.5; ctx.stroke();
      }
    });

  } else if (type === 'fighting') {
    // Mach Punch: glowing red orb travels from attacker to target, then impact burst
    const fTravelTime = 240;
    let fpx = from.x, fpy = from.y, fAge = 0;
    ps.push({ alive: true,
      tick(ms) { fAge = ms;
        const t = Math.min(ms / fTravelTime, 1);
        fpx = lerp(from.x, to.x, t); fpy = lerp(from.y, to.y, t);
        this.alive = ms < fTravelTime + 60; },
      draw(ctx) {
        const tTravel = Math.min(fAge / fTravelTime, 1);
        const a = Math.max(0, 1 - Math.max(0, fAge - fTravelTime) / 60);
        // motion trail
        for (let ti = 0; ti < tTravel; ti += 0.09) {
          if (tTravel - ti > 0.4) continue;
          const tx = lerp(from.x, to.x, ti), ty = lerp(from.y, to.y, ti);
          const ta = ((ti - (tTravel - 0.4)) / 0.4) * a * 0.45;
          ctx.beginPath(); ctx.arc(tx, ty, 10 * ta, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220,40,40,${ta})`; ctx.fill();
        }
        const s = 14;
        const grad = ctx.createRadialGradient(fpx, fpy, 0, fpx, fpy, s);
        grad.addColorStop(0, `rgba(255,200,200,${a})`);
        grad.addColorStop(0.4, `rgba(220,40,40,${a * 0.9})`);
        grad.addColorStop(1, `rgba(100,0,0,0)`);
        ctx.beginPath(); ctx.arc(fpx, fpy, s, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
      }
    });
    // Impact burst after travel
    for (let i = 0; i < 6; i++) {
      const delay = fTravelTime + i * 40;
      const angle = (i / 6) * Math.PI * 2 + rnd(0, 0.5);
      const speed = rnd(1.0, 1.8);
      const life  = rnd(220, 320);
      let px = to.x, py = to.y, age = -delay;
      ps.push({
        alive: true,
        tick(ms) { age = ms - delay; if (age < 0) { this.alive = true; return; }
          px += Math.cos(angle) * speed * 1.5; py += Math.sin(angle) * speed * 1.5;
          this.alive = age < life; },
        draw(ctx) {
          if (age < 0) return;
          const a = Math.max(0, 1 - age / life);
          const s = (12 + 8 * (1 - age / life)) * a;
          ctx.save(); ctx.translate(px, py); ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(0, -s); ctx.lineTo(s * 0.3, -s * 0.3); ctx.lineTo(s, 0);
          ctx.lineTo(s * 0.3, s * 0.3); ctx.lineTo(0, s);
          ctx.lineTo(-s * 0.3, s * 0.3); ctx.lineTo(-s, 0);
          ctx.lineTo(-s * 0.3, -s * 0.3); ctx.closePath();
          ctx.fillStyle = `rgba(220,40,40,${a * 0.85})`; ctx.fill();
          ctx.restore();
        }
      });
    }
    // shockwave ring at impact
    let ringAge = -fTravelTime;
    ps.push({ alive: true,
      tick(ms) { ringAge = ms - fTravelTime; this.alive = ringAge < 350; },
      draw(ctx) {
        if (ringAge < 0) return;
        const t = ringAge / 350;
        ctx.beginPath(); ctx.arc(to.x, to.y, Math.max(0, t * 45), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,80,80,${(1 - t) * 0.8})`; ctx.lineWidth = 3; ctx.stroke();
      }
    });

  } else if (type === 'poison') {
    // Sludge Bomb: purple bubble stream
    for (let i = 0; i < 18; i++) {
      const delay = i * 25;
      const spread = rnd(-20, 20);
      const speed = rnd(0.55, 0.85);
      const cos = Math.cos(spread * Math.PI / 180);
      const sin = Math.sin(spread * Math.PI / 180);
      const vx = (nx * cos - ny * sin) * speed;
      const vy = (ny * cos + nx * sin) * speed;
      const life = rnd(380, 540);
      const size = rnd(5, 13);
      let px = from.x + rnd(-5, 5), py = from.y + rnd(-5, 5);
      let age = -delay;
      ps.push({
        alive: true,
        tick(ms) { age = ms - delay; if (age < 0) { this.alive = true; return; }
          px += vx * 1.8; py += vy * 1.8; this.alive = age < life; },
        draw(ctx) {
          if (age < 0) return;
          const a = Math.max(0, 1 - age / life);
          const s = size * (0.5 + 0.5 * (1 - age / life));
          const grad = ctx.createRadialGradient(px - s * 0.2, py - s * 0.2, s * 0.1, px, py, s);
          grad.addColorStop(0, `rgba(220,180,255,${a})`);
          grad.addColorStop(0.5, `rgba(160,60,200,${a * 0.9})`);
          grad.addColorStop(1, `rgba(80,0,120,0)`);
          ctx.beginPath(); ctx.arc(px, py, s, 0, Math.PI * 2);
          ctx.fillStyle = grad; ctx.fill();
          // bubble highlight
          ctx.beginPath(); ctx.arc(px - s * 0.3, py - s * 0.3, s * 0.25, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${a * 0.4})`; ctx.fill();
        }
      });
    }

  } else if (type === 'ground') {
    // Earthquake: brown rock shards + quake wave at target
    for (let i = 0; i < 15; i++) {
      const delay = i * 30;
      const angle = rnd(Math.PI * 1.1, Math.PI * 1.9); // upward spread
      const speed = rnd(1.0, 2.0);
      const life  = rnd(400, 600);
      const size  = rnd(6, 14);
      let px = lerp(from.x, to.x, rnd(0.3, 1.0));
      let py = lerp(from.y, to.y, rnd(0.3, 1.0));
      let vx = Math.cos(angle) * speed, vy = Math.sin(angle) * speed;
      let age = -delay;
      ps.push({
        alive: true,
        tick(ms) { age = ms - delay; if (age < 0) { this.alive = true; return; }
          px += vx * 2; vy += 0.08; py += vy * 2; this.alive = age < life; },
        draw(ctx) {
          if (age < 0) return;
          const a = Math.max(0, 1 - age / life);
          ctx.save(); ctx.translate(px, py); ctx.rotate(age * 0.005);
          ctx.beginPath();
          ctx.moveTo(0, -size); ctx.lineTo(size * 0.6, 0); ctx.lineTo(0, size * 0.5);
          ctx.lineTo(-size * 0.6, 0); ctx.closePath();
          ctx.fillStyle = `rgba(160,100,40,${a * 0.9})`; ctx.fill();
          ctx.restore();
        }
      });
    }
    // Quake lines
    let qAge = 0;
    ps.push({ alive: true, tick(ms) { qAge = ms; this.alive = ms < 500; },
      draw(ctx) {
        for (let i = 1; i <= 3; i++) {
          const r = Math.max(0.01, (qAge / 500) * 60 * i / 3);
          const a = (1 - qAge / 500) * 0.6;
          ctx.beginPath(); ctx.ellipse(to.x, to.y, r, r * 0.35, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(140,80,20,${a})`; ctx.lineWidth = 2; ctx.stroke();
        }
      }
    });

  } else if (type === 'flying') {
    // Wing Attack / Air Slash: white curved wind blades
    for (let i = 0; i < 4; i++) {
      const delay = i * 80;
      const offset = (i - 1.5) * 20;
      const life = 400;
      let age = -delay;
      ps.push({
        alive: true,
        tick(ms) { age = ms - delay; this.alive = age < life; },
        draw(ctx) {
          if (age < 0) return;
          const t = age / life;
          const tx = lerp(from.x, to.x, t);
          const ty = lerp(from.y, to.y, t);
          const perpX = -ny * offset, perpY = nx * offset;
          const a = Math.max(0, Math.sin(t * Math.PI));
          ctx.save(); ctx.translate(tx + perpX, ty + perpY);
          const ang = Math.atan2(dy, dx);
          ctx.rotate(ang);
          ctx.beginPath();
          ctx.moveTo(-20, 0);
          ctx.bezierCurveTo(-10, -12, 10, -12, 20, 0);
          ctx.bezierCurveTo(10, 12, -10, 12, -20, 0);
          ctx.fillStyle = `rgba(200,230,255,${a * 0.75})`; ctx.fill();
          ctx.restore();
        }
      });
    }

  } else if (type === 'psychic') {
    // Psychic: pink expanding rings + orbiting sparkles
    let pAge = 0;
    ps.push({ alive: true, tick(ms) { pAge = ms; this.alive = ms < 700; },
      draw(ctx) {
        for (let i = 0; i < 3; i++) {
          const lag = i * 120;
          const t = Math.max(0, Math.min((pAge - lag) / 450, 1));
          if (t <= 0) continue;
          const r = lerp(10, 55, t);
          const a = (1 - t) * 0.7;
          ctx.beginPath(); ctx.arc(to.x, to.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,80,180,${a})`; ctx.lineWidth = 3; ctx.stroke();
        }
        // orbital sparks
        for (let s = 0; s < 5; s++) {
          const ang = (pAge * 0.006) + (s / 5) * Math.PI * 2;
          const orb = lerp(from.x, to.x, Math.min(pAge / 350, 1));
          const orby = lerp(from.y, to.y, Math.min(pAge / 350, 1));
          const r = 18;
          const sx = orb + Math.cos(ang) * r, sy = orby + Math.sin(ang) * r;
          const a = Math.max(0, 1 - Math.max(0, pAge - 400) / 300);
          ctx.beginPath(); ctx.arc(sx, sy, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,100,200,${a})`; ctx.fill();
        }
      }
    });

  } else if (type === 'bug') {
    // Bug Buzz: yellow-green spore cloud
    for (let i = 0; i < 25; i++) {
      const delay = i * 15;
      const angle = rnd(0, Math.PI * 2);
      const spread = rnd(-25, 25);
      const speed = rnd(0.5, 0.9);
      const cos = Math.cos(spread * Math.PI / 180);
      const sin = Math.sin(spread * Math.PI / 180);
      const vx = (nx * cos - ny * sin) * speed;
      const vy = (ny * cos + nx * sin) * speed;
      const life = rnd(300, 500);
      const size = rnd(3, 8);
      let px = from.x, py = from.y, age = -delay;
      ps.push({
        alive: true,
        tick(ms) { age = ms - delay; if (age < 0) { this.alive = true; return; }
          px += vx * 1.8 + Math.sin(age * 0.05 + angle) * 0.4;
          py += vy * 1.8; this.alive = age < life; },
        draw(ctx) {
          if (age < 0) return;
          const a = Math.max(0, 1 - age / life);
          ctx.beginPath(); ctx.arc(px, py, Math.max(0, size * a), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150,220,30,${a * 0.85})`; ctx.fill();
        }
      });
    }

  } else if (type === 'rock') {
    // Rock Slide: grey tumbling boulders
    for (let i = 0; i < 10; i++) {
      const delay = i * 40;
      const spread = rnd(-12, 12);
      const speed = rnd(0.75, 1.1);
      const cos = Math.cos(spread * Math.PI / 180);
      const sin = Math.sin(spread * Math.PI / 180);
      const vx = (nx * cos - ny * sin) * speed;
      const vy = (ny * cos + nx * sin) * speed;
      const life = rnd(350, 500);
      const size = rnd(8, 16);
      const sides = Math.floor(rnd(5, 8));
      let px = from.x + rnd(-8, 8), py = from.y + rnd(-8, 8), rot = rnd(0, Math.PI * 2);
      let age = -delay;
      ps.push({
        alive: true,
        tick(ms) { age = ms - delay; if (age < 0) { this.alive = true; return; }
          px += vx * 2.0; py += vy * 2.0; rot += 0.07; this.alive = age < life; },
        draw(ctx) {
          if (age < 0) return;
          const a = Math.max(0, 1 - age / life);
          ctx.save(); ctx.translate(px, py); ctx.rotate(rot);
          ctx.beginPath();
          for (let s = 0; s < sides; s++) {
            const ang = (s / sides) * Math.PI * 2;
            const r = size * (0.8 + 0.2 * Math.cos(ang * 3));
            s === 0 ? ctx.moveTo(Math.cos(ang)*r, Math.sin(ang)*r)
                    : ctx.lineTo(Math.cos(ang)*r, Math.sin(ang)*r);
          }
          ctx.closePath();
          ctx.fillStyle = `rgba(140,130,110,${a * 0.9})`;
          ctx.strokeStyle = `rgba(80,70,60,${a})`; ctx.lineWidth = 1.5;
          ctx.fill(); ctx.stroke();
          ctx.restore();
        }
      });
    }

  } else if (type === 'ghost') {
    // Shadow Ball: dark purple wisp
    let gAge = 0;
    let px = from.x, py = from.y;
    let wobble = 0;
    ps.push({ alive: true,
      tick(ms) { gAge = ms;
        const t = Math.min(ms / 500, 1);
        px = lerp(from.x, to.x, t); py = lerp(from.y, to.y, t);
        wobble = Math.sin(ms * 0.015) * 8;
        this.alive = ms < 600; },
      draw(ctx) {
        const a = Math.max(0, 1 - Math.max(0, gAge - 450) / 150);
        const s = 22;
        const grad = ctx.createRadialGradient(px + wobble, py, 0, px + wobble, py, s);
        grad.addColorStop(0, `rgba(200,100,255,${a})`);
        grad.addColorStop(0.4, `rgba(100,0,180,${a * 0.8})`);
        grad.addColorStop(1, `rgba(20,0,60,0)`);
        ctx.beginPath(); ctx.arc(px + wobble, py, s, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
        // trailing wisps
        for (let t2 = 0.1; t2 < 1; t2 += 0.2) {
          const trail_t = Math.min(gAge / 500 - t2, 0);
          if (trail_t >= 0) continue;
          const twx = lerp(from.x, to.x, Math.max(0, gAge / 500 - t2));
          const twy = lerp(from.y, to.y, Math.max(0, gAge / 500 - t2));
          ctx.beginPath(); ctx.arc(twx, twy, Math.max(0, s * t2 * 0.6), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100,0,180,${a * t2 * 0.4})`; ctx.fill();
        }
      }
    });

  } else if (type === 'dragon') {
    // Dragon Rage: rainbow energy beam
    let dAge = 0;
    ps.push({ alive: true, tick(ms) { dAge = ms; this.alive = ms < 700; },
      draw(ctx) {
        const growT = Math.min(dAge / 320, 1);
        const fadeA = Math.max(0, 1 - Math.max(0, dAge - 450) / 250);
        const endX = lerp(from.x, to.x, growT), endY = lerp(from.y, to.y, growT);
        const colors = ['255,60,60','255,160,0','255,255,0','60,220,60','60,160,255','160,80,255'];
        for (let c = 0; c < colors.length; c++) {
          const offset = (c - 2.5) * 3;
          const perpX = -ny * offset, perpY = nx * offset;
          ctx.beginPath();
          ctx.moveTo(from.x + perpX, from.y + perpY);
          ctx.lineTo(endX + perpX, endY + perpY);
          ctx.strokeStyle = `rgba(${colors[c]},${fadeA * 0.7})`;
          ctx.lineWidth = 3; ctx.stroke();
        }
        // white core
        ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(255,255,255,${fadeA * 0.4})`; ctx.lineWidth = 1.5; ctx.stroke();
      }
    });

  } else if (type === 'dark') {
    // Dark Pulse / Night Slash: black energy slashes
    for (let i = 0; i < 5; i++) {
      const delay = i * 60;
      const life = 350;
      let age = -delay;
      ps.push({
        alive: true,
        tick(ms) { age = ms - delay; this.alive = age < life; },
        draw(ctx) {
          if (age < 0) return;
          const t = age / life;
          const tx = lerp(from.x, to.x, t);
          const ty = lerp(from.y, to.y, t);
          const a = Math.sin(t * Math.PI) * 0.9;
          const ang = Math.atan2(dy, dx) + (i - 2) * 0.2;
          const len = 28;
          ctx.save(); ctx.translate(tx, ty); ctx.rotate(ang);
          ctx.beginPath(); ctx.moveTo(-len, 0); ctx.lineTo(len, 0);
          ctx.strokeStyle = `rgba(80,0,120,${a})`; ctx.lineWidth = 5;
          ctx.shadowColor = 'rgba(60,0,80,0.8)'; ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.beginPath(); ctx.moveTo(-len, 0); ctx.lineTo(len, 0);
          ctx.strokeStyle = `rgba(200,100,255,${a * 0.5})`; ctx.lineWidth = 1.5;
          ctx.stroke(); ctx.shadowBlur = 0;
          ctx.restore();
        }
      });
    }

  } else if (type === 'steel') {
    // Flash Cannon: silver metallic orb travels from attacker to target, then spark burst
    const sTravelTime = 270;
    let spx = from.x, spy = from.y, sAge2 = 0;
    ps.push({ alive: true,
      tick(ms) { sAge2 = ms;
        const t = Math.min(ms / sTravelTime, 1);
        spx = lerp(from.x, to.x, t); spy = lerp(from.y, to.y, t);
        this.alive = ms < sTravelTime + 60; },
      draw(ctx) {
        const tTravel = Math.min(sAge2 / sTravelTime, 1);
        const a = Math.max(0, 1 - Math.max(0, sAge2 - sTravelTime) / 60);
        // trailing gleam
        for (let ti = Math.max(0, tTravel - 0.38); ti < tTravel; ti += 0.07) {
          const tx = lerp(from.x, to.x, ti), ty = lerp(from.y, to.y, ti);
          const ta = ((ti - (tTravel - 0.38)) / 0.38) * a * 0.5;
          ctx.beginPath(); ctx.arc(tx, ty, 9 * ta, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180,200,220,${ta})`; ctx.fill();
        }
        const s = 12;
        const grad = ctx.createRadialGradient(spx - s * 0.3, spy - s * 0.3, s * 0.1, spx, spy, s);
        grad.addColorStop(0, `rgba(255,255,255,${a})`);
        grad.addColorStop(0.4, `rgba(200,215,230,${a * 0.9})`);
        grad.addColorStop(1, `rgba(100,120,150,0)`);
        ctx.beginPath(); ctx.arc(spx, spy, s, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
      }
    });
    // Spark burst on impact
    for (let i = 0; i < 20; i++) {
      const delay = sTravelTime + i * 15;
      const angle = rnd(0, Math.PI * 2);
      const speed = rnd(0.8, 2.0);
      const life  = rnd(200, 360);
      let px = to.x, py = to.y, age = -delay;
      ps.push({
        alive: true,
        tick(ms) { age = ms - delay; if (age < 0) { this.alive = true; return; }
          px += Math.cos(angle) * speed * 2; py += Math.sin(angle) * speed * 2;
          this.alive = age < life; },
        draw(ctx) {
          if (age < 0) return;
          const a = Math.max(0, 1 - age / life);
          ctx.beginPath();
          ctx.moveTo(px, py); ctx.lineTo(px - Math.cos(angle) * 10, py - Math.sin(angle) * 10);
          ctx.strokeStyle = `rgba(200,210,220,${a})`; ctx.lineWidth = 2.5; ctx.stroke();
          ctx.beginPath(); ctx.arc(px, py, Math.max(0, 2.5 * a), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240,245,255,${a})`; ctx.fill();
        }
      });
    }

  } else if (type === 'fairy') {
    // Moonblast: pink sparkles + stars
    for (let i = 0; i < 22; i++) {
      const delay = i * 20;
      const spread = rnd(-30, 30);
      const speed = rnd(0.5, 0.9);
      const cos = Math.cos(spread * Math.PI / 180);
      const sin = Math.sin(spread * Math.PI / 180);
      const vx = (nx * cos - ny * sin) * speed;
      const vy = (ny * cos + nx * sin) * speed;
      const life = rnd(350, 550);
      const size = rnd(4, 9);
      let px = from.x + rnd(-6, 6), py = from.y + rnd(-6, 6), rot = rnd(0, Math.PI);
      let age = -delay;
      ps.push({
        alive: true,
        tick(ms) { age = ms - delay; if (age < 0) { this.alive = true; return; }
          px += vx * 1.8; py += vy * 1.8; rot += 0.08; this.alive = age < life; },
        draw(ctx) {
          if (age < 0) return;
          const a = Math.max(0, 1 - age / life);
          ctx.save(); ctx.translate(px, py); ctx.rotate(rot);
          // 4-point star
          ctx.beginPath();
          for (let s = 0; s < 8; s++) {
            const ang = (s / 8) * Math.PI * 2;
            const r = s % 2 === 0 ? size : size * 0.4;
            s === 0 ? ctx.moveTo(Math.cos(ang)*r, Math.sin(ang)*r)
                    : ctx.lineTo(Math.cos(ang)*r, Math.sin(ang)*r);
          }
          ctx.closePath();
          ctx.fillStyle = `rgba(255,140,200,${a * 0.9})`; ctx.fill();
          ctx.restore();
        }
      });
    }

  } else {
    // Normal: white energy orb traveling to target
    let px = from.x, py = from.y, nAge = 0;
    ps.push({ alive: true,
      tick(ms) { nAge = ms;
        const t = Math.min(ms / 400, 1);
        px = lerp(from.x, to.x, t); py = lerp(from.y, to.y, t);
        this.alive = ms < 450; },
      draw(ctx) {
        const a = Math.max(0, 1 - Math.max(0, nAge - 350) / 100);
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 18);
        grad.addColorStop(0, `rgba(255,255,255,${a})`);
        grad.addColorStop(1, `rgba(200,200,200,0)`);
        ctx.beginPath(); ctx.arc(px, py, 18, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
      }
    });
  }

  return ps;
}

// Visual turn-by-turn battle animation
async function animateBattleVisually(detailedLog, pTeamInit, eTeamInit) {
  renderBattleField(pTeamInit, eTeamInit);

  // Track live HP and stat stages during animation
  const logEl = null; // combat log removed
  const pHp = pTeamInit.map(p => ({ current: p.currentHp, max: p.maxHp }));
  const eHp = eTeamInit.map(p => ({
    current: p.currentHp !== undefined ? p.currentHp : p.maxHp,
    max: p.maxHp,
  }));
  const emptyStages = () => ({ atk: 0, def: 0, speed: 0, special: 0, spdef: 0 });
  const pStages = pTeamInit.map(emptyStages);
  const eStages = eTeamInit.map(emptyStages);
  let lastAttack = null; // for replaying animation on Electric second hit

  function addLogEntry(msg, cls = '') {
    if (!logEl) return;
    const div = document.createElement('div');
    div.className = `log-entry ${cls}`;
    div.textContent = msg;
    logEl.appendChild(div);
    logEl.scrollTop = logEl.scrollHeight;
  }

  function sleep(ms) {
    return new Promise(r => setTimeout(r, ms / battleSpeedMultiplier));
  }

  let i = 0;
  while (i < detailedLog.length) {
    const event = detailedLog[i];

    // Batch consecutive trait_trigger events into one canvas pass so they animate simultaneously
    if (event.type === 'trait_trigger') {
      const canvas = document.getElementById('battle-anim-canvas');
      const batchTriggers = [];
      if (canvas) {
        resizeCanvasIfNeeded(canvas);
        canvas.style.display = 'block';
        const ctx = canvas.getContext('2d');
        const allParticles = [];
        const flyingEls = [];
        while (i < detailedLog.length && detailedLog[i].type === 'trait_trigger') {
          const e = detailedLog[i++];
          batchTriggers.push(e);
          const sideId = e.side === 'player' ? 'player-side' : 'enemy-side';
          const el = document.querySelector(`#${sideId} .battle-pokemon[data-idx="${e.idx}"]`);
          if (el) {
            const rect = el.getBoundingClientRect();
            const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
            const above  = { x: center.x, y: center.y - 30 };
            allParticles.push(...buildParticles(e.traitType.toLowerCase(), center, above));
            if (e.traitType === 'Flying') flyingEls.push(el);
          }
        }
        if (allParticles.length > 0) await runParticleCanvas(canvas, ctx, allParticles, 400);
        else canvas.style.display = 'none';
        for (const el of flyingEls) {
          const popup = document.createElement('div');
          popup.className = 'crit-popup';
          popup.textContent = getText('popup_dodge');
          el.appendChild(popup);
          setTimeout(() => popup.remove(), 800);
        }
      } else {
        while (i < detailedLog.length && detailedLog[i].type === 'trait_trigger') {
          batchTriggers.push(detailedLog[i++]);
        }
      }

      // Electric second hit: replay the full attack + consume its effect event
      const hasElectric = batchTriggers.some(e => e.traitType === 'Electric');
      if (hasElectric && lastAttack) {
        const effectEvt = detailedLog[i];
        if (effectEvt?.type === 'effect') {
          const { attackerEl, targetEl, moveType, moveName, isSpecial } = lastAttack;
          if (attackerEl) attackerEl.classList.add('attacking');
          if (attackerEl && targetEl)
            await playAttackAnimation(moveType, attackerEl, targetEl, isSpecial, moveName);
          if (attackerEl) attackerEl.classList.remove('attacking');
          if (targetEl) {
            const hitClass = `hit-${moveType.toLowerCase()}`;
            targetEl.classList.add(hitClass);
            const targetHpTrack = effectEvt.side === 'player' ? pHp : eHp;
            const prev = targetHpTrack[effectEvt.idx]?.current ?? effectEvt.hpAfter;
            await animateHpBar(targetEl, prev, effectEvt.hpAfter, targetHpTrack[effectEvt.idx]?.max ?? effectEvt.hpAfter);
            if (targetHpTrack[effectEvt.idx]) targetHpTrack[effectEvt.idx].current = effectEvt.hpAfter;
            await sleep(300);
            targetEl.classList.remove(hitClass);
          }
          i++; // consume the Electric effect event
        }
      }

      await sleep(80);
      continue;
    }

    if (event.type === 'attack') {
      const attackerSideId = event.side === 'player' ? 'player-side' : 'enemy-side';
      const targetSideId = event.side === 'player' ? 'enemy-side' : 'player-side';
      const attackerEl = document.querySelector(`#${attackerSideId} .battle-pokemon[data-idx="${event.attackerIdx}"]`);
      const targetEl = document.querySelector(`#${targetSideId} .battle-pokemon[data-idx="${event.targetIdx}"]`);
      lastAttack = { attackerEl, targetEl, moveType: event.moveType, moveName: event.moveName, isSpecial: event.isSpecial };
      const hitClass = `hit-${event.moveType.toLowerCase()}`;

      if (attackerEl) attackerEl.classList.add('attacking');
      if (event.moveName === 'Struggle' && attackerEl) {
        const popup = document.createElement('div');
        popup.className = 'crit-popup';
        popup.textContent = getText('popup_struggle');
        attackerEl.appendChild(popup);
        setTimeout(() => popup.remove(), 900);
      }

      // Play canvas projectile animation concurrently with attacker pulse
      if (attackerEl && targetEl) {
        await playAttackAnimation(event.moveType, attackerEl, targetEl, event.isSpecial, event.moveName);
      } else {
        await sleep(220);
      }
      if (attackerEl) attackerEl.classList.remove('attacking');

      // Look ahead: check if a Flying dodge immediately follows this attack
      const nextEvt = detailedLog[i + 1];
      const flyingDodge = nextEvt?.type === 'trait_trigger'
        && nextEvt.traitType === 'Flying'
        && nextEvt.side === event.targetSide
        && nextEvt.idx === event.targetIdx;

      if (flyingDodge && targetEl) {
        // Show dodge animation instead of hit ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â consume trait_trigger and effect events
        const canvas = document.getElementById('battle-anim-canvas');
        if (canvas) {
          resizeCanvasIfNeeded(canvas);
          canvas.style.display = 'block';
          const ctx = canvas.getContext('2d');
          const rect = targetEl.getBoundingClientRect();
          const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
          const above  = { x: center.x, y: center.y - 30 };
          await runParticleCanvas(canvas, ctx, buildParticles('flying', center, above), 400);
        }
        const dodgePopup = document.createElement('div');
        dodgePopup.className = 'crit-popup';
        dodgePopup.textContent = getText('popup_dodge');
        targetEl.appendChild(dodgePopup);
        setTimeout(() => dodgePopup.remove(), 800);
        i++; // consume trait_trigger
        // Consume the following effect event and sync HP tracker (HP unchanged)
        if (detailedLog[i + 1]?.type === 'effect' && detailedLog[i + 1].idx === event.targetIdx) {
          const targetHpTrack = event.targetSide === 'player' ? pHp : eHp;
          targetHpTrack[event.targetIdx].current = detailedLog[i + 1].hpAfter;
          i++; // consume effect
        }
      } else {
        // Normal hit flash + HP bar animation
        if (targetEl) targetEl.classList.add(hitClass);
        if (event.crit && targetEl) {
          targetEl.classList.add('crit-flash');
          const popup = document.createElement('div');
          popup.className = 'crit-popup';
          popup.textContent = getText('popup_critical');
          targetEl.appendChild(popup);
          setTimeout(() => popup.remove(), 800);
        }
        if (targetEl) {
          const targetHpTrack = event.side === 'player' ? eHp : pHp;
          const prev = targetHpTrack[event.targetIdx].current;
          await animateHpBar(targetEl, prev, event.targetHpAfter, targetHpTrack[event.targetIdx].max);
          targetHpTrack[event.targetIdx].current = event.targetHpAfter;
        }
        await sleep(300);
        if (targetEl) targetEl.classList.remove(hitClass);
        if (targetEl) targetEl.classList.remove('crit-flash');
      }

      let effText = '';
      if (event.typeEff >= 2) effText = ' Super effective!';
      else if (event.typeEff === 0) effText = ' No effect!';
      else if (event.typeEff < 1) effText = ' Not very effective...';
      if (event.crit) effText += ' Critical hit!';

      const sideLabel = event.side === 'player' ? '' : '(enemy) ';
      addLogEntry(
        `${sideLabel}${event.attackerName} used ${event.moveName} ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ ${event.targetName} took ${event.damage} dmg.${effText}`,
        event.side === 'player' ? 'log-player' : 'log-enemy'
      );

      await sleep(100);

    } else if (event.type === 'confusion') {
      const sideId = event.side === 'player' ? 'player-side' : 'enemy-side';
      const el = document.querySelector(`#${sideId} .battle-pokemon[data-idx="${event.idx}"]`);
      if (el) {
        el.classList.add('attacking');
        await sleep(180);
        el.classList.remove('attacking');
        el.classList.add('hit-normal');
        const popup = document.createElement('div');
        popup.className = 'crit-popup';
        popup.textContent = getText('popup_confusion');
        el.appendChild(popup);
        setTimeout(() => popup.remove(), 900);
        const teamHp = event.side === 'player' ? pHp : eHp;
        const prev = teamHp[event.idx].current;
        await animateHpBar(el, prev, event.hpAfter, teamHp[event.idx].max);
        teamHp[event.idx].current = event.hpAfter;
        await sleep(300);
        el.classList.remove('hit-normal');
      }

    } else if (event.type === 'effect') {
      const sideId = event.side === 'player' ? 'player-side' : 'enemy-side';
      const el = document.querySelector(`#${sideId} .battle-pokemon[data-idx="${event.idx}"]`);
      const teamHp = event.side === 'player' ? pHp : eHp;
      const prev = teamHp[event.idx].current;
      if (event.newMaxHp) teamHp[event.idx].max = event.newMaxHp;

      if (el) {
        await animateHpBar(el, prev, event.hpAfter, teamHp[event.idx].max);
      }
      teamHp[event.idx].current = event.hpAfter;

      addLogEntry(event.reason, 'log-item');
      await sleep(100);

    } else if (event.type === 'faint') {
      const sideId = event.side === 'player' ? 'player-side' : 'enemy-side';
      const el = document.querySelector(`#${sideId} .battle-pokemon[data-idx="${event.idx}"]`);
      if (el) { el.classList.add('fainted'); el.classList.remove('active-pokemon'); }
      addLogEntry(`${event.name} fainted!`, 'log-faint');
      await sleep(300);

    } else if (event.type === 'send_out') {
      const sideId = event.side === 'player' ? 'player-side' : 'enemy-side';
      // Clear previous active highlight on this side
      document.querySelectorAll(`#${sideId} .battle-pokemon`).forEach(el => el.classList.remove('active-pokemon'));
      const el = document.querySelector(`#${sideId} .battle-pokemon[data-idx="${event.idx}"]`);
      if (el) el.classList.add('active-pokemon');
      addLogEntry(getText('sent_out', { name: event.name }), event.side === 'player' ? 'log-player' : 'log-enemy');
      await sleep(250);

    } else if (event.type === 'transform') {
      const sideId = event.side === 'player' ? 'player-side' : 'enemy-side';
      const el = document.querySelector(`#${sideId} .battle-pokemon[data-idx="${event.idx}"]`);
      if (el) {
        // Flash white, swap sprite, update name display
        el.classList.add('hit-normal');
        await sleep(200);
        const imgEl = el.querySelector('.battle-sprite');
        if (imgEl) imgEl.src = event.spriteUrl;
        const nameEl = el.querySelector('.battle-poke-name');
        if (nameEl) nameEl.textContent = `${event.name} Lv${pTeamInit[event.idx].level}`;
        el.classList.remove('hit-normal');
      }
      addLogEntry(`${event.name} transformed into ${event.intoName}!`, 'log-player');
      await sleep(400);

    } else if (event.type === 'stat_change') {
      const sideId = event.side === 'player' ? 'player-side' : 'enemy-side';
      const el = document.querySelector(`#${sideId} .battle-pokemon[data-idx="${event.idx}"]`);
      const stagesArr = event.side === 'player' ? pStages : eStages;
      if (stagesArr[event.idx]) {
        stagesArr[event.idx][event.stat] = event.newStage;
      }
      if (el) {
        animateStatChange(el, event.stat, event.change); // fire and forget
        updateBattleStages(el, stagesArr[event.idx] ?? {});
      }

    } else if (event.type === 'status_apply') {
      const sideId = event.side === 'player' ? 'player-side' : 'enemy-side';
      const el = document.querySelector(`#${sideId} .battle-pokemon[data-idx="${event.idx}"]`);
      if (el) {
        const icon  = event.status === 'poison' ? 'ÃƒÂ¢Ã‹Å“Ã‚Â ' : 'ÃƒÂ¢Ã‚ÂÃ¢â‚¬Å¾';
        const color = event.status === 'poison' ? '#a040a0' : '#7ecff0';
        showStatusBadge(el, icon, color, event.status);
      }
      await sleep(200);

    } else if (event.type === 'status_tick') {
      const sideId = event.side === 'player' ? 'player-side' : 'enemy-side';
      const el = document.querySelector(`#${sideId} .battle-pokemon[data-idx="${event.idx}"]`);
      const teamHp = event.side === 'player' ? pHp : eHp;

      if (event.status === 'poison' && el) {
        el.classList.add('hit-poison');
        const prev = teamHp[event.idx]?.current ?? event.hpAfter - event.hpChange;
        await animateHpBar(el, prev, event.hpAfter, teamHp[event.idx]?.max ?? event.hpAfter + 1);
        if (teamHp[event.idx]) teamHp[event.idx].current = event.hpAfter;
        el.classList.remove('hit-poison');
      } else if (event.status === 'freeze_thaw' && el) {
        removeStatusBadge(el, 'freeze');
        const popup = document.createElement('div');
        popup.className = 'crit-popup';
        popup.textContent = getText('popup_thawed');
        el.appendChild(popup);
        setTimeout(() => popup.remove(), 800);
      } else if (event.status === 'freeze_skip' && el) {
        el.classList.add('frozen-flash');
        await sleep(300);
        el.classList.remove('frozen-flash');
      }
      await sleep(100);

    } else if (event.type === 'result') {
      addLogEntry(
        event.playerWon ? '--- Victory! ---' : '--- Defeat! ---',
        event.playerWon ? 'log-win' : 'log-lose'
      );
    }
    i++;
  }
}

// ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Stat change arrow animation ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬

function updateBattleStages(pokemonEl, stages) {
  const el = pokemonEl.querySelector('.battle-stages');
  if (!el) return;
  const labels = { atk: 'ATK', def: 'DEF', speed: 'SPD', special: 'SP.A', spdef: 'SP.D' };
  el.innerHTML = Object.entries(stages)
    .filter(([, v]) => v !== 0)
    .map(([stat, v]) => {
      const cls = v > 0 ? 'stage-up' : 'stage-down';
      const arrow = v > 0 ? 'ÃƒÂ¢Ã¢â‚¬â€œÃ‚Â²' : 'ÃƒÂ¢Ã¢â‚¬â€œÃ‚Â¼';
      return `<span class="battle-stage-badge ${cls}">${labels[stat] ?? stat} ${arrow}${Math.abs(v)}</span>`;
    }).join('');
}

function animateStatChange(pokemonEl, stat, change) {
  return new Promise(resolve => {
    const isUp = change > 0;
    const color = isUp ? '#5af055' : '#f05545';
    const arrow = isUp ? 'ÃƒÂ¢Ã¢â‚¬â€œÃ‚Â²' : 'ÃƒÂ¢Ã¢â‚¬â€œÃ‚Â¼';
    const statLabels = { atk: 'ATK', def: 'DEF', speed: 'SPD', special: 'SP.A', spdef: 'SP.D' };

    const popup = document.createElement('div');
    popup.className = 'stat-change-popup';
    popup.style.color = color;
    popup.textContent = `${arrow} ${statLabels[stat] || stat}`;
    pokemonEl.appendChild(popup);

    setTimeout(() => { popup.remove(); resolve(); }, 700 / battleSpeedMultiplier);
  });
}

// ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Trait trigger burst animation (reuses existing particle system) ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬

async function playTraitTriggerAnimation(traitType, pokemonEl) {
  const canvas = document.getElementById('battle-anim-canvas');
  if (!canvas) return;
  resizeCanvasIfNeeded(canvas);
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  const rect = pokemonEl.getBoundingClientRect();
  const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  const above  = { x: center.x, y: center.y - 30 };
  const particles = buildParticles(traitType.toLowerCase(), center, above);
  await runParticleCanvas(canvas, ctx, particles, 400);
}

// ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Status badge helpers ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬

function showStatusBadge(pokemonEl, icon, color, statusId) {
  removeStatusBadge(pokemonEl, statusId);
  const badge = document.createElement('div');
  badge.className = 'status-badge';
  badge.dataset.statusId = statusId;
  badge.style.background = color;
  badge.textContent = icon;
  pokemonEl.appendChild(badge);
}

function removeStatusBadge(pokemonEl, statusId) {
  pokemonEl.querySelector(`.status-badge[data-status-id="${statusId}"]`)?.remove();
}

// ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Endless mode UI ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬

// ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Endless map trait panel ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬

function renderEndlessTraitPanel(team) {
  const panel = document.getElementById('endless-trait-panel');
  if (!panel) return;

  const data = getTraitDisplayData(team);
  if (data.length === 0) {
    panel.style.display = 'none';
    return;
  }

  panel.style.display = '';
  panel.innerHTML = `<div class="hud-label">TRAITS</div>` + data.map(({ type, count, tier, nextThreshold, description, active }) => {
    const displayCount = Math.min(count, nextThreshold);
    const pct = (displayCount / nextThreshold) * 100;
    const tierLabel = tier > 0 ? ` T${tier}` : '';
    return `<div class="trait-row${active ? '' : ' trait-row-inactive'}">
      <div class="trait-row-header">
        <span class="type-badge type-${type.toLowerCase()}" style="font-size:7px;padding:1px 4px;">${type}</span>
        <span class="trait-count">${count}/${nextThreshold}${tierLabel}</span>
      </div>
      <div class="trait-progress-bar">
        <div class="trait-progress-fill type-${type.toLowerCase()}" style="width:${pct}%"></div>
      </div>
      <div class="trait-desc">${description}</div>
    </div>`;
  }).join('');

  // Set description data and tap-to-tooltip handler (mobile: desc is hidden in the strip)
  const rows = panel.querySelectorAll('.trait-row');
  data.forEach(({ description, nextDescription, tier }, i) => {
    if (!rows[i]) return;
    rows[i].dataset.desc = description;
    if (nextDescription) rows[i].dataset.nextDesc = `Next (T${tier + 1}): ${nextDescription}`;
  });
  panel.onclick = (e) => {
    const row = e.target.closest('.trait-row');
    if (!row || !row.dataset.desc) return;
    _traitTooltip.show(row.dataset.desc, row.getBoundingClientRect());
    e.stopPropagation();
  };
  rows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      if (row.dataset.nextDesc) _traitTooltip.show(row.dataset.nextDesc, row.getBoundingClientRect());
    });
    row.addEventListener('mouseleave', () => _traitTooltip.hide());
  });
}

function hideEndlessTraitPanel() {
  const panel = document.getElementById('endless-trait-panel');
  if (panel) panel.style.display = 'none';
}

function renderEndlessRegionPanel(region, currentMapIndex) {
  const panel = document.getElementById('endless-region-panel');
  if (!panel || !region) return;
  panel.style.display = '';

  const header = `<div class="hud-label">${getStageName(region.stageNum)} R${region.regionNum}</div>`;
  const rows = region.trainers.map((trainer, i) => {
    const type = trainer.archetype?.type || null;
    const name = trainer.archetype?.name || '???';
    const isBigBoss = i === 2;
    const isDone = i < currentMapIndex;
    const isCurrent = i === currentMapIndex;

    const types = type ? type.split('/') : [];
    const typeBadges = types.map(t =>
      `<span class="type-badge type-${t.trim().toLowerCase()}" style="font-size:6px;padding:1px 3px;margin-right:1px;">${t.trim()}</span>`
    ).join('');

    const statusIcon = isDone ? 'ÃƒÂ¢Ã…â€œÃ¢â‚¬Å“ ' : isCurrent ? 'ÃƒÂ¢Ã¢â‚¬â€œÃ‚Â¶ ' : '';
    const rowClass = isDone ? 'region-stage-row done'
      : isCurrent ? 'region-stage-row current'
      : isBigBoss ? 'region-stage-row boss'
      : 'region-stage-row';
    const speciesAttr = (trainer.speciesIds || []).join(',');

    return `<div class="${rowClass}" data-species="${speciesAttr}" style="cursor:default;">
      <span style="display:inline-flex;gap:1px;align-items:center;">${typeBadges}</span>
      <span class="region-stage-name">${statusIcon}${isBigBoss ? 'ÃƒÂ¢Ã‹Å“Ã¢â‚¬Â¦ ' : ''}${name}</span>
      <span class="region-stage-level">Lv${trainer.level}</span>
    </div>`;
  }).join('');

  panel.innerHTML = header + `<div class="region-stage-list">${rows}</div>`;
  attachBossTeamTooltips(panel);
}

function attachBossTeamTooltips(container) {
  const BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  let tip = document.getElementById('boss-team-tip');
  if (!tip) {
    tip = document.createElement('div');
    tip.id = 'boss-team-tip';
    tip.style.cssText = 'position:fixed;z-index:9999;pointer-events:none;display:none;gap:2px;align-items:center;padding:4px 6px;border:2px solid #4a4438;background:#181410;';
    document.body.appendChild(tip);
  }

  container.querySelectorAll('[data-species]').forEach(row => {
    const ids = (row.dataset.species || '').split(',').filter(Boolean);
    if (!ids.length) return;
    row.addEventListener('mouseenter', () => {
      tip.innerHTML = ids.map(id =>
        `<img src="${BASE}${id}.png" style="width:32px;height:32px;image-rendering:pixelated;" onerror="this.style.display='none'">`
      ).join('');
      tip.style.display = 'flex';
      const r = row.getBoundingClientRect();
      tip.style.left = (r.right + 6) + 'px';
      tip.style.top = r.top + 'px';
    });
    row.addEventListener('mouseleave', () => { tip.style.display = 'none'; });
  });
}


function renderBattleTraitBars(playerTiers, enemyTiers) {
  _fillTraitBarEl('player-battle-traits', playerTiers || {});
  _fillTraitBarEl('enemy-battle-traits',  enemyTiers  || {});
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const p = document.getElementById('player-battle-traits');
    const e = document.getElementById('enemy-battle-traits');
    if (!p || !e) return;
    p.style.minHeight = '';
    e.style.minHeight = '';
    const maxH = Math.max(p.offsetHeight, e.offsetHeight);
    if (maxH > 0) { p.style.minHeight = maxH + 'px'; e.style.minHeight = maxH + 'px'; }
  }));
}

function _fillTraitBarEl(elId, tiers) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = '';
  for (const [type, tier] of Object.entries(tiers)) {
    if (!tier) continue;
    const badge = document.createElement('span');
    badge.className = `trait-badge type-badge type-${type.toLowerCase()}`;
    badge.textContent = `${type} T${tier}`;
    el.appendChild(badge);
  }
}

function clearBattleTraitBars() {
  const p = document.getElementById('player-battle-traits');
  const e = document.getElementById('enemy-battle-traits');
  if (p) p.innerHTML = '';
  if (e) e.innerHTML = '';
}

function renderStageComplete(stageNum, team, onContinue) {
  const screen = document.getElementById('endless-stage-complete');
  if (!screen) return;
  const msgEl    = document.getElementById('stage-complete-msg');
  const unlockEl = document.getElementById('stage-complete-unlock');
  const teamEl   = document.getElementById('stage-complete-team');
  const btnEl    = document.getElementById('btn-stage-continue');
  const shareEl  = document.getElementById('btn-stage-share');
  if (msgEl)    msgEl.textContent    = `${getStageName(stageNum)} Complete!`;
  if (unlockEl) unlockEl.textContent = `${getStageName(stageNum + 1)} unlocked!`;
  if (teamEl)   teamEl.innerHTML     = team.map(p => renderPokemonCard(p, false, false)).join('');
  if (btnEl)    btnEl.onclick        = onContinue;
  if (shareEl)  shareEl.onclick      = () => shareEndlessRun(stageNum, team);
  showScreen('endless-stage-complete');
}

// Show a brief notification banner on the map screen
function showMapNotification(msg) {
  const mapScreen = document.getElementById('map-screen');
  if (!mapScreen) return;

  const existing = mapScreen.querySelector('.map-notification');
  if (existing) existing.remove();

  const div = document.createElement('div');
  div.className = 'map-notification';
  div.textContent = msg;
  mapScreen.appendChild(div);

  setTimeout(() => {
    div.style.opacity = '0';
    setTimeout(() => div.remove(), 500);
  }, 1800);
}

// Render trainer sprites on both battle sides
function renderTrainerIcons(gender, enemyName = null, showPlayer = true) {
  const playerEl = document.getElementById('player-trainer-icon');
  const enemyEl  = document.getElementById('enemy-trainer-icon');
  const labelEl  = document.getElementById('enemy-side-label');
  if (playerEl) {
    if (showPlayer) playerEl.innerHTML = TRAINER_SVG[gender] || TRAINER_SVG.boy;
    else playerEl.innerHTML = '';
  }
  if (enemyEl) {
    if (enemyName) {
      enemyEl.innerHTML = getTrainerImgHtml(enemyName);
      // Mirror to face player
      const img = enemyEl.querySelector('img');
      if (img) img.style.transform = 'scaleX(-1)';
    } else {
      enemyEl.innerHTML = ''; // Wild battle ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â no enemy trainer portrait
    }
  }
  if (labelEl) labelEl.textContent = getText('enemy_label');
}

// Play the classic white-flash evolution animation
async function playEvoAnimation(pokemon, evoData) {
  const overlay  = document.getElementById('evo-overlay');
  const msgEl    = document.getElementById('evo-msg');
  const spriteEl = document.getElementById('evo-sprite');
  if (!overlay) return;

  const newSpriteUrl = pokemon.isShiny
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${evoData.into}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoData.into}.png`;
  const oldSpriteUrl = pokemon.spriteUrl || '';
  const displayName  = getPokemonDisplayName(pokemon);

  msgEl.textContent = getText('evo_what', { name: displayName });
  spriteEl.src = oldSpriteUrl;
  spriteEl.style.filter = 'brightness(0) invert(1)'; // white silhouette
  overlay.style.background = '#111';
  overlay.style.display = 'flex';

  let skipped = false;
  const skipResolve = new Promise(r => {
    overlay.onclick = () => { skipped = true; r(); };
  });
  const sleep = ms => skipped ? Promise.resolve() : Promise.race([new Promise(r => setTimeout(r, ms)), skipResolve]);

  // Alternate between old and new silhouette, slow ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ fast (like the GB games)
  const delays = [600, 600, 500, 500, 400, 350, 280, 200, 150, 110, 80, 60, 50, 40, 40, 35];
  for (const d of delays) {
    if (skipped) break;
    spriteEl.src = (spriteEl.src.endsWith(oldSpriteUrl) || spriteEl.src === oldSpriteUrl)
      ? newSpriteUrl : oldSpriteUrl;
    await sleep(d);
  }

  // End on new sprite ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â single white flash to reveal
  spriteEl.src = newSpriteUrl;
  overlay.style.background = '#fff';
  await sleep(120);
  overlay.style.background = '#111';
  spriteEl.style.filter = ''; // show in full color

  msgEl.textContent = getText('evo_into', { name: displayName, into: evoData.name });
  await sleep(2000);

  overlay.style.display = 'none';
  overlay.style.background = '#000';
  overlay.onclick = null;
  spriteEl.style.filter = '';
}

// Show branching evolution choice and return the chosen evoData
function showBranchingChoice(pokemon, choices) {
  return new Promise(resolve => {
    const overlay  = document.getElementById('eevee-choice-overlay');
    const choicesEl = document.getElementById('eevee-choices');
    const titleEl   = document.getElementById('evo-choice-title');
    if (titleEl) titleEl.innerHTML = getText('evo_choose', { name: getPokemonDisplayName(pokemon) });
    choicesEl.innerHTML = '';

    for (const evoData of choices) {
      const spriteUrl = pokemon.isShiny
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${evoData.into}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoData.into}.png`;

      const card = document.createElement('div');
      card.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;' +
        'border:2px solid #555;border-radius:8px;padding:12px 16px;background:#1a1a1a;' +
        'transition:border-color 0.15s,background 0.15s;';
      card.onmouseenter = () => { card.style.borderColor = '#fff'; card.style.background = '#2a2a2a'; };
      card.onmouseleave = () => { card.style.borderColor = '#555'; card.style.background = '#1a1a1a'; };

      const img = document.createElement('img');
      img.src = spriteUrl;
      img.style.cssText = 'width:72px;height:72px;image-rendering:pixelated;';

      const nameEl = document.createElement('div');
      nameEl.textContent = evoData.name;
      nameEl.style.cssText = "font-family:'Press Start 2P',monospace;font-size:8px;color:#fff;";

      const typeEl = document.createElement('div');
      typeEl.textContent = evoData.types.join('/');
      typeEl.style.cssText = "font-family:'Press Start 2P',monospace;font-size:7px;color:#aaa;";

      card.append(img, nameEl, typeEl);
      card.onclick = () => {
        overlay.style.display = 'none';
        resolve(evoData);
      };
      choicesEl.appendChild(card);
    }

    overlay.style.display = 'flex';
  });
}

// Check team for pending evolutions after a won battle and play animations
let _evolveInProgress = false;
async function checkAndEvolveTeam() {
  if (_evolveInProgress) return;
  _evolveInProgress = true;
  try {
  const skipAnim = getSettings().autoSkipEvolve;
  for (const pokemon of state.team) {
    const wasFainted = pokemon.currentHp <= 0;

    let evo;
    const branchingChoices = BRANCHING_EVOLUTIONS[pokemon.speciesId];
    if (branchingChoices) {
      if (pokemon.level < branchingChoices[0].level) continue;
      evo = await showBranchingChoice(pokemon, branchingChoices);
    } else {
      evo = EVOLUTIONS[pokemon.speciesId];
      if (!evo || pokemon.level < evo.level) continue;
      if (pokemon.speciesId === evo.into) continue;
    }

    if (!skipAnim) await playEvoAnimation(pokemon, evo);

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
      pokemon.currentHp = wasFainted ? 0 : Math.max(1, Math.floor(oldHpRatio * newMax));
    } else if (!pokemon.nickname) {
      pokemon.name = evo.name;
    }

    const normalUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.speciesId}.png`;
    markPokedexCaught(pokemon.speciesId, pokemon.name, pokemon.types, normalUrl, pokemon.localizedNames);
    if (pokemon.isShiny) markShinyDexCaught(pokemon.speciesId, pokemon.name, pokemon.types, pokemon.spriteUrl, pokemon.localizedNames);
    checkDexAchievements();
    renderTeamBar(state.team);
    saveRun();
  }
  } finally {
    _evolveInProgress = false;
  }
}

// Animate level-up events returned by applyLevelGain
async function animateLevelUp(levelUps) {
  const pEl = document.getElementById('player-side');
  if (!pEl || levelUps.length === 0) return;
  const sleep = ms => new Promise(r => setTimeout(r, ms / battleSpeedMultiplier));

  await Promise.all(levelUps.map(async ({ idx, pokemon, newLevel, preHp }) => {
    const el = pEl.querySelector(`.battle-pokemon[data-idx="${idx}"]`);
    if (!el) return;

    // Animate HP bar filling up (alive pokemon only)
    if (pokemon.currentHp > 0 && pokemon.currentHp > preHp) {
      await animateHpBar(el, preHp, pokemon.currentHp, pokemon.maxHp, 400);
    }

    // Golden glow + floating "Lv X!" text
    el.classList.add('level-up');
    const lvText = document.createElement('div');
    lvText.className = 'level-up-text';
    lvText.textContent = `Lv ${newLevel}!`;
    el.appendChild(lvText);

    await sleep(900);
    el.classList.remove('level-up');
    lvText.remove();

    // Update name/level label after animation
    const nameEl = el.querySelector('.battle-poke-name');
    if (nameEl) nameEl.textContent = `${getPokemonDisplayName(pokemon)} Lv${newLevel}`;
  }));
}

// Legacy: animate battle log line by line (kept for fallback)

// ---- Achievement Toast ----

let _toastQueue = [];
let _toastRunning = false;

// Bug trait level-up banner ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â shows each leveled PokÃƒÆ’Ã‚Â©mon's sprite + new level
function showBugLevelUpBanner(leveled, duration = 1500) {
  // leveled: array of { name, spriteUrl, level }
  const banner = document.createElement('div');
  banner.style.cssText = [
    'position:fixed', 'top:56px', 'left:50%', 'transform:translateX(-50%)',
    'z-index:200', 'display:flex', 'flex-direction:column', 'align-items:center',
    'gap:4px', 'pointer-events:none', 'opacity:0', 'transition:opacity 0.25s',
  ].join(';');

  const label = document.createElement('div');
  label.style.cssText = 'font-family:"Press Start 2P",monospace;font-size:7px;color:#a8d848;text-shadow:1px 1px 0 #000,0 0 8px #78b820;letter-spacing:1px;margin-bottom:2px;';
  label.textContent = getText('bug_trait_level_up');
  banner.appendChild(label);

  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:6px;align-items:flex-end;';
  for (const p of leveled) {
    const card = document.createElement('div');
    card.style.cssText = 'display:flex;flex-direction:column;align-items:center;background:rgba(0,0,0,0.75);border:2px solid #a8d848;padding:4px 6px;';
    card.innerHTML = `
      <img src="${p.spriteUrl}" style="width:40px;height:40px;image-rendering:pixelated;" onerror="this.style.display='none'">
      <span style="font-family:'Press Start 2P',monospace;font-size:6px;color:#fff;margin-top:2px;">${p.name}</span>
      <span style="font-family:'Press Start 2P',monospace;font-size:7px;color:#a8d848;">Lv ${p.level}</span>`;
    row.appendChild(card);
  }
  banner.appendChild(row);
  document.body.appendChild(banner);

  requestAnimationFrame(() => { banner.style.opacity = '1'; });
  setTimeout(() => {
    banner.style.opacity = '0';
    setTimeout(() => banner.remove(), 300);
  }, duration);
}

function showAchievementToast(ach) {
  _toastQueue.push(ach);
  if (!_toastRunning) _runToastQueue();
}

function _runToastQueue() {
  if (_toastQueue.length === 0) { _toastRunning = false; return; }
  _toastRunning = true;
  const ach = _toastQueue.shift();

  const toast = document.createElement('div');
  toast.className = 'achievement-toast';
  toast.innerHTML = `<span class="ach-toast-icon">${ach.icon}</span>
    <div class="ach-toast-text">
      <div class="ach-toast-label">${getText('achievement_unlocked')}</div>
      <div class="ach-toast-name">${ach.name}</div>
    </div>`;
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => toast.classList.add('visible'));

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => { toast.remove(); _runToastQueue(); }, 400);
  }, 3000);
}

// ---- Settings Modal ----

function applyDarkMode() {
  document.body.classList.remove('dark-mode');
}

function openSettingsModal() {
  const existing = document.getElementById('settings-modal');
  if (existing) { existing.remove(); return; }

  const modal = document.createElement('div');
  modal.id = 'settings-modal';

  function row(label, key, disabled = false) {
    const s = getSettings();
    return `<label class="settings-row${disabled ? ' settings-row-disabled' : ''}">
      <span class="settings-label">${label}</span>
      <input type="checkbox" class="settings-checkbox" data-key="${key}" ${s[key] ? 'checked' : ''} ${disabled ? 'disabled' : ''}>
    </label>`;
  }

  function render() {
    const s = getSettings();
    const cloud = typeof getRogueMonCloudStatus === 'function'
      ? getRogueMonCloudStatus()
      : { enabled: false, signedIn: false, username: '', serverUrl: '' };
    const cloudStatus = !cloud.enabled
      ? 'Cloud disabled'
      : cloud.signedIn
        ? `Connected as ${cloud.username}`
        : `Server ready: ${cloud.serverUrl}`;
    modal.innerHTML = `
      <div class="settings-modal-box">
        <div class="settings-modal-header">
          <span>Settings</span>
          <button class="ach-modal-close" onclick="document.getElementById('settings-modal').remove()">&times;</button>
        </div>
        <div class="settings-section-title">Auto-Skip</div>
        ${row('Regular Trainers', 'autoSkipBattles', s.autoSkipAllBattles)}
        ${row('All Fights', 'autoSkipAllBattles')}
        ${row('Evolutions', 'autoSkipEvolve')}
        <div class="settings-section-title">Gameplay</div>
        ${row('Easy Mode', 'easyMode')}
        <div class="settings-section-title">RogueMon Cloud</div>
        <div class="settings-cloud-panel">
          <div class="settings-cloud-panel-copy">${cloudStatus}</div>
          <button id="btn-roguemon-cloud" class="btn-secondary settings-cloud-launch">Open Cloud Settings</button>
        </div>
      </div>`;

    modal.querySelectorAll('.settings-checkbox').forEach(cb => {
      cb.onchange = () => {
        const s2 = getSettings();
        s2[cb.dataset.key] = cb.checked;
        saveSettings(s2);
        applyDarkMode();
        updateEasyModeIndicator();
        render();
      };
    });

    modal.querySelector('#btn-roguemon-cloud')?.addEventListener('click', () => {
      if (typeof openRogueMonCloudModal === 'function') openRogueMonCloudModal();
    });

  }

  render();
  document.body.appendChild(modal);
}

function renderEndlessCollectionCards(entries = [], emptyLabel = 'No recruits yet.') {
  if (!entries.length) {
    return `<div class="collection-empty">${emptyLabel}</div>`;
  }

  return entries.map(entry => `
    <div class="collection-card rarity-${entry.rarity || 'common'}">
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
    </div>
  `).join('');
}

function openShopModal() {
  const existing = document.getElementById('shop-modal');
  if (existing) { existing.remove(); return; }

  const modal = document.createElement('div');
  modal.id = 'shop-modal';
  modal.className = 'shop-modal-overlay';

  const close = () => modal.remove();
  const buyPack = async (packId) => {
    const result = await openEndlessBoosterPack(packId);
    if (!result.ok) {
      alert(result.error || 'This pack could not be opened right now.');
      return;
    }
    render(result);
    refreshTitleMetaBar();
  };

  const render = (latestResult = null) => {
    const meta = getMetaProgress();
    const coins = getCoinBalance();
    const collection = getEndlessCollection();

    modal.innerHTML = `
      <div class="shop-modal-box">
        <div class="shop-modal-header">
          <div>
            <h2>Booster Shop</h2>
            <p>Spend story coins on Endless recruits before the mode opens up.</p>
          </div>
          <button class="ach-modal-close" id="shop-modal-close">&times;</button>
        </div>
        <div class="shop-modal-body">
          <div class="shop-balance-row">
            <div class="shop-balance-chip">
              <span class="shop-balance-label">Coins</span>
              <strong>${coins}</strong>
            </div>
            <div class="shop-balance-chip">
              <span class="shop-balance-label">Roster</span>
              <strong>${collection.length}</strong>
            </div>
            <div class="shop-balance-chip">
              <span class="shop-balance-label">Boosters Opened</span>
              <strong>${meta.openedBoosters || 0}</strong>
            </div>
          </div>

          <div class="shop-status-copy">
            Each pack opens 3 Pokemon for your future Endless roster. Higher tiers cost more, but the pulls get stronger and come with bigger level and stat bonuses.
          </div>

          <div class="shop-section-title">Packs</div>
          <div class="shop-pack-grid">
            ${ENDLESS_BOOSTER_PACKS.map(pack => `
              <div class="shop-pack-card rarity-${pack.id}" style="--pack-accent:${pack.accent}">
                <div class="shop-pack-rarity">${pack.id.toUpperCase()}</div>
                <div class="shop-pack-name">${pack.label}</div>
                <div class="shop-pack-cost">${pack.cost} Coins</div>
                <div class="shop-pack-copy">${pack.description}</div>
                <div class="shop-pack-stats">
                  <span>BST ${pack.minBst}-${pack.maxBst}</span>
                  <span>+${pack.levelBonusMin} to +${pack.levelBonusMax} Lv</span>
                  <span>+${pack.statBonusMin} to +${pack.statBonusMax} Stats</span>
                </div>
                <button class="btn-secondary shop-pack-btn" data-pack-id="${pack.id}" ${coins < pack.cost ? 'disabled' : ''}>
                  Open Pack
                </button>
              </div>
            `).join('')}
          </div>

          <div class="shop-two-col">
            <div class="shop-side-panel">
              <div class="shop-section-title">Latest Pulls</div>
              <div class="collection-grid collection-grid--recent">
                ${latestResult?.pulls?.length
                  ? renderEndlessCollectionCards(latestResult.pulls, 'No pulls yet.')
                  : `<div class="collection-empty">Open a booster pack to see your newest recruits here.</div>`}
              </div>
            </div>
            <div class="shop-side-panel">
              <div class="shop-section-title">Roster Preview</div>
              <div class="collection-grid collection-grid--roster">
                ${renderEndlessCollectionCards(collection.slice(0, 8), 'Your Endless roster is empty.')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.querySelector('#shop-modal-close')?.addEventListener('click', close);
    modal.querySelectorAll('.shop-pack-btn').forEach(btn => {
      btn.addEventListener('click', () => buyPack(btn.dataset.packId));
    });
  };

  render();
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.body.appendChild(modal);
}

function openCoinFlipModal() {
  const existing = document.getElementById('coin-flip-modal');
  if (existing) { existing.remove(); return; }

  const modal = document.createElement('div');
  modal.id = 'coin-flip-modal';
  modal.className = 'shop-modal-overlay';

  const close = () => modal.remove();
  const play = (bet) => {
    const result = playCoinFlip(bet);
    if (!result.ok) {
      alert(result.error || 'That bet could not be played.');
      return;
    }
    render(result);
    refreshTitleMetaBar();
  };

  const render = (latestResult = null) => {
    const meta = getMetaProgress();
    const coins = getCoinBalance();
    const history = meta.gambleHistory || [];
    const latestMarkup = latestResult
      ? `<div class="coinflip-result ${latestResult.outcome}">
          <strong>${latestResult.outcome === 'loss' ? 'Miss' : latestResult.outcome === 'jackpot' ? 'Jackpot' : 'Double Up'}</strong>
          <span>${latestResult.net >= 0 ? '+' : ''}${latestResult.net} coins</span>
        </div>`
      : `<div class="coinflip-result idle"><strong>Heads or tails vibes</strong><span>45% double, 7% triple, otherwise the house keeps the bet.</span></div>`;

    modal.innerHTML = `
      <div class="shop-modal-box gamble-modal-box">
        <div class="shop-modal-header">
          <div>
            <h2>Coin Flip</h2>
            <p>Take a risk with story coins and stack up your future Endless budget.</p>
          </div>
          <button class="ach-modal-close" id="coin-flip-close">&times;</button>
        </div>
        <div class="shop-modal-body">
          <div class="shop-balance-row">
            <div class="shop-balance-chip">
              <span class="shop-balance-label">Coins</span>
              <strong>${coins}</strong>
            </div>
            <div class="shop-balance-chip">
              <span class="shop-balance-label">Double Chance</span>
              <strong>45%</strong>
            </div>
            <div class="shop-balance-chip">
              <span class="shop-balance-label">Jackpot Chance</span>
              <strong>7%</strong>
            </div>
          </div>

          ${latestMarkup}

          <div class="shop-section-title">Pick a Bet</div>
          <div class="gamble-bet-grid">
            ${[10, 25, 50, 100, 200].map(bet => `
              <button class="gamble-bet-btn" data-bet="${bet}" ${coins < bet ? 'disabled' : ''}>
                ${bet} Coins
              </button>
            `).join('')}
          </div>

          <div class="shop-section-title">Recent Results</div>
          <div class="gamble-history-list">
            ${history.length ? history.map(entry => `
              <div class="gamble-history-row ${entry.outcome}">
                <span>${entry.outcome === 'loss' ? 'Loss' : entry.outcome === 'jackpot' ? 'Jackpot' : 'Double'}</span>
                <span>Bet ${entry.bet}</span>
                <span>${entry.net >= 0 ? '+' : ''}${entry.net}</span>
              </div>
            `).join('') : '<div class="collection-empty">No coin flips yet.</div>'}
          </div>
        </div>
      </div>
    `;

    modal.querySelector('#coin-flip-close')?.addEventListener('click', close);
    modal.querySelectorAll('.gamble-bet-btn').forEach(btn => {
      btn.addEventListener('click', () => play(Number(btn.dataset.bet)));
    });
  };

  render();
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.body.appendChild(modal);
}

// ---- Achievements Modal ----

function openAchievementsModal() {
  const existing = document.getElementById('achievements-modal');
  if (existing) { existing.remove(); return; }

  const unlocked = getUnlockedAchievements();
  const storyRegionGroups = [
    { label: 'Kanto', ids: ['gym_0', 'gym_1', 'gym_2', 'gym_3', 'gym_4', 'gym_5', 'gym_6', 'gym_7', 'elite_four', 'starter_1', 'starter_4', 'starter_7', 'story_region_1', 'story_trio_1'] },
    { label: 'Johto', ids: ['starter_152', 'starter_155', 'starter_158', 'story_region_2', 'story_trio_2'] },
    { label: 'Hoenn', ids: ['starter_252', 'starter_255', 'starter_258', 'story_region_3', 'story_trio_3'] },
    { label: 'Sinnoh', ids: ['starter_387', 'starter_390', 'starter_393', 'story_region_4', 'story_trio_4'] },
    { label: 'Einall', ids: ['starter_495', 'starter_498', 'starter_501', 'story_region_5', 'story_trio_5'] },
    { label: 'Kalos', ids: ['starter_650', 'starter_653', 'starter_656', 'story_region_6', 'story_trio_6'] },
    { label: 'Run Challenges', ids: ['solo_run', 'nuzlocke_win', 'three_birds', 'no_pokecenter', 'no_items', 'type_quartet', 'all_shiny_win', 'back_to_back', 'back_3_back', 'elite_10', 'elite_100'] },
  ];

  const towerRegionGroups = [
    { label: 'Kanto', ids: ['endless_stage_1', 'starters_stage_1'] },
    { label: 'Johto', ids: ['endless_stage_2', 'starters_stage_2'] },
    { label: 'Hoenn', ids: ['endless_stage_3', 'starters_stage_3'] },
    { label: 'Sinnoh', ids: ['endless_stage_4', 'starters_stage_4'] },
    { label: 'Einall', ids: ['endless_stage_5', 'starters_stage_5'] },
  ];

  const generalGroups = [
    { label: 'Pokedex', ids: ['pokedex_complete', 'pokedex_gen2', 'pokedex_gen3', 'pokedex_gen4', 'pokedex_gen5', 'pokedex_gen6'] },
    { label: 'Shiny Dex', ids: ['shinydex_complete', 'shinydex_all', 'shinydex_100', 'shinydex_200', 'shinydex_300', 'shinydex_400', 'shinydex_500', 'shinydex_600'] },
    { label: 'Training', ids: ['max_stats_1', 'max_stats_2', 'max_stats_3', 'max_stats_4', 'max_stats_all'] },
  ];

  const achievementById = new Map(ACHIEVEMENTS.map(a => [a.id, a]));
  const regionHeaderMeta = {
    Kanto: { icon: 'ui/region-achievements/kanto.svg', accent: 'kanto' },
    Johto: { icon: 'ui/region-achievements/johto.svg', accent: 'johto' },
    Hoenn: { icon: 'ui/region-achievements/hoenn.svg', accent: 'hoenn' },
    Sinnoh: { icon: 'ui/region-achievements/sinnoh.svg', accent: 'sinnoh' },
    Einall: { icon: 'ui/region-achievements/einall.svg', accent: 'einall' },
    Kalos: { accent: 'kalos' },
    'Run Challenges': { accent: 'challenges' },
    Pokedex: { accent: 'pokedex' },
    'Shiny Dex': { accent: 'shiny' },
    Training: { accent: 'training' },
  };

  const safeAchievementIcon = (achievement) => {
    const raw = String(achievement?.icon || '');
    if (!/[ÃƒÃ°]/.test(raw)) return raw || '&#9733;';
    if (achievement.id.startsWith('gym_')) return '&#9733;';
    if (achievement.id === 'elite_four' || achievement.id.startsWith('story_region_')) return '&#9819;';
    if (achievement.id.startsWith('starter_') || achievement.id.startsWith('story_trio_')) return '&#9670;';
    if (achievement.id.startsWith('pokedex')) return '&#9672;';
    if (achievement.id.startsWith('shiny')) return '&#10022;';
    if (achievement.id.startsWith('max_stats')) return '&#9650;';
    if (achievement.id.startsWith('endless') || achievement.id.startsWith('starters_stage_')) return '&#11042;';
    return '&#9733;';
  };

  const renderCards = (items) => items.map(a => {
    const done = unlocked.has(a.id);
    return `<div class="ach-card ${done ? 'unlocked' : 'locked'}">
      <div class="ach-icon">${safeAchievementIcon(a)}</div>
      <div class="ach-name">${a.name}</div>
      <div class="ach-desc">${a.desc}</div>
    </div>`;
  }).join('');

  const renderGroup = ({ label, ids }) => {
    const items = ids.map(id => achievementById.get(id)).filter(Boolean);
    if (!items.length) return '';
    const done = items.filter(a => unlocked.has(a.id)).length;
    const meta = regionHeaderMeta[label] || {};
    const iconHtml = meta.icon
      ? `<img class="ach-region-icon" src="${meta.icon}" alt="${label} icon">`
      : `<span class="ach-region-dot"></span>`;
    const accentClass = meta.accent ? `ach-subsection--${meta.accent}` : '';
    return `
      <section class="ach-subsection ${accentClass}">
        <div class="ach-subsection-header">
          <span class="ach-subsection-title">${iconHtml}<span>${label}</span></span>
          <span class="ach-category-count">${done}/${items.length}</span>
        </div>
        <div class="ach-modal-grid">${renderCards(items)}</div>
      </section>`;
  };

  const topSections = [
    { label: 'Story Runs', groups: storyRegionGroups },
    { label: 'Endless Mode', groups: towerRegionGroups },
    { label: 'Collection & Growth', groups: generalGroups },
  ];

  const categorySections = topSections.map(section => {
    const items = section.groups.flatMap(group => group.ids.map(id => achievementById.get(id)).filter(Boolean));
    const done = items.filter(a => unlocked.has(a.id)).length;
    const content = section.groups.map(renderGroup).join('');
    return `
      <div class="ach-category-section">
        <div class="ach-category-header">${section.label} <span class="ach-category-count">${done}/${items.length}</span></div>
        <div class="ach-section-body">${content}</div>
      </div>`;
  }).join('');

  const modal = document.createElement('div');
  modal.id = 'achievements-modal';
  modal.innerHTML = `
    <div class="ach-modal-box">
      <div class="ach-modal-header">
        <span>Achievements (${unlocked.size}/${ACHIEVEMENTS.length})</span>
        <button class="ach-modal-close" onclick="document.getElementById('achievements-modal').remove()">&times;</button>
      </div>
      <div class="ach-modal-body">${categorySections}</div>
    </div>`;
  document.body.appendChild(modal);
}

// ---- Pokedex Modal ----

function openPokedexModal(initialTab = 'normal') {
  const existing = document.getElementById('pokedex-modal');
  if (existing) { existing.remove(); return; }

  const BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  const DEX_GENERATIONS = [
    { key: 'gen1', label: getText('gen_1'), min: 1, max: 151 },
    { key: 'gen2', label: getText('gen_2'), min: 152, max: 251 },
    { key: 'gen3', label: getText('gen_3'), min: 252, max: 386 },
    { key: 'gen4', label: getText('gen_4'), min: 387, max: 493 },
    { key: 'gen5', label: getText('gen_5'), min: 494, max: 649 },
    { key: 'gen6', label: getText('gen_6'), min: 650, max: 721 },
    { key: 'gen7', label: getText('gen_7'), min: 722, max: 809 },
    { key: 'gen8', label: getText('gen_8'), min: 810, max: 905 },
    { key: 'gen9', label: getText('gen_9'), min: 906, max: 1025 },
  ];
  const NATIONAL_DEX_TOTAL = DEX_GENERATIONS[DEX_GENERATIONS.length - 1].max;
  const GEN_HEADERS = Object.fromEntries(DEX_GENERATIONS.map(gen => [gen.min, gen.label]));
  const GEN_RANGES = Object.fromEntries(DEX_GENERATIONS.map(gen => [gen.min, [gen.min, gen.max]]));

  function buildGenCounts(dex, isCaughtFn) {
    const counts = {};
    for (const [startId, [min, max]] of Object.entries(GEN_RANGES)) {
      let caught = 0;
      for (let id = min; id <= max; id++) { if (isCaughtFn(dex, id)) caught++; }
      counts[startId] = { caught, total: max - min + 1 };
    }
    return counts;
  }

  function buildNormalGrid() {
    const dex = getPokedex();
    const caughtCount = Array.from({length: NATIONAL_DEX_TOTAL}, (_, i) => i + 1).filter(id => dex[id]?.caught).length;
    const genCounts = buildGenCounts(dex, (d, id) => !!d[id]?.caught);
    const grid = Array.from({ length: NATIONAL_DEX_TOTAL }, (_, i) => {
      const id = i + 1;
      const gc = genCounts[id];
      const header = GEN_HEADERS[id] ? `<div class="dex-gen-header">${GEN_HEADERS[id]}<span class="gen-count">${gc.caught}/${gc.total}</span></div>` : '';
      const e = dex[id];
      const motionClass = `dex-sprite-motion-${(id % 4) + 1}`;
      if (e) {
        const displayName = getPokemonLocalizedName({ id, ...e });
        const types = (e.types || []).map(t =>
          `<span class="type-badge type-${t.toLowerCase()}">${t}</span>`).join('');
        return header + `<div class="dex-card dex-caught">
          <div class="dex-num">#${String(id).padStart(3,'0')}</div>
          <img src="${BASE + id + '.png'}" alt="${displayName}" class="dex-sprite ${motionClass}"
               onerror="this.src='';this.style.display='none'">
          <div class="dex-name">${displayName}</div>
          <div class="dex-types">${types}</div>
        </div>`;
      }
      return header + `<div class="dex-card dex-unknown">
        <div class="dex-num">#${String(id).padStart(3,'0')}</div>
        <img src="${BASE + id + '.png'}" alt="???" class="dex-sprite dex-silhouette ${motionClass}"
             onerror="this.src='';this.style.display='none'">
        <div class="dex-name dex-unknown-name">???</div>
      </div>`;
    }).join('');
    return { grid, count: caughtCount };
  }

  function buildShinyGrid() {
    const dex = getShinyDex();
    const BASE_SHINY = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/';
    const count = Array.from({length: NATIONAL_DEX_TOTAL}, (_, i) => i + 1).filter(id => dex[id]).length;
    const genCounts = buildGenCounts(dex, (d, id) => !!d[id]);
    const grid = Array.from({ length: NATIONAL_DEX_TOTAL }, (_, i) => {
      const id = i + 1;
      const gc = genCounts[id];
      const header = GEN_HEADERS[id] ? `<div class="dex-gen-header">${GEN_HEADERS[id]}<span class="gen-count">${gc.caught}/${gc.total}</span></div>` : '';
      const e = dex[id];
      const motionClass = `dex-sprite-motion-${(id % 4) + 1}`;
      if (e) {
        const displayName = getPokemonLocalizedName({ id, ...e });
        const types = (e.types || []).map(t =>
          `<span class="type-badge type-${t.toLowerCase()}">${t}</span>`).join('');
        return header + `<div class="dex-card shiny-dex-card">
          <div class="dex-num">#${String(id).padStart(3,'0')}</div>
          <img src="${e.shinySpriteUrl || BASE_SHINY + id + '.png'}" alt="${displayName}" class="dex-sprite ${motionClass}"
               onerror="this.src='';this.style.display='none'">
          <div class="dex-name">${displayName}</div>
          <div class="dex-types">${types}</div>
          <div class="shiny-star">&#9733;</div>
        </div>`;
      }
      return header + `<div class="dex-card dex-unknown">
        <div class="dex-num">#${String(id).padStart(3,'0')}</div>
        <img src="${BASE_SHINY + id + '.png'}" alt="???" class="dex-sprite dex-silhouette ${motionClass}"
             onerror="this.src='';this.style.display='none'">
        <div class="dex-name dex-unknown-name">???</div>
      </div>`;
    }).join('');
    return { grid, count };
  }

  const modal = document.createElement('div');
  modal.id = 'pokedex-modal';
  const progressGroupsHtml = DEX_GENERATIONS.map(gen => {
    const total = gen.max - gen.min + 1;
    return `
            <div class="dex-progress-group">
              <div class="dex-progress-meta">
                <div class="dex-progress-title">${gen.label}</div>
                <span id="dex-progress-label-${gen.key}" class="dex-progress-label">0/${total} - 0%</span>
              </div>
              <div class="dex-progress-track">
                <div id="dex-progress-bar-${gen.key}" class="dex-progress-bar dex-progress-bar-${gen.key}"></div>
              </div>
            </div>`;
  }).join('');

  modal.innerHTML = `
    <div class="dex-modal-box">
      <div class="dex-modal-header">
        <div class="dex-tabs">
          <button class="dex-tab" data-tab="normal">Pokedex</button>
          <button class="dex-tab" data-tab="shiny">Shiny</button>
        </div>
        <span class="dex-counts" id="dex-count-label"></span>
        <button class="ach-modal-close" onclick="document.getElementById('pokedex-modal').remove()">&times;</button>
      </div>
      <div class="dex-progress-area">
        <div class="dex-progress-row dex-progress-row-top">
          <div class="dex-progress-grid">
            ${progressGroupsHtml}
            <div class="dex-progress-group dex-progress-group-wide">
              <div class="dex-progress-meta">
                <div class="dex-progress-title">${getText('all_gens_label')}</div>
                <span id="dex-progress-label-all" class="dex-progress-label">0/${NATIONAL_DEX_TOTAL} - 0%</span>
              </div>
              <div class="dex-progress-track">
                <div id="dex-progress-bar-all" class="dex-progress-bar dex-progress-bar-all"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dex-grid" id="dex-grid-content"></div>
    </div>`;

  function switchTab(tab) {
    modal.querySelectorAll('.dex-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    modal.querySelector('.dex-modal-box').classList.toggle('shiny-dex-box', tab === 'shiny');
    const { grid, count } = tab === 'shiny' ? buildShinyGrid() : buildNormalGrid();
    document.getElementById('dex-grid-content').innerHTML = grid;

    const isShiny = tab === 'shiny';
    const dexData = isShiny ? getShinyDex() : getPokedex();
    const isCaught = id => isShiny ? !!dexData[id] : !!dexData[id]?.caught;

    const allTotal = NATIONAL_DEX_TOTAL;
    const allPct = Math.floor(count / allTotal * 100);
    const progressConfigs = DEX_GENERATIONS;

    document.getElementById('dex-count-label').textContent = getText('pokedex_count', {count, total: allTotal});
    progressConfigs.forEach(({ key, min, max }) => {
      const total = max - min + 1;
      const caught = Array.from({ length: total }, (_, i) => min + i).filter(isCaught).length;
      const pct = Math.floor(caught / total * 100);
      const bar = document.getElementById(`dex-progress-bar-${key}`);
      const label = document.getElementById(`dex-progress-label-${key}`);
      if (bar) {
        bar.style.width = `${pct}%`;
        bar.dataset.percent = `${pct}%`;
      }
      if (label) {
        label.textContent = `${caught}/${total} - ${pct}%`;
      }
    });
    document.getElementById('dex-progress-bar-all').style.width = `${allPct}%`;
    document.getElementById('dex-progress-bar-all').dataset.percent = `${allPct}%`;
    document.getElementById('dex-progress-label-all').textContent = `${count}/${allTotal} - ${allPct}%`;

    const shinyNote = isShiny && count === 0
      ? `<div class="dex-empty-note">${getText('dex_empty_shiny')}</div>`
      : '';
    document.getElementById('dex-grid-content').innerHTML = ((isShiny && count === 0)
      ? `<div class="dex-empty-note">${getText('dex_empty_shiny')}</div>`
      : '') + grid;

    const charmEl = document.getElementById('dex-charm-icon');
    if (hasShinyCharm()) {
      charmEl.style.borderColor = 'gold';
      charmEl.style.boxShadow = '0 0 6px gold';
      charmEl.title = getText('shiny_charm_active');
    }

    modal.onclick = e => {
      const card = e.target.closest('.dex-card');
      if (!card) return;
      const id = parseInt(card.querySelector('.dex-num')?.textContent.replace('#', ''), 10);
      if (!id) return;
      const entry = (tab === 'shiny' ? getShinyDex() : getPokedex())[id];
      const cached = getCached(`pkrl_poke_${id}`);
      const name = getPokemonLocalizedName({
        id,
        name: entry?.name || cached?.name || '???',
        defaultName: entry?.defaultName || cached?.defaultName,
        localizedNames: entry?.localizedNames || cached?.localizedNames,
      });
      const types = entry?.types || cached?.types || [];
      const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      const shinySpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;
      openDexDetailModal(id, name, spriteUrl, shinySpriteUrl, types);
    };
  }

  modal.querySelectorAll('.dex-tab').forEach(b =>
    b.addEventListener('click', () => switchTab(b.dataset.tab)));
  document.body.appendChild(modal);
  switchTab(initialTab);
}

function openShinyDexModal() { openPokedexModal('shiny'); }

function openDexDetailModal(speciesId, name, spriteUrl, shinySpriteUrl, types) {
  const existing = document.getElementById('dex-detail-modal');
  if (existing) existing.remove();

  const numStr = `#${String(speciesId).padStart(3, '0')}`;
  const typeBadges = types.map(t =>
    `<span class="type-badge type-${t.toLowerCase()}">${t}</span>`
  ).join('');

  const isGen1 = speciesId <= 151;
  const cachedPoke = getCached(`pkrl_poke_${speciesId}`);
  const { regularMaps, towerFloors } = getPokemonLocations(speciesId, cachedPoke?.bst);
  const locTags = isGen1
    ? (regularMaps.length
        ? regularMaps.map(m => `<span class="dex-detail-loc-tag">${m}</span>`).join('')
        : `<span class="dex-detail-loc-none">${getText('dex_not_found_regular')}</span>`)
    : `<span class="dex-detail-loc-none">${getText('dex_not_available')}</span>`;
  const needsFloorAsync = !isGen1 && !cachedPoke?.bst;
  const floorTags = towerFloors.length
    ? towerFloors.map(f => `<span class="dex-detail-loc-tag dex-detail-loc-tag--tower">${f}</span>`).join('')
    : needsFloorAsync
      ? `<span class="dex-detail-loc-none">${getText('loading')}</span>`
      : `<span class="dex-detail-loc-none">${getText('dex_not_found_battle_tower')}</span>`;

  const modal = document.createElement('div');
  modal.id = 'dex-detail-modal';
  modal.innerHTML = `
    <div class="dex-detail-box">
      <div class="dex-detail-header">
        <span class="dex-detail-title">${numStr} ${name}</span>
        <button class="ach-modal-close" id="dex-detail-close">&times;</button>
      </div>
      <div class="dex-detail-body">
        <div class="dex-detail-top">
          <div class="dex-detail-sprite-wrap">
            <img id="dex-detail-sprite" class="dex-detail-sprite" src="${spriteUrl}" alt="${name}">
            <button class="dex-detail-shiny-btn" id="dex-detail-shiny-btn" title="${getText('dex_toggle_shiny')}">Shiny</button>
          </div>
          <div class="dex-detail-info">
            <div class="dex-detail-name">${name}</div>
            <div class="dex-detail-num">${numStr}</div>
            <div class="dex-detail-types">${typeBadges}</div>
            <div class="dex-detail-flavor" id="dex-detail-flavor">${getText('loading')}</div>
          </div>
        </div>
        <div class="dex-detail-section-title">${getText('dex_evolution_chain')}</div>
        <div class="dex-detail-evo" id="dex-detail-evo">${getText('loading')}</div>
        <div class="dex-detail-section-title">${getText('dex_where_to_find')}</div>
        <div class="dex-detail-locations">
          <div class="dex-detail-loc-group">
            <span class="dex-detail-loc-label">${getText('dex_regular_label')}</span>
            <div class="dex-detail-loc-tags">${locTags}</div>
          </div>
          <div class="dex-detail-loc-group">
            <span class="dex-detail-loc-label">${getText('dex_battle_tower_label')}</span>
            <div class="dex-detail-loc-tags" id="dex-detail-floors">${floorTags}</div>
          </div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const spriteEl = document.getElementById('dex-detail-sprite');
  const shinyBtn = document.getElementById('dex-detail-shiny-btn');
  let showingShiny = false;
  shinyBtn.addEventListener('click', e => {
    e.stopPropagation();
    showingShiny = !showingShiny;
    spriteEl.src = showingShiny ? shinySpriteUrl : spriteUrl;
    shinyBtn.classList.toggle('dex-detail-shiny-btn--active', showingShiny);
  });

  const close = () => { const m = document.getElementById('dex-detail-modal'); if (m) m.remove(); };
  document.getElementById('dex-detail-close').addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });

  // If name/types or tower floors need API data, fetch once and fill in both
  if (name === '???') {
    fetchPokemonById(speciesId).then(poke => {
      if (!document.getElementById('dex-detail-modal') || !poke) return;
      const displayName = getPokemonLocalizedName(poke);
      document.querySelector('#dex-detail-modal .dex-detail-title').textContent = `${numStr} ${displayName}`;
      document.querySelector('#dex-detail-modal .dex-detail-name').textContent = displayName;
      if (poke.types?.length) {
        document.querySelector('#dex-detail-modal .dex-detail-types').innerHTML =
          poke.types.map(t => `<span class="type-badge type-${t.toLowerCase()}">${t}</span>`).join('');
      }
      if (needsFloorAsync) {
        const floorsEl = document.getElementById('dex-detail-floors');
        if (floorsEl) {
          const { towerFloors: tf } = getPokemonLocations(speciesId, poke.bst);
          floorsEl.innerHTML = tf.length
            ? tf.map(f => `<span class="dex-detail-loc-tag dex-detail-loc-tag--tower">${f}</span>`).join('')
            : `<span class="dex-detail-loc-none">${getText('dex_not_found_battle_tower')}</span>`;
        }
      }
    });
  } else if (needsFloorAsync) {
    fetchPokemonById(speciesId).then(poke => {
      if (!poke) return;
      const floorsEl = document.getElementById('dex-detail-floors');
      if (floorsEl) {
        const { towerFloors: tf } = getPokemonLocations(speciesId, poke.bst);
        floorsEl.innerHTML = tf.length
          ? tf.map(f => `<span class="dex-detail-loc-tag dex-detail-loc-tag--tower">${f}</span>`).join('')
          : `<span class="dex-detail-loc-none">${getText('dex_not_found_battle_tower')}</span>`;
      }
    });
  }

  // Async: flavor text
  fetchPokemonSpecies(speciesId).then(data => {
    const el = document.getElementById('dex-detail-flavor');
    if (el) el.textContent = data.flavorText || '-';
  });

  // Async: evolution chain
  (async () => {
    const { chain } = buildEvoChain(speciesId);

    async function renderEvoNode(node) {
      const poke = await fetchPokemonById(node.id);
      if (!document.getElementById('dex-detail-evo')) return null;
      const isCurrent = node.id === speciesId;

      const stage = document.createElement('div');
      stage.className = 'dex-evo-stage' + (isCurrent ? ' dex-evo-stage--current' : '');
      
      const img = document.createElement('img');
      img.className = 'dex-evo-sprite';
      img.src = poke?.spriteUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${node.id}.png`;
      img.alt = poke?.name || '';
      
      const nameEl = document.createElement('div');
      nameEl.className = 'dex-evo-name';
      nameEl.textContent = poke?.name || '';
      
      stage.appendChild(img);
      stage.appendChild(nameEl);

      if (node.evolvesInto.length > 0) {
        const levelEl = document.createElement('div');
        levelEl.className = 'dex-evo-level';
        levelEl.textContent = node.evolvesInto[0].level ? `Lv.${node.evolvesInto[0].level}` : 'Evolves';
        stage.appendChild(levelEl);
      }

      return stage;
    }

    const evoEl = document.getElementById('dex-detail-evo');
    if (!evoEl) return;
    
    // Flatten the evolution chain to simple list for grid layout
    const getAllStages = async (node, stages = []) => {
      stages.push(await renderEvoNode(node));
      for (const child of node.evolvesInto) {
        await getAllStages(child, stages);
      }
      return stages;
    };
    
    const stages = await getAllStages(chain);
    if (!document.getElementById('dex-detail-evo')) return;
    
    const container = document.getElementById('dex-detail-evo');
    container.innerHTML = '';
    stages.forEach(stage => container.appendChild(stage));
  })();
}

// ---- Patch Notes Modal ----

const PATCH_NOTES = [
  {
    version: '1.4.3',
    title: 'PokÃƒÆ’Ã‚Â©dex Update',
    date: '2026-04-30',
    sections: [
      {
        heading: 'New Features',
        entries: [
          'PokÃƒÆ’Ã‚Â©dex detail view ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â click any PokÃƒÆ’Ã‚Â©mon in the PokÃƒÆ’Ã‚Â©dex (caught or not) to see its sprite, types, PokÃƒÆ’Ã‚Â©dex flavor text, full evolution chain with levels, and where to find it in regular mode and Battle Tower',
          'Shiny toggle in the detail view ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â press ÃƒÂ¢Ã‹Å“Ã¢â‚¬Â¦ to preview the shiny sprite',
        ],
      },
      {
        heading: 'Bug Fixes',
        entries: [
          'Rerolled PokÃƒÆ’Ã‚Â©mon in catch nodes can now be shiny',
          'Catch nodes in Battle Tower now always show 3 options ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â when the team-duplicate filter reduced the pool below 3, the game now pulls from a lower-tier pool to fill the remaining slots',
          'Starting a new run no longer shows a stale "Continue Battle Tower" button when a previous Battle Tower save existed',
        ],
      },
    ],
  },
  {
    version: '1.4.2',
    title: 'Quality of Life Patch',
    date: '2026-04-28',
    sections: [
      {
        heading: 'New Features',
        entries: [
          'Share button on the win screen and Battle Tower stage clear screen ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â share your team to X/Twitter or via native share sheet',
          'Catch screen now shows a Great Ball badge on PokÃƒÆ’Ã‚Â©mon whose evo line is already in your Hall of Fame PC, replacing the PokÃƒÆ’Ã‚Â© Ball badge when applicable',
          'Professor Challenges: Battle Tower starter achievements renamed after each region\'s professor (Oak\'s, Elm\'s, Birch\'s, Rowan\'s, Juniper\'s Challenge) and now unlock by beating a stage with any one of the three regional starters',
        ],
      },
      {
        heading: 'Changes',
        entries: [
          'Eevee and all its evolutions now evolve at level 20',
          'Stat labels updated: Speed ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ SPD, Special Attack ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ SP.A, Special Defense ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ SP.D',
          'Shiny PokÃƒÆ’Ã‚Â© Ball badge in the catch screen now only appears when you own the shiny form specifically',
        ],
      },
      {
        heading: 'Bug Fixes',
        entries: [
          'Shiny PokÃƒÆ’Ã‚Â©mon no longer lose their shiny status after evolving',
        ],
      },
    ],
  },
  {
    version: '1.4.1',
    title: 'Bug Fix Patch',
    date: '2026-04-28',
    sections: [
      {
        heading: 'Bug Fixes',
        entries: [
          'Catch nodes now show the same PokÃƒÆ’Ã‚Â©mon after a page refresh ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â choices are saved when the node is first entered and restored on reload',
          'Ghost trait now correctly triggers on damage from all sources, not just direct attacks',
          'Shiny filter in the Hall of Fame PC now works correctly',
        ],
      },
    ],
  },
  {
    version: '1.4.0',
    title: 'Battle Tower Update',
    date: '2026-04-25',
    sections: [
      {
        heading: 'Battle Tower',
        entries: [
          'New endless mode ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â the Battle Tower challenges you with 5 stages across all regions',
          'Each stage unlocks after clearing the previous one and is named after its region: Kanto, Johto, Hoenn, Sinnoh, Unova',
          'Each stage has 3 regions, each with 3 battles ending in a named boss trainer',
          'Stage select shows region artwork as button backgrounds',
          'Requires at least one Hall of Fame entry to unlock',
          'Stage progress is now derived from your Hall of Fame history ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â cannot be spoofed by local storage',
        ],
      },
      {
        heading: 'Stage 5: Unova',
        entries: [
          'New stage featuring Gen 1ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“5 PokÃƒÆ’Ã‚Â©mon',
          'Boss trainers: N, Ghetsis, Iris, and Benga',
          'Ghetsis brings a Dragon-only team with Dragon trait at T10',
          'Iris and Benga have unique hand-crafted teams with no duplicates',
          'Dragon trait extended to Tier 10',
        ],
      },
      {
        heading: 'Trait System',
        entries: [
          'Collect type traits by fielding PokÃƒÆ’Ã‚Â©mon of matching types ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â traits level up as you progress',
          'Each trait tier unlocks a passive effect that applies in every battle',
          'Trait progress panel shown on the map screen and as a preview under each catch choice',
          'Bug trait: your PokÃƒÆ’Ã‚Â©mon gain a level after every battle ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â shown with a level-up banner',
          'Dark trait: enemies have a chance to hurt themselves in confusion each turn',
          'Stat buffs persist across evolutions and are shared by the full evo line',
          'Stat stage cap set at Ãƒâ€šÃ‚Â±10 stages; +10 = 4ÃƒÆ’Ã¢â‚¬â€ multiplier',
          'Boss trainers have their own trait loadouts that appear in battle',
          'Trait type badges show your current progress on hover',
        ],
      },
      {
        heading: 'Metaprogression',
        entries: [
          'Stat buffs persist between runs ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â each buff adds +10% to a stat permanently for that PokÃƒÆ’Ã‚Â©mon\'s evo line',
          'After clearing a stage you allocate buff points across HP, ATK, DEF, SPD, SP.ATK, and SP.DEF',
          'Each stat can be buffed up to 10 points (+100%); total points available scales with stage number (up to 50)',
          'Buffs are shared across the full evolution line ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â buff Charmander, Charizard gets it too',
          'Stars on the starter select screen show how many stats have been buffed on each PokÃƒÆ’Ã‚Â©mon',
        ],
      },
      {
        heading: 'New Achievements',
        entries: [
          'ÃƒÂ°Ã…Â¸Ã…â€™Ã¢â€šÂ¬ Kanto Champion ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â clear Stage 1 (defeat Ash)',
          'ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â  Johto Champion ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â clear Stage 2 (defeat Lance)',
          'ÃƒÂ¢Ã…Â¡Ã¢â‚¬ÂÃƒÂ¯Ã‚Â¸Ã‚Â Hoenn Champion ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â clear Stage 3 (defeat Steven Stone)',
          'ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Sinnoh Champion ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â clear Stage 4 (defeat Cynthia)',
          'ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â¦ Unova Champion ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â clear Stage 5 (defeat N)',
          'ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¿ Kanto Trio ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â win a Stage 1 run starting with each of the three Kanto starters',
          'ÃƒÂ°Ã…Â¸Ã‚ÂÃ†â€™ Johto Trio ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â win a Stage 2 run starting with each of the three Johto starters',
          'ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â  Hoenn Trio ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â win a Stage 3 run starting with each of the three Hoenn starters',
          'ÃƒÂ¢Ã¢â‚¬ÂºÃ‚Â°ÃƒÂ¯Ã‚Â¸Ã‚Â Sinnoh Trio ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â win a Stage 4 run starting with each of the three Sinnoh starters',
          'ÃƒÂ°Ã…Â¸Ã…â€™Ã¢â€šÂ¬ Unova Trio ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â win a Stage 5 run starting with each of the three Unova starters',
          'ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€  First Peak ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â max out 1 stat on a single PokÃƒÆ’Ã‚Â©mon',
          'ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â  Double Peak ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â max out 2 stats on a single PokÃƒÆ’Ã‚Â©mon',
          'ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â Triple Peak ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â max out 3 stats',
          'ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Âª Quad Peak ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â max out 4 stats',
          'ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â¦ Perfect Specimen ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â max out all 6 stats on a single PokÃƒÆ’Ã‚Â©mon',
        ],
      },
      {
        heading: 'Hall of Fame',
        entries: [
          'Battle Tower wins are now labelled "Battle Tower: Kanto" etc. instead of "Endless Mode"',
          'HoF PC shows unique base PokÃƒÆ’Ã‚Â©mon count out of all catchable species',
        ],
      },
      {
        heading: 'Mobile Improvements',
        entries: [
          'Map screen now uses the correct viewport height on iOS Safari ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â no more content cut off by the address bar',
          'Team cards on the map screen are more compact (smaller sprites, less padding)',
          'Item bar shows icons only in a horizontal strip ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â no text labels',
          'Catch and item screens always show all 3 choices in a single row',
          'TEAM label removed from the map screen panel',
        ],
      },
      {
        heading: 'Desktop Improvements',
        entries: [
          'Map screen panels scale up with viewport width ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â larger screens show proportionally bigger UI',
        ],
      },
      {
        heading: 'Bug Fixes',
        entries: [
          'Catch node could show only 2 choices when evo-line deduplication was too aggressive ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â fixed by fetching a larger candidate pool',
          'Saving and reloading mid-run in the Battle Tower no longer lets you revisit past nodes and make different choices',
          'Steel trait now correctly reduces damage before applying it instead of healing it back afterward',
          'PokÃƒÆ’Ã‚Â©mon forced to use Struggle now show a Struggle! popup on their sprite',
          'Air Balloon and Sneasel evolution edge cases fixed',
        ],
      },
    ],
  },
  {
    version: '1.3.1',
    title: 'RogueMon Cloud & QoL Update',
    date: '2026-04-18',
    sections: [
      {
        heading: 'RogueMon Cloud',
        entries: [
          'Connect the game to your own RogueMon save server from Settings',
          'Progress can sync to your own backend after wins and important run updates',
          'A second device can load the same RogueMon account once it points to the same server',
        ],
      },
      {
        heading: 'Run Persistence',
        entries: [
          'Your run is now saved to local storage ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â closing the tab mid-run no longer loses progress',
          'Continue Run button appears on the title screen when a saved run exists',
          'Reloading during a fight brings you back to the same fight with the same encounter',
        ],
      },
      {
        heading: 'Seeded Randomness',
        entries: [
          'Each run now has a seed ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â encounters, map layout, and battle outcomes are fully deterministic',
          'Reloading during a fight produces identical crits, damage rolls, and PokÃƒÆ’Ã‚Â©mon choices',
        ],
      },
      {
        heading: 'Map & Mobile',
        entries: [
          'Visited nodes are now greyed out ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â your last visited node shows a ÃƒÂ¢Ã…â€œÃ¢â‚¬Å“',
          'Edges you have already travelled are visually darker than available paths',
          'Long press a node on mobile to see what it is before committing',
          'Node tooltips now correctly disappear when entering a battle on mobile',
          'Hovering over PokÃƒÆ’Ã‚Â©mon or nodes no longer triggers accidentally after a screen transition',
          'Team bar on mobile now uses a 3-column grid layout',
          'Team panel takes 2/3 width, item panel takes 1/3 on mobile',
          'Map header no longer shows the map name ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â badges display in a single row',
          'Random PokÃƒÆ’Ã‚Â©mon Center nodes removed ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â only the guaranteed one remains',
        ],
      },
      {
        heading: 'PokÃƒÆ’Ã‚Â©mon Reordering',
        entries: [
          'Team drag and drop now uses pointer events ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â feels smooth and precise on both desktop and mobile',
        ],
      },
      {
        heading: 'Bug Fixes',
        entries: [
          'You can no longer encounter a legendary already on your team',
          'Starters now correctly benefit from the Shiny Charm',
          'Traded PokÃƒÆ’Ã‚Â©mon can now be shiny',
          'Lucky Egg description corrected ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â it boosts XP after every battle, not just wild ones',
        ],
      },
    ],
  },
  {
    version: '1.3',
    title: 'Visual Rework & Achievements Update',
    date: '2026-04-17',
    sections: [
      {
        heading: 'Visual Rework',
        entries: [
          'New retro GBA-style light panel aesthetic across all cards, HUD boxes, and modals',
          'Pixel-art hard shadows on cards, HP bars, battle divs, and buttons',
          'Battle PokÃƒÆ’Ã‚Â©mon cells are taller with bigger sprites and a larger base platform',
          'All primary buttons redesigned to match the retro panel style',
          'Normal Mode button highlighted in blue, Nuzlocke in red',
          'Removed redundant "Defeated [Leader]" line from the badge screen',
          'Battle background now fills the full cell on mobile',
          'Gender selection is saved ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â you only need to pick once across all runs',
          'Settings button is now accessible from the main menu',
        ],
      },
      {
        heading: 'Settings Polish',
        entries: [
          'Removed the dark mode switch for a consistent branded experience',
          'Settings layout cleaned up to keep options easy to scan',
        ],
      },
      {
        heading: 'Attack Animations',
        entries: [
          'Fire: overhauled to a glowing fireball traveling to the target with an ember trail and impact explosion',
          'Fighting: red impact orb now travels from attacker to target before the burst',
          'Steel: silver metallic orb travels to the target before sparks fly on impact',
          'Hit flash brightness reduced across all types ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â less obnoxious on bright panels',
        ],
      },
      {
        heading: 'New Achievements',
        entries: [
          'ÃƒÂ°Ã…Â¸Ã‚Â¦Ã¢â‚¬Â¦ Bird Keeper ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â beat the game with all 3 legendary birds on your team',
          'ÃƒÂ°Ã…Â¸Ã‚ÂÃ†â€™ No Rest for the Wicked ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â beat the game without using a PokÃƒÆ’Ã‚Â©mon Center',
          'ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬â„¢ Minimalist ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â beat the game without picking up any items',
          'ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â£ Type Supremacy ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â beat the game with 4 of 6 PokÃƒÆ’Ã‚Â©mon sharing a type',
          'ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â« Shiny Squad ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â beat the game with a full team of shiny PokÃƒÆ’Ã‚Â©mon',
          'ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â On a Roll ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â beat the game two runs in a row',
        ],
      },
      {
        heading: 'Bug Fixes',
        entries: [
          'PokÃƒÆ’Ã‚Â©mon no longer skip evolution entirely when "Skip Evolutions" is on ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â only the animation is skipped',
          'PokÃƒÆ’Ã‚Â©mon obtained by trading are now correctly registered in the PokÃƒÆ’Ã‚Â©dex',
        ],
      },
    ],
  },
  {
    version: '1.2',
    title: 'Combat & Maps Update',
    date: '2026-04-02',
    sections: [
      {
        heading: 'Combat Pacing',
        entries: [
          'Skipping battle animations now speeds them up instead of jumping straight to the end',
          'Skip button greys out after pressing instead of disappearing',
          'Auto-skip setting hides the skip button entirely ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â no more greyed-out clutter',
          'Continue button is now available as soon as the level-up animation starts ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â click to fast-forward and auto-proceed',
          'All PokÃƒÆ’Ã‚Â©mon level up simultaneously instead of one at a time',
        ],
      },
      {
        heading: 'Difficulty',
        entries: [
          'Gym leaders Lt. Surge, Erika, and Koga now give their PokÃƒÆ’Ã‚Â©mon held items',
          'Lt. Surge: Pikachu ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Eviolite, Voltorb ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Magnet, Raichu ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Life Orb',
          'Erika: Tangela ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Leftovers, Victreebel ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Poison Barb, Vileplume ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Miracle Seed',
          'Koga: Koffing ÃƒÆ’Ã¢â‚¬â€ 2 ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Rocky Helmet, Muk ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Poison Barb, Weezing ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Leftovers',
        ],
      },
      {
        heading: 'Branching Paths',
        entries: [
          'Tons of overall improvements to branching paths',
          'The last content layer before each boss is now guaranteed to have a PokÃƒÆ’Ã‚Â©mon Center',
          'Added proper icons for nodes',
        ],
      },
      {
        heading: 'Misc',
        entries: [
          'Removed the map legend from the bottom of the screen',
        ],
      },
    ],
  },
  {
    version: '1.1',
    title: 'Items & Structure Update',
    date: '2026-03-11',
    sections: [
      {
        heading: 'New: Usable Items',
        entries: [
          'ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â  Max Revive ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â fully revives a fainted PokÃƒÆ’Ã‚Â©mon (only offered when someone is fainted)',
          'ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¬ Rare Candy ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â gives a PokÃƒÆ’Ã‚Â©mon +3 levels; triggers evolution if the threshold is reached',
          'ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â¸ Evolution Stone ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â force evolves any PokÃƒÆ’Ã‚Â©mon regardless of level (Eevee gets the choice picker)',
          'Usable items stack in the bag and are consumed on use',
        ],
      },
      {
        heading: 'New: Hall of Fame',
        entries: [
          'Every championship win now saves your winning team to the Hall of Fame',
          'View past winning teams from the title screen ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â sprites, levels, and nicknames preserved',
          'Hard mode wins are marked with ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã¢â€šÂ¬',
        ],
      },
      {
        heading: 'Enemy Items Rework',
        entries: [
          'Elite Four and Champion now use per-PokÃƒÆ’Ã‚Â©mon held items instead of shared trainer items',
          'Gary gives each of his PokÃƒÆ’Ã‚Â©mon the type-boosting item matching their primary type',
          'Gym leaders Sabrina, Blaine, and Giovanni also reworked to per-PokÃƒÆ’Ã‚Â©mon items',
          'Enemy held items now interact with all item effects the same way the player\'s do',
        ],
      },
      {
        heading: 'Map Generation',
        entries: [
          'Layer 1 of every map is now guaranteed to have at least one Catch node',
          'Layers 1, 3, and 5 are now guaranteed to have at least one Battle node',
          'The first Catch node on Map 1 always includes a Grass or Water type PokÃƒÆ’Ã‚Â©mon',
        ],
      },
    ],
  },
];

function openPatchNotesModal() {
  // Patch notes removed for custom version
  return;
}

// ---- Hall of Fame Modal ----

function openHallOfFameModal() {
  const existing = document.getElementById('hof-modal');
  if (existing) { existing.remove(); return; }

  const entries = getHallOfFame();

  const modal = document.createElement('div');
  modal.id = 'hof-modal';
  modal.className = 'hof-modal-overlay';

  const inferStoryRegionId = entry => {
    if (entry.storyRegionId) return entry.storyRegionId;
    const starterId = entry.starterSpeciesId || null;
    const teamIds = (entry.team || []).map(p => p.speciesId).filter(Boolean);
    const bestId = starterId || Math.max(...teamIds, 1);
    if (bestId <= 151) return 1;
    if (bestId <= 251) return 2;
    if (bestId <= 386) return 3;
    if (bestId <= 493) return 4;
    if (bestId <= 649) return 5;
    return null;
  };

  const storyGroups = Array.from({ length: 5 }, (_, idx) => {
    const regionId = idx + 1;
    const region = getStoryRegionConfig(regionId);
    return {
      id: regionId,
      label: getText(`gen_${regionId}`),
      name: region?.name || getText(`gen_${regionId}`),
      entries: [],
    };
  });
  const towerEntries = [];
  const legacyEntries = [];

  [...entries].reverse().forEach(entry => {
    if (entry.endless) {
      towerEntries.push(entry);
      return;
    }
    const regionId = inferStoryRegionId(entry);
    const group = storyGroups.find(g => g.id === regionId);
    if (group) group.entries.push(entry);
    else legacyEntries.push(entry);
  });

  const renderTeamCard = p => {
    const displayName = p.nickname || p.name;
    const itemHtml = p.heldItem
      ? `<div class="hof-entry-item">${itemIconHtml(p.heldItem, 12)}</div>`
      : '<div class="hof-entry-item hof-entry-item--empty"></div>';
    return `
      <div class="hof-poke-card">
        <div class="hof-poke-sprite-wrap">
          <img src="${p.spriteUrl}" class="hof-poke-sprite${p.isShiny ? ' hof-poke-sprite--shiny' : ''}" title="${displayName}">
        </div>
        <div class="hof-poke-name">${displayName}</div>
        <div class="hof-poke-level">Lv.${p.level}</div>
        ${itemHtml}
      </div>`;
  };

  const renderEntry = e => {
    const teamHtml = (e.team || []).map(renderTeamCard).join('');
    const title = e.endless
      ? getText('hof_battle_tower', { stage: getStageName(e.stageNumber) })
      : getText('hof_championship', { num: e.runNumber });
    return `
      <article class="hof-entry-card">
        <div class="hof-entry-header">
          <div class="hof-entry-title-row">
            <span class="hof-entry-title">${title}</span>
            ${e.hardMode ? '<span class="hof-entry-skull">HARD</span>' : ''}
          </div>
          <span class="hof-entry-date">${e.date}</span>
        </div>
        <div class="hof-entry-team">${teamHtml}</div>
      </article>`;
  };

  const renderSection = (title, subtitle, sectionEntries, extraClass = '') => `
    <section class="hof-section ${extraClass}">
      <div class="hof-section-header">
        <div>
          <div class="hof-section-title">${title}</div>
          <div class="hof-section-subtitle">${subtitle}</div>
        </div>
        <div class="hof-section-count">${getText('hall_of_fame_run_count', { count: sectionEntries.length })}</div>
      </div>
      <div class="hof-section-body">
        ${sectionEntries.length
          ? sectionEntries.map(renderEntry).join('')
          : `<div class="hof-empty-section">${getText('hall_of_fame_no_entries')}</div>`}
      </div>
    </section>`;

  const storySections = storyGroups
    .map(group => renderSection(group.label, group.name, group.entries, `hof-section--gen-${group.id}`))
    .join('');

  const towerSection = renderSection(getText('hall_of_fame_tower'), 'Kanto - Johto - Hoenn - Sinnoh - Unova', towerEntries, 'hof-section--tower');
  const legacySection = legacyEntries.length
    ? renderSection(getText('hall_of_fame_legacy'), '', legacyEntries, 'hof-section--legacy')
    : '';

  const contentHtml = entries.length === 0
    ? `<div class="hof-empty-state">
        <div class="hof-empty-title">${getText('hall_of_fame_empty')}</div>
        <div class="hof-empty-subtitle">${getText('hall_of_fame_empty_sub')}</div>
      </div>`
    : `
      <div class="hof-layout-band">
        <div class="hof-band-title">${getText('hall_of_fame_story')}</div>
        <div class="hof-story-grid">${storySections}</div>
      </div>
      <div class="hof-layout-band">
        ${towerSection}
      </div>
      ${legacySection}`;

  modal.innerHTML = `
    <div class="hof-modal-box">
      <div class="hof-modal-header">
        <div>
          <div class="hof-modal-title">${getText('hall_of_fame_title')}</div>
          <div class="hof-modal-subtitle">Gen 1 - Gen 6 Archive</div>
        </div>
        <button class="hof-modal-close" onclick="document.getElementById('hof-modal').remove()">&times;</button>
      </div>
      <div class="hof-modal-body">${contentHtml}</div>
    </div>`;

  document.body.appendChild(modal);
}

