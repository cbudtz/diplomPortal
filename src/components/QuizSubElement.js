/**
 * Created by Christian on 29-06-2017.
 */

import React,{Component} from 'react'
import {Col, Grid, ListGroupItem, Row} from "react-bootstrap";
import ContentEditable from "react-contenteditable";


export default class QuizSubElement extends Component{
    render(){
        return(
        <ListGroupItem>
            <h4>Quiz</h4>
            <Grid fluid>
                <Row>
                    <Col sm={8}>
                        {this.props.text}
                    </Col>
                    <Col sm={4}>
                        <h4>Noter</h4>
                        <ContentEditable/>
                    </Col>
                </Row>
            </Grid>
        </ListGroupItem>)
    }
}