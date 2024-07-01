import { Container } from "@mui/material";
import { ReactNode } from "react";

interface DefaultPageProps {
    children: ReactNode;
}

const DefaultPage = ({ children }: DefaultPageProps) => {
    return (
        <Container maxWidth="xl" sx={{ marginY: "40px" }}>
            {children}
        </Container>
    );
};

export default DefaultPage;
