import { CHANGE_LANGUAGE } from "../constants";

const initialState = {
    language: 'de',
  };
  
const languageReducer = (state = initialState, action) => {
    if (action.type === CHANGE_LANGUAGE) {
        return {
            ...state,
            language: action.payload,
        }
    }
    return state;
};

export default languageReducer; 
