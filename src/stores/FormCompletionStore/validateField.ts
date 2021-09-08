import { FormFieldWithState } from "src/types/FormField";

const messages = {
  required: "Odpowiedź na to pytanie jest wymagana",
  default: "Wystąpił błąd",
};

const validateField = (field: FormFieldWithState, newValue: any) => {
  if (
    field.config.value === "shortAnswer" ||
    field.config.value === "longAnswer" ||
    field.config.value === "linearScale"
  ) {
    if (field.schema.required) {
      if (newValue === "") {
        return messages.required;
      }
    }
  } else if (field.config.value === "singleChoice") {
    if (field.schema.required) {
      if (
        newValue === null ||
        (newValue.name === "other" && newValue.value === "")
      ) {
        return messages.required;
      }
    }
  } else if (field.config.value === "multipleChoice") {
    if (field.schema.required) {
      const checkedOptions = newValue.filter((option: any) => option.checked);

      if (checkedOptions.length === 0) {
        return messages.required;
      }
    }
  }

  return null;
};

export default validateField;
