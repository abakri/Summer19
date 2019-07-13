import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../actions/authActions";
import NavMenu from "./NavMenu";
import {
  Navbar,
  FormControl,
  Form,
  Nav,
  Button,
  Container
} from "react-bootstrap";

const AppNavbar = props => {
  const logout = () => {
    props.logout(props.history);
  };

  return (
    <Navbar
      fixed="top"
      bg="dark"
      variant="dark"
      className="sticky-nav"
      expand="sm"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          Indomie
        </Navbar.Brand>
        <Form inline>
          <FormControl
            type="text"
            placeholder="search indomie"
            className="mr-sm-2"
          />
          <Button variant="outline-light">Search</Button>
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {props.isAuthenticated ? (
              <NavMenu user={props.user} logout={logout} />
            ) : (
              <>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(AppNavbar)
);
