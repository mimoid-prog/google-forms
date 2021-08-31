import { action, makeObservable, observable } from "mobx";
import { Form } from "./types";
import { nanoid } from "nanoid";

export class FormStore {
  forms: Form[] = [];

  constructor() {
    makeObservable(this, {
      forms: observable,
      addForm: action.bound,
      deleteForm: action.bound,
    });
  }

  addForm(title: string) {
    this.forms.push({
      id: nanoid(),
      title,
    });
  }

  deleteForm(id: string) {
    this.forms.filter((form) => form.id !== id);
  }
}

const formStore = new FormStore();

export default formStore;
