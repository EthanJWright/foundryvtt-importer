import { UserData } from '../importForm';
import { getRootName, journalFromJson, JournalNode } from './parsers';

export async function processInputJSON({ jsonfile }: UserData) {
  const response = await fetch(jsonfile);
  if (!response.ok) {
    console.log(`Error reading ${jsonfile}`);
    return;
  }
  const data = await response.text();
  const json = JSON.parse(data) as JournalNode[];
  const name = getRootName(jsonfile);
  journalFromJson(name, json);
}
