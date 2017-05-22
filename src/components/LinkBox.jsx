/** Linkbox component for creating new Links
 *
 */

import React, {Component} from "react";
import {Button, Col, Glyphicon, Row, Well} from 'react-bootstrap'
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
    handleNewLink = (link) =>{
        console.log("posting nwe lilnk");
        console.log(link);
        const newLinks = this.state.links.concat([{text:link.text, href:link.href}])
        this.setState({links:newLinks, newlink:{id:'new',text:'',href:''}});
        fetch(this.props.linkUrl,{
            mode:'cors',
            method: 'POST',
            body: JSON.stringify(link),
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        }).then((response)=>{
            console.log('posted link');
            console.log(response);
        }).catch((reponse)=>{
            console.log("something went wrong while posting to " + this.props.linkUrl +"error: "+ reponse)
        })
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
                return <li key={link.id}><a href={link.href}>{link.text}</a> {this.state.editmode&&<span><Glyphicon glyph="pencil"/><Glyphicon glyph="remove"/></span>}</li>
            })
        )
    }
//View
    render() {
        if(this.state.loading==="done") {
            return (

                <Well>
                    <Row>
                    <Col xs={8} xsOffset={2} ><h4 className="text-center">{this.props.title}</h4></Col>
                    <Col xs={2}><Button bsSize="xsmall" onClick={this.handleEditClick} active={this.state.editmode}><Glyphicon glyph="pencil"/>edit</Button></Col>
                    </Row>
                    <Row>
                    <Col xs={12}>
                    <div>
                        <ul  className="list-unstyled">
                    {this.getLinks()}
                        </ul>
                    </div>
                    <div>
                        {this.state.editmode &&<NewLink onSubmitLink={this.handleNewLink}/>}
                    </div>
                    </Col>
                    </Row>
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
