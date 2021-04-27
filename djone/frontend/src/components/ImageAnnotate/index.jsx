import React, { Component } from 'react';
import { connect } from 'react-redux';

// ============= components, style and layout ===============
import Button from "../CustomButtons/Button.js";
import  Annotator from './Annotator';
// ==========================================================
// ================== maps to annotate ======================
import UW_Arbon from '../../assets/metadata/png/UW_Arbon.png';
import UW_Arbon_Umgebung from '../../assets/metadata/png/UW_Arbon_Umgebung.png';
import UW_Niederurnen from '../../assets/metadata/png/UW_Niederurnen.png';
import UW_Niederurnen_Umgebung from '../../assets/metadata/png/UW_Niederurnen_Umgebung.png';
import UW_Schlattingen from '../../assets/metadata/png/UW_Schlattingen.png';
import UW_Schlattingen_Umgebung from '../../assets/metadata/png/UW_Schlattingen_Umgebung.png';
// ==========================================================
// ===================== constants ==========================
import { PointSelector } from 'react-image-annotation/lib/selectors'
import { KARTE_UMGEBUNG, KARTE_UW } from '../../store/constants';
// ==========================================================


class AnnotatorContainer extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch({
      type: KARTE_UMGEBUNG,
      payload: {
        ...this.props.karteUmgebung,
        type: PointSelector.TYPE,
        annotations: this.props.existingAnnotations ? this.props.existingAnnotations.KARTEUMGEBUNG ? this.props.existingAnnotations.KARTEUMGEBUNG.annotations ? this.props.existingAnnotations.KARTEUMGEBUNG.annotations : [] : [] : [],
        activeAnnotations: [],
        annotation: {},
        image: this.props.currentMap === 'Arbon' ? UW_Arbon_Umgebung : this.props.currentMap === 'Niederurnen' ? UW_Niederurnen_Umgebung : UW_Schlattingen_Umgebung,
        imageName: KARTE_UMGEBUNG,
      }
    });
    this.props.dispatch({
      type: KARTE_UW,
      payload: {
        ...this.props.karteUW,
        type: PointSelector.TYPE,
        annotations: this.props.existingAnnotations ? this.props.existingAnnotations.KARTEUW ? this.props.existingAnnotations.KARTEUW.annotations ? this.props.existingAnnotations.KARTEUW.annotations : [] : [] : [],
        activeAnnotations: [],
        annotation: {},
        image: this.props.currentMap === 'Arbon' ? UW_Arbon : this.props.currentMap === 'Niederurnen' ? UW_Niederurnen : UW_Schlattingen,
        imageName: KARTE_UW,
      }
    });
  };
  
  state = { toggleImage: true  };
  onChangeImage = (bool) => {
    this.setState({ toggleImage: bool });
  };
  
  render () {
  return (
    <>
      <div id='buttons'>
        <Button color='primary' onClick={ () => this.onChangeImage(false) }>Karte UW</Button>
        <Button color='primary' onClick={ () => this.onChangeImage(true) }>Karte Umgebung</Button>
      </div>
      {
        this.state.toggleImage ?  <Annotator key='1' data={ this.props.karteUmgebung }/> : <Annotator key='2' data={ this.props.karteUW }/>
      }
    </>
    )
  }
};

const mapStateToProps = ({ annotationsReducer }) => {
  return {
    karteUW: annotationsReducer.karteUW,
    karteUmgebung: annotationsReducer.karteUmgebung
  }
};

export default connect(mapStateToProps)(AnnotatorContainer);
