import { blue, pink } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

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