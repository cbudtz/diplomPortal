import React, {Component} from 'react';
import {Col, Grid, ListGroupItem} from 'react-bootstrap';
import Rip from '../rest/Rip';
import ContentEditable from "react-contenteditable";

export default class EmbeddedLinkSubelement extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: 'done',
            contents: '',
            html:'Her kan du tage noter til teksten'
        }
        Rip.getPlain(props.link,
            (response) =>{
                console.log('embedded document fetched')
                this.setState({
                    loading: 'done',
                    contents: "data:text/html;charset=utf-8," + response
                })
            },(response) =>{
                console.log(response.status)
            }
        )


    }

    handleChange = (e) =>{
        this.setState({html:e.target.value})
    };


    render(){
        return <ListGroupItem>
            <h4 className="list-group-item-heading"> {this.props.title}</h4>

            <Grid fluid style={{minHeight:'400px'}}>
                <Col sm={8} style={{}}>
                    <iframe style={{minHeight:'400px',float:'left', width:'100%'}} seamless='seamless' frameBorder={0} src={this.props.link}/>
                </Col>
                <Col sm={4}>
                    <h4>Noter</h4>
                    <ContentEditable html={this.state.html} onChange={this.handleChange}/>
                </Col>
            </Grid>

        </ListGroupItem>
    }

}
