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
  stats: {
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
  features: [
    {
      name: 'Lightfooted',
      description: '. The swashbuckler can take the Dash or Disengageaction as a bonus action on each of its turns.',
    },
    {
      name: 'Suave Defense',
      description:
        '. While the swashbuckler is wearing light or noarmor and wielding no shield, its AC includes its Charismamodifier.',
    },

    {
      name: 'Multiattack',
      description: '. The swashbuckler makes three attacks: one witha dagger and two with its rapier.',
    },
    {
      name: 'Dagger',
      description:
        '. Melee or Ranged Weapon Attack: +6 to hit, reach 5ft. or range 20/60 ft., one target. Hit: 6 (1d4 + 4) piercingdamage.',
    },
    {
      name: 'Rapier',
      description: '. Melee Weapon Attack: +6 to hit, reach 5 ft., one target.Hit: 8 (1d8 + 4) piercing damage.',
    },
  ],
};
