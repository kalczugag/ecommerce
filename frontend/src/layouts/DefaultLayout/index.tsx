import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { Container, Box } from "@mui/material";
import SortBar from "@/components/SortBar";

interface DefaultPageProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    pagination?: JSX.Element;
    direction?: "row" | "column";
    featuredElement?: JSX.Element;
    isCatalog?: boolean;
    marginY?: boolean;
    marginX?: boolean;
}

const DefaultLayout = ({
    children,
    pagination,
    direction = "column",
    featuredElement,
    isCatalog = false,
    marginX = true,
    marginY = true,
    className,
    ...rest
}: DefaultPageProps) => {
    return (
        <>
            {featuredElement && (
                <Box
                    sx={{
                        width: "100%",
                        height: "70vh",
                        color: "white",
                        marginY: "40px",
                        padding: "20px",
                    }}
                    className="bg-red-primary"
                >
                    {featuredElement}
                </Box>
            )}
            <Container
                maxWidth="xl"
                sx={{ display: "flex", marginY: marginY ? "40px" : 0 }}
                className={`${
                    direction === "column" ? "flex-col" : "flex-row"
                } ${className}`}
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
