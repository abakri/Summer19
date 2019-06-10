import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Previous } from "grommet-icons";
import { Link } from "react-router-dom";
import { Button, Box, Heading, Paragraph } from "grommet";

export const Post = props => {
  let post = props.posts.find(post => `${post.id}` === props.match.params.id);
  return (
    <Box align="center" margin={{ horizontal: "xlarge", vertical: "small" }}>
      <Heading level="1">{post.title}</Heading>
      <Paragraph>{post.body}</Paragraph>
      <Link style={{ textDecoration: "none", color: "white" }} to="/">
        <Button icon={<Previous />} label="back" />
      </Link>
    </Box>
  );
};

Post.propTypes = {
  posts: PropTypes.array
};

const mapStateToProps = state => ({
  posts: state.posts.posts
});

export default connect(mapStateToProps)(Post);
