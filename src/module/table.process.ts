export type TableData = ConstructorParameters<typeof foundry.documents.BaseRollTable>[0];

export interface TableEntry {
  range: [number, number];
  text: string;
}

export interface FoundryTableJSON {
  title: string;
  strategy?: 'foundry';
  formula: string;
  entries: TableEntry[];
}

export interface BasicTableJSON {
  title: string;
  strategy?: 'basic';
  entries: TableEntry[];
}

export function parseBasicJSON({ title, entries }: BasicTableJSON) {
  return {
    name: title,
    formula: `1d${entries.length}`,
    results: [...entries],
  };
}

export function parseFoundryJSON({ title, formula, entries }: FoundryTableJSON) {
  return {
    name: title,
    formula,
    results: [...entries],
  };
}
