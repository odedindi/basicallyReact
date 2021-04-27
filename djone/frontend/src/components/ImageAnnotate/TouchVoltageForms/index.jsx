import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

// ================== Material UI Library ================
import GridContainer from '../../Grid/GridContainer';
import GridItem from '../../Grid/GridItem';
import Card from '../../Card/Card';
import CardHeader from '../../Card/CardHeader';
import CardBody from '../../Card/CardBody';
import { TouchVoltageLayout } from './style';
import CardFooter from '../../Card/CardFooter';
import Button from '../../CustomButtons/Button.js';
// =======================================================

// ================ stores and backend ===================
import { KARTE_UMGEBUNG } from '../../../store/constants';
import { addErdungsmessungAction } from '../../../store/actions';
import { get } from 'idb-keyval';
import { BeruehrungsspannungStore, updateOrSet } from '../../../store/broweserIndexActions';
// =======================================================


export const TouchVoltageForm = ({ annotation, mapName }) => {
  const currentMap = mapName === KARTE_UMGEBUNG ? useSelector(state => state.annotationsReducer.karteUmgebung) : useSelector(state => state.annotationsReducer.karteUW);
  const scaledTouchVoltageAllowed = localStorage.getItem('scaledTouchVoltageAllowed');

  const kategoriesCounter = useSelector(state => state.annotationsReducer.kategoriesCounter);
  const dispatch = useDispatch();
  const currentIdentifier = useSelector(state => state.basisDatenReducer.currentIdentifier);
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      bezeichnung: annotation.data.text,
    }
  });
  
  const form = watch(['bezeichnung', 'kategorie', 'beruhrungsspannung_high_Z', 'beruhrungsspannung_low_Z', 'spannungsdiff_high_Z', 'spannungsdiff_low_Z', 'kommentar',])

  const color = (beruhrungsspannung_low_Z, scaledTouchVoltageAllowed) => {
    if (beruhrungsspannung_low_Z > scaledTouchVoltageAllowed) return 'linear-gradient(60deg, #ef5350, #f55a4e)' // red
    else if (beruhrungsspannung_low_Z > (0.95 * scaledTouchVoltageAllowed)) return 'linear-gradient(60deg, #ab6d14, #ecb15a)' // orange
    else if (beruhrungsspannung_low_Z > (0.85 * scaledTouchVoltageAllowed)) return 'linear-gradient(60deg, #31472a, #75a466)' // green
    else return 'linear-gradient(60deg, #5d595e, #b2aeb3)' //gray
  };
  


  const onSubmit = data => {
    const kategorie = data.kategorie
    // preparing the updated annotation data to be dispatched to the redux and indexeddb stores 
    const indexOfAnnotation = currentMap.annotations.indexOf(currentMap.annotations.find(object=> object === annotation))

    const currentKategorieNumber = kategoriesCounter.hasOwnProperty(`${ kategorie }`) ? (kategoriesCounter[`${ kategorie }`] + 1) : 1;
    kategoriesCounter[kategorie] = currentKategorieNumber;

    // updating current map
    data.id = annotation.data.id;
    data.scaledTouchVoltageAllowed = scaledTouchVoltageAllowed;
    data.kategorie = `${ kategorie }${ currentKategorieNumber }`;
    data.text = `${ data.kategorie }`;
    currentMap.annotations[indexOfAnnotation].data = data;
    currentMap.annotations[indexOfAnnotation].filled = true;
    currentMap.activeAnnotations.push(annotation.data.id);
    currentMap.annotations[indexOfAnnotation].style = { background: color(data.beruhrungsspannung_low_Z, data.scaledTouchVoltageAllowed) }

    
    const action = addErdungsmessungAction(kategoriesCounter);    
    dispatch(action);
    
    const tempData = {};
    tempData[`${ currentMap.imageName }`] = { 
      annotations: currentMap.annotations, 
      activeAnnotations: currentMap.activeAnnotations 
    };

    get(currentIdentifier, BeruehrungsspannungStore)
    .then(val => updateOrSet(BeruehrungsspannungStore, val, currentIdentifier, tempData));
  }; 


  return (

    <TouchVoltageLayout>
        <Card>
            <form id='main-form' onSubmit={ handleSubmit(onSubmit) } >
          <CardHeader color='primary' className='card-header'>
            <h4><strong>Touch Voltage</strong></h4>
            <p>Please fill in the touch voltage details below</p>
          </CardHeader>
          <CardBody>
            <GridContainer className='grid-container'>
              <GridItem style={{ width: '100%' }}>
                <div className='input-container'>
                  <div className='left-inputs'>
                    <div className='input-group'>
                      <input className='custom-input' { ...register('bezeichnung') } placeholder='Description'/>
                    </div>
                    <div className='input-group'> 
                      <select className='select' { ...register('kategorie', { required: true }) } defaultValue='Category'>
                        <option disabled value='Category'>Category</option>
                        <option value='A'>A</option>
                        <option value='B'>B</option>
                        <option value='C'>C</option>
                        <option value='D'>D</option>
                        <option value='E'>E</option>
                        <option value='F'>F</option>
                        <option value='G'>G</option>
                        <option value='H'>H</option>
                        <option value='I'>I</option>
                        <option value='J'>J</option>
                        <option value='K'>K</option>
                        <option value='L'>L</option>
                        <option value='M'>M</option>
                        <option value='N'>N</option>
                        <option value='O'>O</option>
                        <option value='P'>P</option>
                        <option value='Q'>Q</option>
                        <option value='R'>R</option>
                        <option value='S'>S</option>
                        <option value='T'>T</option>
                        <option value='U'>U</option>
                        <option value='V'>V</option>
                        <option value='W'>W</option>
                        <option value='X'>X</option>
                        <option value='Y'>Y</option>
                        <option value='Z'>Z</option>
                      </select>
                    </div>
                    <div className='input-group'>              
                      <input className='custom-input' type='number' min='0' step='any' 
                      { ...register('beruhrungsspannung_high_Z') } placeholder='Touch voltage high Z (impedance)'/>
                    </div>
                    <div className='input-group'>
                      <input className='custom-input' type='number' min='0' step='any' 
                      { ...register('beruhrungsspannung_low_Z', { required: true }) } placeholder='Touch voltage low Z'/>
                    </div>
                    </div>
                    <div className='right-inputs'>
                      <div className='input-group'>
                        <input className='custom-input' type='number' min='0' step='any' 
                        { ...register('spannungsdiff_high_Z') } placeholder='Voltage difference high Z'/>
                      </div>
                      <div className='input-group'>
                        <input className='custom-input' type='number' min='0' step='any' 
                        { ...register('spannungsdiff_low_Z') } placeholder='Voltage difference low Z'/>
                      </div>
                      <div className='input-group'>
                        <input className='custom-input' type='file' name='image-upload' id='file-input' />
                      </div>
                      <div className='input-group'>
                        <textarea className='custom-input' { ...register('kommentar') } placeholder='Comment'/>
                      </div>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
            </CardBody>
          <CardFooter>
            <Button type='submit' color='primary'>Finish</ Button>
          </CardFooter>
        </form>
      </Card>
    </TouchVoltageLayout> 
  );
};


