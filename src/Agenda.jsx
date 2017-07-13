import React, {Component, PropTypes} from 'react';
import LinkBox from "./components/LinkBox";
import {Col, Grid, Modal, Row, Well} from "react-bootstrap";
import AgendaTable from "./components/AgendaTable"
import ActivityElementContainer from "./components/ActivityElementModal";
import Rip from './rest/Rip'
import {Affix, AutoAffix} from "react-overlays";


export default class Agenda extends Component {


    constructor(props) {
        super(props)
        var specificCoursePlanUri = ''
        if (this.props.course.coursePlanSource === 'GoogleSheet') {
            console.log("fetching googleCoursePlan");
            specificCoursePlanUri += this.props.googlepath;
            specificCoursePlanUri += "/id/";
            specificCoursePlanUri += this.props.course.coursePlanId;
        } else {
            specificCoursePlanUri += "/id/";
            specificCoursePlanUri += this.props.course.coursePlanId;
        }


        //Set initialState
        this.state = {
            showModal: false,
            linksUrl: this.props.apiUrl + this.props.linksPath,
            coursePlanUrl: this.props.apiUrl + this.props.courseplansPath + specificCoursePlanUri,
            activityElementUrl: this.props.apiUrl + this.props.activityElementsPath,
            activitySubElements: [],
            activeActivityElement: ""
        }

    }

    handleActivityClick = (e, activityElement) => {
        const type = activityElement.activityElementType;
        if (type === "GoogleSheet") {

            Rip.getJson(this.state.activityElementUrl + "/googleid/" + activityElement.googleSheetId,
                (json) => {
                    console.log(json);
                    this.setState({
                        activitySubElements: json.subElements,
                        activeActivityElement: activityElement.title,
                        showModal:true
                    });
                }, (error) => {
                    console.log(error);
                })
        } else {
            window.open(activityElement.hyperLink);
        }
    };

    hideModal = (e) =>{
        this.setState({
            showModal:false
        })
    };

//view
    render() {

        const generalLinkUrl = this.state.linksUrl +
            ((this.props.user === null) ?
                "/default" :
                "/" + this.props.user);
        const courseLinkUrl = this.state.linksUrl + "?user=" + this.props.user + "&course=" + this.props.course.courseId;
        return (
            <Grid fluid>
                <Row>
                    <Col mdOffset={2} md={4} sm={6}>
                        <LinkBox title={this.props.generalLinksTitle} linkUrl={generalLinkUrl}/>
                    </Col>
                    <Col md={4} sm={6}>
                        <LinkBox title={this.props.courseLinksTitle} linkUrl={courseLinkUrl}/>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <AgendaTable courseplanUrl={this.state.coursePlanUrl}
                                     handleActivityElementClick={this.handleActivityClick}/>
                    </Col>
                </Row>


                        <ActivityElementContainer hideModal={this.hideModal} showModal={this.state.showModal} className="scroll-div" ref="activityContainer" title={this.state.activeActivityElement}
                                                  subElements={this.state.activitySubElements}/>



            </Grid>)

    }

}
Agenda.propTypes = {
    apiUrl: PropTypes.string,
    linksPath: PropTypes.string,
    generalLinksTitle: PropTypes.string,
    courseLinksTitle: PropTypes.string,
    courseplansPath: PropTypes.string,
    activityElementsPath: PropTypes.string,
    googlepath: PropTypes.string,
    user: PropTypes.string,
    course: PropTypes.shape({
        courseId: PropTypes.string.isRequired,
        courseName: PropTypes.string,
        coursePlanId: PropTypes.string,
        coursePlanSource: PropTypes.oneOf(['GoogleSheet', 'Mongo'])
    }).isRequired
}

Agenda.defaultProps = {
    apiUrl: '',
    user: null,
    linksPath: '/links',
    courseplansPath: '/courseplans',
    activityElementsPath: '/activityelements',
    googlepath: '/google',
    generalLinksTitle: 'Fælles links',
    courseLinksTitle: 'Kursus links'

}