import { action, makeObservable, observable } from "mobx";
import { nanoid } from "nanoid";
import { FormField, FormFieldConfigValue, Schema } from "src/types/FormField";

const defaultOptions = [
  {
    id: nanoid(),
    label: "Opcja 1",
  },
];

export class FormCreatorStore {
  title = "Formularz bez nazwy";
  description = "";
  fields: FormField[] = [];

  constructor() {
    makeObservable(this, {
      title: observable,
      description: observable,
      fields: observable.deep,
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
      submitForm: action.bound,
    });
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
        options: observable(defaultOptions),
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
        : field
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
        : field
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
          type: {
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
        // console.log(fieldId, optionId, value);
        const newFormFieldOptions = field.config.options.map((option) =>
          option.id === optionId
            ? {
                id: optionId,
                label: value,
              }
            : option
        );

        console.log(newFormFieldOptions);

        return {
          ...field,
          type: {
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
          (option) => option.id !== optionId
        );

        return {
          ...field,
          type: {
            ...field.config,
            options: newOptions,
          },
        };
      } else {
        return field;
      }
    });
  }

  submitForm() {
    console.log(this.title);
    console.log(this.description);
    console.log(this.fields);
  }
}

const formCreatorStore = new FormCreatorStore();

export default formCreatorStore;
