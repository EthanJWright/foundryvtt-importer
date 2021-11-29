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

export async function processTableJSON(fullFileName: string) {
  const response = await fetch(fullFileName);
  if (!response.ok) {
    console.log(`Error reading ${fullFileName}`);
    return;
  }
  const data = await response.text();
  const json = JSON.parse(data) as TableJSON;
  createTableFromJSON(json);
}
