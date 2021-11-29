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

const entryStringMap = (current: string, index: number): TableEntry => {
  return {
    text: current,
    range: [index + 1, index + 1],
  };
};

export function parseBasicJSON({ title, entries }: BasicTable) {
  const results = entries.map(entryStringMap);
  return {
    name: title,
    formula: formulaFromEntries(results),
    results,
  };
}

export function parseFoundryJSON({ title, formula, entries }: FoundryTable) {
  return {
    name: title,
    formula,
    results: [...entries],
  };
}

function formulaFromEntries(entries: TableEntry[]): string {
  return `1d${entries[entries.length - 1]?.range[1]}`;
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
    results: [...entries.map(entryStringMap)],
  };
}

const entryCSVMap = (current: string): TableEntry => {
  const [stringRange, text] = current.split('|');
  let start, end: number;
  if (stringRange.includes('-')) {
    [start, end] = stringRange.split('-').map(Number);
  } else {
    start = Number(stringRange);
    end = start;
  }
  if (end === 0) {
    end = 100;
  }
  if (start === 0) {
    start = 1;
  }
  return {
    text,
    range: [start, end],
  };
};

export function parseFromCSV(table: BasicTable) {
  const { title, entries } = table;
  const results = entries.map(entryCSVMap);
  return {
    name: nameFromFile(title),
    formula: formulaFromEntries(results),
    results,
  };
}
