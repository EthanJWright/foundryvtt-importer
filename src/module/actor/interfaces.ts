export interface Ability {
  value: number;
  mod: number;
  savingThrow: number;
}

export type Languages = string[];

export interface Abilities {
  str: Ability;
  dex: Ability;
  con: Ability;
  int: Ability;
  wis: Ability;
  cha: Ability;
}
export interface Skill {
  name: string;
  bonus: number;
}

export interface Group {
  name: string;
  collection: string[];
}

export interface ArmorClass {
  value: number;
  type: string;
}

export interface Feature {
  name: string;
  description: string;
}

export interface Health {
  value: number;
  min: number;
  max: number;
}

export interface Rating {
  cr?: number;
  xp: number;
}

export type DamageType =
  | 'poison'
  | 'disease'
  | 'magic'
  | 'psychic'
  | 'radiant'
  | 'necrotic'
  | 'bludgeoning'
  | 'piercing'
  | 'slashing'
  | 'acid'
  | 'cold'
  | 'fire'
  | 'force'
  | 'lightning'
  | 'necrotic'
  | 'psychic'
  | 'radiant'
  | 'thunder';

export type Condition =
  | 'blinded'
  | 'charmed'
  | 'deafened'
  | 'exhaustion'
  | 'frightened'
  | 'grappled'
  | 'incapacitated'
  | 'invisible'
  | 'paralyzed'
  | 'petrified'
  | 'poisoned'
  | 'prone'
  | 'restrained'
  | 'stunned'
  | 'unconscious';

export interface Senses {
  darkvision?: number;
  blindsight?: number;
  tremorsense?: number;
  truesight?: number;
  units?: string;
  special?: string;
  passivePerception?: number;
}

export type Size = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';

export interface ImportActor {
  name: string;
  size: Size;
  type: string;
  alignment: string;
  senses: Senses;
  languages: Languages;
  biography: string;
  damageImmunities: DamageType[];
  damageResistances: DamageType[];
  conditionImmunities: Condition[];
  damageVulnerabilities: DamageType[];
  health: Health;
  rating?: Rating;
  armorClass: ArmorClass;
  stats: Abilities;
  speed: number;
  skills: Skill[];
  features: Feature[];
}

export interface Formula {
  value: number;
  str?: string;
  min?: number;
  max?: number;
  mod?: number;
  afterRegex?: string;
  beforeRegex?: string;
  afterFormula?: string;
  beforeFormula?: string;
}
