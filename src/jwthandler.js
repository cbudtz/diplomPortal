/**
 * Created by Christian on 09-05-2017.
 */

import Config from './config';

export default class JwtHandler {
    static getUser = () => {
        var token = JwtHandler.getToken();
        console.log(token);
        if (!token) {return null}
        else {
            const claims = token.split(".")[1];
            const decodedClams = decodeURIComponent(escape(window.atob(claims)));
            const jsonClaims = JSON.parse(decodedClams);
            console.log("found claims:");
            console.log(jsonClaims);
            //what??
            return jsonClaims.user;
        }
    }
    static getToken = () =>{
        return localStorage.getItem(Config.TOKEN_NAME);
    }
    static setToken = (token) =>{

        localStorage.setItem(Config.TOKEN_NAME,token);
    }
    static clearUser = () => {
        localStorage.removeItem(Config.TOKEN_NAME);
    }

}