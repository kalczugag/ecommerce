import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
    palette: {
        mode: "light",
        background: {
            paper: "#FFFFFF",
        },
        text: {
            primary: "#28292B",
        },
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#dc004e",
        },
    },
});

export default lightTheme;
