interface HTMLImportData {
  jsonfile: string;
}

export interface UserData {
  jsonfile: string;
  clipboardInput: string;
}

export type Handler = (data: UserData) => Promise<void>;
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
      template: 'modules/foundryvtt-json-journal/templates/importForm.html',
    });
  }
}
