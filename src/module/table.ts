import { UserData } from './importForm';
import { parseRedditTable } from './table.clipboard';
import {
  BasicTable,
  FoundryTable,
  isFoundryTable,
  parseBasicJSON,
  parseFoundryJSON,
  parseFromCSV,
  parseFromTxt,
  TableData,
} from './table.process';
async function createTableFromJSON(tableJSON: FoundryTable | BasicTable) {
  console.log(`creating a table...`);
  let parsed: TableData | undefined;
  if (isFoundryTable(tableJSON)) {
    parsed = parseFoundryJSON(tableJSON as FoundryTable);
  } else {
    parsed = parseBasicJSON(tableJSON as BasicTable);
  }
  await RollTable.create(parsed);
}

async function jsonRoute(stringData: string) {
  const json = JSON.parse(stringData) as FoundryTable;
  createTableFromJSON(json);
}

const breakLines = (data: string) => {
  const rawLines = data.split(/\r?\n/);
  return rawLines.filter((line) => {
    return line !== '';
  });
};

async function txtRoute(fullFileName: string, stringData: string) {
  console.log(`Data: ${stringData}`);
  const lines = breakLines(stringData);
  const parsed = parseFromTxt({ name: fullFileName, entries: lines });
  await RollTable.create(parsed);
}

async function csvRoute(fullFileName: string, data: string) {
  console.log(`CSV Data: ${data}`);
  const lines = breakLines(data);
  const parse = parseFromCSV({ name: fullFileName, entries: lines });
  await RollTable.create(parse);
}

async function redditTableRoute(input: string) {
  const parsed = parseRedditTable(input);
  await RollTable.create(parsed);
}

export async function processTableJSON({ jsonfile, clipboardInput }: UserData) {
  if (clipboardInput) {
    redditTableRoute(clipboardInput);
    return;
  }
  const response = await fetch(jsonfile);
  if (!response.ok) {
    console.log(`Error reading ${jsonfile}`);
    return;
  }
  const data = await response.text();

  const ext = jsonfile.split('.').pop();
  switch (ext) {
    case 'json':
      jsonRoute(data);
      break;
    case 'txt':
      txtRoute(jsonfile, data);
      break;
    case 'csv':
      csvRoute(jsonfile, data);
      break;
    default:
      console.log(`Unknown file type ${ext}`);
  }
}
