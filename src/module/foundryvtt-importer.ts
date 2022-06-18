import { Config, registerSettings } from './settings';
import { preloadTemplates } from './preloadTemplates';
import { processTableJSON } from './table/process';
import { renderSidebarButtons } from './renderSidebarButtons';
import CONSTANTS from './constants';
import { processItemInput } from './item/handleInput';
import { processActorInput } from './actor/handleInput';
import { processInputJSON } from './journal/routes';

Hooks.on('renderSidebarTab', (settings: Settings) => {
  if (!(game as Game)?.user?.isGM) return;
  const config = Config._load();
  if (config.journalImporter) {
    renderSidebarButtons(settings, 'journal', processInputJSON);
  }
  if (config.tableImporter) {
    renderSidebarButtons(settings, 'tables', processTableJSON);
  }
  if (config.actorImporter) {
    renderSidebarButtons(settings, 'actors', processActorInput);
  }

  if (config.itemImporter) {
    renderSidebarButtons(settings, 'items', processItemInput);
  }
});

// Initialize module
Hooks.once('init', async () => {
  console.log(`${CONSTANTS.module.name} | Initializing ${CONSTANTS.module.title}`);
  // Assign custom classes and constants here

  // Register custom module settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();

  // Register custom sheets (if any)
});

// When ready
Hooks.once('ready', async () => {
  // Do anything once the module is ready
});
