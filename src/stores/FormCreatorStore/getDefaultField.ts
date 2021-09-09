import { nanoid } from "nanoid";

import { FormField } from "src/types/FormField";

const getDefaultField = (order: number): FormField => {
  return {
    id: nanoid(),
    order,
    question: "",
    config: {
      value: "singleChoice",
      options: [
        {
          id: nanoid(),
          label: "Opcja 1",
        },
      ],
    },
    schema: {
      required: false,
      allowOtherOption: false,
    },
  };
};

export default getDefaultField;
