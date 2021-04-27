export const footer = {
    Basisdaten: 'Basic Data',
    Berührungsspannung: 'Touch Voltage',
    Potentialtrichter: "Potential's drop",
    Energieleitungen: 'Power Cables',
    Kleinleitungen: 'Small Cables',
    Auswertung: 'Evaluation / Export',
  };
  
  export const startPage = {
    pageTitle: 'DJONE - Measurement Collection Demo',
    subTitle: 'Grounding Measurement UW Hasli ',
  
    neue: 'New',
    erdungsmessung: 'Grounding Measurement',
    mastmessung: 'Mast Measurement',
    erdungsmessungKlein: 'Grounding Measurement small',
  };
  
  export const basisDatenPage = {
    pageTitle: 'Basic Data',
    subTitle: 'Grounding Measurement UW Hasli',
  
    auftraggeber: 'Client',
    anlage: 'Plant / Equipment',
    benutzteLeitung: { title: 'Cable Used', input: 'Cable' },
    datum: 'Date',
  
    messparameter: {
      title: 'Measurement Parameters',
      primarstrom: 'Primary current',
      messstrom: 'Measuring current',
      schleifenspannung: 'Loop voltage',
      temp: 'Temperature',
      wetter: 'Weather',
      bodenfeuchte: 'Soil moisture',
      reduzierende: 'Reducing currents on swiched-off lines',
      leitung: 'Cables',
      strom: 'Current',
    },
  
    leerlaufgrossen: {
      title: 'Idle parameters (without 58 Hz feed)',
      sTitle: {strom: 'Current [A]', spannung: 'Voltage [V]'},
      phaseL1: 'Phase L1',
      phaseL2: 'Phase L2',
      phaseL3: 'Phase L3',
      phaseLGesamt: 'Phase L1-3 total',
    },
    
    referenzsonde: {
      title: 'Reference Probe',
      sTitle: {strom: 'Current [A]', spannung: 'Voltage [V]'},
      uhrZeit: 'Time',
    },
    
    frequenzausgleich: {
      title: 'Frequency Equalization (frequency-selective measurement with reference probe)',
      sTitle: {strom: 'Current [A]', spannung: 'Voltage [V]'},
    },
    
    erdschlussStrom: 'Earth Fault Current',
    fehlerklarungszeit: 'Error Resolving Time',
    erlaubteBeruhrungsspannung: 'Allowed Touch Voltage',
    messstrom: 'Measuring Current',
    skalierungsfaktor: 'Scaling Factor',
    skaliert: 'scaled',
    input: 'Designation',
  };
  
  export const BeruhrungsspannungPage = {
    pageTitle: 'Touch Voltage',
    subTitle: 'Grounding Measurement',
  
    mainButtons: 'Map',
  
    bezeichnung: { title: 'Description', input: 'Description' },
    kategorie: { title: 'Category', input: 'Category' },
    beruhrungsspannungUngedruckt: {
      title: 'Touch voltage',
      input: 'Touch voltage 1',
    },
    beruhrungsspannungGedruckt: {
      title: 'Touch voltage',
      input: 'Touch voltage 2',
    },
    spannungsdiffUngedruckt: {
      title: 'Touch voltage diff. to the UW',
      input: 'Voltage difference 1',
    },
    spannungsdiffGedruckt: {
      title: 'Voltage diff. to the UW',
      input: 'Voltage difference 2',
    },
    pressed: 'pressed',
    unpressed: 'not pressed',
    foto: 'Upload photo',
    fotoButton: 'photo',
    kommentar: { title: 'Comment', input: 'Comment' },
    fertig: 'Finish',
  };
  
  export const potentialTrichterPage = {
    pageTitle: "Potential's Drop",
    subTitle: 'Grounding Measurement UW Hasli',
  
    karte: 'Map',
    grafik: 'Graphic',
  
    startpunkFestlegen: 'Set Starting Point',
    distanz: 'Distance',
    hier: 'here',
    spannung: 'Voltage',
    bemerkung: 'Comment ',
  };
  
  export const DatenPage = {
    pageTitle: "Data",
    subTitle: 'Grounding Measurement UW Hasli'
  };
  