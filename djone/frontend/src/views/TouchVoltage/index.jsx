import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ================ components, style and layout =====================
import AnnotatorContainer from "../../components/ImageAnnotate/";

import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import Card from "../../components/Card/Card.js";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
// ===================================================================
// ======================== stores and backend =======================
import { get, keys } from 'idb-keyval';
import { basisDatenStore, BeruehrungsspannungStore } from '../../store/broweserIndexActions';
import { changeCurrentIdentifierAction } from '../../store/actions';
// ===================================================================


const Beruehrungsspannung = () => {

  const dispatch = useDispatch()

  const currentIdentifier = useSelector(state => state.basisDatenReducer.currentIdentifier);
  let currentMap = currentIdentifier ? currentIdentifier.split('/')[1] : undefined;

  const [ projects, setProjects ] = useState([]);
  const [ existingAnnotations, setExistingAnnotations ] = useState(undefined);

  useEffect(()=> { 
    keys(basisDatenStore)
    .then((keys) => { keys.forEach((key) => {
        setProjects((prevProjects) => [ ...new Set([...prevProjects, key]) ]);
    })});
  },[]);

  const reloadProject = (identifier) => {
    let scaled_touch_voltage_allowed;
    get(identifier, basisDatenStore)
    .then(val => scaled_touch_voltage_allowed = val.calculatedValues.scaled_touch_voltage_allowed)
    .then(() => {
      const action = changeCurrentIdentifierAction(identifier, scaled_touch_voltage_allowed);
      dispatch(action);
    });
  };
  const projectSelectionHandler = (event) => {
    let chosenIdentifier = event.target.value;
    get(chosenIdentifier, BeruehrungsspannungStore)
    .then(val => setExistingAnnotations(val))
    .then(reloadProject(chosenIdentifier));
  };

  return (
    <>
      <GridContainer>
        <GridItem>
        {
          !currentMap &&
          <Card style={{ minWidth: '71.85vw' }}>
            <CardHeader color="primary" className='card-header' style={{ height: '4.5rem' }}>
                <h4 style={{ marginTop: '-.2rem', fontWeight: 'bolder' }}>This is ackwards</h4> 
                <p style={{ marginTop: '-1rem' }}>It seems as that the system is not sure which project you're working on right now please choose from latest known projects: </p>      
            </CardHeader>
            <CardBody>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <select className='select' onChange={ (event) => projectSelectionHandler(event) } defaultValue='Projects'>
                        <option disabled value='Projects'>Projects</option>
                    {
                        projects.map((project, index) => <option key={ index } value={ project }>{ project }</option>)
                    }
                    </select>
                </div>
            </CardBody>
          </Card>
        }

        { 
          currentMap &&
          <Card style={{ minWidth: '71.85vw' }}>
            <CardHeader color="primary" className='card-header' style={{ height: '4.5rem' }}>
              <h4 style={{ marginTop: '-.2rem', fontWeight: 'bolder' }}><strong>Touch Voltage Measurements</strong> Site: { currentMap }</h4>
              <p style={{ marginTop: '-1rem' }}>Please annotate the touch voltage measurements on the map below</p>
            </CardHeader>
            <CardBody>
              <div id='main-body'>
                <AnnotatorContainer existingAnnotations={ existingAnnotations } currentMap={ currentMap }/>
              </div>        
            </CardBody>
          </Card>
        }
        </GridItem>
      </GridContainer>
    </>
  );
};

export default Beruehrungsspannung;
