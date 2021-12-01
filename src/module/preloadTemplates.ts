export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "modules/foundryvtt-importer/templates"
    'modules/foundryvtt-importer/templates/importForm.hbs',
    'modules/foundryvtt-importer/templates/importTableForm.hbs',
  ];

  return loadTemplates(templatePaths);
}
