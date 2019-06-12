import React, { useState, useEffect } from "react";
import { Previous } from "grommet-icons";
import { Link } from "react-router-dom";
import { Button, Box, Heading, Markdown, Text } from "grommet";
import Loading from "./Loading";

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
  }, [postId]); // depends on postId being loaded first!

  if (post)
    return (
      <Box
        animation="fadeIn"
        align="center"
        margin={{ horizontal: "xlarge", vertical: "small" }}
      >
        <Heading level="2">{post.title}</Heading>
        <Text>by {post.author}</Text>
        <Markdown>{post.body}</Markdown>
        <Link style={{ textDecoration: "none", color: "white" }} to="/">
          <Button icon={<Previous />} label="back" />
        </Link>
      </Box>
    );
  else return <Loading />;
};

export default Post;
