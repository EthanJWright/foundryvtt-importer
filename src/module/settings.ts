import CONSTANTS from './constants';

export interface ClientSettingsReader {
  get<T>(scope: string, key: string): T;
}

export class Config {
  folderDepth = 3;

  static keys = {
    folderDepth: 'folderDepth',
  };

  public load(s: ClientSettingsReader): Config {
    this.folderDepth = this.getSetting(s, Config.keys.folderDepth);

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
  }
}
