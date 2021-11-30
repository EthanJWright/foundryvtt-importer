import { FoundryTable, rangeStringMap, TableEntry } from './table.process';

const WEIGHT_REGEX = /^[0-9]{1,3}-[0-2]{1,3}/;

export function hasWeights(item: string): boolean {
  return WEIGHT_REGEX.test(item.trim());
}

export function addRedditRange(line: string): TableEntry {
  const matches = line.match(WEIGHT_REGEX);
  if (!matches || matches.length > 1) throw new Error(`Invalid line: ${matches}`);
  return {
    text: line.replace(WEIGHT_REGEX, '').trim(),
    range: rangeStringMap(matches[0]),
  };
}

export function parseRedditTable(userInput: string): FoundryTable {
  const raw = userInput.split('\n');
  const lines = raw.filter((line) => line !== '');
  const name = lines.shift() || 'No Name';
  let results: TableEntry[] | undefined = undefined;
  const formula = `1d${lines.length}`;
  // TODO: base formula off weights if weights exist
  if (hasWeights(lines[1])) {
    results = lines.map(addRedditRange);
  } else {
    results = lines.map((line: string, index: number) => {
      return {
        range: [index + 1, index + 1], // TODO: base range off weights if weights exist
        text: line.trim(),
      };
    });
  }

  return {
    name,
    formula,
    results,
  };
}

export interface TableCollection {
  collection: FoundryTable[];
  name: string;
}

export function isRedditCollection(userInput: string) {
  return userInput.split(/\nd[0-9]{1,2}/).length > 1;
}

export function parseRedditCollection(userInput: string): TableCollection {
  const tables = userInput.split(/\nd[0-9]{1,2}/);
  return {
    name: (tables.shift() || 'No Name').trim(),
    collection: tables.map((table) => parseRedditTable(table)),
  };
}
