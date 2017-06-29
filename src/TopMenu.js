/**
 * Created by Christian on 02-05-2017.
 */
import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Config from "./config";

export default class TopMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {active: props.activeId}
    };

    handleAvatarClick = (eventKey) => {

        if(this.props.avatar.id){
            if(eventKey===0.1){
                this.props.onLogout()
            }
        } else {
            //Send User to CampusnetLogin
            const redirectUrl = Config.ApiPath ? Config.ApiPath + Config.campusNetServiceUrl : Config.campusNetServiceUrl;
            location.replace(redirectUrl)
        }
    };


    handleNavSelect = (eventKey) => {
        this.setState({active: eventKey})
        this.props.onSelect(eventKey);
    };

    getUserMenu = (e)=> {
        if (this.props.avatar.id){
            return <NavDropdown id="avatarDropDown" eventKey={0} title={this.props.avatar.id}>
                <NavItem id="avatarLogout" eventKey={0.1}>Logout</NavItem>
            </NavDropdown>
        } else {
            return <NavItem>
                Login
            </NavItem>
        }
    }

    getNavContent = () => {
        var content = this.props.menuItems.map((nav, no) => {
            if (nav.type === "NavItem") {
                return <NavItem key={nav.id} eventKey={nav.id}
                                active={this.state.active === nav.id}>{nav.text}</ NavItem>
            } else if (nav.type === "NavDropDown") {
                var items = nav.items.map((item, no) => {
                    return (<MenuItem key={item.id} eventKey={item.id}>{item.text}</MenuItem>)
                })
                return (<NavDropdown key={nav.id} id={nav.id} title={nav.text}>
                    {items}
                </NavDropdown>)
            } else if (nav.type === "Avatar") {
                return (<NavItem pullRight={true}>Avatar</NavItem>)
            } else {
                return <div>wrong type</div>
            }
        })
        return content;
    }

    render() {
        console.log(this.props.avatar)
        return <div className="NavbarContainer">
            <Navbar className="navbar-fixed-top" fluid>
                <Navbar.Header>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav onSelect={this.handleNavSelect}>
                        {this.getNavContent()}
                    </Nav>
                    <Nav onSelect={this.handleAvatarClick} pullRight>
                            {this.getUserMenu()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    }


}