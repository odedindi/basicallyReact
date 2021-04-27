import * as constants from '../constants';

const initialState = {
    kategoriesCounter: {},
    karteUW: {
        type: null,
        activeAnnotations: [],
        annotations: [],
        annotation: {},
        image: '',
        action: constants.KARTE_UW
    },
    karteUmgebung: {
        type: null,
        activeAnnotations: [],
        annotations: [],
        annotation: {},
        image: '',
        action: constants.KARTE_UMGEBUNG
    }
};
  
const annotationsReducer = (state = initialState, action) => {
    if (action.type === constants.KARTE_UMGEBUNG) {
        return {
            ...state,
            karteUmgebung: action.payload,
        };
    };
    if (action.type === constants.KARTE_UW) {
        return {
            ...state,
            karteUW: action.payload,
        };
    };
    if (action.type === constants.ADDERDUNGSMESSUNG) {
        const kategorie = action.payload;
        return {
            ...state,
            kategoriesCounter: kategorie
        };
    };
    if (action.type === constants.UPDATEACTIVEANNOTATIONS) {
        return {
            ...state,
            karteUW : action.payload.karteUW,
            karteUmgebung: action.payload.karteUmgebung
        };
    };
    return state;
};

export default annotationsReducer; 
