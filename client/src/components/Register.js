import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { Box, Form, FormField, Button, Heading } from "grommet";

class Register extends Component {
  state = {
    first: "",
    last: "",
    email: "",
    password: "",
    response: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.register({
      first: this.state.first,
      last: this.state.last,
      email: this.state.email,
      password: this.state.password
    });
  };

  render() {
    return (
      <Box
        animation={["fadeIn", "zoomOut"]}
        direction="row"
        justify="center"
        margin={{ top: "large" }}
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
            register user
          </Heading>
          <Form onSubmit={this.onSubmit}>
            <FormField
              type="text"
              name="first"
              label="first"
              onChange={this.onChange}
            />
            <FormField
              type="text"
              name="last"
              label="last"
              onChange={this.onChange}
            />
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
            <Button
              fill="horizontal"
              margin={{ top: "medium" }}
              type="submit"
              label="register"
              primary
            />
          </Form>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: state.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(Register);
