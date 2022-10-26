import { SectionLabel } from '../actor/interfaces';
import { ImportItem, ShortAbility } from './interfaces';

export interface ItemParserInput {
  name: string;
  description: string;
  ability?: ShortAbility;
  section?: SectionLabel;
}

export type ItemParser = (input: ItemParserInput) => ImportItem;
export function tryItemParsers({
  parsers,
  name,
  description,
  ability,
  section,
}: {
  parsers: ItemParser[];
  name: string;
  description: string;
  ability?: ShortAbility;
  section?: SectionLabel;
}): ImportItem {
  for (const parser of parsers) {
    try {
      const item = parser({ name, description, ability, section });
      if (item) {
        return item;
      }
    } catch (e) {
      // trying other parsers
    }
  }
  throw new Error(`Unable to parse ${name}`);
}
