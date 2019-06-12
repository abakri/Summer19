import React, { useState, useEffect } from "react";
import { Box, InfiniteScroll, Text, Button } from "grommet";
import Loading from "../components/Loading";

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

  if (isLoading) return <Loading />;
  else if (posts.length === 0) return <div>you have no posts</div>;
  else
    return (
      <Box animation="fadeIn">
        <InfiniteScroll items={posts}>
          {post => (
            <Button key={post._id}>
              <Box
                margin="small"
                onClick={() => {
                  props.history.push(`/edit/${post._id}`);
                }}
              >
                <h3>{post.title}</h3>
                <Text>{post.date}</Text>
              </Box>
            </Button>
          )}
        </InfiniteScroll>
      </Box>
    );
};

export default UserPosts;
