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

export async function processTableJSON(fullFileName: string) {
  const response = await fetch(fullFileName);
  if (!response.ok) {
    console.log(`Error reading ${fullFileName}`);
    return;
  }
  const data = await response.text();
  const ext = fullFileName.split('.').pop();
  switch (ext) {
    case 'json':
      jsonRoute(data);
      break;
    case 'txt':
      txtRoute(fullFileName, data);
      break;
    case 'csv':
      csvRoute(fullFileName, data);
      break;
    default:
      console.log(`Unknown file type ${ext}`);
  }
}
