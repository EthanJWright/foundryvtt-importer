import { FoundryTable } from './table.process';

export function parseRedditTable(userInput: string): FoundryTable {
  const raw = userInput.split('\n');
  const lines = raw.filter((line) => line !== '');
  return {
    name: lines.shift() || 'No Name',
    formula: `1d${lines.length}`,
    results: lines.map((line: string, index: number) => {
      return {
        range: [index + 1, index + 1],
        text: line.trim(),
      };
    }),
  };
}

export interface TableCollection {
  collection: FoundryTable[];
  name: string;
}

export function isRedditCollection(userInput: string) {
  return userInput.split(/d[0-9]{1,2}/).length > 1;
}

export function parseRedditCollection(userInput: string): TableCollection {
  const tables = userInput.split(/\nd[0-9]{1,2}/);
  return {
    name: (tables.shift() || 'No Name').trim(),
    collection: tables.map((table) => parseRedditTable(table)),
  };
}
