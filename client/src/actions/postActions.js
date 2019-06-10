import { POSTS_LOADED, POSTS_LOADING } from "./types";

export const loadPosts = () => dispatch => {
  dispatch({ type: POSTS_LOADING });
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => {
      dispatch({ type: POSTS_LOADED, payload: data });
    });
};
