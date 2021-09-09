import { Box, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Route, Switch, useParams } from "react-router-dom";

import { Container, ErrorMessage, Spinner } from "src/components";
import FormCreatorProvider from "src/contexts/FormCreatorContext";
import useFormStore from "src/hooks/useFormStore";
import { FormCreatorStore } from "src/stores/FormCreatorStore";
import { ApiError } from "src/types/ApiError";
import { Form as FormType } from "src/types/Form";

import Answers from "./Answers";
import Form from "./Form";
import Navbar from "./Navbar";
import { TabValue } from "./types";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f1f3f4",
    minHeight: "100vh",
  },
}));

const FormEditView = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const { fetchForm } = useFormStore();

  const [tab, setTab] = useState<TabValue>("questions");

  const [form, setForm] = useState<FormType | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [formCreatorStore, setFormCreatorStore] =
    useState<FormCreatorStore | null>(null);

  useEffect(() => {
    fetchForm(id)
      .then((fetchedForm) => {
        setForm(fetchedForm);
        setFormCreatorStore(new FormCreatorStore(fetchedForm));
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const changeTab = (newTab: TabValue) => {
    setTab(newTab);
  };

  return (
    <Box className={classes.root}>
      {error ? (
        <ErrorMessage error={error} />
      ) : !formCreatorStore ? (
        <Spinner />
      ) : (
        <FormCreatorProvider store={formCreatorStore}>
          <Navbar value={tab} changeValue={changeTab} />
          <Container maxWidth="md">
            <Switch>
              <Route exact path={`/form/${id}/creator`}>
                <Form />
              </Route>
              <Route path={`/form/${id}/creator/answers`}>
                <Answers form={form} />
              </Route>
            </Switch>
          </Container>
        </FormCreatorProvider>
      )}
    </Box>
  );
};

export default FormEditView;
