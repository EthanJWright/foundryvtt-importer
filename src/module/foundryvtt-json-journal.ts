import { registerSettings } from './settings';
import { preloadTemplates } from './preloadTemplates';

const MAX_DEPTH = 3;

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

async function processTableJSON(fullFileName: string) {
  const response = await fetch(fullFileName);
  if (!response.ok) {
    console.log(`Error reading ${fullFileName}`);
    return;
  }
  const data = await response.text();
  const json = JSON.parse(data) as TableJSON;
  createTableFromJSON(json);
}

async function processInputJSON(fullFileName: string) {
  const response = await fetch(fullFileName);
  if (!response.ok) {
    console.log(`Error reading ${fullFileName}`);
    return;
  }
  const data = await response.text();
  const json = JSON.parse(data) as JournalNode[];
  const name = getRootName(fullFileName);
  buildFromJson(name, json);
}

interface HTMLImportData {
  jsonfile: string;
}

type Handler = (jsonfile: string) => Promise<void>;

class importJSONForm extends FormApplication {
  _handler: Handler;
  constructor(handler: Handler) {
    super({});
    this._handler = handler;
  }

  get handler(): Handler {
    return this._handler;
  }

  set handler(handler) {
    this._handler = handler;
  }

  async _updateObject(event: Event, formData?: object): Promise<unknown> {
    if (!formData || formData === {}) return;
    const data = formData as HTMLImportData;
    this.handler(data.jsonfile);
    return;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      jQuery: false,
      width: 400,
      top: window.innerHeight - window.innerHeight + 20,
      left: window.innerWidth - 710,
      template: 'modules/foundryvtt-json-journal/templates/importForm.html',
    });
  }
}

function renderSidebarButtons(settings: Settings, tab: string, handler: Handler) {
  if (settings.id != tab) return;
  const html = settings.element;
  if (html.find('#pdfButton').length !== 0) return;
  const button = `<button id="pdfButton" style="flex-basis: auto;">
  <i class="fas fa-atlas"></i> Import JSON ${tab}
</button>`;
  html.find(`.header-actions`).first().append(button);
  html.find('#pdfButton').on('click', async (e) => {
    e.preventDefault();
    const form = new importJSONForm(handler);
    form.render(true);
  });
}

interface TableEntry {
  range: [number, number];
  text: string;
}

interface TableJSON {
  title: string;
  formula: string;
  entries: TableEntry[];
}

async function createTableFromJSON({ title, formula, entries }: TableJSON) {
  console.log(`creating a table...`);
  await RollTable.create({
    name: title,
    formula,
    results: [...entries],
  });
}

Hooks.on('renderSidebarTab', (settings: Settings) => {
  renderSidebarButtons(settings, 'journal', processInputJSON);
  renderSidebarButtons(settings, 'tables', processTableJSON);
});

// Initialize module
Hooks.once('init', async () => {
  console.log('foundryvtt-json-journal | Initializing foundryvtt-json-journal');
  // Assign custom classes and constants here

  // Register custom module settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();

  // Register custom sheets (if any)
});

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

const collission_tracker: Record<string, number> = {};
async function createFoldersRecursive(
  node: JournalNode,
  rootFolder: StoredDocument<Folder>,
  currentFolder: StoredDocument<Folder> | undefined,
  currentDepth = 1,
) {
  let folder: StoredDocument<Folder> = currentFolder ?? rootFolder;
  // if node.value in collission_tracker, then we have a collision
  collission_tracker[node.value] = collission_tracker[node.value] ?? 0;
  collission_tracker[node.value]++;
  let name = `${node.value}`;
  // convert %20 to space
  name = name.replace(/%20/g, ' ');

  if (node.children.length > 0 && currentDepth <= MAX_DEPTH) {
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
      await createFoldersRecursive(child, rootFolder, folder, currentDepth);
    }
  }
}

async function buildFromJson(name: string, data: JournalNode[]) {
  const folder = await Folder.create({
    name: name,
    type: 'JournalEntry',
    sorting: 'm',
  });
  if (!folder) {
    console.log(`Error creating folder ${name}`);
    return;
  } else {
    data.forEach(async (section: JournalNode) => {
      await createFoldersRecursive(section, folder, undefined, 1);
    });
    console.log(`Finished generating ${name} Journals...`);
  }
}

// When ready
Hooks.once('ready', async () => {
  // Do anything once the module is ready
});
