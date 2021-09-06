import { makeStyles, Box, TextField } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { FormButton, FormFieldBox } from "src/components";
import formCreatorStore from "src/stores/formCreatorStore";
import { FormField } from "src/types/FormField";
import { FormValues } from "src/types/FormValues";
import FormFieldContent from "./FormField";

const useStyles = makeStyles((theme) => ({
  root: {},
  fields: {
    display: "grid",
    gap: theme.spacing(2),
  },
  titleTextField: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  titleInput: {
    fontSize: 30,
    fontWeight: 500,
  },
  descriptionTextField: {
    width: "100%",
  },
}));

// export type Props = {
//   values: FormValues;
//   handleTitleChange: (
//     e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
//   ) => void;
//   handleDescriptionChange: (
//     e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
//   ) => void;
//   handleFieldChange: (newField: FormField) => void;
// };

const Form = observer(() => {
  const classes = useStyles();

  const { title, description, fields, changeTitle, changeDescription } =
    formCreatorStore;

  console.log(title);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // submitForm();
    console.log("submit");
  };

  return (
    <Box className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Box className={classes.fields}>
          <FormFieldBox active header>
            <TextField
              value={title}
              onChange={(e) => changeTitle(e.target.value)}
              placeholder="Tytuł formularza"
              className={classes.titleTextField}
              InputProps={{
                classes: {
                  input: classes.titleInput,
                },
              }}
            />
            <TextField
              value={description}
              onChange={(e) => changeDescription(e.target.value)}
              placeholder="Opis formularza"
              className={classes.descriptionTextField}
            />
          </FormFieldBox>
          {fields.map((field) => (
            <FormFieldBox key={field.id} active>
              <FormFieldContent field={field} />
            </FormFieldBox>
          ))}
        </Box>
        <FormButton loading={false} />
      </form>
    </Box>
  );
});

export default Form;
