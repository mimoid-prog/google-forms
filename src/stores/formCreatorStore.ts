import debounce from "lodash.debounce";
import { action, computed, makeObservable, observable, observe } from "mobx";
import { nanoid } from "nanoid";

import * as api from "src/api";
import {
  FormFieldConfigValue,
  LinearScaleConfig,
  Schema,
} from "src/types/FormField";
import { FormValues } from "src/types/FormValues";

import formStore from "./formStore";

const defaultOptions = [
  {
    id: nanoid(),
    label: "Opcja 1",
  },
];

export class FormCreatorStore {
  isLoading = true;
  isSaving = false;
  isSaved = false;

  id = "";

  values: FormValues = {
    title: "Formularz bez nazwy",
    description: "",
    fields: [],
  };

  constructor(id: string) {
    this.id = id;

    makeObservable(this, {
      isLoading: observable,
      isSaving: observable,
      isSaved: observable,
      values: observable,
      fieldsAmount: computed,
      sortedFields: computed,
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
      getFormValues: action.bound,
      submitForm: action.bound,
    });

    const debouncedSubmit = debounce(() => {
      this.submitForm();
    }, 500);

    observe(this.values, () => {
      debouncedSubmit();
    });
  }

  get fieldsAmount() {
    return this.values.fields.length;
  }

  get sortedFields() {
    return this.values.fields.slice().sort((a, b) => a.order - b.order);
  }

  getFormValues(id: string) {
    api.getForm(id).then((form) => {
      if (form) {
        this.values = {
          title: form.title,
          description: form.description,
          fields: form.fields,
        };
      }

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
    this.values.fields.push({
      id: nanoid(),
      order: this.values.fields.length,
      question: "",
      config: {
        value: "singleChoice",
        options: defaultOptions,
      },
      schema: {
        required: false,
        allowOtherOption: false,
      },
    });
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
    this.isSaving = true;
    await formStore.saveForm(this.id, this.values);
    this.isSaving = false;
    this.isSaved = true;
  }
}
