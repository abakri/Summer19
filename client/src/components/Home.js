import React, { Component } from "react";
import { Box, Heading, InfiniteScroll, Text } from "grommet";
import { Link } from "react-router-dom";

import Loading from "./Loading";

class Home extends Component {
  state = {
    isLoading: true,
    posts: null
  };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = () => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => this.setState({ isLoading: false, posts: data }));
  };

  render() {
    return (
      <Box
        animation="fadeIn"
        align="center"
        margin={{ horizontal: "xlarge", vertical: "small" }}
      >
        <Heading level="2">popular posts</Heading>
        {this.state.isLoading ? (
          <Box margin={{ top: "xlarge" }}>
            <Loading />
          </Box>
        ) : (
          <Box animation={"fadeIn"} fill={true}>
            <InfiniteScroll items={this.state.posts}>
              {post => (
                <Box
                  round="xsmall"
                  pad="small"
                  margin={{ vertical: "small", horizontal: "none" }}
                  background="brand"
                  key={post._id}
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={`/posts/${post._id}`}
                  >
                    <Box>
                      <Heading level="4">{post.title}</Heading>
                      <Text>by {post.author}</Text>
                    </Box>
                  </Link>
                </Box>
              )}
            </InfiniteScroll>
          </Box>
        )}
      </Box>
    );
  }
}

export default Home;
