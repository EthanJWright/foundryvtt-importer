export interface FifthAbilities {
  str: {
    value: number;
    proficient: number;
    bonuses?: {
      check: string;
      save: string;
    };
  };
  dex: {
    value: number;
    proficient: number;
    bonuses?: {
      check: string;
      save: string;
    };
  };
  con: {
    value: number;
    proficient: number;
    bonuses?: {
      check: string;
      save: string;
    };
  };
  int: {
    value: number;
    proficient: number;
    bonuses?: {
      check: string;
      save: string;
    };
  };
  wis: {
    value: number;
    proficient: number;
    bonuses?: {
      check: string;
      save: string;
    };
  };
  cha: {
    value: number;
    proficient: number;
    bonuses?: {
      check: string;
      save: string;
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
    min: number;
    max: number;
    temp?: number;
    tempmax?: number;
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
}

export type FifthStat = 'dex' | 'wis' | 'int' | 'str' | 'cha' | 'con';
export interface FifthSkill {
  value: number;
  ability: FifthStat;
  bonuses?: {
    check?: string;
    passive?: string;
  };
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
    size?: 'med' | 'large' | 'tiny';
    di?: {
      value: string[];
      custom?: string;
    };
    dr?: {
      value?: string[];
      custom?: string;
    };
  };
  skills: FifthSkills;
}
