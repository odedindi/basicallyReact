import React from 'react';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';


// ===================== styles ==========================
import { makeStyles } from "@material-ui/core/styles";

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



const BasicDataResults = () => {
    const history = useHistory();
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const generalInfoFromLocalStorage = localStorage.getItem('generalInfo');
    const calculationDataFromLocalStorage = localStorage.getItem('calculationData');
    //
    const generalInfoSplited = generalInfoFromLocalStorage ? generalInfoFromLocalStorage.split(',') : ['', '', '', '']
    const calculationDataSplited = calculationDataFromLocalStorage ? JSON.parse(calculationDataFromLocalStorage) : ['', '', '', '', '', '']    
    //
    const { register } = useForm({
        defaultValues: {
            date: ` ${generalInfoSplited[3]}`,
            customer: ` ${generalInfoSplited[0]}`,
            site: ` ${generalInfoSplited[1]}`,
            touchVoltageAllowed: ` ${calculationDataSplited.touch_voltage_allowed}`,
            scalingFactor: ` ${calculationDataSplited.scaling_factor}`,
            scaledTouchVoltageAllowed: ` ${calculationDataSplited.scaled_touch_voltage_allowed}`,
        }
    });


    const fetchAllDataAndPostToBackend = () => {
        localStorage.removeItem('generalInfo');
        localStorage.removeItem('calculationData');
        localStorage.removeItem('mesuremetsParameters');
        localStorage.removeItem('idleParameters');
        localStorage.removeItem('referenceProbe');
        localStorage.removeItem('frequencyEqualization');
        console.log('yipi ka yey');
        history.push('/demo/start');
    };
   
    return (
        <GridContainer className={ classes.container }>
            <GridItem xs={ 12 } sm={ 12 } md={ 8 }>               
                <Card className={ classes.cardContainer }>
                    <CardHeader color="primary">
                        <h4 className={ classes.cardTitleWhite }><strong>Project Profile</strong></h4>
                    </CardHeader>
                    <CardBody className={ classes.cardFlex }>
                        <h5>Report Data</h5>
                        <form>
                            <GridContainer>
                                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                    <h6>Date:</h6>
                                    <input className='custom-input' readOnly { ...register('date') }/>
                                </GridItem>
                                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 2 }>
                                    <h6>Customer:</h6>
                                    <input className='custom-input' readOnly { ...register('customer') }/>
                                </GridItem>
                                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 2 }>
                                    <h6>Site:</h6>
                                    <input className='custom-input' readOnly { ...register('site') }/>
                                </GridItem>
                            </GridContainer>
                            <h5>Calculated Values: </h5>
                            <GridContainer>
                                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                    <h6>Touch voltage allowed:</h6>
                                    <input className='custom-input' readOnly { ...register('touchVoltageAllowed') }/>
                                </GridItem>
                                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 3 }>
                                    <h6>Scaling factor:</h6>
                                    <input className='custom-input' readOnly { ...register('scalingFactor') }/>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem className={ classes.gridItem } xs={ 12 } sm={ 12 } md={ 4 }>
                                    <h6>Scaled touch voltage allowed:</h6>
                                    <input className='custom-input' readOnly { ...register('scaledTouchVoltageAllowed') }/>
                                </GridItem>
                            </GridContainer>
                        </form>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={ fetchAllDataAndPostToBackend } color="primary">Save</Button>
                        <Button color="primary">Export to PDF</Button>

                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>
    );
};

export default BasicDataResults;
      