import { createTheme } from "@mui/material";
import '@fontsource/montserrat'; 


// Create a theme instance
const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#FF5722',
        },
        background:{
            default: '#f5f5f5',
        },
        text: {
            primary: '#333333',
            secondary: '#4CAF50',
        }
    },
    typography: {
        fontFamily:'Montserrat, sans-serif',
    },
});

export default theme;