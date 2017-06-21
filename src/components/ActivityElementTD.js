/**
 * Created by Christian on 30-05-2017.
 */
import React, {Component, PropTypes} from 'react';


export default class ActivityElementTD extends Component {
    handleActivityElementClick = (e)=>{

        this.props.handleActivityElementClick(e,this.props.activityElement);

    };


    render() {
        console.log(this.props)
        if (this.props.activityElement.hyperLink) {

            return this.linkElement()
        } else {
            return (<td>{this.props.activityElement.title}</td>)
        }
    }


    linkElement() {
        return (<td>
            <a style={{cursor: "pointer"}} target="_blank" onClick={(e)=>this.handleActivityElementClick(e)} id={this.props.activityElement.hyperLink}>
                {this.props.activityElement.title}</a>
        </td>);
    }

}

ActivityElementTD.propTypes = {
    activityElement: PropTypes.shape({
        activityElementType: PropTypes.oneOf(['Link', 'Native', 'GoogleSheet', 'Text']),
        hyperLink: PropTypes.string,
        text: PropTypes.string,
        handleActivityElementClick: PropTypes.func
    })
}

