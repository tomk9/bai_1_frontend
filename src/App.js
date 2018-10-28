import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import LoginScreen from "./pages/LoginScreen";
import MainScreen from "./pages/MainScreen";
import MessageScreen from "./pages/MessageScreen";
import PermissionScreen from "./pages/PermissionScreen";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            exact
            component={({ history }) => <LoginScreen history={history} />}
          />
          <Route
            path="/message"
            exact
            component={({ history }) => <MessageScreen history={history} />}
          />
          <Route
            path="/permissions/:message_id"
            exact
            component={({ history }) => <PermissionScreen history={history} />}
          />
          <Route
            path="/"
            component={({ history }) => <MainScreen history={history} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
