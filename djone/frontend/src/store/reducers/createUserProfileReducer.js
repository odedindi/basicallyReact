import * as constants from "../constants";

const initialState = {
    creationMode: false,
};
  
const CreateUserProfileReducer = (state = initialState, action) => {
    const payload = action.payload;
    
    switch(action.type){
        case 'CREATE_USER_PROFILE':
            return {
                ...state,
                creationMode: payload,
            };
        default:
            return state;
    }
};

export default CreateUserProfileReducer; 
