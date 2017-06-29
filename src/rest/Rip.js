/**
 * Created by Christian on 29-05-2017.
 */
import 'whatwg-fetch';
import JwtHandler from '../jwthandler'

const debug = true;
export default class Rip {

    static getJson = (url, callback, catchback) => {
        if (debug) console.log("Rip: Fetching from " + url);
        var jwtToken = JwtHandler.getToken();
        fetch(url, {
            mode: 'cors',
            method: 'GET',
            headers: new Headers({
                "content-type": "application/json",
                "authorization" : "Bearer " + jwtToken
            })
        }).then((response) => {
            Rip.handleJSON(response,callback,catchback);
        }).catch((response) => {
            catchback({message: "Rip: Error while fetching: " + response.message, response: response});
        })
    }

    static getPlain = (url, callback,catchback) => {
        fetch(url,{
            mode: 'cors',
            method: 'GET'
        }).then((response)=>{
            console.log('got response');
            response.text().then((text) =>{
                callback(text);
            })
        }).catch((response)=>{
            catchback({message:"Rip: Error while fetching " + response.message, response: response});
        })
    }

    static getNoCors = (url) =>{
        fetch(url,{
            mode: 'no-cors',
            method: 'GET'
        })
    }

    static post = (url, json, callback, catchback) => {
        fetch(url, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(json),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }).then((response) => {
            Rip.handleJSON(response,callback,catchback);
        }).catch((response) => {
            catchback({message: "Rip: Error while fetching: " + response.message, response: response});
        })
    }

    static handleJSON = (response,callback,catchback)=>{
        if (!response.ok) {
            const ripError = {message: "Rip: Response not ok " + response.error, response: response}
            if (debug) console.log(ripError);
            catchback(ripError);
        }
        response.json().then((json) => {
            callback(json);
        }).catch((error) => {
            const riperror = {message: "Rip: error while parsing json: " + error, response: response};
            if (debug) console.log(riperror);
            catchback(riperror);
        })
    }

}