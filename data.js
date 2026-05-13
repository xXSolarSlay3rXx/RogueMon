// data.js - Pokemon data, gym leaders, items, type chart

const TYPE_CHART = {
  //          Defending type ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢
  Normal:   { Normal:1,   Fire:1,   Water:1,   Electric:1,   Grass:1,   Ice:1,   Fighting:1,   Poison:1,   Ground:1, Flying:1,   Psychic:1,   Bug:1,   Rock:0.5, Ghost:0,   Dragon:1,   Dark:1,   Steel:0.5 },
  Fire:     { Normal:1,   Fire:0.5, Water:0.5, Electric:1,   Grass:2,   Ice:2,   Fighting:1,   Poison:1,   Ground:1, Flying:1,   Psychic:1,   Bug:2,   Rock:0.5, Ghost:1,   Dragon:0.5, Dark:1,   Steel:2   },
  Water:    { Normal:1,   Fire:2,   Water:0.5, Electric:1,   Grass:0.5, Ice:1,   Fighting:1,   Poison:1,   Ground:2, Flying:1,   Psychic:1,   Bug:1,   Rock:2,   Ghost:1,   Dragon:0.5, Dark:1,   Steel:1   },
  Electric: { Normal:1,   Fire:1,   Water:2,   Electric:0.5, Grass:0.5, Ice:1,   Fighting:1,   Poison:1,   Ground:0, Flying:2,   Psychic:1,   Bug:1,   Rock:1,   Ghost:1,   Dragon:0.5, Dark:1,   Steel:1   },
  Grass:    { Normal:1,   Fire:0.5, Water:2,   Electric:1,   Grass:0.5, Ice:1,   Fighting:1,   Poison:0.5, Ground:2, Flying:0.5, Psychic:1,   Bug:0.5, Rock:2,   Ghost:1,   Dragon:0.5, Dark:1,   Steel:0.5 },
  Ice:      { Normal:1,   Fire:0.5, Water:0.5, Electric:1,   Grass:2,   Ice:0.5, Fighting:1,   Poison:1,   Ground:2, Flying:2,   Psychic:1,   Bug:1,   Rock:1,   Ghost:1,   Dragon:2,   Dark:1,   Steel:0.5 },
  Fighting: { Normal:2,   Fire:1,   Water:1,   Electric:1,   Grass:1,   Ice:2,   Fighting:1,   Poison:0.5, Ground:1, Flying:0.5, Psychic:0.5, Bug:0.5, Rock:2,   Ghost:0,   Dragon:1,   Dark:2,   Steel:2   },
  Poison:   { Normal:1,   Fire:1,   Water:1,   Electric:1,   Grass:2,   Ice:1,   Fighting:1,   Poison:0.5, Ground:0.5, Flying:1, Psychic:1,   Bug:1,   Rock:0.5, Ghost:0.5, Dragon:1,   Dark:1,   Steel:0   },
  Ground:   { Normal:1,   Fire:2,   Water:1,   Electric:2,   Grass:0.5, Ice:1,   Fighting:1,   Poison:2,   Ground:1, Flying:0,   Psychic:1,   Bug:0.5, Rock:2,   Ghost:1,   Dragon:1,   Dark:1,   Steel:2   },
  Flying:   { Normal:1,   Fire:1,   Water:1,   Electric:0.5, Grass:2,   Ice:1,   Fighting:2,   Poison:1,   Ground:1, Flying:1,   Psychic:1,   Bug:2,   Rock:0.5, Ghost:1,   Dragon:1,   Dark:1,   Steel:0.5 },
  Psychic:  { Normal:1,   Fire:1,   Water:1,   Electric:1,   Grass:1,   Ice:1,   Fighting:2,   Poison:2,   Ground:1, Flying:1,   Psychic:0.5, Bug:1,   Rock:1,   Ghost:1,   Dragon:1,   Dark:0,   Steel:0.5 },
  Bug:      { Normal:1,   Fire:0.5, Water:1,   Electric:1,   Grass:2,   Ice:1,   Fighting:0.5, Poison:0.5, Ground:1, Flying:0.5, Psychic:2,   Bug:1,   Rock:1,   Ghost:0.5, Dragon:1,   Dark:2,   Steel:0.5 },
  Rock:     { Normal:1,   Fire:2,   Water:1,   Electric:1,   Grass:1,   Ice:2,   Fighting:0.5, Poison:1,   Ground:0.5, Flying:2, Psychic:1,   Bug:2,   Rock:1,   Ghost:1,   Dragon:1,   Dark:1,   Steel:0.5 },
  Ghost:    { Normal:0,   Fire:1,   Water:1,   Electric:1,   Grass:1,   Ice:1,   Fighting:1,   Poison:1,   Ground:1, Flying:1,   Psychic:2,   Bug:1,   Rock:1,   Ghost:2,   Dragon:1,   Dark:0.5, Steel:0.5 },
  Dragon:   { Normal:1,   Fire:1,   Water:1,   Electric:1,   Grass:1,   Ice:1,   Fighting:1,   Poison:1,   Ground:1, Flying:1,   Psychic:1,   Bug:1,   Rock:1,   Ghost:1,   Dragon:2,   Dark:1,   Steel:0.5 },
  Dark:     { Normal:1,   Fire:1,   Water:1,   Electric:1,   Grass:1,   Ice:1,   Fighting:0.5, Poison:1,   Ground:1, Flying:1,   Psychic:2,   Bug:1,   Rock:1,   Ghost:2,   Dragon:1,   Dark:0.5, Steel:0.5 },
  Steel:    { Normal:1,   Fire:0.5, Water:0.5, Electric:0.5, Grass:1,   Ice:2,   Fighting:1,   Poison:1,   Ground:1, Flying:1,   Psychic:1,   Bug:1,   Rock:2,   Ghost:1,   Dragon:1,   Dark:1,   Steel:0.5 },
};

function getTypeEffectiveness(attackType, defenderTypes) {
  let mult = 1;
  for (const dt of defenderTypes) {
    const cap = dt.charAt(0).toUpperCase() + dt.slice(1).toLowerCase();
    const atCap = attackType.charAt(0).toUpperCase() + attackType.slice(1).toLowerCase();
    if (TYPE_CHART[atCap] && TYPE_CHART[atCap][cap] !== undefined) {
      mult *= TYPE_CHART[atCap][cap];
    }
  }
  return mult;
}

// PokeAPI type ID map for type icon sprites
const TYPE_IDS = {
  Normal:1, Fighting:2, Flying:3, Poison:4, Ground:5, Rock:6, Bug:7, Ghost:8, Steel:9,
  Fire:10, Water:11, Grass:12, Electric:13, Psychic:14, Ice:15, Dragon:16, Dark:17, Steel:9, Fairy:18,
};

// Move pools by type ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â each has physical/special arrays of [tier0, tier1, tier2]
// Tier 0: weak early moves (~35ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ60 power), Tier 1: standard moves (~65ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ100), Tier 2: powerful moves (~100ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ150)
const MOVE_POOL = {
  Normal:   { physical: [{name:'Tackle',           power:40,  desc:'Charges the foe with a full-body tackle.'},
                         {name:'Body Slam',         power:85,  desc:'Slams the foe with the full weight of the body.'},
                         {name:'Giga Impact',       power:150, desc:'Charges the foe using every bit of its power.'}],
              special:  [{name:'Swift',             power:60,  desc:'Star-shaped rays that never miss the target.'},
                         {name:'Hyper Voice',       power:90,  desc:'Emits a piercing cry to strike the foe.'},
                         {name:'Boomburst',         power:140, desc:'Attacks everything with a destructive sound wave.'}] },
  Fire:     { physical: [{name:'Ember',             power:60,  desc:'A small flame scorches the foe.'},
                         {name:'Fire Punch',        power:75,  desc:'An incandescent punch that sears the foe.'},
                         {name:'Flare Blitz',       power:120, desc:'A full-force charge cloaked in searing flames.'}],
              special:  [{name:'Incinerate',        power:60,  desc:'Scorches the foe with an intense burst of fire.'},
                         {name:'Flamethrower',      power:90,  desc:'A scorching stream of fire engulfs the foe.'},
                         {name:'Fire Blast',        power:110, desc:'A fiery blast that scorches everything in its path.'}] },
  Water:    { physical: [{name:'Water Gun',         power:50,  desc:'Squirts water to attack the foe.'},
                         {name:'Waterfall',         power:80,  desc:'Charges the foe with tremendous force.'},
                         {name:'Aqua Tail',         power:110, desc:'Attacks by swinging its tail as if it were a wave.'}],
              special:  [{name:'Bubble',            power:50,  desc:'Fires a barrage of bubbles at the foe.'},
                         {name:'Surf',              power:80,  desc:'A giant wave crashes over the foe.'},
                         {name:'Hydro Pump',        power:110, desc:'Blasts the foe with a high-powered blast of water.'}] },
  Electric: { physical: [{name:'Spark',             power:40,  desc:'An electrified tackle that crackles with voltage.'},
                         {name:'Thunder Punch',     power:75,  desc:'An electrified punch that crackles with voltage.'},
                         {name:'Bolt Strike',       power:130, desc:'The user strikes the foe with a massive jolt of electricity.'}],
              special:  [{name:'Thunder Shock',     power:40,  desc:'A jolt of electricity zaps the foe.'},
                         {name:'Thunderbolt',       power:90,  desc:'A strong bolt of lightning strikes the foe.'},
                         {name:'Thunder',           power:110, desc:'A wicked thunderbolt is dropped on the foe.'}] },
  Grass:    { physical: [{name:'Vine Whip',         power:40,  desc:'Strikes the foe with slender, whiplike vines.'},
                         {name:'Razor Leaf',        power:65,  desc:'Sharp-edged leaves slice the foe to ribbons.'},
                         {name:'Power Whip',        power:120, desc:'The user violently whirls its vines to strike the foe.'}],
              special:  [{name:'Magical Leaf',      power:40,  desc:'A strange, mystical leaf that always hits the foe.'},
                         {name:'Energy Ball',       power:90,  desc:'Draws power from nature and fires it at the foe.'},
                         {name:'Solar Beam',        power:120, desc:'A full-power blast of concentrated solar energy.'}] },
  Ice:      { physical: [{name:'Powder Snow',       power:40,  desc:'Blows a chilling gust of powdery snow at the foe.'},
                         {name:'Ice Punch',         power:75,  desc:'An ice-cold punch that may freeze the foe.'},
                         {name:'Icicle Crash',      power:110, desc:'Large icicles crash down on the foe.'}],
              special:  [{name:'Icy Wind',          power:40,  desc:'A chilling attack that also lowers the foe\'s Speed.'},
                         {name:'Ice Beam',          power:90,  desc:'A frigid ray of ice that may freeze the foe.'},
                         {name:'Blizzard',          power:110, desc:'Summons a howling blizzard to strike the foe.'}] },
  Fighting: { physical: [{name:'Karate Chop',       power:50,  desc:'A precise chopping strike to the foe.'},
                         {name:'Cross Chop',        power:100, desc:'Delivers a double chop with crossed forearms.'},
                         {name:'Close Combat',      power:120, desc:'An all-out brawl unleashing maximum power.'}],
              special:  [{name:'Force Palm',        power:60,  desc:'Fires a shock wave from the user\'s palm.'},
                         {name:'Aura Sphere',       power:80,  desc:'Focuses aura energy into a perfect, unavoidable sphere.'},
                         {name:'Focus Blast',       power:120, desc:'Hurls a concentrated blast of energy at the foe.'}] },
  Poison:   { physical: [{name:'Poison Sting',      power:40,  desc:'Stabs the foe with a venomous stinger.'},
                         {name:'Poison Jab',        power:90,  desc:'Stabs the foe with a toxic spike.'},
                         {name:'Gunk Shot',         power:130, desc:'Hurls garbage at the foe to inflict damage.'}],
              special:  [{name:'Acid',              power:40,  desc:'Sprays the foe with a toxic acid liquid.'},
                         {name:'Sludge Bomb',       power:100, desc:'Hurls unsanitary sludge at the foe.'},
                         {name:'Acid Spray',        power:120, desc:'Spits fluid that corrodes and eats away at the foe.'}] },
  Ground:   { physical: [{name:'Mud Shot',           power:55,  desc:'Hurls a blob of mud at the foe.'},
                         {name:'Earthquake',        power:100, desc:'A massive quake shakes everything around.'},
                         {name:'Precipice Blades',  power:120, desc:'Controls the power of nature to attack with sharp blades.'}],
              special:  [{name:'Bulldoze',          power:60,  desc:'Stomps down on the ground and attacks everything nearby.'},
                         {name:'Earth Power',       power:90,  desc:'The earth erupts with force from directly below.'},
                         {name:'Land\'s Wrath',     power:110, desc:'Gathers the energy of the land and uses it to attack.'}] },
  Flying:   { physical: [{name:'Peck',              power:50,  desc:'Jabs the foe with a sharply pointed beak.'},
                         {name:'Aerial Ace',        power:60,  desc:'An extremely fast attack that never misses.'},
                         {name:'Sky Attack',        power:140, desc:'A swooping high-speed attack from above.'}],
              special:  [{name:'Gust',              power:40,  desc:'Strikes the foe with a gust of wind.'},
                         {name:'Air Slash',         power:75,  desc:'Slashes with a blade of pressurized air.'},
                         {name:'Hurricane',         power:110, desc:'Whips up a hurricane to slam the foe.'}] },
  Psychic:  { physical: [{name:'Confusion',         power:50,  desc:'A telekinetic attack that may cause confusion.'},
                         {name:'Zen Headbutt',      power:80,  desc:'Focuses willpower and charges headfirst.'},
                         {name:'Psycho Boost',      power:140, desc:'Attacks the foe at full power. Sharply lowers the user\'s Sp. Atk.'}],
              special:  [{name:'Psybeam',           power:65,  desc:'Fires a peculiar ray that may leave the foe confused.'},
                         {name:'Psychic',           power:90,  desc:'A powerful psychic force attacks the foe\'s mind.'},
                         {name:'Psystrike',         power:100, desc:'Materializes a peculiar psychic wave to attack the foe\'s physical bulk.'}] },
  Bug:      { physical: [{name:'Bug Bite',          power:60,  desc:'Bites the foe with powerful mandibles.'},
                         {name:'X-Scissor',         power:80,  desc:'Slashes the foe with crossed, scissor-like claws.'},
                         {name:'Megahorn',          power:120, desc:'Using its tough and impressive horn, the user rams the foe.'}],
              special:  [{name:'Struggle Bug',      power:50,  desc:'The user struggles against the foe with bug energy.'},
                         {name:'Bug Buzz',          power:90,  desc:'Vibrates wings to generate a damaging buzz.'},
                         {name:'Pollen Puff',       power:110, desc:'Attacks the foe with an explosive pollen bomb.'}] },
  Rock:     { physical: [{name:'Rock Throw',        power:50,  desc:'Picks up and throws a small rock at the foe.'},
                         {name:'Rock Slide',        power:75,  desc:'Large boulders are hurled at the foe.'},
                         {name:'Stone Edge',        power:100, desc:'Stabs the foe with a sharpened stone.'}],
              special:  [{name:'Smack Down',        power:50,  desc:'The user throws a stone to knock the foe down.'},
                         {name:'Power Gem',         power:80,  desc:'Attacks with rays of light generated by gems.'},
                         {name:'Rock Wrecker',      power:150, desc:'Hurls a large boulder at the foe with enormous force.'}] },
  Ghost:    { physical: [{name:'Astonish',          power:40,  desc:'Attacks by astonishing the foe to make it flinch.'},
                         {name:'Shadow Claw',       power:70,  desc:'Slashes with a wicked claw made of shadows.'},
                         {name:'Phantom Force',     power:90,  desc:'Vanishes, then strikes the foe on the next turn.'}],
              special:  [{name:'Lick',              power:40,  desc:'Licks the foe with a long tongue to inflict damage.'},
                         {name:'Shadow Ball',       power:80,  desc:'Hurls a blob of dark energy at the foe.'},
                         {name:'Shadow Force',      power:120, desc:'Disappears, then strikes everything on the next turn.'}] },
  Dragon:   { physical: [{name:'Twister',           power:40,  desc:'Whips up a powerful twister of draconic energy.'},
                         {name:'Dragon Claw',       power:80,  desc:'Slashes the foe with razor-sharp dragon claws.'},
                         {name:'Outrage',           power:120, desc:'Rampages and attacks the foe with intense dragon fury.'}],
              special:  [{name:'Dragon Breath',     power:60,  desc:'Exhales a scorching gust of dragon energy.'},
                         {name:'Dragon Pulse',      power:85,  desc:'Fires a shockwave of draconic energy.'},
                         {name:'Draco Meteor',      power:130, desc:'Comets are rained down on the foe. Sharply lowers the user\'s Sp. Atk.'}] },
  Dark:     { physical: [{name:'Bite',              power:60,  desc:'Bites the foe with viciously sharp fangs.'},
                         {name:'Crunch',            power:80,  desc:'Crunches with sharp fangs. May lower the foe\'s Defense.'},
                         {name:'Knock Off',         power:120, desc:'Knocks down the foe\'s held item to boost damage.'}],
              special:  [{name:'Snarl',             power:55,  desc:'Yells and snarls at the foe to lower its Sp. Atk.'},
                         {name:'Dark Pulse',        power:80,  desc:'Fires a horrible aura of dark energy at the foe.'},
                         {name:'Night Daze',        power:110, desc:'Lets loose a pitch-black shockwave of dark energy.'}] },
  Steel:    { physical: [{name:'Metal Claw',        power:50,  desc:'Attacks with steel-hard claws. May raise the user\'s Attack.'},
                         {name:'Iron Tail',         power:100, desc:'Slams the foe with a hard-as-steel tail.'},
                         {name:'Heavy Slam',        power:130, desc:'Slams into the foe with its heavy body.'}],
              special:  [{name:'Steel Wing',        power:60,  desc:'Strikes the foe with hard, steel-edged wings.'},
                         {name:'Flash Cannon',      power:90,  desc:'Fires a flash of steel-type energy at the foe.'},
                         {name:'Doom Desire',       power:140, desc:'Stores power for two turns, then fires a concentrated bundle of light.'}] },
  Fairy:    { physical: [{name:'Fairy Wind',        power:40,  desc:'Stirs up a fairy-type breeze and attacks the foe.'},
                         {name:'Play Rough',        power:90,  desc:'Plays rough with the foe, tossing it around wildly.'},
                         {name:'Spirit Break',      power:130, desc:'Attacks the foe with such force it crushes their fighting spirit.'}],
              special:  [{name:'Disarming Voice',   power:40,  desc:'Lets out a charming cry that never misses its mark.'},
                         {name:'Dazzling Gleam',    power:80,  desc:'Emits a powerful flash of brilliant fairy light.'},
                         {name:'Moonblast',         power:130, desc:'Borrows the overwhelming power of the moon to blast the foe.'}] },
};

function getMoveTierForMap(mapIndex) {
  return mapIndex <= 2 ? 0 : 1;
}

function getBestMove(types, baseStats, speciesId, moveTier = 1) {
  if (speciesId === 129) return { name: 'Splash',   power: 0, type: 'Normal', isSpecial: false, noDamage: true };
  if (speciesId === 63)  return { name: 'Teleport', power: 0, type: 'Normal', isSpecial: false, noDamage: true };
  const isSpecial = (baseStats?.special || 0) >= (baseStats?.atk || 0);
  const tier = Math.max(0, Math.min(2, moveTier ?? 1));
  if ([74, 75, 76, 95].includes(speciesId)) {
    const move = MOVE_POOL['Rock'][isSpecial ? 'special' : 'physical'][tier];
    return { ...move, type: 'Rock', isSpecial };
  }
  for (const t of types) {
    // Skip Normal if the PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon also has a more specific type (e.g. Normal/Flying ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ use Flying)
    if (t.toLowerCase() === 'normal' && types.length > 1) continue;
    const cap = t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
    if (MOVE_POOL[cap]) {
      const move = isSpecial ? MOVE_POOL[cap].special[tier] : MOVE_POOL[cap].physical[tier];
      return { ...move, type: cap, isSpecial };
    }
  }
  return { name: 'Tackle', power: 40, type: 'Normal', isSpecial: false };
}

