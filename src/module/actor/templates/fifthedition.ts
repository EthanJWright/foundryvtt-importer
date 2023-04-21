import { FifthItemData } from '../../item/compendium/interfaces';

export interface FifthAbilities {
  str: {
    value: number;
    proficient: number;
    saveBonus?: number;
    bonuses?: {
      check?: string;
      save?: string;
    };
  };
  dex: {
    value: number;
    proficient: number;
    saveBonus?: number;
    bonuses?: {
      check?: string;
      save?: string;
    };
  };
  con: {
    value: number;
    proficient: number;
    saveBonus?: number;
    bonuses?: {
      check?: string;
      save?: string;
    };
  };
  int: {
    value: number;
    proficient: number;
    saveBonus?: number;
    bonuses?: {
      check?: string;
      save?: string;
    };
  };
  wis: {
    value: number;
    proficient: number;
    saveBonus?: number;
    bonuses?: {
      check?: string;
      save?: string;
    };
  };
  cha: {
    value: number;
    proficient: number;
    saveBonus?: number;
    bonuses?: {
      check?: string;
      save?: string;
    };
  };
}

export interface FifthAttributes {
  ac: {
    flat: number;
    calc?: string;
    formula?: string;
  };
  hp: {
    value: number;
    min?: number;
    max?: number;
    temp?: number;
    tempmax?: number;
    formula?: string;
  };
  init?: {
    value: number;
    bonus: number;
  };
  movement: {
    burrow?: number;
    climb?: number;
    fly?: number;
    swim?: number;
    walk: number;
    units: 'ft';
    hover?: boolean;
  };
  senses: {
    darkvision?: number;
    blindsight?: number;
    tremorsense?: number;
    truesight?: number;
    special?: string;
    units?: 'ft';
  };
}

export type FifthStat = 'dex' | 'wis' | 'int' | 'str' | 'cha' | 'con';
export interface FifthSkill {
  value?: number;
  ability: FifthStat;
  bonus?: number;
  mod?: number;
  passive?: number;
  prof?: number;
  total?: number;
}

export interface FifthSkills {
  acr?: FifthSkill;
  ani?: FifthSkill;
  arc?: FifthSkill;
  ath?: FifthSkill;
  dec?: FifthSkill;
  his?: FifthSkill;
  ins?: FifthSkill;
  itm?: FifthSkill;
  inv?: FifthSkill;
  med?: FifthSkill;
  nat?: FifthSkill;
  prc?: FifthSkill;
  prf?: FifthSkill;
  per?: FifthSkill;
  rel?: FifthSkill;
  slt?: FifthSkill;
  ste?: FifthSkill;
  sur?: FifthSkill;
}

export interface FifthItemDamage {
  parts: string[][];
  versatile?: string;
}

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'legendary';
export type FifthFeatureCost = 'action' | 'bonus' | 'reaction' | 'legendary' | 'spell' | 'weapon' | 'none';
export type FifthItemType =
  | 'weapon'
  | 'equipment'
  | 'consumable'
  | 'tool'
  | 'loot'
  | 'class'
  | 'spell'
  | 'feat'
  | 'backpack';

export type ActionType = 'mwak' | 'rwak' | 'save' | undefined;

export interface FifthItem {
  name: string;
  type: FifthItemType;
  img?: string;
  data: FifthItemData;
  /* {
    description?: {
      value: string;
      chat?: string;
      unidentified?: string;
    };
    source?: string;
    activation?: {
      type: FifthFeatureCost;
      cost?: number;
      condition?: string;
    };
    damage?: {
      parts?: (string | undefined)[][];
    };
    actionType?: ActionType;
    duration?: {
      value: number;
      units: string;
    };
    range?: {
      value?: number;
      units?: string;
      long?: number;
    };
    save?: {
      ability?: string;
      dc?: number;
      scaling?: string;
    };
    uses?: {
      value?: number;
      per?: string;
      max?: number;
    };
    ability?: string | undefined;
    attackBonus?: number;
    rarity?: ItemRarity;
    target?: {
      value: number;
      width?: number;
      units?: string;
      type: 'creature' | 'point' | 'self' | 'touch' | 'none';
    };
  }; */
}

export interface FifthEditionActor {
  abilities: FifthAbilities;
  attributes: FifthAttributes;
  details?: {
    biography: {
      value?: string;
      public?: string;
    };
  };
  traits?: {
    languages: {
      value: string[];
    };
    size?: 'med' | 'large' | 'tiny';
    di?: {
      value: string[];
      custom?: string;
    };
    dr?: {
      value?: string[];
      custom?: string;
    };
    ci?: {
      value: string[];
      custom?: string;
    };
    cr?: {
      value?: string[];
      custom?: string;
    };
  };
  skills: FifthSkills;
}

export type SpellSlotKey =
  | 'spell1'
  | 'spell2'
  | 'spell3'
  | 'spell4'
  | 'spell5'
  | 'spell6'
  | 'spell7'
  | 'spell8'
  | 'spell9'
  | 'pact';

interface SpellSlotValue {
  value?: string | null;
  override?: string | null;
  max?: string | null;
  level?: string | null;
}

export type SpellSlots = Record<SpellSlotKey, SpellSlotValue>;

// type guard for SpellSlotKey
export function isSpellSlotKey(key: string): key is SpellSlotKey {
  return (
    key === 'spell1' ||
    key === 'spell2' ||
    key === 'spell3' ||
    key === 'spell4' ||
    key === 'spell5' ||
    key === 'spell6' ||
    key === 'spell7' ||
    key === 'spell8' ||
    key === 'spell9' ||
    key === 'pact'
  );
}

export function getDefaultSpellSlots(): SpellSlots {
  const defaultSpellSlots: SpellSlots = {
    spell1: {
      value: '0',
      override: '0',
      max: '0',
    },
    spell2: {
      value: '0',
      override: '0',
      max: '0',
    },
    spell3: {
      value: '0',
      override: '0',
      max: '0',
    },
    spell4: {
      value: '0',
      override: '0',
      max: '0',
    },
    spell5: {
      value: '0',
      override: '0',
      max: '0',
    },
    spell6: {
      value: '0',
      override: '0',
      max: '0',
    },
    spell7: {
      value: '0',
      override: '0',
      max: '0',
    },
    spell8: {
      value: '0',
      override: '0',
      max: '0',
    },
    spell9: {
      value: '0',
      override: '0',
      max: '0',
    },
    pact: {
      value: '0',
      override: '0',
      max: '0',
      level: '0',
    },
  };
  return defaultSpellSlots;
}
