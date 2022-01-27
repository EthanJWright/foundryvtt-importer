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
  if (/ranged/.test(description)) return 'rwak';
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

export function featuresToItems(features: Feature[], abilities: Abilities): FifthItem[] {
  return features.map((feature) => {
    let activationType: FifthFeatureCost = 'none';
    const itemType: FifthItemType = getItemType(feature.description);
    if (feature.description.includes('action')) activationType = 'action';
    if (feature.description.includes('bonus action')) activationType = 'bonus';

    const damage = itemType === 'weapon' ? { parts: buildDamageParts(feature.description) } : {};
    const ability = getMaxAbility(abilities);

    return {
      name: feature.name,
      type: itemType,
      data: {
        description: {
          value: feature.description,
        },
        activation: {
          type: activationType,
        },
        damage,
        actionType: getActionType(feature.description),
        ability,
      },
    };
  });
}
