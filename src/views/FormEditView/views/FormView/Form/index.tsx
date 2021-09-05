import { makeStyles, Box, TextField } from "@material-ui/core";
import { FormButton, FormFieldBox } from "src/components";
import useFormEdit from "src/hooks/useFormEdit";
import FormFieldComp from "./FormField";

const useStyles = makeStyles((theme) => ({
  root: {},
  formFields: {
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

const Form = () => {
  const classes = useStyles();

  const { values, loading, changeTitle, changeDescription, submitForm } =
    useFormEdit();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("1. handleSubmit");
    submitForm();
  };

  return (
    <Box className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Box className={classes.formFields}>
          <FormFieldBox active header>
            <TextField
              value={values.title}
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
              value={values.description}
              onChange={(e) => changeDescription(e.target.value)}
              placeholder="Opis formularza"
              className={classes.descriptionTextField}
            />
          </FormFieldBox>
          {values.formFields.map((formField) => (
            <FormFieldBox key={formField.id} active>
              <FormFieldComp formField={formField} />
            </FormFieldBox>
          ))}
        </Box>
        <FormButton loading={loading} />
      </form>
    </Box>
  );
};

export default Form;
