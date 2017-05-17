/**
 * Created by Christian on 09-05-2017.
 */

export default class JwtHandler {
    static getUser = () => {
        var token = JwtHandler.getToken();
        token = 'test';
        if (token===null) {return null}
        else {
            token = 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJEaXBsb21JdCIsInVzZXIiOnsidXNlcklkIjotMSwidXNlck5hbWUiOiJ0ZXN0IiwicGFzc3dvcmQiOiIifSwiZXhwIjoxNDkzOTk0MTc1fQ.QYPvN3HCMI3nQiii5qfR_GRVRhWeXbz87aGYz0lolNs';
            const claims = token.split(".")[1];
            console.log(window.atob(claims));

        };
    }
    static getToken = () =>{
        localStorage.getItem("portal-jwt-Token")
    }
    static setUser = (token) =>{
        localStorage.setItem("portal-jwt-Token",token)
    }

}