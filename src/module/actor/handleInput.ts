import { textToActor } from './parsers';
import { actorToFifth } from './convert';
import { UserData } from '../importForm';
import { FifthItem } from './templates/fifthedition';
import { itemToFifth, spellToFifth } from '../item/convert';

async function txtRoute(stringData: string) {
  const actor = textToActor(stringData);
  const { items } = actor;
  console.log(`Prepared Actor: ${JSON.stringify(actor, null, 2)}`);
  const preparedItems = await Promise.all(
    items.map((item) => {
      return itemToFifth(item);
    }),
  );

  if (actor?.spells) {
    const addedSpells: Array<FifthItem | undefined> = await Promise.all(
      actor?.spells?.map((spell) => {
        return spellToFifth(spell);
      }),
    );

    const reducedSpells = addedSpells.reduce((acc: FifthItem[], cur: FifthItem | undefined) => {
      if (cur) {
        console.log(`Spell: ${JSON.stringify(cur, null, 2)}`);
        acc.push(cur);
      }
      return acc;
    }, []);

    preparedItems.push(...reducedSpells);
  }

  const convertedActor = actorToFifth(actor);
  const foundryActor = await Actor.create({
    name: actor.name,
    type: 'npc',
    data: convertedActor,
  });

  await Promise.all(
    preparedItems.map(async (item: FifthItem) => {
      return await Item.create(
        {
          ...item,
        },
        {
          parent: foundryActor,
        },
      );
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
