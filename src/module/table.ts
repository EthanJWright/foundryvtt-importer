import { FoundryTableJSON, parseFoundryJSON, TableData } from './table.process';

async function createTableFromJSON(tableJSON: FoundryTableJSON) {
  console.log(`creating a table...`);
  const strategy = tableJSON.strategy || 'foundry';
  let parsed: TableData | undefined;
  switch (strategy) {
    case 'foundry':
      parsed = parseFoundryJSON(tableJSON);
      break;
    default:
      throw new Error(`unknown strategy: ${strategy}`);
  }
  await RollTable.create(parsed);
}

async function jsonRoute(stringData: string) {
  const json = JSON.parse(stringData) as FoundryTableJSON;
  createTableFromJSON(json);
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
    default:
      console.log(`Unknown file type ${ext}`);
  }
}
