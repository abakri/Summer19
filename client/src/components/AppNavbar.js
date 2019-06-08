import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout } from "../actions/authActions";

class AppNavbar extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {this.props.isAuthenticated ? (
            <li>
              <button onClick={this.props.logout}>Logout</button>
            </li>
          ) : (
            <div>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Sign In</Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { logout }
)(AppNavbar);
