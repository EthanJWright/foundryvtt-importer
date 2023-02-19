import { ImportItem } from '../item/interfaces';

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

// For this type guard, we are okay with an any
// eslint-disable-next-line
export function isAbilities(obj: any): obj is Abilities {
  // make sure str.value, dex.value, etc. are all numbers (not NaN)
  const hasKeys = 'str' in obj && 'dex' in obj && 'con' in obj && 'int' in obj && 'wis' in obj && 'cha' in obj;
  if (!hasKeys) return false;
  if (
    isNaN(obj.str.value) ||
    isNaN(obj.dex.value) ||
    isNaN(obj.con.value) ||
    isNaN(obj.int.value) ||
    isNaN(obj.wis.value) ||
    isNaN(obj.cha.value)
  ) {
    return false;
  }
  return true;
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

export type SectionLabel = 'action' | 'bonus' | 'reaction' | 'legendary';
export interface Feature {
  name: string;
  description: string;
  section?: SectionLabel;
}

export type Features = Feature[];

export interface Health {
  value: number;
  min: number;
  max: number;
  formula?: string;
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
export type ImportItems = ImportItem[];

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
  | Health
  | ImportItems;

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
  items: ImportItems;
}

export interface ImportActorParser {
  parseName: ((lines: string[]) => Name)[];
  parseSize: ((lines: string[]) => Size)[];
  parseType: ((lines: string[]) => ActorType)[];
  parseAlignment: ((lines: string[]) => Alignment)[];
  parseSenses: ((lines: string[]) => Senses)[];
  parseLanguages: ((lines: string[]) => Languages)[];
  parseBiography: ((lines: string[]) => Biography)[];
  parseDamageImmunities: ((lines: string[]) => DamageTypes)[];
  parseDamageResistances: ((lines: string[]) => DamageTypes)[];
  parseConditionImmunities: ((lines: string[]) => ConditionTypes)[];
  parseDamageVulnerabilities: ((lines: string[]) => DamageTypes)[];
  parseHealth: ((lines: string[]) => Health)[];
  parseRating: ((lines: string[]) => Rating)[];
  parseArmorClass: ((lines: string[]) => ArmorClass)[];
  parseAbilities: ((lines: string[]) => Abilities)[];
  parseSpeed: ((lines: string[]) => Speed)[];
  parseSkills: ((lines: string[]) => Skill[])[];
  parseItems: ((lines: string[], abilities: Abilities) => ImportItems)[];
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
