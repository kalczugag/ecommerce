import { HTMLAttributes, ReactNode, useEffect } from "react";
import { Container, Box } from "@mui/material";

export interface DefaultLayoutProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    pagination?: JSX.Element;
    direction?: "row" | "column";
    featuredElement?: JSX.Element;
    topContent?: ReactNode;
    marginY?: boolean;
    marginX?: boolean;
    centered?: boolean;
}

const DefaultLayout = ({
    children,
    pagination,
    direction = "column",
    featuredElement,
    topContent,
    marginX = true,
    marginY = true,
    centered = false,
    className,
    ...rest
}: DefaultLayoutProps) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                maxWidth="lg"
                sx={{ display: "flex", marginY: marginY ? "40px" : 0 }}
                className={`${
                    direction === "column" ? "flex-col" : "flex-row"
                } ${className}`}
                {...rest}
            >
                {topContent}
                {pagination ? (
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-center md:justify-normal">
                            {children}
                        </div>
                        {pagination}
                    </div>
                ) : centered ? (
                    <div className="flex flex-row justify-center md:justify-normal">
                        {children}
                    </div>
                ) : (
                    children
                )}
            </Container>
        </>
    );
};

export default DefaultLayout;
