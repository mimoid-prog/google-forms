import { action, makeObservable, observable } from "mobx";

import * as api from "src/api";
import { Form } from "src/types/Form";
import { FormEditorValues } from "src/types/FormEditorValues";

export class FormStore {
  isInitiallyFetched = false;
  isFetching = true;
  forms: Form[] = [];

  constructor() {
    makeObservable(this, {
      isInitiallyFetched: observable,
      isFetching: observable,
      forms: observable,
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

  async fetchForms() {
    this.isFetching = true;
    const forms = await api.getForms();
    this.forms = forms;
    this.isFetching = false;
    this.isInitiallyFetched = true;
  }

  async saveForm(id: string, form: FormEditorValues) {
    await api.saveForm(id, form);
  }

  async deleteForm(id: string) {
    await api.deleteForm(id);
    this.fetchForms();
  }
}

const formStore = new FormStore();

export default formStore;
