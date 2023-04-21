import { ImportSpells } from '../../../src/module/actor/interfaces';
import { FifthItem } from '../../../src/module/actor/templates/fifthedition';

export const ABOLETH_SPELLS_FROM_COMPENDIUM: FifthItem[] = [
  {
    name: 'Hypnotic Pattern',
    type: 'spell',
    img: 'icons/magic/air/air-burst-spiral-pink.webp',
    data: {
      description: {
        value:
          '<p>You create a twisting pattern of colors that weaves through the air inside a 30-foot cube within range. The pattern appears for a moment and vanishes. Each creature in the area who sees the pattern must make a Wisdom saving throw. On a failed save, the creature becomes charmed for the duration. While charmed by this spell, the creature is incapacitated and has a speed of 0.</p><p>The spell ends for an affected creature if it takes any damage or if someone else uses an action to shake the creature out of its stupor.</p>',
        chat: '',
        unidentified: '',
      },
      source: 'SRD 5.1',
      activation: {
        type: 'action',
        cost: 1,
        condition: '',
      },
      duration: {
        value: '1',
        units: 'minute',
      },
      target: {
        value: 30,
        units: 'ft',
        type: 'cube',
      },
      range: {
        value: 120,
        units: 'ft',
      },
      uses: {
        per: 'day',
        value: 1,
      },
      consume: {
        type: '',
      },
      ability: '',
      actionType: 'save',
      attackBonus: '',
      chatFlavor: '',
      critical: {
        damage: '',
      },
      damage: {
        parts: [],
        versatile: '',
      },
      formula: '',
      save: {
        ability: 'wis',
        scaling: 'spell',
      },
      level: 3,
      school: 'ill',
      components: {
        vocal: false,
        somatic: true,
        material: true,
        ritual: false,
        concentration: true,
      },
      materials: {
        value: 'A glowing stick of incense or a crystal vial filled with phosphorescent material.',
        consumed: false,
        cost: 0,
        supply: 0,
      },
      preparation: {
        mode: 'innate',
        prepared: false,
      },
      scaling: {
        mode: 'none',
        formula: '',
      },
    },
  },
  {
    name: 'Invisibility',
    type: 'spell',
    img: 'icons/magic/air/fog-gas-smoke-dense-gray.webp',
    data: {
      description: {
        value:
          "<p>A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target's person. The spell ends for a target that attacks or casts a spell.</p><p><strong>At Higher Levels.</strong> When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd.</p>",
        chat: '',
        unidentified: '',
      },
      source: 'SRD 5.1',
      activation: {
        type: 'action',
        cost: 1,
        condition: '',
      },
      duration: {
        value: '1',
        units: 'hour',
      },
      target: {
        value: 1,
        units: '',
        type: 'creature',
      },
      range: {
        units: 'touch',
      },
      uses: {
        per: 'day',
        value: 1,
      },
      consume: {
        type: '',
      },
      ability: '',
      actionType: 'util',
      attackBonus: '',
      chatFlavor: '',
      critical: {
        damage: '',
      },
      damage: {
        parts: [],
        versatile: '',
      },
      formula: '',
      save: {
        ability: '',
        scaling: 'spell',
      },
      level: 2,
      school: 'ill',
      components: {
        vocal: true,
        somatic: true,
        material: true,
        ritual: false,
        concentration: true,
      },
      materials: {
        value: 'An eyelash encased in gum arabic',
        consumed: false,
        cost: 0,
        supply: 0,
      },
      preparation: {
        mode: 'innate',
        prepared: false,
      },
      scaling: {
        mode: 'level',
        formula: '',
      },
    },
  },
  {
    name: 'Hallucinatory Terrain',
    type: 'spell',
    img: 'icons/magic/air/air-burst-spiral-teal-green.webp',
    data: {
      description: {
        value:
          "<p>You make natural terrain in a 150-foot cube in range look, sound, and smell like some other sort of natural terrain. Thus, open fields or a road can be made to resemble a swamp, hill, crevasse, or some other difficult or impassable terrain. A pond can be made to seem like a grassy meadow, a precipice like a gentle slope, or a rock-strewn gully like a wide and smooth road. Manufactured structures, Equipment, and creatures within the area aren't changed in appearance.</p><p>The tactile characteristics of the terrain are unchanged, so creatures entering the area are likely to see through the Illusion. If the difference isn't obvious by touch, a creature carefully examining the Illusion can attempt an Intelligence (Investigation) check against your spell save DC to disbelieve it. A creature who discerns the Illusion for what it is, sees it as a vague image superimposed on the terrain.</p>",
        chat: '',
        unidentified: '',
      },
      source: 'SRD 5.1',
      activation: {
        type: 'minute',
        cost: 10,
        condition: '',
      },
      duration: {
        value: '24',
        units: 'hour',
      },
      target: {
        value: 150,
        units: 'ft',
        type: 'cube',
      },
      range: {
        value: 300,
        units: 'ft',
      },
      uses: {
        max: '',
        recovery: '',
      },
      consume: {
        type: '',
      },
      ability: '',
      actionType: 'util',
      attackBonus: '',
      chatFlavor: '',
      critical: {
        damage: '',
      },
      damage: {
        parts: [],
        versatile: '',
      },
      formula: '',
      save: {
        ability: '',
        scaling: 'spell',
      },
      level: 4,
      school: 'ill',
      components: {
        vocal: true,
        somatic: true,
        material: true,
        ritual: false,
        concentration: false,
      },
      materials: {
        value: 'A stone, a twig, and a bit of green plant',
        consumed: false,
        cost: 0,
        supply: 0,
      },
      preparation: {
        mode: 'prepared',
        prepared: false,
      },
      scaling: {
        mode: 'none',
        formula: '',
      },
    },
  },
  {
    name: 'Major Image',
    type: 'spell',
    img: 'icons/magic/control/debuff-energy-hold-levitate-pink.webp',
    data: {
      description: {
        value:
          "<p>You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 20-foot cube. The image appears at a spot that you can see within range and lasts for the duration. It seems completely real, including sounds, smells, and temperature appropriate to the thing depicted. You can't create sufficient heat or cold to cause damage, a sound loud enough to deal thunder damage or deafen a creature, or a smell that might sicken a creature (like a troglodyte's stench).</p><p>As long as you are within range of the illusion, you can use your action to cause the image to move to any other spot within range. As the image changes location, you can alter its appearance so that its movements appear natural for the image. For example, if you create an image of a creature and move it, you can alter the image so that it appears to be walking. Similarly, you can cause the illusion to make different sounds at different times, even making it carry on a conversation, for example.</p><p>Physical interaction with the image reveals it to be an illusion, because things can pass through it. A creature that uses its action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image, and its other sensory qualities become faint to the creature.</p><p><strong>At Higher Levels.</strong> When you cast this spell using a spell slot of 6th level or higher, the spell lasts until dispelled, without requiring your concentration.</p>",
        chat: '',
        unidentified: '',
      },
      source: 'SRD 5.1',
      activation: {
        type: 'action',
        cost: 1,
        condition: '',
      },
      duration: {
        value: '10',
        units: 'minute',
      },
      target: {
        value: 20,
        units: 'ft',
        type: 'cube',
      },
      range: {
        value: 120,
        units: 'ft',
      },
      uses: {
        max: '',
        recovery: '',
      },
      consume: {
        type: '',
      },
      ability: '',
      actionType: 'util',
      attackBonus: '',
      chatFlavor: '',
      critical: {
        damage: '',
      },
      damage: {
        parts: [],
        versatile: '',
      },
      formula: '',
      save: {
        ability: '',
        scaling: 'spell',
      },
      level: 3,
      school: 'ill',
      components: {
        vocal: true,
        somatic: true,
        material: true,
        ritual: false,
        concentration: true,
      },
      materials: {
        value: 'A bit of fleece',
        consumed: false,
        cost: 0,
        supply: 0,
      },
      preparation: {
        mode: 'prepared',
        prepared: false,
      },
      scaling: {
        mode: 'level',
        formula: '',
      },
    },
  },
  {
    name: 'Phantasmal Killer',
    type: 'spell',
    img: 'icons/magic/control/fear-fright-monster-grin-purple-blue.webp',
    data: {
      description: {
        value:
          "<p>You tap into the nightmares of a creature you can see within range and create an illusory manifestation of its deepest fears, visible only to that creature. The target must make a Wisdom saving throw. On a failed save, the target becomes Frightened for the Duration. At the end of each of the target's turns before the spell ends, the target must succeed on a Wisdom saving throw or take 4d10 psychic damage. On a successful save, the spell ends.</p><p><strong>At Higher Levels</strong>. When you cast this spell using a spell slot of 5th level or higher, the damage increases by 1d10 for each slot level above 4th.</p>",
        chat: '',
        unidentified: '',
      },
      source: 'SRD 5.1',
      activation: {
        type: 'action',
        cost: 1,
        condition: '',
      },
      duration: {
        value: '1',
        units: 'minute',
      },
      target: {
        value: 1,
        units: '',
        type: 'creature',
      },
      range: {
        value: 120,
        units: 'ft',
      },
      uses: {
        max: '',
        recovery: '',
      },
      consume: {
        type: '',
      },
      ability: '',
      actionType: 'save',
      attackBonus: '',
      chatFlavor: '',
      critical: {
        damage: '',
      },
      damage: {
        parts: [['4d10', 'psychic']],
        versatile: '',
      },
      formula: '',
      save: {
        ability: 'wis',
        scaling: 'spell',
      },
      level: 4,
      school: 'ill',
      components: {
        vocal: true,
        somatic: true,
        material: false,
        ritual: false,
        concentration: true,
      },
      materials: {
        value: '',
        consumed: false,
        cost: 0,
        supply: 0,
      },
      preparation: {
        mode: 'prepared',
        prepared: false,
      },
      scaling: {
        mode: 'level',
        formula: '1d10',
      },
    },
  },
  {
    name: 'Project Image',
    type: 'spell',
    img: 'icons/magic/control/energy-stream-link-spiral-teal.webp',
    data: {
      description: {
        value:
          '<p>You create an illusory copy of yourself that lasts for the Duration. The copy can appear at any location within range that you have seen before, regardless of intervening obstacles. The Illusion looks and sounds like you but is intangible. If the illusion takes any damage, it disappears, and the spell ends.</p><p>You can use your action to move this illusion up to twice your speed, and make it gesture, speak, and behave in whatever way you choose. It mimics your mannerisms perfectly.</p><p>You can see through its eyes and hear through its ears as if you were in its space. On Your Turn as a Bonus Action, you can switch from using its senses to using your own, or back again. While you are using its senses, you are Blinded and Deafened in regard to your own surroundings.</p><p>Physical interaction with the image reveals it to be an illusion, because things can pass through it. A creature that uses its action to examine the image can determine that it is an Illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image, and any noise it makes sounds hollow to the creature.</p>',
        chat: '',
        unidentified: '',
      },
      source: 'SRD 5.1',
      activation: {
        type: 'action',
        cost: 1,
        condition: '',
      },
      duration: {
        value: '1',
        units: 'day',
      },
      target: {
        units: 'any',
        type: 'space',
      },
      range: {
        value: 500,
        units: 'mi',
      },
      uses: {
        max: '',
        recovery: '',
      },
      consume: {
        type: '',
      },
      ability: '',
      actionType: 'util',
      attackBonus: '',
      chatFlavor: '',
      critical: {
        damage: '',
      },
      damage: {
        parts: [],
        versatile: '',
      },
      formula: '',
      save: {
        ability: '',
        scaling: 'spell',
      },
      level: 7,
      school: 'ill',
      components: {
        vocal: true,
        somatic: true,
        material: true,
        ritual: false,
        concentration: true,
      },
      materials: {
        value: 'A small replica of you made from material worth at least 5gp',
        consumed: false,
        cost: 0,
        supply: 0,
      },
      preparation: {
        mode: 'prepared',
        prepared: false,
      },
      scaling: {
        mode: 'none',
        formula: '',
      },
    },
  },
  {
    name: 'Mirage Arcane',
    type: 'spell',
    img: 'icons/magic/air/fog-gas-smoke-swirling-blue.webp',
    data: {
      description: {
        value:
          "<p>You make terrain in an area up to 1 mile square look, sound, smell, and even feel like some other sort of terrain. The terrain's general shape remains the same, however. Open fields or a road could be made to resemble a swamp, hill, crevasse, or some other difficult or impassable terrain. A pond can be made to seem like a grassy meadow, a precipice like a gentle slope, or a rock-strewn gully like a wide and smooth road.</p><p>Similarly, you can alter the appearance of structures, or add them where none are present. The spell doesn't disguise, conceal, or add creatures.</p><p>The Illusion includes audible, visual, tactile, and olfactory elements, so it can turn clear ground into difficult terrain (or vice versa) or otherwise impede Movement through the area. Any piece of the illusory terrain (such as a rock or stick) that is removed from the spell's area disappears immediately.</p><p>Creatures with Truesight can see through the Illusion to the terrain's true form; however, all other elements of the illusion remain, so while the creature is aware of the illusion's presence, the creature can still physically interact with the illusion.</p>",
        chat: '',
        unidentified: '',
      },
      source: 'SRD 5.1',
      activation: {
        type: 'minute',
        cost: 10,
        condition: '',
      },
      duration: {
        value: '10',
        units: 'day',
      },
      target: {
        value: 1,
        units: 'mi',
        type: 'square',
      },
      range: {
        units: 'spec',
      },
      uses: {
        max: '',
        recovery: '',
      },
      consume: {
        type: '',
      },
      ability: '',
      actionType: 'util',
      attackBonus: '',
      chatFlavor: '',
      critical: {
        damage: '',
      },
      damage: {
        parts: [],
        versatile: '',
      },
      formula: '',
      save: {
        ability: '',
        scaling: 'spell',
      },
      level: 7,
      school: 'ill',
      components: {
        vocal: true,
        somatic: true,
        material: false,
        ritual: false,
        concentration: false,
      },
      materials: {
        value: '',
        consumed: false,
        cost: 0,
        supply: 0,
      },
      preparation: {
        mode: 'prepared',
        prepared: false,
      },
      scaling: {
        mode: 'none',
        formula: '',
      },
    },
  },
  {
    name: 'Weird',
    type: 'spell',
    img: 'icons/magic/control/fear-fright-monster-grin-green.webp',
    data: {
      description: {
        value:
          "<p>Drawing on the deepest fears of a group of creatures, you create illusory creatures in their minds, visible only to them. Each creature in a 30-foot-radius sphere centered on a point of your choice within range must make a Wisdom saving throw. On a failed save, a creature becomes Frightened for the Duration. The illusion calls on the creature's deepest fears, manifesting its worst nightmares as an implacable threat. At the end of each of the Frightened creature's turns, it must succeed on a Wisdom saving throw or take 4d10 psychic damage. On a successful save, the spell ends for that creature.</p>",
        chat: '',
        unidentified: '',
      },
      source: 'SRD 5.1',
      activation: {
        type: 'action',
        cost: 1,
        condition: '',
      },
      duration: {
        value: '1',
        units: 'minute',
      },
      target: {
        value: 30,
        units: 'ft',
        type: 'sphere',
      },
      range: {
        value: 120,
        units: 'ft',
      },
      uses: {
        max: '',
        recovery: '',
      },
      consume: {
        type: '',
      },
      ability: '',
      actionType: 'save',
      attackBonus: '',
      chatFlavor: '',
      critical: {
        damage: '',
      },
      damage: {
        parts: [['4d10', 'psychic']],
        versatile: '',
      },
      formula: '',
      save: {
        ability: 'wis',
        scaling: 'spell',
      },
      level: 9,
      school: 'ill',
      components: {
        vocal: true,
        somatic: true,
        material: false,
        ritual: false,
        concentration: true,
      },
      materials: {
        value: '',
        consumed: false,
        cost: 0,
        supply: 0,
      },
      preparation: {
        mode: 'prepared',
        prepared: false,
      },
      scaling: {
        mode: 'none',
        formula: '',
      },
    },
  },
];

export const ABOLETH_SPELLS_FROM_BLOCK: ImportSpells = [
  { name: 'Hypnotic Pattern', type: 'spell', uses: { atWill: true, per: 'day', value: 1 } },
  { name: 'Invisibility', type: 'spell', uses: { atWill: true, per: 'day', value: 1 } },
  { name: 'Phantasmal Force', type: 'spell', uses: { atWill: true, per: 'day', value: 1 } },
  { name: 'Hallucinatory Terrain', type: 'spell', uses: { atWill: false, per: 'day', value: 3 } },
  { name: 'Major Image', type: 'spell', uses: { atWill: false, per: 'day', value: 3 } },
  { name: 'Phantasmal Killer', type: 'spell', uses: { atWill: false, per: 'day', value: 2 } },
  { name: 'Project Image', type: 'spell', uses: { atWill: false, per: 'day', value: 2 } },
  { name: 'Mirage Arcane', type: 'spell', uses: { atWill: false, per: 'day', value: 1 } },
  { name: 'Psychic Scream', type: 'spell', uses: { atWill: false, per: 'day', value: 1 } },
  { name: 'Weird', type: 'spell', uses: { atWill: false, per: 'day', value: 1 } },
];
