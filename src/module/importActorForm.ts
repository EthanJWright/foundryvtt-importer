import { Handler, HTMLImportData, UserData } from './importForm';

export class importActorForm extends FormApplication {
  _handler: Handler;
  tab: string;

  constructor(handler: Handler, tab: string) {
    super({});
    this._handler = handler;
    this.tab = tab;
  }

  get handler(): Handler {
    return this._handler;
  }

  set handler(handler) {
    this._handler = handler;
  }

  async _updateObject(_: Event, formData?: object): Promise<unknown> {
    if (!formData || formData === {}) return;
    const data = formData as HTMLImportData;
    console.log(`data: ${JSON.stringify(data, null, 2)}`);
    this.handler(data as UserData);
    return;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      jQuery: false,
      width: 400,
      top: window.innerHeight - window.innerHeight + 20,
      left: window.innerWidth - 710,
      template: `modules/foundryvtt-importer/templates/importActorForm.hbs`,
    });
  }
}
