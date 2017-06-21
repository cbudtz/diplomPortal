import React, {Component, PropTypes} from 'react';
import {Table} from "react-bootstrap";
import Rip from '../rest/Rip'
import ActivityRow from "./ActivityRow";
import ripple from '../ripple.svg';

export default class AgendaTable extends Component {
    constructor(props) {
        super(props);
        this.fetchCoursePlan();
        this.state = {
            coursePlan: {courseActivityList:[{activityElementList:[]}]},
            loading :true
        }
    }

    fetchCoursePlan = () => {
        Rip.get(this.props.courseplanUrl,(json)=>{
           this.setState({coursePlan:json, loading:"done"})
        }, (error)=>{
            console.log(error);
            this.setState({loading:"fail"})
        })
    }
    handleActivityElementClick = (e, activityElement)=>{
        this.props.handleActivityElementClick(e, activityElement);
    };

    getHeaderLine() {
         const activityElementCount = this.state.coursePlan.courseActivityList[0].activityElementList.length;

        return <thead><tr>
            <th>Aktivitet</th>
            <th>Emner</th>
            <th>Tid</th>
            <th colSpan={activityElementCount}>Materiale</th>

        </tr></thead>
    }


    getActivities() {
        return this.state.coursePlan.courseActivityList.map((activity, index)=>{
            return <ActivityRow key={index} activity={activity} handleActivityElementClick={this.handleActivityElementClick}/>
        })
    }




    render() {
        console.log(this.state)
        if (this.state.loading===true){
            return (<Table>
                <tbody><tr><td><img src={ripple} alt="loading..."/></td></tr></tbody>
            </Table>)
        } else if (this.state.loading==="done") {
            return (
                <Table responsive hover>

                    {this.getHeaderLine()}
                    <tbody>
                    {this.getActivities()}
                    </tbody>


                </Table>
            )
        } else {
            return (<Table><tbody><tr><td>Load failed!</td></tr></tbody></Table>)
        }



    }


}

AgendaTable.propTypes = {
    courseplanUrl: PropTypes.string.isRequired,
    user: PropTypes.string,
    handleActivityElementClick: PropTypes.func

}
AgendaTable.defaultProps = {}