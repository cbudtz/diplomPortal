/**
 * Created by Christian on 01-08-2017.
 */
import React, {Component} from 'react'
import {Glyphicon, Panel} from "react-bootstrap";

export default class CourseAdminMenu extends Component{

    render(){
        return <div>
            <Panel>
                    <div className="panel-title">Kursus Administration</div>
                <div className="panel-body">
                    <ul>
                        <li><a>F17 02324 Videregående programmering</a></li>
                        <a><Glyphicon glyph="plus"/> Nyt kursus</a>
                    </ul>
                </div>
            </Panel>
        </div>
    }
}