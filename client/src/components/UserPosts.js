import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";

const UserPosts = props => {
  const [isLoading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch("api/posts/user")
      .then(res => res.json())
      .then(posts => {
        setPosts(posts);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <></>;
  if (posts.length === 0) return <div>you have no posts</div>;
  return (
    <Container>
      {posts.map(post => {
        return (
          <Card
            onClick={() => props.history.push(`/edit/${post._id}`)}
            key={post._id}
            to={`/posts/${post._id}`}
            className="my-3"
          >
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Subtitle>{post.date}</Card.Subtitle>
            </Card.Body>
          </Card>
        );
      })}
    </Container>
  );
};

export default UserPosts;
