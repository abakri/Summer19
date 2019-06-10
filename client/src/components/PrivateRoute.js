import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, withRouter } from "react-router-dom";
import { redirectLogin } from "../actions/routeActions";

class PrivateRoute extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    redirectLogin: PropTypes.func.isRequired
  };

  componentDidMount() {
    // tell browser to go back here after login
    if (!this.props.isAuthenticated)
      this.props.redirectLogin(this.props.location.pathname);
  }

  render() {
    const { isAuthenticated, children } = this.props;
    if (isAuthenticated) return children;
    return <Redirect to="/login" />;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(
  connect(
    mapStateToProps,
    { redirectLogin }
  )(PrivateRoute)
);
