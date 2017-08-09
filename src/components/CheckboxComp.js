/**
 * Created by Christian on 03-08-2017.
 */

import React,{Component, PropTypes} from 'react'

export default class CheckboxComp extends Component{
    constructor(props){
        super(props);
        this.state = {
            uuid: Math.floor(Math.random()*1000000000)
        }
    }
    handlecheck = (e)=>{
        console.log("ChekingBox: " + !this.props.checked)
        this.props.onCheck(!this.props.checked, this.props.id)
    };

    render() {
        return <span>
            <input id={this.state.uuid} type="checkbox" checked={this.props.checked} onChange={this.handlecheck}/><label htmlFor={this.state.uuid}> </label>

        </span>
    }
}

CheckboxComp.propTypes = {
    checked: PropTypes.bool,
    onCheck: PropTypes.func
}

CheckboxComp.defaultProps = {
    checked: false,
    onCheck: ()=>{console.log('CheckbocComp: onCheck not set')}

}