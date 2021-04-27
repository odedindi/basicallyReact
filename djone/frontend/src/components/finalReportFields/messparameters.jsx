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
import { styles } from '../../views/NewProject/pageStyles';
// =======================================================


const MessparameterForm = (props) => {
    const data = props.data;
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const { register } = useForm({
      defaultValues: {
        primaestrom: data.primaestrom,
        messstrom: data.messstrom,
        schleifenspannung: data.schleifenspannung,
        temperature: data.temperature,
        wetter: data.wetter,
        Bodenfeuchte: data.Bodenfeuchte,
        leitung1: data.leitung1,
        storm_A_1: data.strom_A_1,
        leitung2: data.leitung2,
        storm_A_2: data.strom_A_2,
      }
    });

    return (
           <GridContainer className={classes.container}>
        <GridItem xs={12} sm={12} md={8}>
        <Card className={classes.cardContainer}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Measurement Parameters</h4>
          </CardHeader>
          <CardBody className={classes.cardFlex}>
          <GridContainer>
              <div className="grid-item">
                <label htmlFor="primaestrom">Primary Current [A]</label>
                <input readOnly className="custom-input" {...register('primaestrom')}/>
              </div>
              <div className="grid-item">
                <label htmlFor="Messtrom">Measureing Current [A]</label>
                <input readOnly className="custom-input" {...register('messstrom')}/>
              </div>
              <div className="grid-item">
                <label htmlFor="schleifenspannung">Loop Voltage [V]</label>
                <input readOnly className="custom-input" {...register('schleifenspannung')}/>
              </div>
            </GridContainer>
            <GridContainer>
              <div className="grid-item">
                <label htmlFor="temperature">Temperature</label>
                <input readOnly className="custom-input" {...register('temperature')}/>
              </div>
              <div className="grid-item">
                <label htmlFor="wetter">Weather</label>
                <input readOnly className="custom-input" {...register('wetter')}/>
              </div>
              <div className="grid-item">
                <label htmlFor="Bodenfeuchte">Soil Moisture</label>
                <input readOnly className="custom-input" {...register('Bodenfeuchte')}/>
              </div>
            </GridContainer>
            <GridContainer>
              <div className="grid-item">
                <label htmlFor="leitung1">Cable</label>
                <input readOnly className="custom-input" {...register('leitung1')}/>
              </div>
              <div className="grid-item">
                <label htmlFor="storm_A_1">Current [A]</label>
                <input readOnly className="custom-input" {...register('storm_A_1')}/>
              </div>
              <div className="grid-item">
                <label htmlFor="leitung2">Cable</label>
                <input readOnly className="custom-input" {...register('leitung2')}/>
              </div>
            </GridContainer>
            <GridContainer>
              <div className="grid-item">
                <label htmlFor="storm_A_2">Current [A]</label>
                <input readOnly className="custom-input" {...register('storm_A_2')}/>
              </div>
            </GridContainer>
          </CardBody>
        </Card>
        </GridItem>
      </GridContainer>
    );
};

export default MessparameterForm;


      