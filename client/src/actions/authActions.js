import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS
} from "./types";
import { returnErrors } from "./errorActions";

export const loadUser = () => dispatch => {
  dispatch({ type: USER_LOADING });
  fetch("/auth/user").then(res => {
    if (!res.ok) {
      dispatch(returnErrors("Sign in to view resource", res.status));
      dispatch({ type: AUTH_ERROR });
      Promise.resolve();
    } else {
      res.json().then(data => dispatch({ type: USER_LOADED, payload: data }));
    }
  });
};

export const register = ({ first, last, email, password }) => dispatch => {
  fetch("/api/users", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ first, last, email, password })
  }).then(res => {
    if (!res.ok) {
      res.json().then(data => {
        dispatch(returnErrors(data.msg, res.status, "REGISTER_FAIL"));
        dispatch({ type: REGISTER_FAIL });
      });
    } else
      res.json().then(data => {
        dispatch({ type: REGISTER_SUCCESS, payload: { user: data } });
      });
  });
};

export const login = ({ email, password }) => dispatch => {
  fetch("/auth/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  }).then(res => {
    if (!res.ok) {
      dispatch({ type: LOGIN_FAIL });
    } else
      res.json().then(data =>
        // CLEAR THE ROUTING STATE
        dispatch({ type: LOGIN_SUCCESS, payload: { user: data } })
      );
  });
};

export const logout = history => dispatch => {
  fetch("/auth/logout", {
    method: "post"
  }).then(res => {
    if (!res.ok) {
      res.json().then(data => {
        dispatch(returnErrors(data.msg, res.status));
        dispatch({ type: AUTH_ERROR });
      });
    } else {
      dispatch({ type: LOGOUT_SUCCESS });
      // on logout always go to home page
      history.push("/");
    }
  });
};
