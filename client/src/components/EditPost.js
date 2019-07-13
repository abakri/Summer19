import React, { useState, useEffect } from "react";
import PostInput from "./PostInput";
import { Container, Button } from "react-bootstrap";

const EditPost = props => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setLoading] = useState(true); // if it is new, don't load, otherwise we need fetch edit

  useEffect(() => {
    const loadPost = () => {
      fetch(`/api/posts/${props.match.params.id}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setBody(data.body);
          setLoading(false);
        });
    };
    loadPost();
    // eslint-disable-next-line
  }, []);

  const savePost = () => {
    fetch(`/api/posts/update/${props.match.params.id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        body: body
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("post last saved at ", Date().toString());
      });
  };

  const deletePost = () => {
    fetch(`/api/posts/${props.match.params.id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        props.history.push("/posts");
      });
  };

  if (isLoading) return <></>;
  else
    return (
      <Container>
        <PostInput
          title={title}
          body={body}
          setBody={e => setBody(e.target.value)}
          setTitle={e => setTitle(e.target.value)}
        />
        <Button variant="primary" onClick={savePost}>
          save
        </Button>
        <Button variant="primary" onClick={deletePost}>
          delete
        </Button>
      </Container>
    );
};

export default EditPost;
