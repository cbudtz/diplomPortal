/**
 * Created by Christian on 09-05-2017.
 */

export default class JwtHandler {
    static getUser = () => {
        var token = JwtHandler.getToken();
        console.log(token);
        if (!token) {return null}
        else {
            const claims = token.split(".")[1];
            const decodedClams = window.atob(claims);
            const jsonClaims = JSON.parse(decodedClams);
            console.log("found claims:");
            console.log(jsonClaims.user);
            //what??
            return jsonClaims.user;
        }
    }
    static getToken = () =>{
        return localStorage.getItem("portal-jwt-Token")
    }
    static setToken = (token) =>{
        localStorage.setItem("portal-jwt-Token",token)
    }

}