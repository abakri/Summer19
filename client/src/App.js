import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./App.css";
import { Route, Switch } from "react-router-dom";

// components
import AppNavbar from "./components/AppNavbar";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import Post from "./components/Post";
import EditPost from "./components/EditPost";
import NewPost from "./components/NewPost";
import UserPosts from "./components/UserPosts";

const AppUI = props => (
  <div>
    <AppNavbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/posts/:id" component={Post} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute>
        <Route exact path="/posts" component={UserPosts} />
        <Route exact path="/newpost" component={NewPost} />
        <Route exact path="/edit/:id" component={EditPost} />
        <Route exact path="/dashboard" component={Dashboard} />
      </PrivateRoute>
    </Switch>
    <Footer />
  </div>
);

class App extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired
  };

  render() {
    const { isLoading } = this.props;
    if (isLoading) return <Loading />;
    return <AppUI />;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});

export default connect(mapStateToProps)(App);
