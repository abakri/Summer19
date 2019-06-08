import React, { Component } from "react";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />

            {/* ROUTES */}
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
