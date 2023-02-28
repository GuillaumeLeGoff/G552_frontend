import { blue, pink } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
/*
couleurs STRAMATEL :

GRIS : #31434f
BORDEAU : #982d23
ROUGE : #c93028
ORANGE : #fb6a22
JAUNE : #fe9b19


 */
export const appTheme = createTheme({
    palette: {
        primary: {
          main: '#203038',
        },
        secondary: {
          main: '#2b646f',
        },
        background: {
          default: '#172228',
          paper: '#203038',
        },
        text: {
          primary: 'rgba(255,255,255,0.87)',
          secondary: 'rgba(173,171,171,0.5)',
        },
        error: {
          main: '#EC1C0C',
        },
      },
});