import React from 'react';
import { useForm } from 'react-hook-form';
// ===================== styles ==========================
import { makeStyles } from "@material-ui/core/styles";
import './index.css';

// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";

import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import { styles } from '../../views/NewProject/pageStyles';
// =======================================================



const ReferenzsondeForm = (props) => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const referenzsondeInfo = props.data;
    const { register } = useForm({
        defaultValues: {
            uhrzeit1: referenzsondeInfo.uhrzeit1,
            storm1: referenzsondeInfo.strom1,
            spannung1: referenzsondeInfo.spannung1,
            uhrzeit2: referenzsondeInfo.uhrzeit2,
            storm2: referenzsondeInfo.strom2,
            spannung2: referenzsondeInfo.spannung2,
            uhrzeit3: referenzsondeInfo.uhrzeit3,
            storm3: referenzsondeInfo.strom3,
            spannung3: referenzsondeInfo.spannung3,
            uhrzeit4: referenzsondeInfo.uhrzeit4,
            storm4: referenzsondeInfo.strom4,
            spannung4: referenzsondeInfo.spannung4,
            uhrzeit5: referenzsondeInfo.uhrzeit5,
            storm5: referenzsondeInfo.strom5,
            spannung5: referenzsondeInfo.spannung5,
            uhrzeit6: referenzsondeInfo.uhrzeit6,
            storm6: referenzsondeInfo.strom6,
            spannung6: referenzsondeInfo.spannung6,
        }
    });


    return (
         <GridContainer className={classes.container}>
        <GridItem xs={12} sm={12} md={8}>
        <form>
            <Card className={classes.cardContainer}>
                <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Reference Probe</h4>
                </CardHeader>
                <CardBody className={classes.cardFlex}>
                    <h5>First Probe 1</h5>
                <GridContainer>
                    <div className="grid-item">
                        <label htmlFor="uhrzeit1">Time Stamp</label>
                        <input readOnly className="custom-input" {...register('uhrzeit1')}/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="storm1">Current [A]</label>
                        <input readOnly className="custom-input" {...register('storm1')}/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="spannung1">Voltage [V]</label>
                        <input readOnly className="custom-input" {...register('spannung1')}/>
                    </div>
                </GridContainer>
                <h5>First Probe 2</h5>
                <GridContainer>
                    <div className="grid-item">
                        <label htmlFor="uhrzeit2">Time Stamp</label>
                        <input readOnly className="custom-input" {...register('uhrzeit2')}/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="storm2">Current [A]</label>
                        <input readOnly className="custom-input" {...register('storm2')}/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="spannung2">Voltage [V]</label>
                        <input readOnly className="custom-input" {...register('spannung2')}/>
                    </div>
                </GridContainer>
                <h5>First Probe 3</h5>
                <GridContainer>
                    <div className="grid-item">
                        <label htmlFor="uhrzeit3">Time Stamp</label>
                        <input readOnly className="custom-input" {...register('uhrzeit3')}/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="storm3">Current [A]</label>
                        <input readOnly className="custom-input" {...register('storm3')}/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="spannung3">Voltage [V]</label>
                        <input readOnly className="custom-input" {...register('spannung3')}/>
                    </div>
                </GridContainer>
                <h5>First Probe 4</h5>
                <GridContainer>
                    <div className="grid-item">
                        <label htmlFor="uhrzeit4">Time Stamp</label>
                        <input readOnly className="custom-input" {...register('uhrzeit4')}/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="storm4">Current [A]</label>
                        <input readOnly className="custom-input" {...register('storm4')}/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="spannung">Voltage [V]</label>
                        <input readOnly className="custom-input" {...register('spannung4')}/>
                    </div>
                </GridContainer>
                <h5>First Probe 5</h5>
                <GridContainer>
                    <div className="grid-item">
                        <label htmlFor="uhrzeit5">Time Stamp</label>
                        <input readOnly className="custom-input" {...register('uhrzeit5')}/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="storm5">Current [A]</label>
                        <input readOnly className="custom-input" {...register('storm5')}/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="spannung5">Voltage [V]</label>
                        <input readOnly className="custom-input" {...register('spannung5')}/>
                    </div>
                </GridContainer>
                <h5>First Probe 6</h5>
                <GridContainer>
                    <div className="grid-item">
                        <label htmlFor="uhrzeit6">Time Stamp</label>
                        <input readOnly className="custom-input" {...register('uhrzeit6')}/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="storm6">Current [A]</label>
                        <input readOnly className="custom-input" {...register('storm6')}/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="spannung6">Voltage [V]</label>
                        <input readOnly className="custom-input" {...register('spannung6')}/>
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

export default ReferenzsondeForm;


