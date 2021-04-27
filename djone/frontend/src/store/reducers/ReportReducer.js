import { REPORT_DATA } from "../constants";

const initialState = {
  reportData: '',
};

const ReportReducer = (state = initialState, action) => {
  if (action.type === REPORT_DATA) {
    return {
      ...state,
      reportData: action.payload.data,
    }
  }
  return state;
};

export default ReportReducer;