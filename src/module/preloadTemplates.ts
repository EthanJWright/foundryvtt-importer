export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "modules/foundryvtt-importer/templates"
    'modules/foundryvtt-importer/templates/importForm.html',
  ];

  return loadTemplates(templatePaths);
}
