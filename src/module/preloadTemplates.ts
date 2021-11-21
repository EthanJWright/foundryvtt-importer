export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "modules/foundryvtt-json-journal/templates"
  ];

  return loadTemplates(templatePaths);
}
