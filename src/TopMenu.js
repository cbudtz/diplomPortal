/**
 * Created by Christian on 02-05-2017.
 */
import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

export default class TopMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {active: props.activeId}
    };

    handleAvatarClick = (e) => {

    };


    handleNavSelect = (e) => {

        this.setState({active: e})
        this.props.onSelect(e);
    };
    getNavContent = () => {
        var content = this.props.menuItems.map((nav, no) => {
            if (nav.type === "NavItem") {
                return <NavItem key={nav.id} eventKey={nav.id}
                                active={this.state.active === nav.id}>{nav.text}</ NavItem>
            } else if (nav.type === "NavDropDown") {
                //console.log(nav.items);
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
            <Navbar>

                <Navbar.Header>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav onSelect={this.handleNavSelect}>
                        {this.getNavContent()}
                    </Nav>
                    <Nav onSelect={this.handleAvatarClick} pullRight>
                        <NavItem>
                            {this.props.avatar ? this.props.avatar.id : "Login"}
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    }
}