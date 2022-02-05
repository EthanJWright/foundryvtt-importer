import CONSTANTS from './constants';

export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "modules/foundryvtt-importer/templates"
    `modules/${CONSTANTS.module.name}/templates/importForm.hbs`,
    `modules/${CONSTANTS.module.name}/templates/importTableForm.hbs`,
  ];

  return loadTemplates(templatePaths);
}
