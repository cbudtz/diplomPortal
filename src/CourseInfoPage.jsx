/**
 * Created by Christian on 31-07-2017.
 */
import React, {Component, PropTypes} from 'react';
import {Grid, Well} from "react-bootstrap";

export default class CourseInfoPage extends Component{
    constructor(props){
        super();
    }
    generateList = ()=>{
        let infoMap =
            [{left:"KursusAnsvarlig", right:"Stig Høgh , Lyngby Campus, Bygning 303B, Tlf. (+45) 4525 5239 , shog@dtu.dk Finn Gustafsson , Tlf. , figu@dtu.dk"},
                {left:"Skemaplacering", right:"F2A (man 13-17) og Juni"},
                {left:"Eksamensdato", right:"Kommer"},
                {left:"Kursusmål",right:'En studerende, der fuldt ud har opfyldt kursets mål, vil kunne:<br> Redegøre for væsentlige dele af API’et, samt dets anvendelsesområder Konstruere stand-alone applikationer af en vis komplexitet Konstruere webapplikationer af en vis kompleksitet'},
                {left:"Kursusindhold", right:"....."}
            ]

        var content =  (<dl className="dl-horizontal">
            {infoMap.map((info, index)=>{
                return <span key={index}><dt>{info.left}</dt><dd dangerouslySetInnerHTML={{__html:info.right}}></dd></span>
            })
            }
        </dl>)
        return content;


    };

    render() {
        return <Grid>
            <Well>
                <h4>test</h4>
                <hr/>
                {this.generateList()}
            </Well>
        </Grid>

    }
}
CourseInfoPage.propTypes = {
    infoMap: PropTypes.arrayOf(React.PropTypes.shape({
            left: React.PropTypes.String,
            right: React.PropTypes.String
        }
    ))
}