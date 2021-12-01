import CONSTANTS from './constants';

export interface ClientSettingsReader {
  get<T>(scope: string, key: string): T;
}

export class Config {
  folderDepth = 3;
  journalImporter = false;

  static keys = {
    folderDepth: 'folderDepth',
    journalImporter: 'journalImporter',
  };

  public load(s: ClientSettingsReader): Config {
    this.folderDepth = this.getSetting(s, Config.keys.folderDepth);
    this.journalImporter = this.getSetting(s, Config.keys.journalImporter);

    return this;
  }

  /**
   * Helper method to quickly construct Settings from game.settings
   */
  static _load(): Config {
    return new Config().load((game as any).settings);
  }

  private getSetting<T>(settings: ClientSettingsReader, key: string) {
    return settings.get<T>(CONSTANTS.module.name, key);
  }
}

export function registerSettings(): void {
  if (game === {}) return;
  else {
    (game as Game)?.settings?.register(CONSTANTS.module.name, 'folderDepth', {
      name: 'Folder Depth',
      hint: 'Folders will only be created up to this depth',
      scope: 'world',
      config: true,
      type: Number,
      default: CONST.FOLDER_MAX_DEPTH,
    });
    (game as Game)?.settings?.register(CONSTANTS.module.name, 'journalImporter', {
      name: 'Journal Importer',
      hint: 'Display the journal importer button. This imports JSON files and so it is less user friendly. (requires reload)',
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    });
  }
}
