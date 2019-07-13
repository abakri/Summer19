import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

const Home = props => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = () => {
      fetch("/api/posts")
        .then(res => res.json())
        .then(data => {
          setPosts(data);
        });
    };

    loadPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      {posts.map(post => {
        return (
          <Card
            onClick={() => props.history.push(`/posts/${post._id}`)}
            key={post._id}
            to={`/posts/${post._id}`}
            className="my-3"
          >
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Subtitle>{post.author}</Card.Subtitle>
            </Card.Body>
          </Card>
        );
      })}
    </Container>
  );
};

export default withRouter(Home);
