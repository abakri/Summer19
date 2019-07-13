import React from "react";
import { Container, Form } from "react-bootstrap";

const PostInput = props => {
  return (
    <Container>
      <Form>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Untitled"
          value={props.title}
          onChange={props.setTitle}
        />
        <Form.Control
          as="textarea"
          rows="7"
          placeholder="enter markdown here!"
          value={props.body}
          onChange={props.setBody}
        />
      </Form>
    </Container>
  );
};

// add proptypes here

export default PostInput;
