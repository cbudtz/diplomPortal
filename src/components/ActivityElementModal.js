/**
 * Created by Christian on 30-05-2017.
 */
import React, {Component, PropTypes} from 'react';
import {Col, Grid, ListGroup, ListGroupItem, Modal, Row, Well} from 'react-bootstrap';
import TextSubElement from "./TextSubElement";
import PopOutLinkSubElement from "./PopOutLinkSubElement";
import ProgrammingBox from "./ProgrammingBox";
import EmbeddedLinkSubElement from "./EmbeddedLinkSubelement"
import ContentEditable from "react-contenteditable";
import QuizSubElement from "./QuizSubElement";
import ConceptQuestionSubElement from "./ConceptQuestionSubElement";
import '../index.css'

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
                    return <TextSubElement key={index} checkBoxId={index} header={subElement.title} text={subElement.content} onCheck={this.handleCheck}/>
                } else if (subElement.subElementType === 'Pop_Out_Link') {
                    return <PopOutLinkSubElement key={index} checkBoxId={index} header={subElement.title} link={subElement.hyperLink}/>
                } else if (subElement.subElementType === 'Code') {
                    //TODO move to containerElement
                    return (<ListGroupItem key={index}>
                        <h4 className="list-group-item-heading" ><input id={"check"+index} type="checkbox" defaultChecked={true}/><label htmlFor={"check" + index}> </label>
                            {subElement.title}</h4>
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
                    return <EmbeddedLinkSubElement checkBoxId={index} key={index} title={subElement.title} link={subElement.hyperLink}/>
                } else if (subElement.subElementType === 'Concept_Question') {
                    return <ConceptQuestionSubElement checkBoxId={index}/>
                } else if(subElement.subElementType==='Quiz') {
                    return <QuizSubElement checkBoxId={index}/>
                } else { //placeholder for now...
                    return <ListGroupItem key={index} header={subElement.title}>Coming Sooon!</ListGroupItem>
                }

            })
        }
    }

    getMenuElements = () => {
        if (this.props.subElements) {
            return this.props.subElements.map((subelement, index)=>{
                console.log('subelement');
                console.log(subelement);
                return <li key={index}><input key={index} id={"check"+index} type="checkbox" defaultChecked={false}/><label htmlFor={"check" + index}> </label>{subelement.title}</li>
            })
        }
    }

    scrollToTop = () =>{
        window.scrollTo(0,0);
    };

    hideModal = () =>{
        this.props.hideModal();
    }

    handleClk = () =>{
        console.log('test');
    }
    handleCheck = (key) => {

    };


    render() {
        return (
            <Modal bsSize="large" dialogClassName="custom-modal" show={this.props.showModal} onHide={this.hideModal}>
                <Modal.Header closeButton><h3 style={{margin:-5}} onLoad={console.log('test')}>{this.props.title}</h3></Modal.Header>


                <Modal.Body>
                    <Row>
                        <Col md={3} sm={4}>
                            <Well onClick={this.handleClk()} style={{cursor: 'pointer', paddingLeft:0,paddingRight:0}}>
                                <ul>
                                    {this.getMenuElements()}
                                </ul>
                            </Well>
                        </Col>
                        {/*Container for contents*/}
                        <Col md={9} sm={8}>
                            <div className="scroll-div">
                                <ListGroup>
                                {this.getSubElementBoxes()}
                                </ListGroup>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
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