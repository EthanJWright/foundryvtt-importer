import { SectionLabel } from '../../actor/interfaces';
import { ImportItem, ShortAbility } from '../interfaces';
import { tryItemParsers } from '../typeGuardParserRunners';
import { parseFeat, parseSpell, parseWeapon } from './textBlock';
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
  return tryItemParsers({ parsers: itemParsers, name, description, ability, section });
};
