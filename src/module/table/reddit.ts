import { formulaFromEntries, FoundryTable, numWithWeights, TableEntry } from './parse';
import {
  addWeight,
  breakLines,
  hasWeights,
  hasWeightsRange,
  rangeStringMap,
  WEIGHT_RANGE_REGEX,
  WEIGHT_REGEX,
} from './lineManipulators';

export function cleanName(name: string) {
  return name
    .replace(/d[0-9]{1,3}/, '')
    .replace(/[0-9]{1,3}/, '')
    .trim();
}

export function hasDieNumber(line: string) {
  // match d4, d6, d8, d10, d12, d20, d100
  return /^d[0-9]{1,4}/.test(line.trim());
}

export function parseWeightedTable(userInput: string): FoundryTable {
  const raw = breakLines(userInput);
  const lines = raw.filter((line: string) => line !== '');
  let rawName = 'Parsed Table';
  if (!hasWeights(lines[0]) || hasDieNumber(lines[0])) {
    rawName = lines.shift() || 'No Name';
  }
  const name = cleanName(rawName);
  let results: TableEntry[] | undefined = undefined;
  let formula = `1d${lines.length}`;
  const numWeights = numWithWeights(lines);
  if (numWeights === lines.length) {
    results = lines.map(addWeight);
    if (!results) throw new Error('No results');
    formula = formulaFromEntries(results);
  } else {
    results = lines.map((line: string, index: number) => {
      return {
        range: [index + 1, index + 1],
        text: line.trim(),
      };
    });
  }
  if (!results) throw new Error('No results');
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

export function isRedditTable(userInput: string): boolean {
  return /^d[0-9]{1,3}/.test(userInput.trim());
}

export function isRedditCollection(userInput: string) {
  return userInput.split(/\nd[0-9]{1,2}/).length > 1;
}

export function parseRedditTable(userInput: string): FoundryTable {
  const raw = userInput.split('\n');
  const lines = raw.filter((line) => line !== '');
  const rawName = lines.shift() || 'No Name';
  const replacedName = rawName.replace(/d[0-9]{1,3}/, '').replace(/[0-9]{1,3}/, '');
  const name = replacedName.trim();
  let results: TableEntry[] | undefined = undefined;
  let formula = `1d${lines.length}`;
  if (hasWeights(lines[0])) {
    results = lines.map(addWeight);
    formula = formulaFromEntries(results);
  } else {
    results = lines.map((line: string, index: number) => {
      return {
        range: [index + 1, index + 1],
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

export function parseRedditCollection(userInput: string): TableCollection {
  const tables = userInput.split(/\nd[0-9]{1,2}/);
  return {
    name: (tables.shift() || 'No Name').trim(),
    collection: tables.map((table) => parseRedditTable(table)),
  };
}
