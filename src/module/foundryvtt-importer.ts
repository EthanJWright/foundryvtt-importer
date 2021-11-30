import { registerSettings } from './settings';
import { preloadTemplates } from './preloadTemplates';
import { processInputJSON } from './journal';
import { processTableJSON } from './table';
import { renderSidebarButtons } from './renderSidebarButtons';
import CONSTANTS from './constants';

Hooks.on('renderSidebarTab', (settings: Settings) => {
  renderSidebarButtons(settings, 'journal', processInputJSON);
  renderSidebarButtons(settings, 'tables', processTableJSON);
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
