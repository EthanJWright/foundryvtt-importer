import { FifthItem } from '../../actor/templates/fifthedition';
import { CompendiumSpell, Packs, Pack } from './interfaces';

let dndPacks: null | Packs = null;
let otherPacks: null | Packs = null;

const getItemFromPackAsync = async (pack: Pack, itemName: string) => {
  let result = null;
  const lowerName = itemName.toLowerCase();
  const item = pack.index.find((e) => lowerName === e?.name?.toLowerCase());

  if (item) {
    const itemDoc = await pack.getDocument(item._id);
    result = itemDoc?.toObject();
  }

  return result;
};

export const getItemImageFromPacksAsync = async (itemName: string, itemType: string): Promise<string | undefined> => {
  const item = await getItemFromPacksAsync(itemName, itemType);
  return (item as any)?.img;
};

export const getItemFromPacksAsync = async (itemName: string, type: string): Promise<CompendiumSpell> => {
  let result = null;

  // Create pack arrays once to save time.
  if (dndPacks == null && otherPacks == null) {
    // Look through the non-default packs first, since those are more
    // likely to contain customized versions of the dnd5e items.
    dndPacks = [];
    otherPacks = [];

    for (const pack of (game as Game).packs) {
      if ((pack.metadata as any).id.startsWith('dnd5e')) {
        dndPacks.push(pack);
      } else {
        otherPacks.push(pack);
      }
    }
  }

  if (otherPacks != null) {
    for (const pack of otherPacks) {
      result = await getItemFromPackAsync(pack, itemName);

      if (result && (!type || (result as any).type === type)) {
        break;
      }
    }
  }

  if (result == null && dndPacks != null) {
    for (const pack of dndPacks) {
      result = await getItemFromPackAsync(pack, itemName);

      if (result && (!type || (result as any).type === type)) {
        break;
      }
    }
  }

  return result as FifthItem;
};
