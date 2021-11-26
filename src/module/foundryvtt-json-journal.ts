import { registerSettings } from './settings';
import { preloadTemplates } from './preloadTemplates';

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

async function processInputJSON(fullFileName: string) {
  const response = await fetch(fullFileName);
  if (!response.ok) {
    console.log(`Error reading ${fullFileName}`);
    return;
  }
  const data = await response.text();
  const json = JSON.parse(data) as JsonData[];
  const name = getRootName(fullFileName);
  buildFromJson(name, json);
}

interface HTMLImportData {
  jsonfile: string;
}

class importJSONForm extends FormApplication {
  async _updateObject(event: Event, formData?: object): Promise<unknown> {
    if (!formData || formData === {}) return;
    const data = formData as HTMLImportData;
    processInputJSON(data.jsonfile);
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

Hooks.on('renderSidebarTab', (settings: Settings) => {
  if (settings.id != 'journal') return;
  const html = settings.element;
  if (html.find('#pdfButton').length !== 0) return;
  const button = `<button id="pdfButton" style="flex-basis: auto;">
  <i class="fas fa-atlas"></i> Import JSON Journal
</button>`;
  html.find(`.header-actions`).first().append(button);
  html.find('#pdfButton').on('click', async (e) => {
    e.preventDefault();
    // const template = 'modules/foundryvtt-json-journal/templates/importForm.html';
    const form = new importJSONForm({});
    form.render(true);
  });
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

// Setup module
Hooks.once('setup', async () => {
  // Set things up
});

interface JsonData {
  value: string;
  tag: string;
  notes: Array<string>;
  children: Array<JsonData>;
  sortValue?: number;
}

async function createFoldersRecursive(node: JsonData, parentFolder: StoredDocument<Folder> | undefined) {
  let folder = parentFolder;
  if (node.children.length > 0) {
    folder = await Folder.create({
      name: node.value,
      type: 'JournalEntry',
      parent: parentFolder?.data?._id ?? null,
      sorting: 'm',
    });
  }
  const notes = node.notes.reverse();
  let htmlNote = notes.reduce((note: string, htmlNote: string) => {
    return `${htmlNote}<p>${note}</p>`;
  }, ``);
  htmlNote = `<div>${htmlNote}</div>`;
  await JournalEntry.create({
    name: `${node.value}`,
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
    console.log(`Sorting journal children...`);
    const children = node.children.map((child) => {
      return { ...child, sortValue: getSortValue(child.value) };
    });
    for (const child of children) {
      await createFoldersRecursive(child, folder);
    }
  }
}

async function buildFromJson(name: string, data: JsonData[]) {
  console.log(`${data[0]['value']}`);
  const folder = await Folder.create({
    name: name,
    type: 'JournalEntry',
  });
  data.forEach(async (section: JsonData) => {
    await createFoldersRecursive(section, folder);
  });
  console.log(`Finished generating ${name} Journals...`);
}

// When ready
Hooks.once('ready', async () => {
  // Do anything once the module is ready
});
