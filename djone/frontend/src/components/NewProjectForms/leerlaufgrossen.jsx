import React from 'react';
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
import { addLeerLaufGrossenAction, nextStepAction } from '../../store/actions';
// =======================================================



const LeerlaufgrossenForm = () => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const dispatch = useDispatch();

    const currentIdentifier = useSelector(state => state.basisDatenReducer.currentIdentifier)
    let existingIdleParameters = JSON.parse(localStorage.getItem('idleParameters'));
    const { register, handleSubmit } = useForm({
      defaultValues: {
        phase1: existingIdleParameters ? existingIdleParameters.phase1 : '',
        phase1_3spannung: existingIdleParameters ? existingIdleParameters.phase1_3spannung : '',
        phase1_3strom: existingIdleParameters ? existingIdleParameters.phase1_3strom : '',
        phase2: existingIdleParameters ? existingIdleParameters.phase2 : '',
        phase3: existingIdleParameters ? existingIdleParameters.phase3 : '',
      }
    });
    const onSubmit = data => {
      localStorage.setItem('idleParameters', JSON.stringify(data));
      const action = addLeerLaufGrossenAction(data)
      dispatch(action)
      get(currentIdentifier, basisDatenStore)
      .then(val => updateOrSet(basisDatenStore, val, currentIdentifier, { leerlaufgrossen: data }))
      .then(dispatch(nextStepAction(4)));
    }; 

    return (
        <GridContainer className={ classes.container }>
        <GridItem xs= { 12 } sm=  {  12 } md={ 8 }>
        <form onSubmit={ handleSubmit(onSubmit) }>
            <Card className={ classes.cardContainer }>
            <CardHeader color='primary'>
              <h4 className={ classes.cardTitleWhite }><strong>Idle Parameters</strong> (without 58 Hz feed)</h4>
              <p className={ classes.cardCategoryWhite }>Please fill in the idle data</p>
            </CardHeader>
            <CardBody className={ classes.cardFlex }>
            
            <GridContainer>
                <GridItem className={ classes.gridItem } xs= { 12 } sm=  {  12 } md={ 5 }>
                  <input className='custom-input' { ...register('phase1') } placeholder='Phase U [A]'/>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem className={ classes.gridItem } xs= { 12 } sm=  {  12 } md={ 5 }>
                  <input className='custom-input' { ...register('phase2') } placeholder='Phase V [A]'/>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem className={ classes.gridItem } xs= { 12 } sm=  {  12 } md={ 5 }>
                  <input className='custom-input' { ...register('phase3') } placeholder='Phase W [A]'/>
                </GridItem>
            </GridContainer>
              <GridContainer>
                <GridItem className={ classes.gridItem } xs= { 12 } sm=  {  12 } md={ 5 }>
                  <input className='custom-input' { ...register('phase1_3strom') } placeholder='Phase UVW [A]'/>
                </GridItem>
                <GridItem className={ classes.gridItem } xs= { 12 } sm=  {  12 } md={ 5 }>
                  <input className='custom-input' { ...register('phase1_3spannung') } placeholder='Phase UVW [V]'/>
                </GridItem>
              </GridContainer>

            </CardBody>
            <CardFooter>
            <Button type='submit'color='primary' style={{ marginRight: 'auto', marginLeft: '1rem' }}>Next Step</Button>
            </CardFooter>
          </Card>
        </form>
        </GridItem>
      </GridContainer>         
    );
};
                    
export default LeerlaufgrossenForm;