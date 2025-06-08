import { ReactNode } from "react";
import { Box, Container } from "@mui/material";
import Header from "@/components/Header";
import NavLinksMenu from "@/components/NavLinksMenu";
import { navLinks } from "@/constants/sidebarLinksConfig";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                overflow: { md: "hidden" },
            }}
        >
            <NavLinksMenu links={navLinks} fontSize="small" />
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                }}
            >
                <Header />
                <Box sx={{ flex: 1, overflow: "auto" }}>
                    <Container maxWidth="xl" sx={{ pt: { xs: 8, md: 0 } }}>
                        {children}
                    </Container>
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
