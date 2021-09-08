import { makeStyles, Box } from "@material-ui/core";
import { useState } from "react";
import { useParams } from "react-router";

import { Container } from "src/components";

import FormContainer from "./FormContainer";
import Response from "./Response";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f5e6ff",
    minHeight: "100vh",
  },
}));

const FormCompletionView = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const [isFormShown, setIsFormShown] = useState(true);

  const showResponse = () => {
    setIsFormShown(false);
  };

  const showForm = () => {
    setIsFormShown(true);
  };

  return (
    <Box className={classes.root}>
      <Container maxWidth="sm">
        {isFormShown ? (
          <FormContainer id={id} showResponse={showResponse} />
        ) : (
          <Response showForm={showForm} />
        )}
      </Container>
    </Box>
  );
};

export default FormCompletionView;
