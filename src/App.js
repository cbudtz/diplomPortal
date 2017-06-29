import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import TopMenu from "./TopMenu.js";
import Agenda from "./Agenda.jsx";
import JwtHandler from "./jwthandler";
import Rip from "./rest/Rip"


export default class App extends Component {
    constructor(props) {
        super(props);
        const user = JwtHandler.getUser();
        console.log("user passed to App:");
        console.log(user);
        //TODO persist activeCourse

        if (user) {
            console.log("User Found")
            let agendaDropDown = this.generateAgendaDropDown(user.agendaInfoMap, user.activeAgenda);
            this.state = {
                user: user,
                navbar: [
                    agendaDropDown
                    ,
                    {type: "NavItem", id: {period: "F17", course: "02324", component: "Agenda"}, text: "Agenda"},
                    {type: "NavItem", id: "F17/02324/KursusOversigt", text: "Kursus oversigt"},
                    {type: "NavItem", id: "F17/02324/Pensum", text: "Pensum"},
                    {type: "NavItem", id: "F17/02324/Forum", text: "Forum"},

                ],
                avatar: {id: user.userName},
                pages: {
                    0: {period: "F17", course: "02324", component: "Agenda"},
                    1: {period: "F17", course: "02324", component: ""}
                },
                activePage: {period: "F17", course: "02324", component: "Agenda"},
                course: {
                    courseId: "02324F17",
                    courseName: "Videregående programmering",
                    coursePlanId: "1Zj-1eLX67PQRzM7m1icq2vSXzbHn2iFvN4V9cUHTWQo",
                    coursePlanSource: "GoogleSheet"
                }
            }
        } else {
            this.state = {
                user: null,
                navbar: [{
                    type: "NavDropDown", id: 0, text: "F17 02324 Videregående Programmering", items: [
                        {type: "MenuItem", id: 1, text: "F17 62577 Datakommunikation"},
                        {type: "MenuItem", id: 2, text: "Gamle Kurser"},
                        {type: "MenuItem", id: 3, text: "Andre Kurser"}
                    ]
                }],
                avatar: {id: null},
                pages: {
                    0: {period: "F17", course: "02324", component: "Agenda"},
                    1: {period: "F17", course: "02324", component: ""}
                },
                activePage: {period: "F17", course: "02324", component: "Agenda"},
                course: {
                    courseId: "02324F17",
                    courseName: "Videregående programmering",
                    coursePlanId: "1Zj-1eLX67PQRzM7m1icq2vSXzbHn2iFvN4V9cUHTWQo",
                    coursePlanSource: "GoogleSheet"
                }
            }
        }
    }

    generateAgendaDropDown = (agendaInfoMap, activeAgenda) =>{

        return {
            type: "NavDropDown", id: 0, text: "F17 02324 Videregående Programmering", items: [
            {type: "MenuItem", id: 1, text: "F17 62577 Datakommunikation"},
            {type: "MenuItem", id: 2, text: "Gamle Kurser"},
            {type: "MenuItem", id: 3, text: "Andre Kurser"}
        ]
        }
    }
    test = (e) => {
        this.setState({
            color:"Yellow"
        })
    }

    onMenuSelect = (e)=>{
        console.log("got selection");
        console.log(e)
        this.setState({activePage:e})
    }

    onLogout = (hard)=>{
        console.log("Logging out")
        JwtHandler.clearUser();
        this.setState({user: null , avatar: {id:null}, navbar: [{
            type: "NavDropDown", id: 0, text: "F17 02324 Videregående Programmering", items: [
                {type: "MenuItem", id: 1, text: "F17 62577 Datakommunikation"},
                {type: "MenuItem", id: 2, text: "Gamle Kurser"},
                {type: "MenuItem", id: 3, text: "Andre Kurser"}
            ]
        }]});
    }

    render() {
        console.log("main state:")
        console.log(this.state);
        return (
            <div className="App">

                <TopMenu apiUrl={this.props.apiUrl} menuItems={this.state.navbar} avatar={this.state.avatar}
                         activeId="F17/02324/Agenda" onSelect={this.onMenuSelect} onLogout={this.onLogout}
                />

                <Agenda course={this.state.course} apiUrl={this.props.apiUrl}/>
                <img src={logo} className="App-logo" alt="logo" />

            </div>
        );
    }
}

App.propTypes = {
    apiUrl : React.PropTypes.string
}
App.defaultProps = {
    apiUrl: '' //for deployment at same root
}
