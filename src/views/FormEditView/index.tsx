import { Box, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import { Container, Layout } from "src/components";
import Navbar from "./Navbar";
import { TabValue } from "./types";
import FormView from "./views/FormView";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    backgroundColor: "#f1f3f4",
  },
}));

const FormEditView = () => {
  const classes = useStyles();
  const { path } = useRouteMatch();

  const [tab, setTab] = useState<TabValue>("questions");

  const changeTab = (newTab: TabValue) => {
    setTab(newTab);
  };

  return (
    <Layout>
      <Navbar value={tab} changeValue={changeTab} />

      <Box className={classes.content}>
        <Container maxWidth="md">
          <Switch>
            <Route exact path={path}>
              <FormView />
            </Route>
            <Route exact path={`${path}/answers`}>
              <p>Answers</p>
            </Route>
          </Switch>
        </Container>
      </Box>
    </Layout>
  );
};

export default FormEditView;
