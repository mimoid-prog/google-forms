import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import FormProvider from "./contexts/FormContext";
import { theme } from "./theme";
import FormCompletionView from "./views/FormCompletionView";
import FormCreatorView from "./views/FormCreatorView";
import HomeView from "./views/HomeView";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <FormProvider>
        <>
          <CssBaseline />
          <Router>
            <Switch>
              <Route exact path="/">
                <HomeView />
              </Route>
              <Route path="/form/:id/creator">
                <FormCreatorView />
              </Route>
              <Route path="/form/:id/completion">
                <FormCompletionView />
              </Route>
            </Switch>
          </Router>
        </>
      </FormProvider>
    </ThemeProvider>
  );
};

export default App;
