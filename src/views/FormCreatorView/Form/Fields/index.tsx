import { makeStyles, Box, TextField } from "@material-ui/core";
import { observer } from "mobx-react-lite";

import { FormFieldBox } from "src/components";
import useFormCreatorStore from "src/hooks/useFormCreatorStore";

import Field from "./Field";

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

const Fields = observer(() => {
  const classes = useStyles();

  const {
    values: { title, description },
    sortedFields,
    changeTitle,
    changeDescription,
  } = useFormCreatorStore();

  return (
    <Box className={classes.root}>
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
        {sortedFields.map((field) => (
          <FormFieldBox key={field.id} active>
            <Field field={field} />
          </FormFieldBox>
        ))}
      </Box>
    </Box>
  );
});

export default Fields;
