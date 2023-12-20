import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import '../css/Layout.css';
export class Layout extends Component {
  static displayName = Layout.name;

  constructor(props) {
    super(props);
    this.state = {
      darkMode: true,
    };
  }

  toggleDarkMode = () => {
    this.setState((prevState) => ({
      darkMode: !prevState.darkMode,
    }));
  };

  render() {
    return (
      <div className={this.state.darkMode ? 'dark-mode' : 'light-mode'}>
        <NavMenu 
        toggleDarkMode={this.toggleDarkMode}
        darkMode={this.state.darkMode}
        />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
