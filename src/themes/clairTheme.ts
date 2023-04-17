import { createTheme } from "@mui/material/styles";

export const clairTheme = createTheme({
  


  palette: {
    primary: {
      main: '#ffffff',
      light: '#fe9b19',
    },
    secondary: {
      main: '#fb6a22',
      light: '#c93028',
    },
    background: {
      default: '#f2f2f2',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: 'rgba(0,0,0,0.54)',
    },
    error: {
      main: '#EC1C0C',
    },
  },
});
