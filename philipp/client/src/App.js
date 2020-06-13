import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
//import Landing from "./components/layout/Landing";
import Routes from "./components/routing/Routes";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Google from "./components/auth/Google";
import Facebook from "./components/auth/Facebook";
import Landing from "./pages/Landing";
import SignInUpDialog from "./components/layout/SignInUpDialog/SignInUpDialog";

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <SignInUpDialog />

      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/googlecheck" component={Google} />
            <Route exact path="/facebookcheck" component={Facebook} />
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
