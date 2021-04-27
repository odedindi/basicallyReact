import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

// ====================== componets and style ========================
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle.js';
import './index.css';

import Icon from '@material-ui/core/Icon';
// core components
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Table from '../../components/Table/Table.js';

import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardIcon from '../../components/Card/CardIcon.js';
import CardBody from '../../components/Card/CardBody.js';
// ===================================================================

// ======================== stores and backend =======================
import { entries, keys } from 'idb-keyval';
import { basisDatenStore, BeruehrungsspannungStore, voltageProfileStore } from '../../store/broweserIndexActions';
import { UserProfileStatus } from '../../store/actions';
import { baseUrlServer } from '../../store/constants';
import { getData, prepareAndPostProjectsList, prepareAndPostTouchVoltageMeasurements, 
  prepareAndPostVoltageProfileMeasurements } from '../../store/fetches/asyncFetches.js';
// ===================================================================



export default function Dashboard() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  let initialRender = useRef(true);

  const [ projectsOnDevice, setProjectsOnDevice ] = useState([]);
  const [dataFromServer, setDataFromServer] = useState([]);
  
  const changeLocation = (path, bl) => {
    dispatch(UserProfileStatus(bl));
    history.push(path);
  };
  
  useEffect(()=> { 
    keys(basisDatenStore)
    .then((keys) => { keys.forEach((key) => {
      setProjectsOnDevice((prevProjects) => [...new Set([...prevProjects, key.split('/')])]);
    })});

    if (initialRender){
      getData(`${baseUrlServer}measurements/`)
      .then((data) => data.results ? data.results.forEach(result => { 
        setDataFromServer((prevData) => [...prevData, [result.date, result.site]])}) : []
      );
      initialRender = false;
    }
  },[]);

  const exportData = () => {
    console.log('exporting data from device to backend')
    
    entries(basisDatenStore)
    .then(val => prepareAndPostProjectsList(val, dataFromServer, setDataFromServer, setProjectsOnDevice))
    entries(BeruehrungsspannungStore)
    .then(val => prepareAndPostTouchVoltageMeasurements(val))
    entries(voltageProfileStore)
    .then(val => prepareAndPostVoltageProfileMeasurements(val))
  };

  const logoutHandler = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }
  
  return (
    <>
      <GridContainer>

        <GridItem xs={ 12 } sm={ 6 } md={ 3 }>
          <Card className='db-card' onClick={ () => changeLocation('/demo/user', true) }>
            <CardHeader color='rose' stats icon>
              <CardIcon color='rose'>
                <Icon>person_add</Icon>
              </CardIcon>
              <p className={ classes.cardCategory }>Create a new User Profile</p>
            </CardHeader>
          </Card>
        </GridItem>

        <GridItem xs={ 12 } sm={ 6 } md={ 3 }>
         <Card className='db-card' onClick={ exportData }>
            <CardHeader color='warning' stats icon>
              <CardIcon color='warning'>
                <Icon>folder</Icon>
              </CardIcon>
              <p className={ classes.cardCategory }>Export Reports</p>
            </CardHeader>
          </Card>
        </GridItem>
  
        <GridItem xs={ 12 } sm={ 6 } md={ 3 }>
          <Card className='db-card' onClick={ logoutHandler }>
            <CardHeader color='primary' stats icon>
              <CardIcon color='primary'>
                <Icon>logout</Icon>
              </CardIcon>
              <p className={ classes.cardCategory }>Logout</p>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={ 12 } sm={ 12 } md={ 6 }>
          <Card>
            <CardHeader color='success'>
              <h4 className={ classes.cardTitleWhite }>Projects saved before export</h4>
              <p className={ classes.cardCategoryWhite }>Below is a list of Projects saved and not exported yet</p>
            </CardHeader>
            <CardBody>
              <Table tableHeaderColor='success' tableHead={ ['Date', 'Site'] } tableData={ projectsOnDevice }/>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={ 12 } sm={ 12 } md={ 6 }>
          <Card>
            <CardHeader color='warning'>
              <h4 className={ classes.cardTitleWhite }>Exported Projects</h4>
              <p className={ classes.cardCategoryWhite }>Below is a list of recent measurements</p>
            </CardHeader>
            <CardBody>
              <Table tableHeaderColor='warning' tableHead={ ['Date', 'Site'] } tableData={ dataFromServer.slice(0, 4) }/>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
