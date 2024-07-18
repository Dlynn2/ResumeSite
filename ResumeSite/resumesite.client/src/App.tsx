import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import IconBar from './components/IconBar/IconBar';
import { Layout } from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/custom.css';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline, GlobalStyles } from '@mui/material';

interface AppState {
  darkMode: boolean;
}

export default class App extends Component<{}, AppState> {
  static displayName = App.name;

  constructor(props: {}) {
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
    const { darkMode } = this.state;
    const lightPalette = {
      primary: {
        main: '#768687', // Light mode primary color
      },
      secondary: {
        main: '#700A07', // Light mode secondary color
      },
      background: {
        default: '#f5f5f5', // Light mode background color
        paper: '#ffffff', // Light mode paper color
      },
      text: {
        primary: '#000000', // Light mode primary text color
        secondary: '#575757', // Light mode secondary text color
      },
    };

    const darkPalette = {
      primary: {
        main: '#90caf9', // Dark mode primary color
      },
      secondary: {
        main: '#f48fb1', // Dark mode secondary color
      },
      background: {
        default: '#121212', // Dark mode background color
        paper: '#1e1e1e', // Dark mode paper color
      },
      text: {
        primary: '#ffffff', // Dark mode primary text color
        secondary: '#bbbbbb', // Dark mode secondary text color
      },
    };

    // Create a theme instance based on dark mode state
    const theme = createTheme({
      palette: this.state.darkMode ? darkPalette : lightPalette,
    });
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Provides a baseline CSS reset and also implements dark mode background */}
        <GlobalStyles
          styles={{
            ':root': {
              '--primary-color': theme.palette.primary.main,
              // Define other theme colors as needed
            },
          }}
        />
      <BrowserRouter>
          <Layout toggleDarkMode={this.toggleDarkMode} darkMode={darkMode}>
            <Routes>
              {AppRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} index={route.index} />
              ))}
            </Routes>
          </Layout>
          {/* Place IconBar and ToastContainer within the Layout component */}
          <IconBar toggleDarkMode={this.toggleDarkMode} darkMode={darkMode}/>
          <ToastContainer />
      </BrowserRouter>
      </ThemeProvider>

    );
  }
}