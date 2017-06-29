/**
 * Created by Christian on 31-05-2017.
 */
import React, {Component} from 'react'
import {Col, Grid, ListGroupItem, Row} from "react-bootstrap";
import ContentEditable from "react-contenteditable";

export default class TextSubElement extends Component{
    constructor(props){
        super(props)
        this.state={
            html:"Dages noter"
        }
    }

    render(){
        return (
            <ListGroupItem header={this.props.header}>
                <Grid fluid>
                    <Row>
                        <Col sm={8}>
                {this.props.text}
                        </Col>
                        <Col sm={4}>
                            <h4>Noter</h4>
                            <ContentEditable html={this.state.html} onChange={this.handleChange}/>

                        </Col>
                    </Row>
                </Grid>
            </ListGroupItem>
        )
    }
}
