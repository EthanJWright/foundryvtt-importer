import { FifthItem, ItemRarity } from '../fifthedition.actor.template';
import { parsedToWeapon } from './weapon';

interface ItemData {
  description: {
    value: string;
  };
  rarity: ItemRarity;
}

type ItemType = 'weapon' | 'equipment' | 'consumable' | 'tool' | 'loot' | 'class' | 'spell' | 'feat' | 'backpack';

export interface Item {
  name: string;
  type: ItemType;
  data: ItemData;
}

function parseName(input: string): string {
  return input.split('\n')[0].trim();
}

export function parseType(input: string): ItemType {
  if (/weapon/i.test(input)) return 'weapon';
  if (/armor/i.test(input)) return 'equipment';
  if (/unil the next dawn/i.test(input)) return 'consumable';
  if (/beginning at/i.test(input)) return 'feat';
  if (/starting at/i.test(input)) return 'feat';
  if (/melee weapon attack/i.test(input)) return 'weapon';
  if (/ranged weapon attack/i.test(input)) return 'weapon';
  if (/melee or ranged weapon attack/i.test(input)) return 'weapon';
  return 'consumable';
}

function parseRarity(input: string): ItemRarity {
  if (/uncommon/i.test(input)) return 'uncommon';
  if (/common/i.test(input)) return 'common';
  if (/rare/i.test(input)) return 'rare';
  if (/legendary/i.test(input)) return 'legendary';
  return 'common';
}

export function processItem(input: string): FifthItem {
  const type = parseType(input);
  const name = parseName(input);
  const description = input.replace(name, '').trim();
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
