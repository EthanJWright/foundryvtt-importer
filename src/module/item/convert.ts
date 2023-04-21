import { FifthItem } from '../actor/templates/fifthedition';
import { getItemImageFromPacksAsync } from './compendium/item';
import { ImportItem } from './interfaces';

export async function itemToFifth(item: ImportItem): Promise<FifthItem> {
  const img = await getItemImageFromPacksAsync(item.name, item.type);
  const { name, save, uses, type, description, activation, damage, actionType, range, ability, attackBonus } = item;
  return {
    name,
    type,
    img,
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
