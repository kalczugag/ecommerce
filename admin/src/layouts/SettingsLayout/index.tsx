import { ReactNode } from "react";
import { Container } from "@mui/material";

interface SettingsLayoutProps {
    label: string;
    children: ReactNode;
}

const SettingsLayout = ({ label, children }: SettingsLayoutProps) => {
    return (
        <Container maxWidth="lg">
            <h1 className="text-lg font-bold mb-10">{label}</h1>
            <div className="flex flex-col space-y-6">{children}</div>
        </Container>
    );
};

export default SettingsLayout;
