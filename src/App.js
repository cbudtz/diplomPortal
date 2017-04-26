import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Navbar.js';
import $ from 'jquery';

import {Navbar, Nav, NavItem,MenuItem,NavDropdown} from 'react-bootstrap';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            color: "hotpink",
            navbar:[
                {type:"NavItem",id:"F17/02324/0",text:"Agenda"},
                {type:"NavItem",id:"F17/02324/1",  text:"Kursus oversigt"},
                {type:"NavDropDown",id:"F17/02324/2",text:"Kurser",items:[
                    {type:"MenuItem",id:"0",text:"test"}
                    ]}
            ]
        }
    }
    test = (e) => {
        this.setState({
            color:"Yellow"
        })
    }
    getNavContent = () =>{
        var content = this.state.navbar.map((nav, no) =>{
            if(nav.type=="NavItem") {
               return <NavItem key={nav.id} eventKey={nav.id}>{nav.text}</ NavItem>
            } else {
                console.log(nav.items);
                var items = nav.items.map((item,no) =>{
                   return <MenuItem key={item.id}>{item.text}</MenuItem>
                })
                console.log(items)
                return <NavDropdown id={nav.id} title={nav.text}>
                    {items}
                </NavDropdown>
            }
        })
        return content;
    }
    handleNavSelect = (e) =>{
        this.setState({page:e})
        console.log(e);
    }

  render() {
      console.log(this.state);
    return (
      <div className="App">
          <div className="NavbarContainer">
              <Navbar>

                  <Navbar.Header>
                      <Navbar.Brand >
                          test
                      </Navbar.Brand>
                      <Navbar.Toggle/>
                  </Navbar.Header>
                  <Navbar.Collapse>
                  <Nav onSelect={this.handleNavSelect}>
                      {this.getNavContent()}
                  </Nav>
                  </Navbar.Collapse>
              </Navbar>
          </div>
        <div className="container">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome {this.state.color} {this.props.name} to React with hot reload</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <div>
              This could be some bootstrap text this is pretty good for development!
          </div>
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

export default App;
