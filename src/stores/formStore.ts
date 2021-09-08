import { action, makeObservable } from "mobx";

import * as api from "src/api";
import { FormEditorValues } from "src/types/FormEditorValues";
import { GetFormsConfig } from "src/types/GetFormsConfig";

export class FormStore {
  constructor() {
    makeObservable(this, {
      fetchForm: action.bound,
      fetchForms: action.bound,
      saveForm: action.bound,
      deleteForm: action.bound,
    });
  }

  async fetchForm(id: string) {
    const form = await api.getForm(id);
    return form;
  }

  async fetchForms(config: GetFormsConfig) {
    const forms = await api.getForms(config);
    return forms;
  }

  async saveForm(id: string, form: FormEditorValues) {
    await api.saveForm(id, form);
  }

  async deleteForm(id: string) {
    await api.deleteForm(id);
  }
}

const formStore = new FormStore();

export default formStore;
