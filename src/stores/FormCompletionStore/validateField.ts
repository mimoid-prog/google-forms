import { FormFieldWithState } from "src/types/FormField";

const messages = {
  required: "Odpowiedź na to pytanie jest wymagana",
  default: "Wystąpił błąd",
};

const validateField = (field: FormFieldWithState, newValue?: any) => {
  const valueToValidate =
    newValue === undefined ? field.config.state.value : newValue;

  if (
    field.config.value === "shortAnswer" ||
    field.config.value === "longAnswer" ||
    field.config.value === "linearScale"
  ) {
    if (field.schema.required) {
      if (valueToValidate === "") {
        return messages.required;
      }
    }
  } else if (field.config.value === "singleChoice") {
    if (field.schema.required) {
      if (
        valueToValidate === null ||
        (valueToValidate.name === "other" && valueToValidate.value === "")
      ) {
        return messages.required;
      }
    }
  } else if (field.config.value === "multipleChoice") {
    if (field.schema.required) {
      const checkedOptions = valueToValidate.filter(
        (option: any) => option.checked,
      );

      if (checkedOptions.length === 0) {
        return messages.required;
      }
    }
  }

  return null;
};

export default validateField;
