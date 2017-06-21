/**
 * Created by Christian on 31-05-2017.
 */
import React, {Component} from 'react'
import {ListGroupItem} from "react-bootstrap";

export default class PopOutLinkSubElement extends Component{
    itemClicked = ()=>{
        alert("clicked")
        window.open(this.props.link)
    };

    render(){
        return (<ListGroupItem header={this.props.header} onClick={this.itemClicked}>


        </ListGroupItem>)
    }

}
