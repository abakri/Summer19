import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
    response: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    redirectToReferrer: PropTypes.bool.isRequired,
    from: PropTypes.string,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.login({
      email: this.state.email,
      password: this.state.password
    });
  };

  loginForm = () => (
    <div>
      <form onSubmit={this.onSubmit}>
        <label>
          email
          <input type="email" name="email" onChange={this.onChange} />
        </label>
        <label>
          password
          <input type="password" name="password" onChange={this.onChange} />
        </label>
        <input type="submit" value="Submit" />
        {this.state.response ? <p>{this.state.response}</p> : ""}
      </form>
    </div>
  );

  render() {
    const { isAuthenticated, redirectToReferrer, from } = this.props;
    if (isAuthenticated) {
      return <Redirect to={redirectToReferrer ? from : "/"} />;
    }
    return this.loginForm();
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  from: state.routes.from,
  redirectToReferrer: state.routes.redirectToReferrer,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(Login);
