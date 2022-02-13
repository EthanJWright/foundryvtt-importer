export interface Range {
  value?: number;
  long?: number;
  units?: string;
}

export type ShortAbility = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
export type ItemType =
  | 'weapon'
  | 'equipment'
  | 'consumable'
  | 'tool'
  | 'loot'
  | 'class'
  | 'spell'
  | 'feat'
  | 'backpack';

export type ActionType = 'mwak' | 'rwak' | 'save';

export interface Uses {
  per: 'day' | 'hour' | 'minute' | 'round' | 'minute';
  value?: number;
  max?: number;
}
export interface Target {
  type: 'sphere' | 'cone' | 'line' | 'self' | 'touch' | 'none';
  value: number;
  units: 'ft' | 'm';
}
export interface Activation {
  type: 'action' | 'bonus' | 'reaction' | 'legendary' | 'spell' | 'weapon' | 'none';
  cost?: number;
  condition?: string;
}

export interface Damage {
  parts: string[][];
  versatile?: string;
}

export interface Save {
  ability: string;
  dc: number;
  scaling: 'spell';
}

export interface WeaponType {
  name: string;
  type: 'weapon';
  description: string;
  activation?: Activation;
  damage: Damage;
  range: Range;
  ability: ShortAbility;
  actionType: 'mwak' | 'rwak';
  attackBonus: number;
}

export interface SpellType {
  name: string;
  type: 'spell';
  description: string;
  activation?: Activation;
  damage?: Damage;
  range: Range;
  ability?: ShortAbility;
  save?: Save;
  uses?: Uses;
  target: Target;
  actionType?: 'save';
  attackBonus?: number;
}

export interface FeatType {
  name: string;
  type: 'feat';
  description: string;
  activation?: Activation;
  damage?: Damage;
  range?: Range;
  ability?: ShortAbility;
  save?: Save;
}

// These are currently unspecified
export interface GenericType {
  name: string;
  type: 'equipment' | 'consumable' | 'tool' | 'loot' | 'class' | 'backpack';
  description: string;
  activation?: Activation;
  damage?: Damage;
  range?: Range;
  ability?: ShortAbility;
  save?: Save;
}

export type ImportItem = WeaponType | SpellType | FeatType | GenericType;
