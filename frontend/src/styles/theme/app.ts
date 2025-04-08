import { createTheme } from "@mui/material/styles";

const appTheme = createTheme({
    typography: {
        button: {
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1.5,
        },
    },
});

export default appTheme;
