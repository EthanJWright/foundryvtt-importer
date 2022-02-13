import { ActionType, Activation, ItemType } from '../interfaces';

import { Range } from '../interfaces';
import { Feature } from '../../actor/interfaces';
import { parseGenericFormula } from '../../actor/parsers/generic';
import { FifthItem } from '../../actor/templates/fifthedition';

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

export function parseDamageType(from: string): string {
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
  throw new Error(`Unable to parse damage type from ${from}`);
}

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

export function buildDamageParts(description: string): string[][] {
  // description = 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target.Hit: 8 (1d8 + 4) piercing damage.'
  const uncleanParts = description.split('plus');
  if (!uncleanParts) throw new Error(`Unable to parse damage parts from ${description}`);
  const parts = uncleanParts.map((part) => {
    const parsed = parseGenericFormula(part, /Melee Weapon Attack: +/);
    if (!parsed || !parsed?.str) throw new Error(`Unable to parse damage parts from ${description}`);
    const fromString = parsed.afterFormula ? parsed.afterFormula : part;
    return [parsed.str, parseDamageType(fromString)];
  });
  return parts;
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

export function parseActionType(description: string): ActionType {
  if (/melee/i.test(description)) return 'mwak';
  if (/ranged/i.test(description)) return 'rwak';
  if (/spell save/i.test(description)) return 'save';
  if (/saving throw/i.test(description)) return 'save';
  throw new Error(`Could not parse action type from ${description}`);
}

function abilityToLongShort(ability: string) {
  if (/str/i.test(ability)) return ['str', 'strength'];
  if (/dex/i.test(ability)) return ['dex', 'dexterity'];
  if (/con/i.test(ability)) return ['con', 'constitution'];
  if (/int/i.test(ability)) return ['int', 'intelligence'];
  if (/wis/i.test(ability)) return ['wis', 'wisdom'];
  if (/cha/i.test(ability)) return ['cha', 'charisma'];
  return ['', ''];
}
export function actionTypeExtraData(actionType: string | undefined, { name, description }: Feature) {
  let building = {};
  if (!actionType) return building;
  if (actionType === 'save') {
    const dc = description.split('DC')[1].trim().split(' ')[0].trim();
    const uncleanAbility = description.split(dc)[1].trim().split(' ')[0].trim();
    const [short] = abilityToLongShort(uncleanAbility);
    building = {
      ...building,
      ability: short,
      save: {
        ability: short,
        dc: parseInt(dc),
        scaling: 'spell',
      },
    };
  }

  if (/\/day/i.test(name)) {
    const perDay = parseInt(name.split('/')[0].split('(')[1]);
    building = {
      ...building,
      uses: {
        per: 'day',
        value: perDay,
        max: perDay,
      },
    };
  }

  if (/radius/i.test(description)) {
    building = {
      ...building,
      target: {
        type: 'sphere',
        value: parseSpellSphere(description),
        units: 'ft',
      },
    };

    if (/cone/i.test(description)) {
      building = {
        ...building,
        target: {
          type: 'cone',
          value: parseSpellCone(description),
          units: 'ft',
        },
      };
    }
  }

  return building;
}

export function parsedToWeapon(name: string, description: string, ability?: string): FifthItem {
  const itemType: ItemType = parseTypeFromActorFeature(description);

  const damage = itemType === 'weapon' ? { parts: buildDamageParts(description) } : {};
  const actionType = parseActionType(description);

  return {
    name,
    type: itemType,
    data: {
      description: {
        value: description,
      },
      activation: parseActivation(description),
      damage,
      actionType,
      range: parseRange(description),
      ability,
      attackBonus: 0,
      ...actionTypeExtraData(actionType, { name, description }),
    },
  };
}
