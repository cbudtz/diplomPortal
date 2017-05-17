/**
 * Created by Christian on 17-05-2017.
 */

import {Popover, OverlayTrigger, Button, Form, FormControl} from 'react-bootstrap';
import React, {Component} from 'react'

export default class NewLink extends Component{
    constructor(props){
        super(props);
        this.state = {text:"",href:""}
    }




    popover =(
        <Popover id="modal-popover" title="Nyt Link">
            <Form>
                <FormControl></FormControl>
                <FormControl/>
            </Form>
        </Popover>)

    render(){
        return(
        <div>
            <OverlayTrigger trigger="click" placement="bottom" overlay={this.popover}>
                <Button>Holy guacamole!</Button>
            </OverlayTrigger>
        </div>)
    }

}

