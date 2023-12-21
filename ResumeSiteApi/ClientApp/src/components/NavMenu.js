import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './../css/NavMenu.css';
import sunIcon from './../images/Sun-Icon.png';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { toggleDarkMode, darkMode } = this.props;
    return (
      <header>
        <Navbar className={`navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 ${darkMode ? 'navbar-dark' : 'navbar-light'}`} container light>
          <NavbarBrand tag={Link} to="/">Dylan Lynn</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <Button className="light-mode-button" onClick={toggleDarkMode}>
              <img className="light-mode-icon" src={sunIcon} alt="Light Mode Icon" />
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/inspiration">Inspirations</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/experience">Experience</NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
