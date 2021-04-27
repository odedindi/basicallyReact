import React from 'react';
import CardHeader from '../../Card/CardHeader';
import { FilledForm, TouchVoltageForm } from '../TouchVoltageForms';

const Annotations = ({annotations, mapName, onMouseOver, onMouseOut}) => {

  const cardHeaderStyle = {
    container: { marginTop: '5rem' },
    h6:{
      textAlign: 'center', 
      fontWeight: 'bolder'
    },
    headerDiv: { 
      display: 'flex',
      justifyContent: 'space-around' 
    }
  };
  const commentStyle = {
    width: '100%',
    overflow: 'auto'
  };
  return (
    <div style={cardHeaderStyle.container}>
      <h6 style={cardHeaderStyle.h6}>
        <div style={cardHeaderStyle.headerDiv}>
          <CardHeader color='warning'>{ '< 85% scaled touch voltage allowed' }</CardHeader>
          <CardHeader color='success'>{ '> 85% scaled touch voltage allowed' }</CardHeader>
          <CardHeader color='rose'>{ '> 95% scaled touch voltage allowed' }</CardHeader>
          <CardHeader color='danger'>{ '> scaled touch voltage allowed' }</CardHeader>
        </div>
      </h6>
      <div style={commentStyle}>
        {
          annotations.map(annotation => (
            <div
              onMouseOver={ onMouseOver(annotation.data.id) }
              onMouseOut={ onMouseOut(annotation.data.id) }
              key={ annotation.data.id }
            >              
                { 
                  !annotation.filled && <TouchVoltageForm  annotation={ annotation } mapName={ mapName }/>
                }
                {
                  annotation.filled && <FilledForm key={ `filld${annotation.data.id}` }  annotation={ annotation } /> 
                }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Annotations;
