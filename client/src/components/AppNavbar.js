import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../actions/authActions";
import { Box, Button, Heading } from "grommet";
import { Logout } from "grommet-icons";

class AppNavbar extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired
  };

  logout = () => {
    this.props.logout(this.props.history);
  };

  render() {
    return (
      <Box
        tag="header"
        direction="row"
        align="center"
        justify="between"
        elevation="small"
        style={{ zIndex: "1" }}
        pad="small"
      >
        <Link to="/">
          <Button>
            <Heading level="3" margin="none">
              MeeCode
            </Heading>
          </Button>
        </Link>
        {this.props.isAuthenticated ? (
          <Button
            accents="accent-4"
            icon={<Logout />}
            label="logout"
            onClick={this.logout}
          />
        ) : (
          <div>
            <Link to="/register">
              <Button label="register" margin={{ horizontal: "small" }} />
            </Link>
            <Link to="/login">
              <Button label="sign in" margin={{ horizontal: "small" }} />
            </Link>
          </div>
        )}
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(AppNavbar)
);
