export interface HTMLImportData {
  jsonfile: string;
}

export interface UserData {
  jsonfile: string;
  clipboardInput?: string;
  buildMultiple?: boolean;
}

export type Handler = (data: UserData) => Promise<void>;
