import { Component, ReactNode } from 'react';
import NavMenu from './NavMenu';
import { Container } from '@mui/material';

interface LayoutProps {
  children?: ReactNode;
}

export class Layout extends Component<LayoutProps> {
  static displayName = Layout.name;

  constructor(props: LayoutProps) {
    super(props);
  }

  render() {
    return (
      <>
        <NavMenu />
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            margin: 0,
            pt: 0,
            backgroundColor: 'transparent',
          }}
        >
          {this.props.children}
        </Container>
      </>
    );
  }
}
