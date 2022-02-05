import { ActionType, FifthFeatureCost } from '../fifthedition.actor.template';

export function parseSpellCone(description: string) {
  // like 20-foot-radius sphere
  const unitText = description.split('cone')[0].trim();
  const lastItem = unitText.split(' ').pop() || '';
  return parseInt(lastItem.split('-')[0]);
}

export function parseSpellSphere(description: string) {
  // like 20-foot-radius sphere
  const unitText = description.split('radius')[0].trim();
  const lastItem = unitText.split(' ').pop() || '';
  return parseInt(lastItem.split('-')[0]);
}

interface Range {
  value?: number;
  long?: number;
  units?: string;
}

export function parseRange(description: string): Range | undefined {
  if (description.includes('reach')) {
    const value = parseInt(description.split('reach')[1].split(' ')[0]);
    return { value };
  }
  if (description.includes('range')) {
    const rangeStr = description.split('range')[1].split(' ')[0];
    const [value, long] = rangeStr.split('/').map((str) => parseInt(str));
    return { value, long };
  }
  if (/cone/i.test(description)) {
    return { units: 'self' };
  }
  if (/within/.test(description)) {
    const rangeStr = description.split('within')[1].split('ft')[0].trim();
    const value = parseInt(rangeStr);
    return { value };
  }
}

export function parseDamageType(from: string): string | undefined {
  if (from.includes('piercing')) return 'piercing';
  if (from.includes('slashing')) return 'slashing';
  if (from.includes('bludgeoning')) return 'bludgeoning';
  if (from.includes('fire')) return 'fire';
  if (from.includes('cold')) return 'cold';
  if (from.includes('lightning')) return 'lightning';
  if (from.includes('acid')) return 'acid';
  if (from.includes('poison')) return 'poison';
  if (from.includes('psychic')) return 'psychic';
  if (from.includes('radiant')) return 'radiant';
  if (from.includes('thunder')) return 'thunder';
  if (from.includes('force')) return 'force';
  if (from.includes('necrotic')) return 'necrotic';
  if (from.includes('psychic')) return 'psychic';
}

export function parseActionType(description: string): ActionType {
  if (/melee/i.test(description)) return 'mwak';
  if (/ranged/i.test(description)) return 'rwak';
  if (/spell save/i.test(description)) return 'save';
  if (/saving throw/i.test(description)) return 'save';
  return undefined;
}

export type ItemType =
  | 'weapon'
  | 'equipment'
  | 'consumable'
  | 'tool'
  | 'loot'
  | 'class'
  | 'spell'
  | 'feat'
  | 'backpack';

export function parseType(description: string): ItemType {
  if (/weapon/i.test(description)) return 'weapon';
  if (/armor/i.test(description)) return 'equipment';
  if (/unil the next dawn/i.test(description)) return 'consumable';
  if (/beginning at/i.test(description)) return 'feat';
  if (/starting at/i.test(description)) return 'feat';
  if (/melee weapon attack/i.test(description)) return 'weapon';
  if (/ranged weapon attack/i.test(description)) return 'weapon';
  if (/melee or ranged weapon attack/i.test(description)) return 'weapon';
  return 'consumable';
}

// the logic for parsing type is different if it is sourced from a monster
export function parseTypeFromActorFeature(input: string): ItemType {
  if (/weapon/i.test(input)) return 'weapon';
  if (/beginning at/i.test(input)) return 'feat';
  if (/starting at/i.test(input)) return 'feat';
  if (/melee weapon attack/i.test(input)) return 'weapon';
  if (/ranged weapon attack/i.test(input)) return 'weapon';
  if (/melee or ranged weapon attack/i.test(input)) return 'weapon';
  return 'feat';
}

interface Activation {
  type: FifthFeatureCost;
  cost?: number;
  condition?: string;
}
export function parseActivation(description: string): Activation | undefined {
  if (/attack/i.test(description))
    return {
      type: 'action',
      cost: 1,
    };

  if (description.includes('action'))
    return {
      type: 'action',
      cost: 1,
    };
  if (description.includes('bonus action'))
    return {
      type: 'bonus',
      cost: 1,
    };

  if (description.includes('spell save'))
    return {
      type: 'action',
      cost: 1,
    };
  if (description.includes('saving throw'))
    return {
      type: 'action',
      cost: 1,
    };
}
