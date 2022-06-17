import { UserData } from '../../importForm';
import { buildTextBlock } from '../builder/textBlock';
import { getRootName, journalFromJson, JournalNode, parseTextBlock } from '../parsers';

export async function processInputJSON({ jsonfile, clipboardInput }: UserData) {
  if (clipboardInput) {
    const input = parseTextBlock(clipboardInput);
    await buildTextBlock(
      input,
      {
        foundryFolder: Folder,
        foundryJournalEntry: JournalEntry,
      },
      {},
    );
    return;
  }
  const response = await fetch(jsonfile);
  if (!response.ok) {
    console.log(`Error reading ${jsonfile}`);
    return;
  }
  const data = await response.text();
  const json = JSON.parse(data) as JournalNode[];
  const name = getRootName(jsonfile);
  journalFromJson(name, json);
}
