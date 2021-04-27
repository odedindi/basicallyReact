import { LOGIN } from "../constants";

const initialState = {
  token: '',
};

const axpoReducer = (state = initialState, action) => {
  if (action.type === LOGIN) {
    return {
      ...state,
      token: action.payload,
    }
  }
  return state;
};

export default axpoReducer;
