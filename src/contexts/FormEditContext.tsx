import { nanoid } from "nanoid";
import { createContext, ReactNode, useState } from "react";
import useFormStore from "src/hooks/useFormStore";
import {
  FormField,
  FormFieldType,
  FormFieldTypeValue,
} from "src/types/FormField";

type Store = {
  loading: boolean;
  error: any;
  values: {
    title: string;
    description: string;
    formFields: FormField[];
  };
  submitForm: () => void;
  changeTitle: React.Dispatch<React.SetStateAction<string>>;
  changeDescription: React.Dispatch<React.SetStateAction<string>>;
  addFormField: () => void;
  changeFieldQuestion: ({
    id,
    question,
  }: {
    id: string;
    question: string;
  }) => void;
  changeFieldType: ({
    id,
    typeValue,
  }: {
    id: string;
    typeValue: FormFieldTypeValue;
  }) => void;
  changeFieldRequired: (id: string) => void;
  changeFieldOption: ({
    id,
    optionId,
    value,
  }: {
    id: string;
    optionId: string;
    value: string;
  }) => void;
  addFieldOption: (formFieldId: string) => void;
  deleteFieldOption: ({
    formFieldId,
    optionId,
  }: {
    formFieldId: string;
    optionId: string;
  }) => void;
  toggleAllowOtherOption: (formFieldId: string) => void;
  changeMinScale: ({
    formFieldId,
    minScale,
  }: {
    formFieldId: string;
    minScale: string;
  }) => void;
  changeMaxScale: ({
    formFieldId,
    maxScale,
  }: {
    formFieldId: string;
    maxScale: string;
  }) => void;
  changeMinText: ({
    formFieldId,
    minText,
  }: {
    formFieldId: string;
    minText: string;
  }) => void;
  changeMaxText: ({
    formFieldId,
    maxText,
  }: {
    formFieldId: string;
    maxText: string;
  }) => void;
};

export const FormEditContext = createContext<Store | undefined>(undefined);

export type Props = {
  children: ReactNode;
};

const defaultFieldType: FormFieldType = {
  value: "singleChoice",
  options: [
    {
      id: nanoid(),
      label: "Opcja 1",
    },
  ],
  allowOtherOption: false,
};

const FormEditProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("Formularz bez nazwy");
  const [description, setDescription] = useState("");
  const [formFields, setFormFields] = useState<FormField[]>([]);

  const { saveForm } = useFormStore();

  const submitForm = () => {
    saveForm(undefined, {
      title,
      description,
      fields: formFields,
    });
  };

  const addFormField = () => {
    const newFormField: FormField = {
      id: nanoid(),
      order: formFields.length,
      question: "",
      required: false,
      type: defaultFieldType,
    };

    setFormFields([...formFields, newFormField]);
  };

  const changeFieldQuestion = ({
    id,
    question,
  }: {
    id: string;
    question: string;
  }) => {
    const newFormFields = formFields.map((formField) => {
      if (formField.id === id) {
        const newFormField = {
          ...formField,
          question,
        };

        return newFormField;
      } else {
        return formField;
      }
    });

    setFormFields(newFormFields);
  };

  const changeFieldType = ({
    id,
    typeValue,
  }: {
    id: string;
    typeValue: FormFieldTypeValue;
  }) => {
    const newFormFields = formFields.map((formField) => {
      if (formField.id === id) {
        if (typeValue === "shortAnswer" || typeValue === "longAnswer") {
          const newFormField = {
            ...formField,
            type: {
              value: typeValue,
            },
          };

          return newFormField;
        } else if (
          typeValue === "singleChoice" ||
          typeValue === "multipleChoice"
        ) {
          const newFormField = {
            ...formField,
            type: {
              ...defaultFieldType,
              value: typeValue,
            },
          };

          return newFormField;
        } else {
          const newFormField = {
            ...formField,
            type: {
              value: typeValue,
              minScale: "1",
              minText: "",
              maxScale: "5",
              maxText: "",
            },
          };

          return newFormField;
        }
      } else {
        return formField;
      }
    });

    setFormFields(newFormFields);
  };

  const changeFieldRequired = (id: string) => {
    const newFormFields = formFields.map((formField) => {
      if (formField.id === id) {
        const newFormField = {
          ...formField,
          required: !formField.required,
        };

        return newFormField;
      } else {
        return formField;
      }
    });

    setFormFields(newFormFields);
  };

  const changeFieldOption = ({
    id,
    optionId,
    value,
  }: {
    id: string;
    optionId: string;
    value: string;
  }) => {
    const newFormFields = formFields.map((formField) => {
      if (
        formField.id === id &&
        (formField.type.value === "singleChoice" ||
          formField.type.value === "multipleChoice")
      ) {
        const newFormFieldOptions = formField.type.options.map((option) =>
          option.id === optionId
            ? {
                id: optionId,
                label: value,
              }
            : option
        );

        return {
          ...formField,
          type: {
            ...formField.type,
            options: newFormFieldOptions,
          },
        };
      } else {
        return formField;
      }
    });

    setFormFields(newFormFields);
  };

  const addFieldOption = (formFieldId: string) => {
    const newFormFields = formFields.map((formField) => {
      if (
        formField.id === formFieldId &&
        (formField.type.value === "singleChoice" ||
          formField.type.value === "multipleChoice")
      ) {
        const newOption = {
          id: nanoid(),
          label: `Opcja ${formField.type.options.length + 1}`,
        };

        return {
          ...formField,
          type: {
            ...formField.type,
            options: [...formField.type.options, newOption],
          },
        };
      } else {
        return formField;
      }
    });

    setFormFields(newFormFields);
  };

  const deleteFieldOption = ({
    formFieldId,
    optionId,
  }: {
    formFieldId: string;
    optionId: string;
  }) => {
    const newFormFields = formFields.map((formField) => {
      if (
        formField.id === formFieldId &&
        (formField.type.value === "singleChoice" ||
          formField.type.value === "multipleChoice")
      ) {
        const newOptions = formField.type.options.filter(
          (option) => option.id !== optionId
        );

        return {
          ...formField,
          type: {
            ...formField.type,
            options: newOptions,
          },
        };
      } else {
        return formField;
      }
    });

    setFormFields(newFormFields);
  };

  const toggleAllowOtherOption = (formFieldId: string) => {
    const newFormFields = formFields.map((formField) => {
      if (
        formField.id === formFieldId &&
        (formField.type.value === "singleChoice" ||
          formField.type.value === "multipleChoice")
      ) {
        return {
          ...formField,
          type: {
            ...formField.type,
            allowOtherOption: !formField.type.allowOtherOption,
          },
        };
      } else {
        return formField;
      }
    });

    setFormFields(newFormFields);
  };

  const changeMinScale = ({
    formFieldId,
    minScale,
  }: {
    formFieldId: string;
    minScale: string;
  }) => {
    const newFormFields = formFields.map((formField) => {
      if (
        formField.id === formFieldId &&
        formField.type.value === "linearScale"
      ) {
        return {
          ...formField,
          type: {
            ...formField.type,
            minScale,
          },
        };
      } else {
        return formField;
      }
    });

    setFormFields(newFormFields);
  };

  const changeMaxScale = ({
    formFieldId,
    maxScale,
  }: {
    formFieldId: string;
    maxScale: string;
  }) => {
    const newFormFields = formFields.map((formField) => {
      if (
        formField.id === formFieldId &&
        formField.type.value === "linearScale"
      ) {
        return {
          ...formField,
          type: {
            ...formField.type,
            maxScale,
          },
        };
      } else {
        return formField;
      }
    });

    setFormFields(newFormFields);
  };

  const changeMinText = ({
    formFieldId,
    minText,
  }: {
    formFieldId: string;
    minText: string;
  }) => {
    const newFormFields = formFields.map((formField) => {
      if (
        formField.id === formFieldId &&
        formField.type.value === "linearScale"
      ) {
        return {
          ...formField,
          type: {
            ...formField.type,
            minText,
          },
        };
      } else {
        return formField;
      }
    });

    setFormFields(newFormFields);
  };

  const changeMaxText = ({
    formFieldId,
    maxText,
  }: {
    formFieldId: string;
    maxText: string;
  }) => {
    const newFormFields = formFields.map((formField) => {
      if (
        formField.id === formFieldId &&
        formField.type.value === "linearScale"
      ) {
        return {
          ...formField,
          type: {
            ...formField.type,
            maxText,
          },
        };
      } else {
        return formField;
      }
    });

    setFormFields(newFormFields);
  };

  const store = {
    loading,
    error,
    values: {
      title,
      description,
      formFields,
    },
    submitForm,
    changeTitle: setTitle,
    changeDescription: setDescription,
    addFormField,
    changeFieldQuestion,
    changeFieldType,
    changeFieldRequired,
    changeFieldOption,
    addFieldOption,
    deleteFieldOption,
    toggleAllowOtherOption,
    changeMinScale,
    changeMaxScale,
    changeMinText,
    changeMaxText,
  };

  console.log(store.values);

  return (
    <FormEditContext.Provider value={store}>
      {children}
    </FormEditContext.Provider>
  );
};

export default FormEditProvider;
