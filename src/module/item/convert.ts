import { FifthItem } from '../actor/templates/fifthedition';
import { ImportItem } from './interfaces';

export function itemToFifth(item: ImportItem): FifthItem {
  const { name, save, uses, type, description, activation, damage, actionType, range, ability, attackBonus } = item;
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
      save,
      uses,
      attackBonus,
    },
  };
}
