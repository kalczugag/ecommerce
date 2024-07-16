import { Container } from "@mui/material";
import { ReactNode } from "react";
import SortBar from "../../components/SortBar";

interface DefaultPageProps {
    children: ReactNode;
}

const DefaultPage = ({ children }: DefaultPageProps) => {
    return (
        <Container
            maxWidth="xl"
            sx={{ display: "flex", flexDirection: "column", marginY: "40px" }}
        >
            <SortBar />
            <div className="flex flex-row">{children}</div>
        </Container>
    );
};

export default DefaultPage;
