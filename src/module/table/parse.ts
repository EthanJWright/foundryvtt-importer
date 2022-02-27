import { cleanName } from '../formatters';
import { breakLines, TableParser } from './process';
import { addWeight, hasWeights } from './reddit';

export type TableData = ConstructorParameters<typeof foundry.documents.BaseRollTable>[0];

export interface TableEntry {
  range: [number, number];
  text: string;
}

export interface FoundryTable {
  name: string;
  formula: string;
  results: TableEntry[];
}

export interface BasicTable {
  name: string;
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

export function parseBasicJSON({ name, entries }: BasicTable) {
  const results = entries.map(entryStringMap);
  return {
    name: name,
    formula: formulaFromEntries(results),
    results,
  };
}

export function parseFoundryJSON({ name, formula, results }: FoundryTable) {
  return {
    name: name,
    formula,
    results: [...results],
  };
}

export function formulaFromEntries(entries: TableEntry[]): string {
  return `1d${entries[entries.length - 1].range[1]}`;
}

function nameFromFile(file: string) {
  // get the filename without the extension
  const withPath = file.split('.')[0];
  // remove the file path
  const name = withPath.split('/').pop() || withPath;
  // replace all underscores with spaces
  // and capitalize the first letter of each word
  return cleanName(name);
}

export function isCSVTable(data: string) {
  const delims = ['|', ','];
  const check = data.split('\n')[0];
  return delims.reduce((acc, cur) => check.includes(cur) || acc, false);
}

export function isJSONTable(data: string) {
  try {
    JSON.parse(data);
  } catch (e) {
    return false;
  }
  return true;
}

export function numWithWeights(entries: string[]) {
  return entries.reduce((numWeights, cur) => {
    if (hasWeights(cur)) {
      numWeights += 1;
    }
    return numWeights;
  }, 0);
}

export const parseFromTxt: TableParser = (table: string) => {
  const lines = breakLines(table);
  const name = lines.shift() || 'Parsed Table';
  console.log(`Name: ${name}`);
  const numWeighted: number = numWithWeights(lines);
  if (numWeighted > lines.length / 2) {
    throw new Error('Entries have weights');
  }
  return {
    name: nameFromFile(name),
    formula: `1d${lines.length}`,
    results: [...lines.map(entryStringMap)],
  };
};

export const rangeStringMap = (current: string): [number, number] => {
  let start, end: number;
  if (current.includes('-')) {
    [start, end] = current.split('-').map(Number);
  } else {
    start = Number(current);
    end = start;
  }
  if (end === 0) {
    end = 100;
  }
  if (start === 0) {
    start = 1;
  }
  return [start, end];
};

const entryCSVMap = (current: string): TableEntry => {
  const [stringRange, text] = current.split('|');
  const [start, end] = rangeStringMap(stringRange);
  return {
    text,
    range: [start, end],
  };
};

export function parseFromCSV(table: BasicTable) {
  const { name, entries } = table;
  const results = entries.map(entryCSVMap);
  return {
    name: nameFromFile(name),
    formula: formulaFromEntries(results),
    results,
  };
}

export function parseMultiLineWeighted(inputTable: string) {
  const lines = breakLines(inputTable);
  let name = 'Parsed Table';
  if (!hasWeights(lines[0])) {
    name = lines.shift() || 'Parsed Table';
  }
  const withWeights = numWithWeights(lines);
  if (withWeights !== lines.length / 2) {
    throw new Error('Not a multi line weighted table');
  }

  const entries = lines.reduce((acc: TableEntry[], curr: string) => {
    if (hasWeights(curr)) {
      acc.push(addWeight(curr));
    } else {
      acc[acc.length - 1].text = curr;
    }
    return acc;
  }, []);
  const formula = formulaFromEntries(entries);
  return {
    name,
    formula,
    results: entries,
  };
}
