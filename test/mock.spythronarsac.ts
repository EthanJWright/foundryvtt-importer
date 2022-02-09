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
  stats: {
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
  features: [
    {
      name: 'False Appearance',
      description:
        'The spythronar sac appears to be a tangled ball of string, twigs, and dirt. Someone who can see the sac can identify it with a successful DC 15 Intelligence (Arcana or Nature) check.',
    },
    {
      name: 'Fragile',
      description:
        'A creature who enters the spythronar sac’s space must succeed on a DC 10 Dexterity saving throw, or the sac is destroyed.',
    },
    {
      name: 'Lightning Release',
      description:
        'When the spythronar sac is destroyed, it releases lightning in a 10-foot radius. A creature who destroyed the sac by entering its space receives no saving throw. Other creatures in that area must succeed on a DC 10 Dexterity saving throw or take 4 (1d8) lightning damage. Each spythronar swarm and web in this area instead gains advantage on its next attack roll.',
    },
    {
      name: 'Shocking Birth',
      description:
        'When a spythronar sac takes lightning damage from a source other than another spythronar, it hatches, transforming into a spythronar swarm with half the normal hit points. This swarm rolls initiative and enters the combat.',
    },
  ],
};
