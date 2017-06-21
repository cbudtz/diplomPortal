/**
 * Created by Christian on 31-05-2017.
 */
import React, {Component} from 'react'
import {ListGroupItem} from "react-bootstrap";

export default class TextSubElement extends Component{

    render(){
        return (
            <ListGroupItem header={this.props.header}>
                {this.props.text}
            </ListGroupItem>
        )
    }
}
