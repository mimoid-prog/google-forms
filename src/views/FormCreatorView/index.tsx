import { Box, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { Route, Switch, useLocation, useParams } from "react-router-dom";

import { Container, Spinner } from "src/components";
import FormCreatorProvider from "src/contexts/FormCreatorContext";
import { FormCreatorStore } from "src/stores/formCreatorStore";

import Form from "./Form";
import Navbar from "./Navbar";
import { TabValue } from "./types";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f1f3f4",
    minHeight: "100vh",
  },
}));

const FormEditView = observer(() => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();

  const formCreatorStore = useMemo(() => new FormCreatorStore(id), []);

  const [tab, setTab] = useState<TabValue>("questions");

  const changeTab = (newTab: TabValue) => {
    setTab(newTab);
  };

  useEffect(() => {
    formCreatorStore.getFormValues(id);
  }, []);

  return (
    <Box className={classes.root}>
      <FormCreatorProvider store={formCreatorStore}>
        <Navbar value={tab} changeValue={changeTab} />
        <Container maxWidth="md">
          {formCreatorStore.isLoading ? (
            <Spinner />
          ) : (
            <Switch>
              <Route exact path={pathname}>
                <Form />
              </Route>
              <Route exact path={`${pathname}/answers`}>
                <p>Answers</p>
              </Route>
            </Switch>
          )}
        </Container>
      </FormCreatorProvider>
    </Box>
  );
});

export default FormEditView;
