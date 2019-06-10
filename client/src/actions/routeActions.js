import { REDIRECT_LOGIN } from "./types";

export const redirectLogin = referrerEndpoint => dispatch => {
  dispatch({
    type: REDIRECT_LOGIN,
    payload: referrerEndpoint
  });
};
