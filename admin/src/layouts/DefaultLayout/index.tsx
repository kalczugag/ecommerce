import { Stack } from "@mui/material";
import { HTMLAttributes, ReactNode } from "react";

interface DefaultLayoutProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    direction?: "row" | "column";
}

const DefaultLayout = ({
    children,
    direction = "column",
    ...rest
}: DefaultLayoutProps) => {
    return (
        <Stack direction={direction} className={rest.className} {...rest}>
            {children}
        </Stack>
    );
};

export default DefaultLayout;
