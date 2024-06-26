import React from 'react';
import { HashRouter, BrowserRouter } from "react-router-dom";
import Web3Provider from './providers/Web3Provider';
import Application from './pages/Application';

import "@fontsource/press-start-2p";

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Press Start 2P', sans-serif",
  },
  palette: {
    primary: {
      main: '#61422D'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 1024,
      lg: 1400,
      xl: 1700,
      xxl: 2560,
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      {process.env.REACT_APP_USE_HASH_ROUTER === 'true' ?
        <HashRouter>
          <Web3Provider>
            <Application />
          </Web3Provider>
        </HashRouter>
        :
        <BrowserRouter>
          <Web3Provider>
            <Application />
          </Web3Provider>
        </BrowserRouter>}
    </ThemeProvider>
  );
}

export default App;
