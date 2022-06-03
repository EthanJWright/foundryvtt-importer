import { cleanName } from '../../formatters';
import { Config } from '../../settings';

export interface Note {
  value: string;
  tag: string;
}

export interface JournalNode {
  value: string;
  tag: string;
  notes: Array<Note>;
  children: Array<JournalNode>;
  sortValue?: number;
}

export function getRootName(jsonfile: string) {
  // get file name from full path
  const fileName = jsonfile.split('/').pop() || jsonfile;
  // remove extension
  const name = fileName.split('.').shift() || fileName;
  // convert _ to space
  const rootName = name.replace(/_/g, ' ');
  // Capitalize first letter
  return rootName.charAt(0).toUpperCase() + rootName.slice(1);
}

export const formatList = (note: string) => {
  let prepend = '';
  if (note.includes('1. ') && note.includes('2. ')) {
    const splitNote = note.split(/[0-9]+\./);
    if (note[0] !== '1') {
      prepend = splitNote[0];
      splitNote.shift();
    }
    let asList = splitNote.map((listItem: string) => {
      return `<li>${listItem.replace('\n', '').trim()}</li>`;
    });
    asList = asList.filter((item) => item !== '<li></li>');
    return `${prepend}<ol>${asList.join('')}</ol>`;
  }
  return `${note}`;
};

export function normalizeHeaders(note: Note) {
  if (note.tag.includes('h')) {
    if (Number(note.tag.replace('h', '')) > 10) {
      note.tag = 'p';
    }
  }
  const tag = note.tag.includes('h') ? 'h2' : note.tag;
  return `<${tag}>${note.value}</${tag}>`;
}

const noteMaps = (note: string) => {
  return formatList(note);
};

export const mergeParagraphs = (noteList: Note[], current: Note): Note[] => {
  if (current.tag !== 'p') {
    noteList.push(current);
    return noteList;
  }
  if (noteList.length === 0) {
    noteList.push(current);
    return noteList;
  }

  if (noteList[noteList.length - 1].tag === 'p') {
    noteList[noteList.length - 1].value += `\n${current.value}`;
  } else {
    noteList.push(current);
  }
  return noteList;
};

const collission_tracker: Record<string, number> = {};
interface CreateFolderParams {
  node: JournalNode;
  rootFolder: StoredDocument<Folder>;
  currentFolder?: StoredDocument<Folder>;
  currentDepth: number;
  settings: Config;
}

interface FoundryCreateFolderParams {
  name: string;
  type: string;
  parent: string;
  sorting: string;
}

interface FoundryCreateJournalParams {
  name: string;
  content: string;
  collectionName: string;
  folder?: string;
  sort: number;
}

interface FoundryApi {
  createFolder?: (params: FoundryCreateFolderParams) => Promise<StoredDocument<Folder>>;
  createJournalEntry?: (params: FoundryCreateJournalParams) => Promise<StoredDocument<JournalEntry>>;
}

async function createFoldersRecursive(
  { node, rootFolder, currentFolder, currentDepth = 1, settings }: CreateFolderParams,
  { createFolder = Folder.create, createJournalEntry = JournalEntry.create }: FoundryApi,
) {
  let folder: StoredDocument<Folder> = currentFolder ?? rootFolder;
  // if node.value in collission_tracker, then we have a collision
  collission_tracker[node.value] = collission_tracker[node.value] ?? 0;
  collission_tracker[node.value]++;
  const name = `${node.value}`;

  if (node.children.length > 0 && currentDepth < settings.folderDepth) {
    const current_id = currentFolder?.data?._id ?? rootFolder.data._id;
    folder =
      (await createFolder({
        name: cleanName(name),
        type: 'JournalEntry',
        parent: current_id,
        sorting: 'm',
      })) ?? rootFolder;
    currentDepth++;
  }
  const notes = node.notes.reverse();
  const reduced = notes.reduce(mergeParagraphs, []);
  const values = reduced.map(normalizeHeaders);
  const finalNotes = values.map(noteMaps).reverse();
  let htmlNote = finalNotes.reduce((note: string, htmlNote: string) => {
    return `${htmlNote}${note}`;
  }, ``);
  htmlNote = `<div>${htmlNote}</div>`;
  await createJournalEntry({
    name: `${cleanName(name)}`,
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
      await createFoldersRecursive({ node: child, rootFolder, currentFolder: folder, currentDepth, settings }, {});
    }
  }
}

export async function journalFromJson(name: string, data: JournalNode[]) {
  const folder = await Folder.create({
    name: cleanName(name),
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
      await createFoldersRecursive({ node: section, rootFolder: folder, currentDepth: 1, settings }, {});
    });
    console.log(`Finished generating ${name} Journals...`);
  }
}
