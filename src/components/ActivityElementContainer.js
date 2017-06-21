/**
 * Created by Christian on 30-05-2017.
 */
import React, {Component, PropTypes} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import TextSubElement from "./TextSubElement";
import PopOutLinkSubElement from "./PopOutLinkSubElement";
import ProgrammingBox from "./ProgrammingBox";

export default class ActivityElementContainer extends Component {

    constructor(props) {
        super();


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
                    return (<ListGroupItem header={subElement.title} key={index}>
                        <ProgrammingBox/>
                    </ListGroupItem>)
                } else { //placeholder for now...
                    return <ListGroupItem key={index} header={subElement.title}>Coming Sooon!</ListGroupItem>
                }
            })
        }
    }


    render() {
        return (
            <div>
            <h1>{this.props.title}</h1>
            <ListGroup>
                {this.getSubElementBoxes()}
            </ListGroup>
            </div>
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