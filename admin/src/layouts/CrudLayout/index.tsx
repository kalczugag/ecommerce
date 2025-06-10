import { ReactNode } from "react";
import { Box, Card, Divider, Stack } from "@mui/material";

interface CrudLayoutProps {
    headerPanel: ReactNode;
    children: ReactNode;
    padding?: boolean;
}

const CrudLayout = ({ headerPanel, children, padding }: CrudLayoutProps) => {
    return (
        <Stack direction="column" spacing={4} divider={<Divider />}>
            <Box sx={{ p: 2 }}>{headerPanel}</Box>
            <Card elevation={1}>{children}</Card>
        </Stack>
    );
};

export default CrudLayout;
