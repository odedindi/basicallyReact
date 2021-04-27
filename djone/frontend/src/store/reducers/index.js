import { combineReducers } from "redux";
import axpoReducer from './axpoReducer';
import languageReducer from './languageReducer';
import basisDatenReducer from './basisDatenReducer';
import potentialtrichterReducer from './potentialtrichterReducer';
import annotationsReducer from './annotationsReducer';
import formStepsReducer from './formStepsReducer';
import ReportReducer from './ReportReducer';
import CreateUserProfileReducer from './createUserProfileReducer';


const rootReducer = combineReducers({
    axpoReducer,
    languageReducer,
    basisDatenReducer,
    potentialtrichterReducer,
    annotationsReducer,
    formStepsReducer,
    ReportReducer,
    CreateUserProfileReducer,
});

export default rootReducer;
