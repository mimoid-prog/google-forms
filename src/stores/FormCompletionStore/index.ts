import { action, makeObservable, observable, runInAction } from "mobx";

import * as api from "src/api";
import { FormField, FormFieldWithState } from "src/types/FormField";
import { addStateToFields } from "src/utils";

import validateAllFields from "./validateAllFields";
import validateField from "./validateField";

export class FormCompletionStore {
  id = "";
  isSaving = false;
  fields: FormFieldWithState[] = [];

  constructor(id: string, initialFields: FormField[]) {
    this.id = id;
    this.fields = addStateToFields(initialFields);

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

    const { isError, newFields } = validateAllFields(this.fields);

    if (isError) {
      runInAction(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        this.fields = newFields;
        this.isSaving = false;
      });

      return { success: false };
    } else {
      await api.addAnswer(this.id, this.fields);

      runInAction(() => {
        this.isSaving = false;
      });

      return { success: true };
    }
  }
}
