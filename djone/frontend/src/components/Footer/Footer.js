/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
// core components
import styles from '../../assets/jss/material-dashboard-react/components/footerStyle.js';

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.Footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link to='/demo/start' className={classes.block}>
                Start
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link to='/demo/new-project' className={classes.block}>
                New Project
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link to='/demo/touch-voltage' className={classes.block}>
                Touch Voltage
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link to='/demo/voltage-profile' className={classes.block}>
                Voltage Profile
              </Link>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{' '}
            <a
              href='#'
              className={classes.a}
            >
              Axpo Energy
            </a>
            , made with love by Nassim, Oded, Justina, Erhan & David
          </span>
        </p>
      </div>
    </footer>
  );
}
