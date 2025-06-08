import { ReactNode } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";

interface SettingsLayoutProps {
    label: string;
    children: ReactNode;
}

const SettingsLayout = ({ label, children }: SettingsLayoutProps) => {
    return (
        <Card elevation={0}>
            <CardHeader
                title={
                    <Typography variant="subtitle1" fontWeight={600}>
                        {label}
                    </Typography>
                }
            />
            <CardContent>
                <Stack spacing={2}>{children}</Stack>
            </CardContent>
        </Card>
    );
};

export default SettingsLayout;
