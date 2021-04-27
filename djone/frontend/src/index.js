import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import store from './store';

import {IconContext} from 'react-icons';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "./layouts/Admin.js";


import "./assets/css/material-dashboard-react.css?v=1.9.0";
import LoginPage from './pages/LoginPage.jsx';
import { withAuth } from './components/HOC/withAuth';
import { setToken} from './store/actions';

const hist = createBrowserHistory();

const token = localStorage.getItem('token');
if(token) {
  const action = setToken(token)
  store.dispatch(action)
}


ReactDOM.render(
  <Provider store={ store }>
    <Router history={ hist }>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/demo" component={withAuth(Admin)} />
        <Redirect from="/" to="/demo/start" />
      </Switch> 
    </Router>
  </Provider>,
  document.getElementById("root")
);
