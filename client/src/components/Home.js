import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadPosts } from "../actions/postActions";
import { Box, Heading, InfiniteScroll } from "grommet";
import { Link } from "react-router-dom";

import Loading from "./Loading";

class Home extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    posts: PropTypes.array
  };

  componentDidMount() {
    this.props.loadPosts();
  }

  render() {
    return (
      <Box align="center" margin={{ horizontal: "xlarge", vertical: "small" }}>
        <Heading level="2">popular posts</Heading>
        {this.props.isLoading ? (
          <Box margin={{ top: "xlarge" }}>
            <Loading />
          </Box>
        ) : (
          <InfiniteScroll items={this.props.posts}>
            {item => (
              <Box
                fill={true}
                round="xsmall"
                pad="small"
                margin="small"
                background="brand"
                key={item.id}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/posts/${item.id}`}
                >
                  <Box>
                    <Heading level="4">{item.title}</Heading>
                  </Box>
                </Link>
              </Box>
            )}
          </InfiniteScroll>
        )}
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.posts.isLoading,
  posts: state.posts.posts
});

export default connect(
  mapStateToProps,
  { loadPosts }
)(Home);
