import { Container } from "@mui/material";
import { ReactNode } from "react";
import SortBar from "../../components/SortBar";

interface DefaultPageProps {
    children: ReactNode;
    pagination?: JSX.Element;
}

const DefaultPage = ({ children, pagination }: DefaultPageProps) => {
    return (
        <Container
            maxWidth="xl"
            sx={{ display: "flex", flexDirection: "column", marginY: "40px" }}
        >
            <SortBar />
            <div className="flex flex-col">
                <div className="flex flex-row">{children}</div>
                {pagination}
            </div>
        </Container>
    );
};

export default DefaultPage;
