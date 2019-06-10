import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./App.css";
import { Route, Switch } from "react-router-dom";

// components
import AppNavbar from "./components/AppNavbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";

class App extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired
  };

  appUI = () => (
    <div>
      <AppNavbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute>
          <Route exact path="/dashboard" component={Dashboard} />
        </PrivateRoute>
      </Switch>
    </div>
  );

  render() {
    const { isLoading } = this.props;
    if (isLoading) return <Loading />;
    return this.appUI();
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});

export default connect(mapStateToProps)(App);
