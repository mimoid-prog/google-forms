import { nanoid } from "nanoid";
import { createContext, ReactNode, useState } from "react";
import useFormStore from "src/hooks/useFormStore";
import {
  FormField,
  FormFieldConfig,
  FormFieldConfigValue,
  Schema,
} from "src/types/FormField";

type Store = {
  loading: boolean;
  error: any;
  values: {
    title: string;
    description: string;
    fields: FormField[];
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
    typeValue: FormFieldConfigValue;
  }) => void;
  toggleSchemaProperty: (fieldId: string, schemaProperty: keyof Schema) => void;
  changeFieldOption: ({
    id,
    optionId,
    value,
  }: {
    id: string;
    optionId: string;
    value: string;
  }) => void;
  addFieldOption: (fieldId: string) => void;
  deleteFieldOption: ({
    fieldId,
    optionId,
  }: {
    fieldId: string;
    optionId: string;
  }) => void;
  changeMinScale: ({
    fieldId,
    minScale,
  }: {
    fieldId: string;
    minScale: string;
  }) => void;
  changeMaxScale: ({
    fieldId,
    maxScale,
  }: {
    fieldId: string;
    maxScale: string;
  }) => void;
  changeMinText: ({
    fieldId,
    minText,
  }: {
    fieldId: string;
    minText: string;
  }) => void;
  changeMaxText: ({
    fieldId,
    maxText,
  }: {
    fieldId: string;
    maxText: string;
  }) => void;
};

export const FormEditContext = createContext<Store | undefined>(undefined);

export type Props = {
  children: ReactNode;
};

const defaultFieldConfig: FormFieldConfig = {
  value: "singleChoice",
  options: [
    {
      id: nanoid(),
      label: "Opcja 1",
    },
  ],
};

const FormEditProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("Formularz bez nazwy");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<FormField[]>([]);

  const { saveForm } = useFormStore();

  const submitForm = () => {
    saveForm(undefined, {
      title,
      description,
      fields: fields,
    });
  };

  const addFormField = () => {
    const newFormField: FormField = {
      id: nanoid(),
      order: fields.length,
      question: "",
      config: defaultFieldConfig,
      schema: {
        required: false,
        allowOtherOption: false,
      },
    };

    setFields([...fields, newFormField]);
  };

  const changeFieldQuestion = ({
    id,
    question,
  }: {
    id: string;
    question: string;
  }) => {
    const newFormFields = fields.map((field) => {
      if (field.id === id) {
        const newFormField = {
          ...field,
          question,
        };

        return newFormField;
      } else {
        return field;
      }
    });

    setFields(newFormFields);
  };

  const changeFieldType = ({
    id,
    typeValue,
  }: {
    id: string;
    typeValue: FormFieldConfigValue;
  }) => {
    const newFormFields = fields.map((field) => {
      if (field.id === id) {
        if (typeValue === "shortAnswer" || typeValue === "longAnswer") {
          const newFormField = {
            ...field,
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
            ...field,
            type: {
              ...defaultFieldConfig,
              value: typeValue,
            },
          };

          return newFormField;
        } else {
          const newFormField = {
            ...field,
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
        return field;
      }
    });

    setFields(newFormFields);
  };

  const toggleSchemaProperty = (
    fieldId: string,
    schemaProperty: keyof Schema
  ) => {
    const newFields = fields.map((field) => {
      if (field.id === fieldId) {
        const newField = {
          ...field,
          schema: {
            ...field.schema,
            [schemaProperty]: !field.schema[schemaProperty],
          },
        };

        return newField;
      } else {
        return field;
      }
    });

    setFields(newFields);
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
    const newFormFields = fields.map((field) => {
      if (
        field.id === id &&
        (field.config.value === "singleChoice" ||
          field.config.value === "multipleChoice")
      ) {
        const newFormFieldOptions = field.config.options.map((option) =>
          option.id === optionId
            ? {
                id: optionId,
                label: value,
              }
            : option
        );

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

    setFields(newFormFields);
  };

  const addFieldOption = (fieldId: string) => {
    const newFormFields = fields.map((field) => {
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

    setFields(newFormFields);
  };

  const deleteFieldOption = ({
    fieldId,
    optionId,
  }: {
    fieldId: string;
    optionId: string;
  }) => {
    const newFormFields = fields.map((field) => {
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

    setFields(newFormFields);
  };

  const changeMinScale = ({
    fieldId,
    minScale,
  }: {
    fieldId: string;
    minScale: string;
  }) => {
    const newFormFields = fields.map((field) => {
      if (field.id === fieldId && field.config.value === "linearScale") {
        return {
          ...field,
          type: {
            ...field.config,
            minScale,
          },
        };
      } else {
        return field;
      }
    });

    setFields(newFormFields);
  };

  const changeMaxScale = ({
    fieldId,
    maxScale,
  }: {
    fieldId: string;
    maxScale: string;
  }) => {
    const newFormFields = fields.map((field) => {
      if (field.id === fieldId && field.config.value === "linearScale") {
        return {
          ...field,
          type: {
            ...field.config,
            maxScale,
          },
        };
      } else {
        return field;
      }
    });

    setFields(newFormFields);
  };

  const changeMinText = ({
    fieldId,
    minText,
  }: {
    fieldId: string;
    minText: string;
  }) => {
    const newFormFields = fields.map((field) => {
      if (field.id === fieldId && field.config.value === "linearScale") {
        return {
          ...field,
          type: {
            ...field.config,
            minText,
          },
        };
      } else {
        return field;
      }
    });

    setFields(newFormFields);
  };

  const changeMaxText = ({
    fieldId,
    maxText,
  }: {
    fieldId: string;
    maxText: string;
  }) => {
    const newFormFields = fields.map((field) => {
      if (field.id === fieldId && field.config.value === "linearScale") {
        return {
          ...field,
          type: {
            ...field.config,
            maxText,
          },
        };
      } else {
        return field;
      }
    });

    setFields(newFormFields);
  };

  const store = {
    loading,
    error,
    values: {
      title,
      description,
      fields,
    },
    submitForm,
    changeTitle: setTitle,
    changeDescription: setDescription,
    addFormField,
    changeFieldQuestion,
    changeFieldType,
    toggleSchemaProperty,
    changeFieldOption,
    addFieldOption,
    deleteFieldOption,
    changeMinScale,
    changeMaxScale,
    changeMinText,
    changeMaxText,
  };

  return (
    <FormEditContext.Provider value={store}>
      {children}
    </FormEditContext.Provider>
  );
};

export default FormEditProvider;
