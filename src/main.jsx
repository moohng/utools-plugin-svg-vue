import * as React from 'react'
import { createRoot } from 'react-dom/client';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { ThemeProvider } from '@mui/material';
import './style.css'
import App from './App'
import theme from './theme';

if (typeof utools === 'undefined') {
  window.utools = {
    showNotification: (text, options) => useSnackbar().enqueueSnackbar(text),
  }
}

const root = createRoot(document.getElementById('app'));

root.render(
  <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={2000}>
      <App />
    </SnackbarProvider>
  </ThemeProvider>
);
