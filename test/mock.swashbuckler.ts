import { ImportActor } from '../src/module/actor/interfaces';
export const swashbuckler: ImportActor = {
  name: 'Swashbuckler',
  rating: {
    cr: 3,
    xp: 700,
  },
  type: 'humanoid',
  alignment: 'Any Non-lawful Alignment',
  biography: 'Medium humanoid (any race), any non-lawful alignment',
  languages: ['any one language (usually common)'],
  size: 'Medium',
  health: {
    value: 66,
    min: 24,
    max: 108,
    formula: '10d6+3',
  },
  senses: {
    units: 'ft',
  },
  armorClass: {
    value: 17,
    type: 'leather armor',
  },
  damageImmunities: [],
  damageResistances: [],
  conditionImmunities: [],
  damageVulnerabilities: [],
  abilities: {
    str: {
      value: 12,
      mod: 1,
      savingThrow: 0,
    },
    dex: {
      value: 18,
      mod: 4,
      savingThrow: 0,
    },
    con: {
      value: 12,
      mod: 1,
      savingThrow: 0,
    },
    int: {
      value: 14,
      mod: 2,
      savingThrow: 0,
    },
    wis: {
      value: 11,
      mod: 0,
      savingThrow: 0,
    },
    cha: {
      value: 15,
      mod: 2,
      savingThrow: 0,
    },
  },
  speed: 30,
  skills: [
    {
      name: 'acrobatics',
      bonus: 8,
    },
    {
      name: 'athletics',
      bonus: 5,
    },
    {
      name: 'persuasion',
      bonus: 6,
    },
  ],
  items: [
    {
      name: 'Lightfooted',
      type: 'feat',
      description: 'The swashbuckler can take the Dash or Disengage action as a bonus action on each of its turns.',
    },
    {
      name: 'Suave Defense',
      type: 'feat',
      description:
        'While the swashbuckler is wearing light or no armor and wielding no shield, its AC includes its Charisma modifier. Actions',
    },
    {
      name: 'Multiattack',
      type: 'feat',
      description: 'The swashbuckler makes three attacks: one with a dagger and two with its rapier.',
    },
    {
      name: 'Dagger',
      type: 'weapon',
      description:
        'Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 6 (1d4 + 4) piercing damage.',
      activation: {
        type: 'action',
        cost: 1,
      },
      damage: {
        parts: [['1d4 + 4', 'piercing']],
      },
      actionType: 'mwak',
      range: {
        value: 5,
      },
      ability: 'dex',
      attackBonus: 0,
    },
    {
      name: 'Rapier',
      type: 'weapon',
      description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage.',
      activation: {
        type: 'action',
        cost: 1,
      },
      damage: {
        parts: [['1d8 + 4', 'piercing']],
      },
      actionType: 'mwak',
      range: {
        value: 5,
      },
      ability: 'dex',
      attackBonus: 0,
    },
  ],
  spells: [],
  spellcasting: '',
};
