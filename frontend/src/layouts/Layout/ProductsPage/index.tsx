import { Container } from "@mui/material";
import { ReactNode } from "react";
import Sidebar from "../../../components/Sidebar";
import SortBar from "../../../components/SortBar";

interface DefaultPageProps {
    data?: any;
    children: ReactNode;
}

const DefaultPage = ({ children, data }: DefaultPageProps) => {
    return (
        <Container
            maxWidth="xl"
            sx={{ display: "flex", flexDirection: "column", marginY: "40px" }}
        >
            <SortBar />
            <div className="flex flex-row">
                <Sidebar data={data} />
                {children}
            </div>
        </Container>
    );
};

export default DefaultPage;
