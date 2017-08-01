/**
 * Created by Christian on 01-08-2017.
 */
import React, {Component} from 'react'
import {Checkbox, ControlLabel, Form, FormControl, FormGroup, Panel, Table} from "react-bootstrap";

export default class CourseAdminMain extends Component{

    render(){
        return <div>
            <h3>F17 02324 Videregående Programmering</h3>
            <Panel>
                <div className="panel-title">Administrer Brugere</div>
                <div className="panel-body">
                    <Table responsive hover>
                        <thead>
                        <th>Brugernavn</th>
                        <th>Navn</th>
                        <th>E-mail</th>
                        <th colSpan={3}>Roller</th>
                        </thead>
                        <tbody>
                        <tr>
                            <td>s134000</td>
                            <td>Christian Budtz</td>
                            <td>chrbudtz@gmail.com</td>
                            <td>Studerende <input id="stud" type="checkbox" defaultChecked={true}/><label htmlFor="stud"> </label></td>
                            <td>Hjælpelærer <input id="ta" type="checkbox" defaultChecked={true}/><label htmlFor="ta"> </label></td>
                            <td>Kursusadministrator <input id="admin" type="checkbox" defaultChecked={true}/><label htmlFor="admin"> </label></td>
                        </tr>
                        </tbody>
                    </Table>
                    <div>
                        Tilføj ny bruger
                    </div>
                    <Form inline>
                        <FormGroup>
                            <ControlLabel>BrugerNavn </ControlLabel>
                            <FormControl type="text"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Navn </ControlLabel>
                            <FormControl type="text"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>E-mail </ControlLabel>
                            <FormControl type="text"/>
                        </FormGroup>

                        <Checkbox/>
                    </Form>
                </div>
            </Panel>
        </div>
    }

}