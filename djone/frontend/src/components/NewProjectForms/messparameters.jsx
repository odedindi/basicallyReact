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
import { addMessParametersAction, nextStepAction } from '../../store/actions';
// =======================================================


const MessparameterForm = () => {
      const useStyles = makeStyles(styles);
      const classes = useStyles();
      const dispatch = useDispatch();

      const currentIdentifier = useSelector(state => state.basisDatenReducer.currentIdentifier)
      let existingMesuremetsParameters = JSON.parse(localStorage.getItem('mesuremetsParameters'));
      const { register, handleSubmit } = useForm({
            defaultValues: {
                  Bodenfeuchte: existingMesuremetsParameters ?  existingMesuremetsParameters.Bodenfeuchte : '',
                  leitung1: existingMesuremetsParameters ?  existingMesuremetsParameters.leitung1 : '',
                  leitung2: existingMesuremetsParameters ?  existingMesuremetsParameters.leitung2 : '',
                  messstrom: existingMesuremetsParameters ?  existingMesuremetsParameters.messstrom : '',
                  primaestrom: existingMesuremetsParameters ?  existingMesuremetsParameters.primaestrom : '',
                  schleifenspannung: existingMesuremetsParameters ?  existingMesuremetsParameters.schleifenspannung : '',
                  strom_A_1: existingMesuremetsParameters ?  existingMesuremetsParameters.strom_A_1 : '',
                  strom_A_2: existingMesuremetsParameters ?  existingMesuremetsParameters.strom_A_2 : '',
                  temperature: existingMesuremetsParameters ?  existingMesuremetsParameters.temperature : '',
                  wetter: existingMesuremetsParameters ?  existingMesuremetsParameters.wetter : '',
            }
      });
      const onSubmit = data => {
            localStorage.setItem('mesuremetsParameters', JSON.stringify(data));
            const action = addMessParametersAction(data)
            dispatch(action)
            get(currentIdentifier, basisDatenStore)
            .then(val => updateOrSet(basisDatenStore, val, currentIdentifier, { messparameters: data }))
            .then(dispatch(nextStepAction(3)));
      }; 

      return (
            <GridContainer className={ classes.container }>
            <GridItem xs={ 12 } sm={ 12 } md={ 8 }>
                  <form onSubmit={ handleSubmit(onSubmit) }>
                        <Card className={ classes.cardContainer }>
                              <CardHeader color='primary'>
                                    <h4 className={ classes.cardTitleWhite }><strong>Measurement Parameters</strong></h4>
                                    <p className={ classes.cardCategoryWhite }>Please fill in the measurement parameters</p>
                              </CardHeader>
                              <CardBody className={ classes.cardFlex }>
                                    <GridContainer>
                                          <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                                                <input className='custom-input' placeholder='Primary current [A]' { ...register('primaestrom') }/>
                                          </GridItem>
                                          <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                                                <input className='custom-input' placeholder='Measuring current [A]' { ...register('messstrom') }/>
                                          </GridItem>
                                          </GridContainer>
                                          <GridContainer>
                                          <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                                                <input className='custom-input' placeholder='Loop voltage [V]' { ...register('schleifenspannung') }/>
                                          </GridItem>
                                          <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                                                <input className='custom-input' placeholder='Temperature [C]' { ...register('temperature') }/>
                                          </GridItem>
                                          </GridContainer>
                                          <GridContainer>
                                          <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                                                <input className='custom-input' placeholder='Weather' { ...register('wetter') }/>
                                          </GridItem>
                                          <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                                                <input className='custom-input' placeholder='Soil moisture' { ...register('Bodenfeuchte') }/>
                                          
                                          </GridItem>
                                          </GridContainer>
                                          <GridContainer>
                                          <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                                                <input className='custom-input' placeholder='Cable' { ...register('leitung1') }/>
                                          </GridItem>
                                          <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                                                <input className='custom-input' placeholder='Current [A]' { ...register('strom_A_1') }/>
                                          </GridItem>
                                          </GridContainer>
                                          <GridContainer>
                                          <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                                                <input className='custom-input' placeholder='Cable' { ...register('leitung2') }/>
                                          </GridItem>
                                          <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                                                <input className='custom-input' placeholder='Current [A]' { ...register('strom_A_2') }/>
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

export default MessparameterForm;
      