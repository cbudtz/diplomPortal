/**
 * Created by Christian on 30-05-2017.
 */
import React, {Component, PropTypes} from 'react';
import ActivityElementTD from "./ActivityElementTD";

export default class ActivityRow extends Component{
    handleActivityElementClick = (e, activityElement)=>{
        this.props.handleActivityElementClick(e, activityElement);
    };

    getActivityElements() {
        return this.props.activity.activityElementList.map((activityElement, index)=>{
            return <ActivityElementTD key={index} activityElement={activityElement} handleActivityElementClick={this.handleActivityElementClick}/>
        })
    }

    render(){
        const date = new Date(this.props.activity.endDate);
        var dateString = ''
        if (this.props.activity.endDate) {
            dateString = date.getDate();
            dateString += '/' + (date.getMonth() + 1);
            if(date.getUTCHours()!==0 || date.getUTCMinutes()!==0) {
                dateString += ' ' + date.getUTCHours();
                dateString += ':' + (date.getUTCMinutes().toString().length === 1 ? '0' : '');
                dateString += date.getUTCMinutes();
            }
        }
        var className = ''
        if (date < new Date()) {
            className += 'success '
        }
        if (this.props.activity.status==='DRAFT'){
            className += 'text-muted ';
        }
        return <tr className={className}>
            <td>{this.props.activity.title}</td>
            <td>{this.props.activity.description}</td>
            <td>{dateString}</td>
            {this.getActivityElements()}

        </tr>
    }



}

ActivityRow.propTypes = {
    activity : PropTypes.shape({
        title: PropTypes.string,
        endDate: PropTypes.any,
        description: PropTypes.string,
        status: PropTypes.oneOf(['VISIBLE','DRAFT', 'INVISIBLE']),
        activityElementList: PropTypes.array,
        handleActivityElementClick: PropTypes.func

    })
}
