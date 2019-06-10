import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import { loadUser } from "./actions/authActions";
import App from "./App";
import { Grommet } from "grommet";
import { grommet } from "grommet/themes";
// import theme from "./GrommetTheme";

class AppWrapper extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Grommet theme={grommet} full={true}>
            <App />
          </Grommet>
        </Router>
      </Provider>
    );
  }
}

export default AppWrapper;
