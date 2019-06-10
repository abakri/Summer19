import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { Redirect } from "react-router-dom";
import { Form, FormField, Button, Box, Heading } from "grommet";

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

  render() {
    const { isAuthenticated, redirectToReferrer, from } = this.props;
    if (isAuthenticated) {
      return <Redirect to={redirectToReferrer ? from : "/"} />;
    }
    return (
      <Box
        direction="row"
        justify="center"
        margin={{ top: "xlarge" }}
        animation={["fadeIn", "zoomOut"]}
      >
        <Box
          align="center"
          pad={{ top: "small", bottom: "large", horizontal: "large" }}
          round="xsmall"
          border={{ color: "brand", size: "medium" }}
        >
          <Heading
            level="3"
            margin={{ bottom: "medium", top: "small", horizontal: "small" }}
          >
            login
          </Heading>
          <Form onSubmit={this.onSubmit}>
            <FormField
              type="email"
              name="email"
              label="email"
              onChange={this.onChange}
            />
            <FormField
              type="password"
              name="password"
              label="password"
              onChange={this.onChange}
            />
            <Button type="submit" label="login" primary />
            {this.state.response ? <p>{this.state.response}</p> : ""}
          </Form>
        </Box>
      </Box>
    );
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
