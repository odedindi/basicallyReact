import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardAvatar from "../../components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

import avatar from "../../assets/img/faces/marc.jpg";
import { useSelector } from 'react-redux';
import CreateUserProfileReducer from '../../store/reducers/createUserProfileReducer';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};


export default function UserProfile() {
  const useStyles = makeStyles(styles);
  const creationMode = useSelector(state => state.CreateUserProfileReducer.creationMode);
  console.log(creationMode);
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{creationMode ? 'Create a new profile' : 'Edit Profile'}</h4>
              <p className={classes.cardCategoryWhite}>{creationMode ? 'Please fill in the new users data' : 'Edit Profile'}</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="First name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Last name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                  <CustomInput
                    labelText="Position"
                    id="position"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>           
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">{creationMode ? 'Create Profile' : 'Edit Profile'}</Button>
              {creationMode ? null : <Button color="secondary">Delete Profile</Button>}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          {creationMode ? null : <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Full Stack Developer</h6>
              <h4 className={classes.cardTitle}>Erhan Ülker</h4>
              <p className={classes.description}>
                Some random information about the current logged in user ...
              </p>
            </CardBody>
          </Card>}
        </GridItem>
      </GridContainer>
    </div>
  );
}
