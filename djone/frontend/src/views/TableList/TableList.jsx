import React, {useState, useRef, useEffect} from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

// ================ components, style and layout =====================
import './index.css';
import styles from './styles.js';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
// ===================================================================
// ======================== stores and backend =======================
import { reportAction } from '../../store/actions.js';
import { baseUrlServer } from "../../store/constants";
import { getData } from "../../store/fetches/asyncFetches";
// ===================================================================


const TableList = () => {

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();
  let initialRender = useRef(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (initialRender){
      getData(`${baseUrlServer}measurements/`)
      .then(data => setData(data));
      initialRender = false;
    }
  }, []);

  const actionHandler = (index, id) => {
    const action = reportAction(data.results[index], true);
    dispatch(action);
    history.push(`/demo/report/${id}`);
  }


  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>All Measurements</h4>
            <p className={classes.cardCategoryWhite}>
              Please find all your measurements below
            </p>
          </CardHeader>
          <CardBody>
            <table className="table">
              <tr className="trh"><th className="th">Reference ID</th><th className="th">Basic Data Report</th><th className="th">Touch Voltage Report</th><th className="th">Voltage Profile Report</th><th className="th">Actions</th></tr>
              {data.results ? data.results.map((item, index) => {
                return (
                  <tr className="tr" key={`tr${index}`}>
                    <td key={`td1${index}`} className="td">{`${item.date}/${item.site}`}</td>
                    {console.log(item.id)}
                    <td key={`td2${index}`} onClick={() => history.push('/demo/download/visualisations')} className="td link">Projecs Report</td>
                    <td key={`td3${index}`} onClick={() => history.push('/demo/download/touch-voltage')} className="td link">Touch Voltage</td>
                    <td key={`td4${index}`} onClick={() => history.push('/demo/download/voltage-profile')} className="td link">Voltage Profile</td>
                    <td key={`td5${index}`} onClick={() => actionHandler(index, item.id)} className="td link">All details</td>
                  </tr>
                )
              }) : 
              <tr className="tr">
              <td className="td">Loading...</td>
              <td className="td">Loading...</td>
              <td className="td">Loading...</td>
              <td className="td">Loading...</td>
              <td className="td">Loading...</td>
              </tr>
              }
            </table>
          </CardBody>
        </Card>
      </GridItem> 
      
    </GridContainer>
  );
};

export default TableList;
