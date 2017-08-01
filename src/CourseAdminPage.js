/**
 * Created by Christian on 01-08-2017.
 */

import React, {Component} from 'react'
import {Col, Grid, Row} from "react-bootstrap";
import CourseAdminMenu from "./components/CourseAdminMenu";
import CourseAdminMain from "./components/CourseAdminMain";

export default class CourseAdminPage extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return <Grid fluid>
            <Row>
                <Col md={3}>
                    <CourseAdminMenu/>
                </Col>
                <Col md={9}>
                    <CourseAdminMain/>
                </Col>
            </Row>
            </Grid>

    }
}