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

export interface Recharge {
  value: number;
  charged: boolean;
}

export interface UniversalItemType {
  name: string;
  type: 'spell' | 'feat' | 'weapon' | 'equipment' | 'consumable' | 'tool' | 'loot' | 'class' | 'backpack';
  hasSpellData?: boolean;
  description: string;
  activation?: Activation;
  damage?: Damage;
  range?: Range;
  recharge?: Recharge;
  ability?: ShortAbility;
  save?: Save;
  uses?: Uses;
  target?: Target;
  actionType?: ActionType;
  attackBonus?: number;
}

export type ImportItem = UniversalItemType;
