interface HTMLImportData {
  jsonfile: string;
}

export type Handler = (jsonfile: string) => Promise<void>;
export class importJSONForm extends FormApplication {
  _handler: Handler;
  constructor(handler: Handler) {
    super({});
    this._handler = handler;
  }

  get handler(): Handler {
    return this._handler;
  }

  set handler(handler) {
    this._handler = handler;
  }

  async _updateObject(event: Event, formData?: object): Promise<unknown> {
    if (!formData || formData === {}) return;
    const data = formData as HTMLImportData;
    this.handler(data.jsonfile);
    return;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      jQuery: false,
      width: 400,
      top: window.innerHeight - window.innerHeight + 20,
      left: window.innerWidth - 710,
      template: 'modules/foundryvtt-json-journal/templates/importForm.html',
    });
  }
}
