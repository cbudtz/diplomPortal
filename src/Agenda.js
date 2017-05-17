import React, {Component, PropTypes} from 'react';
import LinkBox from "./components/LinkBox";
import {Col, Grid, Row} from "react-bootstrap";


export default class Agenda extends Component {
    constructor(props) {
        super(props)
        this.state = {
            linksUrl: this.props.apiUrl + this.props.linksPath
        }
    }
//view
    render() {

        const generalLinkUrl = this.state.linksUrl +
            ((this.props.user === null) ?
            "/default" :
            "/" + this.props.user);
        const courseLinkUrl = this.state.linksUrl +  "?user=" + this.props.user + "&course=" + this.props.course.courseId;
        return (
            <Grid fluid>
                <Row>
                    <Col mdOffset={2} md={4} sm={6}>
                        {/*<LinkBox title={this.props.generalLinksTitle} linkUrl={generalLinkUrl}/>*/}
                    </Col>
                    <Col md={4} sm={6}>
                        <LinkBox title={this.props.courseLinksTitle} linkUrl={courseLinkUrl}/>
                    </Col>


                </Row>
            </Grid>)

    }
}
Agenda.propTypes = {
    apiUrl: PropTypes.string,
    linksPath: PropTypes.string,
    generalLinksTitle: PropTypes.string,
    courseLinksTitle: PropTypes.string,
    user: PropTypes.string,
    course: PropTypes.shape({
        courseId: PropTypes.string.isRequired,
        courseName: PropTypes.string
    }).isRequired
}

Agenda.defaultProps = {
    apiUrl: '',
    user: null,
    linksPath: '/links',
    generalLinksTitle:'Fælles links',
    courseLinksTitle: 'Kursus links'

}