import * as constants from "../constants";

const initialState = {
    currentIdentifier: undefined,
    scaled_touch_voltage_allowed: undefined,
    generalInfo: {},
    messparameters: {},
    leerlaufgrossen: {},
    referenzsonde: {},
    frequenzausgleich: {},
    calculatedValues: {},
};
  
const basisDatenReducer = (state = initialState, action) => {
    const payload = action.payload;
    // console.log('state before update: ', state)
    // console.log('from basisDatenReducer: ', action.type, payload)
    
    switch(action.type){
        case constants.CHANGECURRENTIDENTIFIER:
            return {
                ...state,
                currentIdentifier: payload.identifier,
                scaled_touch_voltage_allowed: payload.scaled_touch_voltage_allowed,
            };
        case constants.ADDGENERALINFO:
            return {
                ...state,
                currentIdentifier: payload.identifier,
                scaled_touch_voltage_allowed: payload.scaled_touch_voltage_allowed,
                generalInfo: payload.data
            };
        case constants.ADDMESSPARAMETERS:
            return {
                ...state,
                messparameters: payload
            };
        case constants.ADDLEERLAUFGROSSEN:
            return {
                ...state,
                leerlaufgrossen: payload
            };
        case constants.ADDREFERENZSONDE:
            return {
                ...state,
                referenzsonde: payload
            };
        case constants.ADDFREQUENZAUSGLEICH:
            return {
                ...state,
                frequenzausgleich: payload
            };
        case constants.ADDCALCULATEDVALUES:
            return {
                ...state,
                calculatedValues: payload
            };
        default:
            return state;
    }
};

export default basisDatenReducer; 

