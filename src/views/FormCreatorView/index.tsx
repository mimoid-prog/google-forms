import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Route, Switch, useLocation, useParams } from "react-router-dom";

import { Container, Layout } from "src/components";
import FormCreatorProvider from "src/contexts/FormCreatorContext";
import { FormCreatorStore } from "src/stores/formCreatorStore";

import Form from "./Form";
import Navbar from "./Navbar";
import { TabValue } from "./types";

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: "#f1f3f4",
    minHeight: "100vh",
  },
  loadingBox: {
    display: "flex",
    justifyContent: "center",
  },
}));

const FormEditView = observer(() => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();

  const [tab, setTab] = useState<TabValue>("questions");

  const changeTab = (newTab: TabValue) => {
    setTab(newTab);
  };

  const [formCreatorStore] = useState(new FormCreatorStore(id));

  useEffect(() => {
    formCreatorStore.getFormValues(id);
  }, []);

  return (
    <FormCreatorProvider store={formCreatorStore}>
      <Navbar value={tab} changeValue={changeTab} />

      <Box className={classes.content}>
        <Container maxWidth="md">
          {formCreatorStore.isLoading ? (
            <Box className={classes.loadingBox}>
              <CircularProgress />
            </Box>
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
      </Box>
    </FormCreatorProvider>
  );
});

export default FormEditView;
