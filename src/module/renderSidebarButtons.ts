import { Handler, importJSONForm } from './importForm';
import { importTableForm } from './importTableForm';

export function renderSidebarButtons(settings: Settings, tab: string, handler: Handler) {
  if (settings.id != tab) return;
  const name = tab.charAt(0).toUpperCase() + tab.slice(1);
  const html = settings.element;
  if (html.find('#inputButton').length !== 0) return;
  const button = `<button id="inputButton" style="flex-basis: auto;">
  <i class="fas fa-atlas"></i> Import ${name}
</button>`;
  html.find(`.header-actions`).first().append(button);
  html.find('#inputButton').on('click', async (e) => {
    e.preventDefault();
    switch (tab) {
      case 'journal': {
        const form = new importJSONForm(handler, tab);
        form.render(true);
        break;
      }
      case 'tables': {
        const form = new importTableForm(handler, tab);
        form.render(true);
        break;
      }
      default:
        throw new Error(`Unknown tab: ${tab}`);
    }
  });
}
