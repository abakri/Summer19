import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";

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
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            first name
            <input type="text" name="first" onChange={this.onChange} />
          </label>
          <label>
            last name
            <input type="text" name="last" onChange={this.onChange} />
          </label>
          <label>
            email
            <input type="email" name="email" onChange={this.onChange} />
          </label>
          <label>
            password
            <input type="password" name="password" onChange={this.onChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.response ? <p>{this.state.response}</p> : ""}
      </div>
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
