type ItemRarity = 'common' | 'uncommon' | 'rare' | 'legendary';

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

function parseType(input: string): ItemType {
  const type = 'consumable';
  return type;
}

function parseRarity(input: string): ItemRarity {
  if (/uncommon/i.test(input)) return 'uncommon';
  if (/common/i.test(input)) return 'common';
  if (/rare/i.test(input)) return 'rare';
  if (/legendary/i.test(input)) return 'legendary';
  return 'common';
}

export function processItem(input: string): Item {
  return {
    name: parseName(input),
    type: parseType(input),
    data: {
      description: {
        value: '',
      },
      rarity: parseRarity(input),
    },
  };
}
