import { FifthItem, ItemRarity } from '../fifthedition.actor.template';
import { ItemType, parsedToWeapon, parseType } from './weapon';

interface ItemData {
  description: {
    value: string;
  };
  rarity: ItemRarity;
}

export interface Item {
  name: string;
  type: ItemType;
  data: ItemData;
}

function parseName(input: string): string {
  return input.split('\n')[0].trim();
}

function parseRarity(input: string): ItemRarity {
  if (/uncommon/i.test(input)) return 'uncommon';
  if (/common/i.test(input)) return 'common';
  if (/rare/i.test(input)) return 'rare';
  if (/legendary/i.test(input)) return 'legendary';
  return 'common';
}

function scrubDescription(description: string, extraItems: string[]): string {
  return extraItems.reduce((acc, item) => acc.replace(item, '').trim(), description).replace('\n', '');
}

export function processItem(input: string): FifthItem {
  const type = parseType(input);
  const name = parseName(input);
  const description = scrubDescription(input, [name, type]);
  switch (type) {
    case 'weapon':
    case 'feat':
      return parsedToWeapon(name, description);
    default:
      return {
        name,
        type,
        data: {
          description: {
            value: description,
          },
          rarity: parseRarity(input),
        },
      };
  }
}
