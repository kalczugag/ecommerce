import { HTMLAttributes, ReactNode } from "react";
import { Box, CircularProgress } from "@mui/material";

interface LoadingProps extends HTMLAttributes<HTMLElement> {
    isLoading: boolean;
    children: ReactNode;
}

const Loading = ({ isLoading, children, ...rest }: LoadingProps) => {
    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            {...rest}
        >
            {isLoading && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10,
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            <Box sx={{ opacity: isLoading ? 0.5 : 1, width: "100%" }}>
                {children}
            </Box>
        </Box>
    );
};

export default Loading;
