import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
    typography: {
        button: {
            textTransform: "none",
        },
    },
    palette: {
        mode: "dark",
        background: {
            paper: "#28292B",
        },
        text: {
            primary: "#E5E5E5",
        },
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#28292B",
        },
    },
});

export default darkTheme;
