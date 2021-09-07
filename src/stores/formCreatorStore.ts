import debounce from "lodash.debounce";
import { action, computed, makeObservable, observable, reaction } from "mobx";
import { nanoid } from "nanoid";

import {
  FormField,
  FormFieldConfigValue,
  LinearScaleConfig,
  Schema,
} from "src/types/FormField";

import formStore from "./formStore";

const defaultOptions = [
  {
    id: nanoid(),
    label: "Opcja 1",
  },
];

export class FormCreatorStore {
  isLoading = false;
  isSubmitting = false;
  title = "Formularz bez nazwy";
  description = "";
  fields: FormField[] = [];

  constructor() {
    makeObservable(this, {
      isSubmitting: observable,
      title: observable,
      description: observable,
      fields: observable,
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
      submitForm: action.bound,
    });

    reaction(
      () => this.title,
      (title) => {
        console.log(title);
        debounce(function () {
          console.log("Tytuł to: ", title);
        }, 500);
      },
    );
  }

  get fieldsAmount() {
    return this.fields.length;
  }

  get sortedFields() {
    return this.fields.slice().sort((a, b) => a.order - b.order);
  }

  changeTitle(newTitle: string) {
    this.title = newTitle;
  }

  changeDescription(newDescription: string) {
    this.description = newDescription;
  }

  addField() {
    this.fields.push({
      id: nanoid(),
      order: this.fields.length,
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
    this.fields = this.fields.filter((field) => field.id !== fieldId);
  }

  changeFieldQuestion(fieldId: string, newQuestion: string) {
    this.fields = this.fields.map((field) =>
      field.id === fieldId
        ? {
            ...field,
            question: newQuestion,
          }
        : field,
    );
  }

  changeFieldConfig(fieldId: string, newConfigValue: FormFieldConfigValue) {
    this.fields = this.fields.map((field) => {
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
    this.fields = this.fields.map((field) =>
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
    this.fields = this.fields.map((field) => {
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
    this.fields = this.fields.map((field) => {
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
    this.fields = this.fields.map((field) => {
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
    this.fields = this.fields.map((field) => {
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
    const fieldIndex = this.fields.findIndex((field) => field.id === fieldId);
    const upperFieldIndex = this.fields.findIndex(
      (field) => field.order === this.fields[fieldIndex].order - 1,
    );

    this.fields[fieldIndex].order = this.fields[fieldIndex].order - 1;
    this.fields[upperFieldIndex].order = this.fields[upperFieldIndex].order + 1;
  }

  moveFieldDown(fieldId: string) {
    const fieldIndex = this.fields.findIndex((field) => field.id === fieldId);
    const lowerFieldIndex = this.fields.findIndex(
      (field) => field.order === this.fields[fieldIndex].order + 1,
    );

    this.fields[fieldIndex].order = this.fields[fieldIndex].order + 1;
    this.fields[lowerFieldIndex].order = this.fields[lowerFieldIndex].order - 1;
  }

  async submitForm() {
    this.isSubmitting = true;

    const createdId = await formStore.saveForm(undefined, {
      title: this.title,
      description: this.description,
      fields: this.fields.sort((a, b) => a.order - b.order),
    });

    this.isSubmitting = false;

    return createdId;
  }
}
