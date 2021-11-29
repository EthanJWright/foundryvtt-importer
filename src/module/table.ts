import {
  BasicTable,
  FoundryTable,
  isFoundryTable,
  parseBasicJSON,
  parseFoundryJSON,
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

async function txtRoute(fullFileName: string, stringData: string) {
  console.log(`Data: ${stringData}`);
  const rawLines = stringData.split(/\r?\n/);
  console.log(`raw lines: ${rawLines}`);
  const lines = rawLines.filter((line) => {
    return line !== '';
  });
  console.log(`lines: ${lines}`);
  const parsed = parseFromTxt({ title: fullFileName, entries: lines });
  await RollTable.create(parsed);
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
    default:
      console.log(`Unknown file type ${ext}`);
  }
}
