import * as constants from "../constants";

const initialState = {
    currentStep: 1,
};
  
const formStepsReducer = (state = initialState, action) => {
    const payload = action.payload;
    
    switch(action.type){
        case 'NEXT_STEP':
            return {
                ...state,
                currentStep: payload,
            };
        default:
            return state;
    }
};

export default formStepsReducer; 
