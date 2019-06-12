import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../actions/authActions";
import { Box, Button, Heading, Menu } from "grommet";
import { Logout, User, Document } from "grommet-icons";

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
        pad={{ vertical: "small", horizontal: "xlarge" }}
      >
        <Link to="/">
          <Button>
            <Heading level="3" margin="none">
              Indomie Goreng
            </Heading>
          </Button>
        </Link>
        {this.props.isAuthenticated ? (
          <Menu
            icon={<User />}
            dropAlign={{ right: "right", top: "bottom" }}
            size="large"
            items={[
              {
                icon: <Document />,
                label: "create post",
                onClick: () => {
                  this.props.history.push("/newpost");
                }
              },
              { icon: <Logout />, label: "logout", onClick: this.logout }
            ]}
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
