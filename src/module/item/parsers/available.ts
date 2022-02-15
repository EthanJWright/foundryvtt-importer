import { ImportItem, ShortAbility } from '../interfaces';
import { tryItemParsers } from '../typeGuardParserRunners';
import { parseFeat, parseSpell, parseWeapon } from './textBlock';
export const itemParsers = [parseWeapon, parseSpell, parseFeat];

export const parseItem = (name: string, description: string, ability?: ShortAbility): ImportItem => {
  return tryItemParsers(itemParsers, name, description, ability);
};
