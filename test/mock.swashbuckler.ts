import { ImportActor } from '../src/module/actor/interfaces';
export const swashbuckler: ImportActor = {
  name: 'Swashbuckler',
  biography: 'Medium humanoid (any race), any non-lawful alignment',
  damageImmunities: [],
  rating: {
    cr: 3,
    xp: 3000,
  },
  damageResistances: [],
  conditionImmunities: [],
  damageVulnerabilities: [],
  languages: ['common'],
  type: 'any race',
  size: 'Medium',
  alignment: 'non-lawful alignment',
  senses: { units: 'ft' },
  health: {
    value: 66,
    min: 24,
    max: 108,
  },
  armorClass: {
    value: 17,
    type: 'leather armor',
  },
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
  items: [],
};
