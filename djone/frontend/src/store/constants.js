// Action types
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// add forms data to store
export const CHANGECURRENTIDENTIFIER = 'CHANGECURRENTIDENTIFIER';
export const ADDGENERALINFO = 'ADDGENERALINFO';
export const ADDMESSPARAMETERS = 'ADDMESSPARAMETERS';
export const ADDLEERLAUFGROSSEN = 'ADDLEERLAUFGROSSEN';
export const ADDREFERENZSONDE = 'ADDREFERENZSONDE';
export const ADDFREQUENZAUSGLEICH = 'ADDFREQUENZAUSGLEICH';
export const ADDCALCULATEDVALUES = 'CALCULATEDVALUES' ;
export const REPORT_DATA = 'REPORT_DATA';
export const ADDERDUNGSMESSUNG = 'ADDERDUNGSMESSUNG';
export const UPDATEACTIVEANNOTATIONS = 'UPDATEACTIVEANNOTATIONS';

// add annotations
export const KARTE_UW = 'KARTEUW'; 
export const KARTE_UMGEBUNG = 'KARTEUMGEBUNG';

export const POTENTIALTRICHTER_DATA = 'POTENTIALTRICHTER_DATA';



// Base URLs to use for fetching
export const baseUrlLocal = 'http://localhost:8000/api/';
export const baseUrlServer = 'https://axpo.propulsion-learn.ch/api/';

export const header = new Headers({
'Content-Type': 'application/json',
});

export const headerWithToken = new Headers({
'Content-Type': 'application/json',
'Authorization': `Bearer ${localStorage.getItem('token')}`
});