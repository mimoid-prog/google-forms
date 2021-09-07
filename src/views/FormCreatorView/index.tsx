import { Box, makeStyles } from "@material-ui/core";
import { useState } from "react";
import {
  Route,
  useRouteMatch,
  Switch,
  useLocation,
  useParams,
} from "react-router-dom";

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
}));

const FormEditView = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();

  const [tab, setTab] = useState<TabValue>("questions");

  const changeTab = (newTab: TabValue) => {
    setTab(newTab);
  };

  const formCreatorStore = new FormCreatorStore(id);

  return (
    <Layout>
      <Navbar value={tab} changeValue={changeTab} />

      <Box className={classes.content}>
        <Container maxWidth="md">
          <Switch>
            <Route exact path={pathname}>
              <FormCreatorProvider store={formCreatorStore}>
                <Form />
              </FormCreatorProvider>
            </Route>
            <Route exact path={`${pathname}/answers`}>
              <p>Answers</p>
            </Route>
          </Switch>
        </Container>
      </Box>
    </Layout>
  );
};

export default FormEditView;
