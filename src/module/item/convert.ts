import { FifthItem } from '../actor/templates/fifthedition';
import { ImportItem } from './interfaces';

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
    case 'feat': {
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
