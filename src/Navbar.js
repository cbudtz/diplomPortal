/**
 * Created by Christian on 30-03-2017.
 */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Navbar extends Component {
    user = "Christian";
    test(){
        alert("test");
        this.user="Brian";
        this.render();
    }
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome {this.user} to React with hot reload</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <div>
                    This could be some bootstrap text this is pretty good for development!
                </div>
                <div>
                    <button onClick={()=>this.test()} >Click here!</button>
                </div>
            </div>
        );
    }
}

export default Navbar;