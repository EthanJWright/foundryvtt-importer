export interface FoundryCreateFolderParams {
  name: string;
  type: string;
  parent: string;
  sorting: string;
}

export interface FoundryCreateJournalParams {
  name: string;
  content: string;
  collectionName?: string;
  folder?: string;
  sort?: number;
}

export interface FoundryApi {
  foundryFolder: {
    create: (params: FoundryCreateFolderParams) => Promise<StoredDocument<Folder>>;
  };
  foundryJournalEntry: {
    create: (params: FoundryCreateJournalParams) => Promise<StoredDocument<JournalEntry>>;
  };
}
