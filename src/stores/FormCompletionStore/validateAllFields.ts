import { FormFieldWithState } from "src/types/FormField";

import validateField from "./validateField";

const validateAllFields = (fields: FormFieldWithState[]) => {
  let isError = false;

  const newFields = fields.map((field) => {
    const error = validateField(field);

    if (error) isError = true;

    return {
      ...field,
      config: {
        ...field.config,
        state: {
          value: field.config.state.value,
          error,
        },
      },
    };
  });

  return { isError, newFields };
};

export default validateAllFields;
