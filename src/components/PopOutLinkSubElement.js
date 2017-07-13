/**
 * Created by Christian on 31-05-2017.
 */
import React, {Component} from 'react'
import {Glyphicon, ListGroupItem} from "react-bootstrap";

export default class PopOutLinkSubElement extends Component{
    itemClicked = ()=>{
        window.open(this.props.link)
    };

    render(){
        return (<ListGroupItem>
            <h4 style={{cursor:'pointer'}}><input id={"check"+this.props.checkBoxId} type="checkbox" defaultChecked={true}/><label htmlFor={"check" + this.props.checkBoxId}> </label>
                <a onClick={this.itemClicked}>{this.props.header} <Glyphicon glyph="new-window" /></a></h4>

        </ListGroupItem>)
    }

}
