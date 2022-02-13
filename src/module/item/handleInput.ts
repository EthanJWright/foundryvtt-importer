import { UserData } from '../importForm';
import { processItem } from './process';

async function handleInput(input: string) {
  const parsedItem = processItem(input);
  await Item.create({ ...parsedItem });
}

export async function processItemInput({ jsonfile, clipboardInput }: UserData) {
  if (clipboardInput) {
    console.log(`Cliboard input: ${clipboardInput}`);
    handleInput(clipboardInput);
  }
}
