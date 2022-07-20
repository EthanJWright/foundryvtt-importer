import CONSTANTS from './constants';
import { Handler } from './importForm';
import { ImportGenericForm } from './importGenericForm';

export class importItemForm extends ImportGenericForm {
  constructor({ handler, tab }: { handler: Handler; tab: string }) {
    super({ handler, tab });
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      jQuery: false,
      width: 400,
      top: window.innerHeight - window.innerHeight + 20,
      left: window.innerWidth - 710,
      template: `modules/${CONSTANTS.module.name}/templates/importItemForm.hbs`,
    });
  }
}
