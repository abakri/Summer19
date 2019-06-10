import { POSTS_LOADING, POSTS_LOADED } from "../actions/types";

const initialState = {
  isLoading: true,
  posts: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POSTS_LOADING:
      return {
        isLoading: true,
        posts: null
      };
    case POSTS_LOADED:
      return {
        isLoading: false,
        posts: action.payload
      };
    default:
      return state;
  }
};
