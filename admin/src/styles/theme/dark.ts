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

export default darkTheme;
