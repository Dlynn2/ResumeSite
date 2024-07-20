import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import IconBar from './components/IconBar/IconBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/custom.css';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { Layout } from './components/Layout';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} index={route.index} />
          ))}
        </Routes>
        {/* Place IconBar and ToastContainer within the Layout component */}
      </Layout>
      <IconBar />
      <ToastContainer />
    </BrowserRouter>

  );
}

export default function ToggleColorMode() {
  // Initialize mode from localStorage or default to 'dark'
  const [mode, setMode] = React.useState<'light' | 'dark'>(
    localStorage.getItem('themeMode') as 'light' | 'dark' ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  React.useEffect(() => {
    // Persist mode to localStorage on change
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const lightPalette = {
    primary: {
      main: '#264653', // Light mode primary color
    },
    secondary: {
      main: '#2A9D8F', // Light mode secondary color
    },
    background: {
      default: '#E4E2DB', // Light mode background color
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
      main: '#823883', // Dark mode secondary color
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

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          ...(mode === 'dark' ? darkPalette : lightPalette),
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Provides a baseline CSS reset and also implements dark mode background */}
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}