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
import Rip from "./rest/Rip";


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
        if (courseAdmin || portalAdmin) {
            var adminMenu = {type: "NavDropDown", id: 10, text: "Admin", items: []}
            if (courseAdmin) {
                adminMenu.items.push({type: "MenuItem", id: {component: "CourseAdmin"}, text: "Course Admin"})
            }
            if (portalAdmin) {
                adminMenu.items.push({type: "MenuItem", id: {component: "PortalAdmin"}, text: "Portal Admin"})
            }
            return adminMenu;
        } else return {};

    };

    constructor(props) {
        super(props);
        const user = JwtHandler.getUser();
        console.log("user passed to App:");
        console.log(user);


        if (user) {
            console.log("User Found")

            this.fetchUser();
            this.state = {
                user:user,
                navbar: [{type: "NavItem", id:-2, text:"Loading"}],
                avatar: {id: user.userName},
                activePage: {component: "Login"},
                showModal:false
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

    fetchUser() {
        Rip.getJson(this.props.apiUrl + '/users/self', (json) => {
            console.log('got user data')
            console.log(json);
            let agendaDropDown = this.generateAgendaDropDown(json.agendaInfoMap, json.activeAgenda);
            let adminDropDown = this.generateAdminDropDown(json);

            this.setState({
                user: json,
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
                avatar: {id: json.userName},
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
            })
        })
    }

    generateAgendaDropDown = (agendaInfoMap, activeAgenda) =>{
        let content = {};
        content.type = "NavDropDown"
        content.id = activeAgenda
        content.text = agendaInfoMap[activeAgenda].courseName
        console.log(agendaInfoMap)
        content.items = [];
        for (let key in agendaInfoMap){
            content.items.push({type:"MenuItem", id: {component:'Agenda', id:key, agendaId:agendaInfoMap[key].agendaId}, text:agendaInfoMap[key].courseName})
        }
        console.log(content)

        return content

    }

    onMenuSelect = (e)=>{
        console.log("got selection");
        console.log(e)
        if(e.id){
            this.fetchCourse(e.id, e.agendaId);
        } else {
            this.setState({activePage: e})
        }
    }

    fetchCourse= (courseId, agendaId)=> {
        Rip.getJson(this.props.apiUrl + "/courses/" + courseId, (json)=>{
            this.setState({
                course:json
            })
            this.fetchCoursePlan(json.courseplanId, agendaId);
        })
    }

    fetchCoursePlan= (courseplanId, agendaId)=> {
        console.log("Fethcing coursePlan: " + courseplanId)
        Rip.getJson(this.props.apiUrl + "/courseplans/" + courseplanId,
            (json)=>{
                console.log("FoundCoursePlan: ")
                this.setState({
                    coursePlan: json
                })
                this.fetchAgenda(agendaId)
            }, (data)=>{
                console.log(data);
            })
    }

    fetchAgenda = (agendaId)=> {
        Rip.getJson(this.props.apiUrl + "/agendas/" + agendaId,
            (json) => {
                console.log("Found Agenda:")
                console.log(json);
                this.setState({agenda:json})
                this.mergeAgendaWithCoursePlan()
            })
    }

    mergeAgendaWithCoursePlan = ()=> {
        let coursePlan = this.state.coursePlan;
        coursePlan.courseActivityList.forEach((courseActivity, index, activityArray)=>{
             this.mergeAgendaWithCourseActivity(courseActivity.activityElementList);

        })
        this.setState({coursePlan:coursePlan})

    }

    mergeAgendaWithCourseActivity = (courseActivity)=> {
        console.log(courseActivity)
        courseActivity.forEach((activityElement, index, activityElementArray)=>{
            this.mergeAgendaWithAcvitityElement(activityElement);
        })
    }


    mergeAgendaWithAcvitityElement(activityElement) {
        console.log(activityElement)
        activityElement.subElements.forEach((activitySubElement, index, activitySubElementArray)=>{
            if (this.state.agenda.elementMetaData[activityElement.id]){
                let Agendaelement = this.state.agenda.elementMetaData[activityElement.id]
                console.log(Agendaelement);
                    console.log(Agendaelement + Agendaelement.metaDataList[activitySubElement.id])
                    activitySubElement.checked = Agendaelement.metaDataList[activitySubElement.id].checked
                    activitySubElement.progression = Agendaelement.metaDataList[activitySubElement.id].progression
            }

        })

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
            return <Agenda course={this.state.course} coursePlan={this.state.coursePlan} apiUrl={this.props.apiUrl}
                           handleActivityClick={this.handleActivityClick}
                           handleSubElementCheck={this.handleSubElementCheck}
                           activitySubElements={this.state.activitySubElements}
                           activeActivityElement={this.state.activeActivityElement}
                           activeActivityElementId={this.state.activeActivityElementId}
                           showModal={this.state.showModal}
                           hideModal={this.hideModal}
            />
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

    handleActivityClick = (activity, activityElement)=>{
        console.log("Got activityCLick: ")
        console.log(activityElement)
        if (activityElement.activityElementType === "GoogleSheet") {
            this.setState({
                activitySubElements:activityElement.subElements,
                activeActivityElement: activityElement.title,
                activeActivityElementId: activityElement.id,
                showModal:true,
                activeActivityId: activity.id
            })

        } else {
            window.open(activityElement.hyperLink);
        }
    }

    handleSubElementCheck = (checked, activityId, activityElementId, activitySubElementId)=>{
        console.log("checked: " + checked)
        console.log(checked);
        let activityMap = null;
        let newAgenda = this.state.agenda;
        console.log("activityElementId:" + activityElementId)
        if (newAgenda.elementMetaData) {
            if (newAgenda.elementMetaData[activityElementId]== null) {
                newAgenda.elementMetaData[activityElementId] = {};
            }
            if(newAgenda.elementMetaData[activityElementId].metaDataList==null){
                newAgenda.elementMetaData[activityElementId].metaDataList = {};
            }
            if(newAgenda.elementMetaData[activityElementId].metaDataList[activitySubElementId]==null){
                newAgenda.elementMetaData[activityElementId].metaDataList[activitySubElementId] = {}
            }
            console.log(newAgenda)
            newAgenda.elementMetaData[activityElementId].metaDataList[activitySubElementId].checked = checked
            newAgenda.elementMetaData[activityElementId].metaDataList[activitySubElementId].progression = checked?1:0;
        }
        this.setState({
            agenda: newAgenda
        })
        Rip.postForString(this.props.apiUrl + "/agendas",this.state.agenda,(json)=>{
            console.log("everything is awesome!!")
        });
        this.mergeAgendaWithCoursePlan();
    }

    hideModal = ()=>{
        this.setState({showModal:false})
    }

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
