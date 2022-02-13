import { ImportItem, ShortAbility } from './interfaces';

export type ItemParser = (name: string, description: string, ability?: ShortAbility) => ImportItem;
export function tryItemParsers(
  parsers: ItemParser[],
  name: string,
  description: string,
  ability?: ShortAbility,
): ImportItem {
  for (const parser of parsers) {
    try {
      const item = parser(name, description, ability);
      if (item) {
        return item;
      }
    } catch (e) {
      // trying other parsers
    }
  }
  throw new Error(`Unable to parse ${name}`);
}
