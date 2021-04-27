import React from 'react';
import { useForm } from 'react-hook-form';

// ===================== styles ==========================
import { makeStyles } from "@material-ui/core/styles";
import '../../views/VoltageProfile/index.css';

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


const LeerlaufgrossenForm = (props) => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const leerlaufgrossen = props.data;
    const { register } = useForm({
        defaultValues: {
            phase1: leerlaufgrossen.phase1,
            phase2: leerlaufgrossen.phase2,
            phase1_3strom: leerlaufgrossen.phase1_3storm,
            phase1_3spannung: leerlaufgrossen.phase1_3spannung,
        }
    });

    return (
        <GridContainer className={classes.container}>
        <GridItem xs={12} sm={12} md={8}>
        <form>
            <Card className={classes.cardContainer}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}><strong>Idle Parameters</strong> (without 58 Hz feed)</h4>
            </CardHeader>
            <CardBody className={classes.cardFlex}>
              
            <GridContainer>
                <div className="grid-item">
                  <label htmlFor="strom-a">Strom [A]</label>
                  <input readOnly className="custom-input" id="strom-a" {...register('phase1')} />
                </div>
                <div className="grid-item">
                  <label htmlFor="phase-2">Strom [A]</label>
                  <input readOnly className="custom-input" id="phase-2" {...register('phase2')} />
                </div>
                <div className="grid-item">
                  <label htmlFor="phase1_3strom">Strom [A]</label>
                  <input readOnly className="custom-input" id="phase1_3strom" {...register('phase1_3strom')} />
                </div>
              </GridContainer> 
              <GridContainer>
                <div className="grid-item">
                  <label htmlFor="phase1_3spannung">Spannung [V]</label>
                  <input readOnly className="custom-input" id="phase1_3spannung" {...register('phase1_3spannung')} />
                </div>
              </GridContainer>
            </CardBody>
          </Card>
        </form>
        </GridItem>
      </GridContainer>         
    );
};
                    
export default LeerlaufgrossenForm;