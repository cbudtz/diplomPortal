/**
 * Created by Christian on 30-05-2017.
 */
import React, {Component, PropTypes} from 'react';
import {Col, Grid, ListGroup, ListGroupItem, Row, Well} from 'react-bootstrap';
import TextSubElement from "./TextSubElement";
import PopOutLinkSubElement from "./PopOutLinkSubElement";
import ProgrammingBox from "./ProgrammingBox";
import EmbeddedLinkSubElement from "./EmbeddedLinkSubelement"
import {AutoAffix} from "react-overlays";
import ContentEditable from "react-contenteditable";
import QuizSubElement from "./QuizSubElement";
import ConceptQuestionSubElement from "./ConceptQuestionSubElement";

export default class ActivityElementContainer extends Component {

    constructor(props) {
        super(props);
        this.state={
            html:"noter"
        }
    }

    getSubElementBoxes = () => {
        console.log(this.props.subElements)
        if (this.props.subElements) {
            return this.props.subElements.map((subElement, index) => {
                if (subElement.subElementType === 'Text') {
                    return <TextSubElement key={index} header={subElement.title} text={subElement.content}/>
                } else if (subElement.subElementType === 'Pop_Out_Link') {
                    return <PopOutLinkSubElement key={index} header={subElement.title} link={subElement.hyperLink}/>
                } else if (subElement.subElementType === 'Code') {
                    //TODO move to containerElement
                    return (<ListGroupItem key={index}>
                        <h4 className="list-group-item-heading" > {subElement.title}</h4>
                        <Grid fluid>
                            <Row>
                                <Col sm={8}>
                                    <ProgrammingBox/>
                                </Col>
                                <Col sm={4}>
                                    <h4>Noter</h4>
                                    <ContentEditable html={this.state.html}/>
                                </Col>
                            </Row>
                        </Grid>
                    </ListGroupItem>)
                } else if (subElement.subElementType === 'Embedded_Link'){
                    return <EmbeddedLinkSubElement key={index} title={subElement.title} link={subElement.hyperLink}/>
                } else if (subElement.subElementType === 'Concept_Question') {
                    return <ConceptQuestionSubElement/>
                } else if(subElement.subElementType==='Quiz') {
                    return <QuizSubElement/>
                } else { //placeholder for now...
                    return <ListGroupItem key={index} header={subElement.title}>Coming Sooon!</ListGroupItem>
                }

            })
        }
    }

    getMenuElements = () => {
        if (this.props.subElements) {
            return this.props.subElements.map((subelement, index)=>{
                return <li key={index}><input key={index} id={"test"+index} type="checkbox" defaultChecked={true}/><label htmlFor={"test" + index}> </label>{subelement.title}</li>
            })
        }
    }

    scrollToTop = () =>{
        window.scrollTo(0,0);
    };


    render() {
        return (
            <Row>

                <Col md={3} sm={4}>
                    <AutoAffix viewportOffsetTop={70} container={this}>
                        <Well>
                            <a style={{cursor:'pointer'}} onClick={this.scrollToTop}>Til oversigten</a>
                            <ul>
                                {this.getMenuElements()}
                            </ul>
                        </Well>
                    </AutoAffix>
                </Col>

                <Col md={9} sm={8}>
                    <h1>{this.props.title}</h1>
                    <ListGroup>
                        {this.getSubElementBoxes()}
                    </ListGroup>
                </Col>
            </Row>
        )
    }


}

ActivityElementContainer.propTypes = {
    subElements: PropTypes.arrayOf(
        PropTypes.shape({
            content: PropTypes.string,
            googleSheetId: PropTypes.string,
            hyperLink: PropTypes.string,
            id: PropTypes.string,
            subElementType: PropTypes.oneOf(['Text', 'Embedded_Link', 'Pop_Out_Link', 'Code', 'Quiz', 'Concept_Question'])
        }))

}