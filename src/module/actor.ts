import { actorToFifth } from './actors.convert';
import { textToActor } from './actors.process';
import { UserData } from './importForm';

async function txtRoute(stringData: string) {
  const actor = textToActor(stringData);
  await Actor.create({
    name: actor.name,
    type: 'npc',
    data: actorToFifth(actor),
  });
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
