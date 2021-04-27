import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { get, keys } from 'idb-keyval';

import {voltageProfileStore, basisDatenStore, updateOrSet} from '../../store/broweserIndexActions.js';
import {getAllEntries} from '../../store/broweserIndexActions.js';
import {potentialtrichterAction} from '../../store/actions.js';

import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter.js";
import GridItem from "../../components/Grid/GridItem.js";
import CardBody from "../../components/Card/CardBody.js";
import CardIcon from "../../components/Card/CardIcon.js";
import Card from "../../components/Card/Card.js";

import styles from './style';
import Chart from './chart';
import Post from './post';
import './index.css';
import Excel from './excel';


export default function VoltageProfile() {
  const [currentIdentifier, setCurrentIdentifier] = useState('');
  const [retrieveState, setRetrieveState] = useState(false);
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [chosenDirection, setChosenDirection] = useState(0);
  const initialRender = useRef(true);
  const [direction, setDirection] = useState('');
  const [directionInput, setDirectionInput] = useState('');
  const items = Array.from({ length: 30 });
  const [directions, setDirections] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [ projects, setProjects ] = useState([]);
  let newData = [];
  const [data, setData] = useState([{
    "data": []
  }]);

  useEffect(()=> { 
    keys(basisDatenStore)
    .then((keys) => { keys.forEach((key) => {
        setProjects((prevProjects) => [ ...new Set([...prevProjects, key]) ])
    })});
  },[]);

  const projectSelectionHandler = (event) => {
    let chosenIdentifier = event.target.value;
    setCurrentIdentifier(chosenIdentifier);
  };


  const inputChangeX = (event, index) => {
    event.persist();
    if (!inputValues[directions[chosenDirection]].hasOwnProperty(index)){
      setInputValues(prevState => ({
        ...prevState,
        [directions[chosenDirection]]: {
          ...prevState[directions[chosenDirection]],
          [index]: {distance: event.target.value, voltage: '', comment: ''}
        }
      }));
    } else {
      setInputValues(prevState => ({
        ...prevState,
        [directions[chosenDirection]]: {
          ...prevState[directions[chosenDirection]],
          [index]: {
            ...prevState[directions[chosenDirection]][index],
            distance: event.target.value
          }
        }
      }));
    }
  }

  const inputChangeY = (event, index) => {
    event.persist();
    if (!inputValues[directions[chosenDirection]].hasOwnProperty(index)){
      setInputValues(prevState => ({
        ...prevState,
        [directions[chosenDirection]]: {
          ...prevState[directions[chosenDirection]],
          [index]: {distance: '', voltage: event.target.value, comment: ''}
        }
      }));
    } else {
      setInputValues(prevState => ({
        ...prevState,
        [directions[chosenDirection]]: {
          ...prevState[directions[chosenDirection]],
          [index]: {
            ...prevState[directions[chosenDirection]][index],
            voltage: event.target.value
          }
        }
      }));
    }
  }

  const inputChangeComment = (event, index) => {
    event.persist();
    if (!inputValues[directions[chosenDirection]].hasOwnProperty(index)){
      setInputValues(prevState => ({
        ...prevState,
        [directions[chosenDirection]]: {
          ...prevState[directions[chosenDirection]],
          [index]: {distance: '', voltage: '', comment: event.target.value}
        }
      }));
    } else {
      setInputValues(prevState => ({
        ...prevState,
        [directions[chosenDirection]]: {
          ...prevState[directions[chosenDirection]],
          [index]: {
            ...prevState[directions[chosenDirection]][index],
            comment: event.target.value
          }
        }
      }));
    }
  }

  const inputSubmit = (e) => {
    e.preventDefault();
    setData([{
      "id": "data",
      "data": []
    }]);
    const newArr = Object.values(inputValues[directions[chosenDirection]]);
    for (let i of newArr){
      if(i.distance && i.voltage){
        newData.push({"x": parseFloat(i.distance), "y": parseFloat(i.voltage)});
      }
    }
    if (data[0].data.length === 0){
      setData([{
        "id": directions[chosenDirection],
        "data": newData
      }]);
    } else {
      const directionIndex = data.indexOf(data.find(o => o.id === directions[chosenDirection]));
      if (directionIndex === -1){
        setData([...data, {
          "id": directions[chosenDirection],
          "data": newData
        }]);
      } else {
        let slicedData = data;
        slicedData = [...slicedData.slice(0, directionIndex), {
          "id": directions[chosenDirection],
          "data": newData
        }, ...slicedData.slice(directionIndex + 1)];
        setData(slicedData);
      }
    }
    const action = potentialtrichterAction(inputValues, true);
    dispatch(action);
    get(currentIdentifier, voltageProfileStore)
    .then(val => updateOrSet(voltageProfileStore, val, currentIdentifier, { voltageProfileStore: inputValues }));
  }

  const directionSubmit = (e) => {
    e.preventDefault();
    setDirection(directionInput);
    setDirectionInput('');
  }

  useEffect(() => {
    if (initialRender.current){
      initialRender.current = false;
    } else if (direction) {
      setInputValues({
        ...inputValues,
        [direction]: {}
      });
    }
    if (direction){
      setDirections(prevDirections => ([
        ...prevDirections,
        direction
      ]));
    }
  }, [direction]);

  const retrieveData = () => {
    getAllEntries(voltageProfileStore)
    .then(values =>{
      const chosenArr = values.find((i) => i[0] === currentIdentifier);
      const storeData = chosenArr[1].voltageProfileStore;
      const keys = Object.keys(storeData);
      setDirections(keys);
      setRetrieveState(true);
      setInputValues(storeData);
    });
  }

  useEffect(() => {
    if (retrieveState){      
      newData = [];
      let iter = 0;
      for (let index in inputValues){
        const newArr = Object.values(inputValues[index]);
        newData.push({"id": index, "data": []});
        for (let i of newArr){
          if(i.distance && i.voltage){
            newData[iter].data.push({"x": parseFloat(i.distance), "y": parseFloat(i.voltage)});
          }
        }
        iter++;
      }
      setData(newData);
      setRetrieveState(false);
    }
  }, [inputValues]);

  return (
    <>
    {!currentIdentifier ?
      <Card style={{ minWidth: '71.85vw' }}>
      <CardHeader color="primary" className='card-header' style={{ height: '4.5rem' }}>
        <h4 style={{ marginTop: '-.2rem', fontWeight: 'bolder' }}>This is ackwards</h4> 
        <p style={{ marginTop: '-1rem' }}>It seems as that the system is not sure which project you're working on right now please choose from latest known projects: </p>
      </CardHeader>
      <CardBody>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
              <select onChange={ (event) => projectSelectionHandler(event) } defaultValue='Projects' className="select">
                <option disabled value='Projects'>Projects</option>
              {
                projects.map((project, index) => <option key={ `option${index}` } value={ project }>{ project }</option>)
              }
              </select>
          </div>
      </CardBody>
    </Card>
    : 
    <div>
      <GridContainer className={classes.container}>
        <GridItem xs={12} sm={12} md={8}>
          <Card className={classes.cardContainer}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Chart</h4>
              <p className={classes.cardCategoryWhite}>Please find the chart of your calculations below</p>
            </CardHeader>
            <CardBody className={classes.cardFlex}>
              <Chart data={data} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
      {directions.map((direction, index) => {
        return (
          <GridItem xs={12} sm={6} md={3}  key={`directionGrid${index}`}>
            <Card key={`directionCard${index}`} style={ chosenDirection === index ? {backgroundColor: "#e3e3e3"} : {backgroundColor: "white"} } onClick={ () => setChosenDirection(index) }>
            <CardHeader key={`directionHeader${index}`} color="success" stats icon>
              <CardIcon key={`directionCardIcon${index}`} className="card-icon" id={`direction${index}`}>
                <Icon key={`directionIcon${index}`}>explore</Icon>
              </CardIcon>
              <p key={`direction: ${index}`} className={classes.cardCategoryBlack}>{direction}</p>
            </CardHeader>
            <CardFooter key={`directionFooter${index}`} stats>
              <div key={`directionDiv${index}`} className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
          </GridItem>
        )
      })}
      </GridContainer>
  
      <GridContainer className={classes.container}>
        <GridItem xs={12} sm={12} md={8}>
          <Card className={classes.cardContainer}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Potentialtrichter</h4>
              <p className={classes.cardCategoryWhite}>Choose a direction and enter your data</p>
            </CardHeader>

            <CardBody className={classes.cardFlex} style={{width: '100%'}}>
            <GridContainer>
                <form id="direction-form" onSubmit={directionSubmit} style={{width: '100%'}}>
                  <GridItem className={classes.gridItem} xs={12} sm={12} md={6} style={{width: '100%'}}>
                    <input style={{width: '100%'}} readOnly={directions.length > 8 ? true : false} className="custom-input"
                      form="direction-form" onChange={ event => setDirectionInput(event.target.value) }
                      value={ directionInput } type="text" placeholder={ directions.length > 8 ? "you used 9 directions" : "Enter direction here ..."}
                      id="direction" formControlProps={{ fullWidth: true }} inputProps={{ disabled: false }}
                    />
                  </GridItem>
                  <GridItem className={classes.gridItem} xs={12} sm={12} md={4}>
                    <CardFooter>
                      <Button form="direction-form" type="submit" color="primary">Submit</Button>
                    </CardFooter>
                  </GridItem>
                </form>
              </GridContainer>

              <form onSubmit={inputSubmit} id="values-form" ></form>
                <div className={classes.overflow} >
                  {items.map((i, index) => (
                      <GridContainer key={`distanceGridContainer${index}`}>
                      <GridItem key={`distanceGridItem${index}`} className={classes.gridItem} xs={12} sm={12} md={4}>
                        <input key={`distanceInput${index}`} className="custom-input" type="text" form="values-form" key={`inputX: ${index}`}
                          value={ inputValues[directions[chosenDirection]] ? inputValues[directions[chosenDirection]][index] ? inputValues[directions[chosenDirection]][index].distance : '' : '' }
                          onChange={ event => inputChangeX(event, index) } readOnly={directions.length > 0 ? false : true}
                          placeholder={`${directions[0] ? directions[chosenDirection].length <= 10 ? directions[chosenDirection] : `${directions[chosenDirection].slice(0, 10)}...` : ''} Distance ${index + 1}`}     
                          id={`distanz-${index + 1}`} formControlProps={{ fullWidth: true }} inputProps={{ disabled: false }}
                        />
                      </GridItem>
                      <GridItem key={`distanceGridItem2${index}`} className={classes.gridItem} xs={12} sm={12} md={4}>
                        <input className="custom-input" type="text" form="values-form" key={`inputY: ${index}`}
                          value={ inputValues[directions[chosenDirection]] ? inputValues[directions[chosenDirection]][index] ? inputValues[directions[chosenDirection]][index].voltage : '' : '' }
                          onChange={ event => inputChangeY(event, index) } readOnly={directions.length > 0 ? false : true}
                          placeholder={`${directions[0] ? directions[chosenDirection].length <= 10 ? directions[chosenDirection] : `${directions[chosenDirection].slice(0, 10)}...` : ''} Voltage ${index + 1}`}
                          id={`spannung-${index + 1}`} formControlProps={{ fullWidth: true}} inputProps={{ disabled: false }}
                        />
                      </GridItem>
                      <GridItem key={`distanceGridItem3${index}`} className={classes.gridItem} xs={12} sm={12} md={4}>
                        <input className="custom-input" type="text" form="values-form" key={`inputComment: ${index}`}
                          value={ inputValues[directions[chosenDirection]] ? inputValues[directions[chosenDirection]][index] ? inputValues[directions[chosenDirection]][index].comment : '' : '' }
                          onChange={ event => inputChangeY(event, index) }onChange={ event => inputChangeComment(event, index) }
                          readOnly={directions.length > 0 ? false : true}
                          placeholder={`${directions[0] ? directions[chosenDirection].length <= 10 ? directions[chosenDirection] : `${directions[chosenDirection].slice(0, 10)}...` : ''} Comment ${index + 1}`}
                          id={`bemerkung-${index + 1}`} formControlProps={{ fullWidth: true }} inputProps={{ disabled: false }}
                        />
                      </GridItem>
                    </GridContainer>
                  ))}
              </div>
              </CardBody>
              <CardFooter style={{display: 'flex', justifyContent: 'flex-start'}}>
                <Button type="submit" form="values-form" color="primary">
                  {`Submit ${directions[0] ? directions[chosenDirection] : ''}`}
                </Button>
                <Excel inputValues={inputValues} />
                <Button onClick={retrieveData} color="primary"> Retrieve latest data</Button>
                <Post inputValues={inputValues}
                  currentIdentifier={currentIdentifier}
                  setInputValues={setInputValues}
                  setDirections={setDirections}
                  setData={setData} />
              </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
    }</>
  );
}