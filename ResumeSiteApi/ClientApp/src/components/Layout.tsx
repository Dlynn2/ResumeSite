import React, { Component, ReactNode } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import '../css/Layout.css';

interface LayoutProps {
  children?: ReactNode;
}

interface LayoutState {
  darkMode: boolean;
}

export class Layout extends Component<LayoutProps, LayoutState> {
  static displayName = Layout.name;

  constructor(props: LayoutProps) {
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
      <div className={`full-width-layout ${this.state.darkMode ? 'dark-mode' : 'light-mode'}`}>
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
