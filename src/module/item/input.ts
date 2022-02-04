import { UserData } from '../importForm';

export function processItemInput({ jsonfile, clipboardInput }: UserData) {
  if (clipboardInput) {
    console.log(`Cliboard input: ${clipboardInput}`);
  }
}
