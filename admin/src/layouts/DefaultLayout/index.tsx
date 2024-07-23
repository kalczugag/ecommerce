import { Container } from "@mui/material";
import { ReactNode } from "react";

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <Container
            maxWidth="xl"
            sx={{ display: "flex", flexDirection: "column", marginY: "40px" }}
        >
            {children}
        </Container>
    );
};

export default DefaultLayout;
