import { Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { FormButton } from "src/components";
import { FormField, FormFieldWithState } from "src/types/FormField";
import Field from "./Field";
import validate from "./validate";
import validateAll from "./validateAll";
import validateMultipleChoiceValue from "./validateMultipleChoiceValue";
import validateSingleChoiceValue from "./validateSingleChoiceValue";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export type Props = {
  fields: FormField[];
};

const Form = ({ fields }: Props) => {
  const classes = useStyles();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const initialFieldsWithState: FormFieldWithState[] = fields.map((field) => {
    let value;

    if (
      field.type.value === "shortAnswer" ||
      field.type.value === "longAnswer" ||
      field.type.value === "linearScale"
    ) {
      value = "";
    } else if (field.type.value === "singleChoice") {
      value = null;
    } else if (field.type.value === "multipleChoice") {
      value = [];
    } else {
      throw new Error("You forgot to define some property for field state");
    }

    return {
      ...field,
      type: {
        ...field.type,
        state: {
          value,
          error: null,
        },
      },
    };
  });

  const [fieldsWithState, setFieldsWithState] = useState(
    initialFieldsWithState
  );

  const onStringFieldAction = (id: string, value: string) => {
    const newFieldsWithState = fieldsWithState.map((field) => {
      if (
        field.id === id &&
        (field.type.value === "shortAnswer" ||
          field.type.value === "longAnswer" ||
          field.type.value === "linearScale")
      ) {
        const error = validate(field);

        return {
          ...field,
          type: {
            ...field.type,
            state: {
              value,
              error,
            },
          },
        };
      }

      return field;
    });

    setFieldsWithState(newFieldsWithState);
  };

  const handleSingleChoiceAction = (
    id: string,
    value: { name: string; value: string }
  ) => {
    const newFieldsWithState = fieldsWithState.map((field) => {
      if (field.id === id && field.type.value === "singleChoice") {
        const error = validateSingleChoiceValue(value, {
          required: field.required,
          allowOtherOption: field.type.allowOtherOption,
        });

        return {
          ...field,
          type: {
            ...field.type,
            state: {
              value,
              error,
            },
          },
        };
      }

      return field;
    });

    setFieldsWithState(newFieldsWithState);
  };

  const handleMultipleChoiceAction = (
    id: string,
    valueItem: {
      name: string;
      value: string;
    }
  ) => {
    const newFieldsWithState = fieldsWithState.map((field) => {
      if (field.id === id && field.type.value === "multipleChoice") {
        const newValue =
          field.type.state.value.findIndex(
            (currItemValue) => currItemValue.name === valueItem.name
          ) !== -1
            ? field.type.state.value.filter(
                (currValueItem) => currValueItem.name !== valueItem.name
              )
            : [...field.type.state.value, valueItem];

        const error = validateMultipleChoiceValue(newValue, {
          required: field.required,
          allowOtherOption: field.type.allowOtherOption,
        });

        return {
          ...field,
          type: {
            ...field.type,
            state: {
              value: newValue,
              error,
            },
          },
        };
      } else {
        return field;
      }
    });

    setFieldsWithState(newFieldsWithState);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const { isError, items } = validateAll(fieldsWithState);

    // if (isError) {
    //   setFieldsWithState(items);
    // } else {
    //   console.log(fieldsWithState);
    // }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {fieldsWithState.map((fieldWithState) => (
          <Grid item xs={12} key={fieldWithState.id}>
            <Field
              fieldWithState={fieldWithState}
              handleStringValueChange={onStringFieldAction}
              handleMultipleChoiceAction={handleMultipleChoiceAction}
              handleSingleChoiceAction={handleSingleChoiceAction}
            />
          </Grid>
        ))}
      </Grid>
      <FormButton loading={false} text="Prześlij" />
    </form>
  );
};

export default Form;
