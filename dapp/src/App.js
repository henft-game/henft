import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Web3Provider from './providers/Web3Provider';
import Application from './pages/Application';

import "@fontsource/press-start-2p";

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Press Start 2P', sans-serif",
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
      <BrowserRouter>
        <Web3Provider>
          <Application />
        </Web3Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
