import { HTMLAttributes, ReactNode } from "react";
import { Container, Box } from "@mui/material";
import SortBar from "@/components/SortBar";

interface DefaultPageProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    pagination?: JSX.Element;
    featuredElement?: JSX.Element;
    isCatalog?: boolean;
}

const DefaultLayout = ({
    children,
    pagination,
    featuredElement,
    isCatalog = false,
    ...rest
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
                        padding: "20px",
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
                className={rest.className}
                {...rest}
            >
                {isCatalog && <SortBar />}
                {pagination ? (
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-center md:justify-normal">
                            {children}
                        </div>
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
