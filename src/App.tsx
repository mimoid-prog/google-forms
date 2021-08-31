import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import HomeView from "./views/HomeView";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
import FormProvider from "./contexts/FormContext";
import CreateFormView from "./views/CreateFormView";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <FormProvider>
          <>
            <CssBaseline />
            <Router>
              <Switch>
                <Route exact path="/">
                  <HomeView />
                </Route>
                <Route path="/:id">
                  <CreateFormView />
                </Route>
                <Route path="/users">
                  <p>users</p>
                </Route>
              </Switch>
            </Router>
          </>
        </FormProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
