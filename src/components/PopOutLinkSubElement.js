/**
 * Created by Christian on 31-05-2017.
 */
import React, {Component} from 'react'
import {Glyphicon, ListGroupItem} from "react-bootstrap";
import CheckboxComp from "./CheckboxComp";

export default class PopOutLinkSubElement extends Component{
    itemClicked = ()=>{
        window.open(this.props.link)
    };

    render(){
        console.log()
        return (<ListGroupItem>
            <h4 style={{cursor:'pointer'}}><CheckboxComp checked={this.props.checked} onCheck={this.props.onCheck}/>
                <a onClick={this.itemClicked}>{this.props.header} <Glyphicon glyph="new-window" /></a></h4>

        </ListGroupItem>)
    }

}
