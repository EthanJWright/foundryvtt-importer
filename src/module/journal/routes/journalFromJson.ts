import { UserData } from '../../importForm';
import { buildTextBlock } from '../builder/textBlock';
import { getRootName, journalFromJson, JournalNode, parseTextBlock } from '../parsers';
import { parseMultipleTextBlocks } from '../parsers/multipleTextBlocks';

async function multipleRoute(input: string): Promise<void> {
  const folder = await Folder.create({
    name: 'Parsed Journal Entries',
    type: 'JournalEntry',
    sorting: 'm',
  });
  const blocks = parseMultipleTextBlocks(input);
  await Promise.all(
    blocks.entries.map(async (block) => {
      return await buildTextBlock(
        block,
        {
          foundryFolder: Folder,
          foundryJournalEntry: JournalEntry,
        },
        { folder: folder?.data?._id },
      );
    }),
  );
}

export async function processInputJSON({ jsonfile, clipboardInput, buildMultiple }: UserData) {
  if (clipboardInput) {
    if (buildMultiple) {
      return await multipleRoute(clipboardInput);
    }
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
