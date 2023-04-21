import {
  ActionType,
  Activation,
  ItemType,
  Damage,
  ShortAbility,
  Save,
  Uses,
  Target,
  Recharge,
  UniversalItemType,
} from '../interfaces';

import { Range } from '../interfaces';
import { Feature, SectionLabel } from '../../actor/interfaces';
import { parseGenericFormula } from '../../actor/parsers/generic';
import { FifthItemType, FifthItem } from '../../actor/templates/fifthedition';
import { ItemParserInput } from '../typeGuardParserRunners';

function parseMeasurement(description: string, keyWord: string) {
  const unitText = description.split(keyWord)[0].trim();
  const lastItem = unitText.split(' ').pop() || '';
  return parseInt(lastItem.split('-')[0]);
}

export function parseSpellCone(description: string) {
  // like 20-foot-radius sphere
  return parseMeasurement(description, 'cone');
}

export function parseSpellSphere(description: string) {
  // like 20-foot-radius sphere
  return parseMeasurement(description, 'radius');
}

export function parseRange(description: string): Range | undefined {
  if (/reach/i.test(description)) {
    const stringValue = description.split(/reach/)[1].trim().split(' ')[0];
    const value = parseInt(stringValue);
    if (!isNaN(value)) return { value, units: 'ft' };
  }
  if (/range/i.test(description)) {
    const rangeStr = description.split(/range/i)[1].trim().split(' ')[0];
    const [value, long] = rangeStr.split('/').map((str) => parseInt(str));
    if (isNaN(value)) {
      const rangeRegex = /range (\d+) ft./;
      const rangeMatch = description.match(rangeRegex);
      if (rangeMatch) {
        const rangeValue = parseInt(rangeMatch[1]);
        if (!isNaN(rangeValue)) return { value: rangeValue, units: 'ft' };
      }
    }
    if (!isNaN(value)) return { value, long, units: 'ft' };
  }

  if (/cone/i.test(description)) {
    const value = parseSpellCone(description);
    if (!isNaN(value)) return { value, units: 'self' };
  }

  if (/within/i.test(description)) {
    const rangeStr = description
      .split(/within/i)[1]
      .trim()
      .split('ft')[0]
      .trim();
    const value = parseInt(rangeStr);
    if (!isNaN(value)) {
      return { value, units: 'ft' };
    }
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
  // match if (1d8)
  if (isWeaponType(description)) return 'weapon';
  if (/armor/i.test(description)) return 'equipment';
  if (/unil the next dawn/i.test(description)) return 'consumable';
  if (/beginning at/i.test(description)) return 'feat';
  if (/starting at/i.test(description)) return 'feat';
  return 'consumable';
}

export function parseActivation(name: string, description: string, section?: SectionLabel): Activation | undefined {
  // cost parsed from something like Wings of Syranita (Costs 2 Actions)
  const costString = name.match(/\(Costs (\d+) Actions\)/);
  const cost = costString ? parseInt(costString[1]) : 1;
  if (section) {
    switch (section) {
      case 'action': {
        return {
          type: 'action',
          cost,
        };
      }
      case 'bonus': {
        return {
          type: 'bonus',
          cost,
        };
      }
      case 'reaction': {
        return {
          type: 'reaction',
          cost,
        };
      }
      case 'legendary': {
        return {
          type: 'legendary',
          cost,
        };
      }
    }
  }

  if (/attack/i.test(description))
    return {
      type: 'action',
      cost,
    };

  if (description.includes('action'))
    return {
      type: 'action',
      cost,
    };
  if (description.includes('bonus action'))
    return {
      type: 'bonus',
      cost,
    };

  if (description.includes('spell save'))
    return {
      type: 'action',
      cost,
    };
  if (description.includes('saving throw'))
    return {
      type: 'action',
      cost,
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

// regex to match a die formula

export function isWeaponType(input: string): boolean {
  const dieRegex = /(\d+d\d+)/;
  return dieRegex.test(input) && /weapon/i.test(input);
}

// the logic for parsing type is different if it is sourced from a monster
export function parseTypeFromActorFeature(input: string): ItemType {
  if (isWeaponType(input)) return 'weapon';
  if (/weapon attack:/i.test(input)) return 'weapon';
  if (/spell attack/i.test(input)) return 'spell';
  if (/beginning at/i.test(input)) return 'feat';
  if (/starting at/i.test(input)) return 'feat';
  return 'feat';
}

export function parseActionType(description: string): ActionType {
  if (/melee/i.test(description)) return 'mwak';
  if (/ranged/i.test(description)) return 'rwak';
  if (/spell save/i.test(description)) return 'save';
  if (/saving throw/i.test(description)) return 'save';
  throw new Error(`Could not parse action type from ${description}`);
}

export function parsePossibleActionType(description: string): ActionType | undefined {
  if (/Melee Weapon Attack/.test(description)) return 'mwak';
  if (/Ranged Weapon Attack/.test(description)) return 'rwak';
  if (/spell save/i.test(description)) return 'save';
  if (/saving throw/i.test(description)) return 'save';
  return;
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
export function actionTypeExtraData(actionType: string | undefined, { description }: Feature) {
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

  return building;
}

/**
 * @param name the name of the spell
 * @param description the description of the spell
 * @returns { value: number, charged: boolean }
 *
 * @example
 * parseSpell('Poison Breath (Recharge 5-6)', 'A poisonous gas cloud spreads from the dragon\'s mouth,
 */
function parseRecharge(name: string): Recharge {
  if (!name.toLowerCase().includes('recharge')) {
    throw new Error(`${name} is not a recharge spell`);
  }
  const [, recharge] = name.toLowerCase().split('recharge');

  let range: string[] = [];
  if (recharge.includes('-')) {
    range = recharge.split('-');
  } else if (recharge.includes('–')) {
    range = recharge.split('–');
  }
  const [lower, upper] = range;
  return {
    value: parseInt(lower),
    charged: upper ? true : false,
  };
}

function parseUses(name: string, description: string): Uses | undefined {
  function parseDay(from: string): Uses | undefined {
    const perDay = parseInt(from.split('/')[0].split('(')[1]);
    if (isNaN(perDay)) return;
    return {
      per: 'day',
      value: perDay,
      max: perDay,
    };
  }
  if (/\/day/i.test(name)) {
    return parseDay(name);
  }

  if (/\/day/i.test(description)) {
    return parseDay(description);
  }
  throw new Error(`Unable to parse uses from ${name}`);
}

function parseTarget(description: string): Target {
  if (/radius/i.test(description)) {
    return {
      type: 'sphere',
      value: parseSpellSphere(description),
      units: 'ft',
    };
  }

  if (/cone/i.test(description)) {
    return {
      type: 'cone',
      value: parseSpellCone(description),
      units: 'ft',
    };
  }
  throw new Error(`Unable to parse target from ${description}`);
}

export function parseToItem({ name, description, ability, section }: ItemParserInput): UniversalItemType {
  const itemType: FifthItemType = parseTypeFromActorFeature(description);
  let damage: undefined | Damage = undefined;
  try {
    damage = { parts: buildDamageParts(description) };
  } catch (_) {
    // spell doesn't require damage
  }
  const actionType = parsePossibleActionType(description);

  let save: Save | undefined = undefined;
  if (actionType === 'save') {
    const dc = description?.split('DC')[1]?.trim()?.split(' ')[0]?.trim() ?? '';
    const uncleanAbility = description?.split(dc)[1]?.trim()?.split(' ')[0]?.trim() ?? '';
    const [short] = abilityToLongShort(uncleanAbility);
    ability = short as ShortAbility;
    save = {
      ability: short,
      dc: parseInt(dc),
      scaling: 'flat',
    };
  }

  let uses;
  try {
    uses = parseUses(name, description);
  } catch (_) {
    // uses can be undefined
  }

  let recharge;
  try {
    recharge = parseRecharge(name);
  } catch (_) {
    // recharge can be undefined
  }

  let target;
  try {
    target = parseTarget(description);
  } catch (_) {
    // target can be undefined
  }

  let range;
  try {
    range = parseRange(description);
  } catch (_) {
    // range can be undefined
  }
  return {
    name,
    type: itemType,
    ability,
    uses,
    save,
    recharge,
    description,
    activation: parseActivation(name, description, section),
    damage,
    actionType,
    range,
    attackBonus: 0,
    target,
  };
}

export function parsedToWeapon(name: string, inputDescription: string, inputAbility?: string): FifthItem {
  const parsedWeapon = parseToItem({ name, description: inputDescription, ability: inputAbility as ShortAbility });
  const { type, description, activation, damage, actionType, range, ability, attackBonus } = parsedWeapon;
  return {
    name,
    type,
    data: {
      description: {
        value: description,
      },
      activation,
      damage,
      actionType,
      range,
      ability,
      attackBonus,
    },
  };
}
