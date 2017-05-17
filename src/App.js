import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import TopMenu from './TopMenu.js'
import Agenda from './Agenda.js'
import JwtHandler from './jwthandler';


export default class App extends Component {
    constructor(props){
        super(props);
        const user = JwtHandler.getUser();
        this.state = {
            user: user,
            navbar:[
                {type:"NavDropDown",id:0,text:"F17 02324 Videregående Programmering",items:[
                    {type:"MenuItem",id:1,text:"F17 62577 Datakommunikation"},
                    {type:"MenuItem",id:2,text:"Gamle Kurser"},
                    {type:"MenuItem",id:3,text:"Andre Kurser"}
                ]},
                {type:"NavItem",id:{period:"F17",course:"02324",component:"Agenda"},text:"Agenda"},
                {type:"NavItem",id:"F17/02324/KursusOversigt",  text:"Kursus oversigt"},
                {type:"NavItem",id:"F17/02324/Pensum", text:"Pensum"},
                {type:"NavItem",id:"F17/02324/Forum", text:"Forum"},

            ],
            avatar: {id:"s134000"},
            pages : {
                0:{period:"F17",course:"02324",component:"Agenda"},
                1:{period:"F17", course:"02324", component:"" }
            },
            activePage: {period:"F17",course:"02324",component:"Agenda"}
        }
    }
    test = (e) => {
        this.setState({
            color:"Yellow"
        })
    }

    onMenuSelect = (e)=>{
        console.log("got selection");
        console.log(e)
        this.setState({activePage:e})
    }

  render() {
        console.log("main state:")
      console.log(this.state);
    return (
      <div className="App">

          <TopMenu menuItems={this.state.navbar} avatar={this.state.avatar} activeId="F17/02324/Agenda" onSelect={this.onMenuSelect}/>

            <Agenda course={{courseId: "02324F17", courseName:"Videregående programmering"}} apiUrl={this.props.apiUrl}/>
          <img src={logo} className="App-logo" alt="logo" />


          <div>
              <button onClick={this.test.bind(this)} >Click here!</button>
              <button onClick={()=>$('#test').html('Test')}>click me</button>
          </div>
          <div id="test">


          </div>
      </div>
    );
  }
}

App.propTypes = {
    apiUrl : React.PropTypes.string
}
App.defaultProps = {
    apiUrl: '' //for deployment at same root
}
