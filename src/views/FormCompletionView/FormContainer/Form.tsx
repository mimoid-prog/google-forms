import { Grid, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";

import { FormButton, Field } from "src/components";
import useFormCompletionStore from "src/hooks/useFormCompletionStore";

// import Field from "./Field";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export type Props = {
  showResponse: () => void;
};

const Form = observer(({ showResponse }: Props) => {
  const classes = useStyles();

  const {
    fields,
    handleSubmit,
    isSaving,
    onTextFieldChange,
    onSingleChoiceFieldChange,
    onMultipleChoiceFieldChange,
  } = useFormCompletionStore();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { success } = await handleSubmit();

    if (success) {
      showResponse();
    }
  };

  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} key={field.id}>
            <Field
              field={field}
              onTextFieldChange={onTextFieldChange}
              onSingleChoiceFieldChange={onSingleChoiceFieldChange}
              onMultipleChoiceFieldChange={onMultipleChoiceFieldChange}
            />
          </Grid>
        ))}
      </Grid>
      <FormButton loading={isSaving} text="Prześlij" />
    </form>
  );
});

export default Form;
