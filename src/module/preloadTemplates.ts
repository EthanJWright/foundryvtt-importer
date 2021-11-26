export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "modules/foundryvtt-json-journal/templates"
    'modules/foundryvtt-json-journal/templates/importForm.html',
  ];

  return loadTemplates(templatePaths);
}
