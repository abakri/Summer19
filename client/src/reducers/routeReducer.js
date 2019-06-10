import { REDIRECT_LOGIN, CLEAR_REDIRECT } from "../actions/types";

const initialState = {
  redirectToReferrer: false,
  from: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REDIRECT_LOGIN:
      return {
        ...state,
        redirectToReferrer: true,
        from: action.payload
      };
    case CLEAR_REDIRECT:
      return {
        ...state,
        redirectToReferrer: false,
        from: null
      };
    default:
      return state;
  }
}
