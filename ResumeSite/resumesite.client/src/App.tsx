import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SinglePageHome from './components/SinglePageHome';
import IconBar from './components/IconBar/IconBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { Layout } from './components/Layout';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
export function App() {
  async function getIpInfo(ip: string) {
    try {
      const response = await fetch(`/external/IpInfo?ip=${encodeURIComponent(ip)}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data; // This will be your IpInfoDto object
    } catch (error) {
      console.error('Error fetching IP info:', error);
      return null;
    }
  }

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // e.g., '2025-05-31'
    const lastSentDate = localStorage.getItem('ipInfoSentDate');

    if (lastSentDate === today) {
      // Already sent today, do nothing
      return;
    }
    // Get public IP address
    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => {
        if (data.ip) {
          getIpInfo(data.ip);
          localStorage.setItem('ipInfoSentDate', today);
        }
      })
      .catch((err) => {
        console.error('Error fetching public IP:', err);
      });
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <SinglePageHome />
      </Layout>
      <IconBar />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default function ToggleColorMode() {
  // Initialize mode from localStorage or default to 'dark'
  const [mode, setMode] = React.useState<'light' | 'dark'>(
    (localStorage.getItem('themeMode') as 'light' | 'dark') ||
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
    []
  );

  const lightPalette = {
    primary: { main: '#7c3aed', light: '#a855f7', dark: '#6d28d9' }, // Purple
    secondary: { main: '#f59e0b', light: '#fbbf24', dark: '#d97706' }, // Amber
    background: { default: '#fafaf9', paper: '#ffffff' },
    text: { primary: '#1c1917', secondary: '#78716c' },
  };

  const darkPalette = {
    primary: { main: '#a855f7', light: '#c084fc', dark: '#9333ea' }, // Light purple
    secondary: { main: '#fbbf24', light: '#fcd34d', dark: '#f59e0b' }, // Light amber
    background: { default: '#0c0a09', paper: '#1c1917' },
    text: { primary: '#fafaf9', secondary: '#a8a29e' },
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          ...(mode === 'dark' ? darkPalette : lightPalette),
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: { fontWeight: 800 },
          h2: { fontWeight: 700 },
          h3: { fontWeight: 700 },
          h4: { fontWeight: 600 },
          h5: { fontWeight: 600 },
          h6: { fontWeight: 500 },
        },
        shape: {
          borderRadius: 12,
        },
        shadows: [
          'none',
          '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.35)',
          '0 25px 50px -12px rgb(0 0 0 / 0.35)',
          '0 25px 50px -12px rgb(0 0 0 / 0.45)',
          '0 25px 50px -12px rgb(0 0 0 / 0.45)',
          '0 25px 50px -12px rgb(0 0 0 / 0.55)',
          '0 25px 50px -12px rgb(0 0 0 / 0.55)',
          '0 25px 50px -12px rgb(0 0 0 / 0.65)',
          '0 25px 50px -12px rgb(0 0 0 / 0.65)',
          '0 25px 50px -12px rgb(0 0 0 / 0.75)',
          '0 25px 50px -12px rgb(0 0 0 / 0.75)',
          '0 25px 50px -12px rgb(0 0 0 / 0.85)',
          '0 25px 50px -12px rgb(0 0 0 / 0.85)',
          '0 25px 50px -12px rgb(0 0 0 / 0.95)',
          '0 25px 50px -12px rgb(0 0 0 / 0.95)',
          '0 25px 50px -12px rgb(0 0 0 / 1)',
          '0 25px 50px -12px rgb(0 0 0 / 1)',
          '0 25px 50px -12px rgb(0 0 0 / 1)',
        ],
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />{' '}
        {/* Provides a baseline CSS reset and also implements dark mode background */}
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