// Gym leader teams (hardcoded)
const GYM_LEADERS = [
  {
    name: 'Brock', badge: 'Boulder Badge', type: 'Rock', moveTier: 0,
    team: [
      { speciesId: 74, name: 'Geodude', types: ['Rock','Ground'], baseStats: { hp:40,atk:80,def:100,speed:20,special:30 }, level: 12 },
      { speciesId: 95, name: 'Onix',    types: ['Rock','Ground'], baseStats: { hp:35,atk:45,def:160,speed:70,special:30 }, level: 14 },
    ]
  },
  {
    name: 'Misty', badge: 'Cascade Badge', type: 'Water', moveTier: 0,
    team: [
      { speciesId: 120, name: 'Staryu',  types: ['Water'], baseStats: { hp:30,atk:45,def:55,speed:85,special:70 }, level: 18 },
      { speciesId: 121, name: 'Starmie', types: ['Water','Psychic'], baseStats: { hp:60,atk:75,def:85,speed:115,special:100 }, level: 20 },
    ]
  },
  {
    name: 'Lt. Surge', badge: 'Thunder Badge', type: 'Electric', moveTier: 1,
    team: [
      { speciesId: 25,  name: 'Pikachu',  types: ['Electric'], baseStats: { hp:35,atk:55,def:40,speed:90,special:50 },  level: 20, heldItem: { id: 'eviolite', name: 'Eviolite', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€¦Ã‚Â½' } },
      { speciesId: 100, name: 'Voltorb',  types: ['Electric'], baseStats: { hp:40,atk:30,def:50,speed:100,special:55 }, level: 23, heldItem: { id: 'magnet',   name: 'Magnet',   icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â²' } },
      { speciesId: 26,  name: 'Raichu',   types: ['Electric'], baseStats: { hp:60,atk:90,def:55,speed:110,special:90 }, level: 25, heldItem: { id: 'life_orb', name: 'Life Orb', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â®' } },
    ]
  },
  {
    name: 'Erika', badge: 'Rainbow Badge', type: 'Grass', moveTier: 1,
    team: [
      { speciesId: 114, name: 'Tangela',     types: ['Grass'], baseStats: { hp:65,atk:55,def:115,speed:60,special:100 }, level: 26, heldItem: { id: 'leftovers',     name: 'Leftovers',    icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢' } },
      { speciesId: 71,  name: 'Victreebel',  types: ['Grass','Poison'], baseStats: { hp:80,atk:105,def:65,speed:70,special:100 }, level: 31, heldItem: { id: 'poison_barb',   name: 'Poison Barb',  icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€¹Ã…â€œÃƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 45,  name: 'Vileplume',   types: ['Grass','Poison'], baseStats: { hp:75,atk:80,def:85,speed:50,special:110 }, level: 32, heldItem: { id: 'miracle_seed',  name: 'Miracle Seed', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â±' } },
    ]
  },
  {
    name: 'Koga', badge: 'Soul Badge', type: 'Poison', moveTier: 1,
    team: [
      { speciesId: 109, name: 'Koffing',  types: ['Poison'], baseStats: { hp:40,atk:65,def:95,speed:35,special:60 },  level: 38, heldItem: { id: 'rocky_helmet', name: 'Rocky Helmet', icon: 'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂºÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 109, name: 'Koffing',  types: ['Poison'], baseStats: { hp:40,atk:65,def:95,speed:35,special:60 },  level: 38, heldItem: { id: 'rocky_helmet', name: 'Rocky Helmet', icon: 'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂºÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 89,  name: 'Muk',      types: ['Poison'], baseStats: { hp:105,atk:105,def:75,speed:50,special:65 }, level: 40, heldItem: { id: 'poison_barb',  name: 'Poison Barb',  icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€¹Ã…â€œÃƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 110, name: 'Weezing',  types: ['Poison'], baseStats: { hp:65,atk:90,def:120,speed:60,special:85 },  level: 44, heldItem: { id: 'leftovers',    name: 'Leftovers',    icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢' } },
    ]
  },
  {
    name: 'Sabrina', badge: 'Marsh Badge', type: 'Psychic', moveTier: 1,
    team: [
      { speciesId: 122, name: 'Mr. Mime', types: ['Psychic'], baseStats: { hp:40,atk:45,def:65,speed:90,special:100 }, level: 40, heldItem: { id: 'twisted_spoon', name: 'Twisted Spoon', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾' } },
      { speciesId: 49,  name: 'Venomoth', types: ['Bug','Poison'], baseStats: { hp:70,atk:65,def:60,speed:90,special:90 }, level: 41, heldItem: { id: 'silver_powder', name: 'Silver Powder', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Âº' } },
      { speciesId: 64,  name: 'Kadabra',  types: ['Psychic'], baseStats: { hp:40,atk:35,def:30,speed:105,special:120 }, level: 42, heldItem: { id: 'eviolite', name: 'Eviolite', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€¦Ã‚Â½' } },
      { speciesId: 65,  name: 'Alakazam', types: ['Psychic'], baseStats: { hp:55,atk:50,def:45,speed:120,special:135 }, level: 44, heldItem: { id: 'scope_lens', name: 'Scope Lens', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â­' } },
    ]
  },
  {
    name: 'Blaine', badge: 'Volcano Badge', type: 'Fire', moveTier: 2,
    team: [
      { speciesId: 77,  name: 'Ponyta',   types: ['Fire'], baseStats: { hp:50,atk:85,def:55,speed:90,special:65 }, level: 47, heldItem: { id: 'charcoal', name: 'Charcoal', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¥' } },
      { speciesId: 58,  name: 'Growlithe',types: ['Fire'], baseStats: { hp:55,atk:70,def:45,speed:60,special:50 }, level: 47, heldItem: { id: 'eviolite', name: 'Eviolite', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€¦Ã‚Â½' } },
      { speciesId: 78,  name: 'Rapidash', types: ['Fire'], baseStats: { hp:65,atk:100,def:70,speed:105,special:80 }, level: 48, heldItem: { id: 'charcoal', name: 'Charcoal', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¥' } },
      { speciesId: 59,  name: 'Arcanine', types: ['Fire'], baseStats: { hp:90,atk:110,def:80,speed:95,special:100 }, level: 53, heldItem: { id: 'life_orb', name: 'Life Orb', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â®' } },
    ]
  },
  {
    name: 'Giovanni', badge: 'Earth Badge', type: 'Ground', moveTier: 2,
    team: [
      { speciesId: 51,  name: 'Dugtrio',  types: ['Ground'], baseStats: { hp:35,atk:100,def:50,speed:120,special:50 }, level: 55, heldItem: { id: 'soft_sand', name: 'Soft Sand', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 31,  name: 'Nidoqueen',types: ['Poison','Ground'], baseStats: { hp:90,atk:82,def:87,speed:76,special:75 }, level: 53, heldItem: { id: 'poison_barb', name: 'Poison Barb', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€¹Ã…â€œÃƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 34,  name: 'Nidoking', types: ['Poison','Ground'], baseStats: { hp:81,atk:92,def:77,speed:85,special:75 }, level: 54, heldItem: { id: 'soft_sand', name: 'Soft Sand', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 111, name: 'Rhyhorn',  types: ['Ground','Rock'], baseStats: { hp:80,atk:85,def:95,speed:25,special:30 }, level: 56, heldItem: { id: 'hard_stone', name: 'Hard Stone', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂªÃƒâ€šÃ‚Â¨' } },
      { speciesId: 112, name: 'Rhydon',   types: ['Ground','Rock'], baseStats: { hp:105,atk:130,def:120,speed:40,special:45 }, level: 60, heldItem: { id: 'rocky_helmet', name: 'Rocky Helmet', icon: 'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂºÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
    ]
  },
];

const ELITE_4 = [
  {
    name: 'Lorelei', title: 'Elite Four', type: 'Ice',
    team: [
      { speciesId: 87,  name: 'Dewgong',   types: ['Water','Ice'], baseStats: { hp:90,atk:70,def:80,speed:70,special:95 }, level: 54, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
      { speciesId: 91,  name: 'Cloyster',  types: ['Water','Ice'], baseStats: { hp:50,atk:95,def:180,speed:70,special:85 }, level: 53, heldItem: { id: 'rocky_helmet', name: 'Rocky Helmet', icon: 'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂºÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 80,  name: 'Slowbro',   types: ['Water','Psychic'], baseStats: { hp:95,atk:75,def:110,speed:30,special:100 }, level: 54, heldItem: { id: 'leftovers', name: 'Leftovers', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢' } },
      { speciesId: 124, name: 'Jynx',      types: ['Ice','Psychic'], baseStats: { hp:65,atk:50,def:35,speed:95,special:95 }, level: 56, heldItem: { id: 'wise_glasses', name: 'Wise Glasses', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¬' } },
      { speciesId: 131, name: 'Lapras',    types: ['Water','Ice'], baseStats: { hp:130,atk:85,def:80,speed:60,special:95 }, level: 56, heldItem: { id: 'shell_bell', name: 'Shell Bell', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€¦Ã‚Â¡' } },
    ]
  },
  {
    name: 'Bruno', title: 'Elite Four', type: 'Fighting',
    team: [
      { speciesId: 95,  name: 'Onix',      types: ['Rock','Ground'], baseStats: { hp:35,atk:45,def:160,speed:70,special:30 }, level: 53, heldItem: { id: 'rocky_helmet', name: 'Rocky Helmet', icon: 'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂºÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 107, name: 'Hitmonchan',types: ['Fighting'], baseStats: { hp:50,atk:105,def:79,speed:76,special:35 }, level: 55, heldItem: { id: 'black_belt', name: 'Black Belt', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹' } },
      { speciesId: 106, name: 'Hitmonlee', types: ['Fighting'], baseStats: { hp:50,atk:120,def:53,speed:87,special:35 }, level: 55, heldItem: { id: 'muscle_band', name: 'Muscle Band', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Âª' } },
      { speciesId: 95,  name: 'Onix',      types: ['Rock','Ground'], baseStats: { hp:35,atk:45,def:160,speed:70,special:30 }, level: 54, heldItem: { id: 'hard_stone', name: 'Hard Stone', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂªÃƒâ€šÃ‚Â¨' } },
      { speciesId: 68,  name: 'Machamp',   types: ['Fighting'], baseStats: { hp:90,atk:130,def:80,speed:55,special:65 }, level: 58, heldItem: { id: 'choice_band', name: 'Choice Band', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã‚Â½ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬' } },
    ]
  },
  {
    name: 'Agatha', title: 'Elite Four', type: 'Ghost',
    team: [
      { speciesId: 94,  name: 'Gengar',    types: ['Ghost','Poison'], baseStats: { hp:60,atk:65,def:60,speed:110,special:130 }, level: 54, heldItem: { id: 'spell_tag', name: 'Spell Tag', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“Ãƒâ€šÃ‚Â»' } },
      { speciesId: 42,  name: 'Golbat',    types: ['Poison','Flying'], baseStats: { hp:75,atk:80,def:70,speed:90,special:75 }, level: 54, heldItem: { id: 'poison_barb', name: 'Poison Barb', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€¹Ã…â€œÃƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 93,  name: 'Haunter',   types: ['Ghost','Poison'], baseStats: { hp:45,atk:50,def:45,speed:95,special:115 }, level: 56, heldItem: { id: 'life_orb', name: 'Life Orb', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â®' } },
      { speciesId: 42,  name: 'Golbat',    types: ['Poison','Flying'], baseStats: { hp:75,atk:80,def:70,speed:90,special:75 }, level: 56, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
      { speciesId: 94,  name: 'Gengar',    types: ['Ghost','Poison'], baseStats: { hp:60,atk:65,def:60,speed:110,special:130 }, level: 58, heldItem: { id: 'scope_lens', name: 'Scope Lens', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â­' } },
    ]
  },
  {
    name: 'Lance', title: 'Elite Four', type: 'Dragon',
    team: [
      { speciesId: 130, name: 'Gyarados',  types: ['Water','Flying'], baseStats: { hp:95,atk:125,def:79,speed:81,special:100 }, level: 56, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
      { speciesId: 149, name: 'Dragonite', types: ['Dragon','Flying'], baseStats: { hp:91,atk:134,def:95,speed:80,special:100 }, level: 56, heldItem: { id: 'dragon_fang', name: 'Dragon Fang', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°' } },
      { speciesId: 148, name: 'Dragonair', types: ['Dragon'], baseStats: { hp:61,atk:84,def:65,speed:70,special:70 }, level: 58, heldItem: { id: 'eviolite', name: 'Eviolite', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€¦Ã‚Â½' } },
      { speciesId: 148, name: 'Dragonair', types: ['Dragon'], baseStats: { hp:61,atk:84,def:65,speed:70,special:70 }, level: 60, heldItem: { id: 'dragon_fang', name: 'Dragon Fang', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°' } },
      { speciesId: 149, name: 'Dragonite', types: ['Dragon','Flying'], baseStats: { hp:91,atk:134,def:95,speed:80,special:100 }, level: 62, heldItem: { id: 'choice_band', name: 'Choice Band', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã‚Â½ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬' } },
    ]
  },
  {
    name: 'Gary', title: 'Champion', type: 'Mixed',
    team: [
      { speciesId: 18,  name: 'Pidgeot',   types: ['Normal','Flying'], baseStats: { hp:83,atk:80,def:75,speed:101,special:70 }, level: 61, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
      { speciesId: 65,  name: 'Alakazam',  types: ['Psychic'], baseStats: { hp:55,atk:50,def:45,speed:120,special:135 }, level: 59, heldItem: { id: 'twisted_spoon', name: 'Twisted Spoon', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾' } },
      { speciesId: 112, name: 'Rhydon',    types: ['Ground','Rock'], baseStats: { hp:105,atk:130,def:120,speed:40,special:45 }, level: 61, heldItem: { id: 'soft_sand', name: 'Soft Sand', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 103, name: 'Exeggutor', types: ['Grass','Psychic'], baseStats: { hp:95,atk:95,def:85,speed:55,special:125 }, level: 61, heldItem: { id: 'miracle_seed', name: 'Miracle Seed', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â±' } },
      { speciesId: 6,   name: 'Charizard', types: ['Fire','Flying'], baseStats: { hp:78,atk:84,def:78,speed:100,special:109 }, level: 65, heldItem: { id: 'charcoal', name: 'Charcoal', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¥' } },
    ]
  },
];

const JOHTO_GYM_LEADERS = [
  {
    name: 'Falkner', badge: 'Zephyr Badge', type: 'Flying', moveTier: 0,
    sprite: 'sprites/johto/falkner.png',
    badgeImage: 'ui/badges/johto/arena1.png',
    team: [
      { speciesId: 16, name: 'Pidgey', level: 8, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
      { speciesId: 17, name: 'Pidgeotto', level: 12, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
    ]
  },
  {
    name: 'Bugsy', badge: 'Hive Badge', type: 'Bug', moveTier: 0,
    sprite: 'sprites/johto/bugsy.png',
    badgeImage: 'ui/badges/johto/arena2.png',
    team: [
      { speciesId: 11, name: 'Metapod', level: 14, heldItem: { id: 'eviolite', name: 'Eviolite', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€¦Ã‚Â½' } },
      { speciesId: 14, name: 'Kakuna', level: 14, heldItem: { id: 'eviolite', name: 'Eviolite', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€¦Ã‚Â½' } },
      { speciesId: 123, name: 'Scyther', level: 16, heldItem: { id: 'silver_powder', name: 'Silver Powder', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Âº' } },
    ]
  },
  {
    name: 'Whitney', badge: 'Plain Badge', type: 'Normal', moveTier: 1,
    sprite: 'sprites/johto/whitney.png',
    badgeImage: 'ui/badges/johto/arena3.png',
    team: [
      { speciesId: 35, name: 'Clefairy', level: 19, heldItem: { id: 'eviolite', name: 'Eviolite', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€¦Ã‚Â½' } },
      { speciesId: 241, name: 'Miltank', level: 21, heldItem: { id: 'silk_scarf', name: 'Silk Scarf', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¤Ãƒâ€šÃ‚Â' } },
    ]
  },
  {
    name: 'Morty', badge: 'Fog Badge', type: 'Ghost', moveTier: 1,
    sprite: 'sprites/johto/morty.png',
    badgeImage: 'ui/badges/johto/arena4.png',
    team: [
      { speciesId: 92, name: 'Gastly', level: 23, heldItem: { id: 'spell_tag', name: 'Spell Tag', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“Ãƒâ€šÃ‚Â»' } },
      { speciesId: 93, name: 'Haunter', level: 23, heldItem: { id: 'spell_tag', name: 'Spell Tag', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“Ãƒâ€šÃ‚Â»' } },
      { speciesId: 93, name: 'Haunter', level: 25, heldItem: { id: 'life_orb', name: 'Life Orb', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â®' } },
      { speciesId: 94, name: 'Gengar', level: 27, heldItem: { id: 'scope_lens', name: 'Scope Lens', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â­' } },
    ]
  },
  {
    name: 'Chuck', badge: 'Storm Badge', type: 'Fighting', moveTier: 1,
    sprite: 'sprites/johto/chuck.png',
    badgeImage: 'ui/badges/johto/arena5.png',
    team: [
      { speciesId: 57, name: 'Primeape', level: 30, heldItem: { id: 'black_belt', name: 'Black Belt', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹' } },
      { speciesId: 62, name: 'Poliwrath', level: 32, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
    ]
  },
  {
    name: 'Jasmine', badge: 'Mineral Badge', type: 'Steel', moveTier: 2,
    sprite: 'sprites/johto/jasmine.png',
    badgeImage: 'ui/badges/johto/arena6.png',
    team: [
      { speciesId: 81, name: 'Magnemite', level: 31, heldItem: { id: 'magnet', name: 'Magnet', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â²' } },
      { speciesId: 81, name: 'Magnemite', level: 31, heldItem: { id: 'magnet', name: 'Magnet', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â²' } },
      { speciesId: 208, name: 'Steelix', level: 35, heldItem: { id: 'rocky_helmet', name: 'Rocky Helmet', icon: 'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂºÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
    ]
  },
  {
    name: 'Pryce', badge: 'Glacier Badge', type: 'Ice', moveTier: 2,
    sprite: 'sprites/johto/pryce.png',
    badgeImage: 'ui/badges/johto/arena7.png',
    team: [
      { speciesId: 86, name: 'Seel', level: 30, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
      { speciesId: 87, name: 'Dewgong', level: 32, heldItem: { id: 'shell_bell', name: 'Shell Bell', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€¦Ã‚Â¡' } },
      { speciesId: 221, name: 'Piloswine', level: 34, heldItem: { id: 'leftovers', name: 'Leftovers', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢' } },
    ]
  },
  {
    name: 'Clair', badge: 'Rising Badge', type: 'Dragon', moveTier: 2,
    sprite: 'sprites/johto/clair.png',
    badgeImage: 'ui/badges/johto/arena8.png',
    team: [
      { speciesId: 148, name: 'Dragonair', level: 38, heldItem: { id: 'dragon_fang', name: 'Dragon Fang', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°' } },
      { speciesId: 148, name: 'Dragonair', level: 38, heldItem: { id: 'dragon_fang', name: 'Dragon Fang', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°' } },
      { speciesId: 230, name: 'Kingdra', level: 41, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
    ]
  },
];

const JOHTO_ELITE_4 = [
  {
    name: 'Will', title: 'Elite Four', type: 'Psychic',
    sprite: 'sprites/johto/will.png',
    team: [
      { speciesId: 178, name: 'Xatu', level: 42, heldItem: { id: 'twisted_spoon', name: 'Twisted Spoon', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾' } },
      { speciesId: 124, name: 'Jynx', level: 41, heldItem: { id: 'wise_glasses', name: 'Wise Glasses', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¬' } },
      { speciesId: 103, name: 'Exeggutor', level: 41, heldItem: { id: 'miracle_seed', name: 'Miracle Seed', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â±' } },
      { speciesId: 80, name: 'Slowbro', level: 41, heldItem: { id: 'leftovers', name: 'Leftovers', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢' } },
      { speciesId: 178, name: 'Xatu', level: 44, heldItem: { id: 'scope_lens', name: 'Scope Lens', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â­' } },
    ]
  },
  {
    name: 'Koga', title: 'Elite Four', type: 'Poison',
    sprite: 'sprites/johto/koga-elite.png',
    team: [
      { speciesId: 168, name: 'Ariados', level: 40, heldItem: { id: 'silver_powder', name: 'Silver Powder', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Âº' } },
      { speciesId: 205, name: 'Forretress', level: 42, heldItem: { id: 'rocky_helmet', name: 'Rocky Helmet', icon: 'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂºÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 89, name: 'Muk', level: 42, heldItem: { id: 'poison_barb', name: 'Poison Barb', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€¹Ã…â€œÃƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 169, name: 'Crobat', level: 44, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
      { speciesId: 49, name: 'Venomoth', level: 41, heldItem: { id: 'silver_powder', name: 'Silver Powder', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Âº' } },
    ]
  },
  {
    name: 'Bruno', title: 'Elite Four', type: 'Fighting',
    sprite: 'sprites/johto/bruno.png',
    team: [
      { speciesId: 237, name: 'Hitmontop', level: 42, heldItem: { id: 'black_belt', name: 'Black Belt', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹' } },
      { speciesId: 107, name: 'Hitmonchan', level: 42, heldItem: { id: 'black_belt', name: 'Black Belt', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹' } },
      { speciesId: 106, name: 'Hitmonlee', level: 42, heldItem: { id: 'black_belt', name: 'Black Belt', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹' } },
      { speciesId: 95, name: 'Onix', level: 43, heldItem: { id: 'hard_stone', name: 'Hard Stone', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂªÃƒâ€šÃ‚Â¨' } },
      { speciesId: 68, name: 'Machamp', level: 46, heldItem: { id: 'choice_band', name: 'Choice Band', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã‚Â½ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬' } },
    ]
  },
  {
    name: 'Karen', title: 'Elite Four', type: 'Dark',
    sprite: 'sprites/johto/karen.png',
    team: [
      { speciesId: 197, name: 'Umbreon', level: 42, heldItem: { id: 'leftovers', name: 'Leftovers', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢' } },
      { speciesId: 45, name: 'Vileplume', level: 42, heldItem: { id: 'miracle_seed', name: 'Miracle Seed', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â±' } },
      { speciesId: 94, name: 'Gengar', level: 45, heldItem: { id: 'spell_tag', name: 'Spell Tag', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“Ãƒâ€šÃ‚Â»' } },
      { speciesId: 198, name: 'Murkrow', level: 44, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
      { speciesId: 229, name: 'Houndoom', level: 47, heldItem: { id: 'charcoal', name: 'Charcoal', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¥' } },
    ]
  },
  {
    name: 'Lance', title: 'Champion', type: 'Dragon',
    sprite: 'sprites/johto/lance.png',
    team: [
      { speciesId: 130, name: 'Gyarados', level: 46, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
      { speciesId: 142, name: 'Aerodactyl', level: 48, heldItem: { id: 'hard_stone', name: 'Hard Stone', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂªÃƒâ€šÃ‚Â¨' } },
      { speciesId: 149, name: 'Dragonite', level: 49, heldItem: { id: 'dragon_fang', name: 'Dragon Fang', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°' } },
      { speciesId: 149, name: 'Dragonite', level: 49, heldItem: { id: 'dragon_fang', name: 'Dragon Fang', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°' } },
      { speciesId: 149, name: 'Dragonite', level: 50, heldItem: { id: 'choice_band', name: 'Choice Band', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã‚Â½ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬' } },
      { speciesId: 6, name: 'Charizard', level: 48, heldItem: { id: 'charcoal', name: 'Charcoal', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¥' } },
    ]
  },
];

const HOENN_GYM_LEADERS = [
  {
    name: 'Roxanne', badge: 'Stone Badge', type: 'Rock', moveTier: 0,
    sprite: 'sprites/Hoeen/roxanne.png',
    badgeImage: 'ui/badges/hoenn/arena1.png',
    team: [
      { speciesId: 74, name: 'Geodude', level: 14, heldItem: { id: 'hard_stone', name: 'Hard Stone', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂªÃƒâ€šÃ‚Â¨' } },
      { speciesId: 299, name: 'Nosepass', level: 15, heldItem: { id: 'hard_stone', name: 'Hard Stone', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂªÃƒâ€šÃ‚Â¨' } },
    ]
  },
  {
    name: 'Brawly', badge: 'Knuckle Badge', type: 'Fighting', moveTier: 0,
    sprite: 'sprites/Hoeen/brawly.png',
    badgeImage: 'ui/badges/hoenn/arena2.png',
    team: [
      { speciesId: 307, name: 'Meditite', level: 17, heldItem: { id: 'black_belt', name: 'Black Belt', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹' } },
      { speciesId: 296, name: 'Makuhita', level: 18, heldItem: { id: 'black_belt', name: 'Black Belt', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹' } },
    ]
  },
  {
    name: 'Wattson', badge: 'Dynamo Badge', type: 'Electric', moveTier: 1,
    sprite: 'sprites/Hoeen/wattson.png',
    badgeImage: 'ui/badges/hoenn/arena3.png',
    team: [
      { speciesId: 309, name: 'Electrike', level: 20, heldItem: { id: 'magnet', name: 'Magnet', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â²' } },
      { speciesId: 82, name: 'Magneton', level: 22, heldItem: { id: 'magnet', name: 'Magnet', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â²' } },
      { speciesId: 310, name: 'Manectric', level: 24, heldItem: { id: 'magnet', name: 'Magnet', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â²' } },
    ]
  },
  {
    name: 'Flannery', badge: 'Heat Badge', type: 'Fire', moveTier: 1,
    sprite: 'sprites/Hoeen/flannery.png',
    badgeImage: 'ui/badges/hoenn/arena4.png',
    team: [
      { speciesId: 218, name: 'Slugma', level: 24, heldItem: { id: 'charcoal', name: 'Charcoal', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¥' } },
      { speciesId: 324, name: 'Torkoal', level: 28, heldItem: { id: 'charcoal', name: 'Charcoal', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¥' } },
      { speciesId: 219, name: 'Magcargo', level: 29, heldItem: { id: 'hard_stone', name: 'Hard Stone', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂªÃƒâ€šÃ‚Â¨' } },
    ]
  },
  {
    name: 'Norman', badge: 'Balance Badge', type: 'Normal', moveTier: 1,
    sprite: 'sprites/Hoeen/norman.png',
    badgeImage: 'ui/badges/hoenn/arena5.png',
    team: [
      { speciesId: 288, name: 'Vigoroth', level: 29, heldItem: { id: 'silk_scarf', name: 'Silk Scarf', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¤Ãƒâ€šÃ‚Â' } },
      { speciesId: 264, name: 'Linoone', level: 29, heldItem: { id: 'silk_scarf', name: 'Silk Scarf', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¤Ãƒâ€šÃ‚Â' } },
      { speciesId: 289, name: 'Slaking', level: 31, heldItem: { id: 'choice_band', name: 'Choice Band', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã‚Â½ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬' } },
    ]
  },
  {
    name: 'Winona', badge: 'Feather Badge', type: 'Flying', moveTier: 2,
    sprite: 'sprites/Hoeen/winona.png',
    badgeImage: 'ui/badges/hoenn/arena6.png',
    team: [
      { speciesId: 279, name: 'Pelipper', level: 31, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
      { speciesId: 277, name: 'Swellow', level: 32, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
      { speciesId: 278, name: 'Wingull', level: 30, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
      { speciesId: 227, name: 'Skarmory', level: 33, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
      { speciesId: 334, name: 'Altaria', level: 35, heldItem: { id: 'dragon_fang', name: 'Dragon Fang', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°' } },
    ]
  },
  {
    name: 'Tate', badge: 'Mind Badge', type: 'Psychic', moveTier: 2,
    sprite: 'sprites/Hoeen/tate.png',
    badgeImage: 'ui/badges/hoenn/arena7.png',
    team: [
      { speciesId: 344, name: 'Claydol', level: 38, heldItem: { id: 'twisted_spoon', name: 'Twisted Spoon', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾' } },
      { speciesId: 337, name: 'Lunatone', level: 39, heldItem: { id: 'twisted_spoon', name: 'Twisted Spoon', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾' } },
      { speciesId: 338, name: 'Solrock', level: 39, heldItem: { id: 'hard_stone', name: 'Hard Stone', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂªÃƒâ€šÃ‚Â¨' } },
      { speciesId: 178, name: 'Xatu', level: 41, heldItem: { id: 'wise_glasses', name: 'Wise Glasses', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¬' } },
    ]
  },
  {
    name: 'Wallace', badge: 'Rain Badge', type: 'Water', moveTier: 2,
    sprite: 'sprites/Hoeen/wallace.png',
    badgeImage: 'ui/badges/hoenn/arena8.png',
    team: [
      { speciesId: 340, name: 'Whiscash', level: 40, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
      { speciesId: 364, name: 'Sealeo', level: 40, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
      { speciesId: 321, name: 'Wailord', level: 42, heldItem: { id: 'leftovers', name: 'Leftovers', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢' } },
      { speciesId: 350, name: 'Milotic', level: 45, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
    ]
  },
];

const HOENN_ELITE_4 = [
  {
    name: 'Sidney', title: 'Elite Four', type: 'Dark',
    sprite: 'sprites/Hoeen/sidney.png',
    team: [
      { speciesId: 262, name: 'Mightyena', level: 46, heldItem: { id: 'black_glasses', name: 'Black Glasses', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚Â¶ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 359, name: 'Absol', level: 47, heldItem: { id: 'scope_lens', name: 'Scope Lens', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â­' } },
      { speciesId: 275, name: 'Shiftry', level: 48, heldItem: { id: 'miracle_seed', name: 'Miracle Seed', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â±' } },
      { speciesId: 332, name: 'Cacturne', level: 47, heldItem: { id: 'black_glasses', name: 'Black Glasses', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢Ãƒâ€šÃ‚Â¶ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 274, name: 'Nuzleaf', level: 46, heldItem: { id: 'eviolite', name: 'Eviolite', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€¦Ã‚Â½' } },
    ]
  },
  {
    name: 'Phoebe', title: 'Elite Four', type: 'Ghost',
    sprite: 'sprites/Hoeen/phoebe.png',
    team: [
      { speciesId: 356, name: 'Dusclops', level: 48, heldItem: { id: 'spell_tag', name: 'Spell Tag', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“Ãƒâ€šÃ‚Â»' } },
      { speciesId: 356, name: 'Dusclops', level: 48, heldItem: { id: 'spell_tag', name: 'Spell Tag', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“Ãƒâ€šÃ‚Â»' } },
      { speciesId: 302, name: 'Sableye', level: 47, heldItem: { id: 'leftovers', name: 'Leftovers', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢' } },
      { speciesId: 354, name: 'Banette', level: 49, heldItem: { id: 'spell_tag', name: 'Spell Tag', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“Ãƒâ€šÃ‚Â»' } },
      { speciesId: 94, name: 'Gengar', level: 50, heldItem: { id: 'life_orb', name: 'Life Orb', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â®' } },
    ]
  },
  {
    name: 'Glacia', title: 'Elite Four', type: 'Ice',
    sprite: 'sprites/Hoeen/glacia.png',
    team: [
      { speciesId: 364, name: 'Sealeo', level: 48, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
      { speciesId: 364, name: 'Sealeo', level: 48, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
      { speciesId: 362, name: 'Glalie', level: 50, heldItem: { id: 'never_melt_ice', name: 'Never-Melt Ice', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 124, name: 'Jynx', level: 49, heldItem: { id: 'never_melt_ice', name: 'Never-Melt Ice', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 365, name: 'Walrein', level: 52, heldItem: { id: 'leftovers', name: 'Leftovers', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢' } },
    ]
  },
  {
    name: 'Drake', title: 'Elite Four', type: 'Dragon',
    sprite: 'sprites/Hoeen/drake.png',
    team: [
      { speciesId: 372, name: 'Shelgon', level: 51, heldItem: { id: 'eviolite', name: 'Eviolite', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€¦Ã‚Â½' } },
      { speciesId: 230, name: 'Kingdra', level: 50, heldItem: { id: 'dragon_fang', name: 'Dragon Fang', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°' } },
      { speciesId: 329, name: 'Vibrava', level: 49, heldItem: { id: 'soft_sand', name: 'Soft Sand', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 330, name: 'Flygon', level: 52, heldItem: { id: 'dragon_fang', name: 'Dragon Fang', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°' } },
      { speciesId: 373, name: 'Salamence', level: 54, heldItem: { id: 'choice_band', name: 'Choice Band', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã‚Â½ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬' } },
    ]
  },
  {
    name: 'Steven', title: 'Champion', type: 'Steel',
    sprite: 'sprites/Hoeen/steven.png',
    team: [
      { speciesId: 227, name: 'Skarmory', level: 55, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
      { speciesId: 306, name: 'Aggron', level: 56, heldItem: { id: 'rocky_helmet', name: 'Rocky Helmet', icon: 'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂºÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 337, name: 'Lunatone', level: 55, heldItem: { id: 'twisted_spoon', name: 'Twisted Spoon', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾' } },
      { speciesId: 338, name: 'Solrock', level: 55, heldItem: { id: 'hard_stone', name: 'Hard Stone', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂªÃƒâ€šÃ‚Â¨' } },
      { speciesId: 344, name: 'Claydol', level: 56, heldItem: { id: 'leftovers', name: 'Leftovers', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢' } },
      { speciesId: 376, name: 'Metagross', level: 58, heldItem: { id: 'choice_band', name: 'Choice Band', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã‚Â½ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬' } },
    ]
  },
];

const SINNOH_GYM_LEADERS = [
  {
    name: 'Roark', badge: 'Coal Badge', type: 'Rock', moveTier: 0,
    sprite: 'sprites/Sinnoh/roark.png',
    badgeImage: 'ui/badges/Sinnoh/arena1.png',
    team: [
      { speciesId: 74, name: 'Geodude', level: 13, heldItem: { id: 'hard_stone', name: 'Hard Stone', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂªÃƒâ€šÃ‚Â¨' } },
      { speciesId: 95, name: 'Onix', level: 13, heldItem: { id: 'hard_stone', name: 'Hard Stone', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂªÃƒâ€šÃ‚Â¨' } },
      { speciesId: 408, name: 'Cranidos', level: 15, heldItem: { id: 'choice_band', name: 'Choice Band', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã‚Â½ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬' } },
    ]
  },
  {
    name: 'Gardenia', badge: 'Forest Badge', type: 'Grass', moveTier: 0,
    sprite: 'sprites/Sinnoh/gardenia.png',
    badgeImage: 'ui/badges/Sinnoh/arena2.png',
    team: [
      { speciesId: 387, name: 'Turtwig', level: 19, heldItem: { id: 'miracle_seed', name: 'Miracle Seed', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â±' } },
      { speciesId: 420, name: 'Cherubi', level: 19, heldItem: { id: 'miracle_seed', name: 'Miracle Seed', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â±' } },
      { speciesId: 315, name: 'Roselia', level: 22, heldItem: { id: 'miracle_seed', name: 'Miracle Seed', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â±' } },
    ]
  },
  {
    name: 'Maylene', badge: 'Cobble Badge', type: 'Fighting', moveTier: 1,
    sprite: 'sprites/Sinnoh/maylene.png',
    badgeImage: 'ui/badges/Sinnoh/arena3.png',
    team: [
      { speciesId: 307, name: 'Meditite', level: 27, heldItem: { id: 'black_belt', name: 'Black Belt', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹' } },
      { speciesId: 67, name: 'Machoke', level: 27, heldItem: { id: 'black_belt', name: 'Black Belt', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹' } },
      { speciesId: 448, name: 'Lucario', level: 30, heldItem: { id: 'expert_belt', name: 'Expert Belt', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥Ãƒâ€¦Ã‚Â ' } },
    ]
  },
  {
    name: 'Wake', badge: 'Fen Badge', type: 'Water', moveTier: 1,
    sprite: 'sprites/Sinnoh/wake.png',
    badgeImage: 'ui/badges/Sinnoh/arena4.png',
    team: [
      { speciesId: 418, name: 'Buizel', level: 32, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
      { speciesId: 195, name: 'Quagsire', level: 34, heldItem: { id: 'leftovers', name: 'Leftovers', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢' } },
      { speciesId: 423, name: 'Gastrodon', level: 34, heldItem: { id: 'soft_sand', name: 'Soft Sand', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 419, name: 'Floatzel', level: 37, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
    ]
  },
  {
    name: 'Fantina', badge: 'Relic Badge', type: 'Ghost', moveTier: 1,
    sprite: 'sprites/Sinnoh/fantina.png',
    badgeImage: 'ui/badges/Sinnoh/arena5.png',
    team: [
      { speciesId: 425, name: 'Drifblim', level: 35, heldItem: { id: 'spell_tag', name: 'Spell Tag', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“Ãƒâ€šÃ‚Â»' } },
      { speciesId: 442, name: 'Spiritomb', level: 36, heldItem: { id: 'leftovers', name: 'Leftovers', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢' } },
      { speciesId: 429, name: 'Mismagius', level: 39, heldItem: { id: 'spell_tag', name: 'Spell Tag', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“Ãƒâ€šÃ‚Â»' } },
    ]
  },
  {
    name: 'Byron', badge: 'Mine Badge', type: 'Steel', moveTier: 2,
    sprite: 'sprites/Sinnoh/byron.png',
    badgeImage: 'ui/badges/Sinnoh/arena6.png',
    team: [
      { speciesId: 410, name: 'Shieldon', level: 38, heldItem: { id: 'eviolite', name: 'Eviolite', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€¦Ã‚Â½' } },
      { speciesId: 82, name: 'Magneton', level: 38, heldItem: { id: 'magnet', name: 'Magnet', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â²' } },
      { speciesId: 411, name: 'Bastiodon', level: 41, heldItem: { id: 'rocky_helmet', name: 'Rocky Helmet', icon: 'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂºÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
    ]
  },
  {
    name: 'Candice', badge: 'Icicle Badge', type: 'Ice', moveTier: 2,
    sprite: 'sprites/Sinnoh/candice.png',
    badgeImage: 'ui/badges/Sinnoh/arena7.png',
    team: [
      { speciesId: 460, name: 'Abomasnow', level: 40, heldItem: { id: 'never_melt_ice', name: 'Never-Melt Ice', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 220, name: 'Swinub', level: 38, heldItem: { id: 'eviolite', name: 'Eviolite', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€¦Ã‚Â½' } },
      { speciesId: 221, name: 'Piloswine', level: 40, heldItem: { id: 'leftovers', name: 'Leftovers', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢' } },
      { speciesId: 473, name: 'Mamoswine', level: 42, heldItem: { id: 'choice_band', name: 'Choice Band', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã‚Â½ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬' } },
    ]
  },
  {
    name: 'Volkner', badge: 'Beacon Badge', type: 'Electric', moveTier: 2,
    sprite: 'sprites/Sinnoh/volkner.png',
    badgeImage: 'ui/badges/Sinnoh/arena8.png',
    team: [
      { speciesId: 466, name: 'Electivire', level: 47, heldItem: { id: 'magnet', name: 'Magnet', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â²' } },
      { speciesId: 135, name: 'Jolteon', level: 45, heldItem: { id: 'magnet', name: 'Magnet', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â²' } },
      { speciesId: 462, name: 'Magnezone', level: 46, heldItem: { id: 'magnet', name: 'Magnet', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â²' } },
      { speciesId: 479, name: 'Rotom', level: 46, heldItem: { id: 'wise_glasses', name: 'Wise Glasses', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¬' } },
    ]
  },
];

const SINNOH_ELITE_4 = [
  {
    name: 'Aaron', title: 'Elite Four', type: 'Bug',
    sprite: 'sprites/Sinnoh/aaron.png',
    team: [
      { speciesId: 402, name: 'Kricketune', level: 50, heldItem: { id: 'silver_powder', name: 'Silver Powder', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Âº' } },
      { speciesId: 414, name: 'Mothim', level: 51, heldItem: { id: 'silver_powder', name: 'Silver Powder', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Âº' } },
      { speciesId: 452, name: 'Drapion', level: 53, heldItem: { id: 'poison_barb', name: 'Poison Barb', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€¹Ã…â€œÃƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 416, name: 'Vespiquen', level: 52, heldItem: { id: 'leftovers', name: 'Leftovers', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢' } },
      { speciesId: 127, name: 'Pinsir', level: 51, heldItem: { id: 'choice_band', name: 'Choice Band', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã‚Â½ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬' } },
    ]
  },
  {
    name: 'Bertha', title: 'Elite Four', type: 'Ground',
    sprite: 'sprites/Sinnoh/bertha.png',
    team: [
      { speciesId: 450, name: 'Hippowdon', level: 54, heldItem: { id: 'soft_sand', name: 'Soft Sand', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 340, name: 'Whiscash', level: 52, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
      { speciesId: 472, name: 'Gliscor', level: 53, heldItem: { id: 'soft_sand', name: 'Soft Sand', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 76, name: 'Golem', level: 52, heldItem: { id: 'hard_stone', name: 'Hard Stone', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂªÃƒâ€šÃ‚Â¨' } },
      { speciesId: 423, name: 'Gastrodon', level: 55, heldItem: { id: 'leftovers', name: 'Leftovers', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢' } },
    ]
  },
  {
    name: 'Flint', title: 'Elite Four', type: 'Fire',
    sprite: 'sprites/Sinnoh/flint.png',
    team: [
      { speciesId: 392, name: 'Infernape', level: 58, heldItem: { id: 'charcoal', name: 'Charcoal', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¥' } },
      { speciesId: 467, name: 'Magmortar', level: 55, heldItem: { id: 'charcoal', name: 'Charcoal', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¥' } },
      { speciesId: 78, name: 'Rapidash', level: 53, heldItem: { id: 'charcoal', name: 'Charcoal', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¥' } },
      { speciesId: 426, name: 'Drifblim', level: 55, heldItem: { id: 'spell_tag', name: 'Spell Tag', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“Ãƒâ€šÃ‚Â»' } },
      { speciesId: 208, name: 'Steelix', level: 56, heldItem: { id: 'rocky_helmet', name: 'Rocky Helmet', icon: 'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂºÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
    ]
  },
  {
    name: 'Lucian', title: 'Elite Four', type: 'Psychic',
    sprite: 'sprites/Sinnoh/lucian.png',
    team: [
      { speciesId: 122, name: 'Mr. Mime', level: 54, heldItem: { id: 'light_clay', name: 'Light Clay', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â±' } },
      { speciesId: 178, name: 'Xatu', level: 54, heldItem: { id: 'twisted_spoon', name: 'Twisted Spoon', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾' } },
      { speciesId: 124, name: 'Jynx', level: 55, heldItem: { id: 'wise_glasses', name: 'Wise Glasses', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¬' } },
      { speciesId: 65, name: 'Alakazam', level: 56, heldItem: { id: 'twisted_spoon', name: 'Twisted Spoon', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾' } },
      { speciesId: 121, name: 'Starmie', level: 55, heldItem: { id: 'wise_glasses', name: 'Wise Glasses', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¬' } },
    ]
  },
  {
    name: 'Cynthia', title: 'Champion', type: 'Mixed',
    sprite: 'sprites/Sinnoh/cynthia.png',
    team: [
      { speciesId: 442, name: 'Spiritomb', level: 58, heldItem: { id: 'leftovers', name: 'Leftovers', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢' } },
      { speciesId: 407, name: 'Roserade', level: 58, heldItem: { id: 'miracle_seed', name: 'Miracle Seed', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â±' } },
      { speciesId: 448, name: 'Lucario', level: 60, heldItem: { id: 'expert_belt', name: 'Expert Belt', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥Ãƒâ€¦Ã‚Â ' } },
      { speciesId: 423, name: 'Gastrodon', level: 59, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
      { speciesId: 468, name: 'Togekiss', level: 60, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
      { speciesId: 445, name: 'Garchomp', level: 62, heldItem: { id: 'dragon_fang', name: 'Dragon Fang', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°' } },
    ]
  },
];

const UNOVA_GYM_LEADERS = [
  {
    name: 'Cilan', badge: 'Trio Badge', type: 'Grass', moveTier: 0,
    sprite: 'sprites/Einall/cilan.png',
    badgeImage: 'ui/badges/Einall/arena1.png',
    team: [
      { speciesId: 511, name: 'Pansage', level: 12, heldItem: { id: 'miracle_seed', name: 'Miracle Seed', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â±' } },
      { speciesId: 495, name: 'Snivy', level: 14, heldItem: { id: 'miracle_seed', name: 'Miracle Seed', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â±' } },
    ]
  },
  {
    name: 'Lenora', badge: 'Basic Badge', type: 'Normal', moveTier: 0,
    sprite: 'sprites/Einall/lenora.png',
    badgeImage: 'ui/badges/Einall/arena2.png',
    team: [
      { speciesId: 504, name: 'Patrat', level: 18, heldItem: { id: 'silk_scarf', name: 'Silk Scarf', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â£' } },
      { speciesId: 505, name: 'Watchog', level: 20, heldItem: { id: 'silk_scarf', name: 'Silk Scarf', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â£' } },
    ]
  },
  {
    name: 'Burgh', badge: 'Insect Badge', type: 'Bug', moveTier: 1,
    sprite: 'sprites/Einall/burgh.png',
    badgeImage: 'ui/badges/Einall/arena3.png',
    team: [
      { speciesId: 541, name: 'Swadloon', level: 23, heldItem: { id: 'silver_powder', name: 'Silver Powder', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Âº' } },
      { speciesId: 543, name: 'Venipede', level: 22, heldItem: { id: 'silver_powder', name: 'Silver Powder', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Âº' } },
      { speciesId: 542, name: 'Leavanny', level: 24, heldItem: { id: 'miracle_seed', name: 'Miracle Seed', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â±' } },
    ]
  },
  {
    name: 'Elesa', badge: 'Bolt Badge', type: 'Electric', moveTier: 1,
    sprite: 'sprites/Einall/elesa.png',
    badgeImage: 'ui/badges/Einall/arena4.png',
    team: [
      { speciesId: 522, name: 'Blitzle', level: 27, heldItem: { id: 'magnet', name: 'Magnet', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â²' } },
      { speciesId: 523, name: 'Zebstrika', level: 29, heldItem: { id: 'magnet', name: 'Magnet', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â²' } },
      { speciesId: 587, name: 'Emolga', level: 28, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
    ]
  },
  {
    name: 'Clay', badge: 'Quake Badge', type: 'Ground', moveTier: 1,
    sprite: 'sprites/Einall/clay.png',
    badgeImage: 'ui/badges/Einall/arena5.png',
    team: [
      { speciesId: 536, name: 'Palpitoad', level: 32, heldItem: { id: 'soft_sand', name: 'Soft Sand', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 552, name: 'Krokorok', level: 32, heldItem: { id: 'soft_sand', name: 'Soft Sand', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 530, name: 'Excadrill', level: 34, heldItem: { id: 'soft_sand', name: 'Soft Sand', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
    ]
  },
  {
    name: 'Skyla', badge: 'Jet Badge', type: 'Flying', moveTier: 2,
    sprite: 'sprites/Einall/skyla.png',
    badgeImage: 'ui/badges/Einall/arena6.png',
    team: [
      { speciesId: 527, name: 'Woobat', level: 35, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
      { speciesId: 521, name: 'Unfezant', level: 36, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
      { speciesId: 528, name: 'Swoobat', level: 37, heldItem: { id: 'twisted_spoon', name: 'Twisted Spoon', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾' } },
      { speciesId: 561, name: 'Sigilyph', level: 37, heldItem: { id: 'wise_glasses', name: 'Wise Glasses', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¬' } },
    ]
  },
  {
    name: 'Brycen', badge: 'Freeze Badge', type: 'Ice', moveTier: 2,
    sprite: 'sprites/Einall/brycen.png',
    badgeImage: 'ui/badges/Einall/arena7.png',
    team: [
      { speciesId: 615, name: 'Cryogonal', level: 39, heldItem: { id: 'never_melt_ice', name: 'Never-Melt Ice', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 613, name: 'Cubchoo', level: 38, heldItem: { id: 'eviolite', name: 'Eviolite', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€¦Ã‚Â½' } },
      { speciesId: 614, name: 'Beartic', level: 40, heldItem: { id: 'never_melt_ice', name: 'Never-Melt Ice', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
    ]
  },
  {
    name: 'Drayden', badge: 'Legend Badge', type: 'Dragon', moveTier: 2,
    sprite: 'sprites/Einall/drayden.png',
    badgeImage: 'ui/badges/Einall/arena8.png',
    team: [
      { speciesId: 621, name: 'Druddigon', level: 45, heldItem: { id: 'dragon_fang', name: 'Dragon Fang', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°' } },
      { speciesId: 612, name: 'Haxorus', level: 47, heldItem: { id: 'dragon_fang', name: 'Dragon Fang', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°' } },
      { speciesId: 635, name: 'Hydreigon', level: 46, heldItem: { id: 'wise_glasses', name: 'Wise Glasses', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¬' } },
    ]
  },
];

const UNOVA_ELITE_4 = [
  {
    name: 'Shauntal', title: 'Elite Four', type: 'Ghost',
    sprite: 'sprites/Einall/shauntal.png',
    team: [
      { speciesId: 593, name: 'Jellicent', level: 50, heldItem: { id: 'spell_tag', name: 'Spell Tag', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“Ãƒâ€šÃ‚Â»' } },
      { speciesId: 563, name: 'Cofagrigus', level: 51, heldItem: { id: 'spell_tag', name: 'Spell Tag', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“Ãƒâ€šÃ‚Â»' } },
      { speciesId: 609, name: 'Chandelure', level: 53, heldItem: { id: 'charcoal', name: 'Charcoal', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¥' } },
      { speciesId: 592, name: 'Frillish', level: 49, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
      { speciesId: 354, name: 'Banette', level: 52, heldItem: { id: 'spell_tag', name: 'Spell Tag', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“Ãƒâ€šÃ‚Â»' } },
    ]
  },
  {
    name: 'Grimsley', title: 'Elite Four', type: 'Dark',
    sprite: 'sprites/Einall/grimsley.png',
    team: [
      { speciesId: 560, name: 'Scrafty', level: 52, heldItem: { id: 'black_belt', name: 'Black Belt', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹' } },
      { speciesId: 553, name: 'Krookodile', level: 54, heldItem: { id: 'soft_sand', name: 'Soft Sand', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 510, name: 'Liepard', level: 52, heldItem: { id: 'scope_lens', name: 'Scope Lens', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â­' } },
      { speciesId: 461, name: 'Weavile', level: 53, heldItem: { id: 'never_melt_ice', name: 'Never-Melt Ice', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 197, name: 'Umbreon', level: 53, heldItem: { id: 'leftovers', name: 'Leftovers', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢' } },
    ]
  },
  {
    name: 'Caitlin', title: 'Elite Four', type: 'Psychic',
    sprite: 'sprites/Einall/caitlin.png',
    team: [
      { speciesId: 518, name: 'Musharna', level: 52, heldItem: { id: 'twisted_spoon', name: 'Twisted Spoon', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾' } },
      { speciesId: 576, name: 'Gothitelle', level: 53, heldItem: { id: 'wise_glasses', name: 'Wise Glasses', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¬' } },
      { speciesId: 579, name: 'Reuniclus', level: 53, heldItem: { id: 'wise_glasses', name: 'Wise Glasses', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¬' } },
      { speciesId: 178, name: 'Xatu', level: 52, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
      { speciesId: 65, name: 'Alakazam', level: 54, heldItem: { id: 'twisted_spoon', name: 'Twisted Spoon', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾' } },
    ]
  },
  {
    name: 'Marshal', title: 'Elite Four', type: 'Fighting',
    sprite: 'sprites/Einall/marshal.png',
    team: [
      { speciesId: 534, name: 'Conkeldurr', level: 54, heldItem: { id: 'black_belt', name: 'Black Belt', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹' } },
      { speciesId: 538, name: 'Throh', level: 52, heldItem: { id: 'black_belt', name: 'Black Belt', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹' } },
      { speciesId: 539, name: 'Sawk', level: 52, heldItem: { id: 'black_belt', name: 'Black Belt', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹' } },
      { speciesId: 106, name: 'Hitmonlee', level: 53, heldItem: { id: 'black_belt', name: 'Black Belt', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹' } },
      { speciesId: 107, name: 'Hitmonchan', level: 53, heldItem: { id: 'assault_vest', name: 'Assault Vest', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦Ãƒâ€šÃ‚Âº' } },
    ]
  },
  {
    name: 'Alder', title: 'Champion', type: 'Mixed',
    sprite: 'sprites/Einall/alder.png',
    team: [
      { speciesId: 637, name: 'Volcarona', level: 57, heldItem: { id: 'silver_powder', name: 'Silver Powder', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Âº' } },
      { speciesId: 589, name: 'Escavalier', level: 56, heldItem: { id: 'metal_coat', name: 'Metal Coat', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã‚Â¡ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 598, name: 'Ferrothorn', level: 57, heldItem: { id: 'rocky_helmet', name: 'Rocky Helmet', icon: 'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂºÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 628, name: 'Braviary', level: 56, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
      { speciesId: 623, name: 'Golurk', level: 57, heldItem: { id: 'soft_sand', name: 'Soft Sand', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 542, name: 'Leavanny', level: 55, heldItem: { id: 'miracle_seed', name: 'Miracle Seed', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â±' } },
    ]
  },
];

const KALOS_GYM_LEADERS = [
  {
    name: 'Viola', badge: 'Bug Badge', type: 'Bug', moveTier: 0,
    sprite: 'sprites/Kalos/viola.png',
    badgeImage: 'ui/badges/Kalos/arena1.png',
    team: [
      { speciesId: 283, name: 'Surskit', level: 12, heldItem: { id: 'silver_powder', name: 'Silver Powder', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Âº' } },
      { speciesId: 666, name: 'Vivillon', level: 14, heldItem: { id: 'silver_powder', name: 'Silver Powder', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Âº' } },
    ]
  },
  {
    name: 'Grant', badge: 'Cliff Badge', type: 'Rock', moveTier: 0,
    sprite: 'sprites/Kalos/grant.png',
    badgeImage: 'ui/badges/Kalos/arena2.png',
    team: [
      { speciesId: 698, name: 'Amaura', level: 18, heldItem: { id: 'hard_stone', name: 'Hard Stone', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂªÃƒâ€šÃ‚Â¨' } },
      { speciesId: 696, name: 'Tyrunt', level: 20, heldItem: { id: 'hard_stone', name: 'Hard Stone', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂªÃƒâ€šÃ‚Â¨' } },
    ]
  },
  {
    name: 'Korrina', badge: 'Rumble Badge', type: 'Fighting', moveTier: 1,
    sprite: 'sprites/Kalos/korrina.png',
    badgeImage: 'ui/badges/Kalos/arena3.png',
    team: [
      { speciesId: 619, name: 'Mienfoo', level: 23, heldItem: { id: 'black_belt', name: 'Black Belt', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹' } },
      { speciesId: 67, name: 'Machoke', level: 24, heldItem: { id: 'black_belt', name: 'Black Belt', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹' } },
      { speciesId: 701, name: 'Hawlucha', level: 25, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
    ]
  },
  {
    name: 'Ramos', badge: 'Plant Badge', type: 'Grass', moveTier: 1,
    sprite: 'sprites/Kalos/ramos.png',
    badgeImage: 'ui/badges/Kalos/arena4.png',
    team: [
      { speciesId: 189, name: 'Jumpluff', level: 30, heldItem: { id: 'miracle_seed', name: 'Miracle Seed', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â±' } },
      { speciesId: 70, name: 'Weepinbell', level: 31, heldItem: { id: 'miracle_seed', name: 'Miracle Seed', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â±' } },
      { speciesId: 673, name: 'Gogoat', level: 32, heldItem: { id: 'miracle_seed', name: 'Miracle Seed', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â±' } },
    ]
  },
  {
    name: 'Clemont', badge: 'Voltage Badge', type: 'Electric', moveTier: 1,
    sprite: 'sprites/Kalos/clemont.png',
    badgeImage: 'ui/badges/Kalos/arena5.png',
    team: [
      { speciesId: 587, name: 'Emolga', level: 35, heldItem: { id: 'magnet', name: 'Magnet', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â²' } },
      { speciesId: 82, name: 'Magneton', level: 35, heldItem: { id: 'magnet', name: 'Magnet', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â²' } },
      { speciesId: 695, name: 'Heliolisk', level: 37, heldItem: { id: 'magnet', name: 'Magnet', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€šÃ‚Â²' } },
    ]
  },
  {
    name: 'Valerie', badge: 'Fairy Badge', type: 'Fairy', moveTier: 2,
    sprite: 'sprites/Kalos/valerie.png',
    badgeImage: 'ui/badges/Kalos/arena6.png',
    team: [
      { speciesId: 303, name: 'Mawile', level: 40, heldItem: { id: 'pixie_plate', name: 'Pixie Plate', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€¦Ã‚Â¡' } },
      { speciesId: 122, name: 'Mr. Mime', level: 41, heldItem: { id: 'twisted_spoon', name: 'Twisted Spoon', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾' } },
      { speciesId: 700, name: 'Sylveon', level: 42, heldItem: { id: 'pixie_plate', name: 'Pixie Plate', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€¦Ã‚Â¡' } },
    ]
  },
  {
    name: 'Olympia', badge: 'Psychic Badge', type: 'Psychic', moveTier: 2,
    sprite: 'sprites/Kalos/olympia.png',
    badgeImage: 'ui/badges/Kalos/arena7.png',
    team: [
      { speciesId: 561, name: 'Sigilyph', level: 44, heldItem: { id: 'twisted_spoon', name: 'Twisted Spoon', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾' } },
      { speciesId: 199, name: 'Slowking', level: 45, heldItem: { id: 'twisted_spoon', name: 'Twisted Spoon', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾' } },
      { speciesId: 678, name: 'Meowstic', level: 46, heldItem: { id: 'wise_glasses', name: 'Wise Glasses', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¬' } },
    ]
  },
  {
    name: 'Wulfric', badge: 'Iceberg Badge', type: 'Ice', moveTier: 2,
    sprite: 'sprites/Kalos/wulfric.png',
    badgeImage: 'ui/badges/Kalos/arena8.png',
    team: [
      { speciesId: 460, name: 'Abomasnow', level: 48, heldItem: { id: 'never_melt_ice', name: 'Never-Melt Ice', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 615, name: 'Cryogonal', level: 48, heldItem: { id: 'never_melt_ice', name: 'Never-Melt Ice', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 713, name: 'Avalugg', level: 50, heldItem: { id: 'never_melt_ice', name: 'Never-Melt Ice', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
    ]
  },
];

const KALOS_ELITE_4 = [
  {
    name: 'Malva', title: 'Elite Four', type: 'Fire',
    sprite: 'sprites/Kalos/malva.png',
    team: [
      { speciesId: 668, name: 'Pyroar', level: 53, heldItem: { id: 'charcoal', name: 'Charcoal', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¥' } },
      { speciesId: 324, name: 'Torkoal', level: 53, heldItem: { id: 'charcoal', name: 'Charcoal', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¥' } },
      { speciesId: 609, name: 'Chandelure', level: 55, heldItem: { id: 'charcoal', name: 'Charcoal', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¥' } },
      { speciesId: 663, name: 'Talonflame', level: 56, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
    ]
  },
  {
    name: 'Siebold', title: 'Elite Four', type: 'Water',
    sprite: 'sprites/Kalos/siebold.png',
    team: [
      { speciesId: 693, name: 'Clawitzer', level: 54, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
      { speciesId: 121, name: 'Starmie', level: 54, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
      { speciesId: 130, name: 'Gyarados', level: 55, heldItem: { id: 'mystic_water', name: 'Mystic Water', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§' } },
      { speciesId: 689, name: 'Barbaracle', level: 56, heldItem: { id: 'hard_stone', name: 'Hard Stone', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂªÃƒâ€šÃ‚Â¨' } },
    ]
  },
  {
    name: 'Wikstrom', title: 'Elite Four', type: 'Steel',
    sprite: 'sprites/Kalos/wikstrom.png',
    team: [
      { speciesId: 707, name: 'Klefki', level: 54, heldItem: { id: 'metal_coat', name: 'Metal Coat', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã‚Â¡ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 476, name: 'Probopass', level: 54, heldItem: { id: 'metal_coat', name: 'Metal Coat', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã‚Â¡ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 212, name: 'Scizor', level: 55, heldItem: { id: 'metal_coat', name: 'Metal Coat', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã‚Â¡ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 681, name: 'Aegislash', level: 57, heldItem: { id: 'spell_tag', name: 'Spell Tag', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“Ãƒâ€šÃ‚Â»' } },
    ]
  },
  {
    name: 'Drasna', title: 'Elite Four', type: 'Dragon',
    sprite: 'sprites/Kalos/drasna.png',
    team: [
      { speciesId: 691, name: 'Dragalge', level: 54, heldItem: { id: 'dragon_fang', name: 'Dragon Fang', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°' } },
      { speciesId: 621, name: 'Druddigon', level: 54, heldItem: { id: 'dragon_fang', name: 'Dragon Fang', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°' } },
      { speciesId: 334, name: 'Altaria', level: 55, heldItem: { id: 'dragon_fang', name: 'Dragon Fang', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°' } },
      { speciesId: 715, name: 'Noivern', level: 57, heldItem: { id: 'dragon_fang', name: 'Dragon Fang', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°' } },
    ]
  },
  {
    name: 'Diantha', title: 'Champion', type: 'Fairy',
    sprite: 'sprites/Kalos/diantha.png',
    team: [
      { speciesId: 701, name: 'Hawlucha', level: 58, heldItem: { id: 'sharp_beak', name: 'Sharp Beak', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦' } },
      { speciesId: 697, name: 'Tyrantrum', level: 58, heldItem: { id: 'hard_stone', name: 'Hard Stone', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂªÃƒâ€šÃ‚Â¨' } },
      { speciesId: 699, name: 'Aurorus', level: 58, heldItem: { id: 'never_melt_ice', name: 'Never-Melt Ice', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â' } },
      { speciesId: 711, name: 'Gourgeist', level: 57, heldItem: { id: 'spell_tag', name: 'Spell Tag', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“Ãƒâ€šÃ‚Â»' } },
      { speciesId: 706, name: 'Goodra', level: 59, heldItem: { id: 'dragon_fang', name: 'Dragon Fang', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°' } },
      { speciesId: 282, name: 'Gardevoir', level: 61, heldItem: { id: 'pixie_plate', name: 'Pixie Plate', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â§Ãƒâ€¦Ã‚Â¡' } },
    ]
  },
];

// Item pool
const ITEM_POOL = [
  { id: 'charcoal',           name: 'Charcoal',           desc: '+50% Fire move damage',                                              icon: 'Ã°Å¸â€Â¥', minRegion: 1 },
  { id: 'mystic_water',       name: 'Mystic Water',       desc: '+50% Water move damage',                                             icon: 'Ã°Å¸â€™Â§', minRegion: 1 },
  { id: 'miracle_seed',       name: 'Miracle Seed',       desc: '+50% Grass move damage',                                             icon: 'Ã°Å¸Å’Â±', minRegion: 1 },
  { id: 'magnet',             name: 'Magnet',             desc: '+50% Electric move damage',                                          icon: 'Ã°Å¸Â§Â²', minMap: 4, minRegion: 1 },
  { id: 'black_belt',         name: 'Black Belt',         desc: '+50% Fighting move damage',                                          icon: 'Ã°Å¸Â¥â€¹', minRegion: 1 },
  { id: 'soft_sand',          name: 'Soft Sand',          desc: '+50% Ground move damage',                                            icon: 'Ã°Å¸Ââ€“Ã¯Â¸Â', minMap: 4, minRegion: 1 },
  { id: 'silver_powder',      name: 'Silver Powder',      desc: '+50% Bug move damage',                                               icon: 'Ã°Å¸Ââ€º', minRegion: 1 },
  { id: 'sharp_beak',         name: 'Sharp Beak',         desc: '+50% Flying move damage',                                            icon: 'Ã°Å¸Â¦â€¦', minRegion: 1 },
  { id: 'hard_stone',         name: 'Hard Stone',         desc: '+50% Rock move damage',                                              icon: 'Ã°Å¸ÂªÂ¨', minMap: 4, minRegion: 1 },
  { id: 'poison_barb',        name: 'Poison Barb',        desc: '+50% Poison move damage',                                            icon: 'Ã¢ËœÂ Ã¯Â¸Â', minMap: 4, minRegion: 1 },
  { id: 'spell_tag',          name: 'Spell Tag',          desc: '+50% Ghost move damage',                                             icon: 'Ã°Å¸â€˜Â»', minMap: 4, minRegion: 1 },
  { id: 'silk_scarf',         name: 'Silk Scarf',         desc: '+50% Normal move damage',                                            icon: 'Ã°Å¸Â§Â£', minRegion: 1 },
  { id: 'lucky_egg',          name: 'Lucky Egg',          desc: '30% chance: holder gains +1 extra level after each battle',          icon: 'Ã°Å¸Â¥Å¡', minMap: 4, minRegion: 2 },
  { id: 'leftovers',          name: 'Leftovers',          desc: 'Restore 10% max HP each round',                                      icon: 'Ã°Å¸ÂÆ’', minRegion: 2 },
  { id: 'focus_band',         name: 'Focus Band',         desc: '20% chance to survive a KO with 1 HP',                               icon: 'Ã°Å¸Â©Â¹', minRegion: 2 },
  { id: 'scope_lens',         name: 'Scope Lens',         desc: '20% crit chance (+50% damage on crit)',                              icon: 'Ã°Å¸â€Â­', minRegion: 2 },
  { id: 'twisted_spoon',      name: 'Twisted Spoon',      desc: '+50% Psychic move damage',                                           icon: 'Ã°Å¸Â¥â€ž', minMap: 4, minRegion: 2 },
  { id: 'never_melt_ice',     name: 'Never-Melt Ice',     desc: '+50% Ice move damage',                                               icon: 'Ã¢Ââ€žÃ¯Â¸Â', minMap: 4, minRegion: 2 },
  { id: 'metal_coat',         name: 'Metal Coat',         desc: '+50% Steel move damage',                                             icon: 'Ã°Å¸â€ºÂ¡Ã¯Â¸Â', minMap: 5, minRegion: 2 },
  { id: 'choice_band',        name: 'Choice Band',        desc: '+40% physical damage, -20% DEF',                                     icon: 'Ã°Å¸Å½â‚¬', minRegion: 3 },
  { id: 'shell_bell',         name: 'Shell Bell',         desc: 'Heal 15% of damage dealt',                                           icon: 'Ã°Å¸ÂÅ¡', minRegion: 3 },
  { id: 'dragon_fang',        name: 'Dragon Fang',        desc: '+50% Dragon move damage',                                            icon: 'Ã°Å¸Ââ€°', minMap: 6, minRegion: 3 },
  { id: 'life_orb',           name: 'Life Orb',           desc: '+30% damage; holder loses 10% max HP per hit',                       icon: 'Ã°Å¸â€Â®', minRegion: 4 },
  { id: 'choice_specs',       name: 'Choice Specs',       desc: '+40% special damage, -20% Sp.Def',                                   icon: 'Ã°Å¸â€˜â€œ', minRegion: 4 },
  { id: 'choice_scarf',       name: 'Choice Scarf',       desc: '+50% Speed',                                                         icon: 'Ã°Å¸Â§Â£', minRegion: 4 },
  { id: 'muscle_band',        name: 'Muscle Band',        desc: '+50% ATK & DEF if 4+ Pokemon on your team are physical attackers',   icon: 'Ã°Å¸â€™Âª', minRegion: 4 },
  { id: 'wise_glasses',       name: 'Wise Glasses',       desc: '+50% Sp.Atk & Sp.Def if 4+ Pokemon on your team are special attackers', icon: 'Ã°Å¸â€Â', minRegion: 4 },
  { id: 'metronome',          name: 'Metronome',          desc: '+50% damage if 4+ Pokemon on your team share a type with the attacker', icon: 'Ã°Å¸Å½Âµ', minRegion: 4 },
  { id: 'expert_belt',        name: 'Expert Belt',        desc: '+30% damage on super effective hits',                                icon: 'Ã°Å¸Â¥Å ', minRegion: 4 },
  { id: 'focus_sash',         name: 'Focus Sash',         desc: 'If at full HP, guaranteed to survive any hit with 1 HP',             icon: 'Ã°Å¸Å½â€”Ã¯Â¸Â', minRegion: 4 },
  { id: 'wide_lens',          name: 'Wide Lens',          desc: '+20% damage on all moves',                                           icon: 'Ã°Å¸â€Å½', minRegion: 4 },
  { id: 'eviolite',           name: 'Eviolite',           desc: '+50% DEF & Sp.Def if holder is not fully evolved',                   icon: 'Ã°Å¸â€™Å½', minRegion: 5 },
  { id: 'rocky_helmet',       name: 'Rocky Helmet',       desc: 'Attacker takes 12% of their max HP on each hit',                     icon: 'Ã¢â€ºâ€˜Ã¯Â¸Â', minRegion: 5 },
  { id: 'air_balloon',        name: 'Air Balloon',        desc: 'Immune to Ground-type moves',                                        icon: 'Ã°Å¸Å½Ë†', minRegion: 5 },
  { id: 'assault_vest',       name: 'Assault Vest',       desc: '+50% Sp.Def',                                                        icon: 'Ã°Å¸Â¦Âº', minRegion: 6 },
  { id: 'pixie_plate',        name: 'Pixie Plate',        desc: '+50% Fairy move damage',                                             icon: 'Ã¢Å“Â¨', minRegion: 6 },
  { id: 'razor_claw',         name: 'Razor Claw',         desc: '20% crit chance (+50% damage on crit)',                              icon: 'Ã°Å¸Âªâ€™', minRegion: 6 },
];

const USABLE_ITEM_POOL = [
  { id: 'max_revive',   name: 'Max Revive',       desc: 'Fully revives a fainted Pokemon',                   icon: 'Ã°Å¸â€™Å ', usable: true, minRegion: 1 },
  { id: 'rare_candy',   name: 'Rare Candy',       desc: 'Gives a Pokemon +3 levels',                        icon: 'Ã°Å¸ÂÂ¬', usable: true, minRegion: 1 },
  { id: 'moon_stone',   name: 'Moon Stone',       desc: 'Force evolves a Pokemon regardless of level',       icon: 'Ã°Å¸Å’â„¢', usable: true, minRegion: 1 },
  { id: 'berry_juice',  name: 'Berry Juice',      desc: 'Heals 20 HP of one Pokemon',                       icon: 'Ã°Å¸Â§Æ’', usable: true, minRegion: 2 },
  { id: 'full_restore', name: 'Full Restore',     desc: 'Fully heals a Pokemon and cures status problems',  icon: 'Ã°Å¸Â§Â´', usable: true, minRegion: 3 },
  { id: 'max_potion',   name: 'Max Potion',       desc: 'Fully restores one Pokemon HP',                    icon: 'Ã°Å¸Â§Âª', usable: true, minRegion: 4 },
];

const TYPE_ITEM_MAP = {
  Flying: 'sharp_beak', Fire: 'charcoal', Water: 'mystic_water', Electric: 'magnet',
  Grass: 'miracle_seed', Psychic: 'twisted_spoon', Fighting: 'black_belt',
  Ground: 'soft_sand', Bug: 'silver_powder', Rock: 'hard_stone', Dragon: 'dragon_fang',
  Poison: 'poison_barb', Ghost: 'spell_tag', Normal: 'silk_scarf', Ice: 'never_melt_ice',
  Steel: 'metal_coat', Fairy: 'pixie_plate',
};
// Bust stale pokemon species cache entries missing the 'special' stat
(function bustStaleCache() {
  try {
    for (const key of Object.keys(localStorage)) {
      if (!key.startsWith('pkrl_poke_')) continue;
      const val = getCached(key);
      if (val && val.baseStats && (val.baseStats.special === undefined || val.baseStats.spdef === undefined)) {
        localStorage.removeItem(key);
      }
    }
  } catch {}
})();
// Settings (persisted across runs)
function getSettings() {
  const defaults = { autoSkipBattles: false, autoSkipAllBattles: false, autoSkipEvolve: false, easyMode: false };
  return Object.assign({}, defaults, getCached('poke_settings') || {});
}
function saveSettings(s) { setCached('poke_settings', s); }

const META_PROGRESS_KEY = 'poke_meta_progress';
const STORY_COIN_REWARDS = Object.freeze({ gym: 10, elite: 15, champion: 30 });
const ENDLESS_BOOSTER_PACKS = Object.freeze([
  {
    id: 'common',
    label: 'Scout Pack',
    cost: 20,
    minBst: 220,
    maxBst: 360,
    statBonusMin: 0,
    statBonusMax: 1,
    levelBonusMin: 0,
    levelBonusMax: 1,
    legendaryChance: 0,
    accent: '#7dd7ff',
    description: 'Reliable early picks with light stat tuning.',
  },
  {
    id: 'uncommon',
    label: 'Trainer Pack',
    cost: 45,
    minBst: 320,
    maxBst: 440,
    statBonusMin: 1,
    statBonusMax: 2,
    levelBonusMin: 1,
    levelBonusMax: 2,
    legendaryChance: 0,
    accent: '#79f0a7',
    description: 'Stronger mid-tier pulls with steadier upgrades.',
  },
  {
    id: 'rare',
    label: 'Ace Pack',
    cost: 80,
    minBst: 420,
    maxBst: 540,
    statBonusMin: 2,
    statBonusMax: 3,
    levelBonusMin: 2,
    levelBonusMax: 3,
    legendaryChance: 0,
    accent: '#a98cff',
    description: 'Higher BST pulls for the backbone of a future run.',
  },
  {
    id: 'epic',
    label: 'Champion Pack',
    cost: 135,
    minBst: 520,
    maxBst: 620,
    statBonusMin: 3,
    statBonusMax: 5,
    levelBonusMin: 3,
    levelBonusMax: 4,
    legendaryChance: 0.04,
    accent: '#ff8db2',
    description: 'Elite-ready pulls with chunky stat bonuses.',
  },
  {
    id: 'mythic',
    label: 'Mythic Pack',
    cost: 220,
    minBst: 580,
    maxBst: 720,
    statBonusMin: 4,
    statBonusMax: 6,
    levelBonusMin: 4,
    levelBonusMax: 6,
    legendaryChance: 0.12,
    accent: '#ffd36c',
    description: 'Top-shelf pulls with a real shot at legendary power.',
  },
]);

function normalizeMetaProgress(meta = {}) {
  return {
    coins: Math.max(0, Math.floor(Number(meta.coins) || 0)),
    endlessCollection: Array.isArray(meta.endlessCollection) ? meta.endlessCollection : [],
    openedBoosters: Math.max(0, Math.floor(Number(meta.openedBoosters) || 0)),
    gambleHistory: Array.isArray(meta.gambleHistory) ? meta.gambleHistory.slice(0, 12) : [],
  };
}

function getMetaProgress() {
  return normalizeMetaProgress(getCached(META_PROGRESS_KEY) || {});
}

function saveMetaProgress(meta) {
  const normalized = normalizeMetaProgress(meta);
  setCached(META_PROGRESS_KEY, normalized);
  return normalized;
}

function getCoinBalance() {
  return getMetaProgress().coins;
}

function awardCoins(amount, source = '') {
  const delta = Math.max(0, Math.floor(Number(amount) || 0));
  const meta = getMetaProgress();
  meta.coins += delta;
  saveMetaProgress(meta);
  return { amount: delta, total: meta.coins, source };
}

function spendCoins(amount) {
  const cost = Math.max(0, Math.floor(Number(amount) || 0));
  const meta = getMetaProgress();
  if (meta.coins < cost) return { ok: false, total: meta.coins, cost };
  meta.coins -= cost;
  saveMetaProgress(meta);
  return { ok: true, total: meta.coins, cost };
}

function getEndlessCollection() {
  return getMetaProgress().endlessCollection || [];
}

function getUnlockedBoosterMaxDexId() {
  const dexCaps = { 1: 151, 2: 251, 3: 386, 4: 493, 5: 649, 6: 721 };
  try {
    const raw = JSON.parse(localStorage.getItem('poke_story_regions_unlocked') || '[1]');
    const ids = Array.isArray(raw) ? raw.map(Number).filter(Boolean) : [1];
    const highest = Math.max(1, ...ids);
    return dexCaps[highest] || 721;
  } catch {
    return 151;
  }
}

function metaRandomUnit() {
  return typeof rng === 'function' ? rng() : Math.random();
}

function metaRandomInt(min, max) {
  return Math.floor(metaRandomUnit() * (max - min + 1)) + min;
}

async function pickBoosterSpecies(pack, blockedIds = new Set()) {
  const maxDexId = getUnlockedBoosterMaxDexId();
  const allowLegendary = pack.legendaryChance > 0 && metaRandomUnit() < pack.legendaryChance;
  let fallback = null;

  for (let attempt = 0; attempt < 60; attempt++) {
    const speciesId = metaRandomInt(1, maxDexId);
    if (blockedIds.has(speciesId)) continue;
    if (!allowLegendary && typeof LEGENDARY_ID_SET !== 'undefined' && LEGENDARY_ID_SET.has(speciesId)) continue;
    const species = await fetchPokemonById(speciesId);
    if (!species || !species.baseStats) continue;
    const bst = species.bst || Object.values(species.baseStats).reduce((sum, value) => sum + value, 0);
    if (!fallback) fallback = species;
    if (!allowLegendary && (bst < pack.minBst || bst > pack.maxBst)) continue;
    if (allowLegendary && typeof LEGENDARY_ID_SET !== 'undefined' && LEGENDARY_ID_SET.has(speciesId)) return species;
    if (bst >= pack.minBst) return species;
  }

  return fallback || fetchPokemonById(133);
}

function createEndlessCollectionEntry(species, pack, statBonus, levelBonus) {
  const now = Date.now();
  return {
    entryId: 'endless_' + now + '_' + Math.floor(metaRandomUnit() * 1000000),
    speciesId: species.id,
    name: species.name,
    defaultName: species.defaultName || species.name,
    localizedNames: species.localizedNames || { en: species.name, de: species.name },
    spriteUrl: species.spriteUrl,
    shinySpriteUrl: species.shinySpriteUrl,
    types: species.types || [],
    bst: species.bst || Object.values(species.baseStats || {}).reduce((sum, value) => sum + value, 0),
    rarity: pack.id,
    rarityLabel: pack.label,
    rarityAccent: pack.accent,
    statBonus,
    levelBonus,
    obtainedAt: now,
  };
}

async function openEndlessBoosterPack(packId) {
  const pack = ENDLESS_BOOSTER_PACKS.find(entry => entry.id === packId);
  if (!pack) return { ok: false, error: 'Pack not found.' };

  const payment = spendCoins(pack.cost);
  if (!payment.ok) {
    return { ok: false, error: 'You need ' + pack.cost + ' coins for this pack.', coins: payment.total };
  }

  try {
    const pulls = [];
    const usedIds = new Set();
    for (let slot = 0; slot < 3; slot++) {
      const species = await pickBoosterSpecies(pack, usedIds);
      if (!species) continue;
      usedIds.add(species.id);
      pulls.push(createEndlessCollectionEntry(
        species,
        pack,
        metaRandomInt(pack.statBonusMin, pack.statBonusMax),
        metaRandomInt(pack.levelBonusMin, pack.levelBonusMax)
      ));
    }

    const meta = getMetaProgress();
    meta.openedBoosters += 1;
    meta.endlessCollection = [...pulls, ...(meta.endlessCollection || [])].slice(0, 600);
    saveMetaProgress(meta);

    return { ok: true, pack, pulls, coins: meta.coins };
  } catch (error) {
    awardCoins(pack.cost, 'Booster refund');
    return { ok: false, error: 'Pack opening failed. Coins were refunded.' };
  }
}

function playCoinFlip(betAmount) {
  const bet = Math.max(0, Math.floor(Number(betAmount) || 0));
  const meta = getMetaProgress();
  if (bet <= 0) return { ok: false, error: 'Pick a valid bet.', coins: meta.coins };
  if (meta.coins < bet) return { ok: false, error: 'You need ' + bet + ' coins for that bet.', coins: meta.coins };

  meta.coins -= bet;
  const roll = metaRandomUnit();
  let payout = 0;
  let outcome = 'loss';
  if (roll < 0.45) {
    payout = bet * 2;
    outcome = 'double';
  } else if (roll < 0.52) {
    payout = bet * 3;
    outcome = 'jackpot';
  }
  meta.coins += payout;
  const result = {
    at: Date.now(),
    bet,
    payout,
    outcome,
    net: payout - bet,
  };
  meta.gambleHistory = [result, ...(meta.gambleHistory || [])].slice(0, 8);
  saveMetaProgress(meta);
  return { ok: true, ...result, coins: meta.coins };
}

function playSlotMachine(betAmount) {
  const bet = Math.max(0, Math.floor(Number(betAmount) || 0));
  const meta = getMetaProgress();
  if (bet <= 0) return { ok: false, error: 'Pick a valid bet.', coins: meta.coins };
  if (meta.coins < bet) return { ok: false, error: 'You need ' + bet + ' coins for that bet.', coins: meta.coins };

  const symbols = ['Berry', 'Star', 'Ball', 'Seven', 'Crown'];
  const reels = [
    symbols[metaRandomInt(0, symbols.length - 1)],
    symbols[metaRandomInt(0, symbols.length - 1)],
    symbols[metaRandomInt(0, symbols.length - 1)],
  ];

  meta.coins -= bet;

  let payout = 0;
  let outcome = 'loss';

  if (reels.every(symbol => symbol === 'Seven')) {
    payout = bet * 8;
    outcome = 'jackpot';
  } else if (reels.every(symbol => symbol === 'Crown')) {
    payout = bet * 6;
    outcome = 'grand';
  } else if (reels.every(symbol => symbol === reels[0])) {
    payout = bet * 4;
    outcome = 'triple';
  } else {
    const counts = reels.reduce((acc, symbol) => {
      acc[symbol] = (acc[symbol] || 0) + 1;
      return acc;
    }, {});
    const maxMatch = Math.max(...Object.values(counts));
    if (maxMatch === 2) {
      payout = Math.floor(bet * 1.5);
      outcome = 'pair';
    }
  }

  meta.coins += payout;
  const result = {
    at: Date.now(),
    game: 'slots',
    bet,
    payout,
    outcome,
    net: payout - bet,
    reels,
  };
  meta.gambleHistory = [result, ...(meta.gambleHistory || [])].slice(0, 8);
  saveMetaProgress(meta);
  return { ok: true, ...result, coins: meta.coins };
}

function playCraneGame(betAmount) {
  const bet = Math.max(0, Math.floor(Number(betAmount) || 0));
  const meta = getMetaProgress();
  if (bet <= 0) return { ok: false, error: 'Pick a valid bet.', coins: meta.coins };
  if (meta.coins < bet) return { ok: false, error: 'You need ' + bet + ' coins for that bet.', coins: meta.coins };

  meta.coins -= bet;
  const roll = metaRandomUnit();
  let payout = 0;
  let outcome = 'miss';
  let prize = 'Nothing';

  if (roll < 0.45) {
    payout = Math.floor(bet * 1.5);
    outcome = 'small';
    prize = 'Small Plush';
  } else if (roll < 0.67) {
    payout = bet * 2;
    outcome = 'medium';
    prize = 'Rare Figure';
  } else if (roll < 0.78) {
    payout = bet * 3;
    outcome = 'large';
    prize = 'Huge Prize';
  } else if (roll < 0.83) {
    payout = bet * 6;
    outcome = 'jackpot';
    prize = 'Master Jackpot';
  }

  meta.coins += payout;
  const result = {
    at: Date.now(),
    game: 'crane',
    bet,
    payout,
    outcome,
    prize,
    net: payout - bet,
  };
  meta.gambleHistory = [result, ...(meta.gambleHistory || [])].slice(0, 8);
  saveMetaProgress(meta);
  return { ok: true, ...result, coins: meta.coins };
}

// BST ranges per map
const MAP_BST_RANGES = [
  { min: 200, max: 310 },   // Map 1
  { min: 280, max: 360 },   // Map 2
  { min: 340, max: 420 },   // Map 3
  { min: 340, max: 420 },   // Map 4
  { min: 400, max: 480 },   // Map 5
  { min: 400, max: 480 },   // Map 6
  { min: 460, max: 530 },   // Map 7
  { min: 460, max: 530 },   // Map 8
  { min: 530, max: 999 },   // Final
];

const MAP_LEVEL_RANGES = [
  [1, 5], [8, 15], [14, 21], [21, 29],
  [29, 37], [37, 43], [43, 47], [47, 52], [53, 64]
];

const MAP_NAMES = [
  'Route 1', 'Mt Moon', 'Nugget Bridge', 'Rock Tunnel',
  'Silph Co', 'Safari Zone', 'Seafoam Island', 'Viridian City', 'Victory Road',
];

function getPokemonLocations(speciesId, bst) {
  const id = Number(speciesId);
  const BUCKET_INDICES = { low:[0], midLow:[1], mid:[2,3], midHigh:[4,5], high:[6,7], veryHigh:[8] };
  let mapIndices = [];

  if (id <= 151) {
    for (const [bucket, indices] of Object.entries(BUCKET_INDICES)) {
      if (GEN1_BST_APPROX[bucket].includes(id)) mapIndices.push(...indices);
    }
  } else if (bst != null) {
    let bucket;
    if (bst >= 530) bucket = 'veryHigh';
    else if (bst >= 460) bucket = 'high';
    else if (bst >= 400) bucket = 'midHigh';
    else if (bst >= 340) bucket = 'mid';
    else if (bst >= 280) bucket = 'midLow';
    else bucket = 'low';
    mapIndices = BUCKET_INDICES[bucket];
  }

  return {
    regularMaps: id <= 151 ? mapIndices.map(i => MAP_NAMES[i]) : [],
    towerFloors: mapIndices.map(i => `Floor ${i + 1}`),
  };
}

// PokeAPI cache helpers
const CACHE_KEY_SPECIES = 'pkrl_species_list';

function getCached(key) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  } catch { return null; }
}

function setCached(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

async function fetchSpeciesList() {
  const cached = getCached(CACHE_KEY_SPECIES);
  if (cached) return cached;
  try {
    const r = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
    const d = await r.json();
    const list = d.results.map((p, i) => ({ name: p.name, id: i + 1 }));
    setCached(CACHE_KEY_SPECIES, list);
    return list;
  } catch (e) {
    console.warn('PokeAPI unavailable, using fallback data');
    return null;
  }
}

// Form slug ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ national dex ID (used for speciesId / evolution tracking)
const POKEMON_FORM_SLUGS = {
  'deoxys-attack': 386, 'deoxys-defense': 386, 'deoxys-speed': 386,
  'shaymin-sky': 492,
  'charizard-mega-x': 6,
  'kyurem-black': 646, 'kyurem-white': 646,
};

// Form slug ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ PokeAPI numeric form ID (used for sprite tooltip images)
const POKEMON_FORM_SPRITE_IDS = {
  'deoxys-attack': 10001, 'deoxys-defense': 10002, 'deoxys-speed': 10003,
  'shaymin-sky': 10006,
  'charizard-mega-x': 10034,
  'kyurem-black': 10022, 'kyurem-white': 10023,
};

// 'deoxys-attack' ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ 'Deoxys (Attack)'
function formatFormName(apiName) {
  const parts = apiName.split('-');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  const base = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  const form = parts.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
  return `${base} (${form})`;
}

async function fetchPokemonById(idOrSlug) {
  const key = `pkrl_poke_${idOrSlug}`;
  const cached = getCached(key);
  if (cached && cached.baseStats?.special !== undefined && cached.baseStats?.spdef !== undefined) return cached;
  try {
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrSlug}`);
    const d = await r.json();
    let speciesData = null;
    try {
      const speciesUrl = d.species?.url || `https://pokeapi.co/api/v2/pokemon-species/${d.id}`;
      const speciesResp = await fetch(speciesUrl);
      if (speciesResp.ok) speciesData = await speciesResp.json();
    } catch {}
    const baseStats = {
      hp: d.stats.find(s=>s.stat.name==='hp')?.base_stat || 45,
      atk: d.stats.find(s=>s.stat.name==='attack')?.base_stat || 50,
      def: d.stats.find(s=>s.stat.name==='defense')?.base_stat || 50,
      speed: d.stats.find(s=>s.stat.name==='speed')?.base_stat || 50,
      special: d.stats.find(s=>s.stat.name==='special-attack')?.base_stat || 50,
      spdef:   d.stats.find(s=>s.stat.name==='special-defense')?.base_stat || 50,
    };
    const bst = Object.values(baseStats).reduce((a,b)=>a+b,0);
    const types = d.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1));
    const isFormSlug = typeof idOrSlug === 'string' && POKEMON_FORM_SLUGS[idOrSlug] !== undefined;
    const englishBaseName = speciesData?.names?.find(n => n.language?.name === 'en')?.name
      || d.name.charAt(0).toUpperCase() + d.name.slice(1);
    const germanBaseName = speciesData?.names?.find(n => n.language?.name === 'de')?.name
      || englishBaseName;
    const englishName = isFormSlug ? formatFormName(d.name) : englishBaseName;
    const germanName = isFormSlug ? formatFormName(germanBaseName) : germanBaseName;
    const poke = {
      id: isFormSlug ? POKEMON_FORM_SLUGS[idOrSlug] : d.id,
      name: englishName,
      defaultName: englishName,
      localizedNames: { en: englishName, de: germanName },
      types,
      baseStats,
      bst,
      // Use API sprite URL directly ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â it's correct for both base forms and variants
      spriteUrl: d.sprites.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${d.id}.png`,
      shinySpriteUrl: d.sprites.front_shiny || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${d.id}.png`,
    };
    setCached(key, poke);
    return poke;
  } catch (e) {
    console.warn(`Failed to fetch pokemon ${idOrSlug}`, e);
    return null;
  }
}

async function fetchPokemonSpecies(id) {
  const key = `pkrl_species_${id}`;
  const cached = getCached(key);
  if (cached) return cached;
  try {
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const d = await r.json();
    const entry = d.flavor_text_entries.find(e => e.language.name === 'en');
    const flavorText = entry
      ? entry.flavor_text.replace(/\f|\n|ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­/g, ' ').replace(/\s{2,}/g, ' ').trim()
      : '';
    const result = { id, flavorText };
    setCached(key, result);
    return result;
  } catch { return { id, flavorText: '' }; }
}

function getCurrentLanguageCode() {
  try { return localStorage.getItem('poke_language') || 'de'; }
  catch { return 'de'; }
}

function normalizeLocalizedPokemonNames(names, fallbackName = '') {
  if (names && typeof names === 'object' && !Array.isArray(names)) {
    const en = names.en || fallbackName || names.de || '';
    const de = names.de || names.en || fallbackName || '';
    return { en, de };
  }
  const base = names || fallbackName || '';
  return { en: base, de: base };
}

function getPokemonLocalizedName(record, lang = getCurrentLanguageCode()) {
  if (!record) return '???';
  const speciesId = record.speciesId ?? record.id ?? null;
  const cached = speciesId ? getCached(`pkrl_poke_${speciesId}`) : null;
  const localizedNames = normalizeLocalizedPokemonNames(
    record.localizedNames || cached?.localizedNames,
    record.defaultName || cached?.defaultName || record.name || cached?.name || '???'
  );
  return localizedNames[lang] || localizedNames.en || record.defaultName || record.name || cached?.name || '???';
}

function getPokemonDisplayName(record, preferNickname = true, lang = getCurrentLanguageCode()) {
  if (!record) return '???';
  if (preferNickname && record.nickname) return record.nickname;
  return getPokemonLocalizedName(record, lang);
}

function applyPokemonLocalization(record, lang = getCurrentLanguageCode()) {
  if (!record) return record;
  const speciesId = record.speciesId ?? record.id ?? null;
  const cached = speciesId ? getCached(`pkrl_poke_${speciesId}`) : null;
  const localizedNames = normalizeLocalizedPokemonNames(
    record.localizedNames || cached?.localizedNames,
    record.defaultName || cached?.defaultName || record.name || cached?.name || '???'
  );
  record.defaultName = localizedNames.en || record.defaultName || record.name || '???';
  record.localizedNames = localizedNames;
  if (!record.nickname) record.name = localizedNames[lang] || localizedNames.en || record.name || '???';
  return record;
}

function syncStoredPokemonLocalizations(lang = getCurrentLanguageCode()) {
  const syncArrayEntries = entries => {
    let changed = false;
    (entries || []).forEach(entry => {
      if (Array.isArray(entry?.team)) {
        entry.team.forEach(p => { applyPokemonLocalization(p, lang); changed = true; });
      }
    });
    return changed;
  };

  const syncObjectEntries = entries => {
    Object.values(entries || {}).forEach(entry => applyPokemonLocalization(entry, lang));
  };

  if (typeof state !== 'undefined' && state) {
    (state.team || []).forEach(p => applyPokemonLocalization(p, lang));
    (state.savedCatch?.instances || []).forEach(p => applyPokemonLocalization(p, lang));
    if (typeof saveRun === 'function') saveRun();
  }

  try {
    const dex = JSON.parse(localStorage.getItem('poke_dex') || '{}');
    syncObjectEntries(dex);
    localStorage.setItem('poke_dex', JSON.stringify(dex));
  } catch {}

  try {
    const dex = JSON.parse(localStorage.getItem('poke_shiny_dex') || '{}');
    syncObjectEntries(dex);
    localStorage.setItem('poke_shiny_dex', JSON.stringify(dex));
  } catch {}

  try {
    const hof = JSON.parse(localStorage.getItem('poke_hall_of_fame') || '[]');
    if (syncArrayEntries(hof)) localStorage.setItem('poke_hall_of_fame', JSON.stringify(hof));
  } catch {}
}

function buildEvoChain(speciesId) {
  let baseId = Number(speciesId);
  let changed = true;
  while (changed) {
    changed = false;
    for (const [pid, evo] of Object.entries(EVOLUTIONS)) {
      if (evo.into === baseId) { baseId = Number(pid); changed = true; break; }
    }
    if (!changed) {
      for (const [pid, branches] of Object.entries(BRANCHING_EVOLUTIONS)) {
        if (branches.some(b => b.into === baseId)) { baseId = Number(pid); changed = true; break; }
      }
    }
  }

  function buildNode(id) {
    const node = { id, evolvesInto: [] };
    if (BRANCHING_EVOLUTIONS[id]) {
      node.evolvesInto = BRANCHING_EVOLUTIONS[id].map(b => ({
        id: b.into, name: b.name, level: b.level,
        evolvesInto: buildNode(b.into).evolvesInto,
      }));
    } else if (EVOLUTIONS[id]) {
      const e = EVOLUTIONS[id];
      node.evolvesInto = [{ id: e.into, name: e.name, level: e.level,
        evolvesInto: buildNode(e.into).evolvesInto }];
    }
    return node;
  }

  return { baseId, chain: buildNode(baseId) };
}

let _speciesPool = null;
let _poolByMap = {};

async function getSpeciesPool() {
  if (_speciesPool) return _speciesPool;
  _speciesPool = await fetchSpeciesList();
  return _speciesPool;
}

// Legendary Pokemon (Gen 1-5) ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â excluded from wild/catch pools, available only via Legendary node
const LEGENDARY_IDS = [
  144,145,146,150,151,                                             // Gen 1
  243,244,245,249,250,251,                                         // Gen 2
  377,378,379,380,381,382,383,384,385,386,                         // Gen 3
  480,481,482,483,484,485,486,487,488,489,490,491,492,493,         // Gen 4
  494,638,639,640,641,642,643,644,645,646,647,648,649,             // Gen 5
];

// Catchable Pokemon by BST bucket ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â Gen 1-5
const GEN1_BST_APPROX = {
  low: [
    // Gen 1
    1,4,7,10,11,13,14,16,17,19,20,21,23,27,29,32,41,46,48,52,54,56,60,
    69,72,74,79,81,84,86,96,98,100,102,108,111,116,118,120,129,133,
    // Gen 2
    152,155,158,161,163,165,167,170,172,173,174,175,177,179,183,187,
    191,194,201,204,209,216,218,220,223,225,228,231,235,236,238,246,
    // Gen 3
    252,255,258,261,263,265,266,268,270,273,276,278,280,281,283,285,
    287,290,292,293,296,298,300,304,307,309,316,318,322,325,327,328,
    331,333,339,341,343,349,353,355,360,361,363,366,370,371,374,
    // Gen 4
    387,390,393,396,399,401,403,406,412,415,420,425,427,431,436,438,443,447,449,451,453,456,459,
    // Gen 5
    495,498,501,504,506,509,511,513,515,517,519,522,524,527,529,532,535,540,543,
    546,548,551,554,557,562,564,566,568,570,572,574,577,580,582,585,
    588,590,592,595,597,599,602,605,607,610,613,616,619,622,624,627,629,633,636,
  ],
  midLow: [
    // Gen 1
    25,30,33,35,37,39,43,50,58,61,63,66,73,77,83,92,95,96,104,109,
    113,114,116,120,122,126,127,128,138,140,
    // Gen 2
    166,168,180,188,190,193,222,239,240,
    // Gen 3
    267,269,271,274,294,299,302,303,329,345,347,
    // Gen 4
    418,426,428,432,434,437,439,441,444,448,450,452,454,455,457,460,
    // Gen 5
    505,507,510,518,520,523,525,528,530,536,541,544,547,549,552,555,
    558,563,565,567,569,571,573,575,578,581,583,586,589,591,593,596,
    598,600,603,606,608,611,614,617,620,623,625,628,630,634,
  ],
  mid: [
    // Gen 1 (removed 26/36/103/139/141 ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â minLevel exceeds max level reachable in this bucket)
    2,5,8,42,49,51,64,67,70,75,82,85,93,97,101,105,107,110,119,
    121,124,125,130,137,
    // Gen 2
    153,156,159,162,176,184,185,192,195,198,202,206,207,215,219,247,
    // Gen 3
    253,256,259,262,264,277,279,284,288,301,305,308,311,312,313,314,
    315,320,337,338,351,352,358,364,372,
    // Gen 4
    388,391,394,397,404,408,410,419,424,429,430,435,440,446,453,456,458,461,462,463,465,466,467,469,471,472,473,474,476,477,478,479,
    // Gen 5
    496,499,502,508,521,526,533,537,542,545,553,559,560,561,576,579,584,587,594,
    601,604,609,612,615,618,621,626,631,632,635,637,
  ],
  midHigh: [
    // Gen 1 (added 26/36 ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â need lv36, reachable at map 6+; 117 also here for more coverage)
    26,36,40,44,55,62,76,80,87,88,89,90,91,99,106,115,117,123,131,132,137,142,143,
    // Gen 2
    164,176,178,200,203,205,207,210,211,215,221,224,226,227,234,237,
    // Gen 3
    272,275,286,291,297,310,317,319,323,324,326,332,335,336,340,342,
    354,356,357,359,362,367,368,369,375,
    // Gen 4
    400,407,413,416,417,421,423,433,445,464,468,475,
    // Gen 5
    497,500,503,531,538,539,550,556,
  ],
  high: [
    // Gen 1 (added 103/117/139/141 ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â need lv32-40, always met at high maps lv43+)
    3,6,9,12,15,18,22,24,28,31,34,38,45,47,53,57,59,
    65,68,71,76,78,80,89,94,103,112,117,121,130,134,135,136,139,141,142,143,149,
    // Gen 2
    154,164,171,181,182,186,189,196,197,199,205,208,212,213,214,217,
    229,232,233,241,
    // Gen 3
    282,295,321,330,334,344,346,348,
    // Gen 4
    389,398,402,405,409,411,414,422,431,436,442,448,460,470,
    // Gen 5
    497,500,503,512,514,516,534,
  ],
  veryHigh: [
    // Gen 1
    6,9,65,68,94,112,130,131,143,147,148,149,
    // Gen 2
    157,160,169,230,242,248,
    // Gen 3
    254,257,260,289,306,350,365,373,376,
    // Gen 4
    392,395,445,448,460,466,467,468,473,475,477,
    // Gen 5
    497,500,503,535,537,571,609,612,635,637,
  ],
};

const LEGENDARY_ID_SET = new Set(LEGENDARY_IDS);
const ALL_CATCHABLE_IDS = new Set([
  ...Array.from({ length: 649 }, (_, i) => i + 1).filter(id => !LEGENDARY_ID_SET.has(id)),
]);

function isGenDexComplete(minId, maxId) {
  const dex = getPokedex();
  const caughtIds = new Set(Object.values(dex).filter(e => e.caught).map(e => e.id));
  for (const id of ALL_CATCHABLE_IDS) {
    if (id >= minId && id <= maxId && !caughtIds.has(id)) return false;
  }
  return true;
}

function isPokedexComplete() { return isGenDexComplete(1, 151); }

function hasShinyCharm() { return isPokedexComplete(); }

// Legendaries grouped by BST tier (used for catch node legendary rolls)
const LEGENDARY_POOL_HIGH     = [144, 145, 146]; // Birds ~485-490
const LEGENDARY_POOL_VERYHIGH = [150,151,243,244,245,249,250,251,377,378,379,380,381,382,383,384,385,386];

async function getRandomLegendary(mapIndex, allowAllGens = false) {
  const range = MAP_BST_RANGES[Math.min(mapIndex, MAP_BST_RANGES.length - 1)];
  const veryHighPool = allowAllGens ? LEGENDARY_POOL_VERYHIGH : [150, 151];
  let pool;
  if (range.min >= 530) pool = veryHighPool;
  else if (range.min >= 460) pool = [...LEGENDARY_POOL_HIGH, ...veryHighPool];
  else return null; // too early for legendaries
  const id = pool[Math.floor((typeof rng === 'function' ? rng() : Math.random()) * pool.length)];
  return fetchPokemonById(id);
}

// Get random pokemon from the right BST bucket for a given mapIndex.
// Gen bounds restrict the pool to a regional dex slice (e.g. 1-151, 152-251).
async function getCatchChoices(mapIndex, count = 3, maxGenId = 151, minGenId = 1) {
  const range = MAP_BST_RANGES[Math.min(mapIndex, MAP_BST_RANGES.length - 1)];
  const pool = await getSpeciesPool();

  let bucket;
  if (range.min >= 530) bucket = GEN1_BST_APPROX.veryHigh;
  else if (range.min >= 460) bucket = GEN1_BST_APPROX.high;
  else if (range.min >= 400) bucket = GEN1_BST_APPROX.midHigh;
  else if (range.min >= 340) bucket = GEN1_BST_APPROX.mid;
  else if (range.min >= 280) bucket = GEN1_BST_APPROX.midLow;
  else bucket = GEN1_BST_APPROX.low;

  const filtered = bucket.filter(id => !LEGENDARY_IDS.includes(id) && id >= minGenId && id <= maxGenId);
  const shuffled = [...filtered];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const ids = shuffled.slice(0, Math.max(9, count * 3));

  const results = await Promise.all(ids.map(id => fetchPokemonById(id)));
  return results.filter(Boolean).slice(0, count);
}

function calcHp(baseHp, level) {
  return Math.floor(baseHp * level / 50) + level + 10;
}

function createInstance(species, level, isShiny = false, moveTier = 1) {
  const lvl = level || 5;
  const maxHp = calcHp(species.baseStats.hp, lvl);
  const id = species.id ?? species.speciesId;
  const localizedNames = normalizeLocalizedPokemonNames(
    species.localizedNames,
    species.defaultName || species.name
  );
  const spriteUrl = isShiny
    ? (species.shinySpriteUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`)
    : (species.spriteUrl      || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`);
  return {
    speciesId: id,
    name: getPokemonLocalizedName({ speciesId: id, localizedNames, defaultName: localizedNames.en }),
    defaultName: localizedNames.en,
    localizedNames,
    nickname: null,
    level: lvl,
    currentHp: maxHp,
    maxHp,
    isShiny,
    types: species.types,
    baseStats: species.baseStats,
    spriteUrl,
    megaStone: null,
    heldItem: null,
    moveTier: Math.max(0, Math.min(2, moveTier ?? 1)),
  };
}

// Starters
const STARTER_IDS = [1, 4, 7];

const STORY_REGION_CONFIGS = {
  1: {
    id: 1,
    key: 'kanto',
    label: 'Gen 1',
    name: 'Kanto',
    starterIds: [1, 4, 7],
    gyms: GYM_LEADERS,
    eliteFour: ELITE_4,
    encounterMinGenId: 1,
    encounterMaxGenId: 151,
    easyModeImages: [],
    badgeDisplay: 'sprite',
    mapBackgroundImage: '',
    mapBackgroundSize: 'cover',
    mapBackgroundPosition: 'center',
    mysteryTrainerSprite: 'sprites/misteryTrainer.png',
  },
  2: {
    id: 2,
    key: 'johto',
    label: 'Gen 2',
    name: 'Johto',
    starterIds: [152, 155, 158],
    gyms: JOHTO_GYM_LEADERS,
    eliteFour: JOHTO_ELITE_4,
    encounterMinGenId: 152,
    encounterMaxGenId: 251,
    easyModeImages: [],
    badgeDisplay: 'sprite',
    mapBackgroundImage: 'ui/regions/Johtoart.jpg',
    mapBackgroundImages: [
      'ui/mapsNormalMode/Johto/map1.png',
      'ui/mapsNormalMode/Johto/map2.png',
      'ui/mapsNormalMode/Johto/map3.png',
      'ui/mapsNormalMode/Johto/map4.png',
      'ui/mapsNormalMode/Johto/map5.png',
      'ui/mapsNormalMode/Johto/map6.png',
      'ui/mapsNormalMode/Johto/map7.png',
      'ui/mapsNormalMode/Johto/map8.png',
      'ui/mapsNormalMode/Johto/map9.png',
    ],
    mapBackgroundSize: 'cover',
    mapBackgroundPosition: 'center',
    mysteryTrainerSprite: 'sprites/johto/misteryTrainer.png',
  },
  3: {
    id: 3,
    key: 'hoenn',
    label: 'Gen 3',
    name: 'Hoenn',
    starterIds: [252, 255, 258],
    gyms: HOENN_GYM_LEADERS,
    eliteFour: HOENN_ELITE_4,
    encounterMinGenId: 252,
    encounterMaxGenId: 386,
    easyModeImages: [],
    badgeDisplay: 'sprite',
    mapBackgroundImage: 'ui/regions/ORAS_Hoenn_Map.jpg',
    mapBackgroundImages: [
      'ui/mapsNormalMode/hoeen/map1.png',
      'ui/mapsNormalMode/hoeen/map2.png',
      'ui/mapsNormalMode/hoeen/map3.png',
      'ui/mapsNormalMode/hoeen/map4.png',
      'ui/mapsNormalMode/hoeen/map5.png',
      'ui/mapsNormalMode/hoeen/map6.png',
      'ui/mapsNormalMode/hoeen/map7.png',
      'ui/mapsNormalMode/hoeen/map8.png',
      'ui/mapsNormalMode/hoeen/map9.png',
    ],
    mapBackgroundSize: 'cover',
    mapBackgroundPosition: 'center',
    mysteryTrainerSprite: 'sprites/Hoeen/misteryTrainer.png',
  },
  4: {
    id: 4,
    key: 'sinnoh',
    label: 'Gen 4',
    name: 'Sinnoh',
    starterIds: [387, 390, 393],
    gyms: SINNOH_GYM_LEADERS,
    eliteFour: SINNOH_ELITE_4,
    encounterMinGenId: 387,
    encounterMaxGenId: 493,
    easyModeImages: [],
    badgeDisplay: 'sprite',
    mapBackgroundImage: 'ui/regions/Sinnoh-Region_Platinum.png.webp',
    mapBackgroundImages: [
      'ui/mapsNormalMode/Sinnoh/map1.png',
      'ui/mapsNormalMode/Sinnoh/map2.png',
      'ui/mapsNormalMode/Sinnoh/map3.png',
      'ui/mapsNormalMode/Sinnoh/map4.png',
      'ui/mapsNormalMode/Sinnoh/map5.png',
      'ui/mapsNormalMode/Sinnoh/map6.png',
      'ui/mapsNormalMode/Sinnoh/map7.png',
      'ui/mapsNormalMode/Sinnoh/map8.png',
      'ui/mapsNormalMode/Sinnoh/map9.png',
    ],
    mapBackgroundSize: 'cover',
    mapBackgroundPosition: 'center',
    mysteryTrainerSprite: 'sprites/Sinnoh/misteryTrainer.png',
  },
  5: {
    id: 5,
    key: 'unova',
    label: 'Gen 5',
    name: 'Einall',
    starterIds: [495, 498, 501],
    gyms: UNOVA_GYM_LEADERS,
    eliteFour: UNOVA_ELITE_4,
    encounterMinGenId: 494,
    encounterMaxGenId: 649,
    easyModeImages: [],
    badgeDisplay: 'sprite',
    mapBackgroundImage: 'ui/mapsNormalMode/Einall/map1.png',
    mapBackgroundImages: [
      'ui/mapsNormalMode/Einall/map1.png',
      'ui/mapsNormalMode/Einall/map2.png',
      'ui/mapsNormalMode/Einall/map3.png',
      'ui/mapsNormalMode/Einall/map4.png',
      'ui/mapsNormalMode/Einall/map5.png',
      'ui/mapsNormalMode/Einall/map6.png',
      'ui/mapsNormalMode/Einall/map7.png',
      'ui/mapsNormalMode/Einall/map8.png',
      'ui/mapsNormalMode/Einall/map9.png',
    ],
    mapBackgroundSize: 'cover',
    mapBackgroundPosition: 'center',
    mysteryTrainerSprite: 'sprites/Einall/misteryTrainer.png',
  },
  6: {
    id: 6,
    key: 'kalos',
    label: 'Gen 6',
    name: 'Kalos',
    starterIds: [650, 653, 656],
    gyms: KALOS_GYM_LEADERS,
    eliteFour: KALOS_ELITE_4,
    encounterMinGenId: 650,
    encounterMaxGenId: 721,
    easyModeImages: [],
    badgeDisplay: 'sprite',
    mapBackgroundImage: 'ui/regions/Kalos.jpg',
    mapBackgroundImages: [
      'ui/mapsNormalMode/Kalos/map1.png',
      'ui/mapsNormalMode/Kalos/map2.png',
      'ui/mapsNormalMode/Kalos/map3.png',
      'ui/mapsNormalMode/Kalos/map4.png',
      'ui/mapsNormalMode/Kalos/map5.png',
      'ui/mapsNormalMode/Kalos/map6.png',
      'ui/mapsNormalMode/Kalos/map7.png',
      'ui/mapsNormalMode/Kalos/map8.png',
      'ui/mapsNormalMode/Kalos/map9.png',
    ],
    mapBackgroundSize: 'cover',
    mapBackgroundPosition: 'center',
    mysteryTrainerSprite: 'sprites/Kalos/misteryTrainer.png',
  },
};

function getStoryRegionConfig(regionId = 1) {
  return STORY_REGION_CONFIGS[regionId] || STORY_REGION_CONFIGS[1];
}


// Trainer sprites from Pokemon Showdown CDN
const TRAINER_SVG = {
  boy:  `<img src="https://play.pokemonshowdown.com/sprites/trainers/red.png"  alt="Red"  class="trainer-sprite-img" onerror="this.style.opacity='.3'">`,
  girl: `<img src="https://play.pokemonshowdown.com/sprites/trainers/dawn.png" alt="Dawn" class="trainer-sprite-img" onerror="this.style.opacity='.3'">`,
  npc:  `<img src="https://play.pokemonshowdown.com/sprites/trainers/youngster.png" alt="Trainer" class="trainer-sprite-img" onerror="this.style.opacity='.3'">`,
};

// Name overrides for Pokemon Showdown trainer sprite filenames
const SHOWDOWN_NAME_MAP = { 'gary': 'blue', 'lt. surge': 'ltsurge', 'lorelei': 'lorelei-gen3', 'agatha': 'agatha-gen3' };

function getTrainerImgHtml(trainerName) {
  // Local sprite path (e.g. "sprites/hiker.png") ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â use directly
  if (trainerName.includes('/')) {
    return `<img src="${trainerName}" alt="Trainer" class="trainer-sprite-img"
      onerror="this.style.opacity='.3';this.onerror=null">`;
  }
  const key = trainerName.toLowerCase();
  const slug = SHOWDOWN_NAME_MAP[key] || key.replace(/[.']/g, '').replace(/\s+/g, '-');
  return `<img src="https://play.pokemonshowdown.com/sprites/trainers/${slug}.png"
    alt="${trainerName}" class="trainer-sprite-img"
    onerror="this.src='https://play.pokemonshowdown.com/sprites/trainers/youngster.png';this.onerror=null">`;
}

// All evolutions across supported gens ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â stone/trade/friendship converted to sensible levels
const EVOLUTIONS = {
  // Starters
  1:  { into: 2,   level: 16, name: 'Ivysaur' },
  2:  { into: 3,   level: 32, name: 'Venusaur' },
  4:  { into: 5,   level: 16, name: 'Charmeleon' },
  5:  { into: 6,   level: 36, name: 'Charizard' },
  7:  { into: 8,   level: 16, name: 'Wartortle' },
  8:  { into: 9,   level: 36, name: 'Blastoise' },
  // Bugs
  10: { into: 11,  level: 7,  name: 'Metapod' },
  11: { into: 12,  level: 10, name: 'Butterfree' },
  13: { into: 14,  level: 7,  name: 'Kakuna' },
  14: { into: 15,  level: 10, name: 'Beedrill' },
  // Birds / normals
  16: { into: 17,  level: 18, name: 'Pidgeotto' },
  17: { into: 18,  level: 36, name: 'Pidgeot' },
  19: { into: 20,  level: 20, name: 'Raticate' },
  21: { into: 22,  level: 20, name: 'Fearow' },
  25: { into: 26,  level: 36, name: 'Raichu' },        // thunder stone ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 36
  // Snakes / ground
  23: { into: 24,  level: 22, name: 'Arbok' },
  27: { into: 28,  level: 22, name: 'Sandslash' },
  // Nidos
  29: { into: 30,  level: 16, name: 'Nidorina' },
  30: { into: 31,  level: 36, name: 'Nidoqueen' },  // stone ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 36
  32: { into: 33,  level: 16, name: 'Nidorino' },
  33: { into: 34,  level: 36, name: 'Nidoking' },   // stone ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 36
  // Fairies / grass
  35: { into: 36,  level: 36, name: 'Clefable' },   // moon stone ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 36
  37: { into: 38,  level: 32, name: 'Ninetales' },  // fire stone ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 32
  39: { into: 40,  level: 36, name: 'Wigglytuff' }, // moon stone ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 36
  // Zubat
  41: { into: 42,  level: 22, name: 'Golbat' },
  // Grass
  43: { into: 44,  level: 21, name: 'Gloom' },
  44: { into: 45,  level: 36, name: 'Vileplume' },  // leaf stone ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 36
  // Parasect / Venomoth
  46: { into: 47,  level: 24, name: 'Parasect' },
  48: { into: 49,  level: 31, name: 'Venomoth' },
  // Diglett / Meowth / Psyduck / Mankey
  50: { into: 51,  level: 26, name: 'Dugtrio' },
  52: { into: 53,  level: 28, name: 'Persian' },
  54: { into: 55,  level: 33, name: 'Golduck' },
  56: { into: 57,  level: 28, name: 'Primeape' },
  // Growlithe
  58: { into: 59,  level: 34, name: 'Arcanine' },   // fire stone ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 34
  // Poliwag
  60: { into: 61,  level: 25, name: 'Poliwhirl' },
  61: { into: 62,  level: 40, name: 'Poliwrath' },  // water stone ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 40
  // Abra / Machop / Bellsprout
  63: { into: 64,  level: 16, name: 'Kadabra' },
  64: { into: 65,  level: 36, name: 'Alakazam' },   // trade ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 36
  66: { into: 67,  level: 28, name: 'Machoke' },
  67: { into: 68,  level: 40, name: 'Machamp' },    // trade ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 40
  69: { into: 70,  level: 21, name: 'Weepinbell' },
  70: { into: 71,  level: 36, name: 'Victreebel' }, // leaf stone ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 36
  // Tentacool / Geodude / Ponyta
  72: { into: 73,  level: 30, name: 'Tentacruel' },
  74: { into: 75,  level: 25, name: 'Graveler' },
  75: { into: 76,  level: 40, name: 'Golem' },      // trade ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 40
  77: { into: 78,  level: 40, name: 'Rapidash' },
  // Slowpoke / Magnemite / Doduo / Seel / Grimer
  79: { into: 80,  level: 37, name: 'Slowbro' },    // water stone in some versions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 37
  81: { into: 82,  level: 30, name: 'Magneton' },
  84: { into: 85,  level: 31, name: 'Dodrio' },
  86: { into: 87,  level: 34, name: 'Dewgong' },
  88: { into: 89,  level: 38, name: 'Muk' },
  // Shellder / Gastly / Onix / Drowzee / Krabby / Voltorb
  90: { into: 91,  level: 36, name: 'Cloyster' },   // water stone ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 36
  92: { into: 93,  level: 25, name: 'Haunter' },
  93: { into: 94,  level: 38, name: 'Gengar' },     // trade ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 38
  95: { into: 208, level: 40, name: 'Steelix' },    // trade ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 40 (Steelix #208)
  96: { into: 97,  level: 26, name: 'Hypno' },
  98: { into: 99,  level: 28, name: 'Kingler' },
  100:{ into: 101, level: 30, name: 'Electrode' },
  // Exeggcute / Cubone / Lickitung / Koffing / Rhyhorn
  102:{ into: 103, level: 36, name: 'Exeggutor' },  // leaf stone ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 36
  104:{ into: 105, level: 28, name: 'Marowak' },
  108:{ into: 463, level: 33, name: 'Lickilicky' }, // lv-up with Rollout ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 33
  109:{ into: 110, level: 35, name: 'Weezing' },
  111:{ into: 112, level: 42, name: 'Rhydon' },
  112:{ into: 464, level: 42, name: 'Rhyperior' },  // trade ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 42
  113:{ into: 242, level: 38, name: 'Blissey' },    // friendship ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 38
  114:{ into: 465, level: 36, name: 'Tangrowth' },  // lv-up with AncientPower ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 36
  // Horsea / Goldeen / Staryu / Scyther / Electabuzz / Magmar / Pinsir
  116:{ into: 117, level: 32, name: 'Seadra' },
  117:{ into: 230, level: 40, name: 'Kingdra' },    // trade ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 40
  118:{ into: 119, level: 33, name: 'Seaking' },
  120:{ into: 121, level: 36, name: 'Starmie' },    // water stone ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 36
  123:{ into: 212, level: 40, name: 'Scizor' },     // trade ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 40 (Scizor #212)
  125:{ into: 466, level: 40, name: 'Electivire' }, // trade ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 40
  126:{ into: 467, level: 40, name: 'Magmortar' },  // trade ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 40
  // Eevee ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â branching, handled separately
  // Porygon chain
  137:{ into: 233, level: 30, name: 'Porygon2' },   // trade ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 30
  233:{ into: 474, level: 40, name: 'Porygon-Z' },  // trade ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 40
  // Omanyte / Kabuto / Aerodactyl (fossils ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â no evolution here)
  138:{ into: 139, level: 40, name: 'Omastar' },
  140:{ into: 141, level: 40, name: 'Kabutops' },
  // Dratini
  129:{ into: 130, level: 20, name: 'Gyarados' },
  147:{ into: 148, level: 30, name: 'Dragonair' },
  148:{ into: 149, level: 55, name: 'Dragonite' },
  // Gen 1 -> Gen 2 cross-gen evolutions
  42: { into: 169, level: 30, name: 'Crobat' },
  // Gen 2 starters
  152:{ into: 153, level: 16, name: 'Bayleef' },
  153:{ into: 154, level: 32, name: 'Meganium' },
  155:{ into: 156, level: 14, name: 'Quilava' },
  156:{ into: 157, level: 36, name: 'Typhlosion' },
  158:{ into: 159, level: 18, name: 'Croconaw' },
  159:{ into: 160, level: 30, name: 'Feraligatr' },
  // Gen 2 routes
  161:{ into: 162, level: 15, name: 'Furret' },
  163:{ into: 164, level: 20, name: 'Noctowl' },
  165:{ into: 166, level: 18, name: 'Ledian' },
  167:{ into: 168, level: 22, name: 'Ariados' },
  170:{ into: 171, level: 27, name: 'Lanturn' },
  172:{ into: 25,  level: 15, name: 'Pikachu' },
  173:{ into: 35,  level: 15, name: 'Clefairy' },
  174:{ into: 39,  level: 15, name: 'Jigglypuff' },
  175:{ into: 176, level: 15, name: 'Togetic' },
  176:{ into: 468, level: 40, name: 'Togekiss' },   // shiny stone ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 40
  177:{ into: 178, level: 25, name: 'Xatu' },
  179:{ into: 180, level: 15, name: 'Flaaffy' },
  180:{ into: 181, level: 30, name: 'Ampharos' },
  183:{ into: 184, level: 18, name: 'Azumarill' },
  187:{ into: 188, level: 18, name: 'Skiploom' },
  188:{ into: 189, level: 27, name: 'Jumpluff' },
  191:{ into: 192, level: 30, name: 'Sunflora' },
  194:{ into: 195, level: 20, name: 'Quagsire' },
  204:{ into: 205, level: 31, name: 'Forretress' },
  209:{ into: 210, level: 23, name: 'Granbull' },
  190:{ into: 424, level: 32, name: 'Ambipom' },    // lv-up with Double Hit ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 32
  193:{ into: 469, level: 33, name: 'Yanmega' },    // lv-up with AncientPower ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 33
  198:{ into: 430, level: 36, name: 'Honchkrow' },  // dusk stone ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 36
  200:{ into: 429, level: 36, name: 'Mismagius' },  // dusk stone ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 36
  207:{ into: 472, level: 40, name: 'Gliscor' },    // item at night ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 40
  215:{ into: 461, level: 40, name: 'Weavile' },
  216:{ into: 217, level: 30, name: 'Ursaring' },
  218:{ into: 219, level: 38, name: 'Magcargo' },
  220:{ into: 221, level: 33, name: 'Piloswine' },
  221:{ into: 473, level: 40, name: 'Mamoswine' },  // lv-up with AncientPower ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 40
  223:{ into: 224, level: 25, name: 'Octillery' },
  228:{ into: 229, level: 24, name: 'Houndoom' },
  231:{ into: 232, level: 25, name: 'Donphan' },
  236:{ into: 237, level: 20, name: 'Hitmontop' },
  238:{ into: 124, level: 30, name: 'Jynx' },
  239:{ into: 125, level: 30, name: 'Electabuzz' },
  240:{ into: 126, level: 30, name: 'Magmar' },
  246:{ into: 247, level: 30, name: 'Pupitar' },
  247:{ into: 248, level: 55, name: 'Tyranitar' },
  360:{ into: 202, level: 15, name: 'Wobbuffet' },
  // Gen 3 starters
  252:{ into: 253, level: 16, name: 'Grovyle' },
  253:{ into: 254, level: 36, name: 'Sceptile' },
  255:{ into: 256, level: 16, name: 'Combusken' },
  256:{ into: 257, level: 36, name: 'Blaziken' },
  258:{ into: 259, level: 16, name: 'Marshtomp' },
  259:{ into: 260, level: 36, name: 'Swampert' },
  // Gen 3 routes
  261:{ into: 262, level: 18, name: 'Mightyena' },
  263:{ into: 264, level: 20, name: 'Linoone' },
  265:{ into: 266, level: 7,  name: 'Silcoon' },
  266:{ into: 267, level: 10, name: 'Beautifly' },
  268:{ into: 269, level: 10, name: 'Dustox' },
  270:{ into: 271, level: 14, name: 'Lombre' },
  271:{ into: 272, level: 30, name: 'Ludicolo' },
  273:{ into: 274, level: 14, name: 'Nuzleaf' },
  274:{ into: 275, level: 30, name: 'Shiftry' },
  276:{ into: 277, level: 22, name: 'Swellow' },
  278:{ into: 279, level: 25, name: 'Pelipper' },
  280:{ into: 281, level: 20, name: 'Kirlia' },
  281:{ into: 282, level: 30, name: 'Gardevoir' },
  283:{ into: 284, level: 22, name: 'Masquerain' },
  285:{ into: 286, level: 23, name: 'Breloom' },
  287:{ into: 288, level: 18, name: 'Vigoroth' },
  288:{ into: 289, level: 36, name: 'Slaking' },
  290:{ into: 291, level: 20, name: 'Ninjask' },
  293:{ into: 294, level: 20, name: 'Loudred' },
  294:{ into: 295, level: 40, name: 'Exploud' },
  296:{ into: 297, level: 24, name: 'Hariyama' },
  298:{ into: 183, level: 15, name: 'Marill' },
  299:{ into: 476, level: 36, name: 'Probopass' },  // magnetic field ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 36
  300:{ into: 301, level: 30, name: 'Delcatty' },
  304:{ into: 305, level: 32, name: 'Lairon' },
  305:{ into: 306, level: 42, name: 'Aggron' },
  307:{ into: 308, level: 37, name: 'Medicham' },
  309:{ into: 310, level: 26, name: 'Manectric' },
  315:{ into: 407, level: 40, name: 'Roserade' },   // shiny stone ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 40
  316:{ into: 317, level: 26, name: 'Swalot' },
  318:{ into: 319, level: 30, name: 'Sharpedo' },
  320:{ into: 321, level: 40, name: 'Wailord' },
  322:{ into: 323, level: 33, name: 'Camerupt' },
  325:{ into: 326, level: 32, name: 'Grumpig' },
  328:{ into: 329, level: 35, name: 'Vibrava' },
  329:{ into: 330, level: 45, name: 'Flygon' },
  331:{ into: 332, level: 32, name: 'Cacturne' },
  333:{ into: 334, level: 35, name: 'Altaria' },
  339:{ into: 340, level: 30, name: 'Whiscash' },
  341:{ into: 342, level: 30, name: 'Crawdaunt' },
  343:{ into: 344, level: 36, name: 'Claydol' },
  345:{ into: 346, level: 40, name: 'Cradily' },
  347:{ into: 348, level: 40, name: 'Armaldo' },
  349:{ into: 350, level: 35, name: 'Milotic' },
  353:{ into: 354, level: 37, name: 'Banette' },
  355:{ into: 356, level: 37, name: 'Dusclops' },
  356:{ into: 477, level: 40, name: 'Dusknoir' },   // trade ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 40
  361:{ into: 362, level: 42, name: 'Glalie' },
  363:{ into: 364, level: 32, name: 'Sealeo' },
  364:{ into: 365, level: 44, name: 'Walrein' },
  371:{ into: 372, level: 30, name: 'Shelgon' },
  372:{ into: 373, level: 50, name: 'Salamence' },
  374:{ into: 375, level: 20, name: 'Metang' },
  375:{ into: 376, level: 45, name: 'Metagross' },
  // Gen 4
  387:{ into: 388, level: 18, name: 'Grotle' },
  388:{ into: 389, level: 32, name: 'Torterra' },
  390:{ into: 391, level: 14, name: 'Monferno' },
  391:{ into: 392, level: 36, name: 'Infernape' },
  393:{ into: 394, level: 16, name: 'Prinplup' },
  394:{ into: 395, level: 36, name: 'Empoleon' },
  396:{ into: 397, level: 14, name: 'Staravia' },
  397:{ into: 398, level: 34, name: 'Staraptor' },
  399:{ into: 400, level: 15, name: 'Bibarel' },
  401:{ into: 402, level: 10, name: 'Kricketune' },
  403:{ into: 404, level: 15, name: 'Luxio' },
  404:{ into: 405, level: 30, name: 'Luxray' },
  406:{ into: 315, level: 18, name: 'Roselia' },
  408:{ into: 409, level: 30, name: 'Rampardos' },
  410:{ into: 411, level: 30, name: 'Bastiodon' },
  415:{ into: 416, level: 21, name: 'Vespiquen' },
  418:{ into: 419, level: 26, name: 'Floatzel' },
  420:{ into: 421, level: 25, name: 'Cherrim' },
  422:{ into: 423, level: 30, name: 'Gastrodon' },
  425:{ into: 426, level: 28, name: 'Drifblim' },
  427:{ into: 428, level: 28, name: 'Lopunny' },
  431:{ into: 432, level: 38, name: 'Purugly' },
  434:{ into: 435, level: 34, name: 'Skuntank' },
  436:{ into: 437, level: 33, name: 'Bronzong' },
  443:{ into: 444, level: 24, name: 'Gabite' },
  444:{ into: 445, level: 48, name: 'Garchomp' },
  438:{ into: 185, level: 16, name: 'Sudowoodo' },  // lv-up with Mimic ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 16
  439:{ into: 122, level: 18, name: 'Mr. Mime' },   // lv-up with Mimic ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 18
  440:{ into: 113, level: 12, name: 'Chansey' },    // friendship ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 12
  446:{ into: 143, level: 32, name: 'Snorlax' },
  447:{ into: 448, level: 32, name: 'Lucario' },
  449:{ into: 450, level: 34, name: 'Hippowdon' },
  451:{ into: 452, level: 40, name: 'Drapion' },
  453:{ into: 454, level: 37, name: 'Toxicroak' },
  456:{ into: 457, level: 31, name: 'Lumineon' },
  458:{ into: 226, level: 32, name: 'Mantine' },    // lv-up with Remoraid in party ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ lv 32
  459:{ into: 460, level: 40, name: 'Abomasnow' },
  // Gen 5
  495:{ into: 496, level: 17, name: 'Servine' },
  496:{ into: 497, level: 36, name: 'Serperior' },
  498:{ into: 499, level: 17, name: 'Pignite' },
  499:{ into: 500, level: 36, name: 'Emboar' },
  501:{ into: 502, level: 17, name: 'Dewott' },
  502:{ into: 503, level: 36, name: 'Samurott' },
  504:{ into: 505, level: 20, name: 'Watchog' },
  506:{ into: 507, level: 16, name: 'Herdier' },
  507:{ into: 508, level: 32, name: 'Stoutland' },
  509:{ into: 510, level: 20, name: 'Liepard' },
  517:{ into: 518, level: 30, name: 'Musharna' },
  519:{ into: 520, level: 21, name: 'Tranquill' },
  520:{ into: 521, level: 32, name: 'Unfezant' },
  522:{ into: 523, level: 27, name: 'Zebstrika' },
  524:{ into: 525, level: 25, name: 'Boldore' },
  525:{ into: 526, level: 40, name: 'Gigalith' },
  527:{ into: 528, level: 32, name: 'Swoobat' },
  529:{ into: 530, level: 31, name: 'Excadrill' },
  532:{ into: 533, level: 25, name: 'Gurdurr' },
  533:{ into: 534, level: 40, name: 'Conkeldurr' },
  535:{ into: 536, level: 25, name: 'Palpitoad' },
  536:{ into: 537, level: 36, name: 'Seismitoad' },
  540:{ into: 541, level: 20, name: 'Swadloon' },
  541:{ into: 542, level: 30, name: 'Leavanny' },
  543:{ into: 544, level: 22, name: 'Whirlipede' },
  544:{ into: 545, level: 30, name: 'Scolipede' },
  546:{ into: 547, level: 32, name: 'Whimsicott' },
  548:{ into: 549, level: 28, name: 'Lilligant' },
  551:{ into: 552, level: 29, name: 'Krokorok' },
  552:{ into: 553, level: 40, name: 'Krookodile' },
  554:{ into: 555, level: 35, name: 'Darmanitan' },
  557:{ into: 558, level: 34, name: 'Crustle' },
  559:{ into: 560, level: 39, name: 'Scrafty' },
  562:{ into: 563, level: 34, name: 'Cofagrigus' },
  564:{ into: 565, level: 37, name: 'Carracosta' },
  566:{ into: 567, level: 37, name: 'Archeops' },
  568:{ into: 569, level: 36, name: 'Garbodor' },
  570:{ into: 571, level: 30, name: 'Zoroark' },
  572:{ into: 573, level: 25, name: 'Cinccino' },
  574:{ into: 575, level: 32, name: 'Gothorita' },
  575:{ into: 576, level: 41, name: 'Gothitelle' },
  577:{ into: 578, level: 32, name: 'Duosion' },
  578:{ into: 579, level: 41, name: 'Reuniclus' },
  580:{ into: 581, level: 35, name: 'Swanna' },
  582:{ into: 583, level: 35, name: 'Vanillish' },
  583:{ into: 584, level: 47, name: 'Vanilluxe' },
  585:{ into: 586, level: 34, name: 'Sawsbuck' },
  588:{ into: 589, level: 30, name: 'Escavalier' },
  590:{ into: 591, level: 39, name: 'Amoonguss' },
  592:{ into: 593, level: 40, name: 'Jellicent' },
  595:{ into: 596, level: 36, name: 'Galvantula' },
  597:{ into: 598, level: 40, name: 'Ferrothorn' },
  599:{ into: 600, level: 38, name: 'Klang' },
  600:{ into: 601, level: 49, name: 'Klinklang' },
  602:{ into: 603, level: 39, name: 'Eelektrik' },
  603:{ into: 604, level: 50, name: 'Eelektross' },
  605:{ into: 606, level: 42, name: 'Beheeyem' },
  607:{ into: 608, level: 41, name: 'Lampent' },
  608:{ into: 609, level: 55, name: 'Chandelure' },
  610:{ into: 611, level: 38, name: 'Fraxure' },
  611:{ into: 612, level: 48, name: 'Haxorus' },
  613:{ into: 614, level: 37, name: 'Beartic' },
  616:{ into: 617, level: 30, name: 'Accelgor' },
  619:{ into: 620, level: 50, name: 'Mienshao' },
  622:{ into: 623, level: 43, name: 'Golurk' },
  624:{ into: 625, level: 52, name: 'Bisharp' },
  627:{ into: 628, level: 54, name: 'Braviary' },
  629:{ into: 630, level: 54, name: 'Mandibuzz' },
  633:{ into: 634, level: 50, name: 'Zweilous' },
  634:{ into: 635, level: 64, name: 'Hydreigon' },
  636:{ into: 637, level: 59, name: 'Volcarona' },
};

// Returns the minimum realistic level for a species based on its evolution chain.
// e.g. Charizard (id 6) evolved from Charmeleon at lv 36, so its min is 36.
function minLevelForSpecies(speciesId) {
  for (const evo of Object.values(EVOLUTIONS)) {
    if (evo.into === speciesId) return evo.level;
  }
  return 1;
}

// Returns true if the species can still evolve (i.e. is not fully evolved)
function canEvolve(speciesId) {
  return speciesId in EVOLUTIONS || speciesId in BRANCHING_EVOLUTIONS;
}

// Returns the correct species ID for a given level by walking the evolution chain.
// Advances forward if level meets thresholds; retreats backward if level is too low.
function resolveEvoForLevel(speciesId, level) {
  let id = speciesId;
  while (EVOLUTIONS[id] && level >= EVOLUTIONS[id].level)
    id = EVOLUTIONS[id].into;
  let changed = true;
  while (changed) {
    changed = false;
    for (const [pre, evo] of Object.entries(EVOLUTIONS)) {
      if (evo.into === id && level < evo.level) { id = Number(pre); changed = true; break; }
    }
  }
  return id;
}

// Branching evolution options for all multi-path Pokemon (shown as a player choice)
const BRANCHING_EVOLUTIONS = {
  133: [ // Eevee
    { into: 136, level: 20, name: 'Flareon',   types: ['Fire'] },
    { into: 134, level: 20, name: 'Vaporeon',  types: ['Water'] },
    { into: 135, level: 20, name: 'Jolteon',   types: ['Electric'] },
    { into: 196, level: 20, name: 'Espeon',    types: ['Psychic'] },
    { into: 197, level: 20, name: 'Umbreon',   types: ['Dark'] },
    { into: 470, level: 20, name: 'Leafeon',   types: ['Grass'] },
    { into: 471, level: 20, name: 'Glaceon',   types: ['Ice'] },
  ],
  44: [ // Gloom
    { into: 45,  level: 36, name: 'Vileplume', types: ['Grass', 'Poison'] },
    { into: 182, level: 36, name: 'Bellossom', types: ['Grass'] },
  ],
  79: [ // Slowpoke
    { into: 80,  level: 37, name: 'Slowbro',   types: ['Water', 'Psychic'] },
    { into: 199, level: 37, name: 'Slowking',  types: ['Water', 'Psychic'] },
  ],
  61: [ // Poliwhirl
    { into: 62,  level: 40, name: 'Poliwrath', types: ['Water', 'Fighting'] },
    { into: 186, level: 40, name: 'Politoed',  types: ['Water'] },
  ],
  281: [ // Kirlia
    { into: 282, level: 30, name: 'Gardevoir', types: ['Psychic', 'Fairy'] },
    { into: 475, level: 30, name: 'Gallade',   types: ['Psychic', 'Fighting'] },
  ],
  361: [ // Snorunt
    { into: 362, level: 42, name: 'Glalie',    types: ['Ice'] },
    { into: 478, level: 42, name: 'Froslass',  types: ['Ice', 'Ghost'] },
  ],
  236: [ // Tyrogue
    { into: 106, level: 20, name: 'Hitmonlee',  types: ['Fighting'] },
    { into: 107, level: 20, name: 'Hitmonchan', types: ['Fighting'] },
    { into: 237, level: 20, name: 'Hitmontop',  types: ['Fighting'] },
  ],
  265: [ // Wurmple
    { into: 266, level: 7, name: 'Silcoon', types: ['Bug'] },
    { into: 268, level: 7, name: 'Cascoon', types: ['Bug'] },
  ],
};

// ---- Achievements ----

const ACHIEVEMENTS = [
  { id: 'gym_0', name: 'Boulder Basher',    desc: 'Clear Map 1 and defeat Brock',                                           icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂªÃƒâ€šÃ‚Â¨', category: 'normal' },
  { id: 'gym_1', name: 'Cascade Crusher',   desc: 'Clear Map 2 and defeat Misty',                                           icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â§', category: 'normal' },
  { id: 'gym_2', name: 'Thunder Tamer',     desc: 'Clear Map 3 and defeat Lt. Surge',                                       icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã‚Â¡Ãƒâ€šÃ‚Â¡', category: 'normal' },
  { id: 'gym_3', name: 'Rainbow Ranger',    desc: 'Clear Map 4 and defeat Erika',                                           icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â¿', category: 'normal' },
  { id: 'gym_4', name: 'Soul Crusher',      desc: 'Clear Map 5 and defeat Koga',                                            icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€¦Ã¢â‚¬Å“', category: 'normal' },
  { id: 'gym_5', name: 'Mind Breaker',      desc: 'Clear Map 6 and defeat Sabrina',                                         icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â®', category: 'normal' },
  { id: 'gym_6', name: 'Volcano Victor',    desc: 'Clear Map 7 and defeat Blaine',                                          icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹', category: 'normal' },
  { id: 'gym_7', name: 'Earth Shaker',      desc: 'Clear Map 8 and defeat Giovanni',                                        icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â', category: 'normal' },
  { id: 'elite_four', name: 'Pokemon Master',    desc: 'Defeat all 4 Elite Four members and the Champion to beat the game', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“', category: 'normal' },
  { id: 'elite_10',   name: 'Champion League',   desc: 'Beat the game 10 times total',                                      icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ', category: 'normal' },
  { id: 'elite_100',  name: 'Immortal Champion', desc: 'Beat the game 100 times total',                                     icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€¦Ã‚Â½', category: 'normal' },
  { id: 'starter_1', name: 'Grass Champion',  desc: 'Choose Bulbasaur as your starter and beat the game',                   icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â±', category: 'normal' },
  { id: 'starter_4', name: 'Fire Champion',   desc: 'Choose Charmander as your starter and beat the game',                  icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¥', category: 'normal' },
  { id: 'starter_7', name: 'Water Champion',  desc: 'Choose Squirtle as your starter and beat the game',                    icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€¦Ã‚Â ', category: 'normal' },
  { id: 'starter_152', name: 'Leaf Champion II',  desc: 'Choose Chikorita as your starter and beat the game',               icon: 'ÃƒÂ°Ã…Â¸Ã‚ÂÃ†â€™', category: 'normal' },
  { id: 'starter_155', name: 'Flame Champion II', desc: 'Choose Cyndaquil as your starter and beat the game',              icon: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥', category: 'normal' },
  { id: 'starter_158', name: 'Wave Champion II',  desc: 'Choose Totodile as your starter and beat the game',               icon: 'ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â ', category: 'normal' },
  { id: 'starter_252', name: 'Forest Champion',   desc: 'Choose Treecko as your starter and beat the game',                icon: 'ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¿', category: 'normal' },
  { id: 'starter_255', name: 'Blaze Champion',    desc: 'Choose Torchic as your starter and beat the game',                icon: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥', category: 'normal' },
  { id: 'starter_258', name: 'Tide Champion',     desc: 'Choose Mudkip as your starter and beat the game',                 icon: 'ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â ', category: 'normal' },
  { id: 'starter_387', name: 'Grove Champion',    desc: 'Choose Turtwig as your starter and beat the game',                icon: 'ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±', category: 'normal' },
  { id: 'starter_390', name: 'Inferno Champion',  desc: 'Choose Chimchar as your starter and beat the game',               icon: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥', category: 'normal' },
  { id: 'starter_393', name: 'Current Champion',  desc: 'Choose Piplup as your starter and beat the game',                 icon: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§', category: 'normal' },
  { id: 'starter_495', name: 'Verdant Champion',  desc: 'Choose Snivy as your starter and beat the game',                  icon: 'ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¿', category: 'normal' },
  { id: 'starter_498', name: 'Forge Champion',    desc: 'Choose Tepig as your starter and beat the game',                  icon: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥', category: 'normal' },
  { id: 'starter_501', name: 'Torrent Champion',  desc: 'Choose Oshawott as your starter and beat the game',               icon: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§', category: 'normal' },
  { id: 'starter_650', name: 'Verdure Champion',  desc: 'Choose Chespin as your starter and beat the game',                icon: 'ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¿', category: 'normal' },
  { id: 'starter_653', name: 'Emberfox Champion', desc: 'Choose Fennekin as your starter and beat the game',               icon: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥', category: 'normal' },
  { id: 'starter_656', name: 'Ripple Champion',   desc: 'Choose Froakie as your starter and beat the game',                icon: 'ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§', category: 'normal' },
  { id: 'solo_run',    name: 'One is Enough',        desc: 'Beat the game while keeping only 1 PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon on your team',       icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€šÃ‚Â­Ãƒâ€šÃ‚Â', category: 'normal' },
  { id: 'nuzlocke_win',      name: 'True Master',    desc: 'Enable Nuzlocke Mode in Settings, then beat the game ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â if any PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon faints, it\'s gone for good', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€¹Ã…â€œÃƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â', category: 'normal' },
  { id: 'three_birds',       name: 'Bird Keeper',    desc: 'Beat the game with Articuno, Zapdos, and Moltres all on your team', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦', category: 'normal' },
  { id: 'no_pokecenter',     name: 'No Rest for the Wicked', desc: 'Beat the game without stopping at a PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon Center',   icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢', category: 'normal' },
  { id: 'no_items',          name: 'Minimalist',     desc: 'Beat the game without picking up a single item',                icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã‚Â½ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢', category: 'normal' },
  { id: 'type_quartet',      name: 'Type Supremacy', desc: 'Beat the game with at least 4 of your 6 PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon sharing the same type', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â£', category: 'normal' },
  { id: 'all_shiny_win',     name: 'Shiny Squad',    desc: 'Beat the game with every PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon on your team being shiny (minimum 3)', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â«', category: 'normal' },
  { id: 'back_to_back',      name: 'On a Roll',        desc: 'Beat the game twice in a row without losing a run in between',       icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â', category: 'normal' },
  { id: 'back_3_back',       name: 'Hat Trick',        desc: 'Beat the game three times in a row without losing a run in between',    icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã‚Â½Ãƒâ€šÃ‚Â©', category: 'normal' },
  { id: 'endless_stage_1',  name: 'Kanto Champion',  desc: 'Defeat Ash Ketchum and clear Stage 1 of Endless Mode',   icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬', category: 'tower' },
  { id: 'endless_stage_2',  name: 'Johto Champion',  desc: 'Defeat Lance and clear Stage 2 of Endless Mode',          icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€¦Ã‚Â ', category: 'tower' },
  { id: 'endless_stage_3',  name: 'Hoenn Champion',  desc: 'Defeat Steven Stone and clear Stage 3 of Endless Mode',   icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã‚Â¡ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â', category: 'tower' },
  { id: 'endless_stage_4',  name: 'Sinnoh Champion', desc: 'Defeat Cynthia and clear Stage 4 of Endless Mode',        icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€¦Ã‚Â½', category: 'tower' },
  { id: 'endless_stage_5',  name: 'Unova Champion',  desc: 'Defeat N and clear Stage 5 of Endless Mode',              icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦', category: 'tower' },
  { id: 'starters_stage_1', name: "Oak's Challenge",     desc: 'Win an Endless Mode Stage 1 run starting with Bulbasaur, Charmander, or Squirtle',  icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â¿', category: 'tower' },
  { id: 'starters_stage_2', name: "Elm's Challenge",     desc: 'Win an Endless Mode Stage 2 run starting with Chikorita, Cyndaquil, or Totodile',   icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢', category: 'tower' },
  { id: 'starters_stage_3', name: "Birch's Challenge",   desc: 'Win an Endless Mode Stage 3 run starting with Treecko, Torchic, or Mudkip',         icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€¦Ã‚Â ', category: 'tower' },
  { id: 'starters_stage_4', name: "Rowan's Challenge",   desc: 'Win an Endless Mode Stage 4 run starting with Turtwig, Chimchar, or Piplup',        icon: 'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂºÃƒâ€šÃ‚Â°ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â', category: 'tower' },
  { id: 'starters_stage_5', name: "Juniper's Challenge", desc: 'Win an Endless Mode Stage 5 run starting with Snivy, Tepig, or Oshawott',           icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬', category: 'tower' },
  { id: 'pokedex_complete',  name: 'Gotta Catch \'Em All', desc: 'Catch all Gen 1 PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon across any number of runs', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“', category: 'general' },
  { id: 'shinydex_complete', name: 'Shiny Hunter',         desc: 'Catch a shiny version of every Gen 1 PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon',         icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã¢â‚¬Å“Ãƒâ€šÃ‚Â¨', category: 'general' },
  { id: 'shinydex_all',      name: 'Ultimate Shiny Hunter', desc: 'Catch a shiny version of every PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon across all gens', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€¦Ã‚Â¸', category: 'general' },
  { id: 'pokedex_gen2', name: 'Johto Completionist', desc: 'Catch all Gen 2 PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon across any number of runs', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â', category: 'general' },
  { id: 'pokedex_gen3', name: 'Hoenn Completionist', desc: 'Catch all Gen 3 PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon across any number of runs', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒâ€¹Ã…â€œ', category: 'general' },
  { id: 'pokedex_gen4', name: 'Sinnoh Completionist', desc: 'Catch all Gen 4 PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon across any number of runs', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢', category: 'general' },
  { id: 'pokedex_gen5', name: 'Unova Completionist',  desc: 'Catch all Gen 5 PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon across any number of runs', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢', category: 'general' },
  { id: 'pokedex_gen6', name: 'Kalos Completionist',  desc: 'Catch all Gen 6 PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon across any number of runs', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢', category: 'general' },
  { id: 'max_stats_1',   name: 'First Peak',       desc: 'Max out 1 stat on a single PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon',        icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒâ€¹Ã¢â‚¬Â ', category: 'general' },
  { id: 'max_stats_2',   name: 'Double Peak',      desc: 'Max out 2 stats on a single PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon',       icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒâ€¦Ã‚Â ', category: 'general' },
  { id: 'max_stats_3',   name: 'Triple Peak',      desc: 'Max out 3 stats on a single PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon',       icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â', category: 'general' },
  { id: 'max_stats_4',   name: 'Quad Peak',        desc: 'Max out 4 stats on a single PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon',       icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Âª', category: 'general' },
  { id: 'max_stats_all', name: 'Perfect Specimen',  desc: 'Max out all 5 stats on a single PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon',   icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦', category: 'general' },
  { id: 'shinydex_100', name: 'Shiny Spark',      desc: 'Catch 100 different shiny PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon',  icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€šÃ‚Â­Ãƒâ€šÃ‚Â', category: 'general' },
  { id: 'shinydex_200', name: 'Shiny Flash',      desc: 'Catch 200 different shiny PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon',  icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€šÃ‚Â¥', category: 'general' },
  { id: 'shinydex_300', name: 'Shiny Blaze',      desc: 'Catch 300 different shiny PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon',  icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒâ€šÃ‚Â¥', category: 'general' },
  { id: 'shinydex_400', name: 'Shiny Storm',      desc: 'Catch 400 different shiny PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon',  icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã‚Â¡Ãƒâ€šÃ‚Â¡', category: 'general' },
  { id: 'shinydex_500', name: 'Shiny Legend',     desc: 'Catch 500 different shiny PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon',  icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€¦Ã‚Â½', category: 'general' },
  { id: 'shinydex_600', name: 'Shiny Immortal',   desc: 'Catch 600 different shiny PokÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mon',  icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“ÃƒÂ¢Ã¢â€šÂ¬Ã‹Å“', category: 'general' },
];

const ACHIEVEMENT_OVERRIDES = {
  gym_0: { name: 'Pewter Breakthrough', desc: 'Earn your first Kanto badge by clearing Map 1 and defeating Brock' },
  gym_1: { name: 'Cerulean Current', desc: 'Earn your second Kanto badge by clearing Map 2 and defeating Misty' },
  gym_2: { name: 'Vermilion Voltage', desc: 'Earn your third Kanto badge by clearing Map 3 and defeating Lt. Surge' },
  gym_3: { name: 'Celadon Bloom', desc: 'Earn your fourth Kanto badge by clearing Map 4 and defeating Erika' },
  gym_4: { name: 'Fuchsia Venom', desc: 'Earn your fifth Kanto badge by clearing Map 5 and defeating Koga' },
  gym_5: { name: 'Saffron Shift', desc: 'Earn your sixth Kanto badge by clearing Map 6 and defeating Sabrina' },
  gym_6: { name: 'Cinnabar Trial', desc: 'Earn your seventh Kanto badge by clearing Map 7 and defeating Blaine' },
  gym_7: { name: 'Earth Badge Rising', desc: 'Earn your eighth Kanto badge by clearing Map 8 and defeating Giovanni' },
  elite_four: { name: 'RogueMon Champion', desc: 'Defeat the Elite Four and Champion to finish a full story run' },
  elite_10: { name: 'League Veteran', desc: 'Finish 10 full story runs' },
  elite_100: { name: 'Hall of Legends', desc: 'Finish 100 full story runs' },
  starter_1: { name: 'Leafbound Victory', desc: 'Beat a full story run with Bulbasaur as your starter' },
  starter_4: { name: 'Emberbound Victory', desc: 'Beat a full story run with Charmander as your starter' },
  starter_7: { name: 'Tidebound Victory', desc: 'Beat a full story run with Squirtle as your starter' },
  starter_152: { name: 'Johto Bloom', desc: 'Beat a full story run with Chikorita as your starter' },
  starter_155: { name: 'Johto Blaze', desc: 'Beat a full story run with Cyndaquil as your starter' },
  starter_158: { name: 'Johto Tide', desc: 'Beat a full story run with Totodile as your starter' },
  starter_252: { name: 'Hoenn Grove', desc: 'Beat a full story run with Treecko as your starter' },
  starter_255: { name: 'Hoenn Flame', desc: 'Beat a full story run with Torchic as your starter' },
  starter_258: { name: 'Hoenn Surf', desc: 'Beat a full story run with Mudkip as your starter' },
  starter_387: { name: 'Sinnoh Root', desc: 'Beat a full story run with Turtwig as your starter' },
  starter_390: { name: 'Sinnoh Spark', desc: 'Beat a full story run with Chimchar as your starter' },
  starter_393: { name: 'Sinnoh Tide', desc: 'Beat a full story run with Piplup as your starter' },
  starter_495: { name: 'Unova Vine', desc: 'Beat a full story run with Snivy as your starter' },
  starter_498: { name: 'Unova Ember', desc: 'Beat a full story run with Tepig as your starter' },
  starter_501: { name: 'Unova Wave', desc: 'Beat a full story run with Oshawott as your starter' },
  starter_650: { name: 'Kalos Canopy', desc: 'Beat a full story run with Chespin as your starter' },
  starter_653: { name: 'Kalos Flame', desc: 'Beat a full story run with Fennekin as your starter' },
  starter_656: { name: 'Kalos Current', desc: 'Beat a full story run with Froakie as your starter' },
  pokedex_complete: { name: 'Kanto Archive' },
  shinydex_complete: { name: 'Kanto Starlight' },
  shinydex_all: { name: 'Prismatic Archive', desc: 'Catch a shiny version of every Pokemon across all available generations' },
  pokedex_gen2: { name: 'Johto Archive' },
  pokedex_gen3: { name: 'Hoenn Archive' },
  pokedex_gen4: { name: 'Sinnoh Archive' },
  pokedex_gen5: { name: 'Unova Archive' },
  pokedex_gen6: { name: 'Kalos Archive' },
};

ACHIEVEMENTS.forEach(achievement => {
  if (ACHIEVEMENT_OVERRIDES[achievement.id]) {
    Object.assign(achievement, ACHIEVEMENT_OVERRIDES[achievement.id]);
  }
});

ACHIEVEMENTS.push(
  { id: 'story_region_1', name: 'Kanto Crown', desc: 'Defeat the Kanto League in story mode', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â¥ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¡', category: 'normal' },
  { id: 'story_region_2', name: 'Johto Crown', desc: 'Defeat the Johto League in story mode', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€šÃ‚Â¿', category: 'normal' },
  { id: 'story_region_3', name: 'Hoenn Crown', desc: 'Defeat the Hoenn League in story mode', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€¦Ã‚Â ', category: 'normal' },
  { id: 'story_region_4', name: 'Sinnoh Crown', desc: 'Defeat the Sinnoh League in story mode', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢Ãƒâ€¦Ã‚Â½', category: 'normal' },
  { id: 'story_region_5', name: 'Unova Crown', desc: 'Defeat the Unova League in story mode', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦', category: 'normal' },
  { id: 'story_region_6', name: 'Kalos Crown', desc: 'Defeat the Kalos League in story mode', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã¢â‚¬Å“Ãƒâ€šÃ‚Â¨', category: 'normal' },
  { id: 'story_trio_1', name: 'Kanto Trio Run', desc: 'Win Kanto story runs with Bulbasaur, Charmander, and Squirtle across any number of runs', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€¹Ã¢â‚¬Â ', category: 'normal' },
  { id: 'story_trio_2', name: 'Johto Trio Run', desc: 'Win Johto story runs with Chikorita, Cyndaquil, and Totodile across any number of runs', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂÃƒâ€ Ã¢â‚¬â„¢', category: 'normal' },
  { id: 'story_trio_3', name: 'Hoenn Trio Run', desc: 'Win Hoenn story runs with Treecko, Torchic, and Mudkip across any number of runs', icon: 'ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã‚Â¡ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â', category: 'normal' },
  { id: 'story_trio_4', name: 'Sinnoh Trio Run', desc: 'Win Sinnoh story runs with Turtwig, Chimchar, and Piplup across any number of runs', icon: 'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂºÃƒâ€šÃ‚Â°ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â', category: 'normal' },
  { id: 'story_trio_5', name: 'Unova Trio Run', desc: 'Win Unova story runs with Snivy, Tepig, and Oshawott across any number of runs', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬', category: 'normal' },
  { id: 'story_trio_6', name: 'Kalos Trio Run', desc: 'Win Kalos story runs with Chespin, Fennekin, and Froakie across any number of runs', icon: 'ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬ÂÃƒâ€šÃ‚Â¼', category: 'normal' },
);

function getUnlockedAchievements() {
  try { return new Set(JSON.parse(localStorage.getItem('poke_achievements') || '[]')); }
  catch { return new Set(); }
}

function unlockAchievement(id) {
  const unlocked = getUnlockedAchievements();
  if (unlocked.has(id)) return null;
  unlocked.add(id);
  localStorage.setItem('poke_achievements', JSON.stringify([...unlocked]));
  return ACHIEVEMENTS.find(a => a.id === id) || null;
}

// ---- Pokedex ----

function getPokedex() {
  try { return JSON.parse(localStorage.getItem('poke_dex') || '{}'); }
  catch { return {}; }
}

function markPokedexSeen(id, name, types, spriteUrl) {
  if (!id) return;
  const dex = getPokedex();
  if (!dex[id]) {
    const cached = getCached(`pkrl_poke_${id}`);
    const localizedNames = normalizeLocalizedPokemonNames(
      cached?.localizedNames,
      name || cached?.defaultName || cached?.name
    );
    dex[id] = {
      id,
      name: getPokemonLocalizedName({ id, localizedNames, defaultName: localizedNames.en }),
      defaultName: localizedNames.en,
      localizedNames,
      types,
      spriteUrl,
      caught: false
    };
    localStorage.setItem('poke_dex', JSON.stringify(dex));
  }
}

function markPokedexCaught(id, name, types, spriteUrl, localizedNames = null) {
  if (!id) return;
  const dex = getPokedex();
  const cached = getCached(`pkrl_poke_${id}`);
  const resolvedNames = normalizeLocalizedPokemonNames(
    localizedNames || dex[id]?.localizedNames || cached?.localizedNames,
    name || dex[id]?.defaultName || cached?.defaultName || dex[id]?.name || cached?.name
  );
  dex[id] = { ...(dex[id] || {}), id, caught: true,
    name:      getPokemonLocalizedName({ id, localizedNames: resolvedNames, defaultName: resolvedNames.en }),
    defaultName: resolvedNames.en,
    localizedNames: resolvedNames,
    types:     types     || dex[id]?.types,
    spriteUrl: spriteUrl || dex[id]?.spriteUrl,
  };
  localStorage.setItem('poke_dex', JSON.stringify(dex));
}

function getShinyDex() {
  try { return JSON.parse(localStorage.getItem('poke_shiny_dex') || '{}'); }
  catch { return {}; }
}

function hasNuzlockeModeWin() {
  return getUnlockedAchievements().has('nuzlocke_win');
}

function getEliteWins() {
  return parseInt(localStorage.getItem('poke_elite_wins') || '0', 10);
}

function incrementEliteWins() {
  const wins = getEliteWins() + 1;
  localStorage.setItem('poke_elite_wins', String(wins));
  return wins;
}

// Returns an <img> for the item's official sprite, falling back to its emoji if the sprite 404s
function itemIconHtml(item, size = 24) {
  const slug = item.id.replace(/_/g, '-');
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${slug}.png`;
  const esc = item.icon.replace(/'/g, "\\'");
  return `<img src="${url}" alt="${item.name}" title="${item.name}" class="item-sprite-icon" `
       + `style="width:${size}px;height:${size}px;image-rendering:pixelated;vertical-align:middle;" `
       + `onerror="this.replaceWith(document.createTextNode('${esc}'))">`;
}

function isShinyGenDexComplete(minId, maxId) {
  const dex = getShinyDex();
  const caughtIds = new Set(Object.values(dex).map(e => e.id));
  for (const id of ALL_CATCHABLE_IDS) {
    if (id >= minId && id <= maxId && !caughtIds.has(id)) return false;
  }
  return true;
}

function isShinyDexComplete() { return isShinyGenDexComplete(1, 151); }

function markShinyDexCaught(id, name, types, shinySpriteUrl, localizedNames = null) {
  if (!id) return;
  const dex = getShinyDex();
  const cached = getCached(`pkrl_poke_${id}`);
  const resolvedNames = normalizeLocalizedPokemonNames(
    localizedNames || dex[id]?.localizedNames || cached?.localizedNames,
    name || dex[id]?.defaultName || cached?.defaultName || dex[id]?.name || cached?.name
  );
  dex[id] = {
    id,
    name: getPokemonLocalizedName({ id, localizedNames: resolvedNames, defaultName: resolvedNames.en }),
    defaultName: resolvedNames.en,
    localizedNames: resolvedNames,
    types,
    shinySpriteUrl
  };
  localStorage.setItem('poke_shiny_dex', JSON.stringify(dex));
}

// ---- Hall of Fame ----

function getHallOfFame() {
  try { return JSON.parse(localStorage.getItem('poke_hall_of_fame') || '[]'); }
  catch { return []; }
}

function getUsedStarters() {
  try { return JSON.parse(localStorage.getItem('poke_used_starters') || '[]'); }
  catch { return []; }
}
function recordUsedStarter(speciesId) {
  const list = getUsedStarters();
  if (!list.includes(speciesId)) {
    list.push(speciesId);
    localStorage.setItem('poke_used_starters', JSON.stringify(list));
  }
}

function saveHallOfFameEntry(team, runNumber, hardMode, endless = false, stageNumber = null, starterSpeciesId = null, storyRegionId = null) {
  const entries = getHallOfFame();
  entries.push({
    savedAt: Date.now(),
    runNumber,
    hardMode: !!hardMode,
    endless: !!endless,
    stageNumber: stageNumber ?? null,
    starterSpeciesId: starterSpeciesId ?? null,
    storyRegionId: storyRegionId ?? null,
    date: new Date().toLocaleDateString(),
    team: team.map(p => ({
      speciesId: p.speciesId,
      name: p.name,
      nickname: p.nickname || null,
      level: p.level,
      types: p.types,
      spriteUrl: p.spriteUrl,
      isShiny: !!p.isShiny,
      heldItem: p.heldItem || null,
    })),
  });
  localStorage.setItem('poke_hall_of_fame', JSON.stringify(entries));
}
