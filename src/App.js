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
            color: "hotpink"
        }
    }
    test(){
        this.setState({
            color:"Yellow"
        })
    }

  render() {
      console.log(this.state);
    return (
      <div className="App">
          <div className="NavbarContainer">
              <Navbar>
                  <Navbar.Header>
                      Test
                  </Navbar.Header>
              </Navbar>
          </div>
        <div className="App-header">
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
