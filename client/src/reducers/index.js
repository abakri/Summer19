import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import routeReducer from "./routeReducer";
import postReducer from "./postReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  routes: routeReducer,
  posts: postReducer
});
