import { Container, Box } from "@mui/material";
import { ReactNode } from "react";
import SortBar from "@/components/SortBar";

interface DefaultPageProps {
    children: ReactNode;
    pagination?: JSX.Element;
    featuredElement?: JSX.Element;
    isDashboard?: boolean;
}

const DefaultLayout = ({
    children,
    pagination,
    featuredElement,
    isDashboard,
}: DefaultPageProps) => {
    return (
        <>
            {featuredElement && (
                <Box
                    sx={{
                        width: "100%",
                        height: "70vh",
                        bgcolor: "#80203D",
                        color: "white",
                        marginY: "40px",
                    }}
                >
                    {featuredElement}
                </Box>
            )}
            <Container
                maxWidth="xl"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginY: "40px",
                }}
            >
                {!isDashboard && <SortBar />}
                {pagination ? (
                    <div className="flex flex-col">
                        <div className="flex flex-row">{children}</div>
                        {pagination}
                    </div>
                ) : (
                    children
                )}
            </Container>
        </>
    );
};

export default DefaultLayout;
