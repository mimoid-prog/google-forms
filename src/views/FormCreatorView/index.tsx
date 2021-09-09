import { Box, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useState, useMemo } from "react";
import { Route, Switch, useParams, useLocation } from "react-router-dom";

import { Container, Spinner } from "src/components";
import FormCreatorProvider from "src/contexts/FormCreatorContext";
import { FormCreatorStore } from "src/stores/FormCreatorStore";

import Answers from "./Answers";
import Form from "./Form";
import Navbar from "./Navbar";
import { TabValue } from "./types";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#f1f3f4",
    minHeight: "100vh",
  },
}));

type Params = {
  id: string;
};

const FormCreatorView = observer(() => {
  const classes = useStyles();
  const { id } = useParams<Params>();
  const { pathname } = useLocation();

  const [tab, setTab] = useState<TabValue>(
    pathname.includes("answers") ? "answers" : "questions",
  );

  const formCreatorStore = useMemo(() => new FormCreatorStore(id), []);

  const changeTab = (newTab: TabValue) => {
    setTab(newTab);
  };

  return (
    <Box className={classes.root}>
      <FormCreatorProvider store={formCreatorStore}>
        <Navbar value={tab} changeValue={changeTab} />
        <Container maxWidth="md">
          {formCreatorStore.isLoading ? (
            <Spinner />
          ) : (
            <Switch>
              <Route exact path={`/form/${id}/creator`}>
                <Form />
              </Route>
              <Route path={`/form/${id}/creator/answers`}>
                <Answers />
              </Route>
            </Switch>
          )}
        </Container>
      </FormCreatorProvider>
    </Box>
  );
});

export default FormCreatorView;