export const FilledForm = ({ annotation }) => {
 const { bezeichnung, beruhrungsspannung_low_Z, kategorie, scaledTouchVoltageAllowed } = annotation.data

  const color = (beruhrungsspannung_low_Z, scaledTouchVoltageAllowed) => {
    if (beruhrungsspannung_low_Z > scaledTouchVoltageAllowed) return 'danger' // red
    else if (beruhrungsspannung_low_Z > (0.95 * scaledTouchVoltageAllowed)) return 'rose' // darkpink
    else if (beruhrungsspannung_low_Z > (0.85 * scaledTouchVoltageAllowed)) return 'success' // orange
    else return 'warning' //green
  };


  const headersColor = color(beruhrungsspannung_low_Z, scaledTouchVoltageAllowed);
  return(
    <TouchVoltageLayout>
      <GridContainer className='grid-container' style={{ width: '100%' }}>
        <GridItem style={{ width: '100%' }}>
          <Card style={{ marginTop: '5px' }}>
            <CardHeader color={ headersColor } className='card-header'>
              <h4 style={{ textAlign: 'center', fontWeight: 'bolder'}}>{ kategorie } : { bezeichnung }</h4>
              <div style={{ display: 'flex', justifyContent:'space-around' }}>
                <h4>Touch Voltage Low Z: <strong>{ beruhrungsspannung_low_Z }</strong></h4>
                <h4>Scaled touch voltage allowed: <strong>{ scaledTouchVoltageAllowed }</strong></h4>
              </div>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
    </TouchVoltageLayout>
  );
};

