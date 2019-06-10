import { REDIRECT_LOGIN, CLEAR_REDIRECT } from "./types";

export const redirectLogin = from => dispatch => {
  dispatch({
    type: REDIRECT_LOGIN,
    payload: from
  });
};

export const clearRedirect = () => dispatch => {
  dispatch({
    type: CLEAR_REDIRECT
  });
};
