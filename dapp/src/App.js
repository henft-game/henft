import React from 'react';
import Web3Provider from './providers/Web3Provider';
import Application from './pages/Application';

import "@fontsource/press-start-2p";

import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Press Start 2P', sans-serif",
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Web3Provider>
        <Application />
      </Web3Provider>
    </ThemeProvider>
  );
}

export default App;
