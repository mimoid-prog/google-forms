import debounce from "lodash.debounce";
import {
  action,
  computed,
  makeObservable,
  observable,
  reaction,
  runInAction,
  toJS,
} from "mobx";
import { nanoid } from "nanoid";

import * as api from "src/api";
import { Form } from "src/types/Form";
import {
  FormFieldConfigValue,
  LinearScaleConfig,
  Schema,
} from "src/types/FormField";
import { FormValues } from "src/types/FormValues";

import formStore from "../FormStore";
import getDefaultField from "./getDefaultField";

const defaultOptions = [
  {
    id: nanoid(),
    label: "Opcja 1",
  },
];

export class FormCreatorStore {
  id = "";

  form: Form | null = null;

  isLoading = true;
  isSaving = false;
  isSaved = false;

  values: FormValues = {
    title: "Formularz bez nazwy",
    description: "",
    fields: [getDefaultField(0)],
  };

  constructor(id: string) {
    this.id = id;

    makeObservable(this, {
      form: observable,
      values: observable,
      isLoading: observable,
      isSaving: observable,
      isSaved: observable,
      fieldsAmount: computed,
      toggleSchemaProperty: action.bound,
      changeTitle: action.bound,
      changeDescription: action.bound,
      addField: action.bound,
      deleteField: action.bound,
      changeFieldQuestion: action.bound,
      changeFieldConfig: action.bound,
      addFieldOption: action.bound,
      changeFieldOption: action.bound,
      deleteFieldOption: action.bound,
      changeLinearScaleConfigProperty: action.bound,
      moveFieldUp: action.bound,
      moveFieldDown: action.bound,
      getForm: action.bound,
      submitForm: action.bound,
    });

    const debouncedSubmit = debounce(() => {
      this.submitForm();
    }, 750);

    reaction(
      () => toJS(this.values),
      () => {
        debouncedSubmit();
      },
    );

    this.getForm(this.id);
  }

  get fieldsAmount() {
    return this.values.fields.length;
  }

  async getForm(id: string) {
    const form = await api.getForm(id);

    if (form) {
      runInAction(() => {
        this.form = form;

        this.values = {
          title: form.title,
          description: form.description,
          fields: form.fields,
        };
      });
    }

    runInAction(() => {
      this.isLoading = false;
    });
  }

  changeTitle(newTitle: string) {
    this.values.title = newTitle;
  }

  changeDescription(newDescription: string) {
    this.values.description = newDescription;
  }

  addField() {
    this.values.fields.push(getDefaultField(this.values.fields.length));
  }

  deleteField(fieldId: string) {
    this.values.fields = this.values.fields.filter(
      (field) => field.id !== fieldId,
    );
  }

  changeFieldQuestion(fieldId: string, newQuestion: string) {
    this.values.fields = this.values.fields.map((field) =>
      field.id === fieldId
        ? {
            ...field,
            question: newQuestion,
          }
        : field,
    );
  }

  changeFieldConfig(fieldId: string, newConfigValue: FormFieldConfigValue) {
    this.values.fields = this.values.fields.map((field) => {
      if (field.id === fieldId) {
        let newConfig;

        if (newConfigValue === "shortAnswer") {
          newConfig = {
            value: newConfigValue,
          };
        } else if (newConfigValue === "longAnswer") {
          newConfig = {
            value: newConfigValue,
          };
        } else if (newConfigValue === "singleChoice") {
          newConfig = {
            value: newConfigValue,
            options: defaultOptions,
          };
        } else if (newConfigValue === "multipleChoice") {
          newConfig = {
            value: newConfigValue,
            options: defaultOptions,
          };
        } else {
          newConfig = {
            value: newConfigValue,
            minScale: "1",
            minText: "",
            maxScale: "5",
            maxText: "",
          };
        }

        return {
          ...field,
          config: newConfig,
        };
      }

      return field;
    });
  }

  toggleSchemaProperty(fieldId: string, property: keyof Schema) {
    this.values.fields = this.values.fields.map((field) =>
      field.id === fieldId
        ? {
            ...field,
            schema: {
              ...field.schema,
              [property]: !field.schema[property],
            },
          }
        : field,
    );
  }

  addFieldOption(fieldId: string) {
    this.values.fields = this.values.fields.map((field) => {
      if (
        field.id === fieldId &&
        (field.config.value === "singleChoice" ||
          field.config.value === "multipleChoice")
      ) {
        const newOption = {
          id: nanoid(),
          label: `Opcja ${field.config.options.length + 1}`,
        };

        return {
          ...field,
          config: {
            ...field.config,
            options: [...field.config.options, newOption],
          },
        };
      } else {
        return field;
      }
    });
  }

  changeFieldOption({
    fieldId,
    optionId,
    value,
  }: {
    fieldId: string;
    optionId: string;
    value: string;
  }) {
    this.values.fields = this.values.fields.map((field) => {
      if (
        field.id === fieldId &&
        (field.config.value === "singleChoice" ||
          field.config.value === "multipleChoice")
      ) {
        const newFormFieldOptions = field.config.options.map((option) =>
          option.id === optionId
            ? {
                id: optionId,
                label: value,
              }
            : option,
        );

        return {
          ...field,
          config: {
            ...field.config,
            options: newFormFieldOptions,
          },
        };
      } else {
        return field;
      }
    });
  }

  deleteFieldOption({
    fieldId,
    optionId,
  }: {
    fieldId: string;
    optionId: string;
  }) {
    this.values.fields = this.values.fields.map((field) => {
      if (
        field.id === fieldId &&
        (field.config.value === "singleChoice" ||
          field.config.value === "multipleChoice")
      ) {
        const newOptions = field.config.options.filter(
          (option) => option.id !== optionId,
        );

        return {
          ...field,
          config: {
            ...field.config,
            options: newOptions,
          },
        };
      } else {
        return field;
      }
    });
  }

  changeLinearScaleConfigProperty({
    fieldId,
    value,
    property,
  }: {
    fieldId: string;
    value: string;
    property: keyof LinearScaleConfig;
  }) {
    this.values.fields = this.values.fields.map((field) => {
      if (field.id === fieldId && field.config.value === "linearScale") {
        return {
          ...field,
          config: {
            ...field.config,
            [property]: value,
          },
        };
      } else {
        return field;
      }
    });
  }

  moveFieldUp(fieldId: string) {
    const fieldIndex = this.values.fields.findIndex(
      (field) => field.id === fieldId,
    );
    const upperFieldIndex = this.values.fields.findIndex(
      (field) => field.order === this.values.fields[fieldIndex].order - 1,
    );

    this.values.fields[fieldIndex].order =
      this.values.fields[fieldIndex].order - 1;
    this.values.fields[upperFieldIndex].order =
      this.values.fields[upperFieldIndex].order + 1;
  }

  moveFieldDown(fieldId: string) {
    const fieldIndex = this.values.fields.findIndex(
      (field) => field.id === fieldId,
    );
    const lowerFieldIndex = this.values.fields.findIndex(
      (field) => field.order === this.values.fields[fieldIndex].order + 1,
    );

    this.values.fields[fieldIndex].order =
      this.values.fields[fieldIndex].order + 1;
    this.values.fields[lowerFieldIndex].order =
      this.values.fields[lowerFieldIndex].order - 1;
  }

  async submitForm() {
    runInAction(() => {
      this.isSaving = true;
    });

    const newForm = await formStore.saveForm(this.id, {
      ...this.values,
      fields: this.values.fields.slice().sort((a, b) => a.order - b.order),
    });

    runInAction(() => {
      this.form = newForm;
      this.isSaving = false;
      this.isSaved = true;
    });
  }
}
