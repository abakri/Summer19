import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const Post = props => {
  const postId = props.match.params.id;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = () => {
      fetch(`/api/posts/${postId}`)
        .then(res => res.json())
        .then(data => {
          setPost(data);
        });
    };

    fetchPost();
    // eslint-disable-next-line
  }, []);

  if (post)
    return (
      <Container>
        <h2>{post.title}</h2>
        <h4>{post.author}</h4>
        <p>{post.body}</p>
        <Button
          onClick={() => {
            props.history.push("/");
          }}
          variant="primary"
        >
          back
        </Button>
      </Container>
    );

  return <></>;
};

export default withRouter(Post);
