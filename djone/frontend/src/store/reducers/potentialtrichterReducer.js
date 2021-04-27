import { POTENTIALTRICHTER_DATA } from "../constants";

const initialState = {
  data: '',
};

const potentialtrichterReducer = (state = initialState, action) => {
  if (action.type === POTENTIALTRICHTER_DATA) {
    return {
      ...state,
      data: action.payload.data,
    }
  }
  return state;
};

export default potentialtrichterReducer;
