import { action, makeObservable, observable } from "mobx";
import { Form } from "./types";

export class FormStore {
  forms: Form[] = [];

  constructor() {
    makeObservable(this, {
      forms: observable,
      addForm: action,
    });
  }

  addForm(title: string) {
    this.forms.push({
      title,
    });
  }
}

const formStore = new FormStore();

export default formStore;
