import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const NewPost = props => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const uploadPost = () => {
      fetch("/api/posts/submit", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          body
        })
      })
        .then(res => res.json())
        .then(data => {
          props.history.push(`/edit/${data._id}`);
        });
    };

    // if this is a new post and the body or title has changed,
    // then upload it and move to edit
    if (body !== "" || title !== "") uploadPost();
  }, [title, body, props.history]);

  return (
    <Container>
      <Form>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Untitled"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Form.Control
          as="textarea"
          rows="3"
          placeholder="enter markdown here!"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
      </Form>
      <Button variant="primary" onClick={() => props.history.push("/")}>
        Cancel
      </Button>
    </Container>
  );
};

export default withRouter(NewPost);
