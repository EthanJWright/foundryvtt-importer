import { ImportSpell } from '../actor/interfaces';
import { FifthItem } from '../actor/templates/fifthedition';
import { getItemFromPacksAsync, getItemImageFromPacksAsync } from './compendium/item';
import { ImportItem } from './interfaces';

const spellUsesToUses = (uses: ImportSpell['uses']): FifthItem['data']['uses'] => {
  const { value, per } = uses;
  const newUses = {
    value,
    max: value?.toString(),
    per,
  };
  return newUses;
};

export async function spellToFifth(passedSpell: ImportSpell): Promise<FifthItem | undefined> {
  const spell = { ...passedSpell };
  let item = await getItemFromPacksAsync(spell.name, 'spell');
  if (!item) return;

  let mode = undefined;
  if (spell.uses.atWill) {
    mode = 'innate';
  }
  item = {
    ...item,
    system: {
      ...item.system,
      preparation: {
        ...item?.system?.preparation,
        mode,
      },
      uses: spellUsesToUses(spell.uses),
    },
  };

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
  const fifthUses = uses ? spellUsesToUses(uses) : undefined;

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
      uses: fifthUses,
      attackBonus: attackBonus?.toString(),
    },
  };
}
