/**
 * Created by Christian on 01-08-2017.
 */

import React, {Component, PropTypes} from 'react'
import {Col, Grid, Panel, Row, Table} from "react-bootstrap";
import Rip from './rest/Rip'

export default class PortalAdminPage extends Component {

    constructor(props){
        super(props);
        this.getUsers();

    }

    getUsers = ()=>{
        Rip.getJson(this.props.apiUrl + '/users', (json)=>{
            console.log("PortalAdminPage: ")
            console.log(json);
        })
    }
    render(){
        return <Grid fluid>
            <Row>
                <Col>
                    <Panel header={<h3>Fremmøde</h3>}>
                        <Table responsive hover>
                            <thead>
                            <tr>
                                <th>Brugernavn</th>
                                <th>Navn</th>
                                <th><div><span>KursusAdministrator</span></div></th>
                                <th><div><span>Portal Administrator</span></div></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>s134000</td>
                                <td>Christian Budtz</td>
                                <td width="20px"><input id="lek1" type="checkbox" defaultChecked={true}/><label htmlFor="lek1"> </label></td>
                                <td width="20px"><input id="lek2" type="checkbox" defaultChecked={true}/><label htmlFor="lek2"> </label></td>
                            </tr>
                            </tbody>
                        </Table>
                    </Panel>
                </Col>

            </Row>
        </Grid>

    }
}

PortalAdminPage.proptypes={
    apiUrl: PropTypes.string
}