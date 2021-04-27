import { baseUrlServer, headerWithToken } from '../constants';
import { basisDatenStore, BeruehrungsspannungStore, voltageProfileStore } from '../broweserIndexActions';
import { clear } from 'idb-keyval';


export const getData = async (url) => {
    const response = await fetch(url, {
        method: 'GET', 
        headers: headerWithToken
    });
    return response.json();
};

export const getFile = async (url) => {
    const response = await fetch(url, {
        method: 'GET', 
        headers: headerWithToken
    });
    return response;
};


export const postData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST', 
        headers: headerWithToken,
        body: JSON.stringify(data)
    });
    return response;
};



export const prepareAndPostProjectsList = async (arrayOfMeasurements, state, setStateServer, setStateDevice) => {
    arrayOfMeasurements.map(oneMeasurementInput => {
        let dataToSend = {};
        for (let typeOfInformation in oneMeasurementInput[1]) { // go through the different information the measurement contains
            Object.assign(dataToSend, oneMeasurementInput[1][typeOfInformation]);
        };
        postData(`${baseUrlServer}measurements/`, dataToSend)
        .then(response => {
            if(response.ok) {
            let newDataFromServer = [...state]
            newDataFromServer.unshift(dataToSend)
            newDataFromServer.forEach(item => {
                setStateServer((prevItem) => [ ...prevItem, [item.date, item.site] ])
            })
            setStateDevice([])
            clear(basisDatenStore);
            } else console.error('Please try again: ',response.status);
        });
    });
};

export const prepareAndPostTouchVoltageMeasurements = async (arrayOfMeasurements) => {
    console.log('processing touch voltage measurements: ', arrayOfMeasurements);

    arrayOfMeasurements.map(oneMeasurementInput => {

        if (oneMeasurementInput[1].KARTEUMGEBUNG) {
            oneMeasurementInput[1].KARTEUMGEBUNG.annotations.forEach((annotation) => {
                let dataToSend = {}
                dataToSend.map_name = 'karteUmgebung'
                dataToSend.project_identifier = oneMeasurementInput[0];
                dataToSend.bezeichnung = annotation.data.bezeichnung;
                dataToSend.kategorie = annotation.data.kategorie;
                dataToSend.beruhrungsspannung_high_Z = annotation.data.beruhrungsspannung_high_Z;
                dataToSend.beruhrungsspannung_low_Z = annotation.data.beruhrungsspannung_low_Z;
                dataToSend.kommentar = annotation.data.kommentar;
                dataToSend.spannungsdiff_high_Z = annotation.data.spannungsdiff_high_Z;
                dataToSend.spannungsdiff_low_Z = annotation.data.spannungsdiff_low_Z;
                dataToSend.frontend_id = annotation.data.id;
                dataToSend.geometry_x = annotation.geometry.x;
                dataToSend.geometry_y = annotation.geometry.y;

                postData(`${baseUrlServer}touchvoltage/new`, dataToSend)
                .then(response => {  
                if (response.ok) {
                    console.log(response)
                // Success message! + action what want to do: remove data from local storage etc
                clear(BeruehrungsspannungStore)
                } else {
                    console.error('Please try again: ',response.status)
                // alert for the user please try again! check internet Error message
                }
                });
            });
        };

        if (oneMeasurementInput[1].KARTEUW) {
            oneMeasurementInput[1].KARTEUW.annotations.forEach((annotation) => {
                let dataToSend = {};
                dataToSend.map_name = 'karteUW'
                dataToSend.project_identifier = oneMeasurementInput[0];
                dataToSend.bezeichnung = annotation.data.bezeichnung;
                dataToSend.kategorie = annotation.data.kategorie;
                dataToSend.beruhrungsspannung_high_Z = annotation.data.beruhrungsspannung_high_Z;
                dataToSend.beruhrungsspannung_low_Z = annotation.data.beruhrungsspannung_low_Z;
                dataToSend.kommentar = annotation.data.kommentar;
                dataToSend.spannungsdiff_high_Z = annotation.data.spannungsdiff_high_Z;
                dataToSend.spannungsdiff_low_Z = annotation.data.spannungsdiff_low_Z;
                dataToSend.frontend_id = annotation.data.id;
                dataToSend.geometry_x = annotation.geometry.x;
                dataToSend.geometry_y = annotation.geometry.y;
                
                postData(`${baseUrlServer}touchvoltage/new`, dataToSend)
                .then(response => {  
                if (response.ok) {
                    console.log(response)
                // Success message! + action what want to do: remove data from local storage etc
                // clear(BeruehrungsspannungStore)
                } else {
                    console.error('Please try again: ',response.status)
                // alert for the user please try again! check internet Error message
                }
                });           
            });
        };
    });
};


export const prepareAndPostVoltageProfileMeasurements = async (arrayOfMeasurements) => {
    arrayOfMeasurements.forEach(measurement => {
        console.log(measurement)
        const inputValues = measurement[1];
    
        const directionValues = Object.values(inputValues);
        const directionKeys = Object.keys(inputValues);
        const values = [];
        let iter1 = 0;
        let iter2 = 0;
        let iter3 = 0;
        for (let i of directionValues) {
            values.push({direction: directionKeys[iter1]});
            for (let j in i){
                for (let q in i[j]){
                if (q === "comment"){
                    values[iter1][`bemerkung${iter2 !== 0 ? iter2 : ''}`] = i[j][q];
                    iter3++;
                } else if (q === "distance"){
                    values[iter1][`distanz${iter2 !== 0 ? iter2 : ''}`] = i[j][q];
                    iter3++;
                } else if (q === "voltage"){
                    values[iter1][`spannung${iter2 !== 0 ? iter2 : ''}`] = i[j][q];
                    iter3++;
                }
                if (iter3 === 3){
                    iter2++;
                    iter3 = 0;
                }
                }
            }
            iter2 = 0;
            iter1++;
        };
            
        for (let i of values){
            postData(`${baseUrlServer}touchvoltage/new`, i)
            .then(response => {  
                if (response.ok) {
                // Success message! + action what want to do: remove data from local storage etc
                clear(voltageProfileStore)
                } else {
                console.error('Please try again: ',response.status)
                // alert for the user please try again! check internet Error message
                }
            });
        };
    });
};

