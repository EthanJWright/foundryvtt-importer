import { Abilities, Feature, parseFormula } from '../actors.process';
import { FifthFeatureCost, FifthItem, FifthItemType, FifthStat } from '../fifthedition.actor.template';

function getDamageType(from: string): string | undefined {
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

function getActionType(description: string): string | undefined {
  if (/melee/i.test(description)) return 'mwak';
  if (/ranged/i.test(description)) return 'rwak';
  if (/spell save/i.test(description)) return 'save';
  if (/saving throw/i.test(description)) return 'save';
  return undefined;
}

function getItemType(description: string): FifthItemType {
  let itemType: FifthItemType = 'feat';
  if (/melee weapon attack/i.test(description)) itemType = 'weapon';
  if (/ranged weapon attack/i.test(description)) itemType = 'weapon';
  if (/melee or ranged weapon attack/i.test(description)) itemType = 'weapon';
  return itemType;
}

function getMaxAbility(abilities: Abilities): FifthStat {
  if (abilities.str.mod > abilities.dex.mod) return 'str';
  return 'dex';
}

export function buildDamageParts(description: string) {
  // description = 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target.Hit: 8 (1d8 + 4) piercing damage.'
  const uncleanParts = description.split('plus');
  const parts = uncleanParts.map((part) => {
    const parsed = parseFormula(part, /Melee Weapon Attack: +/);
    const fromString = parsed.afterFormula ? parsed.afterFormula : part;
    return [parsed.str, getDamageType(fromString)];
  });
  return parts;
}

interface Range {
  value?: number;
  long?: number;
  units?: string;
}
export function getRange(description: string): Range | undefined {
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

interface Activation {
  type: FifthFeatureCost;
  cost?: number;
  condition?: string;
}
function getActivation(feature: Feature): Activation | undefined {
  const { description } = feature;
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

function abilityToLongShort(ability: string) {
  if (/str/i.test(ability)) return ['str', 'strength'];
  if (/dex/i.test(ability)) return ['dex', 'dexterity'];
  if (/con/i.test(ability)) return ['con', 'constitution'];
  if (/int/i.test(ability)) return ['int', 'intelligence'];
  if (/wis/i.test(ability)) return ['wis', 'wisdom'];
  if (/cha/i.test(ability)) return ['cha', 'charisma'];
  return ['', ''];
}

export function parseSpellSphere(description: string) {
  // like 20-foot-radius sphere
  const unitText = description.split('radius')[0].trim();
  const lastItem = unitText.split(' ').pop() || '';
  return parseInt(lastItem.split('-')[0]);
}

export function parseSpellCone(description: string) {
  // like 20-foot-radius sphere
  const unitText = description.split('cone')[0].trim();
  const lastItem = unitText.split(' ').pop() || '';
  return parseInt(lastItem.split('-')[0]);
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

export function featuresToItems(features: Feature[], abilities: Abilities): FifthItem[] {
  return features.map((feature) => {
    const itemType: FifthItemType = getItemType(feature.description);

    const damage = itemType === 'weapon' ? { parts: buildDamageParts(feature.description) } : {};
    const ability = getMaxAbility(abilities);
    const actionType = getActionType(feature.description);

    return {
      name: feature.name,
      type: itemType,
      data: {
        description: {
          value: feature.description,
        },
        activation: getActivation(feature),
        damage,
        actionType,
        range: getRange(feature.description),
        ability,
        attackBonus: 0,
        ...actionTypeExtraData(actionType, feature),
      },
    };
  });
}
