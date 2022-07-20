import { importActorForm as ImportActorForm } from './importActorForm';
import { importTableForm as ImportTableForm } from './importTableForm';
import { importItemForm as ImportItemForm } from './importItemForm';

import { Handler } from './importForm';
import { importJournalForm as ImportJournalForm } from './importJournalForm';

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
        const form = new ImportJournalForm({ handler, tab });
        form.render(true);
        break;
      }
      case 'tables': {
        const form = new ImportTableForm(handler, tab);
        form.render(true);
        break;
      }
      case 'actors': {
        const form = new ImportActorForm({ handler, tab });
        form.render(true);
        break;
      }
      case 'items': {
        const form = new ImportItemForm({ handler, tab });
        form.render(true);
        break;
      }
      default:
        throw new Error(`Unknown tab: ${tab}`);
    }
  });
}
