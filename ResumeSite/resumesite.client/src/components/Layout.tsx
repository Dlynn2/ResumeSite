import React, { Component, ReactNode } from 'react';
// import '../css/Layout.css';
import NavMenu from './NavMenu';
import { Container } from '@mui/material';

interface LayoutProps {
  children?: ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
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

  render() {
    return (
      <>
        <NavMenu toggleDarkMode={this.props.toggleDarkMode} />
        <Container sx={{
          height: '100%', // Make the Container fill 100% of the parent's height
          width: '100%', // Make the Container fill 100% of the parent's width
          display: 'flex', // Use flex layout to allow children to fill the container
          flexDirection: 'column', // Stack children vertically
          padding: 0, // Remove padding to allow children to fill the container
        }}
        >
          {this.props.children}
        </Container>
      </>
    );
  }
}
