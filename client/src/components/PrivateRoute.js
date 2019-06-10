import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { redirectLogin } from "../actions/routeActions";

class PrivateRoute extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool,
    redirectLogin: PropTypes.func.isRequired
  };

  render() {
    const { isLoading, isAuthenticated, children } = this.props;
    if (isLoading) return <h1>loading...</h1>;
    if (isAuthenticated) return children;
    return <Redirect to="/login" />;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});

export default connect(
  mapStateToProps,
  { redirectLogin }
)(PrivateRoute);
