import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import Config from './config';

//Some code to extract a potential token....
const token = getParameterByName("token");
console.log(token);
if (token!=null && token.length>0){
    //Store token and redirect to baseURL
    localStorage.setItem("portal-jwt-Token",token);
    location.replace("/");
}
// Base React class

const api =  Config.ApiPath ? Config.ApiPath + "/rest" : "/rest"
ReactDOM.render(
    //set apiUrl for deployment with seperate api host name eg: https://diplomportal.herokuapp.com/rest
  <App apiUrl={api} name="DiplomPortal"/>,
  document.getElementById('root')
);

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    //name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}