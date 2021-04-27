import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

// ===================== styles ==========================
import { makeStyles } from '@material-ui/core/styles';
import './index.css';
// core components
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Button from '../../components/CustomButtons/Button.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';

import CardBody from '../../components/Card/CardBody.js';
import CardFooter from '../../components/Card/CardFooter.js';
import { styles } from '../../views/NewProject/pageStyles';
// =======================================================

// =================== data storing ======================
import { get } from 'idb-keyval';
import { basisDatenStore, updateOrSet } from '../../store/broweserIndexActions';
import { calculateTouchVoltageAllowed } from './calculations';
import { addCalculatedValuesAction, addGeneralInfoAction, nextStepAction } from '../../store/actions';
// =======================================================


  
const GeneralInfo = () => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  
  const dispatch = useDispatch();
  const currentIdentifier = useSelector(state => state.basisDatenReducer.currentIdentifier)
  let existingGeneralInfo = localStorage.getItem('generalInfo') ? localStorage.getItem('generalInfo').split(',') : '';
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      customer: existingGeneralInfo ? existingGeneralInfo[0] : '',
      site: existingGeneralInfo ? existingGeneralInfo[1] : '',
      used_power_line: existingGeneralInfo ? existingGeneralInfo[2] : '',
    }
  });
  const form = watch(['customer', 'site', 'used_power_line', 'date']);
  
  // calculations fields
  let existingCalculatedData = JSON.parse(localStorage.getItem('calculationData'));
  const [ faultCurrent, setFaultCurrent ] = useState(existingCalculatedData ? existingCalculatedData.fault_current : '');
  const [ measuringCurrent, setMeasuringCurrent ] = useState(existingCalculatedData ? existingCalculatedData.measuring_current : '');
  const [ clearingTime, setClearingTime ] = useState(existingCalculatedData ? existingCalculatedData.clearing_time : '')
  const [ touchVoltageAllowed, setTouchVoltageAllowed ] = useState('')
  const [ scalingFactor, setScalingFactor ] = useState('');
  const [ scaledTouchVoltageAllowed, setScaledTouchVoltageAllowed ] = useState('');


  useEffect(()=>{         
    if (clearingTime) setTouchVoltageAllowed(calculateTouchVoltageAllowed(clearingTime))
    if (faultCurrent && measuringCurrent) setScalingFactor(faultCurrent/measuringCurrent)
    if (touchVoltageAllowed && scalingFactor) setScaledTouchVoltageAllowed(() => {return Number((touchVoltageAllowed/scalingFactor).toFixed(3))})    
  },[faultCurrent, measuringCurrent, clearingTime, touchVoltageAllowed, scalingFactor]);
  
  const enterValuesHandler = (event) => {
    const title = event.target.title;
    const value = event.target.value;
    if (title === 'faultCurrent') setFaultCurrent(value);
    if (title === 'measuringCurrent') setMeasuringCurrent(value);
    if (title === 'clearingTime') setClearingTime(value);
  };
    
  const onSubmit = data => {
    // 'day-month-year/site'
    
    const uniqueIdentifier = `${data.date}/${data.site}`; 
    const calculationData = {
      fault_current: faultCurrent,
      clearing_time: clearingTime,
      measuring_current: measuringCurrent,
      touch_voltage_allowed: touchVoltageAllowed,
      scaling_factor: scalingFactor,
      scaled_touch_voltage_allowed: scaledTouchVoltageAllowed,
    }
    localStorage.setItem('scaledTouchVoltageAllowed', scaledTouchVoltageAllowed)
    localStorage.setItem('generalInfo', form);
    localStorage.setItem('calculationData', JSON.stringify(calculationData));

    const newData = {}
    newData[uniqueIdentifier] = {data}
    // getAllEntries(basisDatenStore);
    dispatch(addGeneralInfoAction(newData, uniqueIdentifier, scaledTouchVoltageAllowed));
    dispatch(addCalculatedValuesAction(calculationData))
    if(!currentIdentifier) localStorage.setItem('currentIdentifier', uniqueIdentifier);
    get(uniqueIdentifier, basisDatenStore)
    .then(val => updateOrSet(basisDatenStore, val, uniqueIdentifier, { generalInfo: data, calculatedValues: calculationData  }))
    .then( dispatch(nextStepAction(2)));
  };
    

  let setCurrentTime = new Date().toISOString().split('T')[0];
  return (
    <GridContainer className={ classes.container }>
      <GridItem xs={ 12 } sm={ 12 } md={ 8 }>
        <form onSubmit={handleSubmit(onSubmit)}> 
          <Card className={ classes.cardContainer }>
            <CardHeader color='primary'>
              <h4 className={ classes.cardTitleWhite }><strong>General Info</strong></h4>
            </CardHeader>
            <CardBody className={ classes.cardFlex }>
              <GridContainer>
                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                  <input className='custom-input' { ...register('customer') } placeholder='Customer'/>
                </GridItem>
                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                  <select className='custom-input' { ...register('site', { required: true }) } defaultValue='Site'>
                    <option disabled value='Site'>Site</option>  
                    <option value='Arbon'>Arbon</option>
                    <option value='Niederurnen'>Niederurnen</option>
                    <option value='Schlattingen'>Schlattingen</option>
                  </select>
                </GridItem> 
              </GridContainer>

              <GridContainer>
                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                  <input className='custom-input' { ...register('used_power_line') } placeholder='Cable used'/>
                </GridItem>
                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                  <input className='custom-input' { ...register('date') } placeholder='Date' value={setCurrentTime} />
                </GridItem>
              </GridContainer>
                    
              {/*  calculation part */}
              <GridContainer>
                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                  <input className='custom-input' type='number' title='faultCurrent' required min='0' step='any'
                      value={ faultCurrent } onChange={ enterValuesHandler } placeholder='Fault current' />
                </GridItem>
                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }> 
                  <input className='custom-input' type='number' title='clearingTime' required min='0' step='any'
                      value={ clearingTime } onChange={ enterValuesHandler } placeholder='Clearing time'/>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                  <input className='custom-input' readOnly title='touchVoltageAllowed' 
                      value={ touchVoltageAllowed } placeholder='Touch voltage allowed'/>
                </GridItem>
                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                  <input className='custom-input' type='number' title='measuringCurrent' required min='0' step='any'
                      value={ measuringCurrent } onChange={ enterValuesHandler } placeholder='Measuring current'/>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                  <input className='custom-input' readOnly placeholder='Scaling factor'
                      value={ scalingFactor ? scalingFactor : '' }/>
                </GridItem>
                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                  <input className='custom-input' readOnly placeholder='Scaled touch voltage allowed'
                      value={ scaledTouchVoltageAllowed ? scaledTouchVoltageAllowed : '' }/>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button type='submit' color='primary' style={{ marginRight: 'auto', marginLeft: '1rem' }}>Next Step</Button>
            </CardFooter>
          </Card>
        </form>
      </GridItem>
    </GridContainer>  
  );
};

export default GeneralInfo;
