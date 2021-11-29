import { Config } from './settings';

interface Note {
  value: string;
  tag: string;
}

interface JournalNode {
  value: string;
  tag: string;
  notes: Array<Note>;
  children: Array<JournalNode>;
  sortValue?: number;
}

function getRootName(fullFileName: string) {
  // get file name from full path
  const fileName = fullFileName.split('/').pop() || fullFileName;
  // remove extension
  const name = fileName.split('.').shift() || fileName;
  // convert _ to space
  const rootName = name.replace(/_/g, ' ');
  // Capitalize first letter
  return rootName.charAt(0).toUpperCase() + rootName.slice(1);
}

const collission_tracker: Record<string, number> = {};
async function createFoldersRecursive(
  node: JournalNode,
  rootFolder: StoredDocument<Folder>,
  currentFolder: StoredDocument<Folder> | undefined,
  currentDepth = 1,
  settings: Config,
) {
  let folder: StoredDocument<Folder> = currentFolder ?? rootFolder;
  // if node.value in collission_tracker, then we have a collision
  collission_tracker[node.value] = collission_tracker[node.value] ?? 0;
  collission_tracker[node.value]++;
  let name = `${node.value}`;
  // convert %20 to space
  name = name.replace(/%20/g, ' ');

  if (node.children.length > 0 && currentDepth < settings.folderDepth) {
    const current_id = currentFolder?.data?._id ?? rootFolder.data._id;
    folder =
      (await Folder.create({
        name: name,
        type: 'JournalEntry',
        parent: current_id,
        sorting: 'm',
      })) ?? rootFolder;
    currentDepth++;
  }
  const notes = node.notes.reverse();
  const values = notes.map((note: Note) => {
    const tag = note.tag.includes('h') ? 'h2' : note.tag;
    return `<${tag}>${note.value}</${tag}>`;
  });
  let htmlNote = values.reduce((note: string, htmlNote: string) => {
    return `${htmlNote}${note}`;
  }, ``);
  htmlNote = `<div>${htmlNote}</div>`;
  await JournalEntry.create({
    name: `${name}`,
    content: htmlNote,
    collectionName: node.value,
    folder: folder?.data?._id,
    sort: node.sortValue ?? 0,
  });

  function getSortValue(title: string) {
    // if first two characters are a number, extract the number
    const firstTwo = title.substring(0, 2);
    if (firstTwo.match(/^\d+$/)) {
      return parseInt(firstTwo, 10);
    }
    // if the first character is a number, extract the number
    const first = title.substring(0, 1);
    if (first.match(/^\d+$/)) {
      return parseInt(first, 10);
    }
    // otherwise, return the ascii value of the first characters
    return first.charCodeAt(0);
  }

  if (node.children) {
    const children = node.children.map((child) => {
      return { ...child, sortValue: getSortValue(child.value) };
    });
    for (const child of children) {
      await createFoldersRecursive(child, rootFolder, folder, currentDepth, settings);
    }
  }
}

async function journalFromJson(name: string, data: JournalNode[]) {
  const folder = await Folder.create({
    name: name,
    type: 'JournalEntry',
    sorting: 'm',
  });
  if (!folder) {
    console.log(`Error creating folder ${name}`);
    return;
  } else {
    const settings = Config._load();
    console.log(`Building journals with a depth of ${settings.folderDepth}`);
    data.forEach(async (section: JournalNode) => {
      await createFoldersRecursive(section, folder, undefined, 1, settings);
    });
    console.log(`Finished generating ${name} Journals...`);
  }
}

export async function processInputJSON(fullFileName: string) {
  const response = await fetch(fullFileName);
  if (!response.ok) {
    console.log(`Error reading ${fullFileName}`);
    return;
  }
  const data = await response.text();
  const json = JSON.parse(data) as JournalNode[];
  const name = getRootName(fullFileName);
  journalFromJson(name, json);
}
