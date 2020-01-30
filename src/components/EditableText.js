/**
 * Created by Christian on 06-08-2017.
 */
/**
 * Created by Christian on 05-08-2017.
 */
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Glyphicon} from "react-bootstrap";

export default class EditableHeadLine extends Component{
    handleGlyphClick(event){
        let editmode = !this.state.editmode;
        this.setState({editmode:editmode, text:this.props.text})
    };

    handleGlyphOkClick(event){
        this.props.newInput(this.state.text);
        this.setState({editmode:false})
    }
    constructor(props){
        super(props);
        this.state = {
            editmode:false,
            text: '',
        }
    }

    handleTextChage(e) {
        this.setState({
            text: e.target.value
        })
    }

    render(){
        if(this.state.editmode){
            return <span>
                <input type="text" value={this.state.text} onChange={(e)=>this.handleTextChage(e)}/>
                <a onClick={(e)=>{this.handleGlyphOkClick(e)}}><Glyphicon glyph="ok" /></a>
                <a onClick={(e)=>{this.handleGlyphClick(e)}}><Glyphicon glyph="remove"/></a>
            </span>
        } else {
            return <span><span>{this.props.text} </span><a onClick={(e)=>{this.handleGlyphClick(e)}}><Glyphicon glyph="pencil"/></a></span>
        }

    }


}

EditableHeadLine.propTypes = {
    text: PropTypes.string,
    newInput: PropTypes.func
}
