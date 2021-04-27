import * as constants from './constants';


export const changeLanguageAction = data => {
  data === 'de' ? data ='en' : data ='de';
  return {
    type: constants.CHANGE_LANGUAGE,
    payload: data,
  };
};


export const loginAction = (token, status) => {
  return {
      type: constants.LOGIN,
      payload: {
          token: token,
          status: status
      },
  };
};

export const addGeneralInfoAction = (data, identifier, scaled_touch_voltage_allowed) => {
  return {
    type: constants.ADDGENERALINFO,
    payload: {
      identifier: identifier,
      scaled_touch_voltage_allowed: scaled_touch_voltage_allowed,
      data: data
    }
  };
};

export const addMessParametersAction = (data) => {
  return {
    type: constants.ADDMESSPARAMETERS,
    payload: data 
  };
};

export const addLeerLaufGrossenAction = (data) => {
  return {
    type: constants.ADDLEERLAUFGROSSEN,
    payload: data
  };
};

export const addReferenzSondeAction = (data) => {
  return {
    type: constants.ADDREFERENZSONDE,
    payload: data 
  };
};

export const addFrequenzAusGleichAction = (data) => {
  return {
    type: constants.ADDGENERALINFO,
    payload: data
  };
};

export const addCalculatedValuesAction = (data) => {
  return {
    type: constants.ADDCALCULATEDVALUES,
    payload: data
  };
};

export const changeCurrentIdentifierAction = (identifier, scaled_touch_voltage_allowed) => {
  return {
    type: constants.CHANGECURRENTIDENTIFIER,
    payload:{ 
      identifier: identifier,
      scaled_touch_voltage_allowed: scaled_touch_voltage_allowed,
     }
  };
};

export const addErdungsmessungAction = (kategorie) => {
  return {
    type: constants.ADDERDUNGSMESSUNG,
    payload: kategorie,
  };
};

export const updateActiveAnnotationsAction = (data) => {
  console.log(data)
  return {
    type: constants.UPDATEACTIVEANNOTATIONS,
    payload: {
      karteUW: data.karteUW,
      karteUmgebung: data.karteUmgebung
    }
  };
};


export const potentialtrichterAction = (data, status) => {
  return {
    type: constants.POTENTIALTRICHTER_DATA,
    payload: {
      data: data,
      status: status
    }
  };
};

export const reportAction = (data, status) => {
  return {
    type: constants.REPORT_DATA,
    payload: {
      data: data,
      status: status
    }
  }
};

export const nextStepAction = (stepNumber) => {
  return {
    type: 'NEXT_STEP',
    payload: stepNumber,
  };
};

export const UserProfileStatus = (bool) => {
  return {
    type: 'CREATE_USER_PROFILE',
    payload: bool,
  }
}

export const setToken = (token) => {
  return {
    type: constants.LOGIN,
    payload: token,
  }
}