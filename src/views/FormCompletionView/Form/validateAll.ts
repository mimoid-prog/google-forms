import { FormFieldWithState } from "src/types/FormField";

const validate = (fieldsWithState: FormFieldWithState[]) => {
  let isError = false;

  const items = fieldsWithState.map((field) => {
    if (field.required) {
      if (field.type.value === "multipleChoice") {
        if (field.type.state.value.length === 0) {
          isError = true;

          return {
            ...field,
            type: {
              ...field.type,
              state: {
                ...field.type.state,
                error: "todo",
              },
            },
          };
        } else {
          return field;
        }
      } else {
        if (!field.type.state.value) {
          isError = true;

          return {
            ...field,
            type: {
              ...field.type,
              state: {
                ...field.type.state,
                error: "TAK",
              },
            },
          };
        } else {
          return field;
        }
      }
    } else {
      return field;
    }
  });

  return {
    isError,
    items,
  };
};

export default validate;
