import { makeStyles, Box, TextField } from "@material-ui/core";
import { useState } from "react";
import { FormFieldBox } from "src/components";

const useStyles = makeStyles((theme) => ({
  root: {},
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

const FormView = () => {
  const classes = useStyles();

  const [title, setTitle] = useState("Formularz bez nazwy");
  const [description, setDescription] = useState("");

  const [fields, setFields] = useState([]);

  return (
    <Box className={classes.root}>
      <FormFieldBox active header>
        <TextField
          value={title}
          className={classes.titleTextField}
          InputProps={{
            classes: {
              input: classes.titleInput,
            },
          }}
          placeholder="Tytuł formularza"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          placeholder="Opis formularza"
          className={classes.descriptionTextField}
        />
      </FormFieldBox>
    </Box>
  );
};

export default FormView;
