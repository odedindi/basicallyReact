import React from 'react';
import { useSelector } from 'react-redux';

// ================== Material UI Library ================
import GridContainer from '../../../Grid/GridContainer';
import GridItem from '../../../Grid/GridItem';
import Card from '../../../Card/Card';
import CardHeader from '../../../Card/CardHeader';
import { TouchVoltageLayout } from './style';
// =======================================================



export const FilledForm = ({ annotation }) => {
 const { beruhrungsspannung_low_Z, bezeichnung, kategorie, text } = annotation.data
 const scaledTouchVoltageAllowed = useSelector(state => state.basisDatenReducer.scaled_touch_voltage_allowed);

  const color = (beruhrungsspannung_low_Z, scaledTouchVoltageAllowed) => {
    if (beruhrungsspannung_low_Z > scaledTouchVoltageAllowed) return 'danger' // red
    else if (beruhrungsspannung_low_Z > (0.95 * scaledTouchVoltageAllowed)) return 'rose' // darkpink
    else if (beruhrungsspannung_low_Z > (0.85 * scaledTouchVoltageAllowed)) return 'success' // orange
    else return 'warning' //green
  };
  const headersColor = color(beruhrungsspannung_low_Z, scaledTouchVoltageAllowed);

  return(
    <TouchVoltageLayout>
      <GridContainer className='grid-container' style={{ width: '100%' }}>
        <GridItem style={{ width: '100%' }}>
          <Card style={{ marginTop: '5px' }}>
            <CardHeader color={ headersColor } className='card-header'>
              <h4 style={{ textAlign: 'center', fontWeight: 'bolder'}}>{ kategorie } : { bezeichnung }</h4>
              <div style={{ display: 'flex', justifyContent:'space-around' }}>
                <h4>Touch Voltage Low Z: <strong>{ beruhrungsspannung_low_Z }</strong></h4>
                <h4>Scaled touch voltage allowed: <strong>{ scaledTouchVoltageAllowed }</strong></h4>
              </div>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
    </TouchVoltageLayout>
  );
};
