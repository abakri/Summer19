import { REDIRECT_LOGIN } from "../actions/types";

const initialState = {
  redirectToReferrer: false,
  referrerEndpoint: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REDIRECT_LOGIN:
      return {
        ...state,
        redirectToReferrer: true,
        referrerEndpoint: action.payload.referrerEndpoint
      };
    default:
      return state;
  }
}
