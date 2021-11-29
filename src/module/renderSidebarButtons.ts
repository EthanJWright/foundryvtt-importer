import { Handler, importJSONForm } from './importForm';

export function renderSidebarButtons(settings: Settings, tab: string, handler: Handler) {
  if (settings.id != tab) return;
  const html = settings.element;
  if (html.find('#pdfButton').length !== 0) return;
  const button = `<button id="pdfButton" style="flex-basis: auto;">
  <i class="fas fa-atlas"></i> Import JSON ${tab}
</button>`;
  html.find(`.header-actions`).first().append(button);
  html.find('#pdfButton').on('click', async (e) => {
    e.preventDefault();
    const form = new importJSONForm(handler);
    form.render(true);
  });
}
