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

export interface Activation {
  type: 'action' | 'bonus' | 'reaction' | 'legendary' | 'spell' | 'weapon' | 'none';
  cost?: number;
  condition?: string;
}

export interface Damage {
  parts: string[][];
  versatile?: string;
}
export interface ImportItem {
  name: string;
  type: ItemType;
  description: string;
  activation?: Activation;
  damage?: Damage;
  actionType: ActionType;
  range?: Range;
  ability?: ShortAbility;
  attackBonus: number;
  save?: {
    ability: string;
    dc: number;
    scaling: 'spell';
  };
  uses?: {
    per: 'day' | 'hour' | 'minute' | 'round' | 'minute';
    value?: number;
    max?: number;
  };
  target?: {
    type: 'sphere' | 'cone' | 'line' | 'self' | 'touch' | 'none';
    value: number;
    units: 'ft' | 'm';
  };
}
