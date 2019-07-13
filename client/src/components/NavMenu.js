import React from "react";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

const NavMenu = props => {
  if (props.user.roles.admin)
    return (
      <NavDropdown title="Actions">
        <NavDropdown.Item as={Link} to="/newpost">
          New Post
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/posts">
          My Post
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={props.logout}>Logout</NavDropdown.Item>
      </NavDropdown>
    );

  return (
    <NavDropdown title="Actions">
      <NavDropdown.Item onClick={props.logout}>Logout</NavDropdown.Item>
    </NavDropdown>
  );
};

export default NavMenu;
