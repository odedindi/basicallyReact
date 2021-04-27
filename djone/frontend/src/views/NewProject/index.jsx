import React from 'react';

// ===================== components ==========================
import GeneralInfo from '../../components/NewProjectForms/generalInfo';
import MessparameterForm from '../../components/NewProjectForms/messparameters';
import LeerlaufgrossenForm from '../../components/NewProjectForms/leerlaufgrossen';
import ReferenzsondeForm from '../../components/NewProjectForms/referenzsonde';
import FrequenzausgleichForm from '../../components/NewProjectForms/frequenzausgleich';
import BasicDataResults from '../../components/NewProjectForms/basicDataResults.jsx';
// =======================================================
// ======================= stores ========================
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentIdentifierAction } from '../../store/actions';
// =======================================================


const BasisDaten = () => {
  const dispatch = useDispatch();
  const step = useSelector(state => state.formStepsReducer.currentStep);

  // measurement identifier
  let currentIdentifier = useSelector(state => state.basisDatenReducer.currentIdentifier);
  if (currentIdentifier === undefined) {
      currentIdentifier = localStorage.getItem('currentIdentifier');
      if (currentIdentifier){
      const action = changeCurrentIdentifierAction(currentIdentifier);
      dispatch(action);
    };
  };

  return (
    <>
    {step === 1 ? <GeneralInfo /> : null}
    {step === 2 ? (<><GeneralInfo /> <MessparameterForm /></>) : null} 
    {step === 3 ? (<><GeneralInfo /> <MessparameterForm /><LeerlaufgrossenForm /></>) : null} 
    {step === 4 ? (<><GeneralInfo /> <MessparameterForm /><LeerlaufgrossenForm /><FrequenzausgleichForm /></>) : null} 
    {step === 5 ? (<><GeneralInfo /> <MessparameterForm /><LeerlaufgrossenForm /><FrequenzausgleichForm /><ReferenzsondeForm /></>) : null} 
    {step === 6 ? (<><GeneralInfo /> <MessparameterForm /><LeerlaufgrossenForm /><FrequenzausgleichForm /><ReferenzsondeForm /><BasicDataResults /></>) : null} 
    </>
  );
}


export default BasisDaten;
