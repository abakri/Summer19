import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/authActions";
import { Redirect } from "react-router-dom";
import { Card, Form, Button, Container } from "react-bootstrap";

const Login = props => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.login(formValues);
  };

  const { isAuthenticated } = props;
  if (isAuthenticated) return <Redirect to={"/dashboard"} />;
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title> Login </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="loginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Log in
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

// set prop types
Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
