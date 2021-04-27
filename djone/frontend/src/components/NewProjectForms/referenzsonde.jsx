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
import { addReferenzSondeAction, nextStepAction } from '../../store/actions';
// =======================================================


const ReferenzsondeForm = () => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const dispatch = useDispatch();
 
    const currentIdentifier = useSelector(state => state.basisDatenReducer.currentIdentifier)

    let existingReferenceProbe = JSON.parse(localStorage.getItem('referenceProbe'));
    const { register, handleSubmit } = useForm({
        defaultValues: {
            spannung1: existingReferenceProbe ? existingReferenceProbe.spannung1 : '',
            spannung2: existingReferenceProbe ? existingReferenceProbe.spannung2 : '',
            spannung3: existingReferenceProbe ? existingReferenceProbe.spannung3 : '',
            spannung4: existingReferenceProbe ? existingReferenceProbe.spannung4 : '',
            spannung5: existingReferenceProbe ? existingReferenceProbe.spannung5 : '',
            spannung6: existingReferenceProbe ? existingReferenceProbe.spannung6 : '',
            strom1: existingReferenceProbe ? existingReferenceProbe.strom1 : '',
            strom2: existingReferenceProbe ? existingReferenceProbe.strom2 : '',
            strom3: existingReferenceProbe ? existingReferenceProbe.strom3 : '',
            strom4: existingReferenceProbe ? existingReferenceProbe.strom4 : '',
            strom5: existingReferenceProbe ? existingReferenceProbe.strom5 : '',
            strom6: existingReferenceProbe ? existingReferenceProbe.strom6 : '',
            uhrzeit1: existingReferenceProbe ? existingReferenceProbe.uhrzeit1 : '',
            uhrzeit2: existingReferenceProbe ? existingReferenceProbe.uhrzeit2 : '',
            uhrzeit3: existingReferenceProbe ? existingReferenceProbe.uhrzeit3 : '',
            uhrzeit4: existingReferenceProbe ? existingReferenceProbe.uhrzeit4 : '',
            uhrzeit5: existingReferenceProbe ? existingReferenceProbe.uhrzeit5 : '',
            uhrzeit6: existingReferenceProbe ? existingReferenceProbe.uhrzeit6 : '', 
        }
    });
    const onSubmit = data => {
        localStorage.setItem('referenceProbe', JSON.stringify(data));
        const action = addReferenzSondeAction(data)
        dispatch(action)
        get(currentIdentifier, basisDatenStore)
        .then(val => updateOrSet(basisDatenStore, val, currentIdentifier, { referenzsonde: data }))
        .then(dispatch(nextStepAction(6)));
    }; 

    return (
        <GridContainer className={ classes.container }>
            <GridItem xs={ 12 } sm={ 12 } md={ 8 }>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card className={ classes.cardContainer }>
                        <CardHeader color='primary'>
                            <h4 className={ classes.cardTitleWhite }><strong>Reference Probe</strong></h4>
                            <p className={ classes.cardCategoryWhite }>Please fill in the data for the reference probe</p>
                        </CardHeader>
                        <CardBody className={ classes.cardFlex }>
                            <h5>First Probe 1</h5>
                        <GridContainer>
                            <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                <input className='custom-input' { ...register('uhrzeit1') } placeholder='Time stamp'/>
                            </GridItem>
                            <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                <input className='custom-input' { ...register('strom1') } placeholder='Current [A]'/>
                            </GridItem>
                            <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                <input className='custom-input' { ...register('spannung1') } placeholder='Voltage [V]'/>
                            </GridItem>
                        </GridContainer>
                        <h5>First Probe 2</h5>
                        <GridContainer>
                            <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                <input className='custom-input' { ...register('uhrzeit2') } placeholder='Time stamp'/>
                            </GridItem>
                            <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                <input className='custom-input' { ...register('strom2') } placeholder='Current [A]'/>
                            </GridItem>
                            <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                <input className='custom-input' { ...register('spannung2') } placeholder='Voltage [V]'/>
                            </GridItem>
                        </GridContainer>
                        <h5>First Probe 3</h5>
                        <GridContainer>
                            <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                <input className='custom-input' { ...register('uhrzeit3') } placeholder='Time stamp'/>
                            </GridItem>
                            <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                <input className='custom-input' { ...register('strom3') } placeholder='Current [A]'/>
                            </GridItem>
                            <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                <input className='custom-input' { ...register('spannung3') } placeholder='Voltage [V]'/>
                            </GridItem>
                        </GridContainer>
                        <h5>First Probe 4</h5>
                        <GridContainer>
                            <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                <input className='custom-input' { ...register('uhrzeit4') } placeholder='Time stamp'/>
                            </GridItem>
                            <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                <input className='custom-input' { ...register('strom4') } placeholder='Current [A]'/>
                            </GridItem>
                            <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                <input className='custom-input' { ...register('spannung4') } placeholder='Voltage [V]'/>
                            </GridItem>
                        </GridContainer>
                        <h5>First Probe 5</h5>
                        <GridContainer>
                            <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                <input className='custom-input' { ...register('uhrzeit5') } placeholder='Time stamp'/>
                            </GridItem>
                            <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                <input className='custom-input' { ...register('strom5') } placeholder='Current [A]'/>
                            </GridItem>
                            <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                <input className='custom-input' { ...register('spannung5') } placeholder='Voltage [V]'/>
                            </GridItem>
                        </GridContainer>
                        <h5>First Probe 6</h5>
                        <GridContainer>
                            <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                <input className='custom-input' { ...register('uhrzeit6') } placeholder='Time stamp'/>
                            </GridItem>
                            <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                <input className='custom-input' { ...register('strom6') } placeholder='Current [A]'/>
                            </GridItem>
                            <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                <input className='custom-input' { ...register('spannung6') } placeholder='Voltage [V]'/>
                            </GridItem>
                        </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button type='submit' color='primary' style={{marginRight: 'auto', marginLeft: '1rem'}}>Calculate Result</Button>
                        </CardFooter>
                    </Card>
                </form>
            </GridItem>
        </GridContainer>
    );
};

export default ReferenzsondeForm;
