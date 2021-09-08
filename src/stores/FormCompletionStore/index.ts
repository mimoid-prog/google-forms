import { action, makeObservable, observable, runInAction } from "mobx";

import * as api from "src/api";
import {
  FormField,
  FormFieldConfigWithState,
  FormFieldWithState,
} from "src/types/FormField";

import validateField from "./validateField";

export class FormCompletionStore {
  id = "";
  isSaving = false;
  fields: FormFieldWithState[] = [];

  constructor(id: string, initialFields: FormField[]) {
    this.id = id;
    this.fields = initialFields.map((field) => {
      let config: FormFieldConfigWithState;

      if (field.config.value === "shortAnswer") {
        config = {
          ...field.config,
          state: {
            value: "",
            error: null,
          },
        };
      } else if (field.config.value === "longAnswer") {
        config = {
          ...field.config,
          state: {
            value: "",
            error: null,
          },
        };
      } else if (field.config.value === "linearScale") {
        config = {
          ...field.config,
          state: {
            value: "",
            error: null,
          },
        };
      } else if (field.config.value === "singleChoice") {
        config = {
          ...field.config,
          state: {
            value: null,
            error: null,
          },
        };
      } else {
        config = {
          ...field.config,
          state: {
            value: [
              ...field.config.options.map((option) => ({
                id: option.id,
                value: option.label,
                checked: false,
              })),
              {
                id: "other",
                value: "",
                checked: false,
              },
            ],
            error: null,
          },
        };
      }

      return {
        ...field,
        config,
      };
    });

    makeObservable(this, {
      isSaving: observable,
      fields: observable,
      onTextFieldChange: action.bound,
      onSingleChoiceFieldChange: action.bound,
      onMultipleChoiceFieldChange: action.bound,
      handleSubmit: action.bound,
    });
  }

  onTextFieldChange(fieldId: string, value: string) {
    this.fields = this.fields.map((field) => {
      if (field.id === fieldId) {
        if (
          field.config.value === "shortAnswer" ||
          field.config.value === "longAnswer" ||
          field.config.value === "linearScale"
        ) {
          const error = validateField(field, value);

          return {
            ...field,
            config: {
              ...field.config,
              state: {
                value,
                error,
              },
            },
          };
        }
      }

      return field;
    });
  }

  onSingleChoiceFieldChange(
    fieldId: string,
    value: { name: string; value: string },
  ) {
    this.fields = this.fields.map((field) => {
      if (field.id === fieldId) {
        if (field.config.value === "singleChoice") {
          const error = validateField(field, value);

          return {
            ...field,
            config: {
              ...field.config,
              state: {
                value,
                error,
              },
            },
          };
        }
      }

      return field;
    });
  }

  onMultipleChoiceFieldChange(
    fieldId: string,
    value: { id: string; value: string },
    otherOptionValueChange = false,
  ) {
    this.fields = this.fields.map((field) => {
      if (field.id === fieldId) {
        if (field.config.value === "multipleChoice") {
          const optionIndex = field.config.state.value.findIndex(
            (currItemValue) => currItemValue.id === value.id,
          );

          const newValue = [...field.config.state.value];

          newValue[optionIndex] = {
            ...value,
            checked: otherOptionValueChange
              ? newValue[optionIndex].checked
              : !newValue[optionIndex].checked,
          };

          const error = validateField(field, newValue);

          return {
            ...field,
            config: {
              ...field.config,
              state: {
                value: newValue,
                error,
              },
            },
          };
        }
      }

      return field;
    });
  }

  async handleSubmit() {
    runInAction(() => {
      this.isSaving = true;
    });

    await api.addAnswer(this.id, this.fields);

    runInAction(() => {
      this.isSaving = false;
    });
  }
}
