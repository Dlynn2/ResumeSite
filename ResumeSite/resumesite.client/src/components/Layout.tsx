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
            minHeight: 'calc(100vh - 75px)', // Use calc to subtract navbar height
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            pt: { xs: '56px', sm: '75px' },
          }}
        >
          {this.props.children}
        </Container>
      </>
    );
  }
}
