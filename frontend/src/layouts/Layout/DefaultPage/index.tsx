import { Container } from "@mui/material";
import { ReactNode } from "react";
import Sidebar from "../../../components/Sidebar";

interface DefaultPageProps {
    children: ReactNode;
}

const DefaultPage = ({ children }: DefaultPageProps) => {
    return (
        <Container
            maxWidth="xl"
            sx={{ display: "flex", flexDirection: "row", marginY: "40px" }}
        >
            <Sidebar />
            {children}
        </Container>
    );
};

export default DefaultPage;
