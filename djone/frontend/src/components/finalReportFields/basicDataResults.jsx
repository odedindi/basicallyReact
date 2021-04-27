import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import './index.css';

// ===================== styles ==========================
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../components/CustomButtons/Button.js";
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

// ======================= stores and backend ========================
import { get } from 'idb-keyval';
import { basisDatenStore, getAllEntries, getAllUniqeIdentifiers, updateOrSet } from '../../store/broweserIndexActions';
import { Backdrop } from '@material-ui/core';
// =======================================================


const BasicDataResults = (props) => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const data = props.data;
    const history = useHistory();

    const currentIdentifier = useSelector(state => state.basisDatenReducer.currentIdentifier)
    
    const basicDataResultsInfo = props.data;
    const { register } = useForm({
        defaultValues: {
            Currentidentifier: basicDataResultsInfo.Currentidentifier,
            date: basicDataResultsInfo.date,
            site: basicDataResultsInfo.site,
            touch_voltage_allowed: basicDataResultsInfo.touch_voltage_allowed,
            scaling_factor: basicDataResultsInfo.scaling_factor,
            scaled_touch_voltage_allowed: basicDataResultsInfo.scaled_touch_voltage_allowed,
        }
    });
    


    return (
        <GridContainer className={classes.container}>
            <GridItem xs={12} sm={12} md={8}>
                <Card className={classes.cardContainer}>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Earth Measurement Results</h4>
                    </CardHeader>
                    <CardBody className={classes.cardFlex}>
                        <h5>Report Data</h5>
                        <form>
                            <GridContainer>
                                <div className="grid-item">
                                    <label htmlFor="reference-id">Reference-ID</label>
                                    <input className="custom-input" id="reference-id" readOnly value={data ? `${data.date}/${data.site}` : ''} />
                                </div>
                                <div className="grid-item">
                                    <label htmlFor="creaion-date">Date</label>
                                    <input className="custom-input" id="creaion-date" readOnly value={data.date} />
                                </div>
                                <div className="grid-item">
                                    <label htmlFor="site-name">Site</label>
                                    <input className="custom-input" id="site-name" readOnly value={data.site} />
                                </div>
                            </GridContainer>
                            <h5>Your Result</h5>
                            <GridContainer>
                                <div className="grid-item">
                                    <label htmlFor="touch-voltage-allowed">Touch voltage allowed</label>
                                    <input className="custom-input" id="touch-voltage-allowed" readOnly value={data.touch_voltage_allowed} />
                                </div>
                                <div className="grid-item">
                                    <label htmlFor="scaling-factor">Scaling factor</label>
                                    <input className="custom-input" id="scaling-factor" readOnly value={data.scaling_factor} />
                                </div>
                                <div className="grid-item">
                                    <label htmlFor="scaled-touch-voltage-allowed">Scaled touch voltage allowed</label>
                                    <input className="custom-input" id="scaled-touch-voltage-allowed" readOnly value={data.scaled_touch_voltage_allowed} />
                                </div>
                            </GridContainer>
                        </form>
                    </CardBody>
                    <CardFooter>
                    <Button color="primary" onClick={() => history.push(`/demo/download/pdf/${data.id}`)} >PDF</Button>
                    </CardFooter>
            </Card>
        </GridItem>
      </GridContainer>
    );
};

export default BasicDataResults;
      