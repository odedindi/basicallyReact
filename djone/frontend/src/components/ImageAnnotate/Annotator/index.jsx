import React, { Component } from 'react';
import { connect } from 'react-redux';
import Annotation from 'react-image-annotation';

import Annotations from '../Annotations';

class Annotator extends Component {
 
  onMouseOver = id => e => {
    this.props.dispatch({ 
      type: this.props.data.action,
      payload: { 
        ...this.props.data, 
        activeAnnotations: [ ...this.props.data.activeAnnotations, id ]
      }
    });
  };
  
  onMouseOut = id => e => {
    const index =  this.props.data.activeAnnotations.indexOf(id)

    this.props.dispatch({
      type: this.props.data.action,
      payload: {
        ...this.props.data, 
        activeAnnotations: [
            ...this.props.data.activeAnnotations.slice(0, index),
            ...this.props.data.activeAnnotations.slice(index + 1)
        ]
      }
    });
  };

  activeAnnotationComparator = (a, b) => {
    return a.data.id === b;
  };

  renderContent = ({ annotation }) => {
    const { geometry } = annotation;
    
    return (

      <div
        key={ annotation.data.id }
        style={{
          height: '0.75rem',
          width: '3.5rem',
          borderRadius: '1rem',
          background: 'lightgray',
          color: 'white',
          paddingBottom: 10,
          position: 'absolute',
          fontWeight: 'bolder',
          textAlign: 'center',
          textOverflow: 'ellipsis',
          fontSize: 14,
          left: `${geometry.x + 2}%`,
          top: `${geometry.y + geometry.height - 3}%`,
          ...annotation.style
        }}
      >
        { annotation.data && annotation.data.text }
      </div>

    )
  };

  onChange = annotation => {
    this.props.dispatch({
      type: this.props.data.action, 
      payload: { ...this.props.data, annotation } 
    });
  };
      
  onSubmit = annotation => {
    const { geometry, data } = annotation;

    this.props.dispatch({
      type: this.props.data.action,
      payload: {
        ...this.props.data,
        annotation: {},
        annotations: this.props.data.annotations.concat({
            geometry, data: { ...data, id: Math.random() },
        })
      }
    });
  };

  render () {
    return (
      <>
        <Annotation src={ this.props.data.image } alt={ this.props.data.imageName }
          type={ this.props.data.type } value={ this.props.data.annotation }
          annotations={ this.props.data.annotations } renderContent={ this.renderContent }
          activeAnnotationComparator={ this.activeAnnotationComparator }
          activeAnnotations={ this.props.data.activeAnnotations }
          onChange={ this.onChange} onSubmit={ this.onSubmit }
        />
        <Annotations mapName={ this.props.data.imageName } annotations={ this.props.data.annotations } 
          onMouseOver={ this.onMouseOver } onMouseOut={ this.onMouseOut }/>
      </>
    )
  };
};

export default connect()(Annotator);
