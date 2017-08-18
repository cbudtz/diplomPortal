/**
 * Created by Christian on 07-04-2017.
 */
import React, {Component, PropTypes} from 'react';
import {Row, Col, Grid, Button, FormGroup, ControlLabel, FormControl, Form} from 'react-bootstrap';

export default class ProfilePage extends Component {

    constructor(props){
        super();
        this.state={
            firstName:props.user.firstName,
            lastName:props.user.lastName,
            email:props.user.email
        }



    }
    updateUserBtnPressed = ()=>{
        let updatedUser= this.props.user;
        updatedUser.firstName = this.state.firstName;
        updatedUser.lastName = this.state.lastName;
        updatedUser.email = this.state.email;
        this.props.updateUser(updatedUser);
    };
    resetForm = ()=>{
        this.setState({
            firstName:this.props.user.firstName,
            lastName:this.props.user.lastName,
            email:this.props.user.email
        })
    };
    render(){
        return <Grid>
            <Row>
                <Col xsOffset={3} xs={6} className="text-center">
                    <Form >
                        <FormGroup>
                            <ControlLabel>Fornavn</ControlLabel>
                            <FormControl type="text" value={this.state.firstName} onChange={(e)=>this.setState({firstName:e.target.value})}>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Efternavn</ControlLabel>
                            <FormControl type="text" value={this.state.lastName} onChange={(e)=>this.setState({lastName:e.target.value})}>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl type="text" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}>
                            </FormControl>
                        </FormGroup>
                    </Form>
                    <Button onClick={this.updateUserBtnPressed}>Opdater Bruger</Button>
                    <Button onClick={this.resetForm}>Reset</Button>
                </Col>
            </Row>
        </Grid>
    }
}

ProfilePage.proptypes={
    updateUser: PropTypes.func,
    user: PropTypes.shape({
        firstName:PropTypes.string,
        lastName:PropTypes.string,
        email:PropTypes.string
    })
}