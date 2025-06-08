import { ReactNode } from "react";
import { Card, Divider, Stack } from "@mui/material";

interface CrudLayoutProps {
    headerPanel: ReactNode;
    children: ReactNode;
    padding?: boolean;
}

const CrudLayout = ({ headerPanel, children, padding }: CrudLayoutProps) => {
    return (
        <Stack direction="column" spacing={4} divider={<Divider />}>
            <Card sx={{ p: 2 }}>{headerPanel}</Card>
            <Card>{children}</Card>
        </Stack>
    );
};

export default CrudLayout;
