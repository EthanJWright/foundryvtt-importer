import CONSTANTS from './constants';

export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "modules/foundryvtt-importer/templates"
    `modules/${CONSTANTS.module.name}/templates/importTableForm.hbs`,
    `modules/${CONSTANTS.module.name}/templates/importActorForm.hbs`,
    `modules/${CONSTANTS.module.name}/templates/importItemForm.hbs`,
    `modules/${CONSTANTS.module.name}/templates/importJournalForm.hbs`,
  ];

  return loadTemplates(templatePaths);
}
