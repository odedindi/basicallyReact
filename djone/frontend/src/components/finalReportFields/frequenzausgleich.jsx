import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';


// ===================== styles ==========================
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";

import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import { styles } from '../../views/NewProject/pageStyles';
// =======================================================

// ====================== languages ======================
import { basisDatenPage } from '../../language/en';
import { basisDatenSeite } from '../../language/de';
// =======================================================

import './index.css';


const FrequenzausgleichForm = (props) => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    let language = useSelector(state => state.languageReducer.language)  === 'de' ? basisDatenSeite : basisDatenPage;
    const currentIdentifier = useSelector(state => state.basisDatenReducer.currentIdentifier)


    const frequenzausgleichInfo = props.data;
    const { register } = useForm({
        defaultValues: {
            Storm_A_45Hz: frequenzausgleichInfo.Strom_A_45Hz,
            Spannung_V_45Hz: frequenzausgleichInfo.Spannung_V_45Hz,
            Storm_A_58Hz: frequenzausgleichInfo.Strom_A_58Hz,
            Spannung_V_58Hz: frequenzausgleichInfo.Spannung_V_58Hz,
            Storm_A_65Hz: frequenzausgleichInfo.Strom_A_65Hz,
            Spannung_V_65Hz: frequenzausgleichInfo.Spannung_V_65Hz,

        }
    });


    return (
     <GridContainer className={classes.container}>
        <GridItem xs={12} sm={12} md={8}>
        <form>
            <Card className={classes.cardContainer}>
            <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}><strong>Frequency Equalization</strong> (frequency-selective measurement with reference probe)</h4>
            </CardHeader>
            <CardBody className={classes.cardFlex}>
                <h5>45 Hz.</h5>
            <GridContainer>
                <div className="grid-item">
                    <label htmlFor="storm_A_45Hz">Current [A] 1</label>
                    <input readOnly id="storm_A_45Hz" className="custom-input" {...register('Storm_A_45Hz')} />
                </div>
                <div className="grid-item">
                    <label htmlFor="Spannung_V_45Hz">Voltage [V] 1</label>
                    <input readOnly id="Spannung_V_45Hz" className="custom-input" {...register('Spannung_V_45Hz')} />
                </div>
            </GridContainer>
            <h5>58 Hz.</h5>
            <GridContainer>
                <div className="grid-item">
                    <label htmlFor="Storm_A_58Hz">Current [A] 1</label>
                    <input readOnly id="Storm_A_58Hz" className="custom-input" {...register('Storm_A_58Hz')} />
                </div>
                <div className="grid-item">
                    <label htmlFor="Spannung_V_58Hz">Voltage [V] 1</label>
                    <input readOnly id="Spannung_V_58Hz" className="custom-input" {...register('Spannung_V_58Hz')} />
                </div>
            </GridContainer>  
            <h5>65 Hz.</h5>
            <GridContainer>
                <div className="grid-item">
                    <label htmlFor="Storm_A_65Hz">Current [A] 1</label>
                    <input readOnly id="Storm_A_65Hz" className="custom-input" {...register('Storm_A_65Hz')} />
                </div>
                <div className="grid-item">
                    <label htmlFor="Spannung_V_65Hz">Voltage [V] 1</label>
                    <input readOnly id="Spannung_V_65Hz" className="custom-input" {...register('Spannung_V_65Hz')} />
                </div>
            </GridContainer>
            </CardBody>
            <CardFooter>
            </CardFooter>
            </Card>
        </form>
        </GridItem>
      </GridContainer>
    );
};

export default FrequenzausgleichForm;

