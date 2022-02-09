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
export type DamageTypes = DamageType[];

export type ConditionType =
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
export type ConditionTypes = ConditionType[];

export interface Senses {
  darkvision?: number;
  blindsight?: number;
  tremorsense?: number;
  truesight?: number;
  units: string;
  special?: string;
  passivePerception?: number;
}

export type Size = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';

export type Name = string;
export type ActorType = string;
export type Alignment = string;
export type Biography = string;
export type Speed = number;

export type ActorTypes =
  | Name
  | ActorType
  | Alignment
  | Biography
  | Size
  | ConditionType
  | DamageType[]
  | Group
  | Languages
  | Rating
  | Senses
  | Abilities
  | Skill[]
  | ArmorClass
  | Feature[]
  | Rating
  | Speed
  | Health;

export interface ImportActor {
  name: Name;
  size: Size;
  type: ActorType;
  alignment: Alignment;
  senses: Senses;
  languages: Languages;
  biography: Biography;
  damageImmunities: DamageTypes;
  damageResistances: DamageTypes;
  conditionImmunities: ConditionTypes;
  damageVulnerabilities: DamageTypes;
  health: Health;
  rating: Rating;
  armorClass: ArmorClass;
  abilities: Abilities;
  speed: Speed;
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
