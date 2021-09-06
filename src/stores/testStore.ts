import { action, makeObservable, observable } from "mobx";
import { nanoid } from "nanoid";

type Field = {
  id: string;
  value: string;
};

const initialFields = Array.from(Array(550)).map(() => ({
  id: nanoid(),
  value: "",
}));

export class TestStore {
  fields: Field[] = initialFields;

  constructor() {
    makeObservable(this, {
      fields: observable,
      handleChange: action.bound,
    });
  }

  handleChange(id: string, newValue: string) {
    this.fields = this.fields.map((field) =>
      field.id === id ? { ...field, value: newValue } : field
    );
  }
}

const testStore = new TestStore();

export default testStore;
