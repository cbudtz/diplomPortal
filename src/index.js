import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


//Base React class
ReactDOM.render(
    //set apiUrl for deployment with seperate api host name eg: https://diplomportal.herokuapp.com/rest
  <App apiUrl="https://diplomportal.herokuapp.com/rest" name="DiplomPortal"/>,
  document.getElementById('root')
);
