import { FoundryApi } from '.';
import { TextBlock } from '../parsers';

export interface JournalOptions {
  folder?: string;
}

export async function buildTextBlock(input: TextBlock, api: FoundryApi, opts: JournalOptions): Promise<void> {
  console.log(`Creating: ${JSON.stringify(input, null, 2)}`);
  await api.foundryJournalEntry.create({
    name: input?.name ?? 'Unknown Name',
    content: input.content,
    folder: opts?.folder,
  });
}
