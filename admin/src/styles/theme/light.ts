import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
    typography: {
        button: {
            textTransform: "none",
        },
        fontSize: 14,
    },
    palette: {
        mode: "light",
        background: {
            paper: "#F9F9F9",
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
    // components: {
    //     MuiCard: {
    //         styleOverrides: {
    //             root: {
    //                 boxShadow: "0px 1px 3px rgba(0,0,0,0.06)",
    //             },
    //         },
    //     },
    //     MuiAccordion: {
    //         styleOverrides: {
    //             root: {
    //                 boxShadow: "0px 1px 3px rgba(0,0,0,0.06)",
    //             },
    //         },
    //     },
    // },
});

export default lightTheme;
