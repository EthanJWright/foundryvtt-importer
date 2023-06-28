import { supportsJournalPages } from '../../game';
import { UserData } from '../../importForm';
import { buildTextBlock } from '../builder/textBlock';
import { getRootName, journalFromJson, JournalNode, parseTextBlock } from '../parsers';
import {
  parseMultipleTextBlocks,
  parseMultipleTextPages,
  parseHTMLIntoMultiplePages,
} from '../parsers/multipleTextBlocks';

function isHTML(str: string) {
  const a = document.createElement('div');
  a.innerHTML = str;

  for (let c = a.childNodes, i = c.length; i--; ) {
    if (c[i].nodeType == 1) return true;
  }

  return false;
}

async function multipleRoutePages(input: string): Promise<void> {
  const data = isHTML(input) ? parseHTMLIntoMultiplePages(input) : parseMultipleTextPages(input);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (JournalEntry as unknown as any).implementation.create({
    pages: data.pages,
    name: 'Parsed Journal Entries',
  });
}

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
      if (supportsJournalPages()) {
        return await multipleRoutePages(clipboardInput);
      } else {
        // TODO: remove this once we have deprecated v9 support
        return await multipleRoute(clipboardInput);
      }
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
