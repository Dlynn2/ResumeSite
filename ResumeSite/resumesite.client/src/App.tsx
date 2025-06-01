import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import IconBar from './components/IconBar/IconBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { Layout } from './components/Layout';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
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
      .then(res => res.json())
      .then(data => {
        if (data.ip) {
          getIpInfo(data.ip);
          localStorage.setItem('ipInfoSentDate', today);
        }
      })
      .catch(err => {
        console.error('Error fetching public IP:', err);
      });
  }, []);


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
    primary: { main: '#7c3aed' },     // Purple
    secondary: { main: '#f59e0b' },   // Amber
    background: { default: '#fafaf9', paper: '#ffffff' },
    text: { primary: '#1c1917', secondary: '#78716c' },
  };

  const darkPalette = {
    primary: { main: '#a855f7' },     // Light purple
    secondary: { main: '#fbbf24' },   // Light amber
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