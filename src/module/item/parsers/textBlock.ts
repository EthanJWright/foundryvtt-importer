import {
  ActionType,
  Activation,
  ItemType,
  Damage,
  ShortAbility,
  WeaponType,
  SpellType,
  Save,
  Uses,
  Target,
  FeatType,
  Recharge,
} from '../interfaces';

import { Range } from '../interfaces';
import { Feature } from '../../actor/interfaces';
import { parseGenericFormula } from '../../actor/parsers/generic';
import { FifthItemType, FifthItem } from '../../actor/templates/fifthedition';

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

export function parseRange(description: string): Range {
  if (/reach/i.test(description)) {
    const stringValue = description.split(/reach/)[1].trim().split(' ')[0];
    const value = parseInt(stringValue);
    return { value };
  }
  if (/range/i.test(description)) {
    const rangeStr = description.split(/range/i)[1].trim().split(' ')[0];
    const [value, long] = rangeStr.split('/').map((str) => parseInt(str));
    if (value === NaN) throw new Error(`Unable to parse range from ${description}`);
    return { value, long };
  }
  if (/cone/i.test(description)) {
    const value = parseSpellCone(description);
    return { units: 'self', value };
  }
  if (/within/.test(description)) {
    const rangeStr = description
      .split(/within/i)[1]
      .trim()
      .split('ft')[0]
      .trim();
    const value = parseInt(rangeStr);
    if (value === NaN) throw new Error(`Unable to parse range from ${description}`);
    return { value };
  }
  throw new Error(`Unable to parse range: ${description}`);
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

// regex to match a die formula

export function isWeaponType(input: string): boolean {
  const dieRegex = /(\d+d\d+)/;
  return dieRegex.test(input) && /weapon/i.test(input);
}

// the logic for parsing type is different if it is sourced from a monster
export function parseTypeFromActorFeature(input: string): ItemType {
  if (/beginning at/i.test(input)) return 'feat';
  if (/starting at/i.test(input)) return 'feat';
  if (isWeaponType(input)) return 'weapon';
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

export function parseWeapon(name: string, description: string, inputAbility?: ShortAbility): WeaponType {
  const ability = inputAbility || 'str';
  const itemType: FifthItemType = parseTypeFromActorFeature(description);
  if (itemType !== 'weapon') throw new Error(`${name} is not a weapon, it is a ${itemType}`);
  const damage: Damage = { parts: buildDamageParts(description) };
  const actionType = parseActionType(description);
  if (actionType !== 'rwak' && actionType !== 'mwak') throw new Error(`${name} is not a weapon`);

  return {
    name,
    type: itemType,
    description,
    activation: parseActivation(description),
    damage,
    actionType,
    range: parseRange(description),
    ability,
    attackBonus: 0,
    ...actionTypeExtraData(actionType, { name, description }),
  };
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

function parseUses(name: string, description: string): Uses {
  if (/\/day/i.test(name)) {
    const perDay = parseInt(name.split('/')[0].split('(')[1]);
    return {
      per: 'day',
      value: perDay,
      max: perDay,
    };
  }

  if (/\/day/i.test(description)) {
    const perDay = parseInt(description.split('/')[0].split('(')[1]);
    return {
      per: 'day',
      value: perDay,
      max: perDay,
    };
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

export function parseSpell(name: string, description: string, inputAbility?: ShortAbility): SpellType {
  const itemType: FifthItemType = parseTypeFromActorFeature(description);
  if (itemType !== 'spell' && itemType !== 'feat') throw new Error(`${name} is not a spell`);
  let damage: undefined | Damage = undefined;
  try {
    damage = { parts: buildDamageParts(description) };
  } catch (_) {
    // spell doesnt require damage
  }
  let actionType: 'save' | undefined;
  try {
    if (parseActionType(description) === 'save') actionType = 'save';
  } catch (_) {
    // action type can be undefined
  }
  let save: Save | undefined = undefined;
  let ability = inputAbility;
  if (actionType === 'save') {
    const dc = description.split('DC')[1].trim().split(' ')[0].trim();
    const uncleanAbility = description.split(dc)[1].trim().split(' ')[0].trim();
    const [short] = abilityToLongShort(uncleanAbility);
    ability = short as ShortAbility;
    save = {
      ability: short,
      dc: parseInt(dc),
      scaling: 'spell',
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

  return {
    name,
    type: 'feat',
    hasSpellData: true,
    ability,
    uses,
    save,
    recharge,
    description,
    activation: parseActivation(description),
    damage,
    actionType,
    range: parseRange(description),
    attackBonus: 0,
    target: parseTarget(description),
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function parseFeat(name: string, description: string, _?: ShortAbility): FeatType {
  const itemType: FifthItemType = parseTypeFromActorFeature(description);
  if (itemType !== 'feat') throw new Error(`${name} is not a feat, it is an ${itemType}`);
  return {
    name,
    type: 'feat',
    description,
  };
}

export function parsedToWeapon(name: string, inputDescription: string, inputAbility?: string): FifthItem {
  const parsedWeapon = parseWeapon(name, inputDescription, inputAbility as ShortAbility);
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
