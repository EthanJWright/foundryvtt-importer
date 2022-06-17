import { FoundryApi } from '.';
import { TextBlock } from '../parsers';

export interface JournalOptions {
  folder?: string;
}

export async function buildTextBlock(
  input: TextBlock,
  { foundryJournalEntry }: FoundryApi,
  opts: JournalOptions,
): Promise<void> {
  await foundryJournalEntry.create({
    name: input.name,
    content: input.content,
    folder: opts?.folder,
  });
}
