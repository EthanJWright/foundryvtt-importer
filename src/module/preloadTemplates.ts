export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "modules/foundryvtt-importer/templates"
    'modules/foundryvtt-importer/templates/importForm.html',
    'modules/foundryvtt-importer/templates/importTableForm.html',
  ];

  return loadTemplates(templatePaths);
}
