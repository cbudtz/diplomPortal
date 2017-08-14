/**
 * Created by Christian on 01-08-2017.
 */
import React, {Component, PropTypes} from 'react'
import {
    Button, Checkbox, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Panel,
    Table
} from "react-bootstrap";
import CheckboxComp from "./CheckboxComp";
import EditableHeadLine from "./EditableHeadLine";
import EditableText from "./EditableText";
import ripple from '../ripple.svg'

export default class CourseAdminMain extends Component{

    constructor(){
        super();
        this.state={
            email:'',
            name: '',
            userName: '',
            csv: '',
            sheetBox: ''
        }

    }
    handlesheetBoxChange= (event)=>{
        this.setState({sheetBox:event.target.value})
    }

    handleUsesGoogleSheet = (checked) =>{
        this.props.usesGoogleSheet(checked);
    };


    handleUserSubmit = (event)=>{
        this.props.newUserAdded(this.state.userName, this.state.name, this.state.email)
        event.preventDefault();
    };
    handleEmailChange = (e)=>{
        this.setState({
            email: e.target.value
        })
    };
    handleUserNameChange = (e)=>{
        this.setState({
            userName:e.target.value
        })
    }
    handleNameChange = (e)=>{
        this.setState({
            name: e.target.value
        })
    }

    handleCSVChange = (e)=>{
    this.setState({csv: e.target.value
        })
    }

    handleCSVSubmit = (e)=>{
        e.preventDefault();
        this.props.newUserCSVSubmitted(this.state.csv)
}
    newShortAndTitle = (short, name)=>{
        console.log('got new short and title:')
        console.log(short + name)
        this.props.newShortAndTitle(short, name);
    };

    newGoogleSheetId = (id)=>{
        this.props.newGoogleSheetId(id);
    };

    generateUsertableBody(){
        if (this.props.users ==null) return <tr/> //Intentional type coecion from null to string
        let contents =
        this.props.users.map((user)=>{
            return <tr key={user.id}>
                <td>{user.userName}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td><CheckboxComp checked={user.admin} id={user.id} onCheck={(value, id)=>this.props.roleChecked(id,'admin', value)}/></td>
                <td><CheckboxComp checked={user.ta} id={user.id} onCheck={(value, id)=>this.props.roleChecked(id,'ta', value)}/></td>
                <td><CheckboxComp checked={user.student} id={user.id} onCheck={(value, id)=>this.props.roleChecked(id,'student', value)}/></td>
            </tr>
        })
        return contents;
    }


    render(){
        if (this.loading==="failed")
            return (<div>Load failed</div>)
        else {
            let shortHand = 'Indtast Kursus ID'
            if (this.props.course && this.props.course.courseShortHand!==null) {
                shortHand = this.props.course.courseShortHand;
            }
            let courseName = '';
            if (this.props.course){
                courseName= this.props.course.courseName;
            }
            let usesGoogleSheet= false;
            if(this.props.course){
                usesGoogleSheet=(this.props.course.coursePlanSource==="GoogleSheet");
            }
            let googleSheetId = ''
            if(this.props.course){
                googleSheetId= this.props.course.googleSheetPlanId;
            };
            return <div>
                <EditableHeadLine shortHand={shortHand} courseName={courseName} newInput={this.newShortAndTitle} />
                <Panel header={<h3>Kursusplan</h3>} className="panel-default">
                    <div className="panel-body">
                        <Form inline>
                        <FormGroup>
                            <ControlLabel>Google Sheet Id: </ControlLabel>
                            <EditableText text={googleSheetId} newInput={(sheetId)=>this.newGoogleSheetId(sheetId)}/>
                        </FormGroup>

                            <br/>
                                Anvend googleSheet til KursusPlan: <CheckboxComp onCheck={this.handleUsesGoogleSheet} checked={usesGoogleSheet}/>
                        </Form>
                        <Button onClick={()=>this.props.syncCoursePlan()}  disabled={this.props.syncing}>
                            {this.props.syncing ? <span>Synkroniserer kursusplan</span> :
                            <span>Synkronisér Kursusplan</span>}</Button>
                        {this.props.syncing && <img src={ripple} alt="loading"/>}
                        {this.props.syncError && <div>{this.props.syncError}</div>}
                    </div>
                </Panel>
                <Panel header={<h3>Administer brugere</h3>} className="panel-default">
                    <div className="panel-body">
                        <Table responsive hover>
                            <thead>
                            <tr>
                                <th>Brugernavn</th>
                                <th>Navn</th>
                                <th>E-mail</th>
                                <th>Administrator</th>
                                <th>Hjælpelærer</th>
                                <th>Studerende</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateUsertableBody()}
                            </tbody>
                        </Table>
                        <div className="panel-title">
                            <b>Tilføj ny bruger</b>
                        </div>
                        <Form inline onSubmit={this.handleUserSubmit}>
                            <FormGroup>
                                <ControlLabel>BrugerNavn </ControlLabel>
                                <FormControl value={this.state.userName} onChange={this.handleUserNameChange}type="text"/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Navn </ControlLabel>
                                <FormControl value={this.state.name} onChange={this.handleNameChange}type="text"/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>E-mail </ControlLabel>
                                <FormControl value={this.state.email} onChange={this.handleEmailChange} type="email"/>
                            </FormGroup>
                            <Checkbox/>
                            <Button type="submit">Opret bruger</Button>
                        </Form>
                        <Form>
                            <FormGroup>
                                <ControlLabel>
                                    {this.props.label}
                                </ControlLabel>
                                <FormControl label="Batch-tilføj brugere som csv" type="textarea" componentClass="textarea" rows="4" onChange={this.handleCSVChange}></FormControl>
                                <HelpBlock>Tilføj enten brugeres campusnet-id kommasepareret, eller csv downloaded fra campusnet</HelpBlock>
                            </FormGroup>
                            <Button onClick={this.handleCSVSubmit}>Tilføj brugere</Button>
                        </Form>

                    </div>
                </Panel>
                <Panel header={<h3>Fremmøde</h3>}>
                    <Table responsive hover>
                        <thead>
                        <tr>
                            <th>Brugernavn</th>
                            <th>Navn</th>
                            <th className="rotate"><div><span>Lektion 1</span></div></th>
                            <th className="rotate"><div><span>Lektion 2</span></div></th>
                            <th className="rotate"><div><span>Lektion 3</span></div></th>
                        </tr>
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


}

CourseAdminMain.propTypes = {
    course: PropTypes.shape({courseName: PropTypes.string,
        courseShortHand: PropTypes.string,
        googleSheetPlanId: PropTypes.string,
    }),
    users : PropTypes.array,
    roleChecked: PropTypes.func,
    newUserAdded: PropTypes.func,
    newUserCSVSubmitted: PropTypes.func,
    newShortAndTitle: PropTypes.func,
    usesGoogleSheet: PropTypes.func,
    newGoogleSheetId: PropTypes.func,
    syncError: PropTypes.any,
    syncCoursePlan: PropTypes.func,
    syncing: PropTypes.any


}

CourseAdminMain.defaultProps = {
    course: {}
}