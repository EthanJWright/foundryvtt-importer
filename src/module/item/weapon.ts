import { Abilities, Feature } from '../actor/interfaces';
import { parseGenericFormula } from '../actor/parsers/generic';
import {
  parseActionType,
  parseActivation,
  parseDamageType,
  parseRange,
  parseSpellCone,
  parseSpellSphere,
  parseTypeFromActorFeature,
} from './parsers';
import { FifthItem, FifthItemType, FifthStat } from '../actor/templates/fifthedition';

function getMaxAbility(abilities: Abilities): FifthStat {
  if (abilities.str.mod > abilities.dex.mod) return 'str';
  return 'dex';
}

export function buildDamageParts(description: string) {
  // description = 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target.Hit: 8 (1d8 + 4) piercing damage.'
  const uncleanParts = description.split('plus');
  const parts = uncleanParts.map((part) => {
    const parsed = parseGenericFormula(part, /Melee Weapon Attack: +/);
    const fromString = parsed.afterFormula ? parsed.afterFormula : part;
    return [parsed.str, parseDamageType(fromString)];
  });
  return parts;
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

function actionTypeExtraData(actionType: string | undefined, { name, description }: Feature) {
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
  const itemType: FifthItemType = parseTypeFromActorFeature(description);

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

export function featuresToItems(features: Feature[], abilities: Abilities): FifthItem[] {
  return features.map((feature) => parsedToWeapon(feature.name, feature.description, getMaxAbility(abilities)));
}
