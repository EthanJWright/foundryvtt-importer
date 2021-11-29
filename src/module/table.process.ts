export type TableData = ConstructorParameters<typeof foundry.documents.BaseRollTable>[0];

export interface TableEntry {
  range: [number, number];
  text: string;
}

export interface FoundryTable {
  title: string;
  formula: string;
  entries: TableEntry[];
}

export interface BasicTable {
  title: string;
  entries: string[];
}

export function isFoundryTable(table: FoundryTable | BasicTable) {
  return (table as FoundryTable).formula !== undefined;
}

export function isBasicTable(table: FoundryTable | BasicTable) {
  return (table as FoundryTable).formula === undefined;
}

const entryMap = (current: string, index: number): TableEntry => {
  return {
    text: current,
    range: [index + 1, index + 1],
  };
};

export function parseBasicJSON({ title, entries }: BasicTable) {
  return {
    name: title,
    formula: `1d${entries.length}`,
    results: [...entries.map(entryMap)],
  };
}

export function parseFoundryJSON({ title, formula, entries }: FoundryTable) {
  return {
    name: title,
    formula,
    results: [...entries],
  };
}

function nameFromFile(file: string) {
  // get the filename without the extension
  const withPath = file.split('.')[0];
  // remove the file path
  const name = withPath.split('/').pop() || withPath;
  // replace all underscores with spaces
  // and capitalize the first letter of each word
  return name
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function parseFromTxt(table: BasicTable) {
  const { title, entries } = table;
  return {
    name: nameFromFile(title),
    formula: `1d${entries.length}`,
    results: [...entries.map(entryMap)],
  };
}
