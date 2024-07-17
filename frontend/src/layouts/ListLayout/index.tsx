import { Container, Pagination } from "@mui/material";
import { ReactNode } from "react";
import SortBar from "../../components/SortBar";

interface DefaultPageProps {
    children: ReactNode;
    pagination?: boolean;
    page?: number;
    count?: number;
    onPageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const DefaultPage = ({
    children,
    pagination,
    page,
    count,
    onPageChange,
}: DefaultPageProps) => {
    return (
        <Container
            maxWidth="xl"
            sx={{ display: "flex", flexDirection: "column", marginY: "40px" }}
        >
            <SortBar />
            <div className="flex flex-col">
                <div className="flex flex-row">{children}</div>
                {pagination && (
                    <Pagination
                        count={count}
                        page={page}
                        onChange={onPageChange}
                        sx={{ marginTop: "60px", alignSelf: "center" }}
                    />
                )}
            </div>
        </Container>
    );
};

export default DefaultPage;
