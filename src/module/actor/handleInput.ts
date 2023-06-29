import { textToActor } from './parsers';
import { actorToFifth, spellsToSpellSlots } from './convert';
import { UserData } from '../importForm';
import { FifthItem } from './templates/fifthedition';
import { itemToFifth, spellToFifth } from '../item/convert';

async function txtRoute(stringData: string) {
  const actor = textToActor(stringData);
  const { items } = actor;
  const preparedItems = await Promise.all(
    items.map((item) => {
      return itemToFifth(item);
    }),
  );

  let reducedSpells: Array<FifthItem> = [];
  if (actor?.spells) {
    const addedSpells: Array<FifthItem | undefined> = await Promise.all(
      actor?.spells?.map((spell) => {
        return spellToFifth(spell);
      }),
    );

    reducedSpells = addedSpells.reduce((acc: FifthItem[], cur: FifthItem | undefined) => {
      if (cur) {
        acc.push(cur);
      }
      return acc;
    }, []);

    preparedItems.push(...reducedSpells);
  }

  const spellSlots = spellsToSpellSlots(actor.spells, reducedSpells);

  const convertedActor = actorToFifth(actor);
  convertedActor.spells = spellSlots;

  // call spellSlots here
  const foundryActor = await Actor.create({
    name: actor.name,
    type: 'npc',
    data: convertedActor,
  });

  if (!foundryActor) return;

  await Promise.all(
    preparedItems.map(async (item: FifthItem) => {
      const foundryItem = new Item(item);
      await foundryActor.createEmbeddedDocuments('Item', [foundryItem.toObject()]);
    }),
  );
}

export async function processActorInput({ jsonfile, clipboardInput }: UserData) {
  if (clipboardInput) {
    console.log(`Clipboard input: ${clipboardInput}`);
    txtRoute(clipboardInput);
    return;
  }
  const response = await fetch(jsonfile);
  if (!response.ok) {
    console.log(`Error reading ${jsonfile}`);
    return;
  }
  const data = await response.text();
  console.log(`Data: ${data}`);

  const ext = jsonfile.split('.').pop();
  switch (ext) {
    default:
      console.log(`Unknown file type ${ext}`);
  }
}
