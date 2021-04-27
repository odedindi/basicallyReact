import React, { useEffect, useState } from 'react';

// ================ components, style and layout =====================
import AnnotatorContainer from '../../components/Reports/ImageAnnotate';
import Button from "../../components/CustomButtons/Button.js";
import ChartData from './chart';

import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import Card from "../../components/Card/Card.js";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
// ===================================================================
// ======================== stores and backend =======================
import { get, keys } from 'idb-keyval';
import { BeruehrungsspannungStore, basisDatenStore } from '../../store/broweserIndexActions';
// ===================================================================


const ReportMeasurements = () => {

    // choose project by site and dates
    const [ projects, setProjects ] = useState([]);
    const [ chosenProject, setChosenProject ] = useState('');
    const [ showDates, setShowDates ] = useState(false);
    const [ projectsDates, setProjectsDates ] = useState([]);

    const [chosenIdentifier, setChosenIdentifier] = useState('');

    const [ annotationsToReport, setAnnotationsToReport ] = useState(undefined);

    const [ showTouchVoltage, setShowTouchVoltage ] = useState(false);
    const [ showVoltageProfile, setShowVoltageProfile ] = useState(false)

    useEffect(()=> { 
        keys(basisDatenStore)
        .then((keys) => { keys.forEach((key) => {
            setProjects((prevProjects) => [ ...new Set([...prevProjects, key.split('/')[1]]) ]);
        })});
      },[]);
    
    const projectSelectionHandler = (event) => {
        const chosenCustomerAndSite = event.target.value;   
        // clean the states
        setAnnotationsToReport(undefined)
        setShowDates(false);
        setProjectsDates([]);

        keys(basisDatenStore)
        .then((keys) => { keys.forEach((key) => {
            let splitedKey = key.split('/');
            if(splitedKey[1] === chosenCustomerAndSite) {
                setProjectsDates((prevProjects) => [ ...prevProjects, splitedKey[0] ]);
                setChosenProject(chosenCustomerAndSite);
                setShowDates(true)
            }
        })});
    };

    const DateSelectionHandler = (event) => {
        let identifier = `${event.target.value}/${chosenProject}`;
        setChosenIdentifier(identifier);
        get(identifier, BeruehrungsspannungStore)
        .then(val => setAnnotationsToReport(val))
    };

    const showVoltProfOrTouchVoltHandler = (str) => {
        if (str === 'profile') {
            setShowTouchVoltage(false)
            setShowVoltageProfile(true)
        }
        else if (str === 'touch') {
            setShowTouchVoltage(true)
            setShowVoltageProfile(false)
        }
    }
    return (
        <GridContainer>
            <GridItem>
                <Card style={{ minWidth: '71.85vw' }}>
                    <CardHeader color="primary" className='card-header' style={{ height: '1.5rem' }}>
                        <h4 style={{ marginTop: '-.2rem', fontWeight: 'bolder' }}>Please select project:</h4>          
                    </CardHeader>
                    <CardBody>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <select className='select' onChange={ (event) => projectSelectionHandler(event) } defaultValue='Projects'>
                                <option disabled value='Projects'>Projects</option>
                            {
                                projects.map((project, index) => <option key={ `Projects${index}` } value={ project }>{ project }</option>)
                            }
                            </select>

                            {
                            showDates &&
                            <select className='select' onChange={ (event) => DateSelectionHandler(event) } defaultValue='Dates'>
                                <option disabled value='Dates'>Dates</option>
                                {
                                    projectsDates.map((date, index) => <option key={ `Dates${index}` } value={ date }>{ date }</option>)
                                }
                            </select> 
                            }
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader color="primary" className='card-header' style={{ height: '1.5rem' }}>
                        <h4 style={{ marginTop: '-.2rem', fontWeight: 'bolder' }}>Select type of measurements</h4>          
                    </CardHeader>
                    <CardBody>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Button color='primary' onClick={ () => showVoltProfOrTouchVoltHandler('profile') }>Voltage Profile</Button>
                            <Button color='primary' onClick={ () => showVoltProfOrTouchVoltHandler('touch') }>Touch Voltage</Button>
                        </div>
                    </CardBody>
                </Card>
                {
                    showTouchVoltage &&
                    <Card>
                        <CardHeader color="primary" className='card-header' style={{ height: '1.5rem' }}>
                            <h4 style={{ marginTop: '-.2rem', fontWeight: 'bolder' }}>Touch Voltage Measurements</h4>
                        </CardHeader>
                        <CardBody>
                            <div id='main-body'>
                                {
                                    annotationsToReport && <AnnotatorContainer currentMap={ chosenProject } annotationsToReport={ annotationsToReport }/>
                                }
                            </div>        
                        </CardBody>
                    </Card>
                }
                {
                    showVoltageProfile &&
                    <Card>
                        <CardHeader color="primary" className='card-header' style={{ height: '1.5rem' }}>
                            <h4 style={{ marginTop: '-.2rem', fontWeight: 'bolder' }}>Voltage Profile Measurements</h4>
                        </CardHeader>
                        <CardBody style={{height: '500px'}} >
                            <ChartData chosenIdentifier={chosenIdentifier} />
                        </CardBody>
                    </Card>
                }

            </GridItem>
        </GridContainer>
    );
};

export default ReportMeasurements;
