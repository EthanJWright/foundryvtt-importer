import { textToActor } from './parsers';
import { actorToFifth } from './convert';
import { UserData } from '../importForm';
import { FifthItem } from './templates/fifthedition';
import { itemToFifth } from '../item/convert';

function generateUUID() {
  // Public Domain/MIT
  let d = new Date().getTime(); //Timestamp
  let d2 = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxxxxxx4xxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

async function txtRoute(stringData: string) {
  const actor = textToActor(stringData);
  const { items } = actor;
  console.log(`Prepared Actor: ${JSON.stringify(actor, null, 2)}`);
  const preparedItems = items.map((item) => {
    return itemToFifth(item);
  });
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
