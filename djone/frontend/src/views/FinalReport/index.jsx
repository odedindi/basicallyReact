import React from 'react';
import { useSelector } from 'react-redux';

// =========================== components ============================
import BasicDataResults from "../../components/finalReportFields/basicDataResults";
import FrequenzausgleichForm from '../../components/finalReportFields/frequenzausgleich';
import MessparameterForm from '../../components/finalReportFields/messparameters';
import LeerlaufgrossenForm from '../../components/finalReportFields/leerlaufgrossen';
import ReferenzsondeForm from '../../components/finalReportFields/referenzsonde';
// ===================================================================
  
const FinalReport = () => {

  const data = useSelector(state => state.ReportReducer.reportData);

  return (
      <>
        <BasicDataResults data={ data }/>
        <MessparameterForm data={ data }/>
        <LeerlaufgrossenForm data={ data }/>
        <ReferenzsondeForm data={ data }/>
        <FrequenzausgleichForm data={ data }/>
      </>
  );
};

export default FinalReport;
