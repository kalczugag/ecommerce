import { Box, Button, Paper, Slide, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const COOKIE_NAME = "cookie_consent";

const CookieConsent = () => {
    const [cookies, setCookie] = useCookies([COOKIE_NAME]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!cookies[COOKIE_NAME]) {
            setOpen(true);
        }
    }, [cookies]);

    const handleAccept = () => {
        const maxAge = 60 * 60 * 24 * 150;
        setCookie(COOKIE_NAME, true, { path: "/", maxAge });
        setOpen(false);
    };

    return (
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Box
                sx={{
                    position: "fixed",
                    bottom: 24,
                    left: 0,
                    right: 0,
                    zIndex: 1300,
                    display: "flex",
                    justifyContent: "center",
                    pointerEvents: "none",
                }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        pointerEvents: "auto",
                        maxWidth: "md",
                        width: "100%",
                        mx: 2,
                        px: 3,
                        py: 2,
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="body2" sx={{ mb: { xs: 1, sm: 0 } }}>
                        This website uses cookies to improve your experience.
                    </Typography>
                    <Button variant="contained" onClick={handleAccept}>
                        Accept
                    </Button>
                </Paper>
            </Box>
        </Slide>
    );
};

export default CookieConsent;
