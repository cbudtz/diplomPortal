import React, {Component, PropTypes} from 'react';
import LinkBox from "./components/LinkBox";
import {Col, Grid, Row} from "react-bootstrap";
import AgendaTable from "./components/AgendaTable"
import ActivityElementContainer from "./components/ActivityElementModal";

export default class Agenda extends Component {


    constructor(props) {
        super(props)
        //Set initialState
        this.state = {
            showModal: false,
            linksUrl: this.props.apiUrl + this.props.linksPath,
            activityElementUrl: this.props.apiUrl + this.props.activityElementsPath,
            activitySubElements: [],
            activeActivityElement: ""
        }

    }

    handleActivityClick = (activity, activityElement) => {
        this.props.handleActivityClick(activity,activityElement);
        const type = activityElement.activityElementType;

    };

    hideModal = (e) =>{
        this.props.hideModal();
    };

    handleSubElementCheck = (checked, id)=>{
        this.props.handleSubElementCheck(checked, this.props.activeActivityId, this.props.activeActivityElementId, id);
    }

    handleNotes = (text, id)=>{
        this.props.handleSubElementNotes(text, this.props.activeActivityId, this.props.activeActivityElementId, id);
    }

//view
    render() {

        const generalLinkUrl = this.state.linksUrl +
            ((this.props.user === null) ?
                "/default" :
                "/" + this.props.user);
        const courseLinkUrl = this.state.linksUrl + "?user=" + this.props.user + "&course=" + this.props.course.id;
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
                        <AgendaTable coursePlan={this.props.coursePlan}
                                     handleActivityElementClick={this.handleActivityClick}/>
                    </Col>
                </Row>


                        <ActivityElementContainer hideModal={this.hideModal} showModal={this.props.showModal}
                                                  className="scroll-div" ref="activityContainer" title={this.props.activeActivityElement}
                                                  handleSubElementCheck={this.handleSubElementCheck}
                                                  handleNotes={this.handleNotes}
                                                  subElements={this.props.activitySubElements}/>



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
    coursePlan: PropTypes.any,
    activeActivityElement: PropTypes.any,
    course: PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string,
        coursePlanId: PropTypes.string,
        coursePlanSource: PropTypes.oneOf(['GoogleSheet', 'Mongo'])
    }).isRequired,
    handleActivityClick: PropTypes.func,
    handleSubElementCheck: PropTypes.func,
    handleSubElementNotes: PropTypes.func,
    hideModal: PropTypes.func
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