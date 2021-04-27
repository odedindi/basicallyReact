import React, { Component } from 'react';
import { connect } from 'react-redux';
import Annotation from 'react-image-annotation';

import Annotations from '../Annotations';

class Annotator extends Component {
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
  }

  render () {
    return (
      <>
        <Annotation src={this.props.data.image} alt={this.props.data.imageName}
          disableAnnotation={true} disableOverlay={true} renderContent={ this.renderContent }
          annotations={this.props.data.annotations}
          activeAnnotationComparator={this.activeAnnotationComparator}
          activeAnnotations={this.props.data.activeAnnotations}
          type={this.props.data.type} value={this.props.data.annotation}
        />
        <Annotations annotations={this.props.data.annotations} />
      </>
    )
  };
};

export default connect()(Annotator);
