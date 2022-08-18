import { UserData } from '../importForm';
import { isRedditCollection, isRedditTable, parseRedditCollection, parseWeightedTable } from './reddit';
import {
  BasicTable,
  FoundryTable,
  isCSVTable,
  isFoundryTable,
  isJSONTable,
  parseBasicJSON,
  parseFoundryJSON,
  parseFromCSV,
  parseFromTxt,
  parseMultiLineWeighted,
  TableData,
} from './parse';
import { breakLines } from './lineManipulators';
async function createTableFromJSON(tableJSON: FoundryTable | BasicTable) {
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

export type TableParser = (table: string) => FoundryTable;

function tryParseTables(parsers: TableParser[], inputTable: string): FoundryTable {
  for (const parser of parsers) {
    try {
      const table = parser(inputTable);
      if (table) {
        return table;
      }
    } catch (e) {
      // trying other parsers
    }
  }
  throw new Error(`Unable to parse table`);
}

export function txtToFoundry(stringData: string) {
  return tryParseTables([parseFromTxt, parseWeightedTable, parseMultiLineWeighted], stringData);
}

async function txtRoute(stringData: string) {
  console.log(`Data: ${stringData}`);
  await RollTable.create(txtToFoundry(stringData));
}

async function csvRoute(fullFileName: string, data: string) {
  console.log(`CSV Data: ${data}`);
  const lines = breakLines(data);
  const parse = parseFromCSV({ name: fullFileName, entries: lines });
  await RollTable.create(parse);
}

async function handleRedditCollection(input: string) {
  const parsed = parseRedditCollection(input);
  const folder = await Folder.create({ name: parsed.name, type: 'RollTable', sorting: 'm' });
  const promises = parsed.collection.map(async (table, index) => {
    return RollTable.create({ ...table, folder: folder?.data?._id, sort: index });
  });
  await Promise.all(promises);
}

async function redditTableRoute(input: string) {
  if (isRedditCollection(input)) {
    return handleRedditCollection(input);
  } else {
    const parsed = parseWeightedTable(input);
    await RollTable.create(parsed);
  }
}

export async function processTableJSON({ jsonfile, clipboardInput }: UserData) {
  if (clipboardInput) {
    try {
      if (isJSONTable(clipboardInput)) {
        await jsonRoute(clipboardInput);
      } else if (isCSVTable(clipboardInput)) {
        await csvRoute('CSV Imported Table', clipboardInput);
      } else if (isRedditCollection(clipboardInput)) {
        await redditTableRoute(clipboardInput);
      } else if (isRedditTable(clipboardInput)) {
        await redditTableRoute(clipboardInput);
      } else {
        await txtRoute(clipboardInput);
      }
    } catch (e) {
      console.log(`Error while processing table: ${e} | attempting base text route parsing.`);
      await txtRoute(clipboardInput);
    }
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
      txtRoute(`${jsonfile}\n${data}`);
      break;
    case 'csv':
      csvRoute(jsonfile, data);
      break;
    default:
      console.log(`Unknown file type ${ext}`);
  }
}
