import { TableEntry } from './parse';

export const WEIGHT_RANGE_REGEX = /^[0-9]{1,3}-[0-9]{1,3}./;
export const WEIGHT_REGEX = /^[0-9]{1,3}./;

export function hasWeightsRange(item: string) {
  return WEIGHT_RANGE_REGEX.test(item.trim());
}
export const breakLines = (data: string) => {
  const rawLines = data.split('\n');
  return rawLines.filter((line) => {
    return line !== '';
  });
};

export const rangeStringMap = (current: string): [number, number] => {
  let start, end: number;
  if (current.includes('-')) {
    [start, end] = current.split('-').map(Number);
  } else if (current.includes('–')) {
    [start, end] = current.split('–').map(Number);
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

export function hasWeights(item: string): boolean {
  return WEIGHT_REGEX.test(item.trim());
}
