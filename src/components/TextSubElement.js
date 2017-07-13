/**
 * Created by Christian on 31-05-2017.
 */
import React, {Component} from 'react'
import {Col, Glyphicon, Grid, ListGroupItem, Row} from "react-bootstrap";
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
            <ListGroupItem>
                <h4 className="list-group-item-heading">
                    <input id={"check"+this.props.checkBoxId} type="checkbox" defaultChecked={true}/><label htmlFor={"check" + this.props.checkBoxId}> </label>
                    {this.props.header}
                </h4>

                <Grid fluid>
                    <Row>
                        <Col sm={8}>

                            {this.props.text}
                        </Col>
                        <Col sm={4}>
                            <h5><Glyphicon glyph="pencil"/><b>Noter</b></h5>
                            <ContentEditable html={this.state.html} onChange={this.handleChange}/>

                        </Col>
                    </Row>
                </Grid>
            </ListGroupItem>
        )
    }
}
