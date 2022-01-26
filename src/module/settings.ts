import CONSTANTS from './constants';

export interface ClientSettingsReader {
  get<T>(scope: string, key: string): T;
}

export class Config {
  folderDepth = 3;
  journalImporter = false;
  tableImporter = true;
  actorImporter = true;
  itemImporter = true;

  static keys = {
    folderDepth: 'folderDepth',
    journalImporter: 'journalImporter',
    tableImporter: 'tableImporter',
    actorImporter: 'actorImporter',
    itemImporter: 'itemImporter',
  };

  public load(s: ClientSettingsReader): Config {
    this.folderDepth = this.getSetting(s, Config.keys.folderDepth);
    this.journalImporter = this.getSetting(s, Config.keys.journalImporter);
    this.tableImporter = this.getSetting(s, Config.keys.tableImporter);
    this.actorImporter = this.getSetting(s, Config.keys.actorImporter);
    this.itemImporter = this.getSetting(s, Config.keys.itemImporter);

    return this;
  }

  /**
   * Helper method to quickly construct Settings from game.settings
   */
  static _load(): Config {
    return new Config().load((game as Game).settings as ClientSettingsReader);
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
      hint: `Folders will only be created up to this depth. If this is set above ${CONST.FOLDER_MAX_DEPTH}, make sure you have a module like MoarFolders to increase the default depth.`,
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
    (game as Game)?.settings?.register(CONSTANTS.module.name, 'tableImporter', {
      name: 'Table Importer',
      hint: 'Display the table importer button. This imports tables pasted from reddit.com/r/BehindTheTables and other formats. (requires reload)',
      scope: 'world',
      config: true,
      type: Boolean,
      default: true,
    });
    (game as Game)?.settings?.register(CONSTANTS.module.name, 'actorImporter', {
      name: 'Actor Importer',
      hint: 'Display the actor importer button. This imports clipboard text formatted like a monster stat block (copied from a PDF) (requires reload)',
      scope: 'world',
      config: true,
      type: Boolean,
      default: true,
    });
    (game as Game)?.settings?.register(CONSTANTS.module.name, 'itemImporter', {
      name: 'Item Importer',
      hint: 'Display the item importer button. This imports clipboard text formatted like an Item or Spell (copied from a PDF) (requires reload)',
      scope: 'world',
      config: true,
      type: Boolean,
      default: true,
    });
  }
}
