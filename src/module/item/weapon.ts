import { Abilities, Feature } from '../actor/interfaces';
import {
  buildDamageParts,
  parseActionType,
  parseActivation,
  parseRange,
  parseTypeFromActorFeature,
  actionTypeExtraData,
} from './parsers/textBlock';
import { FifthItem, FifthItemType, FifthStat } from '../actor/templates/fifthedition';
import { Damage, ImportItem, ShortAbility } from './interfaces';

function getMaxAbility(abilities: Abilities): FifthStat {
  if (abilities.str.mod > abilities.dex.mod) return 'str';
  return 'dex';
}

function parseWeapon(name: string, description: string, ability?: ShortAbility): ImportItem {
  const itemType: FifthItemType = parseTypeFromActorFeature(description);

  const damage: Damage | undefined = itemType === 'weapon' ? { parts: buildDamageParts(description) } : undefined;
  const actionType = parseActionType(description);

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

export function parsedToWeapon(name: string, inputDescription: string, inputAbility?: string): FifthItem {
  const parsedWeapon = parseWeapon(name, inputDescription, inputAbility as ShortAbility);
  const { type, description, activation, damage, actionType, range, ability, attackBonus, save, uses } = parsedWeapon;
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
      save,
      uses,
    },
  };
}

export function featuresToItems(features: Feature[], abilities: Abilities): FifthItem[] {
  return features.map((feature) => parsedToWeapon(feature.name, feature.description, getMaxAbility(abilities)));
}
