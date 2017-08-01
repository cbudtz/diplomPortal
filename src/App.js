import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import TopMenu from "./TopMenu.js";
import Agenda from "./AgendaPage.jsx";
import JwtHandler from "./jwthandler";
import LoginPage from "./LoginPage";
import CourseInfoPage from "./CourseInfoPage";
import SyllabusPage from "./SyllabusPage";
import ForumPage from "./ForumPage";
import CourseAdminPage from "./CourseAdminPage";
import PortalAdminPage from "./PortalAdminPage";


export default class App extends Component {
    generateAdminDropDown = (user)=>{
        let portalAdmin = false;
        user.roles.forEach((role)=>{
            if (role.roleName === "PortalAdmin") {portalAdmin = true}
        })
        let courseAdmin = false;
        user.roles.forEach((role)=>{
            if (role.roleName ==="CourseAdmin") {courseAdmin = true}
        })
        return {
            type: "NavDropDown", id: 10, text: "Admin", items: [
                {type: "MenuItem", id: {component: "CourseAdmin"}, text: "Course Admin"},
                {type: "MenuItem", id: {component: "PortalAdmin"}, text: "Portal Admin"}
            ]
        }

    };

    constructor(props) {
        super(props);
        const user = JwtHandler.getUser();
        console.log("user passed to App:");
        console.log(user);
        //TODO persist activeCourse

        if (user) {
            console.log("User Found")
            let agendaDropDown = this.generateAgendaDropDown(user.agendaInfoMap, user.activeAgenda);
            let adminDropDown = this.generateAdminDropDown(user);
            this.state = {
                user: user,
                navbar: [
                    agendaDropDown
                    ,
                    {type: "NavItem", id: {period: "F17", course: "02324", component: "Agenda"}, text: "Agenda"},
                    {type: "NavItem", id: {component: "CourseInfo"}, text: "Kursus oversigt"},
                    {type: "NavItem", id: {component: "Syllabus"}, text: "Pensum", component: "Syllabus"},
                    {type: "NavItem", id: {component: "Forum"}, text: "Forum", component: "Forum"},
                    adminDropDown
                ]

                ,
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
                navbar: [{type:"NavItem", id:-1, text:"Please Login"},
                ],
                avatar: {id: null},
                pages: {
                    0: {period: "F17", course: "02324", component: "Agenda"},
                    1: {period: "F17", course: "02324", component: ""}
                },
                activePage: {component: "Login"},
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

    onMenuSelect = (e)=>{
        console.log("got selection");
        console.log(e)
        this.setState({activePage:e})
    }

    onLogout = (hard)=>{
        console.log("Logging out")
        JwtHandler.clearUser();
        this.setState({user: null , avatar: {id:null}, navbar: [{type:"NavItem", id:-1, text:"Please Login"},
        ], activePage:{component:"Login"}
        });
    }

    getComponent = ()=> {
        const component = this.state.activePage.component;
        if (component === "Agenda") {
            return <Agenda course={this.state.course} apiUrl={this.props.apiUrl}/>
        } else if (component === "CourseInfo") {
            return <CourseInfoPage course={this.state.course} apiUrl={this.props.apiUrl}/>
        } else if (component === "Syllabus") {
            return <SyllabusPage course={this.state.course} apiUrl={this.props.apiUrl}/>
        } else if (component === "Forum") {
            return <ForumPage course={this.state.course} apiUrl={this.props.apiUrl}/>
        } else if (component === "CourseAdmin") {
            return <CourseAdminPage course={this.state.course} apiUrl={this.props.apiUrl}/>
        } else if (component === "PortalAdmin") {
            return <PortalAdminPage course={this.state.course} apiUrl={this.props.apiUrl}/>
        } else  {
            return <LoginPage course={this.state.course} apiUrl={this.props.apiUrl}/>
        }

    };

    render() {
        console.log("main state:")
        console.log(this.state);
        return (
            <div className="App">

                <TopMenu apiUrl={this.props.apiUrl} menuItems={this.state.navbar} avatar={this.state.avatar}
                         activeId={this.state.activePage} onSelect={this.onMenuSelect} onLogout={this.onLogout}
                />
                {this.getComponent()}

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
