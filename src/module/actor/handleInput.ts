import { textToActor } from './parsers';
import { actorToFifth, getMaxAbility } from './convert';
import { UserData } from '../importForm';
import { FifthItem } from './templates/fifthedition';
import { parseItem } from '../item/parsers';
import { itemToFifth } from '../item/convert';

async function txtRoute(stringData: string) {
  const actor = textToActor(stringData);
  const { features } = actor;
  const preparedItems = features.map(({ name, description }) => {
    const item = parseItem(name, description, getMaxAbility(actor.abilities));
    return itemToFifth(item);
  });
  const convertedActor = actorToFifth(actor);
  console.log(`Converted actor: ${JSON.stringify(convertedActor, null, 2)}`);
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
