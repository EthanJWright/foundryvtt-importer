import { FifthItem } from '../actor/templates/fifthedition';
import { ImportItem, SpellType } from './interfaces';

function spellRoute(item: SpellType): FifthItem {
  const { name, type, description, activation, range, save, uses, ability } = item;
  return {
    name,
    type,
    data: {
      description: {
        value: description,
      },
      activation,
      range,
      save,
      uses,
      ability,
    },
  };
}

export function itemToFifth(item: ImportItem): FifthItem {
  switch (item.type) {
    case 'weapon': {
      const { name, type, description, activation, damage, actionType, range, ability, attackBonus } = item;
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
    case 'spell': {
      return spellRoute(item);
    }
    case 'feat': {
      if ((item as SpellType)?.hasSpellData) {
        return spellRoute(item as SpellType);
      }
      const { name, type, description } = item;
      return {
        name,
        type,
        data: {
          description: {
            value: description,
          },
        },
      };
    }
    default:
      throw new Error(`Unknown item type: ${item.type}`);
  }
}
