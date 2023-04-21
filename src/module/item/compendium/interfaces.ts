export interface FifthItemData {
  rarity?: string;
  description?: {
    value?: string;
    chat?: string;
    unidentified?: string;
  };
  source?: string;
  activation?: {
    type?: string;
    cost?: number;
    condition?: string;
  };
  duration?: {
    value?: string;
    units?: string;
  };
  target?: {
    value?: number;
    width?: number;
    units?: string;
    type?: string;
  };
  range?: {
    value?: number;
    long?: number;
    units?: string;
  };
  uses?: {
    value?: number;
    max?: string;
    per?: string;
    recovery?: string;
  };
  consume?: {
    type?: string;
    target?: number;
    amount?: number;
  };
  ability?: string;
  actionType?: string;
  attackBonus?: string;
  chatFlavor?: string;
  critical?: {
    threshold?: string;
    damage?: string;
  };
  damage?: {
    parts: string[][];
    versatile?: string;
  };
  formula?: string;
  save?: {
    ability?: string;
    dc?: number;
    scaling?: string;
  };
  level?: number;
  school?: string;
  components?: {
    vocal?: boolean;
    somatic?: boolean;
    material?: boolean;
    ritual?: boolean;
    concentration?: boolean;
  };
  materials?: {
    value?: string;
    consumed?: boolean;
    cost?: number;
    supply?: number;
  };
  preparation?: {
    mode?: string;
    prepared?: boolean;
  };
  scaling?: {
    mode?: string;
    formula?: string;
  };
}

export interface CompendiumSpell {
  _id?: string;
  name?: string;
  ownership?: {
    default?: number;
  };
  type?: string;
  system?: FifthItemData;
  sort?: number;
  flags?: Record<string, unknown>;
  img?: string;
  effects?: any[];
  folder?: string;
  _stats?: {
    systemId?: string;
    systemVersion?: string;
    coreVersion?: string;
    createdTime?: number;
    modifiedTime?: number;
    lastModifiedBy?: string;
  };
}

export type Pack = CompendiumCollection<CompendiumCollection.Metadata>;
export type Packs = Pack[];
