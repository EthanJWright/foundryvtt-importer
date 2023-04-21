import { ImportSpell } from '../actor/interfaces';
import { FifthItem } from '../actor/templates/fifthedition';
import { getItemFromPacksAsync, getItemImageFromPacksAsync } from './compendium/item';
import { ImportItem } from './interfaces';

export async function spellToFifth(spell: ImportSpell): Promise<FifthItem | undefined> {
  let item = await getItemFromPacksAsync(spell.name, 'spell');
  if (!item) return;

  if (spell.uses.atWill) {
    spell.uses.atWill = undefined;
    item = {
      ...item,
      system: {
        ...item.system,
        preparation: {
          ...item?.system?.preparation,
          mode: 'innate',
        },
        uses: spell.uses,
      },
    };
  }

  const fifthItem = {
    name: item.name,
    type: item.type,
    img: item.img,
    data: {
      ...item.system,
    },
  } as any;

  return fifthItem;
}

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
