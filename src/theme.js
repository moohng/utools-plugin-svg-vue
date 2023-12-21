import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e06c75',
    },
    error: {
      main: '#e06c75',
    },
    // action: {
    //   disabled: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#e9c4d0' : 'rgba(0, 0, 0, 0.26)',
    // },
  },
});

export default theme;
