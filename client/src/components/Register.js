import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../actions/authActions";
import { Redirect } from "react-router-dom";
import { Card, Form, Button, Container } from "react-bootstrap";

const Register = props => {
  const [formValues, setFormValues] = useState({
    first: "",
    last: "",
    email: "",
    password: ""
  });

  const handleInputChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.register(formValues);
  };

  const { isAuthenticated } = props;
  if (isAuthenticated) return <Redirect to={"/dashboard"} />;
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title> Register </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="registerFirst">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                name="first"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="registerLast">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                name="last"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="registerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="registerPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

// set prop types
Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  register: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register }
)(Register);

// class Register extends Component {
//   state = {
//     first: "",
//     last: "",
//     email: "",
//     password: "",
//     response: ""
//   };

//   static propTypes = {
//     isAuthenticated: PropTypes.bool,
//     error: PropTypes.object.isRequired,
//     register: PropTypes.func.isRequired
//   };

//   onChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   onSubmit = e => {
//     e.preventDefault();
//     this.props.register({
//       first: this.state.first,
//       last: this.state.last,
//       email: this.state.email,
//       password: this.state.password
//     });
//   };

//   render() {
//     return (
//       <Box
//         animation={["fadeIn", "zoomOut"]}
//         direction="row"
//         justify="center"
//         margin={{ top: "large" }}
//       >
//         <Box
//           align="center"
//           pad={{ top: "small", bottom: "large", horizontal: "large" }}
//           round="xsmall"
//           border={{ color: "brand", size: "medium" }}
//         >
//           <Heading
//             level="3"
//             margin={{ bottom: "medium", top: "small", horizontal: "small" }}
//           >
//             register user
//           </Heading>
//           <Form onSubmit={this.onSubmit}>
//             <FormField
//               type="text"
//               name="first"
//               label="first"
//               onChange={this.onChange}
//             />
//             <FormField
//               type="text"
//               name="last"
//               label="last"
//               onChange={this.onChange}
//             />
//             <FormField
//               type="email"
//               name="email"
//               label="email"
//               onChange={this.onChange}
//             />
//             <FormField
//               type="password"
//               name="password"
//               label="password"
//               onChange={this.onChange}
//             />
//             <Button
//               fill="horizontal"
//               margin={{ top: "medium" }}
//               type="submit"
//               label="register"
//               primary
//             />
//           </Form>
//         </Box>
//       </Box>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   isAuthorized: state.isAuthenticated,
//   error: state.error
// });

// export default connect(
//   mapStateToProps,
//   { register, clearErrors }
// )(Register);
