import { ImportActor } from '../src/module/actor/interfaces';
export const spythronar: ImportActor = {
  name: 'Spythronar Sac',
  rating: {
    cr: 0,
    xp: 10,
  },
  type: 'aberration',
  alignment: 'Unaligned',
  biography: 'Spythronar Sac',
  languages: ['—'],
  size: 'Tiny',
  health: {
    value: 1,
    min: 1,
    max: 1,
  },
  senses: {
    special: 'blind beyond this radius',
    tremorsense: 10,
    units: 'ft',
  },
  armorClass: {
    value: 5,
    type: 'Natural Armor',
  },
  damageImmunities: [],
  damageResistances: [],
  conditionImmunities: [
    'blinded',
    'charmed',
    'deafened',
    'exhaustion',
    'frightened',
    'paralyzed',
    'petrified',
    'poisoned',
    'prone',
    'restrained',
    'unconscious',
  ],
  damageVulnerabilities: [],
  abilities: {
    str: {
      value: 1,
      mod: -5,
      savingThrow: 0,
    },
    dex: {
      value: 1,
      mod: -5,
      savingThrow: 0,
    },
    con: {
      value: 8,
      mod: -1,
      savingThrow: 0,
    },
    int: {
      value: 1,
      mod: -5,
      savingThrow: 0,
    },
    wis: {
      value: 3,
      mod: -4,
      savingThrow: 0,
    },
    cha: {
      value: 1,
      mod: -5,
      savingThrow: 0,
    },
  },
  speed: 0,
  skills: [],
  items: [],
};
