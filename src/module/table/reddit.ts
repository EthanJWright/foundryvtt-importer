import { formulaFromEntries, FoundryTable, rangeStringMap, TableEntry } from './parse';

const WEIGHT_RANGE_REGEX = /^[0-9]{1,3}-[0-9]{1,3}./;
const WEIGHT_REGEX = /^[0-9]{1,3}./;

export function hasWeightsRange(item: string) {
  return WEIGHT_RANGE_REGEX.test(item.trim());
}

export function hasWeights(item: string): boolean {
  return WEIGHT_REGEX.test(item.trim());
}

export function addWeight(line: string): TableEntry {
  let regex = WEIGHT_REGEX;
  if (hasWeightsRange(line)) {
    regex = WEIGHT_RANGE_REGEX;
  }
  const matches = line.trim().match(regex);
  if (!matches || matches.length > 1) throw new Error(`Invalid line: ${line} ${matches}`);
  return {
    text: line.replace(regex, '').trim(),
    range: rangeStringMap(matches[0]),
  };
}

export function cleanName(name: string) {
  return name
    .replace(/d[0-9]{1,3}/, '')
    .replace(/[0-9]{1,3}/, '')
    .trim();
}

export function parseWeightedTable(userInput: string): FoundryTable {
  const raw = userInput.split('\n');
  const lines = raw.filter((line) => line !== '');
  let rawName = 'Parsed Table';
  if (!hasWeights(lines[0])) {
    rawName = lines.shift() || 'No Name';
  }
  const name = cleanName(rawName);
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

export function parseRedditCollection(userInput: string): TableCollection {
  const tables = userInput.split(/\nd[0-9]{1,2}/);
  return {
    name: (tables.shift() || 'No Name').trim(),
    collection: tables.map((table) => parseWeightedTable(table)),
  };
}
