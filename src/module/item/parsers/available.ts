import { SectionLabel } from '../../actor/interfaces';
import { ImportItem, ShortAbility } from '../interfaces';
import { tryItemParsers } from '../typeGuardParserRunners';
import { parseFeat, parseSpell, parseToItem, parseWeapon } from './textBlock';
export const itemParsers = [parseWeapon, parseSpell, parseFeat];

export const parseItem = ({
  name,
  description,
  ability,
  section,
}: {
  name: string;
  description: string;
  ability?: ShortAbility;
  section?: SectionLabel;
}): ImportItem => {
  try {
    const item = parseToItem({ name, description, ability, section });
    return item;
  } catch (e) {
    console.log(`Error parsing item: ${name} - ${e}`);
    throw new Error(`Failed to parse item: ${name}`);
  }

  // return tryItemParsers({ parsers: itemParsers, name, description, ability, section });
};
