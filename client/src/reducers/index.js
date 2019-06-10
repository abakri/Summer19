import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import routeReducer from "./routeReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  routes: routeReducer
});
