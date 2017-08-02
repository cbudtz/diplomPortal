/**
 * Created by Christian on 01-08-2017.
 */
import React, {Component} from 'react'
import {Checkbox, ControlLabel, Form, FormControl, FormGroup, Panel, Table} from "react-bootstrap";
import FieldGroup from "./FieldGroup";

export default class CourseAdminMain extends Component{

    render(){
        return <div>
            <h3>F17 02324 Videregående Programmering</h3>
            <Panel header={<h3>Administer brugere</h3>} className="panel-default">
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
                    <div className="panel-title">
                        <b>Tilføj ny bruger</b>
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
                            <FormControl type="email"/>
                        </FormGroup>

                        <Checkbox/>
                    </Form>
                    <Form>
                        <FieldGroup label="Upload CSV fil " type="file">
                        </FieldGroup>
                    </Form>
                </div>
            </Panel>
            <Panel header={<h3>Fremmøde</h3>}>
                <Table responsive hover>
                    <thead>
                    <th>Brugernavn</th>
                    <th>Navn</th>
                    <th className="rotate"><div><span>Lektion 1</span></div></th>
                    <th className="rotate"><div><span>Lektion 2</span></div></th>
                    <th className="rotate"><div><span>Lektion 3</span></div></th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>s134000</td>
                        <td>Christian Budtz</td>
                        <td width="20px"><input id="lek1" type="checkbox" defaultChecked={true}/><label htmlFor="lek1"> </label></td>
                        <td width="20px"><input id="lek2" type="checkbox" defaultChecked={true}/><label htmlFor="lek2"> </label></td>
                        <td width="20px"><input id="lek3" type="checkbox" defaultChecked={true}/><label htmlFor="lek3"> </label></td>
                    </tr>
                    </tbody>
                </Table>
            </Panel>
        </div>
    }

}