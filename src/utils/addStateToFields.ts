import { Answer } from "src/types/Answer";
import {
  FormField,
  FormFieldConfigWithState,
  FormFieldWithState,
} from "src/types/FormField";

const addStateToFields = (
  fields: FormField[],
  answer?: Answer,
): FormFieldWithState[] => {
  const fieldsWithState = fields.map((field) => {
    let config: FormFieldConfigWithState;

    const fieldAnswer = answer
      ? answer.fields.find((fieldAnswer) => fieldAnswer.id === field.id) || null
      : null;

    if (field.config.value === "shortAnswer") {
      const value =
        fieldAnswer && fieldAnswer.config.value === field.config.value
          ? fieldAnswer.config.state.value
          : "";

      config = {
        ...field.config,
        state: {
          value,
          error: null,
        },
      };
    } else if (field.config.value === "longAnswer") {
      const value =
        fieldAnswer && fieldAnswer.config.value === field.config.value
          ? fieldAnswer.config.state.value
          : "";

      config = {
        ...field.config,
        state: {
          value,
          error: null,
        },
      };
    } else if (field.config.value === "linearScale") {
      const value =
        fieldAnswer && fieldAnswer.config.value === field.config.value
          ? fieldAnswer.config.state.value
          : "";

      config = {
        ...field.config,
        state: {
          value,
          error: null,
        },
      };
    } else if (field.config.value === "singleChoice") {
      const value =
        fieldAnswer && fieldAnswer.config.value === field.config.value
          ? fieldAnswer.config.state.value
          : null;

      config = {
        ...field.config,
        state: {
          value,
          error: null,
        },
      };
    } else {
      const otherFieldAnswerItem =
        fieldAnswer && fieldAnswer.config.value === field.config.value
          ? fieldAnswer.config.state.value.find(
              (fieldAnswerValueItem) => fieldAnswerValueItem.id === "other",
            )
          : null;

      const value =
        fieldAnswer && fieldAnswer.config.value === field.config.value
          ? [
              ...field.config.options.map((option) => {
                const fieldAnswerItem =
                  field.config.value === "multipleChoice" &&
                  fieldAnswer.config.value === field.config.value
                    ? fieldAnswer.config.state.value.find(
                        (fieldAnswerValueItem) =>
                          fieldAnswerValueItem.id === option.id,
                      ) || null
                    : null;

                return {
                  id: option.id,
                  value: option.label,
                  checked: fieldAnswerItem ? fieldAnswerItem.checked : false,
                };
              }),
              {
                id: "other",
                value: otherFieldAnswerItem?.value || "",
                checked: otherFieldAnswerItem?.checked || false,
              },
            ]
          : [
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
            ];

      config = {
        ...field.config,
        state: {
          value,
          error: null,
        },
      };
    }

    return {
      ...field,
      config,
    };
  });

  return fieldsWithState;
};

export default addStateToFields;
