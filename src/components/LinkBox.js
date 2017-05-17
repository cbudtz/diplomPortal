/** Linkbox component for creating new Links
 *
 */

import React, {Component} from "react";
import {Button, Col, Form, FormControl, Row, Well} from 'react-bootstrap'
import ripple from '../ripple.svg';
import NewLink from "./NewLink";
export default class LinkBox extends Component {


    constructor(props) {
        super(props);
        this.state = {
            links: [],
            loading: true,
            newlink:{text:"",href:""},
            editmode: false
        }
        console.log(this.state);
        this.fetchLinks();
    }

    fetchLinks = () => {
        console.log('fetching from: ' + this.props.linkUrl);
        fetch(this.props.linkUrl, {mode: 'cors'}).then((response) => {
            response.json().then((json) => {
                this.setState({links: json, loading:"done"});

            }).catch((response)=>{
                this.setState({links: [], loading:"fail"});
                console.log("Something went wrong fetching urls from: " + this.props.linkUrl + " error: " + response);
            });
        });
    }

    handleChangeText = (e) =>{
        const updatedNewLink = {text:e.target.value, href:this.state.newlink.href};
        this.setState({newlink:updatedNewLink});
    }
    handleChangeHref = (e) => {
        const updatedNewLink = {text:this.state.newlink.text, href:e.target.value}
        this.setState({newlink:updatedNewLink});
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        console.log("submitting link" + this.state.newlink.href);
        const newLinks = this.state.links.concat([{text:this.state.newlink.text, href:this.state.newlink.href}])
        this.setState({links:newLinks, newlink:{text:'',href:''}});
        console.log(this.state);
    }

    handleEditClick = (e)=>{
        const newEditMode= !this.state.editmode
        this.setState({editmode:newEditMode})
    };


    getLinks = () => {
        return (
            this.state.links.map((link, index) => {
                console.log("link " + link);
                return <li key={index}><a href={link.href}>{link.text}</a></li>
            })
        )
    }
//View
    render() {
        if(this.state.loading==="done") {
            return (

                <Well>
                    <Row>
                    <Col xs={8} xsOffset={2} ><h4>{this.props.title}</h4></Col>
                    <Col xs={2}><Button bsSize="xsmall" onClick={this.handleEditClick} active={this.state.editmode}>edit</Button></Col>
                    </Row>
                    <div>
                        <ul>
                    {this.getLinks()}
                        </ul>
                    </div>
                    <div>
                        {this.state.editmode &&<NewLink/>}
                    </div>
                </Well>)
        } else if (this.state.loading===true){
            return  <Well><img src={ripple} alt="loading..."></img></Well>
        } else  {
            return <Well>Load failed!</Well>
        }
    }
}

LinkBox.propTypes = {
    linkUrl: React.PropTypes.string.isRequired,
    title: React.PropTypes.string
}
LinkBox.defaultProps = {
    title :""
}
