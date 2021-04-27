import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';


// ===================== styles ==========================
import { makeStyles } from "@material-ui/core/styles";
import './index.css';

// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";

import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import { styles } from '../../views/NewProject/pageStyles';
// =======================================================

// =================== data storing ======================
import { get } from 'idb-keyval';
import { basisDatenStore, updateOrSet } from '../../store/broweserIndexActions';
import { addFrequenzAusGleichAction, nextStepAction } from '../../store/actions';
// =======================================================


const FrequenzausgleichForm = () => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const currentIdentifier = useSelector(state => state.basisDatenReducer.currentIdentifier)
    const dispatch = useDispatch();
    let existingFrequencyEqualization = JSON.parse(localStorage.getItem('frequencyEqualization'));

    const { register, handleSubmit } = useForm({
        defaultValues: {
            Spannung_V_45Hz: existingFrequencyEqualization ? existingFrequencyEqualization.Spannung_V_45Hz :  '',
            Spannung_V_58Hz: existingFrequencyEqualization ? existingFrequencyEqualization.Spannung_V_58Hz :  '',
            Spannung_V_65Hz: existingFrequencyEqualization ? existingFrequencyEqualization.Spannung_V_65Hz :  '',
            Strom_A_45Hz: existingFrequencyEqualization ? existingFrequencyEqualization.Strom_A_45Hz :  '',
            Strom_A_58Hz: existingFrequencyEqualization ? existingFrequencyEqualization.Strom_A_58Hz :  '',
            Strom_A_65Hz: existingFrequencyEqualization ? existingFrequencyEqualization.Strom_A_65Hz :  '',
        }
    });
    const onSubmit = data => {
        localStorage.setItem('frequencyEqualization', JSON.stringify(data));

        const action = addFrequenzAusGleichAction(data)
        dispatch(action)
        get(currentIdentifier, basisDatenStore)
        .then(val => updateOrSet(basisDatenStore, val, currentIdentifier, { frequenzausgleich: data }))
        .then(dispatch(nextStepAction(5)));
    }; 

    return (
        <GridContainer className={ classes.container }>
            <GridItem xs={ 12 } sm={ 12 } md={ 8 }>
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <Card className={ classes.cardContainer }>
                        <CardHeader color="primary">
                            <h4 className={ classes.cardTitleWhite }><strong>Frequency Equalization</strong> (frequency-selective measurement with reference probe)</h4>
                            <p className={ classes.cardCategoryWhite }>Please fill in the data for the Frequenzausgleich</p>
                        </CardHeader>
                        <CardBody className={ classes.cardFlex }>
                            <h5>45 Hz</h5>
                            <GridContainer>
                                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                                    <input className="custom-input" { ...register('Strom_A_45Hz') } placeholder="Current [A] 1"/>
                                </GridItem>
                                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                                <input className="custom-input" { ...register('Spannung_V_45Hz') } placeholder="Voltage [V] 1"/>
                                </GridItem>
                            </GridContainer>
                            <h5>58 Hz</h5>
                            <GridContainer>
                                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                                    <input className="custom-input" { ...register('Strom_A_58Hz') } placeholder="Current [A] 1"/>
                                </GridItem>
                                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                                    <input className="custom-input" { ...register('Spannung_V_58Hz') } placeholder="Voltage [V] 1"/>
                                </GridItem>
                            </GridContainer>  
                            <h5>65 Hz</h5>
                            <GridContainer>
                                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                                    <input className="custom-input" { ...register('Strom_A_65Hz') } placeholder="Current [A] 1"/>
                                </GridItem>
                                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 5 }>
                                    <input className="custom-input" { ...register('Spannung_V_65Hz') } placeholder="Voltage [V] 1"/>
                                </GridItem>
                            </GridContainer>             
                        </CardBody>
                        <CardFooter>
                            <Button type='submit' color="primary" style={{ marginRight: 'auto', marginLeft: '1rem' }}>Next Step</Button>
                        </CardFooter>
                    </Card>
                </form>
            </GridItem>
        </GridContainer>
    );
};

export default FrequenzausgleichForm;

